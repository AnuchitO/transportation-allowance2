package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.dao.PaymentHeader01Dao;
import com.spt.tsa.domain.SCP007Domain01;
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
    
    public List<TravelHeader> findTravelHWhereId(String domain){
		 DetachedCriteria criteria =  DetachedCriteria.forClass(TravelHeader.class).add(
				   
	                Restrictions.eq("no", domain));

		 return this.getHibernateTemplate().findByCriteria(criteria);
}
   
    public List<PaymentHeader> findPaymentNo(String domain){
		 DetachedCriteria criteria =  DetachedCriteria.forClass(PaymentHeader.class).add(
				   
	                Restrictions.eq("no", domain));

		 return this.getHibernateTemplate().findByCriteria(criteria);
}
    public void saveFromPaymentHeader(PaymentHeader paymentHeader){
    	this.getHibernateTemplate().saveOrUpdate(paymentHeader);
    }
    
    public void saveFromPaymentDetail(PaymentDetail paymentDetail){
    	this.getHibernateTemplate().saveOrUpdate(paymentDetail);
    }
    
    public AccountAdmin findIdAccount(String domain){
 	   return this.getHibernateTemplate().get(AccountAdmin.class,domain);
    }

	public List<PaymentHeader> findByTravelHeader(TravelHeader travelHeader) {
		 DetachedCriteria criteria =  DetachedCriteria.forClass(PaymentHeader.class);
		  				  criteria.add(Restrictions.eq("travelHeader", travelHeader));
		 return this.getHibernateTemplate().findByCriteria(criteria);
	}
}