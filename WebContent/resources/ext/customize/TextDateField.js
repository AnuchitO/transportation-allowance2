Ext.namespace('Ext.fission');

Ext.fission.TextDateField = Ext.extend(Ext.form.DateField, {
	format : 'd/m/Y'
	,altFormats: "d/m/Y|d/m/y|j/n/Y|j/n/y|dmY|dmy"
	,formatLength : {'d':2,'D':3,'j':2,'m':2,'M':3,'n':2,'y':2,'Y':4}
	,oldValue:''
	,initComponent: function() {
		this.maxLength = this.getMaxLength();
		this.dateFrom = this.initialConfig.dateFrom;
		this.dateTo = this.initialConfig.dateTo;
		Ext.fission.TextDateField.superclass.initComponent.call(this);
	}
	,initEvents: function () {
		var dateSeparator = String(this.format).replace(/[a-z|0-9]/gi,'');
		var allowed = '^[0-9'+dateSeparator+']*$';				
        this.maskRe = new RegExp(allowed);
        Ext.fission.TextDateField.superclass.initEvents.call(this);
	}
	,filterKeys : function(e) {
		if(this.readOnly){e.stopEvent(); return;}
		if(e.ctrlKey){ return; }
        var k = e.getKey();
        if(Ext.isGecko && (e.isNavKeyPress() || k == e.BACKSPACE || (k == e.DELETE && e.button == -1))){ return; }
        var cc = String.fromCharCode(e.getCharCode());
        if(!Ext.isGecko && e.isSpecialKey() && !cc){ return; }
        
        var value = this.getRawValue();
        this.el.focus();
        var selectionStart = this.getSelectionStart()
        	, selectionEnd = this.getSelectionEnd();
        	
        var f = value.substring(0,selectionStart)
        	, b = value.substring(selectionEnd,value.length);
        
        var result = f+cc+b;
        
        if(result.length>this.maxLength || !this.maskRe.test(cc)){
 			e.stopEvent();
        }
	}
	,beforeBlur: function () {
		if(this.maskRe.test(this.getRawValue())) {
			if (this.isValid()) {
	            var v = this.parseDate(this.getRawValue());
	            if (v) {
	                this.setValue(v);
	                return;
	            }
	        }
		}

        this.setValue(this.oldValue);
    }
    ,safeParse : function(value, format) {
        if (/[gGhH]/.test(format.replace(/(\\.)/g, ''))) {
            return Date.parseDate(value, format);
        } else {
            var parsedDate = Date.parseDate(value + ' ' + this.initTime, format + ' ' + this.initTimeFormat, true);
            if (parsedDate) return parsedDate.clearTime();
        }
    }
	,getValue : function() {
		var value = Ext.fission.TextDateField.superclass.getValue.call(this);
		this.oldValue = (value=='')?'':this.oldValue;
		return this.formatDate(value);
	}
	,getRawValue: function() {
    	var  value = Ext.fission.TextDateField.superclass.getRawValue.call(this);
    	this.oldValue = (value=='')?'':this.oldValue;    	
    	return value;
    }
	,preFocus: function() {
    	this.oldValue = this.getRawValue();
    	this.setRawValue(this.oldValue);
    }
	,onTriggerClick : function() {
		this.getValue = Ext.fission.TextDateField.superclass.getValue;
		Ext.fission.TextDateField.superclass.onTriggerClick.call(this);
		this.getValue = this.getValueBackup;
    }
    ,getValueBackup : function() {
    	return this.formatDate(Ext.fission.TextDateField.superclass.getValue.call(this));
    }
    ,getMaxLength : function() {
    	var maxLength = 0;
    	var formatArray = this.format.split('');
    	for(var i=0;i<formatArray.length;i++) {
    		if(this.formatLength[formatArray[i]]) {
    			maxLength += this.formatLength[formatArray[i]];
    		} else {
    			maxLength += 1;
    		}
    	}
    	return maxLength;
    }
    ,getSelectionStart : function() {
    	var selectionStart = -1;
    	var d = this.el.dom;
    	if(typeof d.selectionStart != 'undefined') {
    		var d = this.el.dom;
    		selectionStart = d.selectionStart;
    	} else if(document.selection) {
    		selectionStart = document.selection.createRange().moveStart('character', -10000000)*-1;
    	}
    	return selectionStart;
    }
    ,getSelectionEnd : function() {
    	var selectionEnd = -1;
    	var d = this.el.dom;
    	if(typeof d.selectionEnd != 'undefined') {
    		var d = this.el.dom;
    		selectionEnd = d.selectionEnd;
    	} else if(document.selection) {
    		selectionEnd = document.selection.createRange().moveEnd('character', -10000000)*-1;
    	}
    	return selectionEnd;
    }
    ,setValue: function(date)
    {
    	var isValid = true;

    	if (this.dateTo)
    	{
    		var dateToObj = this.dateTo;
        	if (Ext.isString(this.dateTo))
        	{
        		dateToObj = Ext.getCmp(this.dateTo);
        	}
        	
    		if (dateToObj.getValue() == '' || dateToObj.getValue().trim() == '')
    		{
    			dateToObj.setValue(this.formatDate(this.parseDate(date)));
    		}
    		else
    		{
    			var dateToValue = this.parseDate(dateToObj.getValue());
    			var dateFromValue = this.parseDate(date);
    			
    			if (dateFromValue && (dateFromValue.getTime() > dateToValue.getTime()))
    			{
        			dateToObj.setValue(this.formatDate(this.parseDate(date)));
    			}
    		}
    		
    		dateToObj.setMinValue(this.formatDate(this.parseDate(date)));
    	}
    	
    	if (this.dateFrom)
    	{
    		var dateFromObj = this.dateFrom;
        	if (Ext.isString(this.dateFrom))
        	{
        		dateFromObj = Ext.getCmp(this.dateFrom);
        	}
    		
    		if (dateFromObj.getValue() != '' && dateFromObj.getValue().trim() != '')
    		{
    			var dateFromValue = this.parseDate(dateFromObj.getValue());
    			var dateToValue = this.parseDate(date);
    			if (dateToValue && (dateFromValue.getTime() > dateToValue.getTime()))
    			{
    				isValid = false;
    			}
    		}
    	}

    	var result = undefined;
    	if (isValid)
    	{
        	result = Ext.fission.TextDateField.superclass.setValue.call(this, this.formatDate(this.parseDate(date)));
    	}
    	else
    	{
        	result = Ext.fission.TextDateField.superclass.setValue.call(this, this.formatDate(this.parseDate(this.lastValue)));
    	}
    	
    	this.lastValue = result.getValue();
        return result;
    }
});
Ext.reg('fission-textdatefield', Ext.fission.TextDateField);