//var SAC008C = {};
//
//SAC008C.gridStore = new Ext.data.JsonStore({
//	baseParams : {
//		method : 'gridDataStore'
//	},
//	url : '/TransportationAllowance/SAC008.html',
//	method : 'POST',
//	pageSize : 10,
//	storeId : 'gridStore',
//	root : 'records',
//	idProperty : 'no',
//	autoLoad : true,
//	fields : [ {
//		name : 'no'
//	}, {
//		name : 'accountId'
//	}, {
//		name : 'accountName'
//	}, {
//		name : 'debit'
//	}, {
//		name : 'credit'
//	}],
//	model : 'ForumThread',
//	remoteSort : true
//
//});
//
//SAC008C.gridAddBtn = new Ext.Toolbar.Button({
//	// text:RMP001AButton.Add,
//	tooltip : 'Add a new item',
//	iconCls : 'add',
//	// disabled : false,
//	privilage : "educationAddBtn",
//	handler : function() {
//		SAC008C.grid.getSelectionModel().selectAll();
//
//		var sm = SAC008C.grid.getSelectionModel().getSelections();
//
//		SAC008C.grid.addRow();
//
//		var i = 1 + sm.length - 1;
////		var uu = SAC008C.grid.getStore().getAt(i).data.no;
//
////		SAC008C.grid.store.getAt(i).set('no',i + 1);
//		for (var j = 0; j <= sm.length - 1; j++) {
//
//			SAC008C.grid.getSelectionModel().deselectRow(j);
//		}
//	}
//
//});
//
//SAC008C.sm2 = new Ext.grid.CheckboxSelectionModel({
//    listeners: {
//        // On selection change, set enabled state of the removeButton
//        // which was placed into the GridPanel using the ref config
//        selectionchange: function(sm) {
//            if (sm.getCount()) {
//            	SAC008C.grid.SAC008CRemoveButton.enable();                    
//            } else {
//            	SAC008C.grid.SAC008CRemoveButton.disable();
//            }
//        }
//    }
//}); 
//
//SAC008C.groupHeaderPlugins = new Ext.ux.plugins.GroupHeaderGrid({
//	rows : [[ {},{}, {}, {}, {
//		header : "การเดินทาง",
//		colspan : 2,
//		align : 'center'
//	}] ],
//	hierarchicalColMenu: true
//}); 
//
/////////////////////////////////////////
////DumyData
/////////////////////////////////////////
////// Array data for the grids
//SAC008C.reader = new Ext.data.ArrayReader({}, [
//	{name: 'no'},
//	{name: 'docNo', type: 'float'},
//	{name: 'docDate', type: 'float'},
//	{name: 'sendDate', type: 'float'},
//	{name: 'approve', type: 'date', dateFormat: 'n/j h:ia'},
//	{name: 'industry'},
//	{name: 'desc'}
//]);
//
//SAC008C.grid = new Ext.grid.GridPanel({
//    id:'idGridSAC008C',
//    columnLines : true,
//	lazyRender : true,
//	autoSelect : true,
//	criterionField : true,
//	selectOnFocus : true,
//	typeAhead : true,
//	forceSelection : true,
//	triggerAction : 'all',
//	trackMouseOver : false,
//	disableSelection : true,
//	loadMask : true,
////	plugins : [ SAC008C.groupHeaderPlugins ],
//	store:SAC008C.gridStore,//Ok
//    cm: new Ext.grid.ColumnModel([
//        SAC008C.sm2,
//        {id:'no',header: "ลำดับ", width: 10, sortable: true,align : 'center',
//        	editor: {
//        		allowBlank: false
//        	}, 
//        	dataIndex: 'no'},
//        {header: "รหัสบัญชี", width: 20, sortable: true, dataIndex: 'accountId',editor : new Ext.form.TextField({
//			id : 'accout'
//		})},
//        {header: "ชื่อบัญชี", width: 20, sortable: true, dataIndex: 'accountName'},
//        {header: "เดบิต", width: 20, sortable: true, dataIndex: 'debit'},
//        {header: "เครดิต", width: 20, sortable: true,  dataIndex: 'credit'}        
//    ]),
//    sm: SAC008C.sm2,
//
//    viewConfig: {
//        forceFit:true
//    },
//    columnLines: true,
//
//    // inline toolbars
//    tbar:[SAC008C.gridAddBtn,{
//	        text:'Remove',
//	        tooltip:'Remove',
//	        iconCls:'remove',
//	        // Place a reference in the GridPanel
//	        ref: '../SAC008CRemoveButton',
//	        disabled: true
//	    },{
//	        text:'Save',
//	        tooltip:'Save',
//	        iconCls:'save',
//	        // Place a reference in the GridPanel
//	        ref: '../SAC008CSaveButton',
//	        disabled: false
//	    }],
//
//	    
//    width:805,
//    height:300,
//    frame:false,
//    border:true,	
//    iconCls:'icon-grid',
////    renderTo: document.body
//});
//
//////////////////////////////////////////////////////////
////Field Set for Body SAC008C
/////////////////////////////////////////////////////////
//SAC008C.fieldSetBody = new Ext.form.FieldSet({
//	collapsible : false,
//	title : 'จัดการข้อมูลบัญชี',
//	border : true,
//	layout : 'column',
//	width : 827,
//	defaults : {
//		xtype : 'container',
//		layout : 'form',
//		columnWidth : 1
//	},
//
//	items : [{
//				items : SAC008C.grid
//			}]
//});
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
								Ext.Msg.alert('สถานะ', 'ลบข้อมูล เรียบร้อยแล้ว');
							} else {
								Ext.Msg.alert('สถานะ', 'Error');
							}
						},
						failure : function(response, opts) {
							Ext.Msg.alert('ERROR', 'Error.');
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
							var debit = Ext.getDom('checkDebit'+(i+1)).checked;
							var credit = Ext.getDom('checkCredit'+(i+1)).checked;
							if( accountId == "undefined" || accountId == null || accountId == "" ||
								accountName == "undefined" || accountName == null || accountName == "" ||
								(!(debit || credit))){
								/////////////////// operation ////////
									Ext.Msg.alert('สถานะ', 'กรอกข้อมูลไม่ถูกต้อง ');
									sendStatus = false;// set No request
									break;
								
								}else{
									paramConfirmSave.accountId +=   rowSelected[i].data.code+","+
																	rowSelected[i].data.accountId+","+
																	rowSelected[i].data.accountName+","+
																	Ext.getDom('checkDebit'+(i+1)).checked+","+
																	Ext.getDom('checkCredit'+(i+1)).checked+"!"; // concat accountId //
								}							
						}	
						
						if(sendStatus){// check for request
							paramConfirmSave.method = "gridSaveData";
							Ext.Ajax.request({
								url : '/TransportationAllowance/SAC008.html',
								params : paramConfirmSave,
								success : function(response, opts) {
									if (paramConfirmSave != null) {
										Ext.Msg.alert('สถานะ', 'ทำรายการสำเร็จ');
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
	                return '<center><input type="checkbox" id="'+idNameDebit+'" name="checkbox1"' + (value ? 'checked' : '') + ' onclick=" "';
	            },
		
		},{
			header : 'เครดิต',
			dataIndex : 'credit',
			align : 'center',
			width : 50,
			renderer: function (value, meta, record) {
//                return '<center><input type="checkbox" name="checkbox2"' + (value ? 'checked' : '') + ' onclick="var s = Ext.getCmp(\'button-grid\').store; s.getAt(s.findExact(\'id\',\'' + record.get('id') + '\')).set(\'isFull\', this.value)"'//old
				var idNameCredit = "checkCredit"+record.data.no;
				return '<center><input type="checkbox" id="'+idNameCredit+'" name="checkbox2"' + (value ? 'checked' : '') + ' onclick=" "';
            },
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
											});
											//Change When click debit column
											var cellValueCredit = store.get('credit');
									    	var initialValueCredit = cellValueCredit;
									    	Ext.getDom('checkCredit'+i).checked = true;	
										    Ext.getDom('checkCredit'+i).checked = false;
										    
										    Ext.getDom('checkDebit'+i).checked = true;
											Ext.getDom('checkCredit'+i).checked = false;
									    }else if(columnName == 'credit'){
									    	//Change When click Checkbox
											Ext.get('checkCredit'+i).on('click',function(e) {						
												Ext.getDom('checkDebit'+i).checked = false;
												Ext.getDom('checkCredit'+i).checked = true;	
											});
											//Change When click Debit Column
										    var cellValueDebit = store.get('debit');
									    	var initialValueDebit = cellValueDebit;
									    	cellValue=false;
									    	Ext.getDom('checkDebit'+i).checked = true;	
									    	Ext.getDom('checkDebit'+i).checked = false;
									    	Ext.getDom('checkDebit'+i).checked = false;
											Ext.getDom('checkCredit'+i).checked = true;
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
	width:858,
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
	 	'cellclick' : SAC008C.validateCheckbox
	}
});

