package com.spt.tsa.service;
import java.util.List;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;
public interface Employee01Service {
	 public List<Employee> findEmployee();
	 public Employee findEmployeeWhereId();
	 public List<String> findBankWhereEmp();
}
