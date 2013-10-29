package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.TravelHeader01Dao;
import com.spt.tsa.entity.*;
import com.spt.tsa.service.TravelHeader01Service;



@Service
public class Travelheader01ServiceImpl implements TravelHeader01Service{

    private TravelHeader01Dao travelHeader01Dao;
    @Autowired
    public void setTravelHeader01Dao(TravelHeader01Dao travelHeader01Dao) {
   	 this.travelHeader01Dao = travelHeader01Dao;
    }
    
    public List<TravelHeader> findTravelHeader(){
   	 // TODO Auto-generated method stub
   	 return travelHeader01Dao.findTravelHeader();
    }
    
}