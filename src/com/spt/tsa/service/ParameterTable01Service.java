package com.spt.tsa.service;

import java.util.List;

import com.spt.tsa.entity.ParameterTable;

public interface ParameterTable01Service {
	public List<ParameterTable> findTable(String code);
	public List<ParameterTable> findRow(String code,String entry);
	public List<ParameterTable> findByDept();
	
}
