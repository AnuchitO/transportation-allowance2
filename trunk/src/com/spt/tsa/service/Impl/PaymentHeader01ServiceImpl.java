package com.spt.tsa.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spt.tsa.dao.PaymentHeader01Dao;
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
    
}