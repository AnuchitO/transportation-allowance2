package com.spt.tsa.domain;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

public class SCF003Domain01 {
	/************* no and Date ****************/
	String numberDocument;
	String no;
	String date;
	String pack;
	
	/************* Employee History *************/
	String check;
	String name;
	String id;
	String company;
	String antecedent;
	String idCard;
	String address;
	String antercedentA;
	String phone;
	String email;

	/************* Grid **************/
	String gridNo;
	String gridName;
	String dataGridNo;
	Date dataGridData;
	String dataGridCustomer;
	String dataGridRegion;
	String dataGridGoal;
	String dataGridPaymentTravel;
	String dataGridPaymentD;
	String dataGridPayment;
	String dataRemark;
	
	/************* Bottom ************/
	String tatolPaym;
	String tatolPaymA;
	String tatolPaymfullCase;
	String tatolManey;
	Long document;
	String forPay;
	String bank;
	String branch;
	String accountNumber;
	String typeAccount;
	String type1;
	String type2;
	String submitNo;
	String status;
	
	//*************** variable for SCP007 program ************************//
	BigDecimal totalPayment;
	String charactorNumber;
	String minMaxDate;
	
	String scfpackRemove;
	String scfForRemoveNo;
	String scfLastName;
	
	
	
	
	
	
	
	public String getScfLastName() {
		return scfLastName;
	}
	public void setScfLastName(String scfLastName) {
		this.scfLastName = scfLastName;
	}
	public String getScfForRemoveNo() {
		return scfForRemoveNo;
	}
	public void setScfForRemoveNo(String scfForRemoveNo) {
		this.scfForRemoveNo = scfForRemoveNo;
	}
	public String getScfpackRemove() {
		return scfpackRemove;
	}
	public void setScfpackRemove(String scfpackRemove) {
		this.scfpackRemove = scfpackRemove;
	}
	public String getNumberDocument() {
		return numberDocument;
	}
	public void setNumberDocument(String numberDocument) {
		this.numberDocument = numberDocument;
	}
	public String getDataGridPaymentTravel() {
		return dataGridPaymentTravel;
	}
	public void setDataGridPaymentTravel(String dataGridPaymentTravel) {
		this.dataGridPaymentTravel = dataGridPaymentTravel;
	}
	public String getDataGridPaymentD() {
		return dataGridPaymentD;
	}
	public void setDataGridPaymentD(String dataGridPaymentD) {
		this.dataGridPaymentD = dataGridPaymentD;
	}
	public String getDataGridPayment() {
		return dataGridPayment;
	}
	public void setDataGridPayment(String dataGridPayment) {
		this.dataGridPayment = dataGridPayment;
	}
	public String getTatolPaym() {
		return tatolPaym;
	}
	public void setTatolPaym(String tatolPaym) {
		this.tatolPaym = tatolPaym;
	}
	public String getTatolPaymA() {
		return tatolPaymA;
	}
	public void setTatolPaymA(String tatolPaymA) {
		this.tatolPaymA = tatolPaymA;
	}
	public String getTatolPaymfullCase() {
		return tatolPaymfullCase;
	}
	public void setTatolPaymfullCase(String tatolPaymfullCase) {
		this.tatolPaymfullCase = tatolPaymfullCase;
	}
	
	public Long getDocument() {
		return document;
	}
	public void setDocument(Long document) {
		this.document = document;
	}
	public String getMinMaxDate() {
		return minMaxDate;
	}
	public void setMinMaxDate(String minMaxDate) {
		this.minMaxDate = minMaxDate;
	}
	public String getCharactorNumber() {
		return charactorNumber;
	}
	public void setCharactorNumber(String charactorNumber) {
		this.charactorNumber = charactorNumber;
	}
	public BigDecimal getTotalPayment() {
		return totalPayment;
	}
	public void setTotalPayment(BigDecimal totalPayment) {
		this.totalPayment = totalPayment;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public String getSubmitNo() {
		return submitNo;
	}
	public void setSubmitNo(String submitNo) {
		this.submitNo = submitNo;
	}
	public String getCheck() {
		return check;
	}
	public void setCheck(String check) {
		this.check = check;
	}
	public String getGridName() {
		return gridName;
	}
	public void setGridName(String gridName) {
		this.gridName = gridName;
	}
	public String getGridNo() {
		return gridNo;
	}
	public void setGridNo(String gridNo) {
		this.gridNo = gridNo;
	}
	public Date getDataGridData() {
		return dataGridData;
	}
	public void setDataGridData(Date dataGridData) {
		this.dataGridData = dataGridData;
	}
	

	public String getTatolManey() {
		return tatolManey;
	}
	public void setTatolManey(String tatolManey) {
		this.tatolManey = tatolManey;
	}
	
	public String getForPay() {
		return forPay;
	}
	public void setForPay(String forPay) {
		this.forPay = forPay;
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
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getTypeAccount() {
		return typeAccount;
	}
	public void setTypeAccount(String typeAccount) {
		this.typeAccount = typeAccount;
	}
	public String getType1() {
		return type1;
	}
	public void setType1(String type1) {
		this.type1 = type1;
	}
	public String getType2() {
		return type2;
	}
	public void setType2(String type2) {
		this.type2 = type2;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getAntecedent() {
		return antecedent;
	}
	public void setAntecedent(String antecedent) {
		this.antecedent = antecedent;
	}
	public String getAntercedentA() {
		return antercedentA;
	}
	public void setAntercedentA(String antercedentA) {
		this.antercedentA = antercedentA;
	}
	public String getDataGridNo() {
		return dataGridNo;
	}
	public void setDataGridNo(String dataGridNo) {
		this.dataGridNo = dataGridNo;
	}

	public String getDataGridCustomer() {
		return dataGridCustomer;
	}
	public void setDataGridCustomer(String dataGridCustomer) {
		this.dataGridCustomer = dataGridCustomer;
	}
	public String getDataGridRegion() {
		return dataGridRegion;
	}
	public void setDataGridRegion(String dataGridRegion) {
		this.dataGridRegion = dataGridRegion;
	}
	public String getDataGridGoal() {
		return dataGridGoal;
	}
	public void setDataGridGoal(String dataGridGoal) {
		this.dataGridGoal = dataGridGoal;
	}

	public String getDataRemark() {
		return dataRemark;
	}
	public void setDataRemark(String dataRemark) {
		this.dataRemark = dataRemark;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPack() {
		return pack;
	}
	public void setPack(String pack) {
		this.pack = pack;
	}
	
}
