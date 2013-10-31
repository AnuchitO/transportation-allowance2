package com.spt.tsa.controller;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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
import com.spt.tsa.dao.ParameterTableDao;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.Employee;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.Employee01Service;
import com.spt.tsa.service.ParameterTable01Service;
import com.spt.tsa.service.TravelHeader01Service;
import com.spt.tsa.util.BeanUtils;




@Controller
public class SCF003Controller {
	private static Logger logger = LoggerFactory.getLogger(APP001Controller.class);
	
	private Employee01Service employee01Service;
	private ParameterTable01Service parameterTable01Service;
	private TravelHeader01Service travelHeader01Service;

	
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
	
//
		@RequestMapping(value = "/SCF003.html", method = RequestMethod.GET)
		public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {
			
			Map<String,Object> model = new HashMap<String,Object>();
			Employee resultsEmp = this.employee01Service.findEmployeeWhereId();
			System.out.println("view 2");
			List<String> resu = this.employee01Service.findBankWhereEmp();
			List<String> resultsBranch = this.employee01Service.findBranchBankWhereEmp();
			List<String> resultsDept = this.employee01Service.findDeptWhereEmp();
			List<String> resultsProvince = this.employee01Service.findProvinceEmp();
			
			  Date date = new Date();
			  SimpleDateFormat ft = new SimpleDateFormat ("yyyy/MM/dd");  
			SCF003Domain01 domain = new SCF003Domain01();
			domain.setNo("560001");
			domain.setDate(ft.format(date));
			domain.setName(resultsEmp.getName());
			domain.setId(resultsEmp.getEmpId());
			new BahtText(11).toString();
		
			domain.setCompany(resultsEmp.getCompany().getName());
			domain.setAddress(resultsEmp.getAddress());
			domain.setPhone(resultsEmp.getTelephone());
			domain.setEmail(resultsEmp.getEmail());
			domain.setAntecedent(resultsDept.get(0));
			domain.setAntercedentA(resultsProvince.get(0));
			//************* set value Button *****************//
		
//			domain.setTatolManey(new BahtText(arg0).totalPayment);
			domain.setBank(resu.get(0));
			domain.setBranch(resultsEmp.getBranch());
			domain.setAccountNumber(resultsEmp.getAccountNo());
			domain.setTypeAccount(resultsBranch.get(0));
//			domain.setName("ffasfds");
//			domain.setId("fdsaf");
//			domain.setCompany("fdsfsdfs");
//			domain.setAddress("fdsfa");
//			domain.setPhone("fsdf");
//			domain.setEmail("fsdfa");
			List<TravelHeader> teeeeeee = this.travelHeader01Service.findTravelHeader();
			for(TravelHeader c:teeeeeee){
				logger.debug("+++++++++++++++++++++{}--------------------",c.getAddress());
			}
			logger.debug("+++++++++++++++++++++{}--------------------",resu.get(0));
			logger.debug("+++++++++++++++++++++{}--------------------",domain.getName());
			model.put("tesrt", JSONObject.fromObject(BeanUtils.beanToMap(domain)).toString());
			
			return new ModelAndView("SCF003", model);

		}
		
		@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=antecedent" )
		public void findComSS(HttpServletRequest request, HttpServletResponse response) {
			List<ParameterTable> resultsParam = this.parameterTable01Service.findByDept();
			JSONArray jsonArray = new JSONArray();
			GridData gridData = new GridData();
			
			JSONObject jobect1 = new JSONObject();
			for(ParameterTable c:resultsParam){
			
			
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
		@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=antercedent2" )
		public void findComSS2(HttpServletRequest request, HttpServletResponse response) {
				
			List<ParameterTable> resultsParam = this.parameterTable01Service.findByProvince();
			JSONArray jsonArray = new JSONArray();
			GridData gridData = new GridData();
			
			JSONObject jobect1 = new JSONObject();
			
			for(int i=0;i< resultsParam.size();i++){
			logger.debug("-*-{}-*-",resultsParam.get(i));
			
			
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
		
		@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=gridData" )
		public void findGrid(HttpServletRequest request, HttpServletResponse response) {
				
			JSONArray jsonArray = new JSONArray();
			GridData gridData = new GridData();
			
			JSONObject jobect1 = new JSONObject();
			jobect1.accumulate("no", "01");
			jobect1.accumulate("gridDate", "17/16/06");
			jobect1.accumulate("customer", "mardnakub");
			jobect1.accumulate("region", "Bangkok");
			jobect1.accumulate("goal", "Bangkok");
			jobect1.accumulate("paymentTravel", "1000");
			jobect1.accumulate("paymentD", "1000");
			jobect1.accumulate("payment", "2000");
			jobect1.accumulate("remark", "No");
		
			jsonArray.add(jobect1);
			
			JSONObject jobect2 = new JSONObject();
			jobect2.accumulate("no", "02");
			jobect2.accumulate("gridDate", "18/16/06");
			jobect2.accumulate("customer", "mardnakub");
			jobect2.accumulate("region", "Bangkok");
			jobect2.accumulate("goal", "Bangkok");
			jobect2.accumulate("paymentTravel", "1000");
			jobect2.accumulate("paymentD", "1000");
			jobect2.accumulate("payment", "2000");
			jobect2.accumulate("remark", "No");
			jsonArray.add(jobect2);
			
			JSONObject jobect3 = new JSONObject();
			jobect3.accumulate("no", "03");
			jobect3.accumulate("gridDate", "19/16/06");
			jobect3.accumulate("customer", "mardnakub");
			jobect3.accumulate("region", "Bangkok");
			jobect3.accumulate("goal", "Bangkok");
			jobect3.accumulate("paymentTravel", "1000");
			jobect3.accumulate("paymentD", "1000");
			jobect3.accumulate("payment", "2000");
			jobect3.accumulate("remark", "No");
			jsonArray.add(jobect3);
			
			gridData.setRecords(jsonArray);
	        gridData.setTotal(jsonArray.size());
	        gridData.setSuccess(true);
	       
	        gridData.responseJson(response);

			

		}

		
		//************************ Save History *************************//
				@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=save1")
				public void save1(HttpServletRequest request, HttpServletResponse response,
				
						@ModelAttribute SCF003Domain01 domain,
						@RequestParam("no") String no,
						@RequestParam("date") String date,
						@RequestParam("name") String name,
						@RequestParam("id") String id,
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
						@RequestParam("document") String document,
						@RequestParam("forPay") String forPay,
						@RequestParam("bank") String bank,
						@RequestParam("branch") String branch,
						@RequestParam("accountNumber") String accountNumber,
						@RequestParam("typeAccount") String typeAccount,
						@RequestParam("type1") String type1,
						@RequestParam("type2") String type2
						
						
						)throws Exception {
					
					try {
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
						//********************* set Buttom Data ********************//
						domain.setTatolPaym(tatolPaym);
						domain.setTatolPaymA(tatolPaymA);
						domain.setTatolPaymfullCase(tatolPaymfullCase);
					
						domain.setTatolManey(tatolManey);
						domain.setDocument(document);
						domain.setForPay(forPay);
						domain.setBank(bank);
						domain.setBranch(branch);
						domain.setAccountNumber(accountNumber);
						domain.setTypeAccount(typeAccount);
						domain.setType1(type1);
						domain.setType2(type2);
						logger.debug("---------------------{}+++++++{}+++++++++++++++++++++++++++++++",domain.getNo(),domain.getDate()); 
						logger.debug("-----{}+++++",domain.getName());
						logger.debug("-----{}+++++",domain.getId());
						logger.debug("-----{}+++++",domain.getCompany());
						logger.debug("-----{}+++++",domain.getAntecedent());
						logger.debug("-----{}+++++",domain.getAddress());
						logger.debug("-----{}+++++",domain.getAntercedentA());
						logger.debug("-----{}+++++",domain.getPhone());
						logger.debug("-----{}+++++",domain.getEmail());
						logger.debug("-----{}+++++",domain.getTatolPaym());
						logger.debug("-----{}+++++",domain.getTatolPaymA());
						logger.debug("-----{}+++++",domain.getTatolPaymfullCase());
						logger.debug("-----{}+++++",domain.getTatolManey());
						logger.debug("-----{}+++++",domain.getDocument());
						logger.debug("-----{}+++++",domain.getForPay());
						logger.debug("-----{}+++++",domain.getBank());
						logger.debug("-----{}+++++",domain.getBranch());
						logger.debug("-----{}+++++",domain.getAccountNumber());
						logger.debug("-----{}+++++",domain.getTypeAccount());
						logger.debug("-----{}+++++",domain.getType1());
						logger.debug("-----{}+++++",domain.getType2());
						
					} catch (Exception e) {
						e.printStackTrace();
						logger.error(e.getMessage());
					}
					
				}
		
		//************************* Save Grid ********************************//
		
		@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=save2")
		public void save2(HttpServletRequest request, HttpServletResponse response,
		
				@ModelAttribute SCF003Domain01 domain,
				@RequestParam("dataGridNo") String dataGridNo,
				@RequestParam("dataGridData") String dataGridData,
				@RequestParam("dataGridCustomer") String dataGridCustomer,
				@RequestParam("dataGridRegion") String dataGridRegion,
				@RequestParam("dataGridGoal") String dataGridGoal,
				@RequestParam("dataGridPaymentTravel") String dataGridPaymentTravel,
				@RequestParam("dataGridPaymentD") String dataGridPaymentD,
				@RequestParam("dataGridPayment") String dataGridPayment,
				@RequestParam("dataRemark") String dataRemark
				
				)throws Exception {
			
			try {
				domain.setDataGridNo(dataGridNo);
				domain.setDataGridData(dataGridData);
				domain.setDataGridCustomer(dataGridCustomer);
				domain.setDataGridRegion(dataGridRegion);
				domain.setDataGridGoal(dataGridGoal);
				domain.setDataGridPaymentTravel(dataGridPaymentTravel);
				domain.setDataGridPaymentD(dataGridPaymentD);
				domain.setDataGridPayment(dataGridPayment);
				domain.setDataRemark(dataRemark);
				logger.debug("-----{}+++++",domain.getDataGridNo()); 
				logger.debug("-----{}+++++",domain.getDataGridData());
				logger.debug("-----{}+++++",domain.getDataGridCustomer());
				logger.debug("-----{}+++++",domain.getDataGridRegion());
				logger.debug("-----{}+++++",domain.getDataGridGoal());
				logger.debug("-----{}+++++",domain.getDataGridPaymentTravel());
				logger.debug("-----{}+++++",domain.getDataGridPaymentD());
				logger.debug("-----{}+++++",domain.getDataGridPayment());
				logger.debug("-----{}+++++",domain.getDataRemark());
			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e.getMessage());
			}

		}
	
		
}