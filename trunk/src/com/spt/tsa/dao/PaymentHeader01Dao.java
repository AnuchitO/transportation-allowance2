package com.spt.tsa.dao;


import java.util.*;

import com.spt.tsa.domain.SCP007Domain01;
import com.spt.tsa.entity.*;

public interface PaymentHeader01Dao {
	public List<PaymentHeader> findPaymentHeader();
	public List<TravelHeader> findTravelHWhereId(String domain);
	public List<PaymentHeader> findPaymentNo(String domain);
	public void saveFromPaymentHeader(PaymentHeader paymentHeader);
	public void saveFromPaymentDetail(PaymentDetail paymentDetail);

}
