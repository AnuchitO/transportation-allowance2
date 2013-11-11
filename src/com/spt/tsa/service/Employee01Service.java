package com.spt.tsa.service;
import java.util.List;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;
public interface Employee01Service {
	 public List<Employee> findEmployee();
	 public Employee findEmployeeWhereId(String domain);
	 public List<String> findBankWhereEmp(String domain);
	 public List<String> findBranchBankWhereEmp(String domain);
	 public List<String> findDeptWhereEmp(String domain);
	 public List<String> findProvinceEmp(String domain);
	 
	 
	 public Employee findEmployeeByIdName(String domainId);

}
