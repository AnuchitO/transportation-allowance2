Ext.namespace('Ext.ss');

Ext.ss.form.TwinTextField = Ext.extend(Ext.form.TextField ,
{	descriptionWidth: undefined,
	descriptionId: undefined,
	descriptionName: undefined,
	descriptionStyle: undefined,
	descriptionReadOnly: true,
	descriptionAllowBlank: true,
	onRender : function(ct, position)
	{
		Ext.form.TextField.superclass.onRender.call(this, ct, position);
		this.descriptionId = Ext.value(this.descriptionId, this.id + '-descfield');
		this.descriptionName = Ext.value(this.descriptionName, this.descriptionId);
		this.wrap = this.el.wrap({cls:'x-form-field-wrap'});
		this.defaultDescriptionConfig = Ext.apply({
			renderTo: this.wrap.id,
			id: this.descriptionId,
			hideLabel: true,
			name: this.descriptionName,
			style: this.descriptionStyle,
			tabIndex: -1,
			readOnly: this.descriptionReadOnly,
			allowBlank: this.descriptionAllowBlank
		},this.descriptionConfig);
		
		this.defaultDescriptionConfig.style = this.defaultDescriptionConfig.style || {};
		if (typeof this.defaultDescriptionConfig.style === "string") {
			var cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
				matches;
			while ((matches = cssRe.exec(styles))) {
				this.defaultDescriptionConfig.style[matches[1]] = matches[2];
			}
		}
		Ext.applyIf(this.defaultDescriptionConfig.style, {
			'margin-left': '5px'
		});
		
		if(!this.descriptionWidth) {
			Ext.apply(this.defaultDescriptionConfig,{anchor:'100%'});
		}else{
			Ext.apply(this.defaultDescriptionConfig,{width:this.descriptionWidth});
		}

		this.description = new Ext.form.TextField(this.defaultDescriptionConfig);
	}
	,
	onResize : function(w, h){
		Ext.form.TextField.superclass.onResize.call(this, w, h);
		if(Ext.isEmpty(this.descriptionWidth)) {
	        var wrapWidth = this.wrap.getWidth(),
	        	marginLeft = this.description.el.getMargins('l'),
	        	descriptionWidth = wrapWidth - this.label.getPadding('r')-1 - this.el.getMargins('l') - w - marginLeft;
	        
	        this.description.setSize(descriptionWidth, h);	       
        }
    }
});

Ext.reg('ss-twintextfield', Ext.ss.form.TwinTextField);