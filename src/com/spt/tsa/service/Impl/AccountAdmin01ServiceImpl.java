package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.AccountAdmin01Dao;
import com.spt.tsa.entity.*;
import com.spt.tsa.service.AccountAdmin01Service;


@Service
public class AccountAdmin01ServiceImpl implements AccountAdmin01Service{

    private AccountAdmin01Dao accountAdmin01Dao;
    @Autowired
    public void setAccountAdmin01Dao(AccountAdmin01Dao accountAdmin01Dao) {
   	 this.accountAdmin01Dao = accountAdmin01Dao;
    }
    
    public List<AccountAdmin> findAccountAdmin() {
   	 // TODO Auto-generated method stub
   	 return accountAdmin01Dao.findAccountAdmin();
    }

    ////////////////////////
    //Nong
    ///////////////////////
       
	public List<AccountAdmin> findByAccountId(String acId) {
		 return this.accountAdmin01Dao.findByAccountId(acId);
	}

	public void deleteByAccountId(AccountAdmin accountAdmin) {
		this.accountAdmin01Dao.deleteByAccountId(accountAdmin);
	}
	 
	////////End Nong//////
   
}