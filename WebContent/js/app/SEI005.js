SEI005={};
SEI005.seiManageAccount = new Ext.Button({
	id : 'seiManageAccount',
	text : 'จัดการชื่อบัญชี',
	// disabled:true,
	width : 100
});

SEI005.seiManageDept = new Ext.Button({
	id : 'seiManageDept',
	text : 'จัดการแผนก / ฝ่าย',
	// disabled:true,
	width : 100
});

SEI005.seiTheory = new Ext.Button({
	id : 'seiManageReport',
	text : 'สรุปรายงาน',
	// disabled:true,
	width : 100
});

SEI005.seiLabelTitle = new Ext.form.Label({
	id : "seiLabelTitle",
	text : "รายงานการเบิกเงิน",
	style : {
		"font-size" : "200%",

	},
	anchor : '93%'

});
SEI005.btnLogout = new Ext.Button({
	id : 'btnLogout',
	text : 'ออกจากระบบ',
	width : 100
});
SEI005.seiMountComboboxStore = new Ext.data.JsonStore({
	baseParams : {
		method : 'selectMount'
	},
	url : '/TransportationAllowance/SEI005.html',
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

SEI005.seiMountCombobox = new Ext.form.ComboBox({
	id : 'seiMountCombobox',
	fieldLabel : 'ค้นหาเดือน',
	mode : 'local',
	store : SEI005.seiMountComboboxStore,
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


SEI005.seiYearComboboxStore = new Ext.data.JsonStore({
	baseParams : {
		method : 'selectYear'
	},
	url : '/TransportationAllowance/SEI005.html',
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

SEI005.seiYearCombobox = new Ext.form.ComboBox({
	id : 'seiYearCombobox',
	fieldLabel : 'ค้นหาปี',
	mode : 'local',
	store : SEI005.seiYearComboboxStore,
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

SEI005.seiStatusComboboxStore = new Ext.data.JsonStore({
	baseParams : {
		method : 'selectStatus'
	},
	url : '/TransportationAllowance/SEI005.html',
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

SEI005.seiStatusCombobox = new Ext.form.ComboBox({
	id : 'seiStatusCombobox',
	fieldLabel : 'สถานะ',
	mode : 'local',
	store : SEI005.seiStatusComboboxStore,
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


SEI005.seiButtonSearch = new Ext.Button({
	id : 'seiButtonSearch',
	text : 'ค้นหา',
	// disabled:true,
	width : 100
});

//**************************** Create Grid ******************************************//
SEI005.seiGridColumns = [ 
                         {

	header : 'ลำดับ',
	dataIndex : 'seiNo',
	align : 'center',
	width : 89.44,

}, {

	header : 'เลขที่เอกสาร',
	dataIndex : 'seiNumberDocument',
	align : 'center',
	width : 89.44,
	renderer: function (val, metadata, record) {
		metadata.style = 'background-color: #FFFFCC !important;cursor: pointer;';
        return val;
    }


	

}, {
	header : 'รหัสพนักงาน',
	dataIndex : 'seiIdEmployee',
	align : 'center',
	width : 89.44,

}, {

	header : 'ชื่อพนักงาน',
	dataIndex : 'seiNameEmployee',
	align : 'center',
	width : 89.44,

}, {
	header : 'วันส่งเอกสาร',
	dataIndex : 'seiSendDate',
	align : 'center',
	width : 89.44,

}, {
	header : 'สถานะ',
	dataIndex : 'seiStatus',
	align : 'center',
	width : 89.44,

}, {
	header : 'วันที่อนุมัติ',
	dataIndex : 'seiAppove',
	align : 'center',
	width : 89.44,

}, {
	header : 'จำนวนเงิน',
	dataIndex : 'seiTotalPayment',
	align : 'center',
	width : 89.44,

}, {
	header : 'หมายเหตุ',
	dataIndex : 'seiRemark',
	align : 'center',
	width : 89.44,

}

];
SEI005.selectMount = Ext.getCmp('seiMountCombobox').getValue();
SEI005.selectYear = Ext.getCmp('seiYearCombobox').getValue();
SEI005.selectStatus = Ext.getCmp('seiStatusCombobox').getValue();

SEI005.seiGridStrore = new Ext.data.JsonStore({
	 baseParams : {
	 method : 'gridDataSelect',
	 selectMount  : SEI005.selectMount,
	 selectYear   : SEI005.selectYear,
	 selectStatus : SEI005.selectStatus
	 },
	 url : '/TransportationAllowance/SEI005.html',
	 method : 'POST',
	 pageSize: 14,
	storeId : 'gridStore',
	root : 'records',
	idProperty : 'code',
	 autoLoad : true,

	fields : [ {
		name : 'seiNo'
	}, {
		name : 'seiNumberDocument'
	}, {
		name : 'seiIdEmployee'
	}, {
		name : 'seiNameEmployee'
	}, {
		name : 'seiSendDate'
	}, {
		name : 'seiStatus'
	}, {
		name : 'seiAppove'
	},{
		name : 'seiTotalPayment'
	}, {
		name : 'seiRemark'
	}    ],
	model : 'ForumThread',
	remoteSort : true

});



SEI005.seiCreateGrid = new Ext.ss.grid.EditorGridPanel({
	id : 'seiCreateGrid',
	store : SEI005.seiGridStrore,
	columns : SEI005.seiGridColumns,
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


	
	clicksToEdit : 1,
	listeners : {
    	'cellclick' : function(grid, rowIndex, cellIndex, e){
		    var store = grid.getStore().getAt(rowIndex);
		    var columnName = grid.getColumnModel().getDataIndex(cellIndex);
		    var cellValue = store.get(columnName);
		    if(columnName == 'seiNumberDocument'){
		    
		    	Ext.Msg.confirm('Confirm', 'คุณต้องการดูข้อมูล'+' '+cellValue, 
		    		    function(btn) {
		    		        if (btn === 'yes') {
		    		        	
						    	
						    	var documentNumber = cellValue;
						    	var status = grid.getStore().getAt(rowIndex).data.seiStatus;
						    	var urlPreviwPage = "/TransportationAllowance/SVD006.html?documentNumber="+documentNumber+"&status="+status;
								window.location.assign(urlPreviwPage);	
		    		        }
		    		    });
		    	
		    	
		    }else{
		    	
		    }
    	}
    },
	
});
//*************************** On Ready And Form *************************************//
Ext
.onReady(function() {
	
	SEI005.resumeForm = new Ext.form.FormPanel({

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
			columnWidth : 0.3,
			items : SEI005.seiManageAccount,
			labelAlign : 'right',
			style : {
				"margin-left" : "100px",

			},
		
		},{
			columnWidth : 0.3,
			items : SEI005.seiManageDept,
			labelAlign : 'right',
			style : {
				"margin-left" : "100px",

			},
		
		},{
			columnWidth : 0.4,
			items : SEI005.seiTheory,
			labelAlign : 'right',
			style : {
				"margin-left" : "100px",

			},
		
		},{
			columnWidth : 1,
			items : SEI005.seiLabelTitle,
			labelAlign : 'right',
			style : {
				"margin-left" : "280px",
				"margin-top" : "50px"

			},
		
		},{
			columnWidth : 0.5,
			items : SEI005.seiMountCombobox,
			labelAlign : 'right',
			style : {
				
				"margin-top" : "50px"

			},
		
		},{
			columnWidth : 0.5,
			items : SEI005.seiYearCombobox,
			labelAlign : 'right',
			style : {
				
				"margin-top" : "50px"

			},
		
		},{
			columnWidth : 0.5,
			items : SEI005.seiStatusCombobox,
			labelAlign : 'right',
			style : {
				
				"margin-top" : "20px"

			},
		
		},{
			columnWidth : 0.5,
			items : SEI005.seiButtonSearch,
			labelAlign : 'right',
			style : {
				"margin-left" : "105px",
				"margin-top" : "20px"

			},
		
		}
		,{
			columnWidth : 1,
			items : SEI005.seiCreateGrid,
//			labelAlign : 'right',
			style : {
			
				"margin-top" : "20px"

			},
		
		},{
    		columnWidth : 1,
    		items : SEI005.btnLogout,
	    	style : {
	    			"position" : "relative",
	    			"left" : "705px",
	    			"top" : "-401px"
	    	}			
    	}],

	});
	Ext.get('seiButtonSearch').on('click',function(e) {
	
		
				SEI005.seiCreateGrid.store.load( 
					                {   
					                   params:{method : 'gridDataSelect',
					                	   selectMount  : Ext.getCmp('seiMountCombobox').getValue(),
					                	   selectYear   : Ext.getCmp('seiYearCombobox').getValue(),
					                	   selectStatus : Ext.getCmp('seiStatusCombobox').getValue()
					                	   },
					                  });

						
		
	});
				
				


	Ext.get('seiManageAccount').on('click',function(e) {
		
		var urlPreviwPage = "/TransportationAllowance/SAC008.html";
		var win = window.open(urlPreviwPage);
		win.focus();
});
	
Ext.get('seiManageDept').on('click',function(e) {
		
		var urlPreviwPage = "/TransportationAllowance/SDM009.html";
		var win = window.open(urlPreviwPage);
		win.focus();
});

Ext.get('seiManageReport').on('click',function(e) {
	
	var urlPreviwPage = "/TransportationAllowance/SAC008.html";
	var win = window.open(urlPreviwPage);
	win.focus();
});

Ext.get('btnLogout').on('click',function(e) {
	Ext.MessageBox.confirm('ยืนยันการทำรายการ','คุณต้องการ \"ออกจากระบบ\"',confirmFunction);
	function confirmFunction(btn) {
		if (btn == 'yes') {
			var urlPreviwPage = "/TransportationAllowance/index.html";
			window.location.assign(urlPreviwPage);
		}
	}
});	
	

});