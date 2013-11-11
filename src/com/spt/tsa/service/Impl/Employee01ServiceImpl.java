package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.Employee01Dao;
import com.spt.tsa.domain.SCF003Domain01;
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
    public Employee findEmployeeWhereId(String domain){
    	return employee01Dao.findEmployeeWhereId(domain);
    }
    public List<String> findBankWhereEmp(String domain){
    	System.out.println("findBankWhereEmpService");
    	List<String> send = employee01Dao.findBankWhereEmp(domain);
    	System.out.println("narukjungbey"+send);
    	return send;
    	
    }
    public List<String> findBranchBankWhereEmp(String domain){
    	List<String> send = employee01Dao.findBranchBankWhereEmp(domain);
    	return send;
    }
    public List<String> findDeptWhereEmp(String domain){
    	List<String> send = employee01Dao.findDeptWhereEmp(domain);
    	return send;
    }
    public List<String> findProvinceEmp(String domain){
    	List<String> send = employee01Dao.findProvinceEmp(domain);
    	return send;
    }

	public Employee findEmployeeByIdName(String domainId) {
		
		return this.employee01Dao.findEmployeeByIdName(domainId);
	}
}