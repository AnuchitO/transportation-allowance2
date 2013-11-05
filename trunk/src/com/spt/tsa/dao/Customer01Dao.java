package com.spt.tsa.dao;
import java.util.*;

import com.spt.tsa.entity.*;

public interface Customer01Dao {
	public List<Customer> findCustomer();
	
	public List<Customer> findByName(String name);
}
