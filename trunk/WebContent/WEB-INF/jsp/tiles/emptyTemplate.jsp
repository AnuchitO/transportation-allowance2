<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<tiles:useAttribute name="pageJsIncluded" id="jsIncluded" ignore="true"/>
<html>
	<head>
		<tiles:insertAttribute name="header"/>
		<title><tiles:insertAttribute name="title"/></title>
	</head>
	<body>
		<div id="contentContainer">
			<div id="content">
				<tiles:insertAttribute name="content"/>
			</div>
		</div>
		<c:forTokens items="${jsIncluded}" delims="," var="pageJs">
			<script type="text/javascript" src="${contextPath}${fn:trim(pageJs)}"></script>
		</c:forTokens>
		
	</body>
</html>
