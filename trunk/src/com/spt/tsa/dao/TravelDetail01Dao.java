package com.spt.tsa.dao;

import java.util.*;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;

public interface TravelDetail01Dao {
	public List<TravelDetail> findTravelDetail();
	public List<TravelDetail> findByTravelHeader(TravelHeader travelHeader);
	public void saveTravelDetail(SCF003Domain01 domain);
	public List<TravelHeader> findTravelHeaderWhereId(String domain);
	public List<Customer> findCustomerWhereId(String domain);
	public Customer findCustomer(String domain);
	
	
	public void saveTravelDetailCreateForm(TravelDetail travelDetail);
	public List<TravelDetail> findRowOfGridForUpdateRow(TravelHeader travelHeader,String no);
	
	
}
