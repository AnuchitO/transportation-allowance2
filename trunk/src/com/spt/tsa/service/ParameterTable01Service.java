package com.spt.tsa.service;

import java.util.List;

import com.spt.tsa.domain.SDM009Domain01;
import com.spt.tsa.entity.ParameterTable;

public interface ParameterTable01Service {
	public List<ParameterTable> findTable(String code);
	public List<ParameterTable> findRow(String code,String entry);
	public List<ParameterTable> findByDept();
	public List<ParameterTable> findByProvince();
	public List<ParameterTable> findByMount();
	public List<ParameterTable> findByStatus();
	public List<ParameterTable> findStatusBySelectInGrid(String domain);
	public List<ParameterTable> findStatusBySelect(String domain);
	public void saveOrUpdateFromParameterTable(SDM009Domain01 domain);
	 public List<ParameterTable> findByParametorTableForSaveOrUpdate(String entry);
	 public List<ParameterTable> findDeptSelect(String domain);
	 
	 public void removeFromParametorTable(SDM009Domain01 domain);
	
}
