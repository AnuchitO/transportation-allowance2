package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.ParameterTableDao;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.service.ParameterTable01Service;

@Service
public class ParameterTable01ServiceImpl implements ParameterTable01Service {

	
	private ParameterTableDao parameterTableDao;
	@Autowired
	public void setParameterTableDao(ParameterTableDao parameterTableDao) {
		this.parameterTableDao = parameterTableDao;
	}

	public List<ParameterTable> findTable(String code) {
		
		return this.parameterTableDao.findTable(code);
	}

	public ParameterTable findRow(String code, String entry) {
		// TODO Auto-generated method stub
		return this.parameterTableDao.findRow(code, entry);
	}

}
