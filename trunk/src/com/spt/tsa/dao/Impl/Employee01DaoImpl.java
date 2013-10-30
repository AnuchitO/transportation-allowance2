package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
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
   public List<String> findBankWhereEmp(){
	   String id =  this.findEmployeeWhereId().getBank();
	   System.out.println("findBankWhereEmpDao");
	   Session ses = (Session) this.getSession();
	   StringBuffer sql = new StringBuffer();
	   sql.append("select DETAIL FROM PARAMETER_TABLE  WHERE ENTRY = '200'");
	   SQLQuery query = ses.createSQLQuery(sql.toString());
	   List<String> send = query.list();
	   ses.close();
//	   return (ParameterTable) this.getHibernateTemplate().find("FROM ParameterTable R WHERE R.code ='7' AND R.entry = '200'");
	   return send;
//	   return (ParameterTable)this.getHibernateTemplate().find(" from CttHdr c where c.cttCd = '"+cttCd+"' ").get(0);
}
   
}