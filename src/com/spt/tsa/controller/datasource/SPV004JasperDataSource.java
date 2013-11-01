package com.spt.tsa.controller.datasource;


import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.tuxilla.BahtText;

import com.spt.tsa.entity.ParameterTable;
import com.spt.tsa.entity.TravelDetail;
import com.spt.tsa.entity.TravelHeader;
import com.spt.tsa.service.TravelHeader01Service;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRAbstractBeanDataSourceProvider;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

public class SPV004JasperDataSource extends JRAbstractBeanDataSourceProvider {
	private static Logger logger = LoggerFactory.getLogger(SPV004JasperDataSource.class);
	private List<SPV004Pojo> listSPV004PojoData;
	private List<TravelHeader> listLravelHerder;
	private List<ParameterTable> resultsBank;
	private List<ParameterTable> resultsBankType;
	private List<TravelDetail> travelDetails;
//	public SPV004JasperDataSource() {
//	//	super(SPV004Pojo.class);
//		logger.debug("#####-----------------#########3");
//	}
	public SPV004JasperDataSource(List<TravelHeader> resutl, List<ParameterTable> resultsBank,List<ParameterTable>  resultsBankType,List<TravelDetail> travelDetails) {
		super(SPV004Pojo.class);
		this.listLravelHerder = resutl;
		this.resultsBank = resultsBank;
		this.resultsBankType = resultsBankType;
		this.travelDetails = travelDetails;

	}
	
	
	
	public JRDataSource create(JasperReport jrReport) throws JRException {
				
		listSPV004PojoData = new ArrayList<SPV004Pojo>();
		
					
		// Head Information
				String hCompanyName="-";
				String noDoc="-";
				String docDate="-";
				String name="-";
				String empId="-";
				String compName = "-";
				String department="Operation II";
				String address="-";
				String province="-";
				String phoneNumber="-";
				String email="-";
				String idCard="-";
				String hAddressName="-";
				String hTellName="-";
				String hFaxName="-";
				
				
		//Table Information
				String tDate="-";
				String tCustomer="-";
				String tFrom="-";
				String tTo="-";
				String tTravel="-";
				String tExpressWay ="-";
				String tSum="-";
				String tRemark="-";
				String tSumTravel="-";
				String tSumExpressWay="-";
				String tSumTotal="-";
			
		//Summary Information
				String sumTotalCharector="-";
				String attachment="-";
				String toPay="-";
				String bank="-";
				String branch="-";
				String accountId="-";
				String accountType="-";
				String checkCash=" ";
				String checkCheck=" ";

//check TravelDetail how any object

			
				///get data for  Header
				hCompanyName = this.listLravelHerder.get(0).getComName();
				noDoc	=  this.listLravelHerder.get(0).getNo();
				docDate	=  new SimpleDateFormat ("dd/MM/yyyy").format(this.listLravelHerder.get(0).getCreationate());
				name	=  this.listLravelHerder.get(0).getEmployee().getName();
				empId	=  this.listLravelHerder.get(0).getEmployee().getEmpId();
				compName = this.listLravelHerder.get(0).getCompany().getName();
				department=this.listLravelHerder.get(0).getNameDept();
				address =  this.listLravelHerder.get(0).getAddress();
				province=  this.listLravelHerder.get(0).getProvince();
				phoneNumber= this.listLravelHerder.get(0).getTelephone();
				email	= this.listLravelHerder.get(0).getEmail();
				idCard = this.listLravelHerder.get(0).getEmployee().getIdCard();
				hAddressName=this.listLravelHerder.get(0).getCompany().getAddress();
				hTellName=this.listLravelHerder.get(0).getCompany().getTelephone();
				hFaxName=this.listLravelHerder.get(0).getCompany().getFax();
				
				//get data for Total Row
				tSumTravel= this.listLravelHerder.get(0).getTotalExpenses().toString();
				tSumExpressWay = this.listLravelHerder.get(0).getTotalMotorWay().toString();
				tSumTotal = this.listLravelHerder.get(0).getTotal().toString();
				
				
				//get data For assign to variable For Fill summary				
				 sumTotalCharector=new BahtText(this.listLravelHerder.get(0).getTotal()).toString();
				 attachment	=	this.listLravelHerder.get(0).getAttachment().toString();
				 toPay	= this.listLravelHerder.get(0).getPaymDesc();
				 bank 	= this.resultsBank.get(0).getDetail();
				 branch	= this.listLravelHerder.get(0).getEmployee().getBranch();
				 accountId = this.listLravelHerder.get(0).getEmployee().getAccountNo();
				 accountType = this.resultsBankType.get(0).getDetail();
				 if(this.listLravelHerder.get(0).getPayType().equals("1")){
					 checkCash=" ";
					 checkCheck=" ";
				 }else{
					 checkCash=" ";
					 checkCheck=" ";
				 }
	
					
		if(this.travelDetails.size()==1){
			//Fill all  in page field
			SPV004Pojo 	spv004Pojo = new SPV004Pojo();
			spv004Pojo.sethCompanyName(hCompanyName);
			spv004Pojo.setNoDoc(noDoc);
			spv004Pojo.setDocDate(docDate);
		  	spv004Pojo.setName(name);  	
		  	spv004Pojo.setEmpId(empId);
		  	spv004Pojo.setCompName(compName);
		  	spv004Pojo.setDepartment(department);
		  	spv004Pojo.setAddress(address);
		  	spv004Pojo.setProvince(province);
		  	spv004Pojo.setPhoneNumber(phoneNumber);
		  	spv004Pojo.setEmail(email);
		  	spv004Pojo.setIdCard(idCard);
			spv004Pojo.setAttachment(attachment);
			spv004Pojo.setToPay(toPay);
		  	spv004Pojo.sethAddressName(hAddressName);
		  	spv004Pojo.sethTellName(hTellName);
		  	spv004Pojo.sethFaxName(hFaxName);

		  	//Value For first Row Table  query form TravelDetail
		  	spv004Pojo.settDate(new SimpleDateFormat("dd/MM/yyy").format(this.travelDetails.get(0).getDate()));
			spv004Pojo.settCustomer(this.travelDetails.get(0).getCustomer().getName());
			spv004Pojo.settFrom(this.travelDetails.get(0).getFrom());
			spv004Pojo.settTo(this.travelDetails.get(0).getTo());
			spv004Pojo.settTravel(this.travelDetails.get(0).getTravelExpenses().toString());
			spv004Pojo.settExpressWay(this.travelDetails.get(0).getMotorWay().toString());
			spv004Pojo.settSum(this.travelDetails.get(0).getTotalDay().toString());
			spv004Pojo.settNotation(this.travelDetails.get(0).getRemark());
			
			//Fill Total Row
			spv004Pojo.settSumTravel(tSumTravel);
			spv004Pojo.settSumExpressWay(tSumExpressWay);
			spv004Pojo.settSumTotal(tSumTotal);

			
			//Fill summary						
			spv004Pojo.setSumTotalCharector(sumTotalCharector);
			spv004Pojo.setBank(bank);
			spv004Pojo.setBranch(branch);
			spv004Pojo.setAccountId(accountId);
			spv004Pojo.setAccountType(accountType);
			spv004Pojo.setCheckCash(checkCash);
			spv004Pojo.setCheckCheck(checkCheck);		
			listSPV004PojoData.add(spv004Pojo);//Object for save all			
			
		}else if(this.travelDetails.size()==2){
			//Fill Header and Row 1 
			SPV004Pojo 	spv004Pojo = new SPV004Pojo();
			spv004Pojo.sethCompanyName(hCompanyName);
			spv004Pojo.setNoDoc(noDoc);
			spv004Pojo.setDocDate(docDate);
		  	spv004Pojo.setName(name);  	
		  	spv004Pojo.setEmpId(empId);
		  	spv004Pojo.setCompName(compName);
		  	spv004Pojo.setDepartment(department);
		  	spv004Pojo.setAddress(address);
		  	spv004Pojo.setProvince(province);
		  	spv004Pojo.setPhoneNumber(phoneNumber);
		  	spv004Pojo.setEmail(email);
		  	spv004Pojo.setIdCard(idCard);
			spv004Pojo.setAttachment(attachment);
			spv004Pojo.setToPay(toPay);
		  	spv004Pojo.sethAddressName(hAddressName);
		  	spv004Pojo.sethTellName(hTellName);
		  	spv004Pojo.sethFaxName(hFaxName);
			

		  	//Value For first Row Table  query form TravelDetail
		  	spv004Pojo.settDate(new SimpleDateFormat("dd/MM/yyy").format(this.travelDetails.get(0).getDate()));
			spv004Pojo.settCustomer(this.travelDetails.get(0).getCustomer().getName());
			spv004Pojo.settFrom(this.travelDetails.get(0).getFrom());
			spv004Pojo.settTo(this.travelDetails.get(0).getTo());
			spv004Pojo.settTravel(this.travelDetails.get(0).getTravelExpenses().toString());
			spv004Pojo.settExpressWay(this.travelDetails.get(0).getMotorWay().toString());
			spv004Pojo.settSum(this.travelDetails.get(0).getTotalDay().toString());
			spv004Pojo.settNotation(this.travelDetails.get(0).getRemark());
			listSPV004PojoData.add(spv004Pojo);//Header and First Row  Object
			
			//Value For Second Row Table and Summary
		  	spv004Pojo.settDate(new SimpleDateFormat("dd/MM/yyy").format(this.travelDetails.get(1).getDate()));
			spv004Pojo.settCustomer(this.travelDetails.get(1).getCustomer().getName());
			spv004Pojo.settFrom(this.travelDetails.get(1).getFrom());
			spv004Pojo.settTo(this.travelDetails.get(1).getTo());
			spv004Pojo.settTravel(this.travelDetails.get(1).getTravelExpenses().toString());
			spv004Pojo.settExpressWay(this.travelDetails.get(1).getMotorWay().toString());
			spv004Pojo.settSum(this.travelDetails.get(1).getTotalDay().toString());
			spv004Pojo.settNotation(this.travelDetails.get(1).getRemark());
			
			//Fill Total Row
			spv004Pojo.settSumTravel(tSumTravel);
			spv004Pojo.settSumExpressWay(tSumExpressWay);
			spv004Pojo.settSumTotal(tSumTotal);

			//Fill summary						
			spv004Pojo.setSumTotalCharector(sumTotalCharector);;
			spv004Pojo.setBank(bank);
			spv004Pojo.setBranch(branch);
			spv004Pojo.setAccountId(accountId);
			spv004Pojo.setAccountType(accountType);
			spv004Pojo.setCheckCash(checkCash);
			spv004Pojo.setCheckCheck(checkCheck);			
			
			listSPV004PojoData.add(spv004Pojo);//Second Row Total Row and Summary  Object
					
		}else if(this.travelDetails.size()>=3){
			////Fill Header 
			SPV004Pojo 	spv004Pojo = new SPV004Pojo();
			spv004Pojo.sethCompanyName(hCompanyName);
			spv004Pojo.setNoDoc(noDoc);
			spv004Pojo.setDocDate(docDate);
		  	spv004Pojo.setName(name);  	
		  	spv004Pojo.setEmpId(empId);
		  	spv004Pojo.setCompName(compName);
		  	spv004Pojo.setDepartment(department);
		  	spv004Pojo.setAddress(address);
		  	spv004Pojo.setProvince(province);
		  	spv004Pojo.setPhoneNumber(phoneNumber);
		  	spv004Pojo.setEmail(email);
		  	spv004Pojo.setIdCard(idCard);
			spv004Pojo.setAttachment(attachment);
			spv004Pojo.setToPay(toPay);
		  	spv004Pojo.sethAddressName(hAddressName);
		  	spv004Pojo.sethTellName(hTellName);
		  	spv004Pojo.sethFaxName(hFaxName);

		  	//Value For first Row Table  query form TravelDetail
		  	spv004Pojo.settDate(new SimpleDateFormat("dd/MM/yyy").format(this.travelDetails.get(0).getDate()));
			spv004Pojo.settCustomer(this.travelDetails.get(0).getCustomer().getName());
			spv004Pojo.settFrom(this.travelDetails.get(0).getFrom());
			spv004Pojo.settTo(this.travelDetails.get(0).getTo());
			spv004Pojo.settTravel(this.travelDetails.get(0).getTravelExpenses().toString());
			spv004Pojo.settExpressWay(this.travelDetails.get(0).getMotorWay().toString());
			spv004Pojo.settSum(this.travelDetails.get(0).getTotalDay().toString());
			spv004Pojo.settNotation(this.travelDetails.get(0).getRemark());
			listSPV004PojoData.add(spv004Pojo);//Header+First Row  Object one
			
			//Fill  second Row to n-1 Row
			int size = this.travelDetails.size();
			for(int i=1;i<=(size-2);i++){
				//Value For Second Row Table and Summary
			  	spv004Pojo.settDate(new SimpleDateFormat("dd/MM/yyy").format(this.travelDetails.get(i).getDate()));
				spv004Pojo.settCustomer(this.travelDetails.get(i).getCustomer().getName());
				spv004Pojo.settFrom(this.travelDetails.get(i).getFrom());
				spv004Pojo.settTo(this.travelDetails.get(i).getTo());
				spv004Pojo.settTravel(this.travelDetails.get(i).getTravelExpenses().toString());
				spv004Pojo.settExpressWay(this.travelDetails.get(i).getMotorWay().toString());
				spv004Pojo.settSum(this.travelDetails.get(i).getTotalDay().toString());
				spv004Pojo.settNotation(this.travelDetails.get(i).getRemark());
			}
			
			//Value For last Row 
			int lastIndex = size-1;
		  	spv004Pojo.settDate(new SimpleDateFormat("dd/MM/yyy").format(this.travelDetails.get(lastIndex).getDate()));
			spv004Pojo.settCustomer(this.travelDetails.get(lastIndex).getCustomer().getName());
			spv004Pojo.settFrom(this.travelDetails.get(lastIndex).getFrom());
			spv004Pojo.settTo(this.travelDetails.get(lastIndex).getTo());
			spv004Pojo.settTravel(this.travelDetails.get(lastIndex).getTravelExpenses().toString());
			spv004Pojo.settExpressWay(this.travelDetails.get(lastIndex).getMotorWay().toString());
			spv004Pojo.settSum(this.travelDetails.get(lastIndex).getTotalDay().toString());
			spv004Pojo.settNotation(this.travelDetails.get(lastIndex).getRemark());
			
			
			//Fill Total Row
			spv004Pojo.settSumTravel(tSumTravel);
			spv004Pojo.settSumExpressWay(tSumExpressWay);
			spv004Pojo.settSumTotal(tSumTotal);
			
			//Fill summary						
			spv004Pojo.setSumTotalCharector(sumTotalCharector);
			spv004Pojo.setBank(bank);
			spv004Pojo.setBranch(branch);
			spv004Pojo.setAccountId(accountId);
			spv004Pojo.setAccountType(accountType);
			spv004Pojo.setCheckCash(checkCash);
			spv004Pojo.setCheckCheck(checkCheck);			
			
			listSPV004PojoData.add(spv004Pojo);// Last Row Total Row and Summary  Object
			
		}else{
			
			
		}
		
				
///////////////  general add Fill		
		
		//get data For assign to variable For Fill Header
				
//			noDoc	=  listLravelHerder.get(0).getNo();
//			docDate	=  new SimpleDateFormat ("dd/MM/yyyy").format(listLravelHerder.get(0).getCreationate());
//			name	=  listLravelHerder.get(0).getEmployee().getName();
//			empId	=  listLravelHerder.get(0).getEmployee().getEmpId();
//			compName = listLravelHerder.get(0).getCompany().getName();
//			department="Operation II";
//			address =  listLravelHerder.get(0).getAddress();
//			province=  listLravelHerder.get(0).getProvince();
//			phoneNumber= listLravelHerder.get(0).getTelephone();
//			email	= listLravelHerder.get(0).getEmail();
//		
//				//Fill Title Header information
//				SPV004Pojo 	spv004Pojo = new SPV004Pojo();
//							spv004Pojo.setNoDoc(noDoc);
//							spv004Pojo.setDocDate(docDate);
//						  	spv004Pojo.setName(name);  	
//						  	spv004Pojo.setEmpId(empId);
//						  	spv004Pojo.setCompName(compName);
//						  	spv004Pojo.setDepartment(department);
//						  	spv004Pojo.setAddress(address);
//						  	spv004Pojo.setProvince(province);
//						  	spv004Pojo.setPhoneNumber(phoneNumber);
//						  	spv004Pojo.setEmail(email);
//
//
//						  	//Value For first Row Table
//							spv004Pojo.settDate("A");
//							spv004Pojo.settCustomer("A");
//							spv004Pojo.settFrom("A");
//							spv004Pojo.settTo("A");
//							spv004Pojo.settTravel("A");
//							spv004Pojo.settExpressWay("A");
//							spv004Pojo.settSum("A");
//							spv004Pojo.settNotation("AP");
//							listSPV004PojoData.add(spv004Pojo);//Object for header and first row
//							
//				//Fill table value Rows second  and every rows after first Row
//							spv004Pojo = new SPV004Pojo();
//							spv004Pojo.settDate(tDate);
//							spv004Pojo.settCustomer(tCustomer);
//							spv004Pojo.settFrom(tFrom);
//							spv004Pojo.settTo(tTo);
//							spv004Pojo.settTravel(tTravel);
//							spv004Pojo.settExpressWay(tExpressWay);
//							spv004Pojo.settSum(tSum);
//							spv004Pojo.settNotation("PP");
//						  	listSPV004PojoData.add(spv004Pojo);
//				
//				//Fill Total Row
//						spv004Pojo = new SPV004Pojo();
//						spv004Pojo.settDate(tDate);
//						spv004Pojo.settCustomer(tCustomer);
//						spv004Pojo.settFrom(tFrom);
//						spv004Pojo.settTo(tTo);
//						spv004Pojo.settTravel(tTravel);
//						spv004Pojo.settExpressWay(tExpressWay);
//						spv004Pojo.settSum(tSum); 
//						spv004Pojo.settNotation(tNotation);
//						spv004Pojo.settSumTravel(tSumTravel);
//						spv004Pojo.settSumExpressWay(tSumExpressWay);
//						spv004Pojo.settSumTotal(tSumTotal);
//						
//						spv004Pojo.settDate(tDate);
//						spv004Pojo.settCustomer(tCustomer);
//					  	listSPV004PojoData.add(spv004Pojo);		
//					  	
//					  	
//				//Fill Summary
//					  	spv004Pojo = new SPV004Pojo();
//					  	//Fill table last Fill before Total Row
//					  	spv004Pojo.settDate("E");
//						spv004Pojo.settCustomer("E");
//						spv004Pojo.settFrom("E");
//						spv004Pojo.settTo("E");
//						spv004Pojo.settTravel("E");
//						spv004Pojo.settExpressWay("E");
//						spv004Pojo.settSum("E"); 
//						spv004Pojo.settNotation(" ");
//						spv004Pojo.settSumTravel(listLravelHerder.get(0).getTotalExpenses().toString());
//						spv004Pojo.settSumExpressWay(listLravelHerder.get(0).getTotalMotorWay().toString());
//						spv004Pojo.settSumTotal(listLravelHerder.get(0).getTotal().toString());
//	//get data For assign to variable For Fill summary				
//			 sumTotalCharector=new BahtText(listLravelHerder.get(0).getTotal()).toString();
//			 attachment	=	listLravelHerder.get(0).getAttachment().toString();
//			 toPay	= listLravelHerder.get(0).getPaymDesc();
//			 bank 	= resultsBank.get(0).getDetail();
//			 branch	= listLravelHerder.get(0).getEmployee().getBranch();
//			 accountId = listLravelHerder.get(0).getEmployee().getAccountNo();
//			 accountType = resultsBankType.get(0).getDetail();
//			 if(listLravelHerder.get(0).getPayType().equals("1")){
//				 checkCash="/";
//				 checkCheck=" ";
//			 }else{
//				 checkCash=" ";
//				 checkCheck="/";
//			 }
//					  	//Fill summary						
//						spv004Pojo.setSumTotalCharector(sumTotalCharector);
//						spv004Pojo.setAttachment(attachment);
//						spv004Pojo.setToPay(toPay);
//						spv004Pojo.setBank(bank);
//						spv004Pojo.setBranch(branch);
//						spv004Pojo.setAccountId(accountId);
//						spv004Pojo.setAccountType(accountType);
//						spv004Pojo.setCheckCash(checkCash);
//						spv004Pojo.setCheckCheck(checkCheck);
//						listSPV004PojoData.add(spv004Pojo);	
		
		return new JRBeanCollectionDataSource(listSPV004PojoData);
	}

	public void dispose(JRDataSource arg0) throws JRException {
		listSPV004PojoData.clear();
		listSPV004PojoData=null;		
	}




}
