package com.spt.tsa.service;
import java.util.List;

import com.spt.tsa.entity.*;

public interface AccountProfile01Service {
	
	//////////////////////
	//Nong
	//////////////////////
	public List<AccountProfile> findAll();
	public List<AccountProfile> findByUserName(String userName,String password);
	////// End Nong //////
}
