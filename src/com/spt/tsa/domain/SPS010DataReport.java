package com.spt.tsa.domain;



import java.util.ArrayList;
import java.util.List;
 
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
 

 
public class SPS010DataReport {
 

public  JRDataSource getDataSource() {

List<Object> items = new ArrayList<Object>();

SPS010Report item1 = new SPS010Report();
item1.setNo("1");
item1.setIdEmp("Emp01");
item1.setNameEmp("nameemp");
item1.setIdDept("dept01");
item1.setTotalMoney("10000");
item1.setDate("18/02/2552");
item1.setTime("13:52");
item1.setMonth("January");
item1.setCustomer("customer01");
item1.setDateYear("2556");
item1.setTotalMoneyFull("500000");

SPS010Report item2 = new SPS010Report();
item2.setNo("1");
item2.setIdEmp("Emp01");
item2.setNameEmp("nameemp");
item2.setIdDept("dept01");
item2.setTotalMoney("10000");
item2.setDate("18/02/2552");
item2.setTime("13:52");
item2.setMonth("January");
item2.setCustomer("customer01");
item2.setDateYear("2556");
item2.setTotalMoneyFull("500000");

items.add(item1);
items.add(item2);


JRDataSource ds = new JRBeanCollectionDataSource(items); 

return ds;
}
}