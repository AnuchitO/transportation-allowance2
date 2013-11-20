var SCP007C = {};

SCP007C.scpLabelCompany = new Ext.form.Label({
	id : "scpLabelCompany",
//	text : "บริษัท ซอฟสแควร์ 1999 จำกัด",
	style : {
		"font-size" : "200%",
		"font-align" : "center"

	},
	anchor : '93%'

});

SCP007C.scpLabelTitle = new Ext.form.Label({
	id : "scpLabelTitle",
	text : "ใบสำคัญจ่าย",
	style : {
		"font-size" : "150%",

	},
	anchor : '93%'

});

SCP007C.scpNumber = new Ext.form.TextField({
	id : 'scpNumber',
	fieldLabel : "เลขที่",
	width : 100

});
SCP007C.scpDate = new Ext.form.DateField({
	id : 'scpDate',
	fieldLabel : "วันที่เอกสาร",
	name : 'startdt',
	vtype : 'daterange',
	format : 'd/m/Y',
	endDateField : 'enddt', // id of the end date field
	maxValue : new Date(),
	style:{
		"color":"blue",
	    "background-image":"none",
	    "background-color":"#FFFACD"
	},
	listeners : {
		render : function(datefield) {
			// / code to convert GMT String to date object
			datefield.setValue(new Date());
		}
	}

}),
// ************************** Set Label Header *************//
SCP007C.scpLabel = new Ext.form.Label({
	text : "หน่วยงาน:",
	style : {
		"font-size" : "85%",

	},

	anchor : '93%'
});
SCP007C.scpLabel1 = new Ext.form.Label({
	text : "สำนักงานใหญ่",
	style : {
		"font-size" : "85%",

	},
	anchor : '93%'

});
SCP007C.scpLabel2 = new Ext.form.Label({
	text : "ฝ่าย :",
	style : {
		"font-size" : "85%",

	},
	anchor : '93%',

});
SCP007C.scpLabel3 = new Ext.form.Label({
	id : "scpLabel3",
	text : "Admin",
	// labelStyle: 'font-weight:bold;',
	style : {
		"font-size" : "85%",

	},
	anchor : '93%'

});

// ****************** end Set Label *********************//
SCP007C.scpForPayGive = new Ext.form.TextField({
	id : 'scpForPayGive',
	fieldLabel : "จ่ายให้",
	width : 400,
	readOnly : true,
	disabled : true,
	style:{
		"color":"blue",
	    "background-image":"none",
	    "background-color":"#FFFACD"
	},

});

SCP007C.scpTypeForpay0 = new Ext.form.Label({
	fieldLabel : "ได้รับ"
});

SCP007C.scpTypeForpay1 = new Ext.form.Checkbox({
	id : 'scpTypeForpay1',
	name : 'scpTypeForpay1',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'เงินสด',
	fieldLabel : 'text',
		handler : function() {
			Ext.getDom('scpTypeForpay2').checked = false;
		}
});

SCP007C.scpTypeForpay2 = new Ext.form.Checkbox({
	id : 'scpTypeForpay2',
	name : 'scpTypeForpay2',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'เช็ค',
	fieldLabel : 'text',
	handler : function() {
		Ext.getDom('scpTypeForpay1').checked = false;
	}
	
});

SCP007C.scpBank = new Ext.form.TextField({
	id : 'scpBank',
	fieldLabel : "ธนาคาร",
	width : 200,
	readOnly : true,
	disabled : true,
	style:{
		"color":"blue",
	    "background-image":"none",
	    "background-color":"#FFFACD"
	},

});

SCP007C.scpBranch = new Ext.form.TextField({
	id : 'scpBranch',
	fieldLabel : "สาขา",
	width : 200,
	readOnly : true,
	disabled : true,
	style:{
		"color":"blue",
	    "background-image":"none",
	    "background-color":"#FFFACD"
	},

});

SCP007C.scpNumberCheck = new Ext.form.TextField({
	id : 'scpNumberCheck',
	fieldLabel : "เลขที่ใบเช็ค",
	width : 200

});

SCP007C.scpDateCreation = new Ext.form.DateField({
	id : 'scpDateCreation',
	fieldLabel : "ลงวันที่",
	name : 'startdt',
	vtype : 'daterange',
	format : 'd/m/Y',
	endDateField : 'enddt', // id of the end date field
	maxValue : new Date(),
	style:{
		"color":"blue",
	    "background-image":"none",
	    "background-color":"#FFFACD"
	},
	listeners : {
		render : function(datefield) {
			// / code to convert GMT String to date object
			datefield.setValue(new Date());
		}
	}

}),

SCP007C.scpLabelDetail = new Ext.form.Label({
	text : "รายละเอียด",
	style : {
		"font-size" : "85%",

	},
	// labelStyle: 'font-weight:bold;',
	anchor : '93%',
	

});

SCP007C.scfTextArea = new Ext.ss.form.TextArea({
	id : 'scfTextArea',
	width : 680,
	allowBlank : false,
	bodyPadding : 10,
	readOnly : true,
	disabled : true,
	style:{
		"color":"blue",
	    "background-image":"none",
	    "background-color":"#FFFACD"
	},

});

SCP007C.scpNumberCharactor = new Ext.form.TextField({
	id : 'scpNumberCharactor',
	fieldLabel : "จำนวนตัวอักษร",
	width : 330,
	readOnly : true,
	disabled : true,
	style:{
		"color":"blue",
	    "background-image":"none",
	    "background-color":"#FFFACD"
	},

});

SCP007C.scpTotalMoney = new Ext.ss.form.NumberField({
	id : 'scpTotalMoney',
	fieldLabel : "จำนวนเงิน",
	width : 120,
	readOnly : true,
	disabled : true,
	style:{
		"color":"blue",
	    "background-image":"none",
	    "background-color":"#FFFACD"
	},

});
// ********************************** set value **********************//

// ******************************* complete ********************//
SCP007C.gridAddBtn = new Ext.Toolbar.Button({
	// text:RMP001AButton.Add,
	tooltip : 'Add a new item',
	iconCls : 'add',
	// disabled : false,
	privilage : "educationAddBtn",
	handler : function() {
		SCP007C.createGrid.getSelectionModel().selectAll();

		var sm = SCP007C.createGrid.getSelectionModel().getSelections();

		Ext.getCmp('scpgridEducationInfomation').addRow();

		var i = 1 + sm.length - 1;
		var uu = SCP007C.createGrid.getStore().getAt(i).data.no;
//		Ext.getCmp('editNo').setValue(i + 1);
		SCP007C.createGrid.store.getAt(i).set('scpNo',i + 1);
		for (var j = 0; j <= sm.length - 1; j++) {

			SCP007C.createGrid.getSelectionModel().deselectRow(j);
		}
	}
	
	//////////////////////////////////

});

SCP007C.gridRemoveBtn = new Ext.Toolbar.Button({
	
	tooltip : 'Remove the selected item',
	iconCls : 'remove',
	disabled : false,
	handler : function() {
		var rowSelected = Ext.getCmp('scpgridEducationInfomation')
				.getSelectionModel().getSelections();
		if (!Ext.isEmpty(rowSelected)) {
			Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {
				if (btn == 'yes') {
					
					SCP007C.createGrid.getSelectionModel().selectAll();

					var smfirst = SCP007C.createGrid.getSelectionModel().getSelections();
		
					var lastIndexfirst = smfirst.length - 1;
					var getValueLastIndexfirst = SCP007C.createGrid.getStore().getAt(lastIndexfirst).data.scpNo;
					for ( var i in rowSelected) {

						Ext.getCmp('scpgridEducationInfomation').store
								.remove(rowSelected[i]);

					}
					SCP007C.createGrid.getSelectionModel().selectAll();

					var sm = SCP007C.createGrid.getSelectionModel().getSelections();
					//					
					var numberSelect = rowSelected.length;

					var lastIndex = sm.length - 1;
					if(lastIndex == -1){
						SCP007C.scfTatolDebit.setValue(0.00);
						SCP007C.scfTatolCredit.setValue(0.00);
					}
					SCP007C.createGrid.store.getAt(lastIndex).set('scpNo', getValueLastIndexfirst);

					var getValueLastIndex = SCP007C.createGrid.getStore().getAt(
							lastIndex).data.scpNo;

					var u = getValueLastIndex - numberSelect;

					SCP007C.createGrid.store.getAt(lastIndex).set('scpNo', u);
					for (var j = lastIndex; j >= 0; j--) {
						if (j == lastIndex) {

						}
						
						detroyNumber = u - j;
						if(detroyNumber == 0){
							SCP007C.createGrid.store.getAt(lastIndex - j).set('scpNo',
									detroyNumber+1);
						}
						else{
							SCP007C.createGrid.store.getAt(lastIndex - j).set('scpNo',
								detroyNumber);
						}
					}
					SCP007C.createGrid.store.getAt(0).set('scpNo',1);

					for (var j = 0; j <= sm.length - 1; j++) {

						SCP007C.createGrid.getSelectionModel().deselectRow(j);
					}

				}
			});
		} else {
			Ext.Msg.alert('Warning', 'กรุณาเลือกข้อมูลที่จะลบ');
		}

	}
	
});

//******************** save function ***********************************//
var scpParam = {};
function scpSaveOrUpdate() {
	scpParam.scpNoDoc = Ext.getCmp('noDoc').getValue();
	scpParam.scpDate = Ext.getCmp('scpDate').getValue();
	scpParam.scpNumber = Ext.getCmp('scpNumber').getValue();
	scpParam.scpLabel3 = Ext.getCmp('scpLabel3').text;
	scpParam.scpDateCreation = Ext.getCmp('scpDateCreation').getValue();
	scpParam.scfTatolDebit = Ext.getCmp('scfTatolDebit').value;
	scpParam.scfTatolCredit = Ext.getCmp('scfTatolCredit').value;
	
	//**************************** get Value in Grid ******************************//
	
	SCP007C.createGrid.getSelectionModel().selectAll();

	var selectModel = SCP007C.createGrid.getSelectionModel().getSelections();
	scpParam.scpPack = "";
	
	for (var i = 0; i <= selectModel.length - 1; i++) {
		var scpDataGridNo = SCP007C.createGrid.getStore().getAt(i).data.scpNo;
		var scpDataGridIdAccount = SCP007C.createGrid.getStore().getAt(i).data.scpIdAccount;
		var scpDataGridNameAccount = SCP007C.createGrid.getStore().getAt(i).data.scpNameAccount;
		var scpDataGridIdDept = SCP007C.createGrid.getStore().getAt(i).data.scpIdDept;
		var scpDataGridDebit = SCP007C.createGrid.getStore().getAt(i).data.scpDebit;
		var scpDataGridDebitDouble = scpDataGridDebit.toFixed(2);
		var scpDateGridCredit = SCP007C.createGrid.getStore().getAt(i).data.scpCredit;
		var scpDateGridCreditDouble = scpDateGridCredit.toFixed(2);
		
		SCP007C.createGrid.getSelectionModel().deselectRow(i);
		scpParam.scpPack += scpDataGridNo + "," + scpDataGridIdAccount + "," + scpDataGridNameAccount
				+ "," + scpDataGridIdDept + "," + scpDataGridDebitDouble + ","
				+ scpDateGridCreditDouble + "!";
	}
	
	//*****************************************************************************//

	scpParam.method = "scpSave";
	Ext.Ajax.request({
		url : '/TransportationAllowance/SVD006.html',
		params : scpParam,
		success : function(response, opts) {
			if (scpParam != null) {
				Ext.Msg.alert('Information', 'บันทึกเรียบร้อย');
				
			} else {
				Ext.Msg.alert('Information', 'Error');
			}
		},
		failure : function(response, opts) {
			Ext.Msg.alert('ERROR', 'Error.');
		}
	});
}

//**********************************************************************//

SCP007C.gridSaveBtn = new Ext.Toolbar.Button(
		{
			tooltip : 'Save',
			iconCls : 'save',
			disabled : false,
			handler : function() {
				Ext.MessageBox
						.confirm(
								'Confirmation',
								'ยืนยันข้อมูลถูกต้อง ? <br/>เอกสารของคุณจะอยู่ในสถานะ \"บันทึก\"',
								confirmFunction);
				function confirmFunction(btn) {
					if (btn == 'yes') {

						
						scpSaveOrUpdate();

					}
				}
			}

		});

SCP007C.comboboxStore = new Ext.data.JsonStore({
	baseParams : {
		method : 'scpNumberAccountAdmin'
	},
	url : '/TransportationAllowance/SVD006.html',
	method : 'POST',
	storeId : 'bloodStore',
	root : 'records',
	idProperty : 'code',
	autoLoad : true,
	// fieldLabel : 'comboStrore',
	fields : [ {
		name : 'code'

	}, {
		name : 'description'
	} ],
	model : 'ForumThread',
	remoteSort : true
});





SCP007C.createCombobox = new Ext.form.ComboBox({
	id : 'antecedent1',
	fieldLabel : 'Antecedent',
	mode : 'local1',
	width:70,


	store : SCP007C.comboboxStore,
	valueField : 'code',
	displayField : 'code',
	lazyRender : true,
	autoSelect : true,
	criterionField : true,
	selectOnFocus : true,
	typeAhead : true,
	forceSelection : true,
	triggerAction : 'all',
	emptyText : 'Select ...',
	
	

//	displayField : 'description'

		 listeners: {
			    select: function(combo, record, index) {
			    	SCP007C.createGrid.getSelectionModel().selectAll();

					var sm = SCP007C.createGrid.getSelectionModel().getSelections();
					//					

					var lastIndex = sm.length - 1;

					SCP007C.createGrid.store.getAt(lastIndex).set('scpNameAccount',record.json.description);
					for (var j = 0; j <= sm.length - 1; j++) {

						SCP007C.createGrid.getSelectionModel().deselectRow(j);
					}
//			      SCP007C.scpForPayGive.setValue(record.json.description);
			    }
			  }	
	});
SCP007C.checkboxselection = new Ext.grid.CheckboxSelectionModel({
	singleSelect : false,

// email: true,
// dataIndex: 'chkFlag'
});

function changeNumberPrecisionscpDebit(){
	SCP007C.createGrid.getSelectionModel().selectAll();

	var sm = SCP007C.createGrid.getSelectionModel().getSelections();


	var valueSet = 0;
	var lastIndex = sm.length - 1;
	var check = SCP007C.createGrid.getStore().getAt(lastIndex).data.scpDebit.toFixed(2);
	check = check.split(".");
	
	if(check[1] < 25 ){
		check[1]= 00;
		valueSet= check[0]+ "." + check[1];
		SCP007C.createGrid.store.getAt(lastIndex).set('scpDebit', valueSet);
		}
	else if(check[1] >= 25 && check[1] < 50){
		check[1]= 25;
		valueSet= check[0]+ "." + check[1];
		SCP007C.createGrid.store.getAt(lastIndex).set('scpDebit', valueSet);
		}
	else if(check[1] >=50 && check[1] < 75 ){
		check[1]= 50;
		valueSet= check[0]+ "." + check[1];
		SCP007C.createGrid.store.getAt(lastIndex).set('scpDebit', valueSet);
		}
	else if(check[1] >=75 && check[1] < 100 ){
		check[1]= 75;
		valueSet= check[0]+ "." + check[1];
		SCP007C.createGrid.store.getAt(lastIndex).set('scpDebit', valueSet);
		}
	else{
		check[1]= 00;
		valueSet= check[0]+ "." + check[1];
		SCP007C.createGrid.store.getAt(lastIndex).set('scpDebit', valueSet);
		}
}


function changeNumberPrecisionscpCredit(){
	SCP007C.createGrid.getSelectionModel().selectAll();

	var sm = SCP007C.createGrid.getSelectionModel().getSelections();


	var valueSet = 0;
	var lastIndex = sm.length - 1;
	var check = SCP007C.createGrid.getStore().getAt(lastIndex).data.scpCredit.toFixed(2);
	check = check.split(".");
	
	if(check[1] < 25 ){
		check[1]= 00;
		valueSet= check[0]+ "." + check[1];
		SCP007C.createGrid.store.getAt(lastIndex).set('scpCredit', valueSet);
		}
	else if(check[1] >= 25 && check[1] < 50){
		check[1]= 25;
		valueSet= check[0]+ "." + check[1];
		SCP007C.createGrid.store.getAt(lastIndex).set('scpCredit', valueSet);
		}
	else if(check[1] >=50 && check[1] < 75 ){
		check[1]= 50;
		valueSet= check[0]+ "." + check[1];
		SCP007C.createGrid.store.getAt(lastIndex).set('scpCredit', valueSet);
		}
	else if(check[1] >=75 && check[1] < 100 ){
		check[1]= 75;
		valueSet= check[0]+ "." + check[1];
		SCP007C.createGrid.store.getAt(lastIndex).set('scpCredit', valueSet);
		}
	else{
		check[1]= 00;
		valueSet= check[0]+ "." + check[1];
		SCP007C.createGrid.store.getAt(lastIndex).set('scpCredit', valueSet);
		}
}

SCP007C.gridColumns = [ SCP007C.checkboxselection, {

	header : 'ลำดับ',
	dataIndex : 'scpNo',
	align : 'center',
	width : 125,

}, {

	header : 'รหัสบัญชี',
	dataIndex : 'scpIdAccount',
	align : 'center',
	editor:SCP007C.createCombobox,
	width : 125,

}, {
	header : 'ชื่อบัญชี',
	dataIndex : 'scpNameAccount',
	align : 'center',
	width : 125,

}, {

	header : 'รหัสฝ่าย',
	dataIndex : 'scpIdDept',
	align : 'center',
	id : 'region',
	editor : new Ext.form.TextField({
		id : 'scpEditIdDept',
	}),
	width : 125,

}, {
	header : 'เดบิต',
	dataIndex : 'scpDebit',
	align : 'center',
	xtype: 'numbercolumn', format:'0,000.00',
	editor : new Ext.ss.form.NumberField({
		id : 'scpEditDebit',
		listeners : {
			change : function(f, e) {
				SCP007C.createGrid.getSelectionModel().selectAll();
				var totalLength = SCP007C.createGrid.getSelectionModel().getSelections();
				var totalDebit = 0;
				var totalCredit = 0;
				changeNumberPrecisionscpDebit();
			
				for (var i = 0; i <= totalLength.length - 1; i++) {
					var test = SCP007C.createGrid.getStore().getAt(i).data.scpDebit;
				
			if (Ext.isEmpty(test)) {
				SCP007C.createGrid.store.getAt(i).set('scpDebit', 0.00);
			}
			if (Ext.isEmpty(SCP007C.createGrid.getStore().getAt(i).data.scpCredit)) {
				SCP007C.createGrid.store.getAt(i).set('scpCredit', 0.00);
			}
				 totalDebit = totalDebit + parseFloat(SCP007C.createGrid.getStore().getAt(i).data.scpDebit);
				 
				 SCP007C.scfTatolDebit.setValue(totalDebit);
				 
				 totalCredit = totalCredit + parseFloat(SCP007C.createGrid.getStore().getAt(i).data.scpCredit);
				 
				 SCP007C.scfTatolCredit.setValue(totalCredit);
				 
				 SCP007C.createGrid.getSelectionModel()
					.deselectRow(i);
				 

					
				}
			}
		}
	}),
	

	width : 125,

}, {
	header : 'เครดิต',
	dataIndex : 'scpCredit',
	align : 'center',
	xtype: 'numbercolumn', format:'0,000.00',
	editor : new Ext.ss.form.NumberField({
		id : 'scpEditCredit',
		listeners : {
			change : function(f, e) {
				SCP007C.createGrid.getSelectionModel().selectAll();
				var totalLength = SCP007C.createGrid.getSelectionModel().getSelections();
				var totalCredit = 0;
				var totalDebit = 0;
				changeNumberPrecisionscpCredit();
				for (var i = 0; i <= totalLength.length - 1; i++) {
					var test = SCP007C.createGrid.getStore().getAt(i).data.scpCredit;
				
			if (Ext.isEmpty(test)) {
				SCP007C.createGrid.store.getAt(i).set('scpCredit', 0.00);
			}	
			if (Ext.isEmpty(SCP007C.createGrid.getStore().getAt(i).data.scpDebit)) {
				SCP007C.createGrid.store.getAt(i).set('scpDebit', 0.00);
			}
			totalCredit = totalCredit + parseFloat(SCP007C.createGrid.getStore().getAt(i).data.scpCredit);
				 
				 SCP007C.scfTatolCredit.setValue(totalCredit);
				 
				 totalDebit = totalDebit + parseFloat(SCP007C.createGrid.getStore().getAt(i).data.scpDebit);
				 
				 SCP007C.scfTatolDebit.setValue(totalDebit);
				 
				 SCP007C.createGrid.getSelectionModel()
					.deselectRow(i);
				 

					
				}
			}
		}
	}),

	width : 125,

}

];

SCP007C.gridStrore = new Ext.data.JsonStore({
	// baseParams : {
	// method : 'gridData'
	// },
	// url : '/TransportationAllowance/SCF003.html',
	// method : 'POST',
	pageSize : 10,
	storeId : 'gridStore',
	root : 'records',
	idProperty : 'code',
	// autoLoad : true,

	fields : [ {
		name : 'scpNo'
	}, {
		name : 'scpIdAccount'
	}, {
		name : 'scpNameAccount'
	}, {
		name : 'scpIdDept'
	}, {
		name : 'scpDebit'
	}, {
		name : 'scpCredit'
	} ],
	model : 'ForumThread',
	remoteSort : true

});

SCP007C.scfTatolDebit = new Ext.ss.form.NumberField({
	id : 'scfTatolDebit',
	width : 80

});
SCP007C.scfTatolCredit = new Ext.ss.form.NumberField({
	id : 'scfTatolCredit',

	width : 80

});
// *********************** Grid ***********************************//

SCP007C.createGrid = new Ext.ss.grid.EditorGridPanel({
	id : 'scpgridEducationInfomation',
	store : SCP007C.gridStrore,
	sm : SCP007C.checkboxselection,
	columns : SCP007C.gridColumns,
	columnLines : true,
	height : 200,
	width : 770,

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

	clicksToEdit : 1,
	tbar : [ SCP007C.gridAddBtn, '-', SCP007C.gridRemoveBtn, '-',
			SCP007C.gridSaveBtn ],
	bbar : new Ext.PagingToolbar({
		pageSize : 25,
		store : SCP007C.gridStrore,
		displayInfo : true,
		displayMsg : ' {0} - {1} of {2}',
		// emptyMsg : "Report of Travel",
		items : [ '-', {
			pressed : true,
			enableToggle : true,
			text : 'Show Preview',
			cls : 'x-btn-text-icon details',
			toggleHandler : function(btn, pressed) {
				var view = SCP007C.createGrid.getView();
				view.showPreview = pressed;
				view.refresh();

			}
		}, '-', "รวมยอดเงินทั้งสิ้น", '-', '-', '-', '-', '-', '-', '-', '-',
				'-', '-', '-', '-', '-', '-', '-', '-', SCP007C.scfTatolDebit,
				'-', '-', '-', SCP007C.scfTatolCredit, '-','-', '-', '-', '-', '-', '-', '-', '-', ]
	})
});
SCP007C.scpButtonPrint = new Ext.Button({
	id : 'scpButtonSubmit',
	text : 'Print',
	width : 100
});
SCP007C.scpButtonBack = new Ext.Button({
	id : 'scpButtonBack',
	text : 'Back',
	width : 100,
	handler : function() {
		SVD006C.tabPanel.setActiveTab(0);
	}
});

// ********************** push data to FieldSet *************************//
SCP007C.scpSetHeader = new Ext.form.FieldSet({
	collapsible : false,
	// title : 'ข้อมูลส่วนตัว',
	border : false,
	layout : 'column',
	width : 820,
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [ {
		columnWidth : 1,
		items : SCP007C.scpLabelCompany,
		labelAlign : 'right',
		style : {
			"text-align":"center",
			"margin-bottom" : "20px",

		},
	}, {
		columnWidth : 1,
		items : SCP007C.scpLabelTitle,
		labelAlign : 'right',
		style : {
			"text-align":"center",
			"margin-bottom" : "30px",

		},
	}, {
		columnWidth : 1,
		items : SCP007C.scpNumber,
		labelAlign : 'right',
		style : {
			"margin-left" : "570px",

		},
	}, {
		columnWidth : 1,
		items : SCP007C.scpDate,
		labelAlign : 'right',
		style : {
			"margin-left" : "570px",

		},

	}, {
		columnWidth : 0.10,
		items : SCP007C.scpLabel,
		labelAlign : 'right'

	}, {
		columnWidth : 0.15,
		items : SCP007C.scpLabel1,
		labelAlign : 'right'

	}, {
		columnWidth : 0.05,
		items : SCP007C.scpLabel2,
		labelAlign : 'right'

	}, {
		columnWidth : 0.7,
		items : SCP007C.scpLabel3,
		labelAlign : 'right'

	}, {
		columnWidth : 1,
		items : SCP007C.scpForPayGive,
		labelAlign : 'right',
		style : {
			"margin-top" : "20px",

		},

	}, {
		columnWidth : 0.14,
		items : SCP007C.scpTypeForpay0,
		labelAlign : 'right'

	}, {
		columnWidth : 0.86,
		items : SCP007C.scpTypeForpay1,
		labelAlign : 'right'

	}, {
		columnWidth : 0.06,
		items : SCP007C.scpTypeForpay2,
		labelAlign : 'right',
	// style : {
	// "margin-left" : "109px",
	//
	// },

	}, {
		columnWidth : 0.40,
		items : SCP007C.scpBank,
		labelAlign : 'right'

	}, {
		columnWidth : 0.40,
		items : SCP007C.scpBranch,
		labelAlign : 'right'

	}, {
		columnWidth : 0.60,
		items : SCP007C.scpNumberCheck,
		labelAlign : 'right',
		style : {
			"margin-left" : "160px",

		},

	}, {
		columnWidth : 0.40,
		items : SCP007C.scpDateCreation,
		labelAlign : 'right'

	}, {
		columnWidth : 1,
		items : SCP007C.scpLabelDetail,
		// labelAlign : 'right',
		style : {
			"margin-left" : "70px",

		},

	}, {
		columnWidth : 1,
		items : SCP007C.scfTextArea,
	// labelAlign : 'right'

	}, {
		columnWidth : 0.70,
		items : SCP007C.scpNumberCharactor,
		labelAlign : 'right',
	// style : {
	// "margin-left" : "70px",
	//
	// },

	}, {
		columnWidth : 0.3,
		items : SCP007C.scpTotalMoney,
		labelAlign : 'right',

	}, {
		columnWidth : 1,
		items : SCP007C.createGrid,
		labelAlign : 'right',
		style : {
			"margin-left" : "20px",

		},

	}, {
		columnWidth : 0.5,
		items : SCP007C.scpButtonPrint,
		labelAlign : 'right',
		style : {
			"margin-top" : "50px",
			"margin-left" : "280px",

		},

	}, {
		columnWidth : 0.5,
		items : SCP007C.scpButtonBack,
		labelAlign : 'right',
		style : {
			"margin-top" : "50px",
			"margin-left" : "20px",

		},

	} ]
});

SCP007C.tabPanelSCP007C = new Ext.Panel({
	id:'tab2',
	autoWidth : true,
	autoHeight : true,
	border : false,
	hideBorders : true,
	layout : 'column',
	items : [ {
		items : SCP007C.scpSetHeader
	}]
});

