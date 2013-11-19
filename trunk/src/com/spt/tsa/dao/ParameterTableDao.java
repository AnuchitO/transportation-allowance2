package com.spt.tsa.dao;

import java.util.List;

import com.spt.tsa.entity.ParameterTable;

public interface ParameterTableDao {
	public List<ParameterTable> findTable(String code);
	public List<ParameterTable> findRow(String code,String entry);
	public List<ParameterTable> findByDept();
	public List<ParameterTable> findByProvince();
	public List<ParameterTable> findByMount();
	public List<ParameterTable> findByStatus();
	public List<ParameterTable> findStatusBySelectInGrid(String domain);
	public List<ParameterTable> findStatusBySelect(String domain);
	public void saveOrUpdateFromParameterTable(ParameterTable parameterTable);
	 public List<ParameterTable> findByParametorTableForSaveOrUpdate(String entry);
	public void removeFromParametorTable(ParameterTable parameterTable);

	

}
