package com.spt.tsa.dao;

import java.util.List;

import com.spt.tsa.entity.ParameterTable;

public interface ParameterTableDao {
	public List<ParameterTable> findTable(String code);
	public ParameterTable findRow(String code,String entry);
	public List<ParameterTable> findByDept();

	

}
