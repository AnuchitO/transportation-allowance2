package com.spt.tsa.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

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
import com.spt.tsa.entity.AccountAdmin;
import com.spt.tsa.entity.TravelDetail;
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
	public void findGrid(HttpServletRequest request,
			HttpServletResponse response) {

		try{ 
			this.listAccountAdmins = this.accountAdmin01Service.findAccountAdmin();
		}catch (Exception e){
			
		}
		
		JSONArray jsonArray = new JSONArray();
		GridData gridData = new GridData();
		JSONObject jobect = null;
		int i =1;
		for(AccountAdmin ad : this.listAccountAdmins){
			 jobect = new JSONObject(); 
			 jobect.accumulate("no",i++);
			 jobect.accumulate("accountId",ad.getAcId());
			 jobect.accumulate("accountName", ad.getName());
			 
			 if(ad.getType().equals("1")){
				 jobect.accumulate("debit",1);
				 jobect.accumulate("credit",0);
			 }else{
				 jobect.accumulate("debit",0);
				 jobect.accumulate("credit",2);
			 }			 
			 jsonArray.add(jobect);
		}
		
		gridData.setRecords(jsonArray);
		gridData.setTotal(jsonArray.size());
		gridData.setSuccess(true);

		gridData.responseJson(response);

	}
	
	@RequestMapping(value = "/SAC008.html", method = RequestMethod.POST, params = "method=gridRemoveData")
	public void gridRemoveData(HttpServletRequest request, HttpServletResponse response,
	@ModelAttribute SHI002Domain01 domainSHI002,
	@RequestParam("accountId") String noDoc){
		domainSHI002.setNoDoc(noDoc);
		String packAccountId = domainSHI002.getNoDoc();
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

}
