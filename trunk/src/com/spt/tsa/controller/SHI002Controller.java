package com.spt.tsa.controller;

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

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.domain.SHI002Domain01;
import com.spt.tsa.domain.SVD006Domain01;
import com.spt.tsa.entity.Employee;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.PaymentHeader;
import com.spt.tsa.entity.TravelDetail;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.Employee01Service;
import com.spt.tsa.service.ParameterTable01Service;
import com.spt.tsa.service.PaymentHeader01Service;
import com.spt.tsa.service.TravelDetail01Service;
import com.spt.tsa.service.TravelHeader01Service;
import com.spt.tsa.util.BeanUtils;

@Controller
public class SHI002Controller {
	private static Logger logger = LoggerFactory.getLogger(SHI002Controller.class);
	private Employee01Service employee01Service;
	private ParameterTable01Service parameterTable01Service;
	private TravelHeader01Service travelHeader01Service;
	private TravelDetail01Service travelDetail01Service;
	private PaymentHeader01Service paymentHeader01Service;

	private Employee  employees; 
	private List<TravelHeader> listTravelHeader; 
	private List<TravelDetail> listTravelDetail; 
	private List<ParameterTable> listParameterTables;
	private List<PaymentHeader> listPaymentHeaders;
	
	@Autowired
	public void setParameterTable01Service(ParameterTable01Service parameterTable01Service) {
		this.parameterTable01Service = parameterTable01Service;
	}

	@Autowired
	public void setParameterTable01Service(Employee01Service employee01Service) {
		this.employee01Service = employee01Service;
	}

	@Autowired
	public void setTravelHeader01Service(TravelHeader01Service travelHeader01Service) {
		this.travelHeader01Service = travelHeader01Service;
	}
	
	@Autowired
	public void setTravelDetail01Service(TravelDetail01Service travelDetail01Service) {
		this.travelDetail01Service = travelDetail01Service;
	}

	@Autowired
    public void setPaymentHeader01Service(PaymentHeader01Service paymentHeader01Service) {
   	 this.paymentHeader01Service= paymentHeader01Service;
    }
	
	@RequestMapping(value = "/SHI002.html", method = RequestMethod.GET)
	public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {
		
		////////////////////////////
		///EmpId pass by Login Page
		///////////////////////////
		Object sessionEmpId = request.getSession().getAttribute("sessionEmpId");
		Object sessionPrivilege = request.getSession().getAttribute("sessionPrivilege");
		String EmpId =(String)sessionEmpId;
		String privilege = (String)sessionPrivilege;
		Map<String, Object> model = null;
		try {
			if((!(privilege.equals("user")))){
				try {
					request.getSession().removeAttribute("sessionPrivilege");
					response.sendRedirect((String)request.getSession().getAttribute("sessionIndexPage"));	
				} catch (Exception e) {
				}
			}else{

				this.employees = this.employee01Service.findEmployeeByIdName(EmpId);	
				model = new HashMap<String, Object>();
				SHI002Domain01 domain = new SHI002Domain01();				
				domain.setEmployeeName(this.employees.getName()+"  "+this.employees.getLastname());
				domain.setEmployeeId(this.employees.getEmpId());				
				
				model.put("SHI01", JSONObject.fromObject(BeanUtils.beanToMap(domain)).toString());
				return new ModelAndView("SHI002", model);
			}
				
		} catch (Exception e) {
		}
		return new ModelAndView("");	


	}
	
	@RequestMapping(value = "/SHI002.html", method = RequestMethod.POST, params = "method=gridStore")
	public void findGrid(HttpServletRequest request,HttpServletResponse response,
			@ModelAttribute SHI002Domain01 domain,
			@RequestParam("empId") String empId,
			@RequestParam("year") String yearQuery,
			@RequestParam("status") String statusQuery) {
		
		
		////////////////////////////////
		///EmpId pass by store request
		///////////////////////////////
		domain.setEmployeeId(empId);
		domain.setYear(yearQuery);
		domain.setStatus(statusQuery);
		
		
		String employeeId = domain.getEmployeeId();
		String yearFind	  = domain.getYear();
		String statusFind = domain.getStatus();
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();
		JSONObject jobect = new JSONObject();
		if(!(employeeId.equals("firstRequest"))){
			try{ 
				this.employees = this.employee01Service.findEmployeeByIdName(employeeId);
				this.listTravelHeader = this.travelHeader01Service.findLikeYearAndStatus(this.employees,yearFind,statusFind);
			}catch (Exception e){
				
			}
			
			if(this.listTravelHeader.size()==0){ // IF this.listTravelHeader Null
				 jobect = new JSONObject();
				 jobect.accumulate("no", "-");
				 jobect.accumulate("docNo","-");
				 jobect.accumulate("docDate","-");
				 jobect.accumulate("sendDate","-");
				 jobect.accumulate("status","-");
				 jobect.accumulate("approve","-");
				 jobect.accumulate("amount", "-");
				 jobect.accumulate("remark", "-");
				 jsonArray.add(jobect);
			}
			int i = 1;
			for(int  j = this.listTravelHeader.size()-1;j>=0;j--){
				TravelHeader th = this.listTravelHeader.get(j);
				 SimpleDateFormat simple_date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
				 jobect = new JSONObject();
				 jobect.accumulate("no", i++);
				 jobect.accumulate("docNo",th.getNo());
				 jobect.accumulate("docDate",simple_date.format(th.getCreationate()));
				 		 
				 String status = " ";
				 try {
					 this.listParameterTables = this.parameterTable01Service.findRow("9", th.getStatus());
					 status = this.listParameterTables.get(0).getDetail();
				 } catch (Exception e) {
			
				 }
				 jobect.accumulate("status",status);
				 if(status.equals("Saved")){
					 jobect.accumulate("sendDate", " ");
				 }else{
					 jobect.accumulate("sendDate", simple_date.format(th.getModifyDate()));
				 }
				try {
					this.listPaymentHeaders = this.paymentHeader01Service.findByTravelHeader(th);		
					if(status.equals("Approved")){
						jobect.accumulate("approve",simple_date.format(this.listPaymentHeaders.get(0).getModifyDate()));
					}else{
						jobect.accumulate("approve","  ");
					}
				} catch (Exception e) {
					jobect.accumulate("approve","-");
				}	 
				 			 
				 jobect.accumulate("amount", th.getTotal());
				 jobect.accumulate("remark", th.getRemark());
				 jsonArray.add(jobect);
			}
		}else{
			 jobect = new JSONObject();
			 jobect.accumulate("no", "-");
			 jobect.accumulate("docNo","-");
			 jobect.accumulate("docDate","-");
			 jobect.accumulate("sendDate","-");
			 jobect.accumulate("status","-");
			 jobect.accumulate("approve","-");
			 jobect.accumulate("amount", "-");
			 jobect.accumulate("remark", "-");
			 jsonArray.add(jobect);
		}
		
		
		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);
		gridData.responseJson(response);
	}
	
	
	@RequestMapping(value = "/SHI002.html", method = RequestMethod.POST, params = "method=yearStore")
	public void yearStore(HttpServletRequest request,HttpServletResponse response,
			@ModelAttribute SHI002Domain01 domain,
			@RequestParam("empId") String empId) {
		
		///////////////////////////////
		///EmpId pass by Request
		//////////////////////////////
		domain.setEmployeeId(empId);
		try{ 
			this.employees = this.employee01Service.findEmployeeByIdName(domain.getEmployeeId());
			this.listTravelHeader = this.travelHeader01Service.findByEmpIdInTravelHeader(this.employees);
		}catch (Exception e){
			
		}
		
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();
		JSONObject jobect = new JSONObject();
		
		SimpleDateFormat simple_date = new SimpleDateFormat("yyyy", new Locale("th", "th"));
/////////////////////////////////////////////////////
//loop order Descending  By Year Creationate
////////////////////////////////////////////////////
		for(int i = this.listTravelHeader.size()-1;i>=0;i--){
			jobect.accumulate("code", simple_date.format(this.listTravelHeader.get(i).getCreationate()));
			jobect.accumulate("description",simple_date.format(this.listTravelHeader.get(i).getCreationate()));
			jsonArray.add(jobect);
			jobect.clear();
		}
		
		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);

		gridData.responseJson(response);
	}
	
	@RequestMapping(value = "/SHI002.html", method = RequestMethod.POST, params = "method=statusStore")
	public void statusStore(HttpServletRequest request,HttpServletResponse response,
			@ModelAttribute SHI002Domain01 domain,
			@RequestParam("code") String code) {
		
		domain.setCode(code);

		try{ 
			this.listParameterTables = this.parameterTable01Service.findTable(domain.getCode());
		}catch (Exception e){
			
		}
		
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();
		JSONObject jobect = new JSONObject();
		for (ParameterTable pt : this.listParameterTables) {
			jobect.accumulate("code", pt.getEntry());
			jobect.accumulate("description",pt.getDetail());
			jsonArray.add(jobect);
			jobect.clear();
		}
		
		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);

		gridData.responseJson(response);
	}
	
	
	@RequestMapping(value = "/SHI002.html", method = RequestMethod.POST, params = "method=gridRemoveData")
	public void gridRemoveData(HttpServletRequest request, HttpServletResponse response,
	@ModelAttribute SHI002Domain01 domainSHI002,
	@RequestParam("noDoc") String noDoc){
		domainSHI002.setNoDoc(noDoc);
		String packNoDoc = domainSHI002.getNoDoc();
		String[] noDocSplit = packNoDoc.split(",");
		for(String eachNoDoc :noDocSplit){
			try {
				this.listTravelHeader = this.travelHeader01Service.findByDocNoForSaveOrUpdate(eachNoDoc); //find header
				try {
					 this.listTravelDetail = this.travelDetail01Service.findByTravelHeader(this.listTravelHeader.get(0)); //fine detail from header
					 for(TravelDetail td : this.listTravelDetail){ //loop For delete detail
						 this.travelDetail01Service.deleteTravelDetail(td);// delete TravelDetail
				 	 }
				this.travelHeader01Service.deleteTravelHeader(this.listTravelHeader.get(0));// delete TravelHeader
				} catch (Exception e) {
					logger.debug("{}",e);
				}
				 
			} catch (Exception e) {
				logger.debug("{}",e);
			}
		}
	}
}
