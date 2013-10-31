package com.spt.tsa.controller.datasource;

public class SPV004Pojo {	
	//Head Information
	private String hCompanyName;
	private String noDoc;
	private String docDate;
	private String name;
	private String empId;
	private String compName;
	private String department;
	private String address;
	private String province;
	private String phoneNumber;
	private String email;

	//Table Information
	private String tDate;
	private String tCustomer;
	private String tFrom;
	private String tTo;
	private String tTravel;
	private String tExpressWay;
	private String tSum;
	private String tNotation;
	private String tSumTravel;
	private String tSumExpressWay;
	private String tSumTotal;
	
	//Summary Information
	private String sumTotalCharector;
	private String attachment;
	private String toPay;
	private String bank;
	private String branch;
	private String accountId;
	private String accountType;
	private String checkCash;
	private String checkCheck;
	
	public SPV004Pojo() {

	}

	public SPV004Pojo(String id, String name,String no) {
		this.name = name;
		this.noDoc = no;
	}


	public String gethCompanyName() {
		return hCompanyName;
	}

	public void sethCompanyName(String hCompanyName) {
		this.hCompanyName = hCompanyName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNoDoc() {
		return noDoc;
	}

	public void setNoDoc(String no) {
		this.noDoc = no;
	}

	public String getDocDate() {
		return docDate;
	}

	public void setDocDate(String docDate) {
		this.docDate = docDate;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}

	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
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

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String gettDate() {
		return tDate;
	}

	public void settDate(String tDate) {
		this.tDate = tDate;
	}

	public String gettCustomer() {
		return tCustomer;
	}

	public void settCustomer(String tCustomer) {
		this.tCustomer = tCustomer;
	}

	public String gettFrom() {
		return tFrom;
	}

	public void settFrom(String tFrom) {
		this.tFrom = tFrom;
	}

	public String gettTo() {
		return tTo;
	}

	public void settTo(String tTo) {
		this.tTo = tTo;
	}

	public String gettTravel() {
		return tTravel;
	}

	public void settTravel(String tTravel) {
		this.tTravel = tTravel;
	}

	public String gettExpressWay() {
		return tExpressWay;
	}

	public void settExpressWay(String tExpressWay) {
		this.tExpressWay = tExpressWay;
	}

	public String gettSum() {
		return tSum;
	}

	public void settSum(String tSum) {
		this.tSum = tSum;
	}

	public String gettNotation() {
		return tNotation;
	}

	public void settNotation(String tNotation) {
		this.tNotation = tNotation;
	}

	public String gettSumTravel() {
		return tSumTravel;
	}

	public void settSumTravel(String tSumTravel) {
		this.tSumTravel = tSumTravel;
	}

	public String gettSumExpressWay() {
		return tSumExpressWay;
	}

	public void settSumExpressWay(String tSumExpressWay) {
		this.tSumExpressWay = tSumExpressWay;
	}

	public String gettSumTotal() {
		return tSumTotal;
	}

	public void settSumTotal(String tSumTotal) {
		this.tSumTotal = tSumTotal;
	}

	public String getSumTotalCharector() {
		return sumTotalCharector;
	}

	public void setSumTotalCharector(String sumTotalCharector) {
		this.sumTotalCharector = sumTotalCharector;
	}

	public String getAttachment() {
		return attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}

	public String getToPay() {
		return toPay;
	}

	public void setToPay(String toPay) {
		this.toPay = toPay;
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

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public String getCheckCash() {
		return checkCash;
	}

	public void setCheckCash(String checkCash) {
		this.checkCash = checkCash;
	}

	public String getCheckCheck() {
		return checkCheck;
	}

	public void setCheckCheck(String checkCheck) {
		this.checkCheck = checkCheck;
	}
	
	
	
	
}
