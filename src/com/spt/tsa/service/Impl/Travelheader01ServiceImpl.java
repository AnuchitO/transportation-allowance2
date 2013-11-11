package com.spt.tsa.service.Impl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.TravelHeader01Dao;
import com.spt.tsa.domain.SCF003Domain01;
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

	public List<TravelHeader> findByDocNo(String docNo) {
		return this.travelHeader01Dao.findByDocNo(docNo);
	}
	public Employee findEmployeeWhereId(String domain){
    	return travelHeader01Dao.findEmployeeWhereId(domain);
    }
	public Company findCompanyWhereId(String domain){
		return travelHeader01Dao.findCompanyWhereId(domain);
	}
	public void save(SCF003Domain01 domain){
		this.travelHeader01Dao.save(domain);
	}
	public List<TravelHeader> findTravelHanderGetLastNoDoc(){
		return this.travelHeader01Dao.findTravelHanderGetLastNoDoc();
	}
	public void updateStatusSubmit(SCF003Domain01 domain){
		this.travelHeader01Dao.updateStatusSubmit(domain);
	}
	public void saveHeaderCreateFrom(TravelHeader travelHeader) {
		this.travelHeader01Dao.saveHeaderCreateFrom(travelHeader);
	}

	public List<TravelHeader> findByDocNoForSaveOrUpdate(String docNo) {
		return this.travelHeader01Dao.findByDocNoForSaveOrUpdate(docNo);
	}
	
	public List<BigDecimal> findTravelTotal(String domain){
		 List<BigDecimal> send = travelHeader01Dao.findTravelTotal(domain);
	    	return send;
	    }
	 public List<String> findDateMinMaxFromTravelHeader(String domain){
		 List<String> send = travelHeader01Dao.findDateMinMaxFromTravelHeader(domain);
		 return send;
	 }
	 public List<TravelDetail> findDateMinMax(String domain) {
		 return this.travelHeader01Dao.findDateMinMax(domain);
	 }
	 public List<String> findNameCustomer(String domain){
		 List<String> send = travelHeader01Dao.findNameCustomer(domain);
		 return send;
	 }
	 public List<TravelDetail> findByCustomer(String domain){
		 return this.travelHeader01Dao.findByCustomer(domain);
	 }

	public List<TravelHeader> findByEmpIdInTravelHeader(Employee employee) {
		return this.travelHeader01Dao.findByEmpIdInTravelHeader(employee);
	}

	public void deleteTravelHeader(TravelHeader travelHeader) {
		this.travelHeader01Dao.deleteTravelHeader(travelHeader);
	}

}
	
