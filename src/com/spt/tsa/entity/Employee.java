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
@Table(name="Employee")
public class Employee implements Serializable {
	private static final long serialVersionUID = -4122310234428712362L;
	@Id
	@Column(name="Emp_emid")
	private String empId;
	
	@ManyToOne
	@JoinColumn(name="Emp_cnid")
	private Company company;
	
	@Column(name="Emp_depid")
	private String depId;
	
	@Column(name="Emp_emtitle")
	private String title;
	
	@Column(name="Emp_emname")
	private String name;
	
	@Column(name="Emp_emlname")
	private String lastname;
	
	@Column(name="Emp_emaddress")
	private String address;
	
	@Column(name="Emp_emprovince")
	private String province;
	
	@Column(name="Emp_emtelephone")
	private String telephone;
	
	@Column(name="Emp_ememail")
	private String email;
	
	@Column(name="Emp_embank")
	private String bank;
	
	@Column(name="Emp_embranch")
	private String branch;
	
	@Column(name="Emp_emaccountno")
	private String accountNo;
	
	@Column(name="Emp_accounttype")
	private String accountType;
	
	@Column(name="Emp_usercreation")
	private String userCreation;
	
	@Column(name="Emp_userupdate")
	private String userUpdate;
	
	@Column(name="Emp_creationdate")
	private Date creationDate;
	
	@Column(name="Emp_modifydate")
	private Date modifyDate;
	
	@Column(name="EMP_EMIDCARD")
	private String idCard;
	

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}



//	public Company getComId() {
//		return comId;
//	}
//
//	public void setComId(Company comId) {
//		this.comId = comId;
//	}

	public String getDepId() {
		return depId;
	}

	public void setDepId(String depId) {
		this.depId = depId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
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
	
	

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
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