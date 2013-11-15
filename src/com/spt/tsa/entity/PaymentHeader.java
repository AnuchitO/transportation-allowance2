package com.spt.tsa.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table( name = "PAYM_HEADER" )
public class PaymentHeader implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4122310234428712362L;
	@Id
	@Column (name = "PAYH_PHID")
	private String pHeaderId;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "PAYH_THID")
	private TravelHeader travelHeader;
	
	@Column (name = "PAYH_PHNO")
	private String no;
	
	@Column (name = "PAYH_PHDEP")
	private String department;
	
	@Column (name = "PAYH_PHCHEQUEDATE")
	private Date chequedate;
	
	@Column (name = "PAYH_PHTOTALDEBIT")
	private Double totalDebit;
	
	@Column (name = "PAYH_PHTOTALCREBIT")
	private Double totalCredit;

	@Column (name = "PAYH_PHSTATUS")
	private String status;

	@Column (name = "PAYH_PHREMARK")
	private String remark;
	
	@Column (name = "PAYH_PHUSERCREATION")
	private String userCreation;
	
	@Column (name = "PAYH_PHUSERUPDATE")
	private String userUpdate;
	
	@Column (name = "PAYH_PHCREATIONDATE")
	private Date creationDate;
	
	@Column (name = "PAYH_PHMODIFYDATE")
	private Date modifyDate;

	
	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getpHeaderId() {
		return pHeaderId;
	}

	public void setpHeaderId(String pHeaderId) {
		this.pHeaderId = pHeaderId;
	}


	

	public TravelHeader getTravelHeader() {
		return travelHeader;
	}

	public void setTravelHeader(TravelHeader travelHeader) {
		this.travelHeader = travelHeader;
	}



	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Date getChequedate() {
		return chequedate;
	}

	public void setChequedate(Date chequedate) {
		this.chequedate = chequedate;
	}



	public Double getTotalDebit() {
		return totalDebit;
	}

	public void setTotalDebit(Double totalDebit) {
		this.totalDebit = totalDebit;
	}

	public Double getTotalCredit() {
		return totalCredit;
	}

	public void setTotalCredit(Double totalCredit) {
		this.totalCredit = totalCredit;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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
