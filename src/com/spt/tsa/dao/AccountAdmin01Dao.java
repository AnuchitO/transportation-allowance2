package com.spt.tsa.dao;
import java.util.*;

import com.spt.tsa.entity.*;
public interface AccountAdmin01Dao {
	public List<AccountAdmin> findAccountAdmin();
	
	
	
	/////////
	//Nong
	////////
	public List<AccountAdmin> findByAccountId(String acId);
	public void deleteByAccountId(AccountAdmin accountAdmin);
	public void saveOrUpdate(AccountAdmin accountAdmin);
}	
