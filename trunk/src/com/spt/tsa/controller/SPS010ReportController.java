package com.spt.tsa.controller;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.fission.web.view.extjs.grid.GridData;
import com.spt.tsa.controller.datasource.SPV004JasperDataSource;
import com.spt.tsa.controller.datasource.SPV004Pojo;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.domain.SCP007Domain01;
import com.spt.tsa.domain.SDM009Domain01;
import com.spt.tsa.domain.SPS010DataReport;
import com.spt.tsa.domain.SPS010Report;

import com.spt.tsa.entity.Customer;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.TravelDetail;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.Customer01Service;
import com.spt.tsa.service.ParameterTable01Service;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
@Controller
public class SPS010ReportController {
	private static final Logger logger = LoggerFactory.getLogger(SPS010ReportController.class);
	

	@RequestMapping(value = "/SPS010Report.pdf", method = RequestMethod.GET)
	public String printWelcome(ModelMap model,HttpServletRequest request) throws JRException{	
	SPS010DataReport data = new SPS010DataReport();
	JRDataSource dataSource = data.getDataSource();

		model.addAttribute("datasource", dataSource);
		model.addAttribute("format", "pdf");
		return "reportForSearchSPS010";
	}
}







 

