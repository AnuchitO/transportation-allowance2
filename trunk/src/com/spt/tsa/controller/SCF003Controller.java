package com.spt.tsa.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.xmlbeans.impl.regex.REUtil;
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

import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.controller.datasource.RunNumberDocument;
import com.spt.tsa.dao.ParameterTableDao;
import com.spt.tsa.domain.SCF003Domain01;
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
			.getLogger(APP001Controller.class);

	private Employee01Service employee01Service;
	private ParameterTable01Service parameterTable01Service;
	private TravelHeader01Service travelHeader01Service;
	private TravelDetail01Service travelDetail01Service;
	private Customer01Service customer01Service;

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
		
		String empId = null;
		if(request.getParameter("empId")==null){
			logger.debug("pagepppppppppppPPPPPPPPPPPPPPPPPPPPppppppppp  IF  pppppppppppppppppppppppppppppppp");
		}else{
			empId = request.getParameter("empId").toString();
			logger.debug("pagepppppppppppPPPPPPPPPPPPPPPPPPPPppppppppp  {} pppppppppppppppppppppppppppppppp",empId);
		}
		////////////////////////////////////////////////////////
		//Nong getParameter From SHI002 page
		///////////////////////////////////////////////////////
		String noDoc = "noDoc";
		if(request.getParameter("noDoc") == null){
		
		}else{
			noDoc = request.getParameter("noDoc");
		}
		
		/////// End Nong getParameter From SHI002 page ///////
		
		
		
		Map<String, Object> model = new HashMap<String, Object>();
		Employee resultsEmp = this.employee01Service.findEmployeeWhereId("EMp001");
		System.out.println("view 2");
		List<String> resu = this.employee01Service.findBankWhereEmp("EMp001");
		List<String> resultsBranch = this.employee01Service.findBranchBankWhereEmp("EMp001");
		List<String> resultsDept = this.employee01Service.findDeptWhereEmp("EMp001");
		List<String> resultsProvince = this.employee01Service.findProvinceEmp("EMp001");
		Date date = new Date();
		SimpleDateFormat ft = new SimpleDateFormat("dd/MM/yyyy");
		SCF003Domain01 domain = new SCF003Domain01();
		List<TravelHeader> lastNoDocList = this.travelHeader01Service.findTravelHanderGetLastNoDoc();
		
		String numberDoc = " ";
		if ((lastNoDocList.size() != 0)) {
			logger.debug("!!!!!!!!!!!!  {}",lastNoDocList.get(0).getNo());
			numberDoc = new RunNumberDocument(lastNoDocList.get(0).getNo()).generatNumberDocumentV2();
			logger.debug("!!!!!!!!!!!!!  {}",numberDoc);
		}else{
		}
		domain.setNo(numberDoc);
		domain.setDate(ft.format(date));
		domain.setName(resultsEmp.getName());
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

		// domain.setTatolManey(new BahtText(arg0).totalPayment);
		domain.setBank(resu.get(0));
		domain.setBranch(resultsEmp.getBranch());
		domain.setAccountNumber(resultsEmp.getAccountNo());
		domain.setTypeAccount(resultsBranch.get(0));
		// domain.setName("ffasfds");
		// domain.setId("fdsaf");
		// domain.setCompany("fdsfsdfs");
		// domain.setAddress("fdsfa");
		// domain.setPhone("fsdf");
		// domain.setEmail("fsdfa");
		Employee teeeeeee = this.travelHeader01Service
				.findEmployeeWhereId(domain.getId());
		Company commmmm = this.travelHeader01Service
				.findCompanyWhereId(resultsEmp.getCompany().getComId());

		logger.debug("+++++++------------+{}------", teeeeeee.getAddress());
		logger.debug("+++++++------------+{}------", commmmm.getComId());

		logger.debug("+++++++++++++++++++++{}--------------------", resu.get(0));
		logger.debug("+++++++++++++++++++++{}--------------------",
				domain.getName());
		model.put("scf003", JSONObject.fromObject(BeanUtils.beanToMap(domain))
				.toString());

		return new ModelAndView("SCF003", model);

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

		for (int i = 0; i < resultsParam.size(); i++) {
			logger.debug("-*-{}-*-", resultsParam.get(i));

			jobect1.accumulate("code", resultsParam.get(i));
			jobect1.accumulate("description", resultsParam.get(i));
			jsonArray.add(jobect1);
			jobect1.clear();

		}

		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);

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

		gridData.responseJson(response);
	}

	@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=gridData")
	public void findGrid(HttpServletRequest request,
			HttpServletResponse response) {

		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();

		// JSONObject jobect1 = new JSONObject();
		// jobect1.accumulate("no", "01");
		// jobect1.accumulate("gridDate", "17/12/2556");
		// jobect1.accumulate("customer", "ANUCHIT");
		// jobect1.accumulate("region", "Bangkok");
		// jobect1.accumulate("goal", "Bangkok");
		// jobect1.accumulate("paymentTravel", "1000");
		// jobect1.accumulate("paymentD", "1000");
		// jobect1.accumulate("payment", "2000");
		// jobect1.accumulate("remark", "No");
		//
		// jsonArray.add(jobect1);
		//
		// JSONObject jobect2 = new JSONObject();
		// jobect2.accumulate("no", "02");
		// jobect2.accumulate("gridDate", "18/12/2556");
		// jobect2.accumulate("customer", "ANUCHIT");
		// jobect2.accumulate("region", "Bangkok");
		// jobect2.accumulate("goal", "Bangkok");
		// jobect2.accumulate("paymentTravel", "1000");
		// jobect2.accumulate("paymentD", "1000");
		// jobect2.accumulate("payment", "2000");
		// jobect2.accumulate("remark", "No");
		// jsonArray.add(jobect2);
		//
		// JSONObject jobect3 = new JSONObject();
		// jobect3.accumulate("no", "03");
		// jobect3.accumulate("gridDate","19/12/2556");
		// jobect3.accumulate("customer", "ANUCHIT");
		// jobect3.accumulate("region", "Bangkok");
		// jobect3.accumulate("goal", "Bangkok");
		// jobect3.accumulate("paymentTravel", "1000");
		// jobect3.accumulate("paymentD", "1000");
		// jobect3.accumulate("payment", "2000");
		// jobect3.accumulate("remark", "No");
		// jsonArray.add(jobect3);

		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);

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
			domain.setNumberDocument(numberDocument);
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

			// this.travelHeader01Service.save(domain);
			// this.travelHeader01Service.save2();

			TravelHeader travelHeader = null;
			List<TravelHeader> getObjectByDocNo = this.travelHeader01Service
					.findByDocNoForSaveOrUpdate(domain.getNumberDocument());
			if (getObjectByDocNo.size() != 0) {
				travelHeader = getObjectByDocNo.get(0);
			} else {
				travelHeader = new TravelHeader();
				travelHeader.settHeadId("1");
			}
			
			List<TravelHeader> lastNoDocList = this.travelHeader01Service.findTravelHanderGetLastNoDoc();
			
			String numberDoc = " ";
			if ((lastNoDocList.size() != 0)) {
				logger.debug("!!!!!!!!!!!!  {}",lastNoDocList.get(0).getNo());
				numberDoc = new RunNumberDocument(lastNoDocList.get(0).getNo()).generatNumberDocumentV2();
				logger.debug("!!!!!!!!!!!!!  {}",numberDoc);
			}else{
			}
			
			travelHeader.setNo(domain.getNumberDocument());
			travelHeader.setEmployee(this.employee01Service
					.findEmployeeByIdName(domain.getId()));
			travelHeader.setCompany(this.employee01Service
					.findEmployeeByIdName(domain.getId()).getCompany());
			travelHeader.setTotal(new Double(domain.getTatolPaymfullCase()));
			travelHeader.setComName(domain.getCompany());
			travelHeader.setAddress(domain.getAddress());
			travelHeader.setProvince(domain.getAntercedentA());
			travelHeader.setEmail(domain.getEmail());
			travelHeader.setTelephone(domain.getPhone());
			if (domain.getStatus().equals("001")) {
				travelHeader.setStatus("001");
			} else if (domain.getStatus().equals("002")) {
				travelHeader.setStatus("002");
			}
			travelHeader.setRemark("no");
			travelHeader.setTotalExpenses(new Double(domain.getTatolPaym()));
			travelHeader.setTotalMotorWay(new Double(domain.getTatolPaymA()));
			
			travelHeader.setAttachment(new Long(domain.getDocument()));
		
			travelHeader.setPaymDesc(domain.getForPay());
			if (domain.getType1().equals("true")) {
				travelHeader.setPayType("1");
			} else {
				travelHeader.setPayType("2");
			}
			travelHeader.setUserCreation(domain.getName());
			travelHeader.setUserUpdate(domain.getName());
			travelHeader.setCreationate(new Date());
			travelHeader.setModifyDate(new Date());// 21
			travelHeader.setNameDept(domain.getAntecedent());// 22
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
				// Convert year
				// SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				// String time = sdf.format(gridRowContent[1]);
				// String[] thaiFormatSplit = time.split("/");
				// Integer year = Integer.parseInt(thaiFormatSplit[2]);
				// year-=543;
				// System.out.println(year);
				// Date dateGridRow =
				// sdf.parse(thaiFormatSplit[0]+"/"+thaiFormatSplit[1]+"/"+year);
				//
				// //End Convert year

				// ********************** format Date in Grid
				// **************************//
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
				// System.out.println(date);
				DateFormat formatter = new SimpleDateFormat("dd/MM/yy");

				Date datett = formatter.parse(datet);
				// System.out.println(datet);
				// ********************* format complete ********************//

				// travelDetail.setDate(dateGridRow);
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
				travelDetail.setUserUpdate(domain.getName());

				// /Convert year
				SimpleDateFormat sdfCreate = new SimpleDateFormat("dd/MM/yyyy");
				String[] thaiFormatSplitCreatetion = domain.getDate()
						.split("/");
				Integer yearCreate = Integer
						.parseInt(thaiFormatSplitCreatetion[2]);
//				yearCreate -= 543;
				Date dateCreate = sdfCreate
						.parse(thaiFormatSplitCreatetion[0] + "/"
								+ thaiFormatSplitCreatetion[1] + "/"
								+ yearCreate);
				// End Convert year
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
	
}