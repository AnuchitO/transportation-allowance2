var SHI002C = {};
/////////////////////////////////////
//define element for Header
////////////////////////////////////
SHI002C.name = new Ext.form.TextField({
	id : 'name',
	fieldLabel : "ชื่อ - สกุล",
	width : 200,
	readOnly: true
});

SHI002C.employeeId = new Ext.form.TextField({
	id : 'employeeId',
	fieldLabel : "รหัสพนักงาน",
	width : 200,
	readOnly: true
});


SHI002C.comboStatusStore = new Ext.data.JsonStore({
	baseParams : {
		method : 'statusStore',
		code   : '9'
	},
	url : '/TransportationAllowance/SHI002.html',
	method : 'POST',
	storeId : 'comboStatusStore',
	root : 'records',
	idProperty : 'code',
	autoLoad : true,
	fieldLabel : 'comboYear',
	fields : [ {
		name : 'code'

	}, {
		name : 'description'
	} ]
	
});

SHI002C.comboStatus = new Ext.form.ComboBox({
	fieldLabel : 'เลือกสถานะ',
	id : 'comboStatus',
	width : 120,
	store : SHI002C.comboStatusStore,
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

//////////////////////////////////////////
//Set value into TextField name and empId
//////////////////////////////////////////
SHI002C.name.setValue(SHI01Domain.employeeName);
SHI002C.employeeId.setValue(SHI01Domain.employeeId);



var employeeIdValue = Ext.getCmp('employeeId').getValue();
SHI002C.comboYearStore = new Ext.data.JsonStore({
	
	baseParams : {
		method : 'yearStore',
		empId  : employeeIdValue
	},
	url : '/TransportationAllowance/SHI002.html',
	method : 'POST',
	storeId : 'comboStatusStore',
	root : 'records',
	idProperty : 'code',
	autoLoad : true,
	fieldLabel : 'comboYear',
	fields : [ {
		name : 'code'

	}, {
		name : 'description'
	} ]
});


SHI002C.comboYear = new Ext.form.ComboBox({
	fieldLabel : 'เลือกปีA',
	id : 'comboYear',
	width : 120,
	store : SHI002C.comboYearStore,
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

SHI002C.btnSearch = new Ext.Button({
	id : 'btnSearch',
	text : 'ค้นหา',
	width : 100
});

///////////////////////////////////////////////
//Fiels Set For Header1
///////////////////////////////////////////////
SHI002C.fieldSetHeader = new Ext.form.FieldSet({
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
				columnWidth : 0.5,
				items : SHI002C.name,
				labelAlign : 'right'
			},{
	    		columnWidth : 0.5,
	    		items : SHI002C.employeeId,
				labelAlign : 'right'
	    	},{
	    		columnWidth : 0.5,
	    		items : SHI002C.comboYear,
				labelAlign : 'right'
	    	},{
	    		columnWidth : 0.5,
	    		items : SHI002C.comboStatus,
				labelAlign : 'right'
	    	},{
	    		items : SHI002C.btnSearch,
	    		style : {
	    			"position" : "relative",
	    			"left" : "333px",
	    			"top" : "0px"
	    		}
	    	}]
});


///////////////////////////////////
//Panel for Header  FieldSet
//////////////////////////////////
SHI002C.PanelHead = new Ext.Panel({
	border:false,
	columnWidth:1,
	width : 840,
	layout : 'column',
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1,
		anchor : '100%',
	},
	items: [{
		        xtype: 'label',
		        style: 'font-weight:bold;font-size:18px;',
		        text: 'ข้อมูลประวัติการเบิกเงิน',
		        margins: '0 0 0 10',
		        layout: 'anchor',	        	
	    	},{
	    		items : SHI002C.fieldSetHeader	    		
	    	}]
});


////////////////////////////
//Title page Print preview
///////////////////////////
SHI002C.slipAjenda = {
        xtype: 'label',
        style: 'font-weight:bold;font-size:20px;',
        text: 'ใบเบิกค่าเดินทาง',
        margins: '0 0 0 10'
};


  
////////////////////////////////////////////////////////////////////////////////////////
// Grid 
////////////////////////////////////////////////////////////////////////////////////////
SHI002C.sm2 = new Ext.grid.CheckboxSelectionModel({
    listeners: {
        // On selection change, set enabled state of the removeButton
        // which was placed into the GridPanel using the ref config
        selectionchange: function(sm) {
            if (sm.getCount()) {
            	SHI002C.grid4.removeButton.enable();                    
            } else {
            	SHI002C.grid4.removeButton.disable();
            }
        }
    }
});
    
SHI002C.gridStore = new Ext.data.JsonStore({
	baseParams : {
		method : 'gridStore'
	},
	url : '/TransportationAllowance/SHI002.html',
	method : 'POST',
	pageSize : 10,
	storeId : 'gridStore',
	root : 'records',
	idProperty : 'no',
	autoLoad : true,
	fields : [ {
		name : 'no'
	}, {
		name : 'docNo'
	}, {
		name : 'docDate'
	}, {
		name : 'sendDate'
	}, {
		name : 'approve'
	}, {
		name : 'status'
	}, {
		name : 'amount'
	}, {
		name : 'remark'
	} ],
	model : 'ForumThread',
	remoteSort : true

});
 
    
SHI002C.grid4 = new Ext.grid.GridPanel({
        id:'idGrid',
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
    	store:SHI002C.gridStore,
        cm: new Ext.grid.ColumnModel([
            SHI002C.sm2,
            {id:'no',header: "ลำดับ", width: 10, sortable: true, dataIndex: 'no'},
            {header: "เลขที่เอกสาร", width: 20, sortable: true, dataIndex: 'docNo'},
            {header: "วันที่เอกสาร", width: 20, sortable: true, dataIndex: 'docDate'},
            {header: "วันที่ส่งเอกสาร", width: 20, sortable: true, dataIndex: 'sendDate'},
            {header: "วันที่อนุมัติ", width: 20, sortable: true,  dataIndex: 'approve'},
            {header: "สถานะ", width: 20, sortable: true, dataIndex: 'status'},
            {header: "จำนวนเงิน (บาท)", width: 20, sortable: true, dataIndex: 'amount'},
            {header: "หมายเหตุ", width: 20, sortable: true, dataIndex: 'remark'}
            
        ]),
        sm: SHI002C.sm2,

        viewConfig: {
            forceFit:true
        },
        columnLines: true,

        // inline toolbars
        tbar:[{
            text:'Remove',
            tooltip:'Remove the selected item',
            iconCls:'remove',
            // Place a reference in the GridPanel
            ref: '../removeButton',
            disabled: true
        }],

        width:805,
        height:300,
        frame:false,
        border:true,	
        iconCls:'icon-grid',
});

SHI002C.grid4.removeButton.on('click',function(e) {
	var rowSelected = Ext.getCmp('idGrid').getSelectionModel().getSelections();
	Ext.MessageBox.confirm('Confirm', 'ยืนยัน "ลบ" ข้อมูลที่เลือก', function(btn) {
		if (btn == 'yes') {
			var xx = " ";
			for ( var i in rowSelected) {
				alert(rowSelected[i].data.docNo);
				xx += rowSelected[i].data.docNo+",";				
				Ext.getCmp('idGrid').store.remove(rowSelected[i]);
			}
//			alert(xx);
//			Ext.Msg.alert('Information', 'ทำรายการสำเร็จ');
		}
	});
});
  
////////////////////////////
//element For bottom
///////////////////////////
SHI002C.btnCreateBin = new Ext.Button({
	id : 'btnCreateBin',
	text : 'สร้างใบเบิกเงิน',
	width : 100
});

//////////////////////
//FieldSet For grid
/////////////////////
SHI002C.fieldSetBody = new Ext.form.FieldSet({
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
				items : SHI002C.grid4 
			}]
});

