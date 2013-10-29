package com.spt.tsa.controller;

import java.io.PrintWriter;
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

















import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.Employee;
import com.spt.tsa.service.Employee01Service;
import com.spt.tsa.util.BeanUtils;




@Controller
public class SCF003Controller {
	private static Logger logger = LoggerFactory.getLogger(APP001Controller.class);
	
	private Employee01Service employee01Service;
	
	@Autowired
    public void setEmployee01Service(Employee01Service employee01Service) {
   	 this.employee01Service= employee01Service;
    }
	
//
		@RequestMapping(value = "/SCF003.html", method = RequestMethod.GET)
		public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {
			
			Map<String,Object> model = new HashMap<String,Object>();
			Employee resultsEmp = this.employee01Service.findEmployeeWhereId();
//			SCF003Domain01 domain = new SCF003Domain01();
//			for(Employee c:resultsEmp){
//				domain.setName(c.getName());
//				domain.setId(c.getEmpId());
//				
//			}
			SCF003Domain01 domain = new SCF003Domain01();
			domain.setName(resultsEmp.getName());
			domain.setId(resultsEmp.getEmpId());
			domain.setCompany(resultsEmp.getCompany().getName());
			domain.setAddress(resultsEmp.getAddress());
			domain.setPhone(resultsEmp.getTelephone());
			domain.setEmail(resultsEmp.getEmail());
//			domain.setName("ffasfds");
//			domain.setId("fdsaf");
//			domain.setCompany("fdsfsdfs");
//			domain.setAddress("fdsfa");
//			domain.setPhone("fsdf");
//			domain.setEmail("fsdfa");
			logger.debug("+++++++++++++++++++++{}--------------------",domain.getName());
			model.put("tesrt", JSONObject.fromObject(BeanUtils.beanToMap(domain)).toString());
			return new ModelAndView("SCF003", model);

		}
		
		@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=antecedent" )
		public void findComSS(HttpServletRequest request, HttpServletResponse response) {
				
			JSONArray jsonArray = new JSONArray();
			GridData gridData = new GridData();
			
			JSONObject jobect1 = new JSONObject();
			jobect1.accumulate("code", "01");
			jobect1.accumulate("description", "Ms");
			jsonArray.add(jobect1);
			
			JSONObject jobect2 = new JSONObject();
			jobect2.accumulate("code", "02");
			jobect2.accumulate("description", "Mrs");
			jsonArray.add(jobect2);
			
			JSONObject jobect3 = new JSONObject();
			jobect3.accumulate("code", "03");
			jobect3.accumulate("description", "Mr");
			jsonArray.add(jobect3);
			
			gridData.setRecords(jsonArray);
	        gridData.setTotal(jsonArray.size());
	        gridData.setSuccess(true);
	       
	        gridData.responseJson(response);

			

		}
		@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=antercedent2" )
		public void findComSS2(HttpServletRequest request, HttpServletResponse response) {
				
			JSONArray jsonArray = new JSONArray();
			GridData gridData = new GridData();
			
			JSONObject jobect1 = new JSONObject();
			jobect1.accumulate("code", "01");
			jobect1.accumulate("description", "Ms");
			jsonArray.add(jobect1);
			
			JSONObject jobect2 = new JSONObject();
			jobect2.accumulate("code", "02");
			jobect2.accumulate("description", "Mrs");
			jsonArray.add(jobect2);
			
			JSONObject jobect3 = new JSONObject();
			jobect3.accumulate("code", "03");
			jobect3.accumulate("description", "Mr");
			jsonArray.add(jobect3);
			
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

		@RequestMapping(value = "/SCF003.html", method = RequestMethod.POST, params = "method=save")
		public void save(HttpServletRequest request, HttpServletResponse response,
		
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
				logger.debug("-----{}+++++"+domain.getDataGridNo()); 
				logger.debug("-----{}+++++"+domain.getDataGridData());
				logger.debug("-----{}+++++"+domain.getDataGridCustomer());
				logger.debug("-----{}+++++"+domain.getDataGridRegion());
				logger.debug("-----{}+++++"+domain.getDataGridGoal());
				logger.debug("-----{}+++++"+domain.getDataGridPaymentTravel());
				logger.debug("-----{}+++++"+domain.getDataGridPaymentD());
				logger.debug("-----{}+++++"+domain.getDataGridPayment());
				logger.debug("-----{}+++++"+domain.getDataRemark());
			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e.getMessage());
			}

		}
		}


		
