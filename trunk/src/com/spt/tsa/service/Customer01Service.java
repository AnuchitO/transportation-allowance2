package com.spt.tsa.service;

import java.util.List;

import com.spt.tsa.entity.*;
public interface Customer01Service {
	 public List<Customer> findCustomer();
	
	 public List<Customer> findByName(String name);
	 public List<Customer> findLikeNameCustomer(String name);
	 
}
