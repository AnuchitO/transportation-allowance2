Ext.namespace('Ext.ss.form');

Ext.ss.form.Checkbox = Ext.extend(Ext.form.Checkbox,
{
	uncheckedValue: 0
	, inputValue: 1
    , onRender : function(ct, position){
		Ext.ss.form.Checkbox.superclass.onRender.call(this, ct, position);
		this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: (this.name||this.id), id: (this.id||this.name), value:this.uncheckedValue}, 'before', true);
		this.el.dom.name='';
		this.el.dom.id='';
	}
	,getValue : function(){
		return this.hiddenField.value;
    }
    ,setValue : function(v){
    	Ext.ss.form.Checkbox.superclass.setValue.call(this,v);
    	if(this.checked)
    	{
    		this.hiddenField.value = this.inputValue;
    	}
    	else
    	{
    		this.hiddenField.value = this.uncheckedValue;
    	}
        return this;
    }
});

Ext.reg('ss-checkbox', Ext.ss.form.Checkbox);
