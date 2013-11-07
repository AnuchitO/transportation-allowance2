var SVD006 = {};

Ext.onReady(function() {SVD006.resumeForm = new Ext.form.FormPanel({
				applyTo : "content",
				layout : 'column',
				border : false,
				width : 840,
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
					// hideBorders : true
				},

				items : [
				         {
				        	 items : SVD006C.tabPanel
				         }]
			});


////////Operater Function

Ext.get('approve').on('click',function(e) {
	Ext.getDom('refused').checked = false;
	Ext.getDom('cancel').checked = false;
});
Ext.get('refused').on('click',function(e) {
	Ext.getDom('approve').checked = false;
	Ext.getDom('cancel').checked = false;
	
	Ext.getDom('payCash').checked = false;
	Ext.getDom('payCheck').checked = false;
});
Ext.get('cancel').on('click',function(e) {
	Ext.getDom('refused').checked = false;
	Ext.getDom('approve').checked = false;
	
	Ext.getDom('payCash').checked = false;
	Ext.getDom('payCheck').checked = false;
});

Ext.get('payCash').on('click',function(e) {
	Ext.getDom('payCheck').checked = false;
	Ext.getDom('approve').checked = true;
	Ext.getDom('refused').checked = false;
	Ext.getDom('cancel').checked = false;
});

Ext.get('payCheck').on('click',function(e) {
	Ext.getDom('payCash').checked = false;
	Ext.getDom('approve').checked = true;
	Ext.getDom('refused').checked = false;
	Ext.getDom('cancel').checked = false;
	
});

var paramConfirmCheckbox = {};
function updateStatus() {
	paramConfirmCheckbox.noDoc = Ext.getCmp('noDoc').getValue();
	
	paramConfirmCheckbox.reson =  Ext.getCmp('idReson').getValue();
	if(paramConfirmCheckbox.reson == "" || paramConfirmCheckbox.reson == null || paramConfirmCheckbox.reson == "undefined"){
		paramConfirmCheckbox.reson = " ";
	}
	
	if(Ext.getDom('approve').checked){
		  	paramConfirmCheckbox.status = "004";
	}else if(Ext.getDom('refused').checked){
		  	paramConfirmCheckbox.status = "003";
	}else if(Ext.getDom('cancel').checked){
			paramConfirmCheckbox.status = "005";
	}else{
		
	}
	
	
	if(Ext.getDom('payCash').checked){
			paramConfirmCheckbox.payType = "1";
	}else if(Ext.getDom('payCheck').checked){
			paramConfirmCheckbox.payType = "2";
	}else{
		paramConfirmCheckbox.payType = "1";
	}
	
		
	paramConfirmCheckbox.method = "updateStatus";
	Ext.Ajax.request({
		url : '/TransportationAllowance/SVD006.html',
		params : paramConfirmCheckbox,
		success : function(response, opts) {
			if (paramConfirmCheckbox != null) {
				Ext.Msg.alert('Information', 'ทำรายการสำเร็จ');
			} else {
				Ext.Msg.alert('Information', 'Error ติดต่อผู้ดูแลระบบ');
			}
		},
		failure : function(response, opts) {
			Ext.Msg.alert('ERROR', 'Error.');
		}
	});
}



Ext.get('idBtnConfirm').on('click',function(e) {
			var statusShow = " ";
			if(Ext.getDom('approve').checked){		  
				  statusShow = "Approve";
				  statusFunction();
			}else if(Ext.getDom('refused').checked){
				  statusShow = "Refused";
				  statusFunction();
			}else if(Ext.getDom('cancel').checked){
				  Ext.getDom('payCash').checked=false;
				  Ext.getDom('payCheck').checked=false;
				  statusShow = "Cancel";
				  statusFunction();
			}else{
				Ext.Msg.alert('Information',"กรุณาเลือก รูปแบบการพิจารณา");
			}
			
			function statusFunction(){
				Ext.MessageBox.confirm('Acception',"คุณยืนยันที่จะ  \""+statusShow+"\"  เอกสารนี้" ,updateStatusFunction);
			}


			function updateStatusFunction(btn) {
				if (btn == 'yes') {
					updateStatus();
				}
			}
});


///////End Operater Function


});
