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
	private TravelHeader travelHeader;
	
	@ManyToOne
	@JoinColumn(name="Trad_Cuid")
	private Customer customer;
	
	@Column(name="Trad_tddate")
	private Date date;
	
	@Column(name="Trad_tdfrom")
	private String from;
	
	@Column(name="Trad_tdto")
	private String to;
	
	@Column(name="Trad_tdtravelexpenses")
	private Double travelExpenses;
	
	@Column(name="Trad_tdmotorway")
	private Double motorWay;
	
	@Column(name="Trad_tdtotalday")
	private Double totalDay;
	
	@Column(name="Trad_tdremark")
	private String remark;
	
	@Column(name="TRAD_TDUSRECREATION")
	private String userCreation;
	
	@Column(name="Trad_tduserupdate")
	private String userUpdate;
	
	@Column(name="Trad_tdcreationdate")
	private Date creationDate;
	
	@Column(name="Trad_tdmodifydate")
	private Date modifyDate;
	
	@Column(name="TRAD_TDNO")
	private String no;
	

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public TravelHeader getTravelHeader() {
		return travelHeader;
	}

	public void setTravelHeader(TravelHeader travelHeader) {
		this.travelHeader = travelHeader;
	}

	public String gettDetailId() {
		return tDetailId;
	}

	public void settDetailId(String tDetailId) {
		this.tDetailId = tDetailId;
	}

	public Date getDate() {
		return this.date;
	}

	public void setDate(Date date) {
		this.date = date;
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



	public Double getTravelExpenses() {
		return travelExpenses;
	}

	public void setTravelExpenses(Double travelExpenses) {
		this.travelExpenses = travelExpenses;
	}

	public Double getMotorWay() {
		return motorWay;
	}

	public void setMotorWay(Double motorWay) {
		this.motorWay = motorWay;
	}

	public Double getTotalDay() {
		return totalDay;
	}

	public void setTotalDay(Double totalDay) {
		this.totalDay = totalDay;
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

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}
	
	
}