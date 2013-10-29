package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;
import com.spt.tsa.dao.TravelDetail01Dao;
import com.spt.tsa.entity.*;

@Repository
public class TravelDetail01DaoImpl extends HibernateDaoSupport implements TravelDetail01Dao {
    @Autowired
    public TravelDetail01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<TravelDetail> findTravelDetail() {
   	 return this.getHibernateTemplate().find("FROM TravelDetail");
    }
   
}