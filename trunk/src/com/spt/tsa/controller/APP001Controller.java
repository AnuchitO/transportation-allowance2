package com.spt.tsa.controller;

import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.spt.tsa.entity.*;
import com.spt.tsa.service.*;


@Controller
public class APP001Controller{
	private static Logger logger = LoggerFactory.getLogger(APP001Controller.class);
	
	private Company01Service company01Service;
	private AccountAdmin01Service accountAdmin01Service;
	private Customer01Service customer01Service;
	private Employee01Service employee01Service;
	private PaymentDetail01Service paymentDetail01Service;
	private PaymentHeader01Service paymentHeader01Service;
	private TravelDetail01Service travelDetail01Service;
	private TravelHeader01Service travelHeader01Service;
	private ParameterTable01Service parameterTable01Service;
	
	
	@Autowired
    public void setCompany01Service(Company01Service company01Service) {
   	 this.company01Service = company01Service;
    }
	
	
	
	@Autowired
    public void setAccountAdmin01Service(AccountAdmin01Service accountAdmin01Service) {
   	 this.accountAdmin01Service = accountAdmin01Service;
    }
	
	
	@Autowired
    public void setCustomer01Service(Customer01Service customer01Service) {
   	 this.customer01Service = customer01Service;
    }
	
	@Autowired
    public void setEmployee01Service(Employee01Service employee01Service) {
   	 this.employee01Service= employee01Service;
    }
	
	@Autowired
    public void setPaymentDetail01Service(PaymentDetail01Service paymentDetail01Service) {
   	 this.paymentDetail01Service= paymentDetail01Service;
    }
	
	@Autowired
    public void setPaymentHeader01Service(PaymentHeader01Service paymentHeader01Service) {
   	 this.paymentHeader01Service= paymentHeader01Service;
    }
	
	@Autowired
    public void setTravelDetail01Service(TravelDetail01Service travelDetail01Service) {
   	 this.travelDetail01Service= travelDetail01Service;
    }
	
	@Autowired
    public void setTravelHeader01Service(TravelHeader01Service travelHeader01Service) {
   	 this.travelHeader01Service= travelHeader01Service;
    }
	
	@Autowired
	public void setParameterTable01Service(
			ParameterTable01Service parameterTable01Service) {
		this.parameterTable01Service = parameterTable01Service;
	}

	
	@RequestMapping(value="/app001.html",method=RequestMethod.GET)
    public ModelAndView handleRequest(HttpServletRequest arg0,
   		 HttpServletResponse arg1) throws Exception {
		List<AccountAdmin> results = this.accountAdmin01Service.findAccountAdmin();
		List<Company> resultsCom = this.company01Service.findCompany();
		List<Customer> resultsCus = this.customer01Service.findCustomer();
		List<Employee> resultsEmp = this.employee01Service.findEmployee();
		List<PaymentDetail> resultsPayD = this.paymentDetail01Service.findPaymentDetail();
		List<PaymentHeader> resultsPayH = this.paymentHeader01Service.findPaymentHeader();
		List<TravelDetail> resultsTravelD = this.travelDetail01Service.findTravelDetail();
		List<TravelHeader> resultsTravelH = this.travelHeader01Service.findTravelHeader();
		List<ParameterTable> resultsParame = this.parameterTable01Service.findTable("2");
		logger.debug("++++++++++++++++++++++++++++++++++++");
		for(ParameterTable parame : resultsParame){
			logger.debug("++++++++++++++++++++++++++++++++++++{}",parame.getDetail());
		}

		
		
		for(PaymentHeader c:resultsPayH){
			
			
			logger.debug("+++++++++++++++++{}-------------{}",c.getTravelHeader().getNo(),c.getCreationDate());
	
		}
		logger.info("==============================in APP001Controller");
		
		Map model = new HashMap();
		
		
		model.put("account",results);
		model.put("com",resultsCom);
		model.put("customer",resultsCus);
		model.put("employee",resultsEmp);
		model.put("paymentDetail", resultsPayD);
		model.put("paymentHeader", resultsPayH);
		model.put("travelDetail", resultsTravelD);
		model.put("travelHeader", resultsTravelH);
	
		
		return new ModelAndView("app001",model);
    }









	

}
