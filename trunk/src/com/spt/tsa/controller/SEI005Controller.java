package com.spt.tsa.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.service.ParameterTable01Service;


@Controller
public class SEI005Controller {
	private static final Logger logger = LoggerFactory.getLogger(SEI005Controller.class);

	private ParameterTable01Service parameterTable01Service;
	
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
	
	@RequestMapping(value = "/SEI005.html", method = RequestMethod.POST, params = "method=selectStatus")
	public void findYear(HttpServletRequest request,
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
}