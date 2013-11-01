package com.spt.tsa.dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.spt.tsa.dao.TravelDetail01Dao;
import com.spt.tsa.domain.SCF003Domain01;
import com.spt.tsa.entity.*;

@Repository
public class TravelDetail01DaoImpl extends HibernateDaoSupport implements TravelDetail01Dao {
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
		System.out.println("///////////////////////////////////////"+this.getHibernateTemplate().findByCriteria(criteria));
		return this.getHibernateTemplate().findByCriteria(criteria);
	}
	public TravelHeader findTravelHeaderWhereId(String domain){
		return this.getHibernateTemplate().get(TravelHeader.class,domain);
	}
	public void saveTravelDetail(SCF003Domain01 domain){
			TravelDetail traD = new TravelDetail();
			traD.settDetailId("560001");
			traD.setTravelHeader(findTravelHeaderWhereId(domain.getId()));
			traD.setDate(domain.getDataGridData());
//			traD.setCustomer(domain.getDataGridCustomer());
	}
    
}