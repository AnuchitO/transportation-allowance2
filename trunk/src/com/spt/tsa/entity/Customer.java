package com.spt.tsa.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Customer")
public class Customer implements Serializable {
	private static final long serialVersionUID = -4122310234428712362L;
	@Id
	@Column (name="Cus_cuid")
	private String cusId;
	
	@Column(name="Cus_cuname")
	private String name;
	
	@Column(name="Cus_cuaddress")
	private String address;
	
	@Column(name="Cus_cutelephone")
	private String telephone;
	
	@Column(name="Cus_cuusercreation")
	private String userCreation;
	
	@Column(name="Cus_cuuserupdate")
	private String userUpdate;
	
	@Column(name="Cus_cucreationdate")
	private Date creationDate;
	
	@Column(name="Cus_cumoditydate")
	private Date modityDate;

	public String getCusId() {
		return cusId;
	}

	public void setCusId(String cusId) {
		this.cusId = cusId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
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

	public Date getModityDate() {
		return modityDate;
	}

	public void setModityDate(Date modityDate) {
		this.modityDate = modityDate;
	}

}