package com.spt.tsa.dao.Impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import org.hibernate.FetchMode;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
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
			traD.setTravelExpenses(111.00);//7
			traD.setMotorWay(222.00);//8
			traD.setTotalDay(333.00);//9
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
	
	
	
	public List<TravelDetail> findDetailWhereCustomer(Customer customer) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(TravelDetail.class);
				criteria.add(Restrictions.eq("customer", customer));
			
		return this.getHibernateTemplate().findByCriteria(criteria);
	}
	
	
	


	public List queryForReportPageSPS10(String status,String empId,String deptCode,String cuId,String startDate,String endDate) {
////		DetachedCriteria criteria =  DetachedCriteria.forClass(TravelDetail.class);		
//						 
//						 
////						 criteria.createAlias("travelHeader", "tHeader");
////						 criteria.add(Restrictions.like("tHeader.userCreation", "%anuchit%"));
////						 .add(Projections.groupProperty("s.e.name"))
////						 criteria.setProjection(Projections.groupProperty("travelHeader"));
////						 criteria.setProjection(Projections.rowCount());
////						 criteria.setProjection( Projections.projectionList()
////							        .add( Projections.rowCount() )
//////							        .add( Projections.groupProperty("travelHeader"))
////							        );
////						    ProjectionList projList = Projections.projectionList();
////						    projList.add(Projections.property("tDetailId"));
////						    projList.add(Projections.groupProperty("tDetailId"));						    
////						    criteria.setProjection(projList);
////		////////////////////////////////////////////////////////////////////////////////////////////////////
//						    DetachedCriteria criteria = DetachedCriteria.forClass(TravelDetail.class);
////						    metrics.add(Expression.between("dateTime", dateFrom, dateTo));
//						    criteria.setFetchMode("travelHeader", FetchMode.JOIN);	
//						    criteria.createAlias("travelHeader", "tHeader");
////						    criteria.add(Restrictions.and(  //////// Freeze
////								    		Restrictions.eq("tHeader.status", "004"),
////								    		Restrictions.and(lhs, rhs)
////								    		Restrictions.like("tHeader.employee", "%")
////						    		));
//						    
//						    criteria.add(Restrictions.eq("tHeader.status", "004"));
////				    		criteria.add(Restrictions.like("tHeader.employee", "%"));//Object Employee
////						    criteria.add(Restrictions.eq("tHeader.company", "004")); //Object Company
//						    criteria.add(Restrictions.like("tHeader.nameDept", "1000%")); 
////						    metrics.add(Expression.eq("navPage", navPage));
//						    
//						    ProjectionList projectList = Projections.projectionList();
//						    projectList.add(Projections.property("tHeader.status"));
////						 // group by
//						 	projectList.add(Projections.groupProperty("travelHeader"));						    
////						 // alias of the column head
//						 	projectList.add(Projections.alias(Projections.rowCount(), "count"));
//						    criteria.setProjection(projectList);
////
////						 // order by, sorting
////						    metrics.addOrder(Order.desc("count"));
////						 List results = getHibernateTemplate().findByCriteria(metrics);
		
////////////////////////////////////  Native SQL  //////////////////////////////////////////

	   Session session = (Session) this.getSession();
	   StringBuffer sql = new StringBuffer();
	   sql.append("SELECT h.trah_thid FROM TRAVEL_DETAIL d left join travel_header h "+
			   	  "ON d.trad_thid = h.trah_thid "+
			   	  "where h.trah_thstatus = '"+status+"' "+
			   	  "and h.trah_emid like '"+empId+"' "+
			   	  "and h.name_dept like '"+deptCode+"' "+
			   	  "and d.trad_cuid like '"+cuId+"' "+
			   	  "and (h.TRAH_THMODIFYDATE between to_date ('"+startDate+"', 'dd/mm/yyyy')"+
			      "AND to_date ('"+endDate+"', 'dd/mm/yyyy') or to_char(h.TRAH_THMODIFYDATE,'dd/MM/yyyy')  like'%"+startDate+"%')"+
			   	  "group by h.trah_thid"+
			   	  "");
	   SQLQuery query = session.createSQLQuery(sql.toString());
	   List results = query.list();
	   session.close();
	   return results;		
		
//		return this.getHibernateTemplate().findByCriteria(criteria);
	}

	
    
}