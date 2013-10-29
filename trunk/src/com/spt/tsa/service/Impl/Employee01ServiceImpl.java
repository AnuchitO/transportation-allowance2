package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.Employee01Dao;
import com.spt.tsa.entity.*;
import com.spt.tsa.service.Employee01Service;


@Service
public class Employee01ServiceImpl implements Employee01Service{

    private Employee01Dao employee01Dao;
    @Autowired
    public void setEmployee01Dao(Employee01Dao employee01Dao) {
   	 this.employee01Dao = employee01Dao;
    }
    
    public List<Employee> findEmployee() {
   	 // TODO Auto-generated method stub
   	 return employee01Dao.findEmployee();
    }
    public Employee findEmployeeWhereId(){
    	return employee01Dao.findEmployeeWhereId();
    }
    
}