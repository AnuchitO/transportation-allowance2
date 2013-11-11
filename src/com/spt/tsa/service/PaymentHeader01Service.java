package com.spt.tsa.service;
import java.util.List;

import com.spt.tsa.domain.SCP007Domain01;
import com.spt.tsa.entity.*;
public interface PaymentHeader01Service {
	 public List<PaymentHeader> findPaymentHeader();
	 public List<TravelHeader> findTravelHWhereId(String domain);
	 public List<PaymentHeader> findPaymentNo(String domain);
	 public void saveFromPaymentHeader(SCP007Domain01 domain);

}
