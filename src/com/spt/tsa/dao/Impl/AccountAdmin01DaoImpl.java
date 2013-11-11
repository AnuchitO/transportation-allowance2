package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
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
   
}