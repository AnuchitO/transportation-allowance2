var SVD006C = {};

SVD006C.labCompanyNameHeader = new Ext.form.Label({
	id : "labCompanyNameHeader",
	text : "บริษัท ซอฟสแควร์ 1999 จำกัด",
	style : {
		"font-size" : "150%",
		"font-align" : "center"
	},
	anchor : '93%'
});

SVD006C.labAddressHeader = new Ext.form.Label({
	id : "labAddressHeader",
	text : "51/597 หมุ่ 7 หมู่บ้านเมืองเอก ถ.พหลโยธิน ต.หลักหก  อ.เมืองปทุมธานี จ.ปทุมธานี  12000",
	style : {
		"font-size" : "90%",
		"font-align" : "center"
	},
	anchor : '93%'
});

SVD006C.labTellFaxHeader = new Ext.form.Label({
	id : "labTellFaxHeader",
	text : "โทร 0-2997-2000  โทรสาร 0-2997-2001",
	style : {
		"font-size" : "90%",
		"font-align" : "center"
	},
	anchor : '93%'
});

SVD006C.labTitle = new Ext.form.Label({
	id : "labTitle",
	text : " ใบเบิกค่าใช้จ่าย/ค่าเดินทาง/ใบรับเงิน",
	style : {
		"font-size" : "120%",
		"font-align" : "center"
	},
	anchor : '93%'
});

SVD006C.No = new Ext.form.TextField({
	id : 'noDoc',
	fieldLabel : "No",
	readOnly: true
});
SVD006C.date = new Ext.form.TextField({
	id : 'date',
	fieldLabel : "วันที่รับเอกสาร",
	readOnly: true
});

SVD006C.name = new Ext.form.TextField({
	id : 'name',
	fieldLabel : "ชื่อ - สกุล",
	readOnly: true
});

SVD006C.id = new Ext.form.TextField({
	id : 'id',
	fieldLabel : "รหัสพนักงาน",
	readOnly: true
});

SVD006C.company = new Ext.form.TextField({
	id : 'company',
	fieldLabel : "บริษัท",
	readOnly: true
});

// ฝ่าย/แผนก
SVD006C.comboboxStore = new Ext.data.JsonStore({
	baseParams : {
		method : 'antecedent'
	},
	url : '/TransportationAllowance/SCF003.html',
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

SVD006C.txtDepartment = new Ext.form.TextField({
	id : 'department',
	fieldLabel : "ฝ่าย / แผนก",
	width : 188,
	readOnly: true
});

SVD006C.idCardEmp = new Ext.form.TextField({
	id : 'idCardEmp',
	fieldLabel : "รหัสประจำตัวประชาชน",
	width : 250,
	readOnly: true
});

SVD006C.textArea = new Ext.ss.form.TextArea({
	fieldLabel : 'ที่อยู่',
	id : 'address',
	width : 600,
	bodyPadding : 10,
	readOnly: true
});

SVD006C.comboProvince = new Ext.form.TextField({
	fieldLabel : 'จังหวัด',
	id : 'province',
	width : 135,
	readOnly: true
});

SVD006C.phoneNumber = new Ext.form.TextField({
	id : 'phoneNumber',
	fieldLabel : "เบอร์โทร",
	width : 120,
	readOnly: true
});

SVD006C.email = new Ext.form.TextField({
	id : 'email',
	fieldLabel : "E-mail",
	width : 200,
	readOnly: true
});

// /////////////////////set Field/////////////////////////
SVD006C.No.setValue(SVD006Domain.no);
SVD006C.date.setValue(SVD006Domain.date);
SVD006C.name.setValue(SVD006Domain.name);
SVD006C.id.setValue(SVD006Domain.id);
SVD006C.company.setValue(SVD006Domain.company);
SVD006C.textArea.setValue(SVD006Domain.address);
SVD006C.phoneNumber.setValue(SVD006Domain.phone);
SVD006C.email.setValue(SVD006Domain.email);
SVD006C.txtDepartment.setValue(SVD006Domain.antecedent);
SVD006C.comboProvince.setValue(SVD006Domain.antercedentA);// /Province
SVD006C.idCardEmp.setValue(SVD006Domain.idCard);

SVD006C.gridColumns = [

		{
			header : 'No',
			dataIndex : 'no',
			align : 'center',
			width : 87.08,

		},
		{

			header : 'วันที่',
			dataIndex : 'gridDate',
			align : 'center',
			width : 87.08,

		},
		{
			header : 'ลูกค้า',
			dataIndex : 'customer',
			align : 'center',
			width : 87.08,

		},
		{

			header : 'จาก',
			dataIndex : 'region',
			align : 'center',
			id : 'region',
			width : 87.08,

		},
		{
			header : 'ถึง',
			dataIndex : 'goal',
			align : 'center',
			width : 87.08,

		}

		,
		{
			header : 'ค่าเดินทาง',
			dataIndex : 'paymentTravel',
			align : 'center',
			width : 87.08,

		},
		{
			header : 'ค่าทางด่วน',
			dataIndex : 'paymentD',
			align : 'center',
			width : 87.08
		}, {
			header : 'รวมเป็นเงิน',
			dataIndex : 'payment',
			align : 'center',
			width : 87.08,

		}, {
			header : 'หมายเหตุ',
			dataIndex : 'remark',
			align : 'center',
			width : 87.00,

		}

];

SVD006C.groupHeaderPlugins = new Ext.ux.plugins.GroupHeaderGrid({
	rows : [ [ {}, {}, {}, {
		header : "การเดินทาง",
		colspan : 2,
		align : 'center'
	}, {
		header : "ค่าใช้จ่าย",
		colspan : 2,
		align : 'center'
	}, {}, {} ] ],
});

SVD006C.gridStrore = new Ext.data.JsonStore({
	baseParams : {
		method : 'gridDataStore'
	},
	url : '/TransportationAllowance/SVD006.html',
	method : 'POST',
	pageSize : 10,
	storeId : 'gridStore',
	root : 'records',
	idProperty : 'code',
	autoLoad : true,

	fields : [ {
		name : 'check'
	}, {
		name : 'no'
	}, {
		name : 'gridDate'
	}, {
		name : 'customer'
	}, {
		name : 'region'
	}, {
		name : 'goal'
	}, {
		name : 'paymentTravel'
	}, {
		name : 'paymentD'
	}, {
		name : 'payment'
	}, {
		name : 'remark'
	} ],
	model : 'ForumThread',
	remoteSort : true
});

SVD006C.totalPayCharector = new Ext.form.TextField({
	id : 'totalPayCharector',
	fieldLabel : "จำนวนเงินเป็นตัวอักษร",
	width : 300,
	readOnly: true
});

SVD006C.document = new Ext.form.TextField({
	id : 'document',
	fieldLabel : "เอกสารแนบ",
	width : 120,
	readOnly: true
});

SVD006C.forPay = new Ext.form.TextField({
	id : 'forPay',
	fieldLabel : "ใบ เพื่อชำระ",
	width : 400,
	readOnly: true
});

SVD006C.bank = new Ext.form.TextField({
	id : 'bank',
	fieldLabel : "บัญชีธนาคาร",
	width : 120,
	readOnly: true
});

SVD006C.branch = new Ext.form.TextField({
	id : 'branch',
	fieldLabel : "สาขา",
	width : 240,
	readOnly: true
});

SVD006C.accountNumber = new Ext.form.TextField({
	id : 'accountNumber',
	fieldLabel : "เลขที่บัญชี",
	width : 240,
	readOnly: true
});

SVD006C.typeAccount = new Ext.form.TextField({
	id : 'typeAccount',
	fieldLabel : "ประเภทบัญชี",
	width : 240,
	readOnly: true
});

SVD006C.textLabel = new Ext.form.Label({
	fieldLabel : "ได้รับ"
});

SVD006C.checkBoxPayTypeCash = new Ext.form.Checkbox({
	id : 'payCash',
	name : 'name',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'เงินสด',
	fieldLabel : 'text'
});

SVD006C.checkBoxPayTypeCheck = new Ext.form.Checkbox({
	id : 'payCheck',
	name : 'name',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'เช็คธนาคาร',
	fieldLabel : 'text'
});


SVD006C.btnConfirm = new Ext.Button({
	id : 'idBtnConfirm',
	text : 'ยืนยัน',
	width : 110
});


SVD006C.btnCreatePay = new Ext.Button({
	id : 'idBtnCreatePay',
	text : 'สร้างใบสำคัญจ่าย',
	width : 110
});
SVD006C.btnBackHome =  new Ext.Button({
	id : 'idBtnHome',
	text : 'กลับสู่หน้าหลัก',
	width : 110
});
//SVD006C.btnBackHome 
// ////// Group Approve Check box
SVD006C.checkBoxApprove = new Ext.form.Checkbox({
	id : 'approve',
	name : 'chkApprove',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'Approve',
	fieldLabel : 'text'
});

SVD006C.checkBoxRefused = new Ext.form.Checkbox({
	id : 'refused',
	name : 'chkApprove',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'Refused',
	fieldLabel : 'text'
});

SVD006C.checkBoxCancel = new Ext.form.Checkbox({
	id : 'cancel',
	name : 'chkApprove',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'Cancel',
	fieldLabel : 'text'
});

SVD006C.txtReson = new Ext.ss.form.TextArea({
	fieldLabel : 'สาเหตุ',
	id : 'idReson',
	width : 250,
	bodyPadding : 0

});



// ******************** set Value *****************//
SVD006C.forPay.setValue(SVD006Domain.forPay);
SVD006C.document.setValue(SVD006Domain.document);
SVD006C.bank.setValue(SVD006Domain.bank);
SVD006C.branch.setValue(SVD006Domain.branch);
SVD006C.accountNumber.setValue(SVD006Domain.accountNumber);
SVD006C.typeAccount.setValue(SVD006Domain.typeAccount);

SVD006C.totalPayExpresses = new Ext.form.TextField({
	id : 'totalPayExpresses',
	width : 80,
	readOnly: true
});

SVD006C.totalPayMotorWay = new Ext.form.TextField({
	id : 'totalPayMotorWay',
	width : 80,
	readOnly: true
});

SVD006C.totalPayAll = new Ext.form.TextField({
	id : 'totalPayAll',
	width : 80,
	readOnly: true
});

// //////////////////////Begin Debug Start//////////////////
SVD006C.createGrid = new Ext.ss.grid.EditorGridPanel({
	id : 'gridDataForPayList',
	store : SVD006C.gridStrore,
	columns : SVD006C.gridColumns,
	columnLines : true,
	height : 350,
	width : 786,

	lazyRender : true,
	autoSelect : true,
	criterionField : true,
	selectOnFocus : true,
	typeAhead : true,
	forceSelection : true,
	triggerAction : 'all',
	trackMouseOver : false,
	disableSelection : true,
	loadMask : true,

	plugins : [ SVD006C.groupHeaderPlugins ],
	clicksToEdit : 1,
	bbar : new Ext.PagingToolbar({
		pageSize : 25,
		store : SVD006C.gridStrore,
		displayInfo : true,
		displayMsg : ' {0} - {1} of {2}',
		emptyMsg : "Report of Travel",
		items : [ '-', {
			pressed : true,
			enableToggle : true,
			text : 'Show Preview',
			cls : 'x-btn-text-icon details',
			toggleHandler : function(btn, pressed) {
				var view = SVD006C.createGrid.getView();
				view.showPreview = pressed;
				view.refresh();

			}
		}, '-', "รวม", '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
				'-', SVD006C.totalPayExpresses, '-', SVD006C.totalPayMotorWay,
				'-', SVD006C.totalPayAll ]
	})
});

SVD006C.totalPayExpresses.setValue(SVD006Domain.totalPayExpresses);
SVD006C.totalPayMotorWay.setValue(SVD006Domain.totalPayMotorWay);
SVD006C.totalPayAll.setValue(SVD006Domain.totalPayAll);
SVD006C.totalPayCharector.setValue(SVD006Domain.totalPayCharector);

// //Field Set on tab ใบเบิกเงิน
// /Fiels Set Grid
SVD006C.fieldSetGrid = new Ext.form.FieldSet({
	collapsible : false,
	title : 'รายละเอียดการเดินทาง',
	border : false,
	layout : 'column',
	width : 827,
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [ {
		items : SVD006C.createGrid
	} ]
});

// field set Information
SVD006C.fieldSetInformation = new Ext.form.FieldSet({
	collapsible : false,
	border : false,
	layout : 'column',
	width : 827,
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [{
				items : SVD006C.labCompanyNameHeader
			},{
				items : SVD006C.labAddressHeader
			},{
				items : SVD006C.labTellFaxHeader
			},{
				items : new Ext.form.Label({
					id : "labTop",
					text : " a",
					style : {
						"font-size" : "100%",
						"font-align" : "center",
						"padding-left" : "0px",
						"position" : "relative",
						"left" : "-30px",
						"top" : "0px"
					},
					anchor : '93%'
				})
			},{
				items : SVD006C.labTitle,
				labelAlign : 'right',
				style : {					
					"padding-left" : "10px",
					"position" : "relative",
					"left" : "280px",
					"top" : "0px"
				}
			},{
				items : new Ext.form.Label({
					id : "labUnder",
					text : " a",
					style : {
						"font-size" : "100%",
						"font-align" : "center",
						"padding-left" : "0px",
						"position" : "relative",
						"left" : "-30px",
						"top" : "0px"
					},
					anchor : '93%'
				})
			},{
				items : SVD006C.No,
				labelAlign : 'right',
				style : {
					"margin-left" : "530px"
				}
			},{
				columnWidth : 1,
				items : SVD006C.date,
				labelAlign : 'right',
				style : {
					"margin-left" : "530px"
				}
			},{
				columnWidth : 0.5,
				items : SVD006C.name,
				labelAlign : 'right'
			},{
				columnWidth : 0.5,
				items : SVD006C.id,
				labelAlign : 'right'
		
			},{
				columnWidth : 0.5,
				items : SVD006C.company,
				labelAlign : 'right'
			},{
				columnWidth : 0.5,
				items : SVD006C.txtDepartment,
				labelAlign : 'right'
			},{
				columnWidth : 1,
				items : SVD006C.idCardEmp,
				labelAlign : 'right'
			},{
				columnWidth : 1,
				items : SVD006C.textArea,
				labelAlign : 'right'
			},{
				columnWidth : 0.3,
				items : SVD006C.comboProvince,
				labelAlign : 'right'
			},{
				columnWidth : 0.3,
				items : SVD006C.phoneNumber,
				labelAlign : 'right'
			},{
				columnWidth : 0.4,
				items : SVD006C.email,
				labelAlign : 'right'
			}]
});

// Field Set Approving
SVD006C.fieldSetApproving = new Ext.form.FieldSet({
	collapsible : false,
	title : 'พิจารณา',
	border : true,
	layout : 'column',
	width : 400,
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [ {
		items : SVD006C.checkBoxApprove
	}, {
		items : SVD006C.checkBoxRefused
	}, {
		items : SVD006C.checkBoxCancel
	}, {
		items : SVD006C.txtReson,
		labelAlign : 'right',
		style : {
			"margin-left" : "0px",
			"padding-left" : "0px",
			"position" : "relative",
			"left" : "-30px",
			"top" : "0px"
		}
	} ]
});
// /Field Set Grid
SVD006C.feildSetBottom = new Ext.form.FieldSet({
	collapsible : false,
	border : false,
	width : 827,
	layout : 'column',
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [ {
		columnWidth : 1,
		items : SVD006C.totalPayCharector,
		labelAlign : 'right',
		style : {
			"margin-left" : "330px",
		}
	}, {
		columnWidth : 0.3,
		items : SVD006C.document,
		labelAlign : 'right'
	}, {
		columnWidth : 0.7,
		items : SVD006C.forPay,

	}, {
		columnWidth : 0.5,
		items : SVD006C.bank,
		labelAlign : 'right'
	}, {
		columnWidth : 0.5,
		items : SVD006C.branch,
		labelAlign : 'right'
	}, {
		columnWidth : 0.5,
		items : SVD006C.accountNumber,
		labelAlign : 'right'
	}, {
		columnWidth : 0.5,
		items : SVD006C.typeAccount,
		labelAlign : 'right'
	}, {
		columnWidth : 0.15,
		items : SVD006C.textLabel,
		labelAlign : 'right'

	}, {
		columnWidth : 0.1,
		items : SVD006C.checkBoxPayTypeCash,

	}, {
		columnWidth : 0.75,
		items : SVD006C.checkBoxPayTypeCheck,

	}, {
		items : SVD006C.fieldSetApproving,
		style : {
			"margin-left" : "0px",
			"position" : "relative",
			"left" : "200px",
			"top" : "0px"
		}
	},{
		items : SVD006C.btnConfirm,
		style : {
			"margin-left" : "0px",
			"position" : "relative",
			"left" : "350px",
			"top" : "0px"
		}
	}, {
		columnWidth : 0.15,
		items : SVD006C.btnCreatePay,
		style : {
			"margin-left" : "0px",
			"position" : "relative",
			"left" : "280px",
			"top" : "10px"
		}
	}, {
		columnWidth : 0.15,
		items : SVD006C.btnBackHome,
		style : {
			"margin-left" : "0px",
			"position" : "relative",
			"left" : "305px",
			"top" : "10px"
		}
	},{
		
		items: new Ext.form.TextField({
			id : 'temp',
			width : 80,
		}),
		style : {
			"margin-left" : "0px",
			"position" : "relative",
			"left" : "-305px",
			"top" : "10px"
		} 
	} ]
});

SVD006C.tabPanelSVD006 = new Ext.Panel({
	autoWidth : true,
	autoHeight : true,
	border : false,
	hideBorders : true,
	layout : 'column',
	items : [ {
		items : SVD006C.fieldSetInformation
	}, {
		items : SVD006C.fieldSetGrid
	}, {
		items : SVD006C.feildSetBottom
	} ]
});



// /////// Tab Panel //////
SVD006C.tabPanel = new Ext.TabPanel({
	autoHeight : true,
	autoWidth : true,
	activeTab : 0,
	padding : 5,
	border : true,
	style : {
		"margin-left" : "auto",
		"margin-right" : "auto",
		"margin-top" : "auto",
		"padding-top" : "auto"
	},
	items : [ {
		title : 'ใบเบิกเงิน',
		items : SVD006C.tabPanelSVD006
	}, {
		title : 'ใบสำคัญจ่าย',
		items : SCP007C.tabPanelSCP007C,
//		disabled : true
	} ]
});

