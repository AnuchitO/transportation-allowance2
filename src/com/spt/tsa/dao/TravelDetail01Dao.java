package com.spt.tsa.dao;

import java.util.*;

import com.spt.tsa.entity.*;

public interface TravelDetail01Dao {
	public List<TravelDetail> findTravelDetail();
	public List<TravelDetail> findByTravelHeader(TravelHeader travelHeader);

}
