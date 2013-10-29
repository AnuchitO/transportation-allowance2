Ext.namespace('Ext.fission');
Ext.fission.IFrameComponent = Ext.extend(Ext.BoxComponent, 
{
	frameSrc : 'about:blank',
	frameBorder : '0',
	height : '100%',
	width : '100%',
	marginHeight : undefined,
	marginWidth : undefined,
	name : undefined,
	scrolling : 'auto',
	baseParams : undefined,
	initComponent : function()
	{
		Ext.fission.IFrameComponent.superclass.initComponent.call(this);
		var json = { tag : 'iframe',id : this.getId(),src : this.frameSrc, allowtransparency:true };

		if(this.name) { json.name=this.name;} else {json.name=this.getId();}
		if(this.frameBorder) {json.frameBorder=this.frameBorder || '';}
		if(this.marginHeight) { json.marginHeight=this.marginHeight || '';  }
		if(this.marginWidth) { json.marginWidth=this.marginWidth || '';  }
		if(this.scrolling) { json.scrolling=this.scrolling || ''; }
		
		this.autoEl = json;
	},
	setFrameSrc : function(frameSrc)
	{
		var index = frameSrc.indexOf('?');
		if(index > -1) {
			var params = frameSrc.substring(index+1);
			if(Ext.isEmpty(params)) {
				this.baseParams = Ext.urlDecode(params) || {};
			}
		}
		
		if(!Ext.isEmpty(frameSrc) && this.frameSrc != frameSrc)
		{
			this.frameSrc = frameSrc;
			Ext.getDom(this.getId()).src = frameSrc;
			return true;
		}
		return false;
	},
	setFrameSrcIgnoreQueryParams : function(frameSrc) {
		var urlNoQueryParams = frameSrc;
		var index = frameSrc.indexOf('?');
		if(index > -1) {
			urlNoQueryParams = frameSrc.substring(0,index);
			var params = frameSrc.substring(index+1);
			if(!Ext.isEmpty(params)) {
				this.baseParams = Ext.urlDecode(params) || {};
			}
		}
		
		if(!Ext.isEmpty(frameSrc) && this.frameSrc != urlNoQueryParams)
		{
			this.frameSrc = urlNoQueryParams;
			Ext.getDom(this.getId()).src = frameSrc;
			return true;
		}
		return false;
	},
	setBaseParam : function(key,value) {
		this.baseParams[key] = value;
	},
	getBaseParam : function(key) {
		return this.baseParams[key] || '';
	}
});
Ext.reg('fission-iframe', Ext.fission.IFrameComponent);