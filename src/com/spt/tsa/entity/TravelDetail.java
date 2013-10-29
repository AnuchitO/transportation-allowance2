package com.spt.tsa.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="Travel_detail")
public class TravelDetail implements Serializable {
	private static final long serialVersionUID = -4122310234428712362L;
	@Id
	@Column(name="Trad_tdid")
	private String tDetailId;
	
	@ManyToOne
	@JoinColumn(name="Trad_thid")
	private TravelHeader TravelHeader;
	
	@ManyToOne
	@JoinColumn(name="Trad_Cuid")
	private Customer Customer;
	
	@Column(name="Trad_tddate")
	private Date date;
	
	@Column(name="Trad_tdfrom")
	private String from;
	
	@Column(name="Trad_tdto")
	private String to;
	
	@Column(name="Trad_tdtravelexpenses")
	private long travelExpenses;
	
	@Column(name="Trad_tdmotorway")
	private long motorWay;
	
	@Column(name="Trad_tdtotalday")
	private long totalDay;
	
	@Column(name="Trad_tdremark")
	private String remark;
	
	@Column(name="Trad_tdusrecreation")
	private String usreCreation;
	
	@Column(name="Trad_tduserupdate")
	private String userUpdate;
	
	@Column(name="Trad_tdcreationdate")
	private Date creationDate;
	
	@Column(name="Trad_tdmodifydate")
	private Date modifyDate;
	
	
	

	public Customer getCustomer() {
		return Customer;
	}

	public void setCustomer(Customer customer) {
		Customer = customer;
	}

	public TravelHeader getTravelHeader() {
		return TravelHeader;
	}

	public void setTravelHeader(TravelHeader travelHeader) {
		TravelHeader = travelHeader;
	}

	public String gettDetailId() {
		return tDetailId;
	}

	public void settDetailId(String tDetailId) {
		this.tDetailId = tDetailId;
	}



	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		date = date;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public long getTravelExpenses() {
		return travelExpenses;
	}

	public void setTravelExpenses(long travelExpenses) {
		this.travelExpenses = travelExpenses;
	}

	public long getMotorWay() {
		return motorWay;
	}

	public void setMotorWay(long motorWay) {
		this.motorWay = motorWay;
	}

	public long getTotalDay() {
		return totalDay;
	}

	public void setTotalDay(long totalDay) {
		this.totalDay = totalDay;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getUsreCreation() {
		return usreCreation;
	}

	public void setUsreCreation(String usreCreation) {
		this.usreCreation = usreCreation;
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