package com.spt.tsa.controller.datasource;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RunNumberDocument {
	private static Logger logger = LoggerFactory.getLogger(RunNumberDocument.class);
	private String lastNumberDoc;
	
	public RunNumberDocument() {
		// TODO Auto-generated constructor stub
	}
	
	public RunNumberDocument(String numberDoc) {
		this.lastNumberDoc = numberDoc;
		
	}

	
	public String generatNumberDocument(){
		String returnPrefix=this.lastNumberDoc;
		//Convert year to Thai year
		SimpleDateFormat ft = new SimpleDateFormat ("yyyy");
		BigDecimal year =new BigDecimal(ft.format(new Date()));
		Long yearThaiLong = year.longValue()+543;
		String prefixYearCurrent = yearThaiLong.toString().substring(2, 4);
		//check 	
		if(!(lastNumberDoc.substring(0, 2).equals(prefixYearCurrent))){	
			returnPrefix=prefixYearCurrent.concat("0001");
		}else{
			BigDecimal number=new BigDecimal(lastNumberDoc);
			Long numberDoc = number.longValue();
			numberDoc++;
			returnPrefix=numberDoc.toString();
		}
		logger.debug("========{}",returnPrefix);
		return returnPrefix;
		
	}

}
