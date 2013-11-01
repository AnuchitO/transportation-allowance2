package com.spt.tsa.dao;

import java.util.*;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;

public interface TravelDetail01Dao {
	public List<TravelDetail> findTravelDetail();
	public List<TravelDetail> findByTravelHeader(TravelHeader travelHeader);
	public void saveTravelDetail(SCF003Domain01 domain);
	public TravelHeader findTravelHeaderWhereId(String domain);
}
