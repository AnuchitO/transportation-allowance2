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

import com.spt.tsa.dao.Customer01Dao;
import com.spt.tsa.entity.*;

@Repository
public class Customer01DaoImpl extends HibernateDaoSupport implements Customer01Dao {
    private static Logger logger = LoggerFactory.getLogger(Customer01DaoImpl.class);
	@Autowired
    public Customer01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<Customer> findCustomer() {
   	 return this.getHibernateTemplate().find("FROM Customer");
    }

	public List<Customer> findByName(String name) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(Customer.class)
					.add(Restrictions.eq("name", name));
		logger.debug("=========++++++++++++++++++=======Customer01DaoImpl========++++++++++++==={}",name);
		logger.debug("=========++++++++++++++++++=======Customer01DaoImpl========++++++++++++==={}",this.getHibernateTemplate().findByCriteria(criteria));
    	return this.getHibernateTemplate().findByCriteria(criteria);

	}
   
}