package com.spt.tsa.service;

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
	

}
