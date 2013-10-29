package com.spt.tsa.dao;

import java.util.*;

import com.spt.tsa.entity.*;

public interface Employee01Dao {
	public List<Employee> findEmployee();
	public Employee findEmployeeWhereId();

}