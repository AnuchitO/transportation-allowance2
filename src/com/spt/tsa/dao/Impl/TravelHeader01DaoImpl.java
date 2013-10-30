package com.spt.tsa.dao.Impl;

import java.util.List;

import org.apache.log4j.*;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.controller.EXT001Controller;
import com.spt.tsa.dao.TravelHeader01Dao;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;

@Repository
public class TravelHeader01DaoImpl extends HibernateDaoSupport implements TravelHeader01Dao {
	private static final Logger logger = LoggerFactory.getLogger(TravelHeader01DaoImpl.class);

    @Autowired
    public TravelHeader01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<TravelHeader> findTravelHeader() {
   	 return this.getHibernateTemplate().find("FROM TravelHeader");
    }
    public List<TravelHeader> findByDocNo(String docNo){
    	DetachedCriteria criteria =  DetachedCriteria.forClass(TravelHeader.class)
		        .add(Restrictions.eq("no", docNo));
//    	logger.debug("{}",this.getHibernateTemplate().findByCriteria(criteria));
    	return this.getHibernateTemplate().findByCriteria(criteria);
    }
   
}