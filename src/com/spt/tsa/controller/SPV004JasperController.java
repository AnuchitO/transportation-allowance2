package com.spt.tsa.controller;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.jasperreports.JasperReportsCsvView;

import com.spt.tsa.controller.datasource.SPV004JasperDataSource;



@Controller
public class SPV004JasperController {
	private static  Logger logger = LoggerFactory.getLogger(SPV004JasperController.class);

	private JRDataSource jrDatasource;

	public SPV004JasperController(){
		
	}

	@RequestMapping(value = "/jasperReport.pdf", method = RequestMethod.GET)
	public String printWelcome(ModelMap model) throws JRException {
		//logger.debug("aaaa+++++++++++++++++++++++++++++++++++a");		
		SPV004JasperDataSource dsStudent =  new SPV004JasperDataSource();
		jrDatasource = dsStudent.create(null);
		model.addAttribute("datasource", jrDatasource);
		model.addAttribute("format", "pdf");
		return "multiViewReport";
	}
	
	
	
}
