package com.spt.tsa.controller;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.xmlbeans.impl.regex.REUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;























import org.tuxilla.BahtText;

import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.controller.datasource.RunNumberDocument;
import com.spt.tsa.dao.ParameterTableDao;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.Company;
import com.spt.tsa.entity.Employee;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.Customer01Service;
import com.spt.tsa.service.Employee01Service;
import com.spt.tsa.service.ParameterTable01Service;
import com.spt.tsa.service.TravelDetail01Service;
import com.spt.tsa.service.TravelHeader01Service;
import com.spt.tsa.util.BeanUtils;




@Controller
public class SVD006Controller {
	private Employee01Service employee01Service;
	private ParameterTable01Service parameterTable01Service;
	private TravelHeader01Service travelHeader01Service;
	private TravelDetail01Service travelDetail01Service;
	private Customer01Service customer01Service;
	

	
	@Autowired
    public void setParameterTable01Service(ParameterTable01Service parameterTable01Service) {
   	 this.parameterTable01Service= parameterTable01Service;
    }
	@Autowired
    public void setParameterTable01Service(Employee01Service employee01Service) {
   	 this.employee01Service= employee01Service;
    }
	@Autowired
    public void setTravelHeader01Service(TravelHeader01Service travelHeader01Service) {
   	 this.travelHeader01Service= travelHeader01Service;
    }
	
	@Autowired	
	public void setCustomer01Service(Customer01Service customer01Service) {
	 this.customer01Service = customer01Service;
	}
	
	@Autowired
	public void setTravelDetail01Service(TravelDetail01Service travelDetail01Service) {
		this.travelDetail01Service = travelDetail01Service;
	}
	private static Logger logger = LoggerFactory.getLogger(APP001Controller.class);

		@RequestMapping(value = "/SVD006.html", method = RequestMethod.GET)
		public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {
			Map<String,Object> model = new HashMap<String,Object>();
			Employee resultsEmp = this.employee01Service.findEmployeeWhereId();
			System.out.println("view 2");
			List<String> resu = this.employee01Service.findBankWhereEmp();
			List<String> resultsBranch = this.employee01Service.findBranchBankWhereEmp();
			List<String> resultsDept = this.employee01Service.findDeptWhereEmp();
			List<String> resultsProvince = this.employee01Service.findProvinceEmp();
			  Date date = new Date();
			  SimpleDateFormat ft = new SimpleDateFormat ("yyyy/MM/dd");  
			SCF003Domain01 domain = new SCF003Domain01();
			List<TravelHeader> lastNoDocList = this.travelHeader01Service.findTravelHanderGetLastNoDoc();
			String numberDoc = " ";
			if(lastNoDocList.size()!=0){
				logger.debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  {}",lastNoDocList.get(0).getNo());
				numberDoc = new RunNumberDocument(lastNoDocList.get(0).getNo()).generatNumberDocument();
				logger.debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  {}",numberDoc);
			}
			
			domain.setNo(numberDoc);
			domain.setDate(ft.format(date));
			domain.setName(resultsEmp.getName());
			domain.setId(resultsEmp.getEmpId());
			new BahtText(11).toString();
		
			domain.setCompany(resultsEmp.getCompany().getName());
			domain.setIdCard(resultsEmp.getIdCard());
			domain.setAddress(resultsEmp.getAddress());
			domain.setPhone(resultsEmp.getTelephone());
			domain.setEmail(resultsEmp.getEmail());
			domain.setAntecedent(resultsDept.get(0));
			domain.setAntercedentA(resultsProvince.get(0));
			//************* set value Button *****************//
			domain.setBank(resu.get(0));
			domain.setBranch(resultsEmp.getBranch());
			domain.setAccountNumber(resultsEmp.getAccountNo());
			domain.setTypeAccount(resultsBranch.get(0));

			Employee teeeeeee = this.travelHeader01Service.findEmployeeWhereId(domain.getId());
			Company commmmm = this.travelHeader01Service.findCompanyWhereId(resultsEmp.getCompany().getComId());
			
				logger.debug("+++++++------------+{}------",teeeeeee.getAddress());
				logger.debug("+++++++------------+{}------",commmmm.getComId());
			
			logger.debug("+++++++++++++++++++++{}--------------------",resu.get(0));
			logger.debug("+++++++++++++++++++++{}--------------------",domain.getName());
			model.put("data", JSONObject.fromObject(BeanUtils.beanToMap(domain)).toString());
			
			return new ModelAndView("SVD006",model);

		}

}