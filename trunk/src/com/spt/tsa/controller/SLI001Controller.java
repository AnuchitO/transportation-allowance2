package com.spt.tsa.controller;

import java.io.PrintWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import net.sf.json.JSONArray;
//import net.sf.json.JSONObject;












import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;












import com.spt.tsa.domain.SLI001Domain01;
import com.spt.tsa.entity.AccountProfile;
import com.spt.tsa.entity.Employee;
import com.spt.tsa.service.AccountProfile01Service;
//import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.service.Company01Service;
import com.spt.tsa.service.Employee01Service;
 

@Controller
public class SLI001Controller {
	private static final Logger logger = LoggerFactory.getLogger(SLI001Controller.class);
	
	@Autowired
	private AccountProfile01Service accountProfile01Service;
	@Autowired
	private Employee01Service employee01Service;
	 
	public void setExt001Service(AccountProfile01Service accountProfile01Service) {
		this.accountProfile01Service = accountProfile01Service;
	}
	 
	
	
	public void setEmployee01Service(Employee01Service employee01Service) {
		this.employee01Service = employee01Service;
	}



	@RequestMapping(value = "/index.html", method = RequestMethod.GET)
	public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {

		Map<String,Object> model = new HashMap<String,Object>();		
		request.getSession().removeAttribute("sessionPrivilege");
		request.getSession().removeAttribute("sessionEmpId");
		return new ModelAndView("index");

	}
	
	@RequestMapping(value = "/index.html", method = RequestMethod.POST)
	public void login(HttpServletRequest request, HttpServletResponse response,@ModelAttribute SLI001Domain01 domainSLI001) {
//			String empId = "EMp001";
			
		try {
			
			String userName = domainSLI001.getUsername().trim();
			String password = domainSLI001.getPassword().trim();
			
			String indexPage = "index.html";
			List<AccountProfile> lisAccountProfiles = null;
			List<Employee>  listEmployees = null;
			String user=" ";
			JSONObject myObj = null;
			PrintWriter out = response.getWriter();
			try {
				lisAccountProfiles = this.accountProfile01Service.findByUserName(userName, password);
				
			} catch (Exception e) {
//				myObj = new JSONObject();
//				myObj.accumulate("failure", true);
//				myObj.accumulate("success", false);
			}			


			if(lisAccountProfiles.size() != 0 ){
				
				AccountProfile accountProfiles = lisAccountProfiles.get(0);
				String privilege = accountProfiles.getPrivilege().toString();
				String empId = accountProfiles.getEmployeeId();
				try {
					listEmployees = this.employee01Service.findEmpWhereEmpId(empId);
					user = listEmployees.get(0).getName()+" "+listEmployees.get(0).getLastname();
				} catch (Exception e) {
					
				}
				
				if(accountProfiles.getPrivilege().equals("user")){
					request.getSession().setAttribute("sessionPrivilege",privilege);
					request.getSession().setAttribute("sessionEmpId",empId);
					request.getSession().setAttribute("sessionIndexPage",indexPage);
					request.getSession().setAttribute("sessionUser",user);
					myObj = new JSONObject();
					myObj.accumulate("failure", false);
					myObj.accumulate("success", true);
		            myObj.accumulate("message", "SHI002.html");
				}else if(accountProfiles.getPrivilege().equals("admin")){
					request.getSession().setAttribute("sessionPrivilege",privilege);
					request.getSession().setAttribute("sessionEmpId",empId);
					request.getSession().setAttribute("sessionIndexPage",indexPage);
					request.getSession().setAttribute("sessionUser",user);
					myObj = new JSONObject();
					myObj.accumulate("failure", false);
					myObj.accumulate("success", true);
		            myObj.accumulate("message", "SEI005.html");
				}else{
					
				}
			}else{
				myObj = new JSONObject();
				myObj.accumulate("failure", true);
				myObj.accumulate("success", false);
	            myObj.accumulate("message", "index.html");
			}
			response.setContentType("application/json;charset=UTF-8"); 
            out.println(myObj.toString());
            out.close();
             
			} catch (Exception e) {

		}
		
	}
}
