package com.spt.tsa.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import net.sf.json.JSONArray;
//import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

//import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.service.Company01Service;
 

@Controller
public class EXT001Controller {
	private static final Logger logger = LoggerFactory.getLogger(EXT001Controller.class);
	
	@Autowired
	private Company01Service company01Service;
	 
	public void setExt001Service(Company01Service company01Service) {
		this.company01Service = company01Service;
	}
	 

	@RequestMapping(value = "/EXT001.html", method = RequestMethod.GET)
	public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {

		Map<String,Object> model = new HashMap<String,Object>();
		
		return new ModelAndView("EXT001", model);

	}
}
