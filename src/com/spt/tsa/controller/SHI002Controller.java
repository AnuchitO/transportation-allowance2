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
import com.spt.tsa.entity.Employee;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.TravelDetail;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.Employee01Service;
import com.spt.tsa.service.ParameterTable01Service;
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

	private Employee  employees; 
	private List<TravelHeader> listTravelHeader; 
	private List<TravelDetail> listTravelDetail; 
	private List<ParameterTable> listParameterTables;
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


	@RequestMapping(value = "/SHI002.html", method = RequestMethod.GET)
	public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {
		
		////////////////////////////
		///EmpId pass by Login Page
		///////////////////////////
		String EmpId = "EMp001";
		try{ 
			this.employees = this.employee01Service.findEmployeeByIdName(EmpId);
		}catch (Exception e){
			
		}
		
		Date date = new Date();
		SimpleDateFormat ft = new SimpleDateFormat("dd/MM/yyyy");
		SHI002Domain01 domain = new SHI002Domain01();
		
		domain.setEmployeeName(this.employees.getName());
		domain.setEmployeeId(this.employees.getEmpId());
		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("SHI01", JSONObject.fromObject(BeanUtils.beanToMap(domain)).toString());
		return new ModelAndView("SHI002", model);

	}
	
	@RequestMapping(value = "/SHI002.html", method = RequestMethod.POST, params = "method=gridStore")
	public void findGrid(HttpServletRequest request,HttpServletResponse response) {
		
		///////////////////////////////
		///EmpId pass by store request
		//////////////////////////////
		String EmpId = "EMp001";
		try{ 
			this.employees = this.employee01Service.findEmployeeByIdName(EmpId);
			this.listTravelHeader = this.travelHeader01Service.findByEmpIdInTravelHeader(this.employees);
		}catch (Exception e){
			
		}
		
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();
		JSONObject jobect = null;
		int i = 1;
		for(TravelHeader th : this.listTravelHeader){
			 SimpleDateFormat simple_date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
			 jobect = new JSONObject();
			 jobect.accumulate("no", i++);
			 jobect.accumulate("docNo",th.getNo());
			 jobect.accumulate("docDate",simple_date.format(th.getCreationate()));
			 jobect.accumulate("sendDate", simple_date.format(th.getModifyDate()));
			 jobect.accumulate("approve",simple_date.format(th.getModifyDate()));
			 try {
				 this.listParameterTables = this.parameterTable01Service.findRow("9", th.getStatus());
				 jobect.accumulate("status",this.listParameterTables.get(0).getDetail());
			 } catch (Exception e) {
		
			 }
			 
			 jobect.accumulate("amount", th.getTotal());
			 jobect.accumulate("remark", th.getRemark());
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
