package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.Customer01Dao;
import com.spt.tsa.entity.*;
import com.spt.tsa.service.Company01Service;
import com.spt.tsa.service.Customer01Service;

@Service
public class Customer01ServiceImpl implements Customer01Service{

    private Customer01Dao customer01Dao;
    @Autowired
    public void setCustomer01Dao(Customer01Dao customer01Dao) {
   	 this.customer01Dao = customer01Dao;
    }
    
    public List<Customer> findCustomer() {
   	 // TODO Auto-generated method stub
   	 return customer01Dao.findCustomer();
    }
    
}