package com.spt.tsa.service;

import java.util.List;

import com.spt.tsa.entity.ParameterTable;

public interface ParameterTable01Service {
	public List<ParameterTable> findTable(String code);
	public ParameterTable findRow(String code,String entry);
}
