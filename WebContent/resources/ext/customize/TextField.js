Ext.namespace('Ext.ss.form');

Ext.ss.form.TextField = Ext.extend(Ext.form.TextField ,
{
	onRender : function(ct, position)
	{
		if(this.maxLength)
		{
			this.autoCreate = {tag: 'input', type: 'text', maxlength:this.maxLength};
		}
		Ext.ss.form.TextField.superclass.onRender.call(this, ct, position);
	}
});

Ext.reg('ss-textfield', Ext.ss.form.TextField);
