package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.dao.AccountProfile01Dao;
import com.spt.tsa.entity.*;

@Repository
public class AccountProfile01DaoImpl extends HibernateDaoSupport implements AccountProfile01Dao {
	private static Logger logger = LoggerFactory.getLogger(AccountProfile01DaoImpl.class);
    @Autowired
    public AccountProfile01DaoImpl(SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }

    public List<AccountProfile> findAll() {
		return this.getHibernateTemplate().find("FROM AccountProfile");
	}

	public List<AccountProfile> findByUserName(String userName,String password) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(AccountProfile.class).add(
		        Restrictions.and(
		                Restrictions.eq("userName", userName),
		                Restrictions.eq("password", password)));		
		return this.getHibernateTemplate().findByCriteria(criteria);
	}

	
   
}