package com.spt.tsa.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lowagie.text.Document;


@Controller
public class SPV004Controller {
	private static  Logger logger = LoggerFactory.getLogger(SPV004Controller.class);
	private static final long serialVersionUID = 1L;
	private static final int BUFFER_SIZE = 4096;
	
	@RequestMapping(value = "/SPV004", method = RequestMethod.GET)
	public void view(HttpServletRequest request, HttpServletResponse response)  {
//		try {
//			PrintWriter out = response.getWriter();
//			out.println("Return void in controller");
//		} catch (Exception e) {
//			// TODO: handle exception
//		}
		
////		Map<String,Object> model = new HashMap<String,Object>();
//		//File PDF Name
				String pdfFileName = "AppPDF.pdf";

			
//Response PDF to Browser client
			try {
//				String contextPath = getServletContext().getRealPath(File.separator);
//				File pdfFile = new File(contextPath + pdfFileName);
				
				String contextPath = request.getRealPath(File.separator);
				File pdfFile = new File(contextPath + pdfFileName);
				logger.debug("appPath ****************** = {}" ,contextPath);
		        
		        response.setContentType("application/pdf");
				response.addHeader("Content-Disposition", "inline; filename=" + pdfFileName);
				response.setContentLength((int) pdfFile.length());

				FileInputStream fileInputStream = new FileInputStream(pdfFile);
				OutputStream responseOutputStream = response.getOutputStream();
				
				byte[] buffer = new byte[BUFFER_SIZE];
			    int bytesRead = -1;
				while ((bytesRead = fileInputStream.read(buffer)) != -1) {
					System.out.print(bytesRead+" ");
					responseOutputStream.write(buffer, 0, bytesRead);
				}
				
				fileInputStream.close();
				responseOutputStream.close();
			} catch (Exception e) {
				// TODO: handle exception
			}
//		return new ModelAndView("SPV004", model);
//		return null;

	}
	
	
	
	
}
