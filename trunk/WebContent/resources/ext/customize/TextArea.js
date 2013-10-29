Ext.namespace('Ext.ss');

Ext.ss.form.TextArea = Ext.extend(Ext.form.TextArea, {
	maskRe: true,
	initEvents: function () {
	    Ext.ss.form.TextArea.superclass.initEvents.call(this);
	},
	filterKeys : function(e) {
		if(this.readOnly){e.stopEvent(); return;}
		if(e.ctrlKey){ return; }
	    var k = e.getKey();
	    
	    if(Ext.isGecko && k != e.ENTER && (e.isNavKeyPress() || k == e.BACKSPACE || (k == e.DELETE && e.button == -1))){ return; }
	    var cc = String.fromCharCode(e.getCharCode());
	    
	    if(!Ext.isGecko && e.isSpecialKey() && !cc){ return; }
	    
	    var value = this.getRawValue();
	    
	    this.el.focus();
	    var selectionStart = this.getSelectionStart(), selectionEnd = this.getSelectionEnd();
	    var f = value.substring(0,selectionStart)
	    	, b = value.substring(selectionEnd,value.length);
	    
	    var result = f+cc+b;
	    
	    if(this.maxLength && result.length>this.maxLength){
				e.stopEvent();
				return;
	    }

	    if(this.maskRe !== true && !this.maskRe.test(result)){
	    	e.stopEvent();
	    	return;
	    }
	},
	preFocus: function() {
    	this.oldValue = this.getRawValue();
    	this.setRawValue(this.oldValue);
    },
	beforeBlur : function(){
		var value = this.getRawValue();
		if(this.maskRe !== true && !this.maskRe.test(value)) {
			value = '';
		}
		else if(this.maxLength && value.length>=this.maxLength) {
			value = value.substring(0,this.maxLength);
		}
		
        if(!Ext.isEmpty(value)){
            this.setValue(value);
        } 
    },
	getSelectionStart : function() {
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

Ext.reg('ss-textarea', Ext.ss.form.TextArea);