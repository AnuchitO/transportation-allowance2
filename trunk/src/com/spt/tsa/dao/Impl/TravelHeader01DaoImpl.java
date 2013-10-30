package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.dao.TravelHeader01Dao;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;

@Repository
public class TravelHeader01DaoImpl extends HibernateDaoSupport implements TravelHeader01Dao {
    @Autowired
    public TravelHeader01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<TravelHeader> findTravelHeader() {
   	 return this.getHibernateTemplate().find("FROM TravelHeader");
    }
    
   
}