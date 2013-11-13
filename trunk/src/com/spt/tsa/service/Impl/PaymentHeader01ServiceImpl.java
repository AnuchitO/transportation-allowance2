package com.spt.tsa.service.Impl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.PaymentHeader01Dao;
import com.spt.tsa.domain.SCP007Domain01;
import com.spt.tsa.entity.*;
import com.spt.tsa.service.PaymentHeader01Service;


@Service
public class PaymentHeader01ServiceImpl implements PaymentHeader01Service{

    private PaymentHeader01Dao paymentHeader01Dao;
    @Autowired
    public void setPaymentHeader01Dao(PaymentHeader01Dao paymentHeader01Dao) {
   	 this.paymentHeader01Dao = paymentHeader01Dao;
    }
    
    public List<PaymentHeader> findPaymentHeader() {
   	 // TODO Auto-generated method stub
   	 return paymentHeader01Dao.findPaymentHeader();
    }
    public List<TravelHeader> findTravelHWhereId(String domain){
    	return paymentHeader01Dao.findTravelHWhereId(domain);
    }
    public List<PaymentHeader> findPaymentNo(String domain){
    	return paymentHeader01Dao.findPaymentNo(domain);
    }
    
    public AccountAdmin findIdAccount(String domain){
    	return paymentHeader01Dao.findIdAccount(domain);
    }
    
    public void saveFromPaymentHeader(SCP007Domain01 domain){
    	try {
    		
    	//**************************** save to TravelHeader *********************************************//
    	PaymentHeader paymentHeader = new PaymentHeader();
    	List<TravelHeader> test = this.paymentHeader01Dao.findTravelHWhereId(domain.getScpNoDoc());
//		logger.debug("########################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@{}tests",test.get(0).gettHeadId());
    	paymentHeader.setpHeaderId("pv0001");
    	paymentHeader.setTravelHeader(test.get(0));
    	paymentHeader.setNo(domain.getScpNumber());
    	paymentHeader.setDepartment(domain.getScpLabel3());
    	//***************** convert Date **********************//
    	String date = domain.getScpDateCreation();
    	String [] datet = date.split("-");
    	int total = Integer.valueOf(datet[0]);
    	total += 543;
    	System.out.println("##################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+total);
    	String checkDate = datet[2].substring(0, 2) + "/" + datet[1] + "/" + total;
    	DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		Date datett = formatter.parse(checkDate);
		//*****************************************************//
		paymentHeader.setChequedate(datett);
		paymentHeader.setTotalDebit(new Long(domain.getScfTatolDebit()));
		paymentHeader.setTotalCredit(new Long(domain.getScfTatolCredit()));
		paymentHeader.setStatus(test.get(0).getStatus());
		paymentHeader.setRemark("No");
		paymentHeader.setUserCreation("testUserCreate");
		paymentHeader.setUserUpdate("testUsetUpdate");
		//******************** convert date Creation ****************************//
		String dateCreate = domain.getScpDateCreation();
    	String [] datetCreate = date.split("-");
    	int totalCreate = Integer.valueOf(datet[0]);
    	totalCreate += 543;
    	System.out.println("##################################################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+totalCreate);
    	String DateCreate = datetCreate[2].substring(0, 2) + "/" + datetCreate[1] + "/" + totalCreate;
    	DateFormat formatterCreate = new SimpleDateFormat("dd/MM/yyyy");
    	Date datettCreate = formatter.parse(DateCreate);
		paymentHeader.setCreationDate(datettCreate);
		paymentHeader.setModifyDate(new Date());
		this.paymentHeader01Dao.saveFromPaymentHeader(paymentHeader);
		//******************************** Save TravelHeader Success ***************************************//
		
		PaymentDetail paymentDetail = new PaymentDetail();
		paymentDetail.setpDetailId("PD001");
		
		List<PaymentHeader> no = this.paymentHeader01Dao.findPaymentNo(domain.getScpNumber());
		System.out.println("########################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@test!!"+no.get(0).getpHeaderId());
		paymentDetail.setPaymentHeader(no.get(0));
		
		//**************** split date in Grid *****************//
		
		String[] data = domain.getScpPack().split("!");
		for (String dataSplit : data) {
			String[] dataRow = dataSplit.split(",");
			if(dataRow[0].length() == 10){
				dataRow[0] = dataRow[0].substring(9, 10);
			}
			System.out.println(dataRow[0]);
			System.out.println(dataRow[1]);
			System.out.println(dataRow[2]);
			System.out.println(dataRow[3]);
			System.out.println(dataRow[4]);
			System.out.println(dataRow[5]);
			AccountAdmin idAccount = this.paymentHeader01Dao.findIdAccount(dataRow[0]);
			paymentDetail.setAccountAdmin(idAccount);
			paymentDetail.setDepartment(dataRow[3]);
			paymentDetail.setDebit(new Long(dataRow[4]));
			paymentDetail.setCredit(new Long(dataRow[5]));
			paymentDetail.setUserCreation("testUserCreation");
			paymentDetail.setUserUpdate("testUserUpdate");
			paymentDetail.setCreationDate(datettCreate);
			paymentDetail.setModifyDate(new Date());
			paymentDetail.setNo(dataRow[0]);
			this.paymentHeader01Dao.saveFromPaymentDetail(paymentDetail);
			
		}
		
		
		//*****************************************************//
		
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
    	
    }

	public List<PaymentHeader> findByTravelHeader(TravelHeader travelHeader) {
		return this.paymentHeader01Dao.findByTravelHeader(travelHeader);
	}
    
}