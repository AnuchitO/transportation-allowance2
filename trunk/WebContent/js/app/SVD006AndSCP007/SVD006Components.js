var SVD006C = {};

SVD006C.No = new Ext.form.TextField({
	id : 'no',
	fieldLabel : "No",

});
SVD006C.date = new Ext.form.TextField({
	id : 'date',
	fieldLabel : "วันที่รับเอกสาร",
});

SVD006C.name = new Ext.form.TextField({
	id : 'name',
	fieldLabel : "ชื่อ - สกุล",
});

SVD006C.id = new Ext.form.TextField({
	id : 'id',
	fieldLabel : "รหัสพนักงาน",
});

SVD006C.company = new Ext.form.TextField({
	id : 'company',
	fieldLabel : "บริษัท",

});

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
	// fieldLabel : 'comboStrore',
	fields : [ {
		name : 'code'

	}, {
		name : 'description'
	} ],
	model : 'ForumThread',
	remoteSort : true
});

SVD006C.createCombobox = new Ext.form.ComboBox({
	id : 'antecedent',
	fieldLabel : 'ฝ่าย / แผนก',
	mode : 'local',
	store : SVD006C.comboboxStore,
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
SVD006C.idCardEmp = new Ext.form.TextField({
	id : 'idCardEmp',
	fieldLabel : "รหัสประจำตัวประชาชน",
	width:250

});

SVD006C.textArea = new Ext.ss.form.TextArea({
	fieldLabel : 'ที่อยู่',
	id : 'address',
	width : 600,
	bodyPadding : 10,

});

SVD006C.comboboxStoreA = new Ext.data.JsonStore({
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
SVD006C.createComboboxA = new Ext.form.ComboBox({
	fieldLabel : 'จังหวัด',
	id : 'antercedentA',
	width : 120,
	store : SVD006C.comboboxStoreA,
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

SVD006C.phone = new Ext.form.TextField({
	id : 'phone',
	fieldLabel : "เบอร์โทร",
	width : 120

});

SVD006C.email = new Ext.form.TextField({
	id : 'email',
	fieldLabel : "E-mail",
	width : 200

});

// /////////////////////set Field/////////////////////////
SVD006C.No.setValue(SVD006Domain.no);
SVD006C.date.setValue(SVD006Domain.date);
SVD006C.name.setValue(SVD006Domain.name);
SVD006C.id.setValue(SVD006Domain.id);
SVD006C.company.setValue(SVD006Domain.company);
SVD006C.textArea.setValue(SVD006Domain.address);
SVD006C.phone.setValue(SVD006Domain.phone);
SVD006C.email.setValue(SVD006Domain.email);
SVD006C.createCombobox.setValue(SVD006Domain.antecedent);
SVD006C.createComboboxA.setValue(SVD006Domain.antercedentA);
SVD006C.idCardEmp.setValue(SVD006Domain.idCard);

var inti = 1;
SVD006C.gridAddBtn = new Ext.Toolbar.Button({
	tooltip : 'Add a new item',
	iconCls : 'add',
	privilage : "educationAddBtn",
	handler : function() {

		Ext.getCmp('gridEducationInfomation').addRow();

		Ext.getCmp('editNo').setValue(inti++);
	}

});
SVD006C.gridRemoveBtn = new Ext.Toolbar.Button({
	tooltip : 'Remove the selected item',
	iconCls : 'remove',
	disabled : false,
	handler : function() {
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
SVD006C.gridCopyBtn = new Ext.Toolbar.Button(
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
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}
var param2 = {};
function saveOrUpdate(){

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
param2.accountNumber = Ext.getCmp('accountNumber')
		.getValue();
param2.typeAccount = Ext.getCmp('typeAccount')
		.getValue();
param2.type1 = Ext.getCmp('type1').getValue();
param2.type2 = Ext.getCmp('type2').getValue();


// ************************** get value to controller by
// Grid ***************************//

SVD006C.createGrid.getSelectionModel().selectAll();

var sm = SVD006C.createGrid.getSelectionModel().getSelections();
param2.pack = "";

for (var i = 0; i <= sm.length - 1; i++) {
	param2.dataGridNo = SVD006C.createGrid.getStore().getAt(i).data.no;
	param2.dataGridData = SVD006C.createGrid.getStore().getAt(i).data.gridDate;
	param2.dataGridCustomer = SVD006C.createGrid.getStore().getAt(i).data.customer;
	param2.dataGridRegion = SVD006C.createGrid.getStore().getAt(i).data.region;
	param2.dataGridGoal = SVD006C.createGrid.getStore().getAt(i).data.goal;
	param2.dataGridPaymentTravel = SVD006C.createGrid.getStore().getAt(i).data.paymentTravel;
	param2.dataGridPaymentD = SVD006C.createGrid.getStore().getAt(i).data.paymentD;
	param2.dataGridPayment = SVD006C.createGrid.getStore().getAt(i).data.payment;
	param2.dataRemark = SVD006C.createGrid.getStore().getAt(i).data.remark;
	SVD006C.createGrid.getSelectionModel().deselectRow(i);
	param2.pack += 	param2.dataGridNo+","+
					param2.dataGridData+","+
					param2.dataGridCustomer+","+
					param2.dataGridRegion+","+
					param2.dataGridGoal+","+						
					param2.dataGridPaymentTravel+","+
					param2.dataGridPaymentD+","+
					param2.dataGridPayment+","+
					param2.dataRemark+"!";
}
param2.method = "save1";
Ext.Ajax.request({
	url : '/TransportationAllowance/SCF003.html',
	params : param2,
	success : function(response, opts) {
		if (param2 != null) {
			Ext.Msg.alert('Information','บันทึกเรียบร้อย');
		} else {
			Ext.Msg.alert('Information', 'Error');
		}
	},
	failure : function(response, opts) {
		Ext.Msg.alert('ERROR', 'Error.');
	}
});
}

SVD006C.gridSaveBtn = new Ext.Toolbar.Button(
		{
			tooltip : 'Save',
			iconCls : 'save',
			disabled : false,
			handler : function() {
				Ext.MessageBox.confirm('Confirmation', 'ยืนยันข้อมูลถูกต้อง ? <br/>เอกสารของคุณจะอยู่ในสถานะ \"บันทึก\"',
						confirmFunction);
				function confirmFunction(btn) {
					if (btn == 'yes') {
						param2.status = "001";
						
						saveOrUpdate();
						
						
				}
			}
			}
		

		});

SVD006C.comboCustomerStoreGrid = new Ext.data.JsonStore({
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

SVD006C.comboCustomerGrid = new Ext.form.ComboBox({
	id : 'comboCustomerGrid',
//	fieldLabel : 'ฝ่าย / แผนก',
	mode : 'local',
	store : SVD006C.comboCustomerStoreGrid,
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
SVD006C.checkboxselection = new Ext.grid.CheckboxSelectionModel({
	singleSelect : false,

// email: true,
// dataIndex: 'chkFlag'
});

SVD006C.gridColumns = [
		SVD006C.checkboxselection,

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

			}),
			menuDisabled : true,
			renderer : Ext.util.Format.dateRenderer('d/m/Y'),
			width : 87.08,

		},
		{
			header : 'ลูกค้า',
			dataIndex : 'customer',
			align : 'center',
			editor :SVD006C.comboCustomerGrid,
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
								SVD006C.createGrid.getSelectionModel()
										.selectAll();
								var totalLength = SVD006C.createGrid
										.getSelectionModel().getSelections();
								var a = 0;
								var totalPaymentTravel = 0;
								var c = 0;
								for (var i = 0; i <= totalLength.length - 1; i++) {
									var test = SVD006C.createGrid.getStore()
											.getAt(i).data.paymentD;
									if (Ext.isEmpty(test)) {
										totalPaymentTravel = parseInt(SVD006C.createGrid
												.getStore().getAt(i).data.paymentTravel);
										SVD006C.createGrid.store.getAt(i).set(
												'payment', totalPaymentTravel);
										SVD006C.createGrid.store.getAt(i).set(
												'paymentD', "0");
										
										a = a
												+ parseInt(SVD006C.createGrid
														.getStore().getAt(i).data.paymentTravel);
										SVD006C.tatolPaym.setValue(a);
										c = c
												+ parseInt(SVD006C.createGrid
														.getStore().getAt(i).data.payment);
										SVD006C.tatolPaymfullCase.setValue(c);
										SVD006C.createGrid.getSelectionModel()
												.deselectRow(i);
									} else {

										totalPaymentTravel = parseInt(SVD006C.createGrid
												.getStore().getAt(i).data.paymentTravel)
												+ parseInt(SVD006C.createGrid
														.getStore().getAt(i).data.paymentD);
										SVD006C.createGrid.store.getAt(i).set(
												'payment', totalPaymentTravel);
										a = a
												+ parseInt(SVD006C.createGrid
														.getStore().getAt(i).data.paymentTravel);
										SVD006C.tatolPaym.setValue(a);
										c = c
												+ parseInt(SVD006C.createGrid
														.getStore().getAt(i).data.payment);
										SVD006C.tatolPaymfullCase.setValue(c);
										SVD006C.createGrid.getSelectionModel()
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
								SVD006C.createGrid.getSelectionModel()
										.selectAll();
								var totalLength = SVD006C.createGrid
										.getSelectionModel().getSelections();
								var b = 0;
								var totalPayment = 0;
								var c = 0;
								for (var i = 0; i <= totalLength.length - 1; i++) {
									var test = SVD006C.createGrid.getStore()
											.getAt(i).data.paymentTravel;
									if (Ext.isEmpty(test)) {
										test = 0;
										totalPayment = parseInt(SVD006C.createGrid
												.getStore().getAt(i).data.paymentD)
												+ parseInt(test);
										SVD006C.createGrid.store.getAt(i).set(
												'payment', totalPayment);
										SVD006C.createGrid.store.getAt(i).set(
												'paymentTravel', "0");
										b = b
												+ parseInt(SVD006C.createGrid
														.getStore().getAt(i).data.paymentD);

										SVD006C.tatolPaymA.setValue(b);
										c = c
												+ parseInt(SVD006C.createGrid
														.getStore().getAt(i).data.payment);
										SVD006C.tatolPaymfullCase.setValue(c);

										SVD006C.createGrid.getSelectionModel()
												.deselectRow(i);
									} else {
										totalPayment = parseInt(SVD006C.createGrid
												.getStore().getAt(i).data.paymentTravel)
												+ parseInt(SVD006C.createGrid
														.getStore().getAt(i).data.paymentD);
										SVD006C.createGrid.store.getAt(i).set(
												'payment', totalPayment);
										b = b
												+ parseInt(SVD006C.createGrid
														.getStore().getAt(i).data.paymentD);

										SVD006C.tatolPaymA.setValue(b);
										c = c
												+ parseInt(SVD006C.createGrid
														.getStore().getAt(i).data.payment);
										SVD006C.tatolPaymfullCase.setValue(c);

										SVD006C.createGrid.getSelectionModel()
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

SVD006C.groupHeaderPlugins = new Ext.ux.plugins.GroupHeaderGrid({
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

SVD006C.gridStrore = new Ext.data.JsonStore({
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

SVD006C.totalManey = new Ext.form.TextField({
	id : 'tatolManey',
	fieldLabel : "จำนวนเงินเป็นตัวอักษร",
	width : 300

});
SVD006C.totalManey.setValue(SVD006Domain.tatolManey);
SVD006C.document = new Ext.form.TextField({
	id : 'document',
	fieldLabel : "เอกสารแนบ",
	width : 120

});
SVD006C.forPay = new Ext.form.TextField({
	id : 'forPay',
	fieldLabel : "ใบ เพื่อชำระ",
	width : 400

});
SVD006C.bank = new Ext.form.TextField({
	id : 'bank',
	fieldLabel : "บัญชีธนาคาร",
	width : 120

});
SVD006C.branch = new Ext.form.TextField({
	id : 'branch',
	fieldLabel : "สาขา",
	width : 240

});
SVD006C.accountNumber = new Ext.form.TextField({
	id : 'accountNumber',
	fieldLabel : "เลขที่บัญชี",
	width : 240

});
SVD006C.typeAccount = new Ext.form.TextField({
	id : 'typeAccount',
	fieldLabel : "ประเภทบัญชี",
	width : 240

});
SVD006C.textLabel = new Ext.form.Label({
	fieldLabel : "ได้รับ"
});

SVD006C.checkBox1 = new Ext.form.Checkbox({
	id : 'type1',
	name : 'name',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'เงินสด',
	fieldLabel : 'text'
});

SVD006C.checkBox2 = new Ext.form.Checkbox({
	id : 'type2',
	name : 'name',
	labelSeparator : '',
	hideLabel : true,
	boxLabel : 'เช็คธนาคาร',
	fieldLabel : 'text'
});


////////   Group Approve Check box
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


//SVD006C.checkboxGroup = new Ext.form.CheckboxGroup({
//    columns: 1,
//    vertical: true,
//    items: [
//        {name: 'cbg1', boxLabel: "Value 1"},
//        {name: 'cbg1', boxLabel: "Value 2"},
//    ]
//});

//SVD006C.checkboxGroup = new Ext.form.CheckboxGroup({
//    columns: 1,
//    cls: 'field-margin',
//    vertical: true,
//    items: [
//        {boxLabel: "Value 12", name :"checkNong", inputValue: 1},
//        {boxLabel: "Value 2", name :"checkNong", inputValue: 2}
//    ]
//});

SVD006C.checkboxGroup = new Ext.form.CheckboxGroup({
    id:'myGroup',
    xtype: 'checkboxgroup',
    fieldLabel: 'Single Column',
    itemCls: 'x-form-item',
    // Put all controls in a single colusmn with width 100%
    columns: 1,
    items: [
        {boxLabel: 'Item 121', name: 'cb-col-1'},
        {boxLabel: 'Item 212', name: 'cb-col-1', checked: true},
        {boxLabel: 'Item 312', name: 'cb-col-1'}
    ]
});

// ******************** set Value *****************//
SVD006C.bank.setValue(SVD006Domain.bank);
SVD006C.branch.setValue(SVD006Domain.branch);
SVD006C.accountNumber.setValue(SVD006Domain.accountNumber);
SVD006C.typeAccount.setValue(SVD006Domain.typeAccount);
SVD006C.createButtonSubmit = new Ext.Button({
	id : 'submit',
	text : 'Submit',
	width : 100
});

SVD006C.createButtonBack = new Ext.Button({
	id : 'back',
	text : 'Back',
	width : 100
});


SVD006C.tatolPaym = new Ext.form.TextField({
	id : 'tatolPaym',
	width : 80

});
SVD006C.tatolPaymA = new Ext.form.TextField({
	id : 'tatolPaymA',

	width : 80

});
SVD006C.tatolPaymfullCase = new Ext.form.TextField({
	id : 'tatolPaymfullCase',

	width : 80,

});
////////////////////////Begin Debug Start//////////////////
SVD006C.createGrid = new Ext.ss.grid.EditorGridPanel({
	id : 'gridEducationInfomation',
	store : SVD006C.gridStrore,
	sm : SVD006C.checkboxselection,
	columns : SVD006C.gridColumns,
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

	plugins : [ SVD006C.groupHeaderPlugins ],
	clicksToEdit : 1,
	tbar : [ SVD006C.gridAddBtn, '-', SVD006C.gridRemoveBtn, '-',
			SVD006C.gridCopyBtn, '-', SVD006C.gridSaveBtn ],
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
				'-', SVD006C.tatolPaym, '-', SVD006C.tatolPaymA, '-',
				SVD006C.tatolPaymfullCase ]
	})
});


////Field Set on tab ใบเบิกเงิน
///Fiels Set Grid
SVD006C.fieldSetGrid = new Ext.form.FieldSet({
	collapsible : false,
	title : 'รายละเอียดการเดินทาง',
	border : true,
	layout : 'column',
	width : 827,
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [{
				items : SVD006C.createGrid
			}]
});


// field set Information
SVD006C.fieldSetInformation = new Ext.form.FieldSet({
	collapsible : false,
	title : 'ข้อมูลส่วนตัว',
	border : true,
	layout : 'column',
	width : 827,
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [{
				items : SVD006C.No,
				labelAlign : 'right',
				style : {
					"margin-left" : "550px",	
				}
			}, {
				columnWidth : 1,
				items : SVD006C.date,
				labelAlign : 'right',
				style : {
					"margin-left" : "550px"		
				}
			},{
				columnWidth : 0.5,
				items : SVD006C.name,
				labelAlign : 'right'
			}, {
				columnWidth : 0.5,
				items : SVD006C.id,
				labelAlign : 'right'

			}, {
				columnWidth : 0.5,
				items : SVD006C.company,
				labelAlign : 'right'
			}, {
				columnWidth : 0.5,
				items : SVD006C.createCombobox,
				labelAlign : 'right'
			},{
				columnWidth : 1,
				items : SVD006C.idCardEmp,
				labelAlign : 'right'
			}, {
				columnWidth : 1,
				items : SVD006C.textArea,
				labelAlign : 'right'
			}, {
				columnWidth : 0.3,
				items : SVD006C.createComboboxA,
				labelAlign : 'right'
			}, {
				columnWidth : 0.3,
				items : SVD006C.phone,
				labelAlign : 'right'
			}, {
				columnWidth : 0.4,
				items : SVD006C.email,
				labelAlign : 'right'
			}]
});

//Field Set Approving
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

	items : [{
				items : SVD006C.checkBoxApprove
			},{
				items : SVD006C.checkBoxRefused
			},{
				items : SVD006C.checkBoxCancel
			},{
				items : SVD006C.checkboxGroup 
			}]
});


///Field Set Grid
SVD006C.feildSetBottom = new Ext.form.FieldSet({
	collapsible : false,

	border : true,
	width : 827,
	layout : 'column',

	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [ {
				columnWidth : 1,
				items : SVD006C.totalManey,
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
				items : SVD006C.checkBox1,
		
			}, {
				columnWidth : 0.75,
				items : SVD006C.checkBox2,
		
			},{
				items : SVD006C.fieldSetApproving,
				style : {
					"margin-left" : "0px",
					"position":"relative",
					"left": "200px", 
					"top": "0px"
				}
			}]
});

SVD006C.tabPanelSVD006 = new Ext.Panel({
	autoWidth: true,
	autoHeight: true,
	border : false,
	hideBorders : true,
	layout:'column',
    items: [{
    			items : SVD006C.fieldSetInformation
    		},{
    			items : SVD006C.fieldSetGrid 
    		},{
    			items : SVD006C.feildSetBottom
    		}]    
});





///////// Tab Panel  //////
SVD006C.tabPanel = new Ext.TabPanel({
	autoHeight:true,
	autoWidth:true,
	activeTab:0,
	padding:5,
	border:true,
	style:{
		"margin-left": "auto",
		"margin-right":"auto",
		"margin-top":"auto",
		"padding-top":"auto"
	},
	items:[{
			title:'ใบเบิกเงิน',
			items:SVD006C.tabPanelSVD006
		},{
			title:'ใบสำคัญจ่าย',
			items:SCP007C.test
		}]
});

