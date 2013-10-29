package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;
import com.spt.tsa.dao.Customer01Dao;
import com.spt.tsa.entity.*;

@Repository
public class Customer01DaoImpl extends HibernateDaoSupport implements Customer01Dao {
    @Autowired
    public Customer01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<Customer> findCustomer() {
   	 return this.getHibernateTemplate().find("FROM Customer");
    }
   
}