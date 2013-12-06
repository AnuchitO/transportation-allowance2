var SAC008C = {};
SAC008C.labHeader = new Ext.form.Label({
	id : "labHeader",
	text : "จัดการข้อมูลบัญชี",
	style : {
		"font-size" : "150%",
		"font-align" : "center"
	},
	anchor : '93%'
});
SAC008C.createButtonBack = new Ext.Button({
	id : 'back',
	text : 'Back',
	width : 100
});
////////////////////////////////////
//Event Button Add Row Grid
///////////////////////////////////
SAC008C.gridAddBtn = new Ext.Toolbar.Button({
	text:'Add',
	tooltip : 'Add item',
	iconCls : 'add',
	privilage : "educationAddBtn",
	handler : function() {
		SAC008C.grid.getSelectionModel().selectAll();
		var sm = SAC008C.grid.getSelectionModel().getSelections();
		Ext.getCmp('idGridSAC008C').addRow();
		var i = 1 + sm.length - 1;
		var uu = SAC008C.grid.getStore().getAt(i).data.no;
		SAC008C.grid.store.getAt(i).set('no',i + 1);
		SAC008C.grid.store.getAt(i).set('code','auto');
		for (var j = 0; j <= sm.length - 1; j++) {
			SAC008C.grid.getSelectionModel().deselectRow(j);
		}
	}

});

/////////////////////////////////////////////////
////Event RemoveButton of grid
////////////////////////////////////////////////
SAC008C.gridRemoveBtn = new Ext.Toolbar.Button({
	text:'Remove',
    tooltip:'Remove',
    iconCls:'remove',
	disabled : true,
	handler : function() {	
		var rowSelected = Ext.getCmp('idGridSAC008C').getSelectionModel().getSelections();
		var param = {}; 
		param.code = ""; 
			Ext.MessageBox.confirm('ยืนยันการทำรายการ', '\"ลบ\" ข้อมูลที่เลือก', function(btn) {
				if (btn == 'yes') {	
					for (var i=0;i<rowSelected.length;i++) {
						param.code += rowSelected[i].data.code+","; // concat accountId //
						Ext.getCmp('idGridSAC008C').store.remove(rowSelected[i]);
					}
					////////////////////////////////////
					///Request for remove data in DB
					///////////////////////////////////
					param.method = "gridRemoveData";
					Ext.Ajax.request({
						url : '/TransportationAllowance/SAC008.html',
						params : param,
						success : function(response, opts) {
							if (param != null) {
//								Ext.Msg.alert('สถานะ', 'ลบข้อมูล เรียบร้อยแล้ว');
								Ext.MessageBox.show({
									title : 'สถานะ',
									msg : '<center>ลบข้อมูล เรียบร้อยแล้ว</center>',
									width : 200,
									buttons : Ext.MessageBox.OK,
									animEl : 'submit',
									fn :function(btn) {
											if (btn == 'ok') {
												/////  load Grid store  //////
												SAC008C.grid.store.reload({ //  reload grid store when click save button				                  
										                   params:{method : 'gridDataStore'}});
											}
										}
									});								
							} else {
//								Ext.Msg.alert('สถานะ', 'Error');
								
							}
						},
						failure : function(response, opts) {
//							Ext.Msg.alert('ERROR', 'Error.');
							Ext.MessageBox.show({
								title : 'สถานะ',
								msg : '<center>ไม่สามารถ ลบข้อมูลได้<br/>เนื่องจากข้อมูลนี้อาจถูกใช้งานอยู่</center>',
								width : 210,
								buttons : Ext.MessageBox.OK,
								animEl : 'submit',
								fn :function(btn) {
										if (btn == 'ok') {

										}
									}
								});	
							/////  load Grid store  //////
							SAC008C.grid.store.reload({ //  reload grid store when click save button				                  
					                   params:{method : 'gridDataStore'}});
						}
					});
					
					SAC008C.grid.getSelectionModel().selectAll();
					var sm = Ext.getCmp('idGridSAC008C').getSelectionModel().getSelections();			
					for (var i =0 ; i < sm.length; i++) {
						SAC008C.grid.store.getAt(i).set('no',i+1);
						SAC008C.grid.getSelectionModel().deselectRow(i);
					}
					
					
				}
			});
	
	}
});


/////////////////////////////////////////////////
////Event SaveButton of grid
////////////////////////////////////////////////
SAC008C.gridSaveBtn = new Ext.Toolbar.Button(
		{
			text:'Save',
	        tooltip:'Save',
	        iconCls:'save',
			disabled : false,
			handler : function() {				
				Ext.MessageBox.confirm('ยืนยันการทำรายการ','\"บันทึก\" การทำรายการ ',confirmFunction);				
				function confirmFunction(btn) {
					if (btn == 'yes') {
						var paramConfirmSave = {};
						paramConfirmSave.accountId ="";
						SAC008C.grid.getSelectionModel().selectAll();
						var rowSelected = Ext.getCmp('idGridSAC008C').getSelectionModel().getSelections();
						var sendStatus = true;
						for (var i=0;i<rowSelected.length;i++) {
							var accountId = rowSelected[i].data.accountId;
							var accountName = rowSelected[i].data.accountName;
							var debit = SAC008C.grid.getStore().getAt(i).data.debit;
							var credit = SAC008C.grid.getStore().getAt(i).data.credit;
							if( accountId == "undefined" || accountId == null || accountId == "" ||
								accountName == "undefined" || accountName == null || accountName == "" ||
								(!(debit || credit))){
								/////////////////// operation ////////
									Ext.Msg.alert('สถานะ', 'กรอกข้อมูลไม่ครบ');
									sendStatus = false;// set No request
									break;
								
								}else{
									paramConfirmSave.accountId +=   rowSelected[i].data.code+","+
																	rowSelected[i].data.accountId+","+
																	rowSelected[i].data.accountName+","+
																	SAC008C.grid.getStore().getAt(i).data.debit+","+
																	SAC008C.grid.getStore().getAt(i).data.credit+"!"; // concat accountId //
								}							
						}	
						
						if(sendStatus){// check for request
							paramConfirmSave.method = "gridSaveData";
							Ext.Ajax.request({
								url : '/TransportationAllowance/SAC008.html',
								params : paramConfirmSave,
								success : function(response, opts) {
									if (paramConfirmSave != null) {
										Ext.MessageBox.show({
											title : 'สถานะ',
											msg : '<center>ทำรายการสำเร็จ</center>',
											buttons : Ext.MessageBox.OK,
											width : 170,
											height: 80
										});
										/////  load Grid store  //////
										SAC008C.grid.store.reload({ //  reload grid store when click save button				                  
								                   params:{method : 'gridDataStore'}});
										
									} else {
										Ext.Msg.alert('Information', 'Error ติดต่อผู้ดูแลระบบ');
									}
								},
								failure : function(response, opts) {
									Ext.Msg.alert('ERROR', 'Error.');
								}
							});
						}			
						var sm = SAC008C.grid.getSelectionModel().getSelections();
						for (var j = 0; j <= sm.length - 1; j++) {
							SAC008C.grid.getSelectionModel().deselectRow(j);
						}

					}
				}
			}

		});


SAC008C.checkboxselection = new Ext.grid.CheckboxSelectionModel({
	singleSelect : false,
  listeners: {
  // On selection change, set enabled state of the removeButton
  // which was placed into the GridPanel using the ref config
  selectionchange: function(sm) {
      if (sm.getCount()) {
    	  SAC008C.gridRemoveBtn.enable();                    
      } else {
    	  SAC008C.gridRemoveBtn.disable();
      }
  	}
  }
});

SAC008C.gridColumns = [
		SAC008C.checkboxselection,
		{
			header : 'No',
			dataIndex : 'no',
			align : 'center',
			width : 50,
		},{
			header : 'Code',
			dataIndex : 'code',
			align : 'center',
			width : 50,
			hidden : true
		},{
			header : 'รหัสบัญชี',
			dataIndex : 'accountId',
			align : 'center',
//			editor : new Ext.form.TextField({
//				id : 'accout',
//				format:'00-00-000',
//				maxLength: 20,
//                allowBlank: false
//			}),
			xtype: 'numbercolumn', 
			decimalPrecision: 0,
		    format:'0',			
////		flex: 0,
			editor : new Ext.ss.form.NumberField(
					{
						id : 'accountNumberFormat',
						decimalPrecision: 0,
						format:'0',
						maxValue:9999999999999
					}),
			width : 132
		},{
			header : 'ชื่อบัญชี',
			dataIndex : 'accountName',
			align : 'left',
			editor : new Ext.form.TextField({
				id : 'accountNameId',
				maxLength: 150				
			}),
			width : 500
		},{
			header : 'เดบิต',
			dataIndex : 'debit',
			align : 'center',
			id : 'region',
			width : 50,
			 renderer: function (value, meta, record) {
				 	var idNameDebit = "checkDebit"+record.data.no;
	                return '<center><input type="checkbox" id="'+idNameDebit+'" name="checkbox1"' + (value ? 'checked' : '') + ' onclick=" "></center>';
	            },
		
		},{
			header : 'เครดิต',
			dataIndex : 'credit',
			align : 'center',
			width : 50,
			renderer: function (value, meta, record) {
				var idNameCredit = "checkCredit"+record.data.no;
				return '<center><input type="checkbox" id="'+idNameCredit+'" name="checkbox2"' + (value ? 'checked' : '') + ' onclick=" "></center>';
            }
		}
];

SAC008C.groupHeaderPlugins = new Ext.ux.plugins.GroupHeaderGrid({
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

SAC008C.gridStrore = new Ext.data.JsonStore({
	baseParams : {
		method : 'gridDataStore'
	},
	url : '/TransportationAllowance/SAC008.html',
	method : 'POST',
	pageSize : 10,
	storeId : 'gridStore',
	root : 'records',
	idProperty : 'code',
	autoLoad : true,
	fields : [ {
		name : 'no'
	},{ 
		name : 'code'
	}, {
		name : 'accountId'
	}, {
		name : 'accountName'
	}, {
		name : 'debit'
	}, {
		name : 'credit'
	}],
	model : 'ForumThread',
	remoteSort : true
});

/////////////////////////////////
//Event OnClick validateCheckBox
////////////////////////////////
SAC008C.validateCheckbox = function(grid, rowIndex, cellIndex, e){
							    var store = grid.getStore().getAt(rowIndex);
							    var columnName = grid.getColumnModel().getDataIndex(cellIndex);
							    var cellValue = store.get(columnName);
							    var i = rowIndex+1;
//							    Ext.MessageBox.confirm('ยืนยันการทำรายการ', 'เปลียนประเภทบัญชี', function(btn) {
//						    		if (btn == 'yes') {
									    if(columnName == 'debit'){    	
									    	//Change When click Checkbox
											Ext.get('checkDebit'+i).on('click',function(e) {
												Ext.getDom('checkDebit'+i).checked = true;
												Ext.getDom('checkCredit'+i).checked = false;
												SAC008C.grid.store.getAt(rowIndex).set('debit',true);
												SAC008C.grid.store.getAt(rowIndex).set('credit',false);
											});
											//Change When click debit column
											var cellValueCredit = store.get('credit');
									    	Ext.getDom('checkCredit'+i).checked = true;	
										    Ext.getDom('checkCredit'+i).checked = false;
										    
										    Ext.getDom('checkDebit'+i).checked = true;
											Ext.getDom('checkCredit'+i).checked = false;
											
											SAC008C.grid.store.getAt(rowIndex).set('debit',true);
											SAC008C.grid.store.getAt(rowIndex).set('credit',false);
									    }else if(columnName == 'credit'){
									    	//Change When click Checkbox
											Ext.get('checkCredit'+i).on('click',function(e) {						
												Ext.getDom('checkDebit'+i).checked = false;
												Ext.getDom('checkCredit'+i).checked = true;	
												SAC008C.grid.store.getAt(rowIndex).set('debit',false);
												SAC008C.grid.store.getAt(rowIndex).set('credit',true);
											});
											//Change When click Debit Column
										    var cellValueDebit = store.get('debit');
									    	var initialValueDebit = cellValueDebit;
									    	cellValue=false;
									    	Ext.getDom('checkDebit'+i).checked = true;	
									    	Ext.getDom('checkDebit'+i).checked = false;
									    	Ext.getDom('checkDebit'+i).checked = false;
											Ext.getDom('checkCredit'+i).checked = true;
											SAC008C.grid.store.getAt(rowIndex).set('debit',false);
											SAC008C.grid.store.getAt(rowIndex).set('credit',true);
									    }else{
									    	
									    }
//							    	}
//						    	});
							};

SAC008C.grid = new Ext.ss.grid.EditorGridPanel({
	id : 'idGridSAC008C',
	store : SAC008C.gridStrore,
	sm : SAC008C.checkboxselection,
	columns : SAC008C.gridColumns,
	columnLines : true,
	width:808,
	height:300,
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
//	plugins : [ SAC008C.groupHeaderPlugins ],
	clicksToEdit : 1,
	tbar : [ SAC008C.gridAddBtn, '-', SAC008C.gridRemoveBtn,'-',SAC008C.gridSaveBtn ],
	listeners : {
	 	'cellclick' : SAC008C.validateCheckbox,     		
	}
});
SAC008C.grid.on('keypress', function(e){
	if(e.getKey()==9){
		SAC008C.grid.getSelectionModel().selectAll();
		var sm = SAC008C.grid.getSelectionModel().getSelections();
		Ext.getCmp('idGridSAC008C').addRow();
		var i = 1 + sm.length - 1;
		SAC008C.grid.store.getAt(i).set('no',i + 1);
		SAC008C.grid.store.getAt(i).set('code','auto');
		for (var j = 0; j <= sm.length - 1; j++) {
			SAC008C.grid.getSelectionModel().deselectRow(j);
		}
	}
});

