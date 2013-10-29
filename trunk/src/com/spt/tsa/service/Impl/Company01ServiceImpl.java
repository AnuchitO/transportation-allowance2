package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.Company01Dao;
import com.spt.tsa.entity.*;
import com.spt.tsa.service.Company01Service;

@Service
public class Company01ServiceImpl implements Company01Service{

    private Company01Dao company01Dao;
    @Autowired
    public void setCompany01Dao(Company01Dao company01Dao) {
   	 this.company01Dao = company01Dao;
    }
    
    public List<Company> findCompany() {
   	 // TODO Auto-generated method stub
   	 return company01Dao.findCompany();
    }
    
}