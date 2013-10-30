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
	   sql.append("select DETAIL FROM PARAMETERTABLE  WHERE ENTRY = " + "'" + id +"'");
	   SQLQuery query = ses.createSQLQuery(sql.toString());
	   List<String> send = query.list();
	   ses.close();
	   return send;

}
   public List<String> findBranchBankWhereEmp(){
	   String branch = this.findEmployeeWhereId().getAccountType();
	   Session ses = (Session) this.getSession();
	   StringBuffer sql = new StringBuffer();
	   sql.append("select DETAIL from PARAMETERTABLE where CODE = '8' and ENTRY = "+"'"+branch+"'");
	   SQLQuery query = ses.createSQLQuery(sql.toString());
	   List<String> send = query.list();
	   ses.close();
	   return send;
   }
   public List<String> findDeptWhereEmp(){
	   String dept = this.findEmployeeWhereId().getDepId();
	   Session ses = (Session) this.getSession();
	   StringBuffer sql = new StringBuffer();
	   sql.append("select DETAIL from PARAMETERTABLE where CODE = '4' and ENTRY = "+"'"+dept+"'");
	   SQLQuery query = ses.createSQLQuery(sql.toString());
	   List<String> send = query.list();
	   ses.close();
	   return send;
   }
   public List<String> findProvinceEmp(){
	   String province = this.findEmployeeWhereId().getProvince();
	   Session ses = (Session) this.getSession();
	   StringBuffer sql = new StringBuffer();
	   sql.append("select DETAIL from PARAMETERTABLE where CODE = '2' and ENTRY = "+"'"+province+"'");
	   SQLQuery query = ses.createSQLQuery(sql.toString());
	   List<String> send = query.list();
	   ses.close();
	   return send;
	   
   }
   
}