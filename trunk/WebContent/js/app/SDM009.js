SDM009 = {};

SDM009.shiLabelTitle = new Ext.form.Label({
	id : "shiLabelTitle",
	text : "จัดการข้อมูลฝ่าย / แผนก",
	style : {
		"font-size" : "200%",

	},
	anchor : '93%'

});
// ***************************** Create Grid
// ***********************************************//

SDM009.shiCheckboxSelection = new Ext.grid.CheckboxSelectionModel({
	singleSelect : false,

// email: true,
// dataIndex: 'chkFlag'
});

SDM009.shiGridColumns = [
    SDM009.shiCheckboxSelection,{

	header : 'ลำดับ',
	dataIndex : 'shiNo',
	align : 'center',
	width : 260,

}, {

	header : 'รหัสแผนก / ฝ่าย',
	dataIndex : 'shiIdDept',
	align : 'center',
	width : 260,
	editor:new Ext.form.TextField({
		id : 'editshiDept',
		
	})

}, {
	header : 'ชื่อแผนก / ฝ่าย',
	dataIndex : 'shiNameDept',
	align : 'center',
	width : 260,
	editor:new Ext.form.TextField({
		id : 'editshiNameDept',
		
	})

}

];

SDM009.shiGridStrore = new Ext.data.JsonStore({
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
		name : 'shiNo'
	}, {
		name : 'shiIdDept'
	}, {
		name : 'shiNameDept'
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
		SDM009.shiCreateGrid.getSelectionModel().selectAll();

		var sm = SDM009.shiCreateGrid.getSelectionModel().getSelections();

		Ext.getCmp('shiCreateGrid').addRow();

		var i = 1 + sm.length - 1;
		var uu = SDM009.shiCreateGrid.getStore().getAt(i).data.shiNo;
//		Ext.getCmp('editNo').setValue(i + 1);
		SDM009.shiCreateGrid.store.getAt(i).set('shiNo',i + 1);
		for (var j = 0; j <= sm.length - 1; j++) {

			SDM009.shiCreateGrid.getSelectionModel().deselectRow(j);
		}
	}
	
	//////////////////////////////////

});

SDM009.gridRemoveBtn = new Ext.Toolbar.Button({
	
	tooltip : 'Remove the selected item',
	iconCls : 'remove',
	disabled : false,
	handler : function() {
		var rowSelected = Ext.getCmp('shiCreateGrid')
				.getSelectionModel().getSelections();
		if (!Ext.isEmpty(rowSelected)) {
			Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {
				if (btn == 'yes') {

					for ( var i in rowSelected) {

						Ext.getCmp('shiCreateGrid').store
								.remove(rowSelected[i]);

					}
					SDM009.shiCreateGrid.getSelectionModel().selectAll();

					var sm = SDM009.shiCreateGrid.getSelectionModel().getSelections();
					//					
					var numberSelect = rowSelected.length;

					var lastIndex = sm.length - 1;

					var getValueLastIndex = SDM009.shiCreateGrid.getStore().getAt(
							lastIndex).data.shiNo;

					var u = getValueLastIndex - numberSelect;

					SDM009.shiCreateGrid.store.getAt(lastIndex).set('shiNo', u);
					for (var j = lastIndex; j >= 0; j--) {
						if (j == lastIndex) {

						}
						
						detroyNumber = u - j;
						if(detroyNumber == 0){
							SDM009.shiCreateGrid.store.getAt(lastIndex - j).set('shiNo',
									detroyNumber+1);
						}
						else{
							SDM009.shiCreateGrid.store.getAt(lastIndex - j).set('shiNo',
								detroyNumber);
						}
					}

					for (var j = 0; j <= sm.length - 1; j++) {

						SDM009.shiCreateGrid.getSelectionModel().deselectRow(j);
					}
					SDM009.shiCreateGrid.store.getAt(0).set('shiNo',1);
					
				}
			});
		} else {
			Ext.Msg.alert('Warning', 'กรุณาเลือกข้อมูลที่จะลบ');
		}

	}
	
});
var sdmparam = {};
function sdmSaveOrUpdate(){
	SDM009.shiCreateGrid.getSelectionModel().selectAll();
	var sm = SDM009.shiCreateGrid.getSelectionModel().getSelections();
	sdmparam.sdmpack = "";
	for (var i = 0; i <= sm.length - 1; i++) {
	
		var shiIdDept = SDM009.shiCreateGrid.getStore().getAt(i).data.shiIdDept;
		var shiNameDept = SDM009.shiCreateGrid.getStore().getAt(i).data.shiNameDept;

		SDM009.shiCreateGrid.getSelectionModel().deselectRow(i);
		sdmparam.sdmpack += shiIdDept + "," + shiNameDept + "!";
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

SDM009.shiCreateGrid = new Ext.ss.grid.EditorGridPanel({
	id : 'shiCreateGrid',
	store : SDM009.shiGridStrore,
	sm : SDM009.shiCheckboxSelection,
	columns : SDM009.shiGridColumns,
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

SDM009.shiButtonSearch = new Ext.Button({
	id : 'shiButtonSearch',
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
			items : SDM009.shiLabelTitle,
			labelAlign : 'right',
			style : {
				"margin-top" : "50px",
				"text-align":"center",

			},
		},

		{
			columnWidth : 1,
			items : SDM009.shiCreateGrid,
			labelAlign : 'right',
			style : {
				"margin-top" : "50px",
			},
		}, {
			columnWidth : 1,
			items : SDM009.shiButtonSearch,
			labelAlign : 'right',
			style : {
				"margin-top" : "50px",
				"margin-left" : "320px",

			},
		}

		],

	});

	Ext.get('shiButtonSearch').on('click',function(e) {
		
		var urlPreviwPage = "/TransportationAllowance/SEI005.html";
		window.location.assign(urlPreviwPage);	
	});
	
});