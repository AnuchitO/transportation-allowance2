package com.spt.tsa.dao;

import java.util.*;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;
public interface TravelHeader01Dao {
	public List<TravelHeader> findTravelHeader();
	 public List<TravelHeader> findByDocNo(String docNo);
	 public void save(SCF003Domain01 domain);
	 public Employee findEmployeeWhereId(String domain);
	 public Company findCompanyWhereId(String domain);
	 public List<TravelHeader> findTravelHanderGetLastNoDoc();
	 
	 ///nong
	 public void saveHeaderCreateFrom(TravelHeader travelHeader);
	 public List<TravelHeader> findByDocNoForSaveOrUpdate(String docNo);

}
