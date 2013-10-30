package com.spt.tsa.dao;

import java.util.*;

import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;

public interface Company01Dao {
	public List<Company> findCompany();
	public Company findByName(String name);
	
}
