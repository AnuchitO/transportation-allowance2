package com.spt.tsa.controller;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.jasperreports.JasperReportsCsvView;

import com.spt.tsa.controller.datasource.SPV004JasperDataSource;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.ParameterTable01Service;
import com.spt.tsa.service.TravelHeader01Service;



@Controller
public class SPV004JasperController {
	private static  Logger logger = LoggerFactory.getLogger(SPV004JasperController.class);
	
	private TravelHeader01Service travelHeader01Service;
	private ParameterTable01Service parameterTable01Service;
	private JRDataSource jrDatasource;
	

	public SPV004JasperController(){
		
	}
	
	@Autowired
	public void setTravelHeader01Service(TravelHeader01Service travelHeader01Service) {
		this.travelHeader01Service = travelHeader01Service;
	}
	
	@Autowired
	public void setParameterTable01Service(
			ParameterTable01Service parameterTable01Service) {
		this.parameterTable01Service = parameterTable01Service;
	}

	@RequestMapping(value = "/jasperReport.pdf", method = RequestMethod.GET)
	public String printWelcome(ModelMap model,HttpServletRequest request) throws JRException{
		String docNo= request.getParameter("docNo").toString();
		logger.debug("+++++++++++++++++++++++++++++++++"+docNo);
		List<TravelHeader> resutl = this.travelHeader01Service.findByDocNo("no001");
		List<ParameterTable> resultsBank = resultsBank= this.parameterTable01Service.findRow("7",resutl.get(0).getEmployee().getBank().toString());
		List<ParameterTable> resultsBankType = this.parameterTable01Service.findRow("8",resutl.get(0).getEmployee().getAccountType().toString());
	SPV004JasperDataSource dsStudent=null;
		dsStudent =  new SPV004JasperDataSource(resutl,resultsBank,resultsBankType);
		jrDatasource = dsStudent.create(null);
		model.addAttribute("datasource", jrDatasource);
		model.addAttribute("format", "pdf");
		return "multiViewReport";
	}

	
	
}
