package com.spt.tsa.service;

import java.util.List;

import com.spt.tsa.entity.*;
public interface PaymentDetail01Service {
	 public List<PaymentDetail> findPaymentDetail();
	 public List<PaymentDetail> findByPaymentHeader(PaymentHeader paymentHeader);
	 public List<PaymentDetail> findPaymentDetailForSaveOrUpdate(PaymentHeader paymentHeader, String domain);
	 public void deletePaymentDetail(PaymentDetail paymentDetail);

}
