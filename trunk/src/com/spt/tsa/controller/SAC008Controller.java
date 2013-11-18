package com.spt.tsa.controller;

import java.util.*;
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
import com.spt.tsa.domain.SAC008Domain01;
import com.spt.tsa.entity.AccountAdmin;
import com.spt.tsa.service.AccountAdmin01Service;

@Controller
public class SAC008Controller {
	private static Logger logger = LoggerFactory.getLogger(SAC008Controller.class);
	private AccountAdmin01Service accountAdmin01Service;
	
	List<AccountAdmin> listAccountAdmins;
	
	@Autowired
    public void setAccountAdmin01Service(AccountAdmin01Service accountAdmin01Service) {
   	 this.accountAdmin01Service = accountAdmin01Service;
    }

	@RequestMapping(value = "/SAC008.html", method = RequestMethod.GET)
	public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {

//		Map<String,Object> model = new HashMap<String,Object>();
		
		return new ModelAndView("SAC008");

	}
	
	@RequestMapping(value = "/SAC008.html", method = RequestMethod.POST, params = "method=gridDataStore")
	public void findGrid(HttpServletRequest request,HttpServletResponse response) {

		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();
		JSONObject jobect = new JSONObject();
		
		try{ 
			this.listAccountAdmins = this.accountAdmin01Service.findAccountAdmin();
			int i =1;
			for(AccountAdmin ad : this.listAccountAdmins){
				 jobect = new JSONObject(); 
				 jobect.accumulate("no",i++);
				 jobect.accumulate("accountId",ad.getAcId());
				 jobect.accumulate("accountName", ad.getName());
				 
				 if(ad.getType().equals("1")){
					 jobect.accumulate("debit",true);
					 jobect.accumulate("credit",false);
				 }else{
					 jobect.accumulate("debit",false);
					 jobect.accumulate("credit",true);
				 }			 
				 jsonArray.add(jobect);
			}
		}catch (Exception e){
			
		}
		

		
		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);
		response.setContentType("application/json;charset=UTF-8"); 
		gridData.responseJson(response);

	}
	
	@RequestMapping(value = "/SAC008.html", method = RequestMethod.POST, params = "method=gridRemoveData")
	public void gridRemoveData(HttpServletRequest request, HttpServletResponse response,
	@ModelAttribute SAC008Domain01 domainSAC008,
	@RequestParam("accountId") String accountId){
		domainSAC008.setAccountId(accountId);
		String packAccountId = domainSAC008.getAccountId();
		String[] accountIdSplit = packAccountId.split(",");

		for(String eachAccountId : accountIdSplit){
		
			try {
				this.listAccountAdmins = this.accountAdmin01Service.findByAccountId(eachAccountId);//find accountAdmin by Account Id 
				 for(AccountAdmin ad : this.listAccountAdmins){ //loop For delete AccountAdmin
						 this.accountAdmin01Service.deleteByAccountId(ad);// delete AccountAdmin
				 }
			} catch (Exception e) {
				logger.debug("{}",e);
			}
		}
	}
	
	@RequestMapping(value = "/SAC008.html", method = RequestMethod.POST, params = "method=gridSaveData")
	public void gridSaveData(HttpServletRequest request, HttpServletResponse response,
	@ModelAttribute SAC008Domain01 domainSAC008,
	@RequestParam("accountId") String dateGrid){
		domainSAC008.setDateGrid(dateGrid);
		String packDataGrid = domainSAC008.getDateGrid();		
		String[] rowSplit = packDataGrid.split("!");

		for(String eachRow : rowSplit){
			String[] columnSplit = eachRow.split(",");							
				String no = columnSplit[0];
				String accountId = columnSplit[1];
				String accountName = columnSplit[2];
				String debit = columnSplit[3];
				String credit = columnSplit[4];
			try {
				this.listAccountAdmins = this.accountAdmin01Service.findByAccountId(accountId);
				 AccountAdmin accountAdmin = this.listAccountAdmins.get(0);
					 accountAdmin.setAcId(accountId);
					 accountAdmin.setName(accountName);
					 accountAdmin.setModifyDate(new Date());
					 accountAdmin.setType("1"); ///////////////////  test save freeze logic
				 this.accountAdmin01Service.saveOrUpdate(accountAdmin);
			} catch (Exception e) {
				 AccountAdmin accountAdmin = new AccountAdmin();
					 accountAdmin.setAcId(accountId);
					 accountAdmin.setName(accountName);
					 accountAdmin.setUserCreation("FromSessionLogin"); //Freeze Waiting get FromSession Login
					 accountAdmin.setCreationDate(new Date());
					 accountAdmin.setUserUpdate("FromSessionLogin"); //Freeze Waiting  get FromSession Login
					 accountAdmin.setModifyDate(new Date());
					 accountAdmin.setType("2"); ///////////////////  test save freeze logic
				 this.accountAdmin01Service.saveOrUpdate(accountAdmin);
			}
			
			if(this.listAccountAdmins.size() != 0){
				
			}else{
				
			}
					
		}
	}

}
