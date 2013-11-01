package com.spt.tsa.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
@Entity
@Table(name="Travel_header")
public class TravelHeader  implements Serializable {
	private static final Long serialVersionUID = -4122310234428712362L;
	@Id
	@Column(name="Trah_thid")
	private String tHeadId;
	
	@Column(name="Trah_thno")
	private String no;
	
	@ManyToOne
	@JoinColumn(name="Trah_emid")
	private Employee employee;

	@ManyToOne
	@JoinColumn(name="Trah_cnid")
	private Company company;
	
	@Column(name="Trah_thtotal")
	private Long total;
	
	@Column(name="Trah_thcompany")
	private String comName;
	
	@Column(name="Trah_thaddress")
	private String address;
	
	@Column(name="Trah_thprovince")
	private String province;
	
	@Column(name="Trah_themail")
	private String email;
	
	@Column(name="Trah_thtelephone")
	private String telephone;
	
	@Column(name="Trah_thstatus")
	private String status;
	
	@Column(name="Trah_thremark")
	private String remark;
	
	@Column(name="Trah_thtotalexpenses")
	private Long totalExpenses;
	
	@Column(name="Trah_thtotalmotorway")
	private Long totalMotorWay;
	
	@Column(name="Trah_thattachment")
	private Long attachment;
	
	@Column(name="Trah_thpaymdesc")
	private String paymDesc;
	
	@Column(name="Trah_thpaytype")
	private String payType;
	
	@Column(name="Trah_thusercreation")
	private String userCreation;
	
	@Column(name="Trah_thuserupdate")
	private String userUpdate;
	
	@Column(name="Trah_thcreationate")
	private Date creationate;
	
	@Column(name="Trah_thmodifydate")
	private Date modifyDate;

	@Column(name="NAME_DEPT")
	private String nameDept;

	
	public String getNameDept() {
		return nameDept;
	}

	public void setNameDept(String nameDept) {
		this.nameDept = nameDept;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public String gettHeadId() {
		return tHeadId;
	}

	public void settHeadId(String tHeadId) {
		this.tHeadId = tHeadId;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}
	

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public String getComName() {
		return comName;
	}

	public void setComName(String comName) {
		this.comName = comName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
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

	public Long getTotalExpenses() {
		return totalExpenses;
	}

	public void setTotalExpenses(Long totalExpenses) {
		this.totalExpenses = totalExpenses;
	}

	public Long getTotalMotorWay() {
		return totalMotorWay;
	}

	public void setTotalMotorWay(Long totalMotorWay) {
		this.totalMotorWay = totalMotorWay;
	}

	public Long getAttachment() {
		return attachment;
	}

	public void setAttachment(Long attachment) {
		this.attachment = attachment;
	}

	public String getPaymDesc() {
		return paymDesc;
	}

	public void setPaymDesc(String paymDesc) {
		this.paymDesc = paymDesc;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
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

	public Date getCreationate() {
		return creationate;
	}

	public void setCreationate(Date creationate) {
		this.creationate = creationate;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	

}