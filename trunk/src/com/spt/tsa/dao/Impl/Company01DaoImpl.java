package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.dao.Company01Dao;
import com.spt.tsa.entity.*;

@Repository
public class Company01DaoImpl extends HibernateDaoSupport implements Company01Dao {
    @Autowired
    public Company01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<Company> findCompany() {
   	 return this.getHibernateTemplate().find("FROM Company");
    }
   
}