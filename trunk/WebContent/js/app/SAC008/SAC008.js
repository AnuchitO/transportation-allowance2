var SAC008 = {};
Ext.onReady(function() {SAC008.resumeForm = new Ext.form.FormPanel({
				applyTo : "content",
				layout : 'column',
				border : false,
				width : '65%',
				style : {
					"margin-left" : "auto",
					"margin-right" : "auto",
					"margin-top" : "50px"
				},
				defaults : {
					xtype : 'container',
					layout : 'form',
					columnWidth : 1,
					anchor : '120%',
				},
				items : [{
							items : SAC008C.labHeader,
							style : {					
								"padding-left" : "10px",
								"position" : "relative",
								"left" : "300px",
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
								"left" : "370px",
								"top" : "10px"
							}
						},{
							items : new Ext.form.Label({
								id : "labA",
								text : "a",
								style : {
									"font-size" : "150%",
									"font-align" : "center"
								},
								anchor : '93%'
							}),
							style : {					
								"padding-left" : "10px",
								"position" : "relative",
								"left" : "-310px",
								"top" : "30px"
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
			var urlPreviwPage = "/TransportationAllowance/SEI005.html";
			window.location.assign(urlPreviwPage);
		}
	}
});

});
