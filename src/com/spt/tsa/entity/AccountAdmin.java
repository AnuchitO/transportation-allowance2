package com.spt.tsa.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Formula;

@Entity
@Table( name = "ACCOUNT_ADMIN" )
public class AccountAdmin implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4122310234428712362L;
	@Id
	@Column (name = "ACCAD_ACID")
	private String code;
	
	
	@Formula(value="to_number(ACCAD_ACID)")
	private Integer codeLong;
	
	@Column (name = "ACCAD_ACNAME")
	private String name;
	
	@Column (name = "ACCAD_ACTYPE")
	private String type;
	
	@Column (name = "ACCAD_ACUSERCREATION")
	private String userCreation;
	
	@Column (name = "ACCAD_ACUSERUPDATE")
	private String userUpdate;
	
	@Column (name = "ACCAD_ACCREATIONDATE")
	private Date creationDate;
	
	@Column (name = "ACCAD_ACMODIFYDATE")
	private Date modifyDate;
	
	@Column (name = "ACCAD_ACNO")
	private String accountNo;


	
	
	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}	


	public Integer getCodeLong() {
		return codeLong;
	}

	public void setCodeLong(Integer codeLong) {
		this.codeLong = codeLong;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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
