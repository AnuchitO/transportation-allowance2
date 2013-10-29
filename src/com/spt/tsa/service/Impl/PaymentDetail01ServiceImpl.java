package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.Company01Dao;
import com.spt.tsa.dao.PaymentDetail01Dao;
import com.spt.tsa.entity.*;
import com.spt.tsa.service.Company01Service;
import com.spt.tsa.service.PaymentDetail01Service;

@Service
public class PaymentDetail01ServiceImpl implements PaymentDetail01Service{

    private PaymentDetail01Dao paymentDetail01Dao;
    @Autowired
    public void setPaymentDetail01Dao(PaymentDetail01Dao paymentDetail01Dao) {
   	 this.paymentDetail01Dao = paymentDetail01Dao;
    }
    
    public List<PaymentDetail> findPaymentDetail() {
   	 // TODO Auto-generated method stub
   	 return paymentDetail01Dao.findPaymentDetail();
    }
    
}