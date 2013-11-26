SPS010 = {};
SPS010.spsIframe = new Ext.fission.IFrameComponent({
  
//	frameSrc : '/TransportationAllowance/SPS010Report.pdf',
		frameBorder : '0',
		height : '600',
		width : '805',
	
		scrolling : 'auto',
		
  });

SPS010.spsEmpId = new Ext.form.TextField({
	id : 'spsEmpId',
	fieldLabel : "รหัสพนักงาน",


});
SPS010.spsNameEmp = new Ext.form.TextField({
	id : 'spsNameEmp',
	fieldLabel : "ชื่อพนักงาน",
	
});


SPS010.spscomboboxStoreDept = new Ext.data.JsonStore({
	baseParams : {
		method : 'spscomboboxStoreDept'
	},
	url : '/TransportationAllowance/SPS010.html',
	method : 'POST',
	storeId : 'bloodStore',
	root : 'records',
	idProperty : 'code',
	autoLoad : true,

	fields : [ {
		name : 'code'

	}, {
		name : 'description'
	} ],
	model : 'ForumThread',
	remoteSort : true
});

SPS010.spscreateComboboxDept = new Ext.form.ComboBox({
	id : 'spscreateComboboxDept',
	fieldLabel : 'ฝ่าย / แผนก',
	mode : 'local',
	width:200,
	store : SPS010.spscomboboxStoreDept,
	valueField : 'code',
	displayField : 'description',
	lazyRender : true,
	autoSelect : true,
	criterionField : true,
	selectOnFocus : true,
	typeAhead : true,
	forceSelection : true,
	triggerAction : 'all',
	emptyText : 'Select ...'

});


SPS010.spsComboboxCustomerStore = new Ext.data.JsonStore({
	baseParams : {
		method : 'spsComboboxCustomerStore'
	},
	url : '/TransportationAllowance/SPS010.html',
	method : 'POST',
	storeId : 'bloodStore',
	root : 'records',
	idProperty : 'code',
	autoLoad : true,

	fields : [ {
		name : 'code'

	}, {
		name : 'description'
	} ],
	model : 'ForumThread',
	remoteSort : true
});

SPS010.spsComboboxCustomer = new Ext.form.ComboBox({
	id : 'spsComboboxCustomer',
	fieldLabel : 'ลูกค้า',
	mode : 'local',
	store : SPS010.spsComboboxCustomerStore,
	valueField : 'code',
	displayField : 'description',
	lazyRender : true,
	autoSelect : true,
	criterionField : true,
	selectOnFocus : true,
	typeAhead : true,
	forceSelection : true,
	triggerAction : 'all',
	emptyText : 'Select ...'

});

SPS010.spsStartDate = new Ext.form.DateField({
	id : 'spsStartDate',
	fieldLabel : "ตั้งแต่",
	format : 'd/m/Y',
	width:200,
	maxValue : new Date(),


}),
SPS010.spsEndDate = new Ext.form.DateField({
	id : 'spsEndDate',
	fieldLabel : "ถึง",
	format : 'd/m/Y',
	width:200,
	maxValue : new Date(),


}),

SPS010.spsButtonSearch = new Ext.Button({
	id : 'spsButtonSearch',
	text : 'ค้นหา',
	// disabled:true,
	width : 100
});

SPS010.spsSetSearch = new Ext.form.FieldSet({
	 title: 'ค้นหา',
	collapsible:false,
	border:true,
	layout:'column',
	width:805,
	defaults:{
		xtype:'container',
		layout:'form',
		columnWidth:1
	},

	items:[{
		columnWidth : 0.5,
		items:SPS010.spsEmpId,
		labelAlign : 'right',
	},{
		columnWidth : 0.5,
		items:SPS010.spsNameEmp,
		labelAlign : 'right',
	},{
		columnWidth : 0.5,
		items:SPS010.spscreateComboboxDept,
		labelAlign : 'right',
	},{
		columnWidth : 0.5,
		items:SPS010.spsComboboxCustomer,
		labelAlign : 'right',
	},{
		columnWidth : 0.5,
		items:SPS010.spsStartDate,
		labelAlign : 'right',
	},{
		columnWidth : 0.5,
		items:SPS010.spsEndDate,
		labelAlign : 'right',
	},{
		columnWidth : 1,
		items:SPS010.spsButtonSearch,
		labelAlign : 'right',
		style : {
			
			"margin-top" : "30px",
			"margin-left" : "320px",
		},
	}
	]
});




Ext.onReady(function() {

	SPS010.spsResumeForm = new Ext.form.FormPanel({

		applyTo : "content",
		layout : 'column',
		border : false,
		width : '60%',
		style : {
			"margin-left" : "auto",
			"margin-right" : "auto",
			"margin-top" : "50px"
		},
		defaults : {
			xtype : 'container',
			layout : 'form',
			columnWidth : 1,
			// labelWidth : 0,
			anchor : '100%',

		// hideBorders : true
		},

		items : [ {
			columnWidth : 1,
			items : SPS010.spsSetSearch,
			
		},{
			columnWidth : 1,
			items : SPS010.spsIframe,
			
		}
		],

	});

//	SPS010.spsIframe.hide();
	
	//***************************** set Cookies *********************************//
/*	function setCookie(name, value, expires, path, domain, secure) {
		document.cookie= name + "=" + escape(value) +
		((expires) ? "; expires=" + expires.toGMTString() : "") +
		((path) ? "; path=" + path : "") +((domain) ? "; domain=" + domain : "") +((secure) ? "; secure" : "");
	}
		function getCookie(name) {
			var dc = document.cookie;
			var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
		if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
		} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
		if (end == -1) {
		end = dc.length;
	}
		return unescape(dc.substring(begin + prefix.length, end));
	}
	function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
	document.cookie = name + "=" +((path) ? "; path=" + path : "") +((domain) ? "; domain=" + domain : "") +"; expires=Thu, 01-Jan-70 00:00:01 GMT";
		}
	}*/
	// use 
//	var test = SPS010.spsEmpId.getValue();
//	setCookie("myCookie",test);
//	alert(getCookie("myCookie"));
//	deleteCookie("myCookie");
	spsparamSession = {};
Ext.get('spsButtonSearch').on('click',function(e) {
	if(Ext.isEmpty(SPS010.spsEmpId.getValue())){
		spsparamSession.spsEmpId = "%";
	}else{
	spsparamSession.spsEmpId = SPS010.spsEmpId.getValue();
	}
	if(Ext.isEmpty(SPS010.spsNameEmp.getValue())){
		spsparamSession.spsNameEmp = "%";
	}else{
	spsparamSession.spsNameEmp = SPS010.spsNameEmp.getValue();
	}
	if(Ext.isEmpty(SPS010.spscreateComboboxDept.getValue())){
		spsparamSession.spsCreateComboboxDept = "%";
	}else{
	spsparamSession.spsCreateComboboxDept = SPS010.spscreateComboboxDept.getValue();
	}
	if(Ext.isEmpty(SPS010.spsComboboxCustomer.getValue())){
		spsparamSession.spsComboboxCustomer = "%";
	}else{
	spsparamSession.spsComboboxCustomer = SPS010.spsComboboxCustomer.getValue();
	}
	if(Ext.isEmpty(SPS010.spsStartDate.getValue())){
		spsparamSession.spsStartDate = "%";
	}else{
	spsparamSession.spsStartDate = SPS010.spsStartDate.getValue();
	}
	if(Ext.isEmpty(SPS010.spsEndDate.getValue())){
		spsparamSession.spsEndDate ="%";
	}else{
	spsparamSession.spsEndDate = SPS010.spsEndDate.getValue();
	}
	spsparamSession.method = "spsparamSession";
	
	Ext.Ajax.request({
		url : '/TransportationAllowance/SPS010.html',
		params : spsparamSession,
		success : function(response, opts) {
			if (spsparamSession != null) {
//				Ext.Msg.alert('Information', 'ค้นหา');
				SPS010.spsIframe.setFrameSrc("about:blank");
				SPS010.spsIframe.setFrameSrc("/TransportationAllowance/SPS010Report.pdf");
			} else {
				Ext.Msg.alert('Information', 'Error');
			}
		},
		failure : function(response, opts) {
			Ext.Msg.alert('ERROR', 'Error.');
		}
	});
	
//	SPS010.spsIframe.show();
});
	
});