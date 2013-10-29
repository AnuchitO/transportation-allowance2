Ext.namespace('Ext.fission');

Ext.fission.LovField = Ext.extend(Ext.form.TriggerField, 
{
	lovTitle: 'List of value'
	, lovWidth: 400
	, lovHeight: 400
	, submitValue: undefined
	, triggerClass: 'x-form-search-trigger'
	, frameSrc: 'about:blank'
	, initComponent: function() 
	{
		Ext.fission.LovField.superclass.initComponent.call(this);
	}
	, initEvents : function()
	{
		Ext.fission.LovField.superclass.initEvents.call(this);
	}
	, onRender : function(ct, position)
	{
	    if (this.hiddenName && !Ext.isDefined(this.submitValue))
	    {
	        this.submitValue = false;
	    }
	    
	    Ext.fission.LovField.superclass.onRender.call(this, ct, position);
	    
	    if (this.hiddenName)
	    {
	        this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName, id: (this.hiddenId||this.hiddenName)}, 'before', true);
	    }
	    
        if (Ext.isGecko)
        {
            this.el.dom.setAttribute('autocomplete', 'off');
        }
	}
    , initValue : function()
    {
        Ext.fission.LovField.superclass.initValue.call(this);
        if (this.hiddenField)
        {
            this.hiddenField.value = Ext.value(Ext.isDefined(this.hiddenValue) ? this.hiddenValue : this.value, '');
        }
    }
    , onDestroy : function()
    {
        Ext.destroyMembers(this, 'hiddenField');
        Ext.fission.LovField.superclass.onDestroy.call(this);
    }
    , onEnable : function()
    {
        Ext.fission.LovField.superclass.onEnable.apply(this, arguments);
        if(this.hiddenField)
        {
            this.hiddenField.disabled = false;
        }
    }
    , getName: function()
    {
        var hf = this.hiddenField;
        return hf && hf.name ? hf.name : this.hiddenName || Ext.fission.LovField.superclass.getName.call(this);
    }
    , getValue : function()
    {
        if(this.hiddenField)
        {
            return Ext.isDefined(this.hiddenField.value) ? this.hiddenField.value : '';
        }
        else
        {
            return Ext.form.ComboBox.superclass.getValue.call(this);
        }
    }
    , clearValue : function()
    {
        if (this.hiddenField)
        {
            this.hiddenField.value = '';
        }
        this.setRawValue('');
        this.applyEmptyText();
        this.value = '';
    }
    , setValue : function(v, d)
    {
        var text = d ? d : v;
        if(this.hiddenField)
        {
            this.hiddenField.value = Ext.value(v, '');
        }
        Ext.form.ComboBox.superclass.setValue.call(this, text);
        this.value = v;
        return this;
    }
	, showLov: function () 
	{
		if (this.windowLov == undefined) 
		{
			var params = { elementId : this.getId() };

			this.windowLov = new Ext.Window
			({
				title: this.lovTitle
				, modal: true
				, resizable: false
				, plain: true
				, closable: true
                , closeAction: 'hide'
                , width: this.lovWidth
				, height: this.lovHeight
                , border: false
                , layout: 'border'
				, items: [{
					xtype : 'panel'
					, region: 'center'
	               	, border: false
	                , items : [{
						xtype : 'fission-iframe'
						, frameSrc : this.frameSrc + '?' +Ext.urlEncode(params)
					}]
	            }]
				, parent : this
				, listeners: {
					"show" : function(window)
					{
						window.setZIndex(11000);
						window.parent.triggerBlur = Ext.emptyFn;
					},
					"hide" : function(window)
					{						
						window.parent.triggerBlur = Ext.fission.LovField.superclass.triggerBlur;
						window.parent.focus();
					}
				}
			});
		}
		this.windowLov.show(this);
	}
	, hideLov: function(a) 
	{
		this.windowLov.hide();
		
	}
	, onTriggerClick: function () 
	{
		if (this.disabled) 
		{
			return;
		}
        this.showLov();
	}
	, beforeBlur: function()
	{
		if(Ext.isEmpty(this.getRawValue()))
		{
			this.setValue('','');
		}
	}
});
Ext.reg('fission-lovfield', Ext.fission.LovField);