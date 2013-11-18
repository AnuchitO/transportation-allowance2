package com.spt.tsa.service;
import java.util.List;

import com.spt.tsa.entity.*;

public interface AccountAdmin01Service {
	public List<AccountAdmin> findAccountAdmin();

	
	//////////////////////
	//Nong
	//////////////////////
	public List<AccountAdmin> findByAccountId(String acId);
	public void deleteByAccountId(AccountAdmin accountAdmin);
	public void saveOrUpdate(AccountAdmin accountAdmin);
	////// End Nong //////
}
