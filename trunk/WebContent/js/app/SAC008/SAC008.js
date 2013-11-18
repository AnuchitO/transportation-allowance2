//var SAC008 = {};
//
//Ext.onReady(function() {SAC008.resumeForm = new Ext.form.FormPanel({
//				applyTo : "content",
//				layout : 'column',
//				border : false,
//				width : 840,
//				style : {
//					"margin-left" : "auto",
//					"margin-right" : "auto",
//					"margin-top" : "50px"
//				},
//				defaults : {
//					xtype : 'container',
//					layout : 'form',
//					columnWidth : 1,
//					anchor : '100%',
//					// hideBorders : true
//				},
//
//				items : [{
//				        	 items : SAC008C.fieldSetBody
//				         }]
//			});
//
//
/////////////////////////////////////////////////////////////////////////////////////////////
///// All Event Function
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
////Event for tbar button
/////////////////////////////////////////////////////////
////SAC008C.grid.SAC008CAddButton.on('click',function(e) {	
////	SAC008C.grid.getSelectionModel().selectAll();
////
////	var sm = Ext.getCmp('idGridSAC008C').getSelectionModel().getSelections();
////
////	Ext.getCmp('idGridSAC008C').addRow();
////	var i = 1 + sm.length - 1;
////	var uu = SAC008C.grid.getStore().getAt(i).data.no;
////	Ext.getCmp('no').setValue(i + 1);
////	for (var j = 0; j <= sm.length - 1; j++) {
////
////		SAC008C.grid.getSelectionModel().deselectRow(j);
////	}
////	Ext.Msg.alert('Information', 'อะไรสักอย่าง');
//
////});
//
///////////////////////////////////
////Event RemoveButton of grid
//////////////////////////////////
//SAC008C.grid.SAC008CRemoveButton.on('click',function(e) {
//	var rowSelected = Ext.getCmp('idGridSAC008C').getSelectionModel().getSelections();
//	var param = {}; 
//		param.accountId = ""; 
//	Ext.MessageBox.confirm('Confirm','ยืนยัน "ลบ" ข้อมูลที่เลือก', function(btn) {
//		if (btn == 'yes') {
//			for(var i=0;i<rowSelected.length;i++) {
//				param.accountId += rowSelected[i].data.accountId+","; // concat accountId //
//				Ext.getCmp('idGridSAC008C').store.remove(rowSelected[i]);
//			}
//			param.method = "gridRemoveData";
//			Ext.Ajax.request({
//				url : '/TransportationAllowance/SAC008.html',
//				params : param,
//				success : function(response, opts) {
//					if (param != null) {
//						Ext.Msg.alert('Information', 'ลบข้อมูล เรียบร้อยแล้ว');
//					} else {
//						Ext.Msg.alert('Information', 'Error');
//					}
//				},
//				failure : function(response, opts) {
//					Ext.Msg.alert('ERROR', 'Error.');
//				}
//			});
//		}
//	});
//});
//
//
//
//SAC008C.grid.SAC008CSaveButton.on('click',function(e) {
//	alert("SAVEAA");
//});
//
//
//
//});
//
//

var SAC008 = {};
Ext.onReady(function() {SAC008.resumeForm = new Ext.form.FormPanel({
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
					anchor : '100%',
				},
				items : [{
							items : SAC008C.labHeader,
							style : {					
								"padding-left" : "10px",
								"position" : "relative",
								"left" : "280px",
								"top" : "0px"
							}
						},{
							columnWidth : 1,
							items : SAC008C.grid
						},{
							items : SAC008C.createButtonBack,
							style : {					
								"padding-left" : "10px",
								"position" : "relative",
								"left" : "290px",
								"top" : "0px"
							}
						}]
			});

/////////////////////////////////
//Event Function
////////////////////////////////
Ext.get('back').on('click',function(e) {
	Ext.MessageBox.confirm('Confirmation','คุณต้องการกลับไปหน้าหลัก',confirmFunction);
	function confirmFunction(btn) {
		if (btn == 'yes') {								
//			var urlPreviwPage = "/TransportationAllowance/SHI002.html";
//			window.location.assign(urlPreviwPage);
			alert("OK");
		}
	}
});

});
