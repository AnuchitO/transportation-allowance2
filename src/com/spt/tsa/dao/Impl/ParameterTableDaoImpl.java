package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
import com.spt.tsa.dao.ParameterTableDao;
import com.spt.tsa.entity.ParameterTable;

@Repository
public class ParameterTableDaoImpl extends HibernateDaoSupport  implements ParameterTableDao{

	 @Autowired
	 public ParameterTableDaoImpl (SessionFactory sessionFactory){
	   	 super.setSessionFactory(sessionFactory);
	 }

	public List<ParameterTable> findTable(String code) {
		DetachedCriteria criteria =  DetachedCriteria.forClass(ParameterTable.class)
		        .add(Restrictions.eq("code", code));
		return this.getHibernateTemplate().findByCriteria(criteria);
		
	}

	public ParameterTable findRow(String code, String entry) {
		//not work
		DetachedCriteria criteria =  DetachedCriteria.forClass(ParameterTable.class)
		        .add(Restrictions.eq("code", code)).add(Restrictions.eq("entry", entry));
		System.out.println("///////////////////////////////////////"+this.getHibernateTemplate().findByCriteria(criteria));
//		eturn (ParameterTable) this.getHibernateTemplate().findByCriteria(criteria);
		return null;
	}

	
}
