package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.TravelDetail01Dao;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;
import com.spt.tsa.service.TravelDetail01Service;

@Service
public class TravelDetail01ServiceImpl implements TravelDetail01Service{

    private TravelDetail01Dao travelDetail01Dao;
    @Autowired
    public void setTravelDetail01Dao(TravelDetail01Dao travelDetail01Dao) {
   	 this.travelDetail01Dao = travelDetail01Dao;
    }
    
    public List<TravelDetail> findTravelDetail() {
   	 // TODO Auto-generated method stub
   	 return travelDetail01Dao.findTravelDetail();
    }

	public List<TravelDetail> findByTravelHeader(TravelHeader travelHeader) {
		// TODO Auto-generated method stub
		return this.travelDetail01Dao.findByTravelHeader(travelHeader);
	}
	public void saveTravelDetail(SCF003Domain01 domain){
		this.travelDetail01Dao.saveTravelDetail(domain);
	}
	public TravelHeader findTravelHeaderWhereId(String domain){
		return this.travelDetail01Dao.findTravelHeaderWhereId(domain);
	}
    
}