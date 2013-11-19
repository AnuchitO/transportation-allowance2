SDM009 = {};

SDM009.sdmLabelTitle = new Ext.form.Label({
	id : "sdmLabelTitle",
	text : "จัดการข้อมูลฝ่าย / แผนก",
	style : {
		"font-size" : "200%",

	},
	anchor : '93%'

});
// ***************************** Create Grid
// ***********************************************//

SDM009.sdmCheckboxSelection = new Ext.grid.CheckboxSelectionModel({
	singleSelect : false,

// email: true,
// dataIndex: 'chkFlag'
});

SDM009.sdmGridColumns = [
    SDM009.sdmCheckboxSelection,{

	header : 'ลำดับ',
	dataIndex : 'sdmNo',
	align : 'center',
	width : 260,

}, {

	header : 'รหัสแผนก / ฝ่าย',
	dataIndex : 'sdmIdDept',
	align : 'center',
	width : 260,
	editor:new Ext.form.TextField({
		id : 'editsdmDept',
		
	})

}, {
	header : 'ชื่อแผนก / ฝ่าย',
	dataIndex : 'sdmNameDept',
	align : 'center',
	width : 260,
	editor:new Ext.form.TextField({
		id : 'editsdmNameDept',
		
	})

}

];

SDM009.sdmGridStrore = new Ext.data.JsonStore({
	 baseParams : {
	 method : 'sdmGridData'
	 },
	 url : '/TransportationAllowance/SDM009.html',
	 method : 'POST',
	pageSize : 10,
	storeId : 'gridStore',
	root : 'records',
	idProperty : 'code',
	 autoLoad : true,

	fields : [ {
		name : 'sdmNo'
	}, {
		name : 'sdmIdDept'
	}, {
		name : 'sdmNameDept'
	} ],
	model : 'ForumThread',
	remoteSort : true

});

//////////////////////////////////////////////////////////////////////////
SDM009.gridAddBtn = new Ext.Toolbar.Button({
	// text:RMP001AButton.Add,
	tooltip : 'Add a new item',
	iconCls : 'add',
	// disabled : false,
	privilage : "educationAddBtn",
	handler : function() {
		SDM009.sdmCreateGrid.getSelectionModel().selectAll();

		var sm = SDM009.sdmCreateGrid.getSelectionModel().getSelections();

		Ext.getCmp('sdmCreateGrid').addRow();

		var i = 1 + sm.length - 1;
		var uu = SDM009.sdmCreateGrid.getStore().getAt(i).data.sdmNo;
//		Ext.getCmp('editNo').setValue(i + 1);
		SDM009.sdmCreateGrid.store.getAt(i).set('sdmNo',i + 1);
		for (var j = 0; j <= sm.length - 1; j++) {

			SDM009.sdmCreateGrid.getSelectionModel().deselectRow(j);
		}
	}
	
	//////////////////////////////////

});
//function sdmRemovefunction(i){
//	var remove = Ext.getCmp('sdmCreateGrid').getSelectionModel().getSelections()[i].get('sdmIdDept');
//	alert(remove);
//}
SDM009.gridRemoveBtn = new Ext.Toolbar.Button({
	
	tooltip : 'Remove the selected item',
	iconCls : 'remove',
	disabled : false,
	handler : function() {
		var sdmparamRemove = {};
		var rowSelected = Ext.getCmp('sdmCreateGrid').getSelectionModel().getSelections();
		sdmparamRemove.packRemove = ""; 
		if (!Ext.isEmpty(rowSelected)) {
			Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {
				if (btn == 'yes') {
					
					SDM009.sdmCreateGrid.getSelectionModel().selectAll();

					var smfirst = SDM009.sdmCreateGrid.getSelectionModel().getSelections();
		
					var lastIndexfirst = smfirst.length - 1;
					var getValueLastIndexfirst = SDM009.sdmCreateGrid.getStore().getAt(lastIndexfirst).data.sdmNo;
					
							for(var i=0;i<rowSelected.length;i++) {
								sdmparamRemove.packRemove += rowSelected[i].data.sdmIdDept+"!"; 
								Ext.getCmp('sdmCreateGrid').store.remove(rowSelected[i]);
							}
							sdmparamRemove.method = "sdmRemove";
							Ext.Ajax.request({
								url : '/TransportationAllowance/SDM009.html',
								params : sdmparamRemove,
								success : function(response, opts) {
									if (sdmparamRemove != null) {
										Ext.Msg.alert('Information', 'ลบข้อมูล เรียบร้อยแล้ว');
									} else {
										Ext.Msg.alert('Information', 'Error');
									}
								},
								failure : function(response, opts) {
									Ext.Msg.alert('ERROR', 'Error.');
								}
							});

					SDM009.sdmCreateGrid.getSelectionModel().selectAll();

					var sm = SDM009.sdmCreateGrid.getSelectionModel().getSelections();
					//					
					var numberSelect = rowSelected.length;

					var lastIndex = sm.length - 1;
					SDM009.sdmCreateGrid.store.getAt(lastIndex).set('sdmNo', getValueLastIndexfirst);
					var getValueLastIndex = SDM009.sdmCreateGrid.getStore().getAt(
							lastIndex).data.sdmNo;

					var u = getValueLastIndex - numberSelect;

					SDM009.sdmCreateGrid.store.getAt(lastIndex).set('sdmNo', u);
					for (var j = lastIndex; j >= 0; j--) {
						if (j == lastIndex) {

						}
						
						detroyNumber = u - j;
						if(detroyNumber == 0){
							SDM009.sdmCreateGrid.store.getAt(lastIndex - j).set('sdmNo',
									detroyNumber+1);
						}
						else{
							SDM009.sdmCreateGrid.store.getAt(lastIndex - j).set('sdmNo',
								detroyNumber);
						}
					}

					for (var j = 0; j <= sm.length - 1; j++) {

						SDM009.sdmCreateGrid.getSelectionModel().deselectRow(j);
					}
					SDM009.sdmCreateGrid.store.getAt(0).set('sdmNo',1);
					
				}
			});
		} else {
			Ext.Msg.alert('Warning', 'กรุณาเลือกข้อมูลที่จะลบ');
		}

	}
	
});
var sdmparam = {};
function sdmSaveOrUpdate(){
	SDM009.sdmCreateGrid.getSelectionModel().selectAll();
	var sm = SDM009.sdmCreateGrid.getSelectionModel().getSelections();
	sdmparam.sdmpack = "";
	for (var i = 0; i <= sm.length - 1; i++) {
	
		var sdmIdDept = SDM009.sdmCreateGrid.getStore().getAt(i).data.sdmIdDept;
		var sdmNameDept = SDM009.sdmCreateGrid.getStore().getAt(i).data.sdmNameDept;

		SDM009.sdmCreateGrid.getSelectionModel().deselectRow(i);
		sdmparam.sdmpack += sdmIdDept + "," + sdmNameDept + "!";
	}
	sdmparam.method = "sdmsave";
	Ext.Ajax.request({
		url : '/TransportationAllowance/SDM009.html',
		params : sdmparam,
		success : function(response, opts) {
			if (sdmparam != null) {
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

SDM009.gridSaveBtn = new Ext.Toolbar.Button(
		{
			tooltip : 'Save',
			iconCls : 'save',
			disabled : false,
			handler : function() {
				Ext.MessageBox
						.confirm(
								'Confirmation',
								'ยืนยันข้อมูลถูกต้อง ?',
								confirmFunction);
				function confirmFunction(btn) {
					if (btn == 'yes') {
						sdmSaveOrUpdate();

					}
				}
			}

		});
/////////////////////////////////////////////////////////////////////////

SDM009.sdmCreateGrid = new Ext.ss.grid.EditorGridPanel({
	id : 'sdmCreateGrid',
	store : SDM009.sdmGridStrore,
	sm : SDM009.sdmCheckboxSelection,
	columns : SDM009.sdmGridColumns,
	columnLines : true,
	height : 200,
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
	tbar : [ SDM009.gridAddBtn, '-', SDM009.gridRemoveBtn, '-',
	         SDM009.gridSaveBtn ],

	clicksToEdit : 1,

});
// *****************************************************************************************//

SDM009.sdmButtonSearch = new Ext.Button({
	id : 'sdmButtonSearch',
	text : 'กลับสู่หน้าหลัก',
	// disabled:true,
	width : 100
});

Ext.onReady(function() {

	SDM009.resumeForm = new Ext.form.FormPanel({

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

		items : [ {
			columnWidth : 1,
			items : SDM009.sdmLabelTitle,
			labelAlign : 'right',
			style : {
				"margin-top" : "50px",
				"text-align":"center",

			},
		},

		{
			columnWidth : 1,
			items : SDM009.sdmCreateGrid,
			labelAlign : 'right',
			style : {
				"margin-top" : "50px",
			},
		}, {
			columnWidth : 1,
			items : SDM009.sdmButtonSearch,
			labelAlign : 'right',
			style : {
				"margin-top" : "50px",
				"margin-left" : "320px",

			},
		}

		],

	});

	Ext.get('sdmButtonSearch').on('click',function(e) {
		
		var urlPreviwPage = "/TransportationAllowance/SEI005.html";
		window.location.assign(urlPreviwPage);	
	});
	
});