package com.spt.tsa.dao;
import java.util.*;

import com.spt.tsa.entity.*;


public interface PaymentDetail01Dao {
	public List<PaymentDetail> findPaymentDetail();
	 public List<PaymentDetail> findPaymentDetailForSaveOrUpdate(PaymentHeader paymentHeader, String domain);

}
