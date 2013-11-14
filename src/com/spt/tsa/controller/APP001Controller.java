package com.spt.tsa.controller;

import java.text.SimpleDateFormat;
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
//		List<AccountAdmin> results = this.accountAdmin01Service.findAccountAdmin();
//		List<Company> resultsCom = this.company01Service.findCompany();
//		List<Customer> resultsCus = this.customer01Service.findCustomer();
//		List<Employee> resultsEmp = this.employee01Service.findEmployee();
//		List<PaymentDetail> resultsPayD = this.paymentDetail01Service.findPaymentDetail();
//		List<PaymentHeader> resultsPayH = this.paymentHeader01Service.findPaymentHeader();
//		List<TravelDetail> resultsTravelD = this.travelDetail01Service.findTravelDetail();
//		List<TravelHeader> resultsTravelH = this.travelHeader01Service.findTravelHeader();
//		List<ParameterTable> resultsParame = this.parameterTable01Service.findTable("2");
//		List<ParameterTable> resultsPara = this.parameterTable01Service.findByDept();
//		for(ParameterTable c:resultsPara){
//			logger.debug("++++++++++++++++++++++++++++++++++++{}",c.getDetail());
//		}
//		logger.debug("++++++++++++++++++++++++++++++++++++");
//		for(ParameterTable parame : resultsParame){
//			logger.debug("++++++++++++++++++++++++++++++++++++{}",parame.getDetail());
//		}
//
//		
//		
//		for(PaymentHeader c:resultsPayH){
//			
//			
//			logger.debug("+++++++++++++++++{}-------------{}",c.getTravelHeader().getNo(),c.getCreationDate());
//	
//		}
//		logger.info("==============================in APP001Controller");
//		
//		List<Customer> customer = this.customer01Service.findByName("ANUCHIT");
//		
//		for(Customer c:customer){
//			
//			
//			logger.debug("+++++++++++++++++{}-------------{}",c.getName(),c);
//			
//	
//		}
//		
//		TravelHeader travelHeader2 = this.travelHeader01Service.findByDocNoForSaveOrUpdate("990086").get(0);
//			logger.debug("++++++findByDocNoForSaveOrUpdate+++++++++{}-------------",travelHeader2.getStatus());
//		travelHeader2.setStatus("001");
//		this.travelHeader01Service.saveHeaderCreateFrom(travelHeader2);
//		
//		TravelHeader travelHeaderForDetail = this.travelHeader01Service.findByDocNoForSaveOrUpdate("990099").get(0);
//		List<TravelDetail>  gridRowList =  this.travelDetail01Service.findRowOfGridForUpdateRow(travelHeaderForDetail, "01");
//		
//		for(TravelDetail c:gridRowList){				
//			logger.debug("++++++@@@@@@@@@@@@@@@@@+++++gridRowList++++++{}-------------{}",c.getNo(),c.getTravelHeader().getNo());
//			c.setTravelExpenses(new Double("1111"));
//			c.setMotorWay(new Double("22222"));
//			c.setTotalDay(new Double("33333"));
//			this.travelDetail01Service.saveTravelDetailCreateForm(c);
//		}
//		
		String from ="2013/11/12";
//		String to = "2013/12/12";
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
		Date startDate = (Date) format.parse(from);
		Employee employees = this.employee01Service.findEmployeeByIdName("EMp001");
		List<TravelHeader> resultsTravelH  =null;
//		resultsTravelH = this.travelHeader01Service.findLikeYearAndStatus(employees,"2554", "%");
//		resultsTravelH = this.travelHeader01Service.findLikeYearAndStatus(employees,"%", "005");// work
//		resultsTravelH = this.travelHeader01Service.findLikeYearAndStatus(employees,"%", "001");//work
//		resultsTravelH = this.travelHeader01Service.findLikeYearAndStatus(employees,"%", "002");//work
//		resultsTravelH = this.travelHeader01Service.findLikeYearAndStatus(employees,"%", "003");//work
//		resultsTravelH = this.travelHeader01Service.findLikeYearAndStatus(employees,"%", "004");//work
		for(TravelHeader c:resultsTravelH){				
			logger.debug("++++++@@@@@@@@@@@@@@@@@+++++gridRowList++++++{}-------------{}",c.getCreationate(),c.getStatus());
		}
		Map model = new HashMap();
		
		
//		model.put("account",results);
//		model.put("com",resultsCom);
//		model.put("customer",resultsCus);
//		model.put("employee",resultsEmp);
//		model.put("paymentDetail", resultsPayD);
//		model.put("paymentHeader", resultsPayH);
//		model.put("travelDetail", resultsTravelD);
		model.put("travelHeader", resultsTravelH);
	
		
		return new ModelAndView("app001",model);
    }









	

}
