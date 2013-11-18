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
	 public List<TravelHeader> findSelectSearchStatus(String domain);
	 public List<TravelHeader> findYearSelect(String domain);
	 public List<TravelHeader> findMonthSelect(String domain);
	 public List<TravelHeader> findYearAndMonthSelect(String domain);
	 public List<TravelHeader> findMountAndStatus(String domain,String status);
	 public List<TravelHeader> findYearAndStatus(String domain,String status);
	 public List<TravelHeader> findAllCase(String yearAndMount,String status);
	 
	 ///nong
	 public void saveHeaderCreateFrom(TravelHeader travelHeader);
	 public List<TravelHeader> findByDocNoForSaveOrUpdate(String docNo);
	 public List<TravelHeader> findByEmpIdInTravelHeader(Employee employee);
	 public List<TravelHeader> findLikeYearAndStatus(Employee employee,Date yearStart,Date yearEnd,String status);
	 public List<TravelHeader> findLikeStatusAllYear(Employee employee,String status);
	 
	 public void deleteTravelHeader(TravelHeader travelHeader);
	 
	 public List<TravelHeader> findSelectYearNotSave();
	 public List<TravelHeader> findDataGroupByNo();
	 
	 
	 
	 
	
}
