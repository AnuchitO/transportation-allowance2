package com.spt.tsa.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table( name = "COMPANY" )
public class Company implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4122310234428712362L;
	@Id
	@Column (name = "COMP_CNID")
	private String comId;
	
	@Column (name = "COMP_CNNAME")
	private String name;
	
	@Column (name = "COMP_CNADDRESS")
	private String address;
	
	@Column (name = "COMP_CNTELEPHONE")
	private String telephone;
	
	@Column (name = "COMP_CNUSERCREATION")
	private String userCreation;
	
	@Column (name = "COMP_CNUSERUPDATE")
	private String userUpdate;
	
	@Column (name = "COMP_CNCREATIONDATE")
	private Date creationDate;

	@Column (name = "COMP_CNMODIFYDATE")
	private Date modifyDate;
	
	@Column (name= "COMP_CNFAX")
	private String fax;

	public String getComId() {
		return comId;
	}

	public void setComId(String comId) {
		this.comId = comId;
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

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	
	

	
	
}
