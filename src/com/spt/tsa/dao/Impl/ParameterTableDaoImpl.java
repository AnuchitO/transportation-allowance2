package com.spt.tsa.dao.Impl;

import java.util.List;

import javax.management.Query;
import javax.transaction.Transaction;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
import com.spt.tsa.dao.ParameterTableDao;
import com.spt.tsa.entity.Employee;
import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.PaymentHeader;
import com.spt.tsa.entity.TravelHeader;

@Repository
public class ParameterTableDaoImpl extends HibernateDaoSupport  implements ParameterTableDao{

	 @Autowired
	 public ParameterTableDaoImpl (SessionFactory sessionFactory){
	   	 super.setSessionFactory(sessionFactory);
	 }

	public List<ParameterTable> findTable(String code) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(ParameterTable.class);
						 criteria.add(Restrictions.eq("code", code));
		return this.getHibernateTemplate().findByCriteria(criteria);		
	}

	public List<ParameterTable>  findRow(String code, String entry) {
		//not work
		DetachedCriteria criteria =  DetachedCriteria.forClass(ParameterTable.class).add(
		        Restrictions.and(
		                Restrictions.eq("code", code),
		                Restrictions.eq("entry", entry)
		            ));
		return this.getHibernateTemplate().findByCriteria(criteria);
	}
	
	public List<ParameterTable> findByDept(){
		String hql = "FROM ParameterTable where CODE='4'";
		 return this.getHibernateTemplate().find(hql);
	}
	public List<ParameterTable> findByProvince(){
		String hql = "FROM ParameterTable where CODE='2'";
		 return this.getHibernateTemplate().find(hql);
		
	}
	
	public List<ParameterTable> findByMount(){
		String hql = "FROM ParameterTable where CODE='3'";
		 return this.getHibernateTemplate().find(hql);
		
	}
	
	public List<ParameterTable> findByStatus(){
		String hql = "FROM ParameterTable where CODE='9'";
		 return this.getHibernateTemplate().find(hql);
		
	}
	
	public List<ParameterTable> findStatusBySelectInGrid(String domain) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(ParameterTable.class);
		 Restrictions.and(
	                Restrictions.eq("code", "9"),
	                Restrictions.eq("entry", domain));
		return this.getHibernateTemplate().findByCriteria(criteria);
	}
	
	public List<ParameterTable> findStatusBySelect(String domain) {
		String hql = "FROM ParameterTable P where P.code='9' and P.detail="+"'"+domain+"'"+"";
		 return this.getHibernateTemplate().find(hql);
		
	}
	
	public List<ParameterTable> findDeptSelect(String domain) {
		String hql = "FROM ParameterTable P where P.code='4' and P.detail="+"'"+domain+"'"+"";
		 return this.getHibernateTemplate().find(hql);
		
	}
	
	  public List<ParameterTable> findByParametorTableForSaveOrUpdate(String entry) {
	 DetachedCriteria criteria =  DetachedCriteria.forClass(ParameterTable.class)
								.add(Restrictions.eq("entry", entry));
			return this.getHibernateTemplate().findByCriteria(criteria);
		}
	public void saveOrUpdateFromParameterTable(ParameterTable parameterTable){
    	this.getHibernateTemplate().saveOrUpdate(parameterTable);
    }
	
	public void removeFromParametorTable(ParameterTable parameterTable){
		this.getHibernateTemplate().delete(parameterTable);
	}
	

	
}
