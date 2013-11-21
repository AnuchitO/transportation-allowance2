SPS010 = {};
SPS010.spsIframe = new Ext.fission.IFrameComponent({
  
	frameSrc : '/TransportationAllowance/SPS010Report.pdf',
		frameBorder : '0',
		height : '600',
		width : '805',
	
		scrolling : 'auto',
		
  });

SPS010.spsEmpId = new Ext.form.TextField({
	id : 'spsEmpId',
	fieldLabel : "รหัสพนักงาน",
	readOnly : true,
	disabled : true,
//	style:{
//		"color":"black",
//	    "background-image":"none",
//	    "background-color":"#BEBEBE"
//	}

});
SPS010.spsNameEmp = new Ext.form.TextField({
	id : 'spsNameEmp',
	fieldLabel : "ชื่อพนักงาน",
	readOnly : true,
	disabled : true,
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
	fieldLabel : 'สถานะ',
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

	SPS010.spsIframe.hide();
	
Ext.get('spsButtonSearch').on('click',function(e) {
		
	SPS010.spsIframe.show();
});
	
});