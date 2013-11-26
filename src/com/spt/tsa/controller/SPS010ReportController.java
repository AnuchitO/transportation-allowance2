package com.spt.tsa.controller;
import java.util.*;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.controller.datasource.SPV004JasperDataSource;
import com.spt.tsa.controller.datasource.SPV004Pojo;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.domain.SCP007Domain01;
import com.spt.tsa.domain.SDM009Domain01;
import com.spt.tsa.domain.SPS010DataReport;
import com.spt.tsa.domain.SPS010Report;
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







import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
@Controller
public class SPS010ReportController {
	private static final Logger logger = LoggerFactory.getLogger(SPS010ReportController.class);
	private Employee01Service employee01Service;
	private TravelHeader01Service travelHeader01Service;
	private ParameterTable01Service parameterTable01Service;
	private Customer01Service customer01Service;
	private TravelDetail01Service travelDetail01Service;
	
	@Autowired
	public void setTravelDetail01Service(TravelDetail01Service travelDetail01Service) {
		this.travelDetail01Service = travelDetail01Service;
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



	@Autowired
	public void setTravelHeader01Service(TravelHeader01Service travelHeader01Service) {
		this.travelHeader01Service = travelHeader01Service;
	}



	@Autowired
	public void setEmployee01Service(Employee01Service employee01Service) {
		this.employee01Service = employee01Service;
	}



	@RequestMapping(value = "/SPS010Report.pdf", method = RequestMethod.GET)
	public String printWelcome(ModelMap model,HttpServletRequest request) throws JRException{	
		
		Object spsEmpIdSession = request.getSession().getAttribute("spsEmpId");
		Object spsNameEmpSession = request.getSession().getAttribute("spsNameEmp");
		Object spsCreateComboboxDeptSession = request.getSession().getAttribute("spsCreateComboboxDept");
		Object spsComboboxCustomerSession = request.getSession().getAttribute("spsComboboxCustomer");
		Object spsStartDateSession = request.getSession().getAttribute("spsStartDate");
		Object spsEndDateSession = request.getSession().getAttribute("spsEndDate");
		
		String sessionSpsEmpId = (String)spsEmpIdSession;
		String sessionSpsEmpName = (String)spsNameEmpSession;
		String sessionSpsCreateComboboxDeptSession = (String)spsCreateComboboxDeptSession;
		String sessionSpsComboboxCustomerSession = (String)spsComboboxCustomerSession;
		String sessionSpsStartDate = (String)spsStartDateSession;
		String sessionSpsEndDate = (String)spsEndDateSession;
	
		//***************************** parametor for search ****************************//
		List  resultsQuery = null;
		List<Object> items = new ArrayList<Object>();
		try {
					
			String newStartDate = "";
			String newEndDate = "";
			DateFormat df = new SimpleDateFormat("dd/MM/yyyy"); 
			
			if(sessionSpsStartDate.equals("%")){
				newStartDate = "%";
			}else{
				String [] splitDate = sessionSpsStartDate.split("-");
				String dateFormate = splitDate[2].substring(0, 2)+"/"+splitDate[1]+"/"+splitDate[0];
				String startDateString = dateFormate;
			    Date startDate;
			    startDate = df.parse(startDateString);
			    newStartDate = df.format(startDate);
			}
			
			if(sessionSpsEndDate.equals("%")){				
				newEndDate = df.format(new Date())+"%";
			}else{
			    String [] splitEndDate = sessionSpsEndDate.split("-");
				String endDateFormate = splitEndDate[2].substring(0, 2)+"/"+splitEndDate[1]+"/"+splitEndDate[0];
				
			    String endDate = endDateFormate;
			    Date endDateformat;
			    endDateformat = df.parse(endDate);
			    newEndDate = df.format(endDateformat);
			}
			
		  	String status = "004";
		  	List<Employee> emp = null;
		  	String empId = "";
			if((sessionSpsEmpId.equals("%"))&&(sessionSpsEmpName.equals("%"))){
				empId = "%";
			}else if((sessionSpsEmpId.equals("%"))&&!(sessionSpsEmpName.equals("%"))){
				try {
					emp = this.employee01Service.findLikeIdEmpAndNameEmp(sessionSpsEmpId, sessionSpsEmpName);
					empId = emp.get(0).getEmpId();
				} catch (Exception e) {
					empId = "-";
				}

			}else if(!(sessionSpsEmpId.equals("%"))&&(sessionSpsEmpName.equals("%"))){
				empId = sessionSpsEmpId;
			}else if(!(sessionSpsEmpId.equals("%"))&&!(sessionSpsEmpName.equals("%"))){
				try {
					emp = this.employee01Service.findLikeIdEmpAndNameEmp(sessionSpsEmpId, sessionSpsEmpName);
					empId = emp.get(0).getEmpId();
				} catch (Exception e) {
					empId = "-";
				}

			}else{
				empId = "-";
			}					
		  	String deptCode = sessionSpsCreateComboboxDeptSession;
		  	String cuId = sessionSpsComboboxCustomerSession;
		  	String startDateForQuery = newStartDate;
		  	String endDateForQuery = newEndDate; 
		  	resultsQuery = this.travelDetail01Service.queryForReportPageSPS10(status, empId, deptCode, cuId, startDateForQuery, endDateForQuery);
		  	String tHeadId="";
		  	Map<String,TravelHeader> mapEmp = new HashMap<String,TravelHeader>();
			Map<String,Double> mapAmount = new HashMap<String,Double>();
			Double total = 0.0;
		  	for(int i = 0;i<resultsQuery.size();i++){
				tHeadId = (String) resultsQuery.get(i);
				TravelHeader tHeaders = this.travelHeader01Service.findByTHeadId(tHeadId);
				String keyEmpId = tHeaders.getEmployee().getEmpId();
					Double douTotal = tHeaders.getTotal();
					total+=douTotal;
					if(mapAmount.get(keyEmpId)!=null){
						douTotal +=mapAmount.get(keyEmpId);
					}
				mapAmount.put(keyEmpId, douTotal);
				mapEmp.put(keyEmpId, tHeaders);	
		  	}
		  	
		  	
		  	/////////////////////// Add data into Report /////////////////////////////////
		  	Iterator<String> itr = mapEmp.keySet().iterator();
		  	
		  	SPS010Report item1 = null;
		  	Integer i = 1;
			while(itr.hasNext()){
				String empIdKey = itr.next();
				TravelHeader th = mapEmp.get(empIdKey);
								
				item1 = new SPS010Report();
				item1.setNo(i.toString());
				i++;
				item1.setIdEmp(empIdKey);
				String fullName = th.getEmployee().getName() + " " + " " +th.getEmployee().getLastname();
				item1.setNameEmp(fullName);
				item1.setIdDept(th.getNameDept());
				DateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			    String dateCreatePrintpreview = formatDate.format(new java.util.Date());
			    String[] dateCreate = dateCreatePrintpreview.split(" ");
				item1.setDate(dateCreate[0]);
				item1.setTime(dateCreate[1].substring(0, 5));
				
///////////// Freeze /////////
//				if(sessionSpsStartDate.equals("%")){
//					
//				}else if(){
//					
//				}else if(){
//					
//				}else{
//					
//				}
				if(sessionSpsComboboxCustomerSession.equals("%")){
					item1.setCustomer("ทุกลูกค้า");
				}else{
					item1.setCustomer(sessionSpsComboboxCustomerSession);
				}

//////////////////// Freeze /////////////
				item1.setMonth("ทุกเดือน");
				item1.setDateYear("ทุกปี");				
				item1.setTotalMoney(mapAmount.get(empIdKey).toString());
				item1.setTotalMoneyFull(total.toString());				
				items.add(item1);				
			}
			/////////////////////// End Add data into Report /////////////////////////////////	
				
	  	
		  	
		} catch (Exception e) {
			// TODO: handle exception
		}
		JRDataSource dataSource = new JRBeanCollectionDataSource(items); 
		
		model.addAttribute("datasource", dataSource);
		model.addAttribute("format", "pdf");	

		//*******************************************************************************************//
		
//		
//	
//	if(!sessionSpsEmpId.isEmpty() && sessionSpsEmpName.isEmpty() && sessionSpsCreateComboboxDeptSession.isEmpty() && sessionSpsComboboxCustomerSession.isEmpty() && sessionSpsStartDate.isEmpty() && sessionSpsEndDate.isEmpty()){
//		Employee emp = this.employee01Service.findEmployeeWhereId(sessionSpsEmpId);
//		List<TravelHeader> traH = this.travelHeader01Service.findByEmpIdInTravelHeader(emp);
//		List<Object> items = new ArrayList<Object>();
//		double total = 0;
//		for(TravelHeader c:traH){
//			total += c.getTotal();	
//		}
//		SPS010Report item1 = new SPS010Report();
//		
//		item1.setNo("1");
//		item1.setIdEmp(emp.getEmpId());
//		String fullName = emp.getName() + " " + " " + emp.getLastname();
//		item1.setNameEmp(fullName);
//		item1.setIdDept(emp.getDepId());
//		DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
//	    String dateCreatePrintpreview = df.format(new java.util.Date());
//	    String[] dateCreate = dateCreatePrintpreview.split(" ");
//		item1.setDate(dateCreate[0]);
//		item1.setTime(dateCreate[1].substring(0, 5));
//		item1.setCustomer("ทุกลูกค้า");
//		item1.setMonth("ทุกเดือน");
//		item1.setDateYear("ทุกปี");
//		item1.setTotalMoney(Double.toString(total));
//		item1.setTotalMoneyFull(Double.toString(total));
//	
//		items.add(item1);
//	
//	
//		
//
//	JRDataSource dataSource = new JRBeanCollectionDataSource(items); 
//	
//	model.addAttribute("datasource", dataSource);
//	model.addAttribute("format", "pdf");
//	}	
//	
//	else if(sessionSpsEmpId.isEmpty() && !sessionSpsEmpName.isEmpty() && sessionSpsCreateComboboxDeptSession.isEmpty() && sessionSpsComboboxCustomerSession.isEmpty() && sessionSpsStartDate.isEmpty() && sessionSpsEndDate.isEmpty()){
//		List<Employee> emp = this.employee01Service.findNameEmployee(sessionSpsEmpName);
//		List<TravelHeader> traH = this.travelHeader01Service.findByEmpIdInTravelHeader(emp.get(0));
//		List<Object> items = new ArrayList<Object>();
//		double total = 0;
//		for(TravelHeader c:traH){
//			total += c.getTotal();	
//		}
//		SPS010Report item1 = new SPS010Report();
//		
//		item1.setNo("1");
//		item1.setIdEmp(emp.get(0).getEmpId());
//		String fullName = emp.get(0).getName() + " " + " " + emp.get(0).getLastname();
//		item1.setNameEmp(fullName);
//		item1.setIdDept(emp.get(0).getDepId());
//		DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
//	    String dateCreatePrintpreview = df.format(new java.util.Date());
//	    String[] dateCreate = dateCreatePrintpreview.split(" ");
//		item1.setDate(dateCreate[0]);
//		item1.setTime(dateCreate[1].substring(0, 5));
//		item1.setCustomer("ทุกลูกค้า");
//		item1.setMonth("ทุกเดือน");
//		item1.setDateYear("ทุกปี");
//		item1.setTotalMoney(Double.toString(total));
//		item1.setTotalMoneyFull(Double.toString(total));
//	
//		items.add(item1);
//	
//	JRDataSource dataSource = new JRBeanCollectionDataSource(items); 
//	
//	model.addAttribute("datasource", dataSource);
//	model.addAttribute("format", "pdf");
//	
//	}	
//	
//	else if(sessionSpsEmpId.isEmpty() && sessionSpsEmpName.isEmpty() && !sessionSpsCreateComboboxDeptSession.isEmpty() && sessionSpsComboboxCustomerSession.isEmpty() && sessionSpsStartDate.isEmpty() && sessionSpsEndDate.isEmpty()){
//		List<ParameterTable> param = this.parameterTable01Service.findDeptSelect(sessionSpsCreateComboboxDeptSession);
//		List<Employee> emp = this.employee01Service.findDeptSelectEmp(param.get(0).getEntry());
//		if(emp.size() != 0){
//		List<Object> items = new ArrayList<Object>();
//		double totalfullCase = 0;
//	
//		int j = 0;
//		for(int i=0;i<emp.size();i++){
//			j++;
//			SPS010Report item1 = new SPS010Report();
//			item1.setNo(Integer.toString(j));
//			item1.setIdEmp(emp.get(i).getEmpId());
//			String fullName = emp.get(i).getName() + " " + " " + emp.get(i).getLastname();
//			item1.setNameEmp(fullName);
//			item1.setIdDept(emp.get(i).getDepId());
//			DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
//		    String dateCreatePrintpreview = df.format(new java.util.Date());
//		    String[] dateCreate = dateCreatePrintpreview.split(" ");
//			item1.setDate(dateCreate[0]);
//			item1.setTime(dateCreate[1].substring(0, 5));
//			item1.setCustomer("ทุกลูกค้า");
//			item1.setMonth("ทุกเดือน");
//			item1.setDateYear("ทุกปี");
//		List<TravelHeader> traH = this.travelHeader01Service.findNameDeptSelect(emp.get(i), param.get(0).getDetail());
//		double fullTotal = 0;
//		for(TravelHeader t:traH){
//			fullTotal += t.getTotal();
//		}
//		
//		item1.setTotalMoney(Double.toString(fullTotal));
//		totalfullCase += fullTotal;
//		item1.setTotalMoneyFull(Double.toString(totalfullCase));
//		items.add(item1);
//		
//		
//	
//	JRDataSource dataSource = new JRBeanCollectionDataSource(items); 
//	
//	model.addAttribute("datasource", dataSource);
//	model.addAttribute("format", "pdf");
//	
//			}	
//		}
//		else{
//			List<Object> items = new ArrayList<Object>();
//
//			SPS010Report item1 = new SPS010Report();
//			item1.setNo("-");
//			item1.setIdEmp("-");
//			item1.setNameEmp("-");
//			item1.setIdDept("-");
//			item1.setTotalMoney("-");
//			item1.setDate("-");
//			item1.setTime("-");
//			item1.setMonth("-");
//			item1.setCustomer("-");
//			item1.setDateYear("-");
//			item1.setTotalMoneyFull("-");
//			items.add(item1);
//		
//
//
//			JRDataSource dataSource = new JRBeanCollectionDataSource(items); 
//			model.addAttribute("datasource", dataSource);
//			model.addAttribute("format", "pdf");
//		}
//
//	}
//	
//	else if(sessionSpsEmpId.isEmpty() && sessionSpsEmpName.isEmpty() && sessionSpsCreateComboboxDeptSession.isEmpty() && !sessionSpsComboboxCustomerSession.isEmpty() && sessionSpsStartDate.isEmpty() && sessionSpsEndDate.isEmpty()){
//		List<Customer> cus = this.customer01Service.findByName(sessionSpsComboboxCustomerSession);
//
//		List<TravelDetail> traD = this.travelDetail01Service.findDetailWhereCustomer(cus.get(0));
//		for(int i = 0;i<traD.size();i++){
//		List<TravelHeader> traH = this.travelHeader01Service.findTravelHeaderWhereIdtravelDetail(traD.get(i).getTravelHeader().gettHeadId());
//		for(int j = 0 ; j< traH.size();j++){
//				List<Employee> emp = this.employee01Service.findEmpWhereEmpId(traH.get(0).getEmployee().getEmpId());
//				for(Employee e:emp){
//					logger.debug("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@{}",e.getName());
//				}
//		}
//		}
//		List<Employee> emp = this.employee01Service.findDeptSelectEmp(param.get(0).getEntry());
//		if(emp.size() != 0){
//		List<Object> items = new ArrayList<Object>();
//		double totalfullCase = 0;
//	
//		int j = 0;
//		for(int i=0;i<emp.size();i++){
//			j++;
//			SPS010Report item1 = new SPS010Report();
//			item1.setNo(Integer.toString(j));
//			item1.setIdEmp(emp.get(i).getEmpId());
//			String fullName = emp.get(i).getName() + " " + " " + emp.get(i).getLastname();
//			item1.setNameEmp(fullName);
//			item1.setIdDept(emp.get(i).getDepId());
//			DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
//		    String dateCreatePrintpreview = df.format(new java.util.Date());
//		    String[] dateCreate = dateCreatePrintpreview.split(" ");
//			item1.setDate(dateCreate[0]);
//			item1.setTime(dateCreate[1].substring(0, 5));
//			item1.setCustomer("ทุกลูกค้า");
//			item1.setMonth("ทุกเดือน");
//			item1.setDateYear("ทุกปี");
//		List<TravelHeader> traH = this.travelHeader01Service.findNameDeptSelect(emp.get(i), param.get(0).getDetail());
//		double fullTotal = 0;
//		for(TravelHeader t:traH){
//			fullTotal += t.getTotal();
//		}
//		
//		item1.setTotalMoney(Double.toString(fullTotal));
//		totalfullCase += fullTotal;
//		item1.setTotalMoneyFull(Double.toString(totalfullCase));
//		items.add(item1);
//		
//		
//	
//	JRDataSource dataSource = new JRBeanCollectionDataSource(items); 
//	
//	model.addAttribute("datasource", dataSource);
//	model.addAttribute("format", "pdf");
//	
//			}	
//		}
//		else{
//			List<Object> items = new ArrayList<Object>();
//
//			SPS010Report item1 = new SPS010Report();
//			item1.setNo("-");
//			item1.setIdEmp("-");
//			item1.setNameEmp("-");
//			item1.setIdDept("-");
//			item1.setTotalMoney("-");
//			item1.setDate("-");
//			item1.setTime("-");
//			item1.setMonth("-");
//			item1.setCustomer("-");
//			item1.setDateYear("-");
//			item1.setTotalMoneyFull("-");
//			items.add(item1);
//		
//
//
//			JRDataSource dataSource = new JRBeanCollectionDataSource(items); 
//			model.addAttribute("datasource", dataSource);
//			model.addAttribute("format", "pdf");
//		}
//
//	}
	
	
		return "reportForSearchSPS010";
	}
}








 

