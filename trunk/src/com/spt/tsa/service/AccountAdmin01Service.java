package com.spt.tsa.service;
import java.util.List;

import com.spt.tsa.entity.*;

public interface AccountAdmin01Service {
	public List<AccountAdmin> findAccountAdmin();
	public AccountAdmin findAccountAdminWhereId(String domain);

	
	//////////////////////
	//Nong
	//////////////////////
	public List<AccountAdmin> findByCode(String code);
	public void deleteByAccountCode(AccountAdmin accountAdmin);
	public void saveOrUpdate(AccountAdmin accountAdmin);
	public List<AccountAdmin> queryOrderById();
	////// End Nong //////
	
	
}
