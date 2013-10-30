var SCF003 = {};

SCF003.No = new Ext.form.TextField({
	id : 'no',
	fieldLabel : "No",
	
});
SCF003.date = new Ext.form.TextField({
	id : 'date',
	fieldLabel : "วันที่รับเอกสาร",
});

SCF003.name = new Ext.form.TextField({
	id : 'name',
	fieldLabel : "ชื่อ - สกุล",

});

SCF003.id = new Ext.form.TextField({
	id : 'id',
	fieldLabel : "รหัสพนักงาน",
});

SCF003.company = new Ext.form.TextField({
	id : 'company',
	fieldLabel : "บริษัท",

});

SCF003.comboboxStore = new Ext.data.JsonStore({
	baseParams : {
		method : 'antecedent'
	},
	url : '/TransportationAllowance/SCF003.html',
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

SCF003.createCombobox = new Ext.form.ComboBox({
	id : 'antecedent',
	fieldLabel : 'ฝ่าย / แผนก',
	mode : 'local',
	store : SCF003.comboboxStore,
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

SCF003.textArea = new Ext.ss.form.TextArea({
	fieldLabel : 'ที่อยู่',
	id:'address',
	width : 600,
	bodyPadding : 10,

});

SCF003.comboboxStoreA = new Ext.data.JsonStore({
	baseParams : {
		method : 'antercedent2'
	},
	url : '/TransportationAllowance/SCF003.html',
	method : 'POST',
	storeId : 'comboStroreA',
	root : 'records',
	idProperty : 'code',
	autoLoad : true,
	fieldLabel : 'comboStroreA',
	fields : [ {
		name : 'code'

	}, {
		name : 'description'
	} ]
});
SCF003.createComboboxA = new Ext.form.ComboBox({
	fieldLabel : 'จังหวัด',
	id : 'antercedentA',
	width : 120,
	store : SCF003.comboboxStoreA,
	valueField : 'code',
	displayField : 'description',
	autoSelect : true,
	mode : 'local',
	lazyRender : true,
	criterionField : true,
	typeAhead : true,
	forceSelection : true,
	triggerAction : 'all',
	emptyText : 'Select ...'

});

SCF003.phone = new Ext.form.TextField({
	id : 'phone',
	fieldLabel : "เบอร์โทร",
	width : 120

});

SCF003.email = new Ext.form.TextField({
	id : 'email',
	fieldLabel : "E-mail",
	width : 200

});

// /////////////////////set Field/////////////////////////
SCF003.name.setValue(SCF01Domain.name);
SCF003.id.setValue(SCF01Domain.id);
SCF003.company.setValue(SCF01Domain.company);
SCF003.textArea.setValue(SCF01Domain.address);
SCF003.phone.setValue(SCF01Domain.phone);
SCF003.email.setValue(SCF01Domain.email);
SCF003.createCombobox.setValue(SCF01Domain.antecedent);
SCF003.createComboboxA.setValue(SCF01Domain.antercedentA);

SCF003.setCenter = new Ext.form.FieldSet({
	collapsible : false,
	title : 'ข้อมูลส่วนตัว',
	border : true,
	layout : 'column',
	width : 805,
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [ {
		columnWidth : 0.5,
		items : SCF003.name,
		labelAlign : 'right'
	}, {
		columnWidth : 0.5,
		items : SCF003.id,
		labelAlign : 'right'

	}, {
		columnWidth : 0.5,
		items : SCF003.company,
		labelAlign : 'right'
	}, {
		columnWidth : 0.5,
		items : SCF003.createCombobox,
		labelAlign : 'right'
	}, {
		columnWidth : 1,
		items : SCF003.textArea,
		labelAlign : 'right'
	}, {
		columnWidth : 0.3,
		items : SCF003.createComboboxA,
		labelAlign : 'right'
	}, {
		columnWidth : 0.3,
		items : SCF003.phone,
		labelAlign : 'right'
	}, {
		columnWidth : 0.4,
		items : SCF003.email,
		labelAlign : 'right'
	}

	]
});
var inti = 1;
SCF003.gridAddBtn = new Ext.Toolbar.Button({
	// text:RMP001AButton.Add,
	tooltip : 'Add a new item',
	iconCls : 'add',
	// disabled : false,
	privilage : "educationAddBtn",
	handler : function() {

		Ext.getCmp('gridEducationInfomation').addRow();
		Ext.getCmp('editNo').setValue(inti++);
	}

});
SCF003.gridRemoveBtn = new Ext.Toolbar.Button({
	tooltip : 'Remove the selected item',
	iconCls : 'remove',
	disabled : false,
	handler : function() {
		// var int2 = document.getElementById('checkDataGrid').checked;
		// if(int2 == true){
		// alert("sad");
		// }
		var rowSelected = Ext.getCmp('gridEducationInfomation')
				.getSelectionModel().getSelections();
		if (!Ext.isEmpty(rowSelected)) {
			Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {
				if (btn == 'yes') {
					for ( var i in rowSelected) {

						Ext.getCmp('gridEducationInfomation').store
								.remove(rowSelected[i]);
					}

				}
			});
		} else {
			Ext.Msg.alert('Warning', 'กรุณาเลือกข้อมูลที่จะลบ');
		}

	}
});
SCF003.gridCopyBtn = new Ext.Toolbar.Button(
		{
			tooltip : 'Copy',
			iconCls : 'copy',
			disabled : false,
			handler : function() {
				Ext.MessageBox
						.show({
							title : 'Copy',
							msg : 'Copy : <input type="text" id="numberRecord" /> Record',
							width : 300,
							buttons : Ext.MessageBox.OKCANCEL,
							animEl : 'submit',
							fn : function(btn, reason) {
								var rowSelected = Ext.getCmp(
										'gridEducationInfomation')
										.getSelectionModel().getSelections();
								var int1 = document
										.getElementById('numberRecord').value;
								if (btn == 'ok') {
									if (!Ext.isEmpty(rowSelected)) {
										Ext.Msg
												.show({
													title : 'Confrim',
													msg : 'คุณต้องการที่จะ copy ?',
													buttons : Ext.MessageBox.OKCANCEL,
													fn : function(buttonId,
															text) {
														if (buttonId == 'ok'
																&& rowSelected.length == 1) {
															var x = rowSelected
																	.pop().data;

															for (var i = int1; i > 0; i--) {
																Ext
																		.getCmp(
																				'gridEducationInfomation')
																		.addRow(
																				x);

															}

														} else {
															Ext.Msg
																	.alert("กรุณาเลือกข้อมูลที่จะ copy");
														}

													}
												});

									} else {
										Ext.Msg.alert('Warning',
												'กรุณาเลือกข้อมูลที่จะ copy');
									}
								}
							}
						});
			}
		});
SCF003.gridSaveBtn = new Ext.Toolbar.Button({
	tooltip : 'Save',
	iconCls : 'save',
	disabled : false,
	handler : function() {
		Ext.MessageBox.confirm('Confirmation', 'ยืนยันข้อมูลถูกต้อง ?',
				confirmFunction);		   
		function confirmFunction(btn) {
			if (btn == 'yes') {
				
				
				
					//**************** get value History to controller **********//
					var param1 = {};
					 param1.no = Ext.getCmp('no').getValue();
					 param1.date = Ext.getCmp('date').getValue();
					 param1.name = Ext.getCmp('name').getValue();
					 param1.id = Ext.getCmp('id').getValue();
					 param1.company = Ext.getCmp('company').getValue();
					 param1.antecedent = Ext.getCmp('antecedent').getValue();
					 param1.address = Ext.getCmp('address').getValue();
					 param1.antercedentA = Ext.getCmp('antercedentA').getValue();
					 param1.phone = Ext.getCmp('phone').getValue();
					 param1.email = Ext.getCmp('email').getValue();
					 
					//**************** get value in Bottom to controller **********//
					
					 param1.tatolManey = Ext.getCmp('tatolManey').getValue();
					 param1.document = Ext.getCmp('document').getValue();
					 param1.forPay = Ext.getCmp('forPay').getValue();
					 param1.bank = Ext.getCmp('bank').getValue();
					 param1.branch = Ext.getCmp('branch').getValue();
					 param1.accountNumber = Ext.getCmp('accountNumber').getValue();
					 param1.typeAccount = Ext.getCmp('typeAccount').getValue();
					 param1.type1 = Ext.getCmp('type1').getValue();
					 param1.type2 = Ext.getCmp('type2').getValue();
					 param1.method = "save1";
						Ext.Ajax.request({
							url : '/TransportationAllowance/SCF003.html',
							params : param1,
							success : function(response, opts) {
								if (param1 != null) {
									Ext.Msg.alert('Information', 'บันทึกเรียบร้อย');
								} else {
									Ext.Msg.alert('Information', 'Error');
								}

							},
							failure : function(response, opts) {
								Ext.Msg.alert('ERROR', 'Error.');
							}

						});
					
					
					 //************************** get value to controller by Grid ***************************//	
					var param2 = {};
				SCF003.createGrid.getSelectionModel().selectAll();
				 var sm = SCF003.createGrid.getSelectionModel().getSelections();
				 for (var i=0; i<=sm.length-1; i++) {
						    
				
				param2.dataGridNo =  SCF003.createGrid.getStore().getAt(i).data.no;
				param2.dataGridData = SCF003.createGrid.getStore().getAt(i).data.gridDate;
		    	param2.dataGridCustomer = SCF003.createGrid.getStore().getAt(i).data.customer;
		    	param2.dataGridRegion = SCF003.createGrid.getStore().getAt(i).data.region;
		    	param2.dataGridGoal = SCF003.createGrid.getStore().getAt(i).data.goal;
		    	param2.dataGridPaymentTravel = SCF003.createGrid.getStore().getAt(i).data.paymentTravel;
		    	param2.dataGridPaymentD = SCF003.createGrid.getStore().getAt(i).data.paymentD;
		    	param2.dataGridPayment = SCF003.createGrid.getStore().getAt(i).data.payment;
		    	param2.dataRemark = SCF003.createGrid.getStore().getAt(i).data.remark;
				param2.method = "save2";
				Ext.Ajax.request({
					url : '/TransportationAllowance/SCF003.html',
					params : param2,
					success : function(response, opts) {
						if (param2 != null) {
							Ext.Msg.alert('Information', 'บันทึกเรียบร้อย');
						} else {
							Ext.Msg.alert('Information', 'Error');
						}

					},
					failure : function(response, opts) {
						Ext.Msg.alert('ERROR', 'Error.');
					}

				});
				SCF003.createGrid.getSelectionModel().deselectRow(i);
					    }
			}
		}
	}
// window.location.assign("http://www.google.com");

});

SCF003.checkboxselection = new Ext.grid.CheckboxSelectionModel({
	singleSelect : false,
// email: true,
// dataIndex: 'chkFlag'
});

SCF003.gridColumns = [ SCF003.checkboxselection,

{

	header : 'No',
	dataIndex : 'no',
	align : 'center',
	editor : new Ext.form.TextField({
		id : 'editNo',
	}),
	width : 87.08,

}, {

	header : 'วันที่',
	dataIndex : 'gridDate',
	align : 'center',
	editor : new Ext.form.TextField({
		id : 'editGridDate',
	}),
	width : 87.08,

}, {
	header : 'ลูกค้า',
	dataIndex : 'customer',
	align : 'center',
	editor : new Ext.form.TextField({
		id : 'editCustomer',
	}),
	width : 87.08,

}, {

	header : 'จาก',
	dataIndex : 'region',
	align : 'center',
	id : 'region',
	editor : new Ext.form.TextField({
		id : 'editRegion',
	}),
	width : 87.08,

}, {
	header : 'ถึง',
	dataIndex : 'goal',
	align : 'center',
	editor : new Ext.form.TextField({
		id : 'editGoal',
	}),
	width : 87.08,

}

, {
	header : 'ค่าเดินทาง',
	dataIndex : 'paymentTravel',
	align : 'center',
	editor : new Ext.form.TextField({
		id : 'editPaymentTravel',
	}),
	width : 87.08,

}, {
	header : 'ค่าทางด่วน',
	dataIndex : 'paymentD',
	align : 'center',
	editor : new Ext.form.TextField({
		id : 'editPaymentD',
	}),
	width : 87.08,

}, {
	header : 'รวมเป็นเงิน',
	dataIndex : 'payment',
	align : 'center',
	editor : new Ext.form.TextField({
		id : 'editPayment',
	}),
	width : 87.08,

}, {
	header : 'หมายเหตุ',
	dataIndex : 'remark',
	align : 'center',
	editor : new Ext.form.TextField({
		id : 'editRemark',
	}),
	width : 87.08,

}

];

SCF003.groupHeaderPlugins = new Ext.ux.plugins.GroupHeaderGrid({
	rows : [ [ {

	}, {}, {}, {}, {
		header : "การเดินทาง",
		colspan : 2,
		align : 'center'
	}, {
		header : "ค่าใช้จ่าย",
		colspan : 2,
		align : 'center'
	}, {}, {} ] ],

});

SCF003.gridStrore = new Ext.data.JsonStore({
	baseParams : {
		method : 'gridData'
	},
	url : '/TransportationAllowance/SCF003.html',
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

SCF003.totalManey = new Ext.form.TextField({
	id : 'tatolManey',
	fieldLabel : "จำนวนเงินเป็นตัวอักษร",
	width : 300

});
SCF003.document = new Ext.form.TextField({
	id : 'document',
	fieldLabel : "เอกสารแนบ",
	width : 120

});
SCF003.forPay = new Ext.form.TextField({
	id : 'forPay',
	fieldLabel : "ใบ เพื่อชำระ",
	width : 400

});
SCF003.bank = new Ext.form.TextField({
	id : 'bank',
	fieldLabel : "บัญชีธนาคาร",
	width : 120

});
SCF003.branch = new Ext.form.TextField({
	id : 'branch',
	fieldLabel : "สาขา",
	width : 240

});
SCF003.accountNumber = new Ext.form.TextField({
	id : 'accountNumber',
	fieldLabel : "เลขที่บัญชี",
	width : 240

});
SCF003.typeAccount = new Ext.form.TextField({
	id : 'typeAccount',
	fieldLabel : "ประเภทบัญชี",
	width : 240

});
SCF003.textLabel = new Ext.form.Label({
	fieldLabel : "ได้รับ"
});

SCF003.checkBox1 = new Ext.form.Checkbox({
	id : 'type1',
	name : 'name',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'เงินสด',
	fieldLabel : 'text'
});

SCF003.checkBox2 = new Ext.form.Checkbox({
	id : 'type2',
	name : 'name',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'เช็คธนาคาร',
	fieldLabel : 'text'
});
//******************** set Value *****************//
SCF003.bank.setValue(SCF01Domain.bank);
SCF003.branch.setValue(SCF01Domain.branch);
SCF003.accountNumber.setValue(SCF01Domain.accountNumber);
SCF003.typeAccount.setValue(SCF01Domain.typeAccount);
SCF003.createButtonSubmit = new Ext.Button({
	id : 'submit',
	text : 'Submit',
	width:100
});

SCF003.createButtonPrint = new Ext.Button({
	id : 'print',
	text : 'Print Preview',
	width:100
});

SCF003.createButtonBack = new Ext.Button({
	id : 'back',
	text : 'Back',
	width:100
});

SCF003.setBottom = new Ext.form.FieldSet({
	collapsible : false,

	border : true,
	width : 805,
	layout : 'column',

	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [ {
		columnWidth : 1,
		items : SCF003.totalManey,
		labelAlign : 'right',
		style : {
			"margin-left":"330px",
			
		},
	}, {
		columnWidth : 0.3,
		items : SCF003.document,
		labelAlign : 'right'
	}, {
		columnWidth : 0.7,
		items : SCF003.forPay,

	}, {
		columnWidth : 0.5,
		items : SCF003.bank,
		labelAlign : 'right'
	}, {
		columnWidth : 0.5,
		items : SCF003.branch,
		labelAlign : 'right'
	}, {
		columnWidth : 0.5,
		items : SCF003.accountNumber,
		labelAlign : 'right'
	}, {
		columnWidth : 0.5,
		items : SCF003.typeAccount,
		labelAlign : 'right'
	}, {
		columnWidth : 0.15,
		items : SCF003.textLabel,
		labelAlign : 'right'

	}, {
		columnWidth : 0.1,
		items : SCF003.checkBox1,

	}, {
		columnWidth : 0.75,
		items : SCF003.checkBox2,

	}

	]
});

SCF003.createGrid = new Ext.ss.grid.EditorGridPanel({
	id : 'gridEducationInfomation',
	store : SCF003.gridStrore,
	sm : SCF003.checkboxselection,
	columns : SCF003.gridColumns,
	height : 350,
	width : 805,

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

	plugins : [ SCF003.groupHeaderPlugins ],
	clicksToEdit : 1,
	tbar : [ SCF003.gridAddBtn, '-', SCF003.gridRemoveBtn, '-',
			SCF003.gridCopyBtn, '-', SCF003.gridSaveBtn ],
	bbar : new Ext.PagingToolbar({
		pageSize : 25,
		store : SCF003.gridStrore,
		displayInfo : true,
		displayMsg : 'Displaying topics {0} - {1} of {2}',
		emptyMsg : "Report of Travel",
		items : [ '-', {
			pressed : true,
			enableToggle : true,
			text : 'Show Preview',
			cls : 'x-btn-text-icon details',
			toggleHandler : function(btn, pressed) {
				var view = grid.getView();
				view.showPreview = pressed;
				view.refresh();
			}
		} ]
	})
});
// SCF003.gridStrore.load({params:{start:0, limit:25}});

Ext.onReady(function() {
	SCF003.resumeForm = new Ext.form.FormPanel({

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
		items : [

		{
			items : SCF003.No,
			labelAlign : 'right',
			style : {
				"margin-left":"550px",
				
			},
		// disabled: true
		}, {
			columnWidth : 1,
			items : SCF003.date,
			labelAlign : 'right',
			style : {
				"margin-left":"550px",
				
			},
		// disabled: true
		}, {
			columnWidth : 1,
			items : SCF003.setCenter,

		}, {
			columnWidth : 1,
			items : SCF003.createGrid
		}, {
			columnWidth : 1,
			items : SCF003.setBottom
		}, {
			columnWidth : 0.35,
			items : SCF003.createButtonSubmit,
		
			style : {
				"margin-left":"150px",
				
			},

		}, {
			columnWidth : 0.3,
			items : SCF003.createButtonPrint,
			style : {
				"margin-left":"50px",
				
			},

		}, {
			columnWidth : 0.35,
			items : SCF003.createButtonBack,
			style : {
				"margin-left":"5px",
				
			},

		} ]

	});

	// Ext.getCmp('name').setValue('test');
	Ext.get('submit').on(
			'click',
			function(e) {
				var name = Ext.getCmp('name').getValue();
				// var jobValue = document.getElementById('name').value;
				Ext.MessageBox.confirm('Acception', 'คุณ' + ' ' + name + ' '
						+ 'มั่นใจว่าจะทำสิ่งนี้  ?', confirmFunction);

				function confirmFunction(btn) {
					if (btn == 'yes') {
						window.location.assign("http://www.google.com");
					}
				}
			});

	Ext.get('print').on(
			'click',
			function(e) {

				Ext.MessageBox.confirm('Confirmation', 'ยืนยันข้อมูลถูกต้อง ?',
						confirmFunction);

				function confirmFunction(btn) {
					if (btn == 'yes') {
//						var param3 = {};
//						 param3.no = Ext.getCmp('no').getValue();
//						
//						 param3.method = "preview";
//							Ext.Ajax.request({
//								url : '/TransportationAllowance/jasperReport.pdf',
//								params : param3,
//								success : function(response, opts) {
//									if (param3 != null) {
//										Ext.Msg.alert('Information', 'บันทึกเรียบร้อย');
//									} else {
//										Ext.Msg.alert('Information', 'Error');
//									}
//
//								},
//								failure : function(response, opts) {
//									Ext.Msg.alert('ERROR', 'Error.');
//								}
//
//							});
//							var http = new XMLHttpRequest();
//							 http.open("POST", "./jasperReport.pdf", true);
						window.location.assign("/TransportationAllowance/jasperReport.pdf");
					}
				}

			});
});
