Ext.namespace('Ext.ss.form');

Ext.ss.form.NumberField = Ext.extend(Ext.form.NumberField ,{
	integerPrecision: 15
	,decimalPrecision: 2
	,format: undefined
	,style: 'text-align:right'
	,oldValue:''
	,initEvents: function () {
		var allowed = '^';	
		if (this.allowNegative) { allowed += '[-]?'; }
        allowed += '['+this.baseChars+']{0,'+this.integerPrecision+'}((';
        if (this.allowDecimals && this.decimalPrecision > 0) {
            allowed += '[\\'+this.decimalSeparator+']['+this.baseChars+']{0,'+this.decimalPrecision+'}$)|(';
        }
        allowed += '$))';
        this.maskRe = new RegExp(allowed); //^[-]?[0-9]{0,5}(([\.][0-9]{0,2}$)|($))
        this.initFormat();
        Ext.form.NumberField.superclass.initEvents.call(this);
	}
	,initFormat: function() {
		if(!this.format) {
			this.format = '0,0';
			if(this.allowDecimals && this.decimalPrecision > 0) {
				this.format += '.';
				for(var i=0;i<this.decimalPrecision;i++) {
					this.format += '0';
				}
			}
		}
	}
	,filterKeys: function(e) {
		if(this.readOnly){e.stopEvent(); return;}
        var k = e.getKey();
        if(e.ctrlKey){
			if(k === 118) { // Ctrl + v
				e.stopEvent();
			}
			return; 
		}
        if(Ext.isGecko && (e.isNavKeyPress() || k == e.BACKSPACE || (k == e.DELETE && e.button == -1))){ return; }
        var cc = String.fromCharCode(e.getCharCode());
        if(!Ext.isGecko && e.isSpecialKey() && !cc){ return; }
        
        var value = this.getRawValue();    
        this.el.focus();
        var selectionStart = this.getSelectionStart(), selectionEnd = this.getSelectionEnd();
        	
        var n = '', f = value.substring(0,selectionStart), b = value.substring(selectionEnd,value.length);
        
        if(f.substring(0,1)=='-') { n = '-'; f = f.substring(1,f.length); }
        
        if(f.length >= this.integerPrecision) {
        	if(f.substring(0,1)=='0') { f = f.substring(1,f.length); }
        }
        
        if(cc == this.decimalSeparator) {
        	if(b.length > this.decimalPrecision) {
        		b = b.substring(0,this.decimalPrecision);	
        	}
        }
        
        var result = n+f+cc+b;
        if(!this.maskRe.test(result)){
        	e.stopEvent();
        }
	}
	,beforeBlur : function(){
		var value = this.subStringValue(this.getRawValue());
        var v = this.parseValue(value);
        if(!Ext.isEmpty(v)){ this.setValue(this.fixPrecision(v)); } 
        else { this.setValue(this.oldValue); }
    }
    ,setValue: function (v) {
    	v = this.validateAndRemoveComma(v);
    	v = this.subStringValue(v);
    	v = Ext.isNumber(v) ? v : parseFloat(String(v).replace(this.decimalSeparator, "."));
    	v = isNaN(v) ? '' : v;
    	if(v !== '' && this.format) { v = Ext.util.Format.number(v,this.format); }
        v = String(v).replace(".", this.decimalSeparator);
        Ext.form.NumberField.superclass.setValue.call(this, v);
    }
    ,getValue: function() {
    	var  value = Ext.form.NumberField.superclass.getValue.call(this);
    	this.oldValue = (value=='')?'':this.oldValue;
    	return this.fixPrecision(this.parseValue(this.validateAndRemoveComma(value)));
    }
    ,getRawValue: function() {
    	var  value = Ext.form.NumberField.superclass.getRawValue.call(this);
    	this.oldValue = (value=='')?'':this.oldValue;
    	var v = this.validateAndRemoveComma(value);
    	v = isNaN(v)?'':v;
    	return v;
    }
    ,preFocus: function() {
    	if(!this.readOnly){
	    	this.oldValue = this.getRawValue();
	    	this.setRawValue(this.oldValue);
    	}
    }
    ,validateAndRemoveComma: function(value) {
    	return this.removeComma(this.validateComma(value));
    }
    ,removeComma: function(value) {
    	return (value!='')?String(value).replace(/,/g,''):'';
    }
    ,validateComma: function(value) {
    	value = String(value);
    	if(value.indexOf(',')!=-1) {
	    	var decimalIndex = value.indexOf(this.decimalSeparator), f=value;
	    	var length = value.length;
	    	if(decimalIndex!=-1) { f = value.substring(0,decimalIndex); }
	    	if(f.substring(0,1)=='-') { f = f.substring(1,f.length); }
    	
			var i = f.length-1;
			var j = 1;
			while(i >= 0){
				if(j%4==0){ if(f.charAt(i)!=',') { return ''; }} 
				else{ if(f.charAt(i)==',') { return ''; }}
				j++;
				i--;
			}
		}
    	return value;
    }
    ,subStringValue: function(value) {
    	value = String(value);
    	if(value != '') {
	    	var decimalIndex = value.indexOf(this.decimalSeparator);
			if(decimalIndex==-1) {
				value = value.substring(0,this.integerPrecision+((value.substring(0,1)=='-')?1:0));
			} else {
				var n = ''
		        	, f = value.substring(0,decimalIndex)
		        	, b = value.substring(decimalIndex+1,value.length);
		        if(f.substring(0,1)=='-') {
		        	n = '-';
		        	f = f.substring(1,f.length);
		        }
		        
		        if(f.length > this.integerPrecision) {
			        var substringIndex = 0;
			        var fLength = f.length;
			        while((fLength > this.integerPrecision)) {
			        	if(f.substr(substringIndex,1)=='0') { substringIndex++; fLength--; } 
			        	else { break; }
			        }		        
			        f = f.substring(substringIndex,f.length);
		        	f = f.substring(0,this.integerPrecision);
		        	b = '';
		        }
		        else if(b.length > this.decimalPrecision) { 
		        	b = b.substring(0,this.decimalPrecision); 
		        }
		        
		        value = n+f+this.decimalSeparator+b;
			}
    	}
		return value;
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
    },
    getSelectionEnd : function() {
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
});

Ext.reg('ss-numberfield', Ext.ss.form.NumberField);
