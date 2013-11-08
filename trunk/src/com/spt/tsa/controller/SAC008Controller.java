package com.spt.tsa.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SAC008Controller {
	

	@RequestMapping(value = "/SAC008.html", method = RequestMethod.GET)
	public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {

//		Map<String,Object> model = new HashMap<String,Object>();
		
		return new ModelAndView("SAC008");

	}

}
