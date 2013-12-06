var SVD006 = {};
Ext.getCmp('svdtabPanel').items.get(1).setDisabled(true);
Ext.onReady(function() {

	SVD006.resumeForm = new Ext.form.FormPanel({
	
				applyTo : "content",
				layout : 'column',
				border : false,
				width : 840,
				style : {
					"margin-left" : "auto",
					"margin-right" : "auto",
					"margin-top" : "10px"
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


//////// Operator Function

SVD006C.autoCheck = Ext.getCmp('totalPayAll').getValue();
if(SVD006C.autoCheck >= 1500){
	Ext.getDom('payCash').checked = false;
	Ext.getDom('payCheck').checked = true;
}else{
	Ext.getDom('payCash').checked = true;
	Ext.getDom('payCheck').checked = false;
}
Ext.get('approve').on('click',function(e) {
	Ext.getDom('refused').checked = false;
	Ext.getDom('cancel').checked = false;
	if(Ext.getDom('approve').checked){
		Ext.getCmp('idReson').setDisabled(true);
		Ext.get('idReson').setStyle('background', '#BEBEBE');
		SVD006C.txtReson.setValue(" ");
		if(SVD006C.autoCheck >= 1500){
			Ext.getDom('payCash').checked = false;
			Ext.getDom('payCheck').checked = true;
		}else{
			Ext.getDom('payCash').checked = true;
			Ext.getDom('payCheck').checked = false;
		}
	}else{
		Ext.getCmp('idReson').setDisabled(false);
		Ext.get('idReson').setStyle('background', '#FFFFFF');
		SVD006C.txtReson.setValue(" ");
	}
});
Ext.get('refused').on('click',function(e) {
	Ext.getDom('approve').checked = false;
	Ext.getDom('cancel').checked = false;
	
	Ext.getDom('payCash').checked = false;
	Ext.getDom('payCheck').checked = false;
	if(Ext.getDom('refused').checked){
		Ext.getCmp('idReson').setDisabled(false);
		Ext.get('idReson').setStyle('background', '#FFFFFF');
	}
});
Ext.get('cancel').on('click',function(e) {
	Ext.getDom('refused').checked = false;
	Ext.getDom('approve').checked = false;
	
	Ext.getDom('payCash').checked = false;
	Ext.getDom('payCheck').checked = false;
	Ext.getCmp('idReson').setDisabled(false);
	if(Ext.getDom('cancel').checked){
		Ext.getCmp('idReson').setDisabled(false);
		Ext.get('idReson').setStyle('background', '#FFFFFF');
	}
});

Ext.get('payCash').on('click',function(e) {
	Ext.getDom('payCheck').checked = false;
});

Ext.get('payCheck').on('click',function(e) {
	Ext.getDom('payCash').checked = false;
});
var statusCheckForCreatePayment = false;
var statusCheckForConfirm = true;
Ext.get('idBtnCreatePay').on('click',function(e) {	
	if(statusCheckForCreatePayment){
		Ext.getCmp('svdtabPanel').items.get(1).setDisabled(false);
		SVD006C.tabPanel.setActiveTab(1);
		
	}
});
Ext.getCmp('idBtnCreatePay').disable();
//Ext.getCmp('idBtnCreatePay').enable();

var checkStatus = SVD006Domain.seiStatus;
if(checkStatus == "Submitted"){
	
	
}
else if(checkStatus == "Approved"){
	Ext.getDom('approve').checked = true;
	Ext.getDom('approve').disabled = true;
	Ext.getDom('refused').disabled = true;
	Ext.getDom('cancel').disabled = true;
	Ext.getDom('payCash').disabled = true;
	Ext.getDom('payCheck').disabled = true;
	statusCheckForCreatePayment = false;
	Ext.getCmp('gridDataForPayList').setDisabled(true);
	Ext.getCmp('idReson').setDisabled(true);
	Ext.get('idReson').setStyle('background','#BEBEBE');
	statusCheckForConfirm = false;
	Ext.getCmp('idBtnConfirm').disable();
	statusCheckForCreatePayment = true;	
	Ext.getCmp('idBtnCreatePay').enable();

}
else if(checkStatus == "Refused"){
	Ext.getCmp('gridDataForPayList').setDisabled(true);
	Ext.getDom('refused').checked = true;
	statusCheckForCreatePayment = false;
	Ext.getCmp('idBtnCreatePay').disable();
}
else if(checkStatus == "Cancel"){
	Ext.getDom('cancel').checked = true;
	Ext.getDom('approve').disabled = true;
	Ext.getDom('refused').disabled = true;
	Ext.getDom('cancel').disabled = true;
	Ext.getDom('payCash').disabled = true;
	Ext.getDom('payCheck').disabled = true;
	statusCheckForCreatePayment = false;
	Ext.getCmp('gridDataForPayList').setDisabled(true);
	Ext.getCmp('idReson').setDisabled(true);
	Ext.get('idReson').setStyle('background', '#BEBEBE');
	statusCheckForConfirm = false;
	Ext.getCmp('idBtnConfirm').disable();
	Ext.getCmp('idBtnCreatePay').disable();
}



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
	if(statusCheckForConfirm){
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
	}	
			function statusFunction(){
				Ext.MessageBox.confirm('Acception',"คุณยืนยันที่จะ  \""+statusShow+"\"  เอกสารนี้" ,updateStatusFunction);
			}


			function updateStatusFunction(btn) {
				if (btn == 'yes') {
					updateStatus();
					if(!(Ext.getDom('refused').checked || Ext.getDom('cancel').checked)){
						statusCheckForCreatePayment = true;
						Ext.getCmp('idBtnCreatePay').enable();
					}else{
						statusCheckForCreatePayment = false;
						Ext.getCmp('idBtnCreatePay').disable();
					}
					
				}
			}
	
});

SVD006C.btnBackHome.on('click',function(e) {
	Ext.MessageBox.confirm('ยืนยันการทำรายการ', 'กลับหน้าหลัก ', function(btn) {
		if (btn == 'yes') {
	    	var urlPreviwPage = "/TransportationAllowance/SEI005.html";
	    	window.location.assign(urlPreviwPage);    	
		}
	});

});

///////End Operater Function
//************************ set value By SCP007C **************************************/
SCP007C.scpLabelCompany.setText(SVD006Domain.company);
var fullName = SVD006Domain.name + " " + " " + SVD006Domain.scpLastName;
SCP007C.scpForPayGive.setValue(fullName);
SCP007C.scpBank.setValue(SVD006Domain.bank);
SCP007C.scpBranch.setValue(SVD006Domain.branch);
SCP007C.scpTotalMoney.setValue(SVD006Domain.totalPayment);
SCP007C.scpNumberCharactor.setValue(SVD006Domain.charactorNumber);
SCP007C.scfTextArea.setValue(SVD006Domain.minMaxDate);
SCP007C.scpNumber.setValue(SVD006Domain.scpnumberPaymentHForSet);
SCP007C.scpNumberCheck.setValue(SVD006Domain.scpNumberCheckForSet);
SCP007C.scfTatolDebit.setValue(SVD006Domain.scpTotalDebitForSet);
SCP007C.scfTatolCredit.setValue(SVD006Domain.scpTotalCreditForSet);
var totalPayment = Ext.getCmp('scpTotalMoney').getValue();

var a = parseInt(totalPayment);

if(a <= 1500){
SCP007C.scpTypeForpay1.checked = true;
	

}
else{
	SCP007C.scpTypeForpay2.checked = true;

}



});
