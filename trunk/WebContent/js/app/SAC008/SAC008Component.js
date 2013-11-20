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
		param.accountId = ""; 
//		if (!Ext.isEmpty(rowSelected)) {
			Ext.MessageBox.confirm('ยืนยันการทำรายการ', '\"ลบ\" ข้อมูลที่เลือก', function(btn) {
				if (btn == 'yes') {		
					for (var i=0;i<rowSelected.length;i++) {
						param.accountId += rowSelected[i].data.accountId+","; // concat accountId //
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
					var sm = SAC008C.grid.getSelectionModel().getSelections();			
					var numberSelect = rowSelected.length;
					var lastIndex = sm.length - 1;
					var getValueLastIndex = SAC008C.grid.getStore().getAt(lastIndex).data.no;
					var u = getValueLastIndex - numberSelect;
					var detroyNumber = 0;
					SAC008C.grid.store.getAt(lastIndex).set('no', u);
					for (var j = lastIndex; j >= 0; j--) {
						if (j == lastIndex) {	}			
						detroyNumber = u - j;
						if(detroyNumber == 0){
							SAC008C.grid.store.getAt(lastIndex - j).set('no',detroyNumber+1);
						}						
						else{
							SAC008C.grid.store.getAt(lastIndex - j).set('no',detroyNumber);
						}
					}
					SAC008C.grid.store.getAt(0).set('no',1);
					SAC008C.grid.getSelectionModel().selectAll();
			var totalLength = SAC008C.grid.getSelectionModel().getSelections();
			for (var i = 0; i <= totalLength.length - 1; i++) {		
				SAC008C.grid.getSelectionModel().deselectRow(i);
			}
			for (var j = 0; j <= sm.length - 1; j++) {
				SAC008C.grid.getSelectionModel().deselectRow(j);
			}
				}
			});
//		} else {
//			Ext.Msg.alert('Warning', 'กรุณาเลือกข้อมูลที่จะลบ');
//		}
		
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
						for (var i=0;i<rowSelected.length;i++) {
							paramConfirmSave.accountId +=   rowSelected[i].data.no+","+
															rowSelected[i].data.accountId+","+
															rowSelected[i].data.accountName+","+
															rowSelected[i].data.debit+","+
															rowSelected[i].data.credit+"!"; // concat accountId //
						}	
						paramConfirmSave.method = "gridSaveData";					
						Ext.Ajax.request({
							url : '/TransportationAllowance/SAC008.html',
							params : paramConfirmSave,
							success : function(response, opts) {
								if (paramConfirmSave != null) {
									Ext.Msg.alert('สถานะ', 'ทำรายการสำเร็จ');
								} else {
									Ext.Msg.alert('Information', 'Error ติดต่อผู้ดูแลระบบ');
								}
							},
							failure : function(response, opts) {
								Ext.Msg.alert('ERROR', 'Error.');
							}
						});
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
			header : 'รหัสบัญชี',
			dataIndex : 'accountId',
			align : 'center',
			type : 'date',
			editor : new Ext.form.TextField({
				id : 'accout',
				maxLength: 20,
                allowBlank: false
			}),		
			width : 132,
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
//			xtype: 'checkcolumn',
			header : 'เดบิต',
			dataIndex : 'debit',
			align : 'center',
			id : 'region',
			width : 50,
			 renderer: function (value, meta, record) {
	                return '<center><input type="checkbox" name="checkbox1"' + (value ? 'checked' : '') + ' onclick="var s = Ext.getCmp(\'button-grid\').store; s.getAt(s.findExact(\'id\',\'' + record.get('id') + '\')).set(\'isFull\', this.value)"'
	            },
		
		},{
//			xtype: 'checkcolumn',
			header : 'เครดิต',
			dataIndex : 'credit',
			align : 'center',
			width : 50,
			renderer: function (value, meta, record) {
                return '<center><input type="checkbox" name="checkbox2"' + (value ? 'checked' : '') + ' onclick="var s = Ext.getCmp(\'button-grid\').store; s.getAt(s.findExact(\'id\',\'' + record.get('id') + '\')).set(\'isFull\', this.value)"'
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
	}, {
		name : 'accountId'
	}, {
		name : 'accountName'
	}, {
		name : 'debit'
	}, {
		name : 'credit', type: 'bool'
	}],
	model : 'ForumThread',
	remoteSort : true
});

SAC008C.grid = new Ext.ss.grid.EditorGridPanel({
	id : 'idGridSAC008C',
	store : SAC008C.gridStrore,
	sm : SAC008C.checkboxselection,
	columns : SAC008C.gridColumns,
	columnLines : true,
	width:805,
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
	tbar : [ SAC008C.gridAddBtn, '-', SAC008C.gridRemoveBtn,'-',SAC008C.gridSaveBtn ]
});

