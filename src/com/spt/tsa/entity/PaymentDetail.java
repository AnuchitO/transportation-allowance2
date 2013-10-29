package com.spt.tsa.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table( name = "PAYM_DETAIL" )
public class PaymentDetail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4122310234428712362L;
	@Id
	@Column (name = "PAYD_PDID")
	private String pDetailId;
	
	
	@ManyToOne
	@JoinColumn (name = "PAYD_PHID")
	private PaymentHeader PaymentHeader;
	
	@ManyToOne
	@JoinColumn (name = "PAYD_ACID")
	private AccountAdmin AccountAdmin;
	
	@Column (name = "PAYD_PDDEP")
	private String department;
	
	@Column (name = "PAYD_PDDEBIT")
	private double debit;
	
	@Column (name = "PAYD_PDCREDIT")
	private double credit;
	
	@Column (name = "PAYD_PDUSERCREATION")
	private String userCreation;

	@Column (name = "PAYD_PDUSERUPDATE")
	private String userUpdate;

	@Column (name = "PAYD_PDCREATIONDATE")
	private Date creationDate;
	
	@Column (name = "PAYD_PDMODIFYDATE")
	private Date modifyDate;
	
	

	public AccountAdmin getAccountAdmin() {
		return AccountAdmin;
	}

	public void setAccountAdmin(AccountAdmin accountAdmin) {
		AccountAdmin = accountAdmin;
	}

	public PaymentHeader getPaymentHeader() {
		return PaymentHeader;
	}

	public void setPaymentHeader(PaymentHeader paymentHeader) {
		PaymentHeader = paymentHeader;
	}

	public String getpDetailId() {
		return pDetailId;
	}

	public void setpDetailId(String pDetailId) {
		this.pDetailId = pDetailId;
	}


	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public double getDebit() {
		return debit;
	}

	public void setDebit(double debit) {
		this.debit = debit;
	}

	public double getCredit() {
		return credit;
	}

	public void setCredit(double credit) {
		this.credit = credit;
	}

	public String getUserCreation() {
		return userCreation;
	}

	public void setUserCreation(String userCreation) {
		this.userCreation = userCreation;
	}

	public String getUserUpdate() {
		return userUpdate;
	}

	public void setUserUpdate(String userUpdate) {
		this.userUpdate = userUpdate;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}


	
	

	
	
}
