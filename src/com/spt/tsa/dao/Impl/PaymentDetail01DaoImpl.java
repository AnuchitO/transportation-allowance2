package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.dao.PaymentDetail01Dao;
import com.spt.tsa.entity.*;

@Repository
public class PaymentDetail01DaoImpl extends HibernateDaoSupport implements PaymentDetail01Dao {
    @Autowired
    public PaymentDetail01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<PaymentDetail> findPaymentDetail() {
   	 return this.getHibernateTemplate().find("FROM PaymentDetail");
    }
    
    public List<PaymentDetail> findPaymentDetailForSaveOrUpdate(PaymentHeader paymentHeader, String domain) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(PaymentDetail.class).add(
		        Restrictions.and(
		                Restrictions.eq("paymentHeader", paymentHeader),
		                Restrictions.eq("no", domain)));
//    	logger.debug("{}",this.getHibernateTemplate().findByCriteria(criteria));
    	return this.getHibernateTemplate().findByCriteria(criteria);
	}
   
}