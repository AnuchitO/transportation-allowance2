package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.ParameterTableDao;
import com.spt.tsa.domain.SDM009Domain01;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.PaymentHeader;
import com.spt.tsa.entity.TravelDetail;
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

	public  List<ParameterTable>  findRow(String code, String entry) {
		// TODO Auto-generated method stub
		return this.parameterTableDao.findRow(code, entry);
	}
	public List<ParameterTable> findByDept(){
		return this.parameterTableDao.findByDept();
	}
	public List<ParameterTable> findByProvince(){
		return this.parameterTableDao.findByProvince();
	}
	
	public List<ParameterTable> findByMount(){
		return this.parameterTableDao.findByMount();
	}
	public List<ParameterTable> findByStatus(){
		return this.parameterTableDao.findByStatus();
	}
	public List<ParameterTable> findStatusBySelectInGrid(String domain){
		return this.parameterTableDao.findStatusBySelectInGrid(domain);
	}
	public List<ParameterTable> findStatusBySelect(String domain){
		return this.parameterTableDao.findStatusBySelect(domain);
	}
	public List<ParameterTable> findByParametorTableForSaveOrUpdate(String entry){
		 return this.parameterTableDao.findByParametorTableForSaveOrUpdate(entry);
	 }
	public List<ParameterTable> findDeptSelect(String domain){
		return this.parameterTableDao.findDeptSelect(domain);
	}
	public List<ParameterTable> findProvinceSelect(String domain){
		return this.parameterTableDao.findProvinceSelect(domain);
	}
	public void saveOrUpdateFromParameterTable(SDM009Domain01 domain){
		ParameterTable parameterTable = new ParameterTable();
		String[] data = domain.getSdmpack().split("!");
		for (String dataSplit : data) {
			String[] dataRow = dataSplit.split(",");
			
			if(dataRow[0].equals("undefined")){
				dataRow[0] = "0";
			}
			System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"+dataRow[0]);
			List<ParameterTable> parametorDataOld = this.parameterTableDao.findByParametorTableForSaveOrUpdateCheckForId(Integer.valueOf(dataRow[0]));
			if(parametorDataOld.size() != 0){
				parameterTable = parametorDataOld.get(0);
	    	}else{
	    		parameterTable = new ParameterTable();
	    		parameterTable.setId(100);
	    	}
			parameterTable.setCode("4");
			parameterTable.setEntry(dataRow[1]);
			parameterTable.setDetail(dataRow[2]);
			this.parameterTableDao.saveOrUpdateFromParameterTable(parameterTable);
			
		}
    	
    	
	}
	
	 public void removeFromParametorTable(SDM009Domain01 domain){
		 
		 String packRemove = domain.getPackRemove();
			String[] deptSplit = packRemove.split("!");
			for(String dataDept :deptSplit){
				this.parameterTableDao.findByParametorTableForSaveOrUpdate(dataDept);
				if(this.parameterTableDao.findByParametorTableForSaveOrUpdate(dataDept).size() !=0){
				for(ParameterTable param : this.parameterTableDao.findByParametorTableForSaveOrUpdate(dataDept)){
					 this.parameterTableDao.removeFromParametorTable(param);
			 	 }
				}
				else{
					
				}
	 }
	 }
}
