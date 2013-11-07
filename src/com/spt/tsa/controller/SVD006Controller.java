package com.spt.tsa.controller;



import java.math.BigDecimal;
import java.math.BigInteger;

import java.text.DateFormat;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.persistence.Parameter;
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
import com.spt.tsa.controller.datasource.SPV004JasperDataSource;
import com.spt.tsa.dao.ParameterTableDao;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.domain.SVD006Domain01;
import com.spt.tsa.entity.Company;
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
public class SVD006Controller{
	private Employee01Service employee01Service;
	private ParameterTable01Service parameterTable01Service;
	private TravelHeader01Service travelHeader01Service;
	private TravelDetail01Service travelDetail01Service;
	private Customer01Service customer01Service;
	
	private List<TravelHeader> listLravelHerder;
	private List<ParameterTable> resultsBank;
	private List<ParameterTable> resultsBankType;
	private List<TravelDetail> travelDetails;
	
	@Autowired
    public void setParameterTable01Service(ParameterTable01Service parameterTable01Service) {
   	 this.parameterTable01Service= parameterTable01Service;
    }
	@Autowired
    public void setParameterTable01Service(Employee01Service employee01Service) {
   	 this.employee01Service= employee01Service;
    }
	@Autowired
    public void setTravelHeader01Service(TravelHeader01Service travelHeader01Service) {
   	 this.travelHeader01Service= travelHeader01Service;
    }
	
	@Autowired	
	public void setCustomer01Service(Customer01Service customer01Service) {
	 this.customer01Service = customer01Service;
	}
	
	@Autowired
	public void setTravelDetail01Service(TravelDetail01Service travelDetail01Service) {
		this.travelDetail01Service = travelDetail01Service;
	}
	private static Logger logger = LoggerFactory.getLogger(APP001Controller.class);

		@RequestMapping(value = "/SVD006.html", method = RequestMethod.GET)
		public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {
//			String docNo= request.getParameter("docNo").toString();//Future receive parameter
//			listLravelHerder = null;
//			travelDetails = null;
//			resultsBank = null;
//			resultsBankType = null;
			try{ 
				this.listLravelHerder = this.travelHeader01Service.findByDocNo("560004");
				this.travelDetails = this.travelDetail01Service.findByTravelHeader(this.listLravelHerder.get(0));
				this.resultsBank = this.parameterTable01Service.findRow("7",this.listLravelHerder.get(0).getEmployee().getBank().toString());
				this.resultsBankType = this.parameterTable01Service.findRow("8",this.listLravelHerder.get(0).getEmployee().getAccountType().toString());
			}catch (Exception e){
				
			}
			TravelHeader travelHeader = this.listLravelHerder.get(0);
			ParameterTable parameterTableBank = this.resultsBank.get(0);
			ParameterTable parameterTableBankType = this.resultsBankType.get(0);
			
			///////////////////////old
			Map<String,Object> model = new HashMap<String,Object>();

			Employee resultsEmp = this.employee01Service.findEmployeeWhereId();
			System.out.println("view 2");
			List<String> resu = this.employee01Service.findBankWhereEmp();
			List<String> resultsBranch = this.employee01Service.findBranchBankWhereEmp();
			List<String> resultsDept = this.employee01Service.findDeptWhereEmp();
			List<String> resultsProvince = this.employee01Service.findProvinceEmp();
			
			
			  Date date = new Date();
			  SimpleDateFormat ft = new SimpleDateFormat ("yyyy/MM/dd");  
		

			SVD006Domain01 domain = new SVD006Domain01();
	  			  

			List<TravelHeader> lastNoDocList = this.travelHeader01Service.findTravelHanderGetLastNoDoc();
			String numberDoc = " ";
			if(lastNoDocList.size()!=0){
				logger.debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  {}",lastNoDocList.get(0).getNo());
				numberDoc = lastNoDocList.get(0).getNo();
				logger.debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  {}",numberDoc);
			}
			
			domain.setNo(travelHeader.getNo());
			domain.setDate(new SimpleDateFormat ("dd/MM/yyyy").format(travelHeader.getCreationate()));
			domain.setName(travelHeader.getEmployee().getName());
			domain.setId(travelHeader.getEmployee().getEmpId());

		
			domain.setCompany(travelHeader.getComName());
			domain.setIdCard(travelHeader.getEmployee().getIdCard());
			domain.setAddress(travelHeader.getAddress());
			domain.setPhone(travelHeader.getTelephone());
			domain.setEmail(travelHeader.getEmail());
			domain.setAntecedent(travelHeader.getNameDept());
			domain.setAntercedentA(travelHeader.getProvince());
			domain.setForPay(travelHeader.getPaymDesc());
			domain.setDocument(travelHeader.getAttachment());
			//// Total
			domain.setTotalPayExpresses(travelHeader.getTotalExpenses());
			domain.setTotalPayMotorWay(travelHeader.getTotalMotorWay());
			domain.setTotalPayAll(travelHeader.getTotal());
			domain.setTotalPayCharector(new BahtText(travelHeader.getTotal()).toString());
			
			//************* set value Button *****************/
			domain.setBank(parameterTableBank.getDetail());
			domain.setBranch(travelHeader.getEmployee().getBranch());
			domain.setAccountNumber(travelHeader.getEmployee().getAccountNo());
			domain.setTypeAccount(parameterTableBankType.getDetail());

			List<BigDecimal> tra = this.travelHeader01Service.findTravelTotal("550001");
			domain.setTotalPayment(tra.get(0));
			domain.setCharactorNumber(new BahtText(tra.get(0)).toString());
			
			Employee teeeeeee = this.travelHeader01Service.findEmployeeWhereId(domain.getId());
			Company commmmm = this.travelHeader01Service.findCompanyWhereId(resultsEmp.getCompany().getComId());
			
				logger.debug("+++++++------------+{}------",teeeeeee.getAddress());
				logger.debug("+++++++------------+{}------",commmmm.getComId());
			
			logger.debug("+++++++++++++++++++++{}--------------------",resu.get(0));
			logger.debug("+++++++++++++++++++++{}--------------------",domain.getName());

			model.put("data", JSONObject.fromObject(BeanUtils.beanToMap(domain)).toString());
			
			return new ModelAndView("SVD006",model);

		}
		
		@RequestMapping(value = "/SVD006.html", method = RequestMethod.POST, params = "method=gridDataStore")
		public void findGrid(HttpServletRequest request,
				HttpServletResponse response) {

			try{ 
				this.listLravelHerder = this.travelHeader01Service.findByDocNo("560004");
				this.travelDetails = this.travelDetail01Service.findByTravelHeader(this.listLravelHerder.get(0));
			}catch (Exception e){
				
			}
			
			JSONArray jsonArray = new JSONArray();
			GridData gridData = new GridData();
			JSONObject jobect = null;
			for(TravelDetail td : this.travelDetails){
				 jobect = new JSONObject();
				 jobect.accumulate("no", td.getNo());
				 
				 Date date = td.getDate();
				 SimpleDateFormat simple_date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
				 String date_str = simple_date.format(date);

				 
				 jobect.accumulate("gridDate",date_str);
				 jobect.accumulate("customer", td.getCustomer().getName());
				 jobect.accumulate("region", td.getFrom());
				 jobect.accumulate("goal", td.getTo());
				 jobect.accumulate("paymentTravel", td.getTravelExpenses());
				 jobect.accumulate("paymentD", td.getMotorWay());
				 jobect.accumulate("payment", td.getTotalDay());
				 jobect.accumulate("remark", td.getRemark());
				 jsonArray.add(jobect);
			}
			
			gridData.setRecords(jsonArray);
			gridData.setTotal(jsonArray.size());
			gridData.setSuccess(true);

			gridData.responseJson(response);

		}
		
		@RequestMapping(value = "/SVD006.html", method = RequestMethod.POST, params = "method=updateStatus")
		public void save1(HttpServletRequest request, HttpServletResponse response,
		@ModelAttribute SVD006Domain01 domain,
		@RequestParam("noDoc") String noDoc,
		@RequestParam("status") String status,
		@RequestParam("payType") String payType,
		@RequestParam("reson") String reson
		) throws Exception {

			try {
				domain.setNo(noDoc);
				domain.setStatus(status);
				domain.setPayType(payType);
				domain.setReson(reson);
				
				TravelHeader travelHeader = null;
				List<TravelHeader> getObjectByDocNo = this.travelHeader01Service.findByDocNoForSaveOrUpdate(domain.getNo());
				if (getObjectByDocNo.size() != 0) {
					travelHeader = getObjectByDocNo.get(0);
				} else {
					travelHeader = new TravelHeader();
					travelHeader.settHeadId("1");
				}
					travelHeader.setStatus(domain.getStatus());
					travelHeader.setPayType(domain.getPayType());
					travelHeader.setRemark(domain.getReson());
				this.travelHeader01Service.saveHeaderCreateFrom(travelHeader);

			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e.getMessage());
			}

		}

}