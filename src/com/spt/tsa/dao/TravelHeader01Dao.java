package com.spt.tsa.dao;

import java.math.BigDecimal;
import java.math.BigInteger;
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
	 public List<TravelHeader> findTravelHWhereId(String domain);
	 public void updateStatusSubmit(SCF003Domain01 domain);
	 
	 public List<BigDecimal> findTravelTotal(String domain);
	 public List<String> findDateMinMaxFromTravelHeader(String domain);
	 public List<TravelDetail> findDateMinMax(String domain);
	 public List<String> findNameCustomer(String domain);
	 public List<TravelDetail> findByCustomer(String domain);
	 
	 ///nong
	 public void saveHeaderCreateFrom(TravelHeader travelHeader);
	 public List<TravelHeader> findByDocNoForSaveOrUpdate(String docNo);
	 public List<TravelHeader> findByEmpIdInTravelHeader(Employee employee);
	
}
