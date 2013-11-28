package com.spt.tsa.controller;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
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
import org.springframework.web.servlet.ModelAndView;

import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.domain.SCP007Domain01;
import com.spt.tsa.domain.SDM009Domain01;
import com.spt.tsa.domain.SPS010Domain01;
import com.spt.tsa.entity.Customer;
import com.spt.tsa.entity.Employee;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.TravelDetail;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.Customer01Service;
import com.spt.tsa.service.Employee01Service;
import com.spt.tsa.service.ParameterTable01Service;
import com.spt.tsa.service.TravelDetail01Service;
@Controller
public class SPS010Controller {
	private static final Logger logger = LoggerFactory.getLogger(SPS010Controller.class);
	private ParameterTable01Service parameterTable01Service;
	private Customer01Service customer01Service;
	private Employee01Service employee01Service;
	private TravelDetail01Service travelDetail01Service;
	
	
	@Autowired
	public void setTravelDetail01Service(TravelDetail01Service travelDetail01Service) {
		this.travelDetail01Service = travelDetail01Service;
	}


	@Autowired
	public void setEmployee01Service(Employee01Service employee01Service) {
		this.employee01Service = employee01Service;
	}


	@Autowired
	public void setCustomer01Service(Customer01Service customer01Service) {
		this.customer01Service = customer01Service;
	}


	@Autowired
	public void setParameterTable01Service(
			ParameterTable01Service parameterTable01Service) {
		this.parameterTable01Service = parameterTable01Service;
	}


		@RequestMapping(value = "/SPS010.html", method = RequestMethod.GET)
		public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {
			Object sessionPrivilege = request.getSession().getAttribute("sessionPrivilege");
			String privilege = (String)sessionPrivilege;
			try {
				if((!(privilege.equals("admin")))){ 			
					request.getSession().removeAttribute("sessionPrivilege");
					response.sendRedirect((String)request.getSession().getAttribute("sessionIndexPage"));				
				}else{
					Map<String,Object> model = new HashMap<String,Object>();					
					return new ModelAndView("SPS010", model);
				}		
			} catch (Exception e) {

			}
			return new ModelAndView("");

		}
		
		@RequestMapping(value = "/SPS010.html", method = RequestMethod.POST, params = "method=spscomboboxStoreDept")
		public void findDept(HttpServletRequest request,
				HttpServletResponse response) {
			List<ParameterTable> resultsParam = this.parameterTable01Service
					.findByDept();
			JSONArray jsonArray = new JSONArray();
			GridData gridData = new GridData();

			JSONObject jobect1 = new JSONObject();
			for (ParameterTable c : resultsParam) {

				jobect1.accumulate("code", c.getEntry());
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
		
		@RequestMapping(value = "/SPS010.html", method = RequestMethod.POST, params = "method=spsComboboxCustomerStore")
		public void findCustomer(HttpServletRequest request,
				HttpServletResponse response) {
			List<Customer> resultsCus = this.customer01Service.findCustomer();
			JSONArray jsonArray = new JSONArray();
			GridData gridData = new GridData();

			JSONObject jobect1 = new JSONObject();
			for (Customer c : resultsCus) {

				jobect1.accumulate("code", c.getCusId());
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
		
		@RequestMapping(value = "/SPS010.html", method = RequestMethod.POST, params = "method=spsparamSession")
		public void spsSession(HttpServletRequest request, HttpServletResponse response,

		@ModelAttribute SPS010Domain01 domain,
				@RequestParam("spsEmpId") String spsEmpId,
				@RequestParam("spsNameEmp") String spsNameEmp,
				@RequestParam("spsCreateComboboxDept") String spsCreateComboboxDept,
				@RequestParam("spsComboboxCustomer") String spsComboboxCustomer,
				@RequestParam("spsStartDate") String spsStartDate,
				@RequestParam("spsEndDate") String spsEndDate

		) throws Exception {

			try {
				
				domain.setSpsEmpId(spsEmpId);
				domain.setSpsNameEmp(spsNameEmp);
				domain.setSpsCreateComboboxDept(spsCreateComboboxDept);
				domain.setSpsComboboxCustomer(spsComboboxCustomer);
				domain.setSpsStartDate(spsStartDate);
				domain.setSpsEndDate(spsEndDate);

				request.getSession().setAttribute("spsEmpId", domain.getSpsEmpId());
				request.getSession().setAttribute("spsNameEmp", domain.getSpsNameEmp());
				request.getSession().setAttribute("spsCreateComboboxDept", domain.getSpsCreateComboboxDept());
				request.getSession().setAttribute("spsComboboxCustomer", domain.getSpsComboboxCustomer());
				request.getSession().setAttribute("spsStartDate", domain.getSpsStartDate());
				request.getSession().setAttribute("spsEndDate", domain.getSpsEndDate());
				

		
				

			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e.getMessage());
			}

		}

}
