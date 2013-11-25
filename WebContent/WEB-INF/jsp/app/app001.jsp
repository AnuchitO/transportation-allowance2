<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
app001  page
<br>
	<center>
		<h1>AccountAdmin</h1>
	<table border="1">
		<c:forEach var="i" items="${account}">
  		<tr><td> Code: <c:out value="${i.acId}"/>  -------------
   		Description: <c:out value="${i.name}"/></td></tr>
		</c:forEach>
		
	</table>
	</center>
	<center>
	<h1>Company</h1>
	<table border="1">
		<c:forEach var="a" items="${com}">
  		<tr><td> Code: <c:out value="${a.comId}"/>  -------------
   		Description: <c:out value="${a.name}"/></td></tr>
		</c:forEach>
	
	</table>
	</center>
	
		<center>
	<h1>Customer</h1>
	<table border="1">
		<c:forEach var="cus" items="${customer}">
  		<tr><td> Code: <c:out value="${cus.cusId}"/>  -------------
   		Description: <c:out value="${cus.name}"/></td></tr>
		</c:forEach>
	
	</table>
	</center>
	<center>
		<h1>Employee</h1>
	<table border="1">
		<c:forEach var="emp" items="${employee}">
  		<tr><td> Code: <c:out value="${emp.empId}"/>  -------------
   		Description: <c:out value="${emp.depId}"/></td></tr>
		</c:forEach>
		
	
	</table>
	</center>
	
	<center>
		<h1>PaymentDetail</h1>
	<table border="1">
		<c:forEach var="payd" items="${paymentDetail}">
  		<tr><td> Code: <c:out value="${payd.pDetailId}"/>  -------------
   		Description: <c:out value="${payd.department}"/></td></tr>
		</c:forEach>
		
	
	</table>
	</center>
	
		<center>
		<h1>PaymentHeader</h1>
	<table border="1">
		<c:forEach var="payh" items="${paymentHeader}">
  		<tr><td> Code: <c:out value="${payh.pHeaderId}"/>  -------------
   		Description: <c:out value="${payh.phone}"/></td></tr>
		</c:forEach>
		
	
	</table>
	</center>
	
			<center>
		<h1>TravelDetail</h1>
	<table border="1">
		<c:forEach var="traD" items="${travelDetail}">
  		<tr><td> Code: <c:out value="${traD.tDetailId}"/>  -------------
   		Description: <c:out value="${traD.date}"/></td></tr>
		</c:forEach>
		
	
	</table>
	</center>
	
			<center>
		<h1>travelHeader</h1>
	<table border="1">
		<c:forEach var="traH" items="${travelHeader}">
  		<tr><td> Code: <c:out value="${traH.no}"/>  -------------
   		Description: <c:out value="${traH.status}"/></td></tr>
		</c:forEach>
		
	
	</table>
	</center>
	
	

	
	

	
</body>
</html>