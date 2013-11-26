package com.spt.tsa.service;
import java.util.List;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;
public interface TravelDetail01Service {
	 public List<TravelDetail> findTravelDetail();
	 public List<TravelDetail> findByTravelHeader(TravelHeader travelHeader);
	 public void saveTravelDetail(SCF003Domain01 domain);
	 public List<TravelHeader> findTravelHeaderWhereId(String domain);
	 public List<Customer> findCustomerWhereId(String domain);
	 public List<TravelDetail> findDetailWhereCustomer(Customer customer);
	 public void saveTravelDetailCreateForm(TravelDetail travelDetail);
	 public List<TravelDetail> findRowOfGridForUpdateRow(TravelHeader travelHeader, String no);
	 public void deleteTravelDetail(TravelDetail travelDetail);
	
	 
	 public List queryForReportPageSPS10(String status,String empId,String deptCode,String cuId,String startDate,String endDate);
}
