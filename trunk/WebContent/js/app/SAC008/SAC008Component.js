var SAC008C = {};

SAC008C.gridStore = new Ext.data.JsonStore({
	baseParams : {
		method : 'gridDataStore'
	},
	url : '/TransportationAllowance/SAC008.html',
	method : 'POST',
	pageSize : 10,
	storeId : 'gridStore',
	root : 'records',
	idProperty : 'no',
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
		name : 'credit'
	}],
	model : 'ForumThread',
	remoteSort : true

});

SAC008C.sm2 = new Ext.grid.CheckboxSelectionModel({
    listeners: {
        // On selection change, set enabled state of the removeButton
        // which was placed into the GridPanel using the ref config
        selectionchange: function(sm) {
            if (sm.getCount()) {
            	SAC008C.grid.SAC008CRemoveButton.enable();                    
            } else {
            	SAC008C.grid.SAC008CRemoveButton.disable();
            }
        }
    }
}); 

SAC008C.groupHeaderPlugins = new Ext.ux.plugins.GroupHeaderGrid({
	rows : [[ {},{}, {}, {}, {
		header : "การเดินทาง",
		colspan : 2,
		align : 'center'
	}] ],
	hierarchicalColMenu: true
}); 

///////////////////////////////////////
//DumyData
///////////////////////////////////////
////Array data for the grids
SAC008C.reader = new Ext.data.ArrayReader({}, [
	{name: 'no'},
	{name: 'docNo', type: 'float'},
	{name: 'docDate', type: 'float'},
	{name: 'sendDate', type: 'float'},
	{name: 'approve', type: 'date', dateFormat: 'n/j h:ia'},
	{name: 'industry'},
	{name: 'desc'}
]);

Ext.grid.dummyData = [
  ['3m Co',71.72,0.02,0.03,'9/1 12:00am', 'Manufacturing'],
  ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am', 'Manufacturing'],
  ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am', 'Manufacturing'],
  ['American Express Company',52.55,0.01,0.02,'9/1 12:00am', 'Finance'],
  ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am', 'Services'],
  ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am', 'Services'],
  ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am', 'Manufacturing'],
  ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am', 'Services']
];


SAC008C.grid = new Ext.grid.GridPanel({
    id:'idGridSAC008C',
    columnLines : true,
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
	store:SAC008C.gridStore,//Ok
//	store: new Ext.data.Store({
//		reader: SAC008C.reader,
//		data: Ext.grid.dummyData
//	}),
    cm: new Ext.grid.ColumnModel([
        SAC008C.sm2,
        {id:'no',header: "ลำดับ", width: 10, sortable: true,align : 'center',
        	editor: {
        		allowBlank: false
        	}, 
        	dataIndex: 'no'},
        {header: "รหัสบัญชี", width: 20, sortable: true, dataIndex: 'accountId',editor : new Ext.form.TextField({
			id : 'accout',
		})},
        {header: "ชื่อบัญชี", width: 20, sortable: true, dataIndex: 'accountName'},
        {header: "เดบิต", width: 20, sortable: true, dataIndex: 'debit'},
        {header: "เครดิต", width: 20, sortable: true,  dataIndex: 'credit'}        
    ]),
    sm: SAC008C.sm2,

    viewConfig: {
        forceFit:true
    },
    columnLines: true,

    // inline toolbars
    tbar:[{
	        text:'Add',
	        tooltip:'Add item',
	        iconCls:'add',
	        // Place a reference in the GridPanel
	        ref: '../SAC008CAddButton',
	        disabled: false
	    },{
	        text:'Remove',
	        tooltip:'Remove the selected item',
	        iconCls:'remove',
	        // Place a reference in the GridPanel
	        ref: '../SAC008CRemoveButton',
	        disabled: true
	    },{
	        text:'Save',
	        tooltip:'Save',
	        iconCls:'save',
	        // Place a reference in the GridPanel
	        ref: '../SAC008CSaveButton',
	        disabled: false
	    }],

	    
    width:805,
    height:300,
    frame:false,
    border:true,	
    iconCls:'icon-grid',
//    renderTo: document.body
});


////////////////////////////////////////////////////////
//Event for tbar button
///////////////////////////////////////////////////////
SAC008C.grid.SAC008CAddButton.on('click',function(e) {	
	SAC008C.grid.getSelectionModel().selectAll();

	var sm = Ext.getCmp('idGridSAC008C').getSelectionModel().getSelections();

	Ext.getCmp('idGridSAC008C').addRow();
	var i = 1 + sm.length - 1;
	var uu = SAC008C.grid.getStore().getAt(i).data.no;
	Ext.getCmp('no').setValue(i + 1);
	for (var j = 0; j <= sm.length - 1; j++) {

		SAC008C.grid.getSelectionModel().deselectRow(j);
	}
	Ext.Msg.alert('Information', 'อะไรสักอย่าง');
});

/////////////////////////////////
//Event RemoveButton of grid
////////////////////////////////
SAC008C.grid.SAC008CRemoveButton.on('click',function(e) {
	var rowSelected = Ext.getCmp('idGridSAC008C').getSelectionModel().getSelections();
	var param = {}; 
		param.accountId = ""; 
	Ext.MessageBox.confirm('Confirm','ยืนยัน "ลบ" ข้อมูลที่เลือก', function(btn) {
		if (btn == 'yes') {
			for(var i=0;i<rowSelected.length;i++) {
				param.accountId += rowSelected[i].data.accountId+","; // concat accountId //
				Ext.getCmp('idGridSAC008C').store.remove(rowSelected[i]);
			}
			param.method = "gridRemoveData";
			Ext.Ajax.request({
				url : '/TransportationAllowance/SAC008.html',
				params : param,
				success : function(response, opts) {
					if (param != null) {
						Ext.Msg.alert('Information', 'ลบข้อมูล เรียบร้อยแล้ว');
					} else {
						Ext.Msg.alert('Information', 'Error');
					}
				},
				failure : function(response, opts) {
					Ext.Msg.alert('ERROR', 'Error.');
				}
			});
		}
	});
});



SAC008C.grid.SAC008CSaveButton.on('click',function(e) {
	alert("SAVE");
});


////////////////////////////////////////////////////////
//Field Set for Body SAC008C
///////////////////////////////////////////////////////
SAC008C.fieldSetBody = new Ext.form.FieldSet({
	collapsible : false,
	title : 'จัดการข้อมูลบัญชี',
	border : true,
	layout : 'column',
	width : 827,
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1
	},

	items : [{
				items : SAC008C.grid
			}]
});