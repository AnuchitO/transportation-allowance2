package com.spt.tsa.dao;

import java.util.List;

import com.spt.tsa.entity.AccountProfile;

public interface AccountProfile01Dao {
	////////////////////
	//Nong
	///////////////////
	public List<AccountProfile> findAll();
	public List<AccountProfile> findByUserName(String userName,String password);
}
