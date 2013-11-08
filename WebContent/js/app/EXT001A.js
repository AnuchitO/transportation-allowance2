var EXT001A ={};
EXT001A.fname = new Ext.form.TextField({
	id : 'fname',
	fieldLabel : "Firstname",
	});
EXT001A.lname = new Ext.form.TextField({
	id : 'lname',
	fieldLabel : "Lastname",
	

	});
EXT001A.comboboxStore = new Ext.data.JsonStore({
	baseParams:{
		method:'antercedent'
	},
	url:'/ExtjsTraining/EXT001.html',
	method:'POST',
	storeId:'comboStrore',
	root:'records',
	idProperty:'code',
	autoLoad:true,
	fieldLabel:'comboStrore',
	fields:[{
		name:'code'
			
	},{
		name:'description'
	}]
});
EXT001A.createCombobox = new Ext.form.ComboBox({
	fieldLabel:'Antercedent',
	id:'antercedent',
	store:EXT001A.comboboxStore,
	valueField:'code',
	displayField:'description',
	autoSelect:true,
	mode :'local',
	lazyRender:true,
	criterionField:true,
	typeAhead:true,
	forceSelection:true,
	triggerAction:'all',
	emptyText:'Select ...'
	
	
});


EXT001A.setLeft = new Ext.form.FieldSet({
	collapsible:false,
	border:true,
	layout:'column',
	defaults:{
		xtype:'container',
		layout:'form',
		columnWidth:1
	},

	items:[{
		items:EXT001A.fname
	},{
		items:EXT001A.lname
	},{
		items:EXT001A.createCombobox
	}
	]
});
EXT001A.birthday = new Ext.form.DateField({
	id : 'birthday',
	fieldLabel : "BirthDay",
	format: "d-m-Y"

	});
EXT001A.age = new Ext.form.TextField({
	id : 'age',
	fieldLabel : "Age",

	});
EXT001A.setRigth = new Ext.form.FieldSet({
	collapsible:false,
	border:true,
	layout:'column',
	defaults:{
		xtype:'container',
		layout:'form',
		columnWidth:1
	},

	items:[{
		items:EXT001A.birthday
	},{
		items:EXT001A.age
	}
	]
});
EXT001A.rootNode = new Ext.tree.AsyncTreeNode({
	text:"Animal",
		children:[{
			text:'cat',
			leaf:true
		},{
			text:'Dog',
			children:[{
				text:'Mini Dog',
				leaf:true
			}]
		}]
});
EXT001A.treePanel = new Ext.tree.TreePanel({
	id:'treePanel',
	title:'Animal',
	root:EXT001A.rootNode,
	height:150
});

EXT001A.panel = new Ext.Panel({
	
		autoWidth : true,
		autoHeight : true,
		border : false,
		columnWidth : 1,
	
	    items: [{items:EXT001A.treePanel
	    }  ]
	    
});

EXT001A.gridColumns=[{
	header:'Firstname',
	dataIndex:'fname',
	align:'center',
	width:"10%",
	editor:EXT001A.fname
},{
	header:'Lastname',
	dataIndex:'lname',
	align:'center',
	width:"10%",
	editor:EXT001A.lname
	
}];
EXT001A.gridStrore = new Ext.data.JsonStore({
	storeId:'gridStore',
	root:'records',
	fields:[{
		name:'faname'
	},{
		name:'lname'
	}]/*,
autoLoad:true,
baseParams:{
	method:'quality'
},
url:'/ExtjsTraining/EXT001.html',
method:'POST'
*/
});

	
 EXT001A.testt = new Ext.form.TextField({
	id : 'lnameaa',
	fieldLabel : "Lastname",
	

	});

EXT001A.createGrid = new Ext.grid.EditorGridPanel({
	id:'createGrid',
	store:EXT001A.gridStrore,
	columns: EXT001A.gridColumns,
	height:127,
	width:500,	
});

EXT001A.tabPanel = new Ext.TabPanel({
	autoHeight:true,
	autoWidth:true,
	activeTab:0,
	padding:5,
	border:true,
	style:{
		"margin-left": "auto",
		"margin-right":"auto",
		"margin-top":"auto",
		"padding-top":"auto"
			
	},
	activeTab:0,
	items:[{
	
	
			title:'Tab1',
			items:EXT001A.panel
		},{
			title:'Tab2',
			items:EXT001A.createGrid
		}]
		
	
		

});