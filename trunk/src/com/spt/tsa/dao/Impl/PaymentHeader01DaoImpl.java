package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.dao.PaymentHeader01Dao;
import com.spt.tsa.entity.*;

@Repository
public class PaymentHeader01DaoImpl extends HibernateDaoSupport implements PaymentHeader01Dao {
    @Autowired
    public PaymentHeader01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<PaymentHeader> findPaymentHeader() {
   	 return this.getHibernateTemplate().find("FROM PaymentHeader");
    }
   
}