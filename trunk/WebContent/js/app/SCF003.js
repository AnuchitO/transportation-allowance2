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
SCF003.idCardEmp = new Ext.form.TextField({
	id : 'idCardEmp',
	fieldLabel : "รหัสประจำตัวประชาชน",
	width : 250

});

SCF003.textArea = new Ext.ss.form.TextArea({
	fieldLabel : 'ที่อยู่',
	id : 'address',
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
SCF003.No.setValue(SCF01Domain.no);
SCF003.date.setValue(SCF01Domain.date);
SCF003.name.setValue(SCF01Domain.name);
SCF003.id.setValue(SCF01Domain.id);
SCF003.company.setValue(SCF01Domain.company);
SCF003.textArea.setValue(SCF01Domain.address);
SCF003.phone.setValue(SCF01Domain.phone);
SCF003.email.setValue(SCF01Domain.email);
SCF003.createCombobox.setValue(SCF01Domain.antecedent);
SCF003.createComboboxA.setValue(SCF01Domain.antercedentA);
SCF003.idCardEmp.setValue(SCF01Domain.idCard);
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
		items : SCF003.idCardEmp,
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
		SCF003.createGrid.getSelectionModel().selectAll();

		var sm = SCF003.createGrid.getSelectionModel().getSelections();

		Ext.getCmp('gridEducationInfomation').addRow();

		var i = 1 + sm.length - 1;
		var uu = SCF003.createGrid.getStore().getAt(i).data.no;
		Ext.getCmp('editNo').setValue(i + 1);
		for (var j = 0; j <= sm.length - 1; j++) {

			SCF003.createGrid.getSelectionModel().deselectRow(j);
		}
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
					SCF003.createGrid.getSelectionModel().selectAll();

					var sm = SCF003.createGrid.getSelectionModel()
							.getSelections();
					//					
					var numberSelect = rowSelected.length;

					var lastIndex = sm.length - 1;

					var getValueLastIndex = SCF003.createGrid.getStore().getAt(
							lastIndex).data.no;

					var u = getValueLastIndex - numberSelect;

					SCF003.createGrid.store.getAt(lastIndex).set('no', u);
					for (var j = lastIndex; j >= 0; j--) {
						if (j == lastIndex) {

						}
						
						detroyNumber = u - j;
						if(detroyNumber == 0){
							SCF003.createGrid.store.getAt(lastIndex - j).set('no',
									detroyNumber+1);
						}
						else{
						SCF003.createGrid.store.getAt(lastIndex - j).set('no',
								detroyNumber);
						}
					}

					for (var j = 0; j <= sm.length - 1; j++) {

						SCF003.createGrid.getSelectionModel().deselectRow(j);
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
//															var x = rowSelected
//																	.pop().data;
															var selectedColumn1 = Ext.getCmp('gridEducationInfomation').getSelectionModel().getSelections()[0].get('no');
															var selectedColumn2 = Ext.getCmp('gridEducationInfomation').getSelectionModel().getSelections()[0].get('gridDate');
															var selectedColumn3 = Ext.getCmp('gridEducationInfomation').getSelectionModel().getSelections()[0].get('customer');
															var selectedColumn4 = Ext.getCmp('gridEducationInfomation').getSelectionModel().getSelections()[0].get('region');
															var selectedColumn5 = Ext.getCmp('gridEducationInfomation').getSelectionModel().getSelections()[0].get('goal');
															var selectedColumn6 = Ext.getCmp('gridEducationInfomation').getSelectionModel().getSelections()[0].get('paymentTravel');
															var selectedColumn7 = Ext.getCmp('gridEducationInfomation').getSelectionModel().getSelections()[0].get('paymentD');
															var selectedColumn8 = Ext.getCmp('gridEducationInfomation').getSelectionModel().getSelections()[0].get('payment');
															var selectedColumn9 = Ext.getCmp('gridEducationInfomation').getSelectionModel().getSelections()[0].get('remark');
//															
															SCF003.createGrid
																	.getSelectionModel()
																	.selectAll();
															var sm = SCF003.createGrid
																	.getSelectionModel()
																	.getSelections();
															var lastIndex = sm.length - 1;
															var getValueLastIndex = SCF003.createGrid
																	.getStore()
																	.getAt(
																			lastIndex).data.no;
															// alert(getValueLastIndex);
															var j = 0;
															var increment = 0;
															for (var i = int1; i > 0; i--) {
																j++;
																Ext
																		.getCmp(
																				'gridEducationInfomation')
																		.addRow();
																increment = getValueLastIndex++;
																increment = increment + 1;

																SCF003.createGrid.store.getAt(lastIndex+ j).set('no',increment);
//																SCF003.createGrid.store.getAt(lastIndex+ j).set('gridDate',selectedColumn2);
																SCF003.createGrid.store.getAt(lastIndex+ j).set('customer',selectedColumn3);
																SCF003.createGrid.store.getAt(lastIndex+ j).set('region',selectedColumn4);
																SCF003.createGrid.store.getAt(lastIndex+ j).set('goal',selectedColumn5);
																SCF003.createGrid.store.getAt(lastIndex+ j).set('paymentTravel',selectedColumn6);
																SCF003.createGrid.store.getAt(lastIndex+ j).set('paymentD',selectedColumn7);
																SCF003.createGrid.store.getAt(lastIndex+ j).set('payment',selectedColumn8);
																SCF003.createGrid.store.getAt(lastIndex+ j).set('remark',selectedColumn9);

																//																

															}
															for (var j = 0; j <= sm.length - 1; j++) {

																SCF003.createGrid
																		.getSelectionModel()
																		.deselectRow(
																				j);
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
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}
var param2 = {};
function saveOrUpdate() {

	param2.no = Ext.getCmp('no').getValue();
	param2.date = Ext.getCmp('date').getValue();
	param2.name = Ext.getCmp('name').getValue();
	param2.id = Ext.getCmp('id').getValue();
	param2.company = Ext.getCmp('company').getValue();
	param2.antecedent = Ext.getCmp('antecedent').getValue();
	param2.address = Ext.getCmp('address').getValue();
	param2.antercedentA = Ext.getCmp('antercedentA').getValue();
	param2.phone = Ext.getCmp('phone').getValue();
	param2.email = Ext.getCmp('email').getValue();

	// **************** get value in Bottom to controller
	// **********//
	param2.tatolPaym = Ext.getCmp('tatolPaym').getValue();
	param2.tatolPaymA = Ext.getCmp('tatolPaymA').getValue();
	param2.tatolPaymfullCase = Ext.getCmp('tatolPaymfullCase').getValue();
	param2.tatolManey = Ext.getCmp('tatolManey').getValue();
	param2.document = Ext.getCmp('document').getValue();
	param2.forPay = Ext.getCmp('forPay').getValue();
	param2.bank = Ext.getCmp('bank').getValue();
	param2.branch = Ext.getCmp('branch').getValue();
	param2.accountNumber = Ext.getCmp('accountNumber').getValue();
	param2.typeAccount = Ext.getCmp('typeAccount').getValue();
	param2.type1 = Ext.getCmp('type1').getValue();
	param2.type2 = Ext.getCmp('type2').getValue();

	// ************************** get value to controller by
	// Grid ***************************//

	SCF003.createGrid.getSelectionModel().selectAll();

	var sm = SCF003.createGrid.getSelectionModel().getSelections();
	param2.pack = "";

	for (var i = 0; i <= sm.length - 1; i++) {
		var dataGridNo = SCF003.createGrid.getStore().getAt(i).data.no;
		var dataGridData = SCF003.createGrid.getStore().getAt(i).data.gridDate;
		var dataGridCustomer = SCF003.createGrid.getStore().getAt(i).data.customer;
		var dataGridRegion = SCF003.createGrid.getStore().getAt(i).data.region;
		var dataGridGoal = SCF003.createGrid.getStore().getAt(i).data.goal;
		var dataGridPaymentTravel = SCF003.createGrid.getStore().getAt(i).data.paymentTravel;
		var dataGridPaymentD = SCF003.createGrid.getStore().getAt(i).data.paymentD;
		var dataGridPayment = SCF003.createGrid.getStore().getAt(i).data.payment;
		var dataRemark = SCF003.createGrid.getStore().getAt(i).data.remark;
			if(dataRemark == "" || dataRemark == null || dataRemark == "undefined"){
				dataRemark = "  ";
			}
		SCF003.createGrid.getSelectionModel().deselectRow(i);
		param2.pack += dataGridNo + "," + dataGridData + "," + dataGridCustomer
				+ "," + dataGridRegion + "," + dataGridGoal + ","
				+ dataGridPaymentTravel + "," + dataGridPaymentD + ","
				+ dataGridPayment + "," + dataRemark + "!";
	}
	param2.method = "save1";
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
}

SCF003.gridSaveBtn = new Ext.Toolbar.Button(
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
						param2.status = "001";

						saveOrUpdate();

					}
				}
			}

		});

SCF003.comboCustomerStoreGrid = new Ext.data.JsonStore({
	baseParams : {
		method : 'customer'
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

SCF003.comboCustomerGrid = new Ext.form.ComboBox({
	id : 'comboCustomerGrid',
	// fieldLabel : 'ฝ่าย / แผนก',
	mode : 'local',
	store : SCF003.comboCustomerStoreGrid,
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
SCF003.checkboxselection = new Ext.grid.CheckboxSelectionModel({
	singleSelect : false,

// email: true,
// dataIndex: 'chkFlag'
});

SCF003.gridColumns = [
		SCF003.checkboxselection,

		{

			header : 'No',
			dataIndex : 'no',
			align : 'center',
			editor : new Ext.form.TextField({
				id : 'editNo',
			}),
			width : 87.08,

		},
		{

			header : 'วันที่',
			dataIndex : 'gridDate',
			align : 'center',
			type : 'date',
			editor : new Ext.form.DateField({
				id : 'editGridDate',
				emptyText : 'Select ...',
				

			}),
			menuDisabled : true,
			renderer : Ext.util.Format.dateRenderer('d/m/Y'),
			
			width : 87.08,

		},
		{
			header : 'ลูกค้า',
			dataIndex : 'customer',
			align : 'center',
			editor : SCF003.comboCustomerGrid,
			width : 87.08,

		},
		{

			header : 'จาก',
			dataIndex : 'region',
			align : 'center',
			id : 'region',
			editor : new Ext.form.TextField({
				id : 'editRegion',
			}),
			width : 87.08,

		},
		{
			header : 'ถึง',
			dataIndex : 'goal',
			align : 'center',
			editor : new Ext.form.TextField({
				id : 'editGoal',
			}),
			width : 87.08,

		}

		,
		{
			header : 'ค่าเดินทาง',
			dataIndex : 'paymentTravel',
			align : 'center',
			editor : new Ext.form.TextField(
					{
						id : 'editPaymentTravel',
						listeners : {
							change : function(f, e) {
								SCF003.createGrid.getSelectionModel()
										.selectAll();
								var totalLength = SCF003.createGrid
										.getSelectionModel().getSelections();
								var a = 0;
								var totalPaymentTravel = 0;
								var c = 0;
								for (var i = 0; i <= totalLength.length - 1; i++) {
									var test = SCF003.createGrid.getStore()
											.getAt(i).data.paymentD;
									if (Ext.isEmpty(test)) {
										totalPaymentTravel = parseInt(SCF003.createGrid
												.getStore().getAt(i).data.paymentTravel);
										SCF003.createGrid.store.getAt(i).set(
												'payment', totalPaymentTravel);
										SCF003.createGrid.store.getAt(i).set(
												'paymentD', "0");

										a = a
												+ parseInt(SCF003.createGrid
														.getStore().getAt(i).data.paymentTravel);
										SCF003.tatolPaym.setValue(a);
										c = c
												+ parseInt(SCF003.createGrid
														.getStore().getAt(i).data.payment);
										SCF003.tatolPaymfullCase.setValue(c);
										SCF003.createGrid.getSelectionModel()
												.deselectRow(i);
									} else {

										totalPaymentTravel = parseInt(SCF003.createGrid
												.getStore().getAt(i).data.paymentTravel)
												+ parseInt(SCF003.createGrid
														.getStore().getAt(i).data.paymentD);
										SCF003.createGrid.store.getAt(i).set(
												'payment', totalPaymentTravel);
										a = a
												+ parseInt(SCF003.createGrid
														.getStore().getAt(i).data.paymentTravel);
										SCF003.tatolPaym.setValue(a);
										c = c
												+ parseInt(SCF003.createGrid
														.getStore().getAt(i).data.payment);
										SCF003.tatolPaymfullCase.setValue(c);
										SCF003.createGrid.getSelectionModel()
												.deselectRow(i);
									}
								}
								var num = Ext.getCmp('tatolPaymfullCase')
										.getValue();
								var number = new Array("", "หนึ่ง", "สอง",
										"สาม", "สี่", "ห้า", "หก", "เจ็ด",
										"แปด", "เก้า");
								var number2 = new Array("", "สิบ", "ร้อย",
										"พัน", "หมื่น", "แสน", "ล้าน");
								var str = "";
								var lennum = num.length;
								var tmp = 0;
								var count = 0;
								for (i = lennum - 1; i > -1; --i) {
									count++;

									if (tmp == 7)
										tmp = 1;
									ch = num.charAt(i);
									digit = number[parseInt(ch)];
									pos = tmp + 1;
									if (pos == 2 && ch == "1") {
										digit = ""

									} else if (pos == 2 && ch == "2") {
										digit = "ยี่"
									} else if ((pos == 1 || pos == 7)
											&& ch == "1" && lennum > count) {
										digit = "เอ็ด";
									}
									last = number2[tmp];
									if (ch == "0" && pos != 7)
										last = "";
									str = digit + last + str;

									tmp++;
								}
								if (num.length == 0) {
									Ext.getCmp('tatolManey').setValue(" ");
								} else {
									Ext.getCmp('tatolManey').setValue(
											str + "บาทถ้วน");
								}

							}
						}
					}),
			width : 87.08,

		},
		{
			header : 'ค่าทางด่วน',
			dataIndex : 'paymentD',
			align : 'center',
			editor : new Ext.form.TextField(
					{
						id : 'editPaymentD',
						listeners : {
							change : function(f, e) {
								SCF003.createGrid.getSelectionModel()
										.selectAll();
								var totalLength = SCF003.createGrid
										.getSelectionModel().getSelections();
								var b = 0;
								var totalPayment = 0;
								var c = 0;
								for (var i = 0; i <= totalLength.length - 1; i++) {
									var test = SCF003.createGrid.getStore()
											.getAt(i).data.paymentTravel;
									if (Ext.isEmpty(test)) {
										test = 0;
										totalPayment = parseInt(SCF003.createGrid
												.getStore().getAt(i).data.paymentD)
												+ parseInt(test);
										SCF003.createGrid.store.getAt(i).set(
												'payment', totalPayment);
										SCF003.createGrid.store.getAt(i).set(
												'paymentTravel', "0");
										b = b
												+ parseInt(SCF003.createGrid
														.getStore().getAt(i).data.paymentD);

										SCF003.tatolPaymA.setValue(b);
										c = c
												+ parseInt(SCF003.createGrid
														.getStore().getAt(i).data.payment);
										SCF003.tatolPaymfullCase.setValue(c);

										SCF003.createGrid.getSelectionModel()
												.deselectRow(i);
									} else {
										totalPayment = parseInt(SCF003.createGrid
												.getStore().getAt(i).data.paymentTravel)
												+ parseInt(SCF003.createGrid
														.getStore().getAt(i).data.paymentD);
										SCF003.createGrid.store.getAt(i).set(
												'payment', totalPayment);
										b = b
												+ parseInt(SCF003.createGrid
														.getStore().getAt(i).data.paymentD);

										SCF003.tatolPaymA.setValue(b);
										c = c
												+ parseInt(SCF003.createGrid
														.getStore().getAt(i).data.payment);
										SCF003.tatolPaymfullCase.setValue(c);

										SCF003.createGrid.getSelectionModel()
												.deselectRow(i);
									}
								}
								var num = Ext.getCmp('tatolPaymfullCase')
										.getValue();
								var number = new Array("", "หนึ่ง", "สอง",
										"สาม", "สี่", "ห้า", "หก", "เจ็ด",
										"แปด", "เก้า");
								var number2 = new Array("", "สิบ", "ร้อย",
										"พัน", "หมื่น", "แสน", "ล้าน");
								var str = "";
								var lennum = num.length;
								var tmp = 0;
								var count = 0;
								for (i = lennum - 1; i > -1; --i) {
									count++;

									if (tmp == 7)
										tmp = 1;
									ch = num.charAt(i);
									digit = number[parseInt(ch)];
									pos = tmp + 1;
									if (pos == 2 && ch == "1") {
										digit = ""

									} else if (pos == 2 && ch == "2") {
										digit = "ยี่"
									} else if ((pos == 1 || pos == 7)
											&& ch == "1" && lennum > count) {
										digit = "เอ็ด";
									}
									last = number2[tmp];
									if (ch == "0" && pos != 7)
										last = "";
									str = digit + last + str;

									tmp++;
								}
								if (num.length == 0) {
									Ext.getCmp('tatolManey').setValue(" ");
								} else {
									Ext.getCmp('tatolManey').setValue(
											str + "บาทถ้วน");
								}

							}
						}
					}),
			width : 87.08,

		}, {
			header : 'รวมเป็นเงิน',
			dataIndex : 'payment',
			align : 'center',

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
SCF003.totalManey.setValue(SCF01Domain.tatolManey);
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
// ******************** set Value *****************//
SCF003.bank.setValue(SCF01Domain.bank);
SCF003.branch.setValue(SCF01Domain.branch);
SCF003.accountNumber.setValue(SCF01Domain.accountNumber);
SCF003.typeAccount.setValue(SCF01Domain.typeAccount);
SCF003.createButtonSubmit = new Ext.Button({
	id : 'submit',
	text : 'Submit',
	width : 100
});

SCF003.createButtonPrint = new Ext.Button({
	id : 'print',
	text : 'Print Preview',
	// disabled:true,
	width : 100
});

SCF003.createButtonBack = new Ext.Button({
	id : 'back',
	text : 'Back',
	width : 100
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
			"margin-left" : "330px",

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
SCF003.tatolPaym = new Ext.form.TextField({
	id : 'tatolPaym',
	width : 80

});
SCF003.tatolPaymA = new Ext.form.TextField({
	id : 'tatolPaymA',

	width : 80

});
SCF003.tatolPaymfullCase = new Ext.form.TextField({
	id : 'tatolPaymfullCase',

	width : 80,

});

SCF003.createGrid = new Ext.ss.grid.EditorGridPanel({
	id : 'gridEducationInfomation',
	store : SCF003.gridStrore,
	sm : SCF003.checkboxselection,
	columns : SCF003.gridColumns,
	columnLines : true,
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
		displayMsg : ' {0} - {1} of {2}',
		emptyMsg : "Report of Travel",
		items : [ '-', {
			pressed : true,
			enableToggle : true,
			text : 'Show Preview',
			cls : 'x-btn-text-icon details',
			toggleHandler : function(btn, pressed) {
				var view = SCF003.createGrid.getView();
				view.showPreview = pressed;
				view.refresh();

			}
		}, '-', "รวม", '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
				'-', SCF003.tatolPaym, '-', SCF003.tatolPaymA, '-',
				SCF003.tatolPaymfullCase ]
	})
});
// SCF003.gridStrore.load({params:{start:0, limit:25}});
// SCF003.textHeader = new Ext.form.Label({
// fieldLabel : "ใบเบิกค่าเดินทาง"
// });
Ext
		.onReady(function() {

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
				// {
				// items : SCF003.textHeader,
				// labelAlign : 'center',
				// width:'100'
				//				         				
				//
				// },

				{
					items : SCF003.No,
					labelAlign : 'right',
					style : {
						"margin-left" : "550px",

					},
				// disabled: true
				}, {
					columnWidth : 1,
					items : SCF003.date,
					labelAlign : 'right',
					style : {
						"margin-left" : "550px",

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
						"margin-left" : "150px",

					},

				}, {
					columnWidth : 0.3,
					items : SCF003.createButtonPrint,
					style : {
						"margin-left" : "50px",

					},

				}, {
					columnWidth : 0.35,
					items : SCF003.createButtonBack,
					style : {
						"margin-left" : "5px",

					},

				} ],

			});

			Ext
					.get('submit')
					.on(
							'click',

							function(e) {

								var name = Ext.getCmp('name').getValue();
								var document = Ext.getCmp('document')
										.getValue();
								var forPay = Ext.getCmp('forPay').getValue();
								var type1 = Ext.getCmp('type1').getValue();
								var type2 = Ext.getCmp('type2').getValue();
								Ext.MessageBox
										.confirm(
												'Acception',
												'คุณ'
														+ ' '
														+ name
														+ ' '
														+ 'แน่ใจว่าจะส่งเอกสารนี้ไปยังผู้ดูแล  ?',
												confirmFunction);

								function confirmFunction(btn) {
									if (btn == 'yes') {

										if (Ext.isEmpty(document)) {
											Ext.Msg.alert('Information',
													'กรุณากรอกเอกสารแนบ');
										} else if (Ext.isEmpty(forPay)) {
											Ext.Msg.alert('Information',
													'กรุณากรอกข้อมูลเพื่อชำระ');
										} else if (Ext.isEmpty(type1)) {
											Ext.Msg
													.alert('Information',
															'กรุณาเลือกประเภทการจ่ายเงิน');
										} else if (Ext.isEmpty(type2)) {
											Ext.Msg
													.alert('Information',
															'กรุณาเลือกประเภทการจ่ายเงิน');
										} else {
											param2.status = "002";
											saveOrUpdate();
										}
									}
								}
							});

			Ext
					.get('print')
					.on(
							'click',
							function(e) {

								Ext.MessageBox.confirm('Confirmation',
										'ยืนยันข้อมูลถูกต้อง ?',
										confirmFunction);

								function confirmFunction(btn) {
									if (btn == 'yes') {
										// var param3 = {};
										var noDoc = Ext.getCmp('no').getValue();
										// var noDoc = SCF01Domain.no; //ลองดู
										// param3.no = "no001";

										var urlPreviwPage = "/TransportationAllowance/jasperReport.pdf?docNo="
												+ noDoc;
										// window.location.assign("/TransportationAllowance/jasperReport.pdf?docNo=56000");
										window.location.assign(urlPreviwPage);
									}
								}

							});

		});
