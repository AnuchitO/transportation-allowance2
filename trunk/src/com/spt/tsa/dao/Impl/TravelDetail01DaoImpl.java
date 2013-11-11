package com.spt.tsa.dao.Impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.controller.APP001Controller;
import com.spt.tsa.dao.TravelDetail01Dao;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;

@Repository
public class TravelDetail01DaoImpl extends HibernateDaoSupport implements TravelDetail01Dao {
	private static Logger logger = LoggerFactory.getLogger(APP001Controller.class);
    @Autowired
    public TravelDetail01DaoImpl (SessionFactory sessionFactory){
   	 super.setSessionFactory(sessionFactory);
    }
    
    public List<TravelDetail> findTravelDetail() {
   	 return this.getHibernateTemplate().find("FROM TravelDetail");
    }

	public List<TravelDetail> findByTravelHeader(TravelHeader travelHeader) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(TravelDetail.class)
		        .add(Restrictions.eq("travelHeader", travelHeader));
				criteria.addOrder(Order.asc("no"));
		System.out.println("///////////////////////////////////////"+this.getHibernateTemplate().findByCriteria(criteria));
		return this.getHibernateTemplate().findByCriteria(criteria);
	}

	 public List<Customer> findCustomerWhereId(String domain){
		 DetachedCriteria criteria =  DetachedCriteria.forClass(Customer.class).add(
				   
	                Restrictions.eq("name", domain));

		 return this.getHibernateTemplate().findByCriteria(criteria);
}
	 public List<TravelHeader> findTravelHeaderWhereId(String domain){
		 DetachedCriteria criteria =  DetachedCriteria.forClass(TravelHeader.class).add(
			   
			                Restrictions.eq("no", domain));

	    	return this.getHibernateTemplate().findByCriteria(criteria);
	    }
	 
	   public Customer findCustomer(String domain){
	    	 
		   return this.getHibernateTemplate().get(Customer.class,domain);
	   
}
	public void saveTravelDetail(SCF003Domain01 domain){
			TravelDetail traD = new TravelDetail();
//			traD.settDetailId(domain.getGridNo());//1
//			traD.setTravelHeader(findTravelHeaderWhereId(domain.getGridNo()).get(0));//2
//			
//			traD.setDate(new Date());//3***
//			traD.setCustomer(findCustomerWhereId(domain.getDataGridCustomer()).get(0));//4
//			traD.setFrom(domain.getDataGridRegion());//5
//			traD.setTo(domain.getDataGridGoal());//6
//			traD.setTravelExpenses(domain.getDataGridPaymentTravel());//7
//			traD.setMotorWay(domain.getDataGridPaymentD());//8
//			traD.setTotalDay(domain.getDataGridPayment());//9
//			traD.setRemark(domain.getDataRemark());//10
//			traD.setUsreCreation(domain.getGridName());//11
//			traD.setUserUpdate(domain.getGridName());//12
//			traD.setCreationDate(new Date());//13
//			traD.setModifyDate(new Date());//14
		
			traD.settDetailId("990020");//1
			traD.setTravelHeader(findTravelHeaderWhereId(domain.getNo()).get(0));//2
		
			traD.setDate(new Date());//3***
			traD.setCustomer(findCustomerWhereId(domain.getDataGridCustomer()).get(0));//4
			
			traD.setFrom("AAA");//5
			traD.setTo("AAAAAAA");//6
			traD.setTravelExpenses(111L);//7
			traD.setMotorWay(222L);//8
			traD.setTotalDay(333L);//9
			traD.setRemark("no");//10
			traD.setUserCreation("sada");//11
			traD.setUserUpdate("fsdfsda");//12
			traD.setCreationDate(new Date());//13
			traD.setModifyDate(new Date());//14
			this.getHibernateTemplate().save(traD);
	}

	public void saveTravelDetailCreateForm(TravelDetail travelDetail) {
		this.getHibernateTemplate().saveOrUpdate(travelDetail);		
	}

	public List<TravelDetail> findRowOfGridForUpdateRow(TravelHeader travelHeader, String no) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(TravelDetail.class).add(
		        Restrictions.and(
		                Restrictions.eq("travelHeader", travelHeader),
		                Restrictions.eq("no", no)));
//    	logger.debug("{}",this.getHibernateTemplate().findByCriteria(criteria));
    	return this.getHibernateTemplate().findByCriteria(criteria);
	}

	public void deleteTravelDetail(TravelDetail travelDetail) {
		getHibernateTemplate().delete(travelDetail);		
	}
	
	
    
}