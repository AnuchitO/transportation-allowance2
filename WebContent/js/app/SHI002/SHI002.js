var SHI002 = {};

Ext.onReady(function() {SHI002.resumeForm = new Ext.form.FormPanel({
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
				        	 items : SHI002C.PanelHead
				         },{
				    		columnWidth : 0.5,
				    		items : SHI002C.btnLogout,
					    	style : {
					    			"position" : "relative",
					    			"left" : "727px",
					    			"top" : "-160px"
					    	}			
				    	},{
				        	 items : SHI002C.fieldSetBody
				         },{
							 items : SHI002C.btnCreateBin,
							    	 style : {
							    			"position" : "relative",
							    			"left" : "700px",
							    			"top" : "-10px"
							    	 }
						}]
			});
/////////////////////////////////////////
//Function Handle All Event
////////////////////////////////////////

	Ext.get('btnSearch').on('click',function(e) {
		var yearQuery =  Ext.getCmp('comboYear').getValue();
		var statusQuery =  Ext.getCmp('comboStatus').getValue();
		var empId = Ext.getCmp('employeeId').getValue();
		var confirmMessage = "ค้นหาเอกสาร";
		var statusLastValue = Ext.getCmp('comboStatus').lastSelectionText;
		if( yearQuery != ""  && statusQuery != ""){
			confirmMessage += " ของปี "+yearQuery+" สถานะ "+statusLastValue;
		}else if(yearQuery == "" && statusQuery != "" ){
			yearQuery = "%";
			confirmMessage += "ที่สถานะเป็น "+statusLastValue+" ทั้งหมด" ;
		}else if(yearQuery != "" && statusQuery == ""){
			statusQuery = "%";
			confirmMessage += "ทั้งหมด ของปี "+yearQuery;
		}else{
			yearQuery = "%";
			statusQuery = "%";
			confirmMessage = "ค้นหาเอกสารทั้งหมด";
		}
				
		Ext.MessageBox.confirm('ค้นหาข้อมูล',confirmMessage,confirmFunction);
		function confirmFunction(btn) {
			if (btn == 'yes') {
				SHI002C.grid4.store.reload( //  reload grid store when click search button
		                {   
		                   params:{method : 'gridStore',
		               				empId  : empId,
		               				year   : yearQuery,
		               				status : statusQuery},
		                  });
//				Ext.Msg.alert('Information', 'ทำรายการสำเร็จ');
			}}		
	});
	
	Ext.get('btnCreateBin').on('click',function(e) {
		Ext.MessageBox.confirm('Confirmation','คุณต้องการ \"สร้างใบเบิกเงิน\"',confirmFunction);
		function confirmFunction(btn) {
			if (btn == 'yes') {
				var empId = Ext.getCmp('employeeId').getValue();
				var urlPreviwPage = "/TransportationAllowance/SCF003.html?empId="+empId;
				window.location.assign(urlPreviwPage);
			}
		}
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