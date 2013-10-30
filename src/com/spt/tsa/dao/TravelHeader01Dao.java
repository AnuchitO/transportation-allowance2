package com.spt.tsa.dao;

import java.util.*;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;
public interface TravelHeader01Dao {
	public List<TravelHeader> findTravelHeader();
	 public List<TravelHeader> findByDocNo(String docNo);
}
