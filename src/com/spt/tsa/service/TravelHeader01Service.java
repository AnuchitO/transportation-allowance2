package com.spt.tsa.service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;
public interface TravelHeader01Service {
	 public List<TravelHeader> findTravelHeader();
	 public List<TravelHeader> findByDocNo(String docNo);
	 public Employee findEmployeeWhereId(String domain);
	 public Company findCompanyWhereId(String domain);
	 public void save(SCF003Domain01 domain);
	 public List<TravelHeader> findTravelHanderGetLastNoDoc();
	 public void updateStatusSubmit(SCF003Domain01 domain);
	 
	 public List<BigDecimal> findTravelTotal(String domain);
	///nong
		 public void saveHeaderCreateFrom(TravelHeader travelHeader);
		 public List<TravelHeader> findByDocNoForSaveOrUpdate(String docNo);
}
