package com.spt.tsa.service;
import java.util.List;

import com.spt.tsa.entity.*;
public interface TravelDetail01Service {
	 public List<TravelDetail> findTravelDetail();
	 public List<TravelDetail> findByTravelHeader(TravelHeader travelHeader);
}
