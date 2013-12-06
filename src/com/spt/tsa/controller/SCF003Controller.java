package com.spt.tsa.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.write.Number;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.xmlbeans.impl.regex.REUtil;
import org.hibernate.classic.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.tuxilla.BahtText;

import com.fission.web.view.extjs.data.Data;
import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.controller.datasource.RunNumberDocument;
import com.spt.tsa.dao.ParameterTableDao;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.domain.SDM009Domain01;
import com.spt.tsa.domain.SHI002Domain01;
import com.spt.tsa.entity.Company;
import com.spt.tsa.entity.Customer;
import com.spt.tsa.entity.Employee;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.TravelDetail;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.Customer01Service;
import com.spt.tsa.service.Employee01Service;
import com.spt.tsa.service.ParameterTable01Service;
import com.spt.tsa.service.TravelDetail01Service;
import com.spt.tsa.service.TravelHeader01Service;
import com.spt.tsa.util.BeanUtils;

@Controller
public class SCF003Controller {
	private static Logger logger = LoggerFactory
			.getLogger(SCF003Controller.class);

	private Employee01Service employee01Service;
	private ParameterTable01Service parameterTable01Service;
	private TravelHeader01Service travelHeader01Service;
	private TravelDetail01Service travelDetail01Service;
	private Customer01Service customer01Service;
	private List<TravelHeader> listTravelHeader; 
	private List<TravelDetail> listTravelDetail;

	@Autowired
	public void setParameterTable01Service(
			ParameterTable01Service parameterTable01Service) {
		this.parameterTable01Service = parameterTable01Service;
	}

	@Autowired
	public void setParameterTable01Service(Employee01Service employee01Service) {
		this.employee01Service = employee01Service;
	}

	@Autowired
	public void setTravelHeader01Service(
			TravelHeader01Service travelHeader01Service) {
		this.travelHeader01Service = travelHeader01Service;
	}

	@Autowired
	public void setCustomer01Service(Customer01Service customer01Service) {
		this.customer01Service = customer01Service;
	}

	@Autowired
	public void setTravelDetail01Service(
			TravelDetail01Service travelDetail01Service) {
		this.travelDetail01Service = travelDetail01Service;
	}

	//
	@RequestMapping(value = "/SCF003.html", method = RequestMethod.GET)
	public ModelAndView view(HttpServletRequest request,
			HttpServletResponse response) {
		Object sessionPrivilege = request.getSession().getAttribute("sessionPrivilege");
		String privilege = (String)sessionPrivilege;
		if((!(privilege.equals("user")))){ 
			try {
				request.getSession().removeAttribute("sessionPrivilege");
				response.sendRedirect((String)request.getSession().getAttribute("sessionIndexPage"));	
			} catch (Exception e) {
			}
		}else{
			String empId = " ";
			if(request.getParameter("empId")==null){
				
			}else{
				empId = request.getParameter("empId").toString();
			}
			////////////////////////////////////////////////////////
			//Nong getParameter From SHI002 page
			///////////////////////////////////////////////////////
			String noDoc = "AUTO";
			if(request.getParameter("noDoc") == null){
				noDoc = "AUTO";
			}else{
				noDoc = request.getParameter("noDoc");
			}
			String status = "-";
			if(request.getParameter("status") == null){
	
			}else{
				status = request.getParameter("status");
			}
			
			/////// End Nong getParameter From SHI002 page ///////
			
			
			
			Map<String, Object> model = new HashMap<String, Object>();
			Employee resultsEmp = this.employee01Service.findEmployeeWhereId(empId);
			System.out.println("view 2");
			List<String> resu = this.employee01Service.findBankWhereEmp(empId);
			List<String> resultsBranch = this.employee01Service.findBranchBankWhereEmp(empId);
			List<String> resultsDept = this.employee01Service.findDeptWhereEmp(empId);
			List<String> resultsProvince = this.employee01Service.findProvinceEmp(empId);
			Date date = new Date();
			SimpleDateFormat ft = new SimpleDateFormat("dd/MM/yyyy");
			SCF003Domain01 domain = new SCF003Domain01();
			
			try {
				List<TravelHeader> lastNoDocList = this.travelHeader01Service.findByDocNoForSaveOrUpdate(noDoc);
				TravelHeader travelHeader = lastNoDocList.get(0);
				domain.setStatus(status);
				domain.setTatolPaym(travelHeader.getTotalExpenses().toString());
				domain.setTatolPaymA(travelHeader.getTotalMotorWay().toString());
				domain.setTatolPaymfullCase(travelHeader.getTotal().toString());
				domain.setDocument(travelHeader.getAttachment());
				domain.setForPay(travelHeader.getPaymDesc());
				domain.setCharactorNumber(new BahtText(travelHeader.getTotal().toString()).toString());
			} catch (Exception e) {
	
			}
			
			domain.setNo(noDoc);
			domain.setDate(ft.format(date));
			domain.setName(resultsEmp.getName());
			domain.setScfLastName(resultsEmp.getLastname());
			domain.setId(resultsEmp.getEmpId());
			new BahtText(11).toString();
	
			domain.setCompany(resultsEmp.getCompany().getName());
			domain.setIdCard(resultsEmp.getIdCard());
			domain.setAddress(resultsEmp.getAddress());
			domain.setPhone(resultsEmp.getTelephone());
			domain.setEmail(resultsEmp.getEmail());
			domain.setAntecedent(resultsDept.get(0));
			domain.setAntercedentA(resultsProvince.get(0));
			// ************* set value Button *****************//
				
			
			domain.setBank(resu.get(0));
			domain.setBranch(resultsEmp.getBranch());
			domain.setAccountNumber(resultsEmp.getAccountNo());
			domain.setTypeAccount(resultsBranch.get(0));
		
			
			model.put("scf003", JSONObject.fromObject(BeanUtils.beanToMap(domain)).toString());
	
			return new ModelAndView("SCF003", model);
		}
		return new ModelAndView((String)request.getSession().getAttribute("sessionIndexPage"));
	}

	@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=antecedent")
	public void findComSS(HttpServletRequest request,
			HttpServletResponse response) {
		List<ParameterTable> resultsParam = this.parameterTable01Service
				.findByDept();
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();

		JSONObject jobect1 = new JSONObject();
		for (ParameterTable c : resultsParam) {

			jobect1.accumulate("code", c.getDetail());
			jobect1.accumulate("description", c.getDetail());
			jsonArray.add(jobect1);
			jobect1.clear();

		}
		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);
		response.setContentType("application/json;charset=UTF-8"); 
		gridData.responseJson(response);
	}

	@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=antercedent2")
	public void findComSS2(HttpServletRequest request,
			HttpServletResponse response) {

		List<ParameterTable> resultsParam = this.parameterTable01Service
				.findByProvince();
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();

		JSONObject jobect1 = new JSONObject();
		
		for (ParameterTable p:resultsParam) {
		

			jobect1.accumulate("code", p.getDetail());
			jobect1.accumulate("description", p.getDetail());
			jsonArray.add(jobect1);
			jobect1.clear();

		}

		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);
		response.setContentType("application/json;charset=UTF-8"); 
		gridData.responseJson(response);
	}

	@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=customer")
	public void findCustomer(HttpServletRequest request,
			HttpServletResponse response) {
		List<Customer> resultsCus = this.customer01Service.findCustomer();
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();

		JSONObject jobect1 = new JSONObject();
		for (Customer c : resultsCus) {

			jobect1.accumulate("code", c.getName());
			jobect1.accumulate("description", c.getName());
			jsonArray.add(jobect1);
			jobect1.clear();

		}
		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);
		response.setContentType("application/json;charset=UTF-8"); 
		gridData.responseJson(response);
	}
	
	@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=document")
	public void setDocument(HttpServletRequest request,
			HttpServletResponse response) {
		
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();

		JSONObject jobect1 = new JSONObject();
		for (int i=1; i<=100 ;i++) {

			jobect1.accumulate("code", i);
			jobect1.accumulate("description", i);
			jsonArray.add(jobect1);
			jobect1.clear();

		}
		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);
		response.setContentType("application/json;charset=UTF-8"); 
		gridData.responseJson(response);
	}

	@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=gridData")
	public void findGrid(HttpServletRequest request,
			HttpServletResponse response,
			@ModelAttribute SCF003Domain01 domain,
			@RequestParam("empId") String empIdPass,
			@RequestParam("noDoc") String noDocPass) {

		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData(); 
		JSONObject jobect = null;
		//////////////////////
		//Nong
		/////////////////////
		if(!(noDocPass.equals("-"))){
			domain.setNo(noDocPass);
			domain.setId(empIdPass);
			List<TravelHeader> travelHeaders = null;
			List<TravelDetail> travelDetails = null;
			
			try {
				 travelHeaders = this.travelHeader01Service.findByDocNoForSaveOrUpdate(domain.getNo());
				 travelDetails = this.travelDetail01Service.findByTravelHeader(travelHeaders.get(0));			
			} catch (Exception e) {
				
			}
			int i = 1;
			for(TravelDetail td : travelDetails){
				 jobect = new JSONObject();
				 jobect.accumulate("no", i++);
				 ///Convert Date For Grid Date
				 String[] datesplit = td.getDate().toString().split("-");
				  String dateStrformat = datesplit[2].substring(0, 2)+"/"+datesplit[1]+"/"+datesplit[0];
				 String dateStr = dateStrformat;
					Calendar today = new GregorianCalendar(Integer.parseInt(datesplit[0]),Integer.parseInt(datesplit[1])-1,Integer.parseInt(datesplit[2].substring(0, 2)));
					SimpleDateFormat fmtDate = new SimpleDateFormat("dd/MM/yyyy",Locale.US);
					System.out.println(fmtDate.format(new Date(today.getTimeInMillis())));
			
				 jobect.accumulate("gridDate",fmtDate.format(new Date(today.getTimeInMillis())));
				 logger.debug("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^{}",fmtDate.format(new Date(today.getTimeInMillis())));
				 ///End Convert Date For Grid Date
				 
				 jobect.accumulate("customer", td.getCustomer().getName());
				 jobect.accumulate("region", td.getFrom());
				 jobect.accumulate("goal", td.getTo());
				 jobect.accumulate("paymentTravel", td.getTravelExpenses());
				 jobect.accumulate("paymentD", td.getMotorWay());
				 jobect.accumulate("payment", td.getTotalDay());
				 jobect.accumulate("remark", td.getRemark());
				 jsonArray.add(jobect);
				 
			}
		}
		/////// End Nong ////

		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);
		response.setContentType("application/json;charset=UTF-8"); 
		
		gridData.responseJson(response);

	}

	// ************************ Save History *************************//
	@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=save1")
	public void save1(HttpServletRequest request, HttpServletResponse response,

	@ModelAttribute SCF003Domain01 domain,

	@RequestParam("no") String no, @RequestParam("date") String date,
	
			@RequestParam("numberDocument") String numberDocument,
			@RequestParam("name") String name, @RequestParam("id") String id,
			@RequestParam("company") String company,
			@RequestParam("antecedent") String antecedent,
			@RequestParam("address") String address,
			@RequestParam("antercedentA") String antercedentA,
			@RequestParam("phone") String phone,
			@RequestParam("email") String email,
			@RequestParam("tatolPaym") String tatolPaym,
			@RequestParam("tatolPaymA") String tatolPaymA,
			@RequestParam("tatolPaymfullCase") String tatolPaymfullCase,
			@RequestParam("tatolManey") String tatolManey,
			@RequestParam("document") Long document,
			@RequestParam("forPay") String forPay,
			@RequestParam("bank") String bank,
			@RequestParam("branch") String branch,
			@RequestParam("accountNumber") String accountNumber,
			@RequestParam("typeAccount") String typeAccount,
			@RequestParam("type1") String type1,
			@RequestParam("type2") String type2,
			@RequestParam("pack") String pack,
			@RequestParam("status") String status

	) throws Exception {
		

		try {
		
			
			List<TravelHeader> lastNoDocList = this.travelHeader01Service.findTravelHanderGetLastNoDoc();
			
			String numberDoc = " ";
			if ((lastNoDocList.size() != 0)) {
				logger.debug("!!!!!!!!!!!!  {}",lastNoDocList.get(0).getNo());
				numberDoc = new RunNumberDocument(lastNoDocList.get(0).getNo()).generatNumberDocumentV2();
				logger.debug("!!!!!!!!!!!!!  {}",numberDoc);
			}else{
				SimpleDateFormat sf = new SimpleDateFormat("yy",new Locale("th", "th"));
				
				String dateformat = sf.format(new Date()).toString();
				numberDoc = dateformat.concat("0001");
			}
			
			if(numberDocument.equals("AUTO")){
				domain.setNumberDocument(numberDoc);
			
				Data data = new Data();
				Map<String, Object> maps = new HashMap<String, Object>();
				maps.put("numberDoc", numberDoc);
				data.setData(maps);
				data.responseJson(response);
				
			}
			
			else{
				domain.setNumberDocument(numberDocument);
				Data data = new Data();
				Map<String, Object> maps = new HashMap<String, Object>();
				maps.put("numberDoc", numberDocument);
				data.setData(maps);
				data.responseJson(response);
			}
		
			domain.setNo(no);
			domain.setDate(date);
			domain.setName(name);
			domain.setId(id);
			domain.setCompany(company);
			domain.setAntecedent(antecedent);
			domain.setAddress(address);
			domain.setAntercedentA(antercedentA);
			domain.setPhone(phone);
			domain.setEmail(email);
			// ********************* set Buttom Data ********************//
			domain.setTatolPaym(tatolPaym);
			domain.setTatolPaymA(tatolPaymA);
			domain.setTatolPaymfullCase(tatolPaymfullCase);

			domain.setTatolManey(tatolManey);
			if(document == null){
				document = 0L;
			}
			domain.setDocument(document);
			domain.setForPay(forPay);
			domain.setBank(bank);
			domain.setBranch(branch);
			domain.setAccountNumber(accountNumber);
			domain.setTypeAccount(typeAccount);
			domain.setType1(type1);
			domain.setType2(type2);
			domain.setPack(pack);
			domain.setStatus(status);
			
			logger.debug("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@{}------------------------------------",document);


			TravelHeader travelHeader = null;
			List<TravelHeader> getObjectByDocNo = this.travelHeader01Service
					.findByDocNoForSaveOrUpdate(domain.getNumberDocument());
			if (getObjectByDocNo.size() != 0) {
				travelHeader = getObjectByDocNo.get(0);
			} else {
				travelHeader = new TravelHeader();
				travelHeader.settHeadId("1");
			}
			
			
			
			travelHeader.setNo(domain.getNumberDocument());
			travelHeader.setEmployee(this.employee01Service
					.findEmployeeByIdName(domain.getId()));
			travelHeader.setCompany(this.employee01Service
					.findEmployeeByIdName(domain.getId()).getCompany());
			
			String totalPaymentDay = domain.getTatolPaymfullCase().replace(",", "");
			logger.debug("/////////////////***************************@@@@@@@@@@@@@{}",totalPaymentDay);
			travelHeader.setTotal(new Double(totalPaymentDay));
			travelHeader.setComName(domain.getCompany());
			travelHeader.setAddress(domain.getAddress());
			List<ParameterTable> paramP = this.parameterTable01Service.findProvinceSelect(domain.getAntercedentA());
			travelHeader.setProvince(paramP.get(0).getEntry());
			travelHeader.setEmail(domain.getEmail());
			travelHeader.setTelephone(domain.getPhone());
			if (domain.getStatus().equals("001")) {
				travelHeader.setStatus("001");
			} else if (domain.getStatus().equals("002")) {
				travelHeader.setStatus("002");
			}
			travelHeader.setRemark(" ");
			String totalPaymExpenses = domain.getTatolPaym().replace(",", "");
			travelHeader.setTotalExpenses(new Double(totalPaymExpenses));
			String totalPaymentMotorWay = domain.getTatolPaymA().replace(",", "");
			travelHeader.setTotalMotorWay(new Double(totalPaymentMotorWay));
			
			travelHeader.setAttachment(new Long(domain.getDocument()));
		
			travelHeader.setPaymDesc(domain.getForPay());
			if (domain.getType1().equals("true")) {
				travelHeader.setPayType("1");
			} else {
				travelHeader.setPayType("2");
			}
			travelHeader.setUserCreation(domain.getName());
			
			Object scpSessionUserUpdateforTravelHeader = request.getSession().getAttribute("sessionUser");
			String scpgetSessionUserUpdateforTravelHeader = (String)scpSessionUserUpdateforTravelHeader;
			travelHeader.setUserUpdate(scpgetSessionUserUpdateforTravelHeader);
			
			SimpleDateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");
			String[] formatSplitCreateDate = domain.getDate().split("/");
			Integer yearCreateTravelHeader = Integer.parseInt(formatSplitCreateDate[2]);

			Date dateCreateTravelHeader = formatDate.parse(formatSplitCreateDate[0] + "/"+ formatSplitCreateDate[1] + "/"+ yearCreateTravelHeader);
			
			travelHeader.setCreationate(dateCreateTravelHeader);
			travelHeader.setModifyDate(new Date());// 21
			List<ParameterTable> param = this.parameterTable01Service.findDeptSelect(domain.getAntecedent());
			travelHeader.setNameDept(param.get(0).getEntry());// 22
			this.travelHeader01Service.saveHeaderCreateFrom(travelHeader);

			// ************************* Save Grid
			// ********************************//

			String[] gridContext = domain.getPack().split("!");
			for (String splitRows : gridContext) {

				String[] gridRowContent = splitRows.split(",");

				TravelDetail travelDetail = null;
				TravelHeader travelHeaderForDetail = this.travelHeader01Service
						.findByDocNoForSaveOrUpdate(domain.getNumberDocument()).get(0);
				List<TravelDetail> gridRowList = this.travelDetail01Service
						.findRowOfGridForUpdateRow(travelHeaderForDetail,
								gridRowContent[0]);

				if (gridRowList.size() != 0) {
					travelDetail = gridRowList.get(0);
				} else {
					travelDetail = new TravelDetail();
					travelDetail.settDetailId("1");
				}

				travelDetail.setNo(gridRowContent[0]);
				travelDetail.setTravelHeader(travelHeaderForDetail);
				
				String mount = "";
				String time = gridRowContent[1];
				String[] thaiFormatSplitCreate = time.split(" ");
				Integer year = Integer.parseInt(thaiFormatSplitCreate[3]);
				year += 543;
				System.out.println(thaiFormatSplitCreate[1]);
				if (thaiFormatSplitCreate[1].equals("Jan")) {
					mount = "01";
				}
				if (thaiFormatSplitCreate[1].equals("Feb")) {
					mount = "02";
				}
				if (thaiFormatSplitCreate[1].equals("Mar")) {
					mount = "03";
				}
				if (thaiFormatSplitCreate[1].equals("Apr")) {
					mount = "04";
				}
				if (thaiFormatSplitCreate[1].equals("May")) {
					mount = "05";
				}
				if (thaiFormatSplitCreate[1].equals("Jun")) {
					mount = "06";
				}
				if (thaiFormatSplitCreate[1].equals("Jul")) {
					mount = "07";
				}
				if (thaiFormatSplitCreate[1].equals("Aug")) {
					mount = "08";
				}
				if (thaiFormatSplitCreate[1].equals("Sep")) {
					mount = "09";
				}
				if (thaiFormatSplitCreate[1].equals("Oct")) {
					mount = "10";
				}
				if (thaiFormatSplitCreate[1].equals("Nov")) {
					mount = "11";
				}
				if (thaiFormatSplitCreate[1].equals("Dec")) {
					mount = "12";
				}
				System.out.println(mount);

				String datet = thaiFormatSplitCreate[2] + "/" + mount + "/"
						+ year;
				
				DateFormat formatter = new SimpleDateFormat("dd/MM/yy");

				Date datett = formatter.parse(datet);
				
				logger.debug("@@@@@@@@@@@@@@@@@@@@@@@---------------------------{}-----------{}",gridRowContent[6],gridRowContent[7]);
				travelDetail.setDate(datett);
				travelDetail.setCustomer(this.customer01Service.findByName(
						gridRowContent[2]).get(0));
				travelDetail.setFrom(gridRowContent[3]);
				travelDetail.setTo(gridRowContent[4]);
				travelDetail.setTravelExpenses(new Double(gridRowContent[5]));
				travelDetail.setMotorWay(new Double(gridRowContent[6]));
				travelDetail.setTotalDay(new Double(gridRowContent[7]));
				travelDetail.setRemark(gridRowContent[8]);
				travelDetail.setUserCreation(domain.getName());
				Object scpSessionUserUpdateforTravelDetail = request.getSession().getAttribute("sessionUser");
				String scpgetSessionUserUpdateforTravelDetail = (String)scpSessionUserUpdateforTravelDetail;
				travelDetail.setUserUpdate(scpgetSessionUserUpdateforTravelDetail);

			
				SimpleDateFormat sdfCreate = new SimpleDateFormat("dd/MM/yyyy");
				String[] thaiFormatSplitCreatetion = domain.getDate()
						.split("/");
				Integer yearCreate = Integer
						.parseInt(thaiFormatSplitCreatetion[2]);

				Date dateCreate = sdfCreate
						.parse(thaiFormatSplitCreatetion[0] + "/"
								+ thaiFormatSplitCreatetion[1] + "/"
								+ yearCreate);
		
				travelDetail.setCreationDate(dateCreate);
				travelDetail.setModifyDate(new Date());
				this.travelDetail01Service
						.saveTravelDetailCreateForm(travelDetail);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		
		
	}

	@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=save3")
	public void save3(HttpServletRequest request, HttpServletResponse response,

	@ModelAttribute SCF003Domain01 domain,
			@RequestParam("submitNo") String submitNo) throws Exception {

		try {
			domain.setSubmitNo(submitNo);
			logger.debug("-----{}+++++", domain.getSubmitNo());
			this.travelHeader01Service.updateStatusSubmit(domain);

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}

	}
	
	@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=scfRemove")
	public void sdmRemove(HttpServletRequest request, HttpServletResponse response,

	@ModelAttribute SCF003Domain01 domain,
			@RequestParam("scfpackRemove") String scfpackRemove,
			@RequestParam("scfForRemoveNo") String scfForRemoveNo

	) throws Exception {

		try {
			if(scfpackRemove.equals("AUTO")){
				
			}
			else{
			domain.setScfpackRemove(scfpackRemove);
			domain.setScfForRemoveNo(scfForRemoveNo);
			logger.debug("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^{}",domain.getScfForRemoveNo());
			logger.debug("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^{}",domain.getScfpackRemove());
			this.listTravelHeader = this.travelHeader01Service.findByDocNoForSaveOrUpdate(domain.getScfForRemoveNo()); 
			try {
				 String packRemove = domain.getScfpackRemove();
					String[] deptSplit = packRemove.split("!");
					for(String dataNoInGrid :deptSplit){
				 this.listTravelDetail = this.travelDetail01Service.findRowOfGridForUpdateRow(this.listTravelHeader.get(0), dataNoInGrid);
				 for(TravelDetail td : this.listTravelDetail){ 
					 this.travelDetail01Service.deleteTravelDetail(td);
			 	 }
			
			}
			}catch (Exception e) {
				logger.debug("{}",e);
			}
			}
					}
				 

			

		 catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}

	}
	
}