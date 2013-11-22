package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;







import com.spt.tsa.dao.AccountAdmin01Dao;
import com.spt.tsa.entity.*;

@Repository
public class AccountAdmin01DaoImpl extends HibernateDaoSupport implements AccountAdmin01Dao {
    @Autowired
    public AccountAdmin01DaoImpl(SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<AccountAdmin> findAccountAdmin() {
   	 return this.getHibernateTemplate().find("FROM AccountAdmin");
    }

	public List<AccountAdmin> findByCode(String code) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(AccountAdmin.class);
		 				 criteria.add(Restrictions.eq("code", code));
    	return this.getHibernateTemplate().findByCriteria(criteria);
	}

	public void deleteByAccountId(AccountAdmin accountAdmin) {
		this.getHibernateTemplate().delete(accountAdmin);		
	}

	public void saveOrUpdate(AccountAdmin accountAdmin) {
		this.getHibernateTemplate().saveOrUpdate(accountAdmin);		
	}
   
}