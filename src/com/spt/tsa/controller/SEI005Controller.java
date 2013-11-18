package com.spt.tsa.controller;

import java.text.SimpleDateFormat;
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
import com.spt.tsa.domain.SEI005Domain01;
import com.spt.tsa.domain.SHI002Domain01;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.TravelDetail;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.ParameterTable01Service;
import com.spt.tsa.service.TravelHeader01Service;


@Controller
public class SEI005Controller {
	private static final Logger logger = LoggerFactory.getLogger(SEI005Controller.class);

	private ParameterTable01Service parameterTable01Service;
	private TravelHeader01Service travelHeader01Service;
	
	
	@Autowired
	public void setTravelHeader01Service(TravelHeader01Service travelHeader01Service) {
		this.travelHeader01Service = travelHeader01Service;
	}


	@Autowired
	public void setParameterTable01Service(
			ParameterTable01Service parameterTable01Service) {
		this.parameterTable01Service = parameterTable01Service;
	}
	
	
	@RequestMapping(value = "/SEI005.html", method = RequestMethod.GET)
	public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {

		Map<String,Object> model = new HashMap<String,Object>();
		
		return new ModelAndView("SEI005", model);

	}
	
	@RequestMapping(value = "/SEI005.html", method = RequestMethod.POST, params = "method=selectMount")
	public void findMount(HttpServletRequest request,
			HttpServletResponse response) {
		List<ParameterTable> resultsParam = this.parameterTable01Service.findByMount();
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
		response.setContentType("application/json;charset=UTF-8"); 
		gridData.responseJson(response);
	}

	
		@RequestMapping(value = "/SEI005.html", method = RequestMethod.POST, params = "method=selectYear")
		public void findYear(HttpServletRequest request,
				HttpServletResponse response) {
			List<TravelHeader> tra = this.travelHeader01Service.findSelectYearNotSave();
			SimpleDateFormat date = new SimpleDateFormat("yyyy",new Locale("th","th"));

				
			JSONArray jsonArray = new JSONArray();
			GridData gridData = new GridData();

			JSONObject jobect1 = new JSONObject();
			for (TravelHeader c : tra) {
				logger.debug("@@@@@@@@@@@@@@@############################{}",c.getCreationate());
				jobect1.accumulate("code", date.format(c.getCreationate()));
				jobect1.accumulate("description", date.format(c.getCreationate()));
				jsonArray.add(jobect1);
				jobect1.clear();

			}
			gridData.setRecords(jsonArray);
			gridData.setTotal(jsonArray.size());
			gridData.setSuccess(true);
			response.setContentType("application/json;charset=UTF-8"); 
			gridData.responseJson(response);
		}
	
	@RequestMapping(value = "/SEI005.html", method = RequestMethod.POST, params = "method=selectStatus")
	public void findStatus(HttpServletRequest request,
			HttpServletResponse response) {
		List<ParameterTable> resultsParam = this.parameterTable01Service.findByStatus();
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();

		JSONObject jobect1 = new JSONObject();
		for (ParameterTable c : resultsParam) {
			if(c.getDetail().equals("Saved")){
				
			}
			else{

			jobect1.accumulate("code", c.getDetail());
			jobect1.accumulate("description", c.getDetail());
			jsonArray.add(jobect1);
			jobect1.clear();
			}
		}
		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);
		response.setContentType("application/json;charset=UTF-8"); 
		gridData.responseJson(response);
	}
	


	@RequestMapping(value = "/SEI005.html", method = RequestMethod.POST, params = "method=gridDataSelect")
	public void findGrid(HttpServletRequest request,
			HttpServletResponse response,
			@ModelAttribute SEI005Domain01 domain,
			@RequestParam("selectMount") String selectMount,
			@RequestParam("selectYear") String selectYear,
			@RequestParam("selectStatus") String selectStatus){
		
		String mount= "";
		if(selectMount.equals("มกราคม")){
			mount="01";	
		}
		else if(selectMount.equals("กุมภาพันธ์")){
			mount="02";	
		}
		else if(selectMount.equals("มีนาคม")){
			mount="03";	
		}
		else if(selectMount.equals("เมษายน")){
			mount="04";	
		}
		else if(selectMount.equals("พฤษภาคม")){
			mount="05";	
		}
		else if(selectMount.equals("มิถุนายน")){
			mount="06";	
		}
		else if(selectMount.equals("กรกฎาคม")){
			mount="07";	
		}
		else if(selectMount.equals("สิงหาคม")){
			mount="08";	
		}
		else if(selectMount.equals("กันยายน")){
			mount="09";	
		}
		else if(selectMount.equals("ตุลาคม")){
			mount="10";	
		}
		else if(selectMount.equals("พฤศจิกายน")){
			mount="11";	
		}
		else if(selectMount.equals("ธันวาคม")){
			mount="12";	
		}
		
		domain.setSelectMount(mount);
		domain.setSelectYear(selectYear);
		domain.setSelectStatus(selectStatus);
		
		
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData(); 
		
		// **************************** Select All Case **************************************//
		if(domain.getSelectMount().length() == 0 && domain.getSelectYear().length() == 0 && domain.getSelectStatus().length() == 0){
		List<TravelHeader> dataTravelHeader = this.travelHeader01Service.findDataGroupByNo();
	
		int i=0;
		String checkStatus = " ";
		for(TravelHeader c:dataTravelHeader){
			i++;
			 if(!(c.getStatus().equals("001"))){
				 
		 SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
		 JSONObject jobect1 = new JSONObject();
		 jobect1.accumulate("seiNo", i);
		 jobect1.accumulate("seiNumberDocument", c.getNo());
		 jobect1.accumulate("seiIdEmployee", c.getEmployee().getEmpId());
		 jobect1.accumulate("seiNameEmployee", c.getEmployee().getName());
		 jobect1.accumulate("seiSendDate", date.format(c.getCreationate()));
		
		 jobect1.accumulate("seiStatus", this.parameterTable01Service.findRow("9", c.getStatus()).get(0).getDetail());
		 	if(c.getStatus().equals("004")){
		 		jobect1.accumulate("seiAppove", date.format(c.getModifyDate()));
		 	}
		 	else{
		 		jobect1.accumulate("seiAppove"," ");
		 	}
		 jobect1.accumulate("seiTotalPayment", c.getTotal());
		 jobect1.accumulate("seiRemark", c.getRemark());
		
		 jsonArray.add(jobect1);
		 jobect1.clear();
			 }
		}
		}
		
		//************************************* Select Status Case **************************************//
		else if(domain.getSelectStatus().length() != 0 && domain.getSelectMount().length() == 0 && domain.getSelectYear().length() == 0){
			
			List<ParameterTable> param = this.parameterTable01Service.findStatusBySelect(domain.getSelectStatus());
			
			List<TravelHeader> traH = this.travelHeader01Service.findSelectSearchStatus(param.get(0).getEntry());
			int j=0;
			for(TravelHeader c:traH){
				j++;
				
					 
			 SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
			 JSONObject jobect1 = new JSONObject();
			 jobect1.accumulate("seiNo", j);
			 jobect1.accumulate("seiNumberDocument", c.getNo());
			 jobect1.accumulate("seiIdEmployee", c.getEmployee().getEmpId());
			 jobect1.accumulate("seiNameEmployee", c.getEmployee().getName());
			 jobect1.accumulate("seiSendDate", date.format(c.getCreationate()));
			
			 jobect1.accumulate("seiStatus", this.parameterTable01Service.findRow("9", c.getStatus()).get(0).getDetail());
			 	if(c.getStatus().equals("004")){
			 		jobect1.accumulate("seiAppove", date.format(c.getModifyDate()));
			 	}
			 	else{
			 		jobect1.accumulate("seiAppove"," ");
			 	}
			 jobect1.accumulate("seiTotalPayment", c.getTotal());
			 jobect1.accumulate("seiRemark", c.getRemark());
			
			 jsonArray.add(jobect1);
			 jobect1.clear();
				 }
			
		}
	
		//***************************************** Select Year Case ********************************************//
		else if(domain.getSelectYear().length() != 0 && domain.getSelectMount().length()==0 && domain.getSelectStatus().length() == 0){
			int foo = Integer.parseInt(domain.getSelectYear());
			foo = foo - 543 ;
			String yearSelect = Integer.toString(foo);
			List<TravelHeader> traH = this.travelHeader01Service.findYearSelect(yearSelect);
			int j=0;
			for(TravelHeader c:traH){
				j++;
				
				 
				 SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
				 JSONObject jobect1 = new JSONObject();
				 jobect1.accumulate("seiNo", j);
				 jobect1.accumulate("seiNumberDocument", c.getNo());
				 jobect1.accumulate("seiIdEmployee", c.getEmployee().getEmpId());
				 jobect1.accumulate("seiNameEmployee", c.getEmployee().getName());
				 jobect1.accumulate("seiSendDate", date.format(c.getCreationate()));
				
				 jobect1.accumulate("seiStatus", this.parameterTable01Service.findRow("9", c.getStatus()).get(0).getDetail());
				 	if(c.getStatus().equals("004")){
				 		jobect1.accumulate("seiAppove", date.format(c.getModifyDate()));
				 	}
				 	else{
				 		jobect1.accumulate("seiAppove"," ");
				 	}
				 jobect1.accumulate("seiTotalPayment", c.getTotal());
				 jobect1.accumulate("seiRemark", c.getRemark());
				
				 jsonArray.add(jobect1);
				 jobect1.clear();
					 }
			}
		
		//********************************************** Select Month Case ******************************************//
		else if(domain.getSelectMount().length() != 0 && domain.getSelectYear().length() == 0 && domain.getSelectStatus().length() == 0){
			
			
	     
	        
	    
	
			List<TravelHeader> traH = this.travelHeader01Service.findMonthSelect(domain.getSelectMount());
			if(this.travelHeader01Service.findMonthSelect(domain.getSelectMount()).size() == 0){
				 JSONObject jobect1 = new JSONObject();
				 jobect1.accumulate("seiNo", "-");
				 jobect1.accumulate("seiNumberDocument", "-");
				 jobect1.accumulate("seiIdEmployee", "-");
				 jobect1.accumulate("seiNameEmployee", "-");
				 jobect1.accumulate("seiSendDate", "-");
				
				 jobect1.accumulate("seiStatus", "-");
				 jobect1.accumulate("seiAppove","-");
				 	
				 jobect1.accumulate("seiTotalPayment", "-");
				 jobect1.accumulate("seiRemark", "-");
				
				 jsonArray.add(jobect1);
				 jobect1.clear();
			}else{
			logger.debug("$$$$$$$$$$$$$$$$$$$$$$$$$$$$########{}",domain.getSelectMount());
			logger.debug("$$$$$$$$$$$$$$$$$$$$$$$$$$$$########{}",traH.get(0).getEmail());
			int j=0;
			for(TravelHeader c:traH){
				j++;
				
				 
				 SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
				 JSONObject jobect1 = new JSONObject();
				 jobect1.accumulate("seiNo", j);
				 jobect1.accumulate("seiNumberDocument", c.getNo());
				 jobect1.accumulate("seiIdEmployee", c.getEmployee().getEmpId());
				 jobect1.accumulate("seiNameEmployee", c.getEmployee().getName());
				 jobect1.accumulate("seiSendDate", date.format(c.getCreationate()));
				
				 jobect1.accumulate("seiStatus", this.parameterTable01Service.findRow("9", c.getStatus()).get(0).getDetail());
				 	if(c.getStatus().equals("004")){
				 		jobect1.accumulate("seiAppove", date.format(c.getModifyDate()));
				 	}
				 	else{
				 		jobect1.accumulate("seiAppove"," ");
				 	}
				 jobect1.accumulate("seiTotalPayment", c.getTotal());
				 jobect1.accumulate("seiRemark", c.getRemark());
				
				 jsonArray.add(jobect1);
				 jobect1.clear();
					 }
			}
		}
		
		//*********************************** Select Mount And Year Case ********************************************//
		else if(domain.getSelectMount().length() != 0 && domain.getSelectYear().length() != 0 && domain.getSelectStatus().length() == 0){
			
			int foo = Integer.parseInt(domain.getSelectYear());
			foo = foo - 543 ;
			String yearSelect = Integer.toString(foo);
			String yearAndMonth = yearSelect + "/" + domain.getSelectMount();
			logger.debug("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%{}",yearAndMonth);

		
		List<TravelHeader> traH = this.travelHeader01Service.findYearAndMonthSelect(yearAndMonth);
		if(this.travelHeader01Service.findYearAndMonthSelect(yearAndMonth).size() == 0){
			 JSONObject jobect1 = new JSONObject();
			 jobect1.accumulate("seiNo", "-");
			 jobect1.accumulate("seiNumberDocument", "-");
			 jobect1.accumulate("seiIdEmployee", "-");
			 jobect1.accumulate("seiNameEmployee", "-");
			 jobect1.accumulate("seiSendDate", "-");
			
			 jobect1.accumulate("seiStatus", "-");
			 jobect1.accumulate("seiAppove","-");
			 	
			 jobect1.accumulate("seiTotalPayment", "-");
			 jobect1.accumulate("seiRemark", "-");
			
			 jsonArray.add(jobect1);
			 jobect1.clear();
		}else{
	
	
		int j=0;
		for(TravelHeader c:traH){
			j++;
			
			 
			 SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
			 JSONObject jobect1 = new JSONObject();
			 jobect1.accumulate("seiNo", j);
			 jobect1.accumulate("seiNumberDocument", c.getNo());
			 jobect1.accumulate("seiIdEmployee", c.getEmployee().getEmpId());
			 jobect1.accumulate("seiNameEmployee", c.getEmployee().getName());
			 jobect1.accumulate("seiSendDate", date.format(c.getCreationate()));
			
			 jobect1.accumulate("seiStatus", this.parameterTable01Service.findRow("9", c.getStatus()).get(0).getDetail());
			 	if(c.getStatus().equals("004")){
			 		jobect1.accumulate("seiAppove", date.format(c.getModifyDate()));
			 	}
			 	else{
			 		jobect1.accumulate("seiAppove"," ");
			 	}
			 jobect1.accumulate("seiTotalPayment", c.getTotal());
			 jobect1.accumulate("seiRemark", c.getRemark());
			
			 jsonArray.add(jobect1);
			 jobect1.clear();
				 }
		}
	}
		//***************************** Select Month And Status Case ****************************************//
		
else if(domain.getSelectMount().length() != 0 && domain.getSelectStatus().length() != 0 && domain.getSelectYear().length() == 0){

		List<ParameterTable> param = this.parameterTable01Service.findStatusBySelect(domain.getSelectStatus());
		List<TravelHeader> traH = this.travelHeader01Service.findMountAndStatus(domain.getSelectMount(), param.get(0).getEntry());
		if(this.travelHeader01Service.findMountAndStatus(domain.getSelectMount(), param.get(0).getEntry()).size() == 0){
			 JSONObject jobect1 = new JSONObject();
			 jobect1.accumulate("seiNo", "-");
			 jobect1.accumulate("seiNumberDocument", "-");
			 jobect1.accumulate("seiIdEmployee", "-");
			 jobect1.accumulate("seiNameEmployee", "-");
			 jobect1.accumulate("seiSendDate", "-");
			
			 jobect1.accumulate("seiStatus", "-");
			 jobect1.accumulate("seiAppove","-");
			 	
			 jobect1.accumulate("seiTotalPayment", "-");
			 jobect1.accumulate("seiRemark", "-");
			
			 jsonArray.add(jobect1);
			 jobect1.clear();
		}else{
	
	
		int j=0;
		for(TravelHeader c:traH){
			j++;
			
			 
			 SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
			 JSONObject jobect1 = new JSONObject();
			 jobect1.accumulate("seiNo", j);
			 jobect1.accumulate("seiNumberDocument", c.getNo());
			 jobect1.accumulate("seiIdEmployee", c.getEmployee().getEmpId());
			 jobect1.accumulate("seiNameEmployee", c.getEmployee().getName());
			 jobect1.accumulate("seiSendDate", date.format(c.getCreationate()));
			
			 jobect1.accumulate("seiStatus", this.parameterTable01Service.findRow("9", c.getStatus()).get(0).getDetail());
			 	if(c.getStatus().equals("004")){
			 		jobect1.accumulate("seiAppove", date.format(c.getModifyDate()));
			 	}
			 	else{
			 		jobect1.accumulate("seiAppove"," ");
			 	}
			 jobect1.accumulate("seiTotalPayment", c.getTotal());
			 jobect1.accumulate("seiRemark", c.getRemark());
			
			 jsonArray.add(jobect1);
			 jobect1.clear();
				 }
		}
		
}
		//*********************************** Select Year And Status *******************************************//
else if(domain.getSelectYear().length() != 0 && domain.getSelectStatus().length() != 0 && domain.getSelectMount().length() == 0){
	int foo = Integer.parseInt(domain.getSelectYear());
	foo = foo - 543 ;
	String yearSelect = Integer.toString(foo);
	List<ParameterTable> param = this.parameterTable01Service.findStatusBySelect(domain.getSelectStatus());
	List<TravelHeader> traH = this.travelHeader01Service.findYearAndStatus(yearSelect, param.get(0).getEntry());
	if(this.travelHeader01Service.findYearAndStatus(yearSelect, param.get(0).getEntry()).size() == 0){
		 JSONObject jobect1 = new JSONObject();
		 jobect1.accumulate("seiNo", "-");
		 jobect1.accumulate("seiNumberDocument", "-");
		 jobect1.accumulate("seiIdEmployee", "-");
		 jobect1.accumulate("seiNameEmployee", "-");
		 jobect1.accumulate("seiSendDate", "-");
		
		 jobect1.accumulate("seiStatus", "-");
		 jobect1.accumulate("seiAppove","-");
		 	
		 jobect1.accumulate("seiTotalPayment", "-");
		 jobect1.accumulate("seiRemark", "-");
		
		 jsonArray.add(jobect1);
		 jobect1.clear();
	}else{


	int j=0;
	for(TravelHeader c:traH){
		j++;
		
		 
		 SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
		 JSONObject jobect1 = new JSONObject();
		 jobect1.accumulate("seiNo", j);
		 jobect1.accumulate("seiNumberDocument", c.getNo());
		 jobect1.accumulate("seiIdEmployee", c.getEmployee().getEmpId());
		 jobect1.accumulate("seiNameEmployee", c.getEmployee().getName());
		 jobect1.accumulate("seiSendDate", date.format(c.getCreationate()));
		
		 jobect1.accumulate("seiStatus", this.parameterTable01Service.findRow("9", c.getStatus()).get(0).getDetail());
		 	if(c.getStatus().equals("004")){
		 		jobect1.accumulate("seiAppove", date.format(c.getModifyDate()));
		 	}
		 	else{
		 		jobect1.accumulate("seiAppove"," ");
		 	}
		 jobect1.accumulate("seiTotalPayment", c.getTotal());
		 jobect1.accumulate("seiRemark", c.getRemark());
		
		 jsonArray.add(jobect1);
		 jobect1.clear();
			 }
	}
	
}
		//************************************** Select All Case *******************************************//
else if(domain.getSelectMount().length() !=0 && domain.getSelectYear().length() !=0 && domain.getSelectStatus().length() !=0){
	int foo = Integer.parseInt(domain.getSelectYear());
	foo = foo - 543 ;
	String yearSelect = Integer.toString(foo);
	String yearAndMonth = yearSelect + "/" + domain.getSelectMount();
	List<ParameterTable> param = this.parameterTable01Service.findStatusBySelect(domain.getSelectStatus());
	List<TravelHeader> traH = this.travelHeader01Service.findAllCase(yearAndMonth, param.get(0).getEntry());
	if(this.travelHeader01Service.findAllCase(yearAndMonth, param.get(0).getEntry()).size() == 0){
		 JSONObject jobect1 = new JSONObject();
		 jobect1.accumulate("seiNo", "-");
		 jobect1.accumulate("seiNumberDocument", "-");
		 jobect1.accumulate("seiIdEmployee", "-");
		 jobect1.accumulate("seiNameEmployee", "-");
		 jobect1.accumulate("seiSendDate", "-");
		
		 jobect1.accumulate("seiStatus", "-");
		 jobect1.accumulate("seiAppove","-");
		 	
		 jobect1.accumulate("seiTotalPayment", "-");
		 jobect1.accumulate("seiRemark", "-");
		
		 jsonArray.add(jobect1);
		 jobect1.clear();
	}else{


	int j=0;
	for(TravelHeader c:traH){
		j++;
		
		 
		 SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy", new Locale("th", "th"));
		 JSONObject jobect1 = new JSONObject();
		 jobect1.accumulate("seiNo", j);
		 jobect1.accumulate("seiNumberDocument", c.getNo());
		 jobect1.accumulate("seiIdEmployee", c.getEmployee().getEmpId());
		 jobect1.accumulate("seiNameEmployee", c.getEmployee().getName());
		 jobect1.accumulate("seiSendDate", date.format(c.getCreationate()));
		
		 jobect1.accumulate("seiStatus", this.parameterTable01Service.findRow("9", c.getStatus()).get(0).getDetail());
		 	if(c.getStatus().equals("004")){
		 		jobect1.accumulate("seiAppove", date.format(c.getModifyDate()));
		 	}
		 	else{
		 		jobect1.accumulate("seiAppove"," ");
		 	}
		 jobect1.accumulate("seiTotalPayment", c.getTotal());
		 jobect1.accumulate("seiRemark", c.getRemark());
		
		 jsonArray.add(jobect1);
		 jobect1.clear();
			 }
	}
	
}
		
		
			
		
		
		 

		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);
		response.setContentType("application/json;charset=UTF-8"); 
		gridData.responseJson(response);

	}
}
