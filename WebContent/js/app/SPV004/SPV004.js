var EXT001 = {};
Ext.onReady(function() {
	new Ext.form.FormPanel({
		applyTo : "content",
//		title : 'PrintPreview',
		layout : 'column',
		width : '80%',
		border: true,
		style : {
			"margin-left" : "auto",
			"margin-right" : "auto",
			"margin-top" : "50px"
		},
		defaults : {
			xtype : 'container',
			layout : 'form',
			columnWidth : 1,
//			labelWidth : 0,
			anchor : '100%',
			hideBorders : false
		},
		items : [ 
		          {	items : SPV004Comp.PanelHead
		          },{
		        	items : SPV004Comp.label  
		          },{
		        	items : SPV004Comp.TextField
		          },{
		        	items :  SPV004Comp.slipAjenda 
		          } 
		          ]
	});
});