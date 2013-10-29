var SPV004Comp = {};
SPV004Comp.TextField = new Ext.form.TextField({
	id : 'fname',
	fieldLabel : "MMM",
	});

//Header for name address Softsqaure
SPV004Comp.PanelHead = new Ext.Panel({
	border:false,
	columnWidth:1,
	layout : 'column',
	defaults : {
		xtype : 'container',
		layout : 'form',
		columnWidth : 1,
		anchor : '100%',
	},
	//title: 'Filters',
	items: [{
		        xtype: 'label',
		        style: 'font-weight:bold;font-size:18px;',
		        text: 'บริษัท ซอฟต์สแควร์ อินเตอร์เนชั่นแนล จำกัด',
		        margins: '0 0 0 10',
		        layout: 'anchor',	        	
	    	},{
	    		xtype: 'label',
		        text: '51/599 หมู่บ้านเมืองเอกรังสิต ถ.พหลโยธิน ต.หลักหก อ.เมืองปทุมธานี จ.ปทุมธานี 12000',
		        style: '',
		        margins: '0 0 0 10' ,
		       
	    	},{
	    		xtype: 'label',
		        text: "โทร 0-2997-2000   โทรสาร 0-2997-2001",
		        margins: '0 0 0 10'     
	    	}
    	]
});

//Title page Print preview
SPV004Comp.slipAjenda = {
        xtype: 'label',
        style: 'font-weight:bold;font-size:20px;',
        text: 'ใบเบิกค่าเดินทาง',
        margins: '0 0 0 10'
        
    };

