package com.spt.tsa.dao;

import java.util.*;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;

public interface Employee01Dao {
	public List<Employee> findEmployee();
	public Employee findEmployeeWhereId();
	public List<String> findBankWhereEmp();

}