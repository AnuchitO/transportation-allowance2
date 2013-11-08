package com.spt.tsa.dao.Impl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.log4j.*;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.controller.EXT001Controller;
import com.spt.tsa.dao.TravelHeader01Dao;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;

@Repository
public class TravelHeader01DaoImpl extends HibernateDaoSupport implements TravelHeader01Dao {
	private static final Logger logger = LoggerFactory.getLogger(TravelHeader01DaoImpl.class);

    @Autowired
    public TravelHeader01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<TravelHeader> findTravelHeader() {
   	 return this.getHibernateTemplate().find("FROM TravelHeader");
    }
    public List<TravelHeader> findByDocNo(String docNo){
    	DetachedCriteria criteria =  DetachedCriteria.forClass(TravelHeader.class).add(
		        Restrictions.and(
		                Restrictions.eq("no", docNo),
		                Restrictions.eq("status", "002")));
//    	logger.debug("{}",this.getHibernateTemplate().findByCriteria(criteria));
    	return this.getHibernateTemplate().findByCriteria(criteria);
    }
    public Employee findEmployeeWhereId(String domain){
    	 
    		   return this.getHibernateTemplate().get(Employee.class,domain);
    	   
    }
    public Company findCompanyWhereId(String domain){
   	 
		   return this.getHibernateTemplate().get(Company.class,domain);
	   
}
    public List<TravelHeader> findTravelHanderGetLastNoDoc(){
       	DetachedCriteria criteria =  DetachedCriteria.forClass(TravelHeader.class);  	
       		criteria.addOrder(Order.desc("no"));
   	
    	return this.getHibernateTemplate().findByCriteria(criteria);
    }
    
    public void save(SCF003Domain01 domain){
    	TravelHeader traH = new TravelHeader();
    	
    	traH.settHeadId(domain.getName().toString());
    	traH.setNo(domain.getNo().toString());
    	traH.setEmployee(findEmployeeWhereId(domain.getId()));//3
    	traH.setCompany(findEmployeeWhereId(domain.getId()).getCompany());//4
    	traH.setTotal(new Long(domain.getTatolPaymfullCase()));
    	traH.setComName(domain.getCompany());
    	traH.setAddress(domain.getAddress());
    	traH.setProvince(domain.getAntercedentA());
    	traH.setEmail(domain.getEmail());
    	traH.setTelephone(domain.getPhone());
    	traH.setStatus("002");
    	traH.setRemark("no");
    	traH.setTotalExpenses(new Long(domain.getTatolPaym()));
    	traH.setTotalMotorWay(new Long(domain.getTatolPaymA()));
    	traH.setAttachment(new Long(domain.getDocument()));
    	traH.setPaymDesc(domain.getForPay());
    	traH.setPayType(domain.getType1());
    	traH.setUserCreation(domain.getName());
    	traH.setUserUpdate(domain.getName());
    	traH.setCreationate(new Date());
    	traH.setModifyDate(new Date());//21
    	traH.setNameDept(domain.getAntecedent());//22
    	this.getHibernateTemplate().save(traH);
    	
    }
    public List<TravelHeader> findTravelHWhereId(String domain){
		 DetachedCriteria criteria =  DetachedCriteria.forClass(TravelHeader.class).add(
				   
	                Restrictions.eq("no", domain));

		 return this.getHibernateTemplate().findByCriteria(criteria);
}
    public void updateStatusSubmit(SCF003Domain01 domain){
    	TravelHeader traH = this.getHibernateTemplate().get(TravelHeader.class, findTravelHWhereId(domain.getSubmitNo()).get(0).gettHeadId());
    	
    	traH.setStatus("001");
    	this.getHibernateTemplate().update(traH);
    
    }

	public void saveHeaderCreateFrom(TravelHeader travelHeader) {
		this.getHibernateTemplate().saveOrUpdate(travelHeader);
	}

	public List<TravelHeader> findByDocNoForSaveOrUpdate(String docNo) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(TravelHeader.class)
				.add(Restrictions.eq("no", docNo));
		return this.getHibernateTemplate().findByCriteria(criteria);
	}

	 public List<BigDecimal> findTravelTotal(String domain){
		   String no = domain;
		   Session ses = (Session) this.getSession();
		   StringBuffer sql = new StringBuffer();
		   sql.append("select TRAH_THTOTAL from TRAVEL_HEADER where TRAH_THNO = "+"'"+no+"'");
		   SQLQuery query = ses.createSQLQuery(sql.toString());
		   List<BigDecimal> send = query.list();
		   ses.close();
		   return send;
		   
	   }
	

	public List<TravelHeader> findByEmpIdInTravelHeader(Employee employee) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(TravelHeader.class);
				criteria.add(Restrictions.eq("employee", employee));
				criteria.addOrder(Order.asc("no"));
		return this.getHibernateTemplate().findByCriteria(criteria);
	}
    
}