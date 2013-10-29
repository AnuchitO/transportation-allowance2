var EXT001 = {};
Ext.onReady(function() {
	new Ext.form.FormPanel({
		applyTo : "content",
		title : 'Employee',
		layout : 'column',
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
//			labelWidth : 0,
			anchor : '100%',
			hideBorders : false
		},
		items : [ 
//		          {items : EXT001.tabs},
		          {columnWidth:0.5,items : EXT001A.setLeft},
		          {columnWidth:0.5,items : EXT001A.setRigth},
		          {items: EXT001A.tabPanel}
		          
		          ]
	});
});

//EXT001.date = new Ext.form.DateField({
//	id : 'date',
//	fieldLabel : "BirthDay",
//	format : "d-m-Y"
//});
//EXT001.employeePanel = new Ext.Panel({
//	title:'Ext.panel',
//	autoWidth : true,
//	autoHeight : true,
//	border : false,
//	columnWidth : 1,
//	html : "Test",
//    items: [{
//        items: [ EXT001.date
//        ]
//    }
//]
//});
//
//
//	EXT001.tabs = new Ext.TabPanel({
//		autoHeight : true,
//		autoWidth : true,
//		activeTab : 0,
//		padding : 5,
//		border : true,
//		style : {
//			"margin-left" : "auto",
//			"margin-right" : "auto",
//			"margin-top" : "auto",
//			"padding-top" : "auto"
//		},
//		activeTab : 0,
//		items:[{
//            title:'Personal Details',
//            defaultType: 'textfield',
//            defaults: {
//    			xtype : 'container',
//    			layout : 'form',
//    			columnWidth : 1,
//                anchor: '100%'
//            },
//            items: [new Ext.form.TextField()]
//        },{
//            title:'Second Tap',
//        	items : EXT001.employeePanel
//        	
//        }
//        
//        ]
//    
//	});