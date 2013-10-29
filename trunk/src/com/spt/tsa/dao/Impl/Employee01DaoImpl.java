package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.dao.Employee01Dao;
import com.spt.tsa.entity.*;

@Repository
public class Employee01DaoImpl extends HibernateDaoSupport implements Employee01Dao {
    @Autowired
    public Employee01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<Employee> findEmployee() {
   	 return this.getHibernateTemplate().find("FROM Employee");
    }
   public Employee findEmployeeWhereId(){
	   return this.getHibernateTemplate().get(Employee.class,"EMp001");
   }
}