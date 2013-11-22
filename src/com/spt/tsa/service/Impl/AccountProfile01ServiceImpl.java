package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.AccountProfile01Dao;
import com.spt.tsa.entity.*;
import com.spt.tsa.service.AccountProfile01Service;


@Service
public class AccountProfile01ServiceImpl implements AccountProfile01Service{

    private AccountProfile01Dao accountProfile01Dao ;
    
    @Autowired
	public void setAccountProfile01Dao(AccountProfile01Dao accountProfile01Dao) {
		this.accountProfile01Dao = accountProfile01Dao;
	}
   

    ////////////////////////
    //Nong
    ///////////////////////
	public List<AccountProfile> findAll() {
		return this.accountProfile01Dao.findAll();
	}


	public List<AccountProfile> findByUserName(String userName, String password) {
		List<AccountProfile> listAccountProfiles = this.accountProfile01Dao.findByUserName(userName, password);
		return listAccountProfiles;
	}	
	////////End Nong//////



   
}