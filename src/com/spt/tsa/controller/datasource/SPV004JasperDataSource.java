package com.spt.tsa.controller.datasource;


import java.util.ArrayList;
import java.util.List;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRAbstractBeanDataSourceProvider;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

public class SPV004JasperDataSource extends JRAbstractBeanDataSourceProvider {

	private List<SPV004Pojo> listSPV004PojoData;
	public SPV004JasperDataSource() {
		super(SPV004Pojo.class);
	}
	
	
	public JRDataSource create(JasperReport jrReport) throws JRException {
		listSPV004PojoData = new ArrayList<SPV004Pojo>();

		// Head Information
				String noDoc="70077";
				String docDate="10/02/2556";
				String name="นางสาวยสมชาย  บุญรอด";
				String empId="53412345";
				String compName = "ซอฟต์สแควร์";
				String department="Operation II";
				String address="92   ต.หลักหก  อ.เมือง";
				String province="สระบุรี";
				String phoneNumber="08-0225-2568";
				String email="its-anshit_a@softsquaregroup.com";			
				
		//Table Information
				String tDate="10/10/2556";
				String tCustomer="yasoop";
				String tFrom="ฟิวเจอร์";
				String tTo="ราดพร้าว";
				String tTravel="300";
				String tExpressWay ="0";
				String tSum="300";
				String tNotation="NN";
				String tSumTravel="300";
				String tSumExpressWay="0";
				String tSumTotal="300";
			
			//Summary Information
				String sumTotalCharector="สามร้อยบาทถ้วน";
				String attachment="1";
				String toPay="เดินทางไปหาลูกค้า";
				String bank="กรุงเทพ";
				String branch="รังสิต";
				String accountId="123-4-12224-5";
				String accountType="ออมทรัพย์";
				String checkCash="/";
				String checkCheck="/";
				
				//Fill Title Head information
				SPV004Pojo 	spv004Pojo = new SPV004Pojo();
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
						  	//Value For first Row Table
							spv004Pojo.settDate("A");
							spv004Pojo.settCustomer("A");
							spv004Pojo.settFrom("A");
							spv004Pojo.settTo("A");
							spv004Pojo.settTravel("A");
							spv004Pojo.settExpressWay("A");
							spv004Pojo.settSum("A");
							spv004Pojo.settNotation("AP");
							listSPV004PojoData.add(spv004Pojo);
							
				//Fill table value Rows second  and every rows after first Row
							spv004Pojo = new SPV004Pojo();
							spv004Pojo.settDate(tDate);
							spv004Pojo.settCustomer(tCustomer);
							spv004Pojo.settFrom(tFrom);
							spv004Pojo.settTo(tTo);
							spv004Pojo.settTravel(tTravel);
							spv004Pojo.settExpressWay(tExpressWay);
							spv004Pojo.settSum(tSum);
							spv004Pojo.settNotation("PP");
						  	listSPV004PojoData.add(spv004Pojo);
				
				//Fill Total Row
						spv004Pojo = new SPV004Pojo();
						spv004Pojo.settDate(tDate);
						spv004Pojo.settCustomer(tCustomer);
						spv004Pojo.settFrom(tFrom);
						spv004Pojo.settTo(tTo);
						spv004Pojo.settTravel(tTravel);
						spv004Pojo.settExpressWay(tExpressWay);
						spv004Pojo.settSum(tSum); 
						spv004Pojo.settNotation(tNotation);
						spv004Pojo.settSumTravel(tSumTravel);
						spv004Pojo.settSumExpressWay(tSumExpressWay);
						spv004Pojo.settSumTotal(tSumTotal);
						
						spv004Pojo.settDate(tDate);
						spv004Pojo.settCustomer(tCustomer);
					  	listSPV004PojoData.add(spv004Pojo);		
					  	
					  	
				//Fill Summary
					  	spv004Pojo = new SPV004Pojo();
					  	//Fill table last Fill before Total Row
					  	spv004Pojo.settDate(tDate);
						spv004Pojo.settCustomer(tCustomer);
						spv004Pojo.settFrom(tFrom);
						spv004Pojo.settTo(tTo);
						spv004Pojo.settTravel(tTravel);
						spv004Pojo.settExpressWay(tExpressWay);
						spv004Pojo.settSum(tSum); 
						spv004Pojo.settNotation(tNotation);
						spv004Pojo.settSumTravel(tSumTravel);
						spv004Pojo.settSumExpressWay(tSumExpressWay);
						spv004Pojo.settSumTotal(tSumTotal);
					  	
					  	//Fill summary						
						spv004Pojo.setSumTotalCharector(sumTotalCharector);
						spv004Pojo.setAttachment(attachment);
						spv004Pojo.setToPay(toPay);
						spv004Pojo.setBank(bank);
						spv004Pojo.setBranch(branch);
						spv004Pojo.setAccountId(accountId);
						spv004Pojo.setAccountType(accountType);
						spv004Pojo.setCheckCash(checkCash);
						spv004Pojo.setCheckCheck(checkCheck);
						listSPV004PojoData.add(spv004Pojo);	
		
		return new JRBeanCollectionDataSource(listSPV004PojoData);
	}

	public void dispose(JRDataSource arg0) throws JRException {
		listSPV004PojoData.clear();
		listSPV004PojoData=null;		
	}

}
