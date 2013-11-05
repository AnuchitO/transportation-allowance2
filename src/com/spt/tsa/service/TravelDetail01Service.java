package com.spt.tsa.service;
import java.util.List;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;
public interface TravelDetail01Service {
	 public List<TravelDetail> findTravelDetail();
	 public List<TravelDetail> findByTravelHeader(TravelHeader travelHeader);
	 public void saveTravelDetail(SCF003Domain01 domain);
	 public TravelHeader findTravelHeaderWhereId(String domain);
	 
	 public void saveTravelDetailCreateForm(TravelDetail travelDetail);
	 public List<TravelDetail> findRowOfGridForUpdateRow(TravelHeader travelHeader, String no);
}
