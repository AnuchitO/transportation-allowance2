Ext.namespace('Ext.ss.grid');

Ext.ss.grid.CheckboxSelectionModel = Ext.extend(Ext.grid.AbstractSelectionModel, {
	id : 'checker',
	width:20,
	sortable:false,
	menuDisabled : true,
	fixed : true,
	hideable: false,
	dataIndex : 'checkedFlag',
	haveFieldDataIndex: false,
	disabledDataIndex : 'disabledFlag',
	lockOnInit : false,
	checkOnly : false,
	singleSelect : false,
	header:'<div class="x-grid3-hd-checker">&#160;</div>',
	readOnly: false,
	constructor : function(config){
		this.__id = config.id;
		delete config.id;
        this.header=this.renderHdCheckbox();
        Ext.apply(this, config);
        
        this.selections = new Ext.util.MixedCollection(false, function(o){
            return o.id;
        });

        this.last = false;
        this.lastActive = false;

        this.addEvents(
            'selectionchange',
            'highlightselectionchange',
            'beforerowselect',
            'beforerowhighlight',
            'rowselect',
            'rowhighlight',
            'rowdeselect',
            'rowunhighlight',
            'beforerowdisable',
            'rowdisable',
            'beforerowenable',
            'rowenable',
            'beforerowselectall',
            'rowselectall',
            'beforerowhighlightall',
            'rowhighlightall',
            'clearrowselect',
            'clearrowhighlight'
        );
        Ext.ss.grid.CheckboxSelectionModel.superclass.constructor.call(this);

        this.checkboxSelections = new Ext.util.MixedCollection(false, function(o){
            return o.id;
        });
        if(this.checkOnly){
            this.handleMouseDown = Ext.emptyFn;
        }

        this.renderer = this.renderer.createDelegate(this);
    },
    renderHdCheckbox : function() {
    	return '<div id="x-grid3-hd-checker-'+this.__id+'" class="x-grid3-hd-checker">&#160;</div>';
    },
    renderRowCheckbox : function(index, check, disabled, p) {
    	return '<div class="x-grid3-row-ss-checker-'+this.__id+' x-grid3-row-ss-checker'+(disabled?'-disabled':(check?'-on':''))+'">&#160;</div>';
    },
    renderer : function(v, p, record, rowIndex, colIndex, store) {
    	return this.renderRowCheckbox(rowIndex,false,record.get(this.disabledDataIndex),p);
    }, 
    initEvents : function(){
        if(!this.grid.enableDragDrop && !this.grid.enableDrag){
            this.grid.on('rowmousedown', this.handleMouseDown, this);
        }
        
        this.grid.on('render', function(){
			var view = this.grid.getView();
			if(view.lockedBody) {
				view.lockedBody.on('mousedown', this.onMouseDown, this);
			}
			if(view.lockedInnerHd) {
				Ext.fly(view.lockedInnerHd).on('mousedown', this.onHdMouseDown, this);
			}
			view.mainBody.on('mousedown', this.onMouseDown, this);
			Ext.fly(view.innerHd).on('mousedown', this.onHdMouseDown, this);
		}, this); 

        this.rowNav = new Ext.KeyNav(this.grid.getGridEl(), {
            'up' : function(e){
                if(!e.shiftKey || this.singleSelect){
                    this.highlightPrevious(false);
                }else if(this.last !== false && this.lastActive !== false){
                    var last = this.last;
                    this.highlightRange(this.last,  this.lastActive-1);
                    this.grid.getView().focusRow(this.lastActive);
                    if(last !== false){
                        this.last = last;
                    }
                }else{
                    this.highlightFirstRow();
                }
            },
            'down' : function(e){
                if(!e.shiftKey || this.singleSelect){
                    this.highlightNext(false);
                }else if(this.last !== false && this.lastActive !== false){
                    var last = this.last;
                    this.highlightRange(this.last,  this.lastActive+1);
                    this.grid.getView().focusRow(this.lastActive);
                    if(last !== false){
                        this.last = last;
                    }
                }else{
                    this.highlightFirstRow();
                }
            },
            scope: this
        });

        this.grid.getView().on({
            scope: this,
            refresh: this.onRefresh,
            rowupdated: this.onRowUpdated,
            rowremoved: this.onRemove
        });
        
        if (this.grid.store) {
    		for(var i=0;i<this.grid.store.fields.items.length;i++) {
    			if(this.grid.store.fields.items[0].name==this.dataIndex) {
    				this.haveFieldDataIndex = true;
    				break;
    			}
    		}
    		
			var sm = this;
        	var grid = this.grid;
        	this.grid.store.on('load',function(store, records, options){
        		if(!sm.haveFieldDataIndex) { return; }
        		for(var i=0;i<records.length;i++) {
        			var value = records[i].get(sm.dataIndex);
        			value = new Boolean(value);
        			if(value.valueOf()) {
        				sm.selectRow(i,true);
        			} else {
        				sm.deselectRow(i);
        			}
        		}
        		sm.updateSelectAll();
        	});
        }
    },
    onRefresh : function(){
        var ds = this.grid.store, index;
        var s = this.getSelections();
        this.clearSelections(true);
        var hd = this.getHdElement();
    	if(hd.hasClass('x-grid3-hd-checker-on')){
            hd.removeClass('x-grid3-hd-checker-on');
        }
        for(var i = 0, len = s.length; i < len; i++){
            var r = s[i];
            if((index = ds.indexOfId(r.id)) != -1){
                this.selectRow(index, true);
            }
        }
        if(s.length != this.checkboxSelections.getCount()){
            this.fireEvent('selectionchange', this);
        }
    },
    onRemove : function(v, index, r){
        if(this.checkboxSelections.remove(r) !== false){
            this.fireEvent('selectionchange', this);
            if(this.checkboxSelections.items.length==0) {
            	var hd = this.getHdElement();
            	if(hd.hasClass('x-grid3-hd-checker-on')){
	                hd.removeClass('x-grid3-hd-checker-on');
	            }
            }
        }
    },
    onRowUpdated : function(v, index, r){
        if(this.isSelected(r)){
        	var checkbox = this.getRowElement(index);
            checkbox.addClass('x-grid3-row-ss-checker-on');
            this.clearHighlightSelections();
            v.onRowSelect(index);
		} else if(this.isHighlighted(r)) {
        	this.highlightRow(index, false);
        }
    },
    getHighlightCount : function(){
        return this.selections.length;
    },
    getCount : function(){
        return this.checkboxSelections.length;
    },
    handleMouseDown : function(g, rowIndex, e) {
        if(e.button !== 0 || this.isLocked()){
            return;
        }
        var view = this.grid.getView();
        if(e.shiftKey && !this.singleSelect && this.last !== false){
            var last = this.last;
            this.highlightRange(last, rowIndex, e.ctrlKey);
            this.last = last; // reset the last
            view.focusRow(rowIndex);
        }else{
            var isHighlighted = this.isHighlighted(rowIndex);
            if(e.ctrlKey && isHighlighted){
                this.unHighlightRow(rowIndex);
            }else if(!isHighlighted || this.getHighlightCount() > 1){
            	if(this.singleSelect) {
            		if(!this.hasSelection()) {
            			this.highlightRow(rowIndex, e.ctrlKey || e.shiftKey);
	            		view.focusRow(rowIndex);	
            		}
            	} else {
	            	this.highlightRow(rowIndex, e.ctrlKey || e.shiftKey);
	            	view.focusRow(rowIndex);
            	}
            }
        }
    },
    onHdMouseDown : function(e, t){
    	if(e.button !== 0 || this.isLocked() || this.readOnly){
            return;
        }
        if(this.grid.store.getCount()==0) {
        	return;
        }
        if(t.className == 'x-grid3-hd-checker'){
            e.stopEvent();
            var hd = Ext.fly(t.parentNode);
            if(hd.hasClass('x-grid3-hd-checker-on')){
            	Ext.fly(t.parentNode).removeClass('x-grid3-hd-checker-on');
                this.clearSelections();
            }else{
                if(this.singleSelect) {
                	return;
                }

	            if(this.selectAll()!==false) {
	            	Ext.fly(t.parentNode).addClass('x-grid3-hd-checker-on');	
	            }
            }
        }
    },
    onMouseDown : function(e, t){
    	if (!this.readOnly)
    	{
    		var checker = Ext.fly(t);
    		if(checker.hasClass('x-grid3-row-ss-checker-disabled')) { return; }
            if(e.button === 0 && (checker.hasClass('x-grid3-row-ss-checker') || checker.hasClass('x-grid3-row-ss-checker-on'))){
                e.stopEvent();
                var row = e.getTarget('.x-grid3-row');
                if(row){
                    var index = row.rowIndex;
                    this.clearHighlightSelections();
                    var checkbox = Ext.fly(t.parentNode);
                    if(this.isSelected(index)){
                        this.deselectRow(index);
                    }else{
                        this.selectRow(index, true);
                        this.grid.getView().focusRow(index);
                    }
                    this.updateSelectAll();
                }
            }
    	}
    },
    getHdElement : function() {
    	return Ext.fly(Ext.getDom('x-grid3-hd-checker-'+this.__id).parentNode);
    },
    getRowElement : function(index) {
    	var view = this.grid.getView();
    	if(view.getLockedRow) {
    		var lrow = view.getLockedRow(index);
    		var cell = Ext.fly(lrow).child('div.x-grid3-row-ss-checker-'+this.__id);
    		if(cell) return cell;
    	}
    	var row = view.getRow(index);
    	var cell = Ext.fly(row).child('div.x-grid3-row-ss-checker-'+this.__id);
    	if(cell) return cell;
    	return null;
    },
    highlightRow : function(index, keepExisting, preventViewNotify){
        if(this.isLocked() || (index < 0 || index >= this.grid.store.getCount()) || (keepExisting && this.isHighlighted(index))){
            return;
        }
        var r = this.grid.store.getAt(index);
        
        if(r && this.fireEvent('beforerowhighlight', this, index, keepExisting, r) !== false){
            if(!keepExisting || this.singleSelect){
                this.clearHighlightSelections();
            }
            if(!this.checkboxSelections.contains(r)){
	        	this.selections.add(r);	
	        }
            this.last = this.lastActive = index;
            if(!preventViewNotify){
                this.grid.getView().onRowSelect(index);
            }
            this.fireEvent('rowhighlight', this, index, r);
            this.fireEvent('highlightselectionchange', this);
        }
    },
    selectRecords : function(records, keepExisting){
        if(!keepExisting){
            this.clearSelections();
        }
        var ds = this.grid.store;
        for(var i = 0, len = records.length; i < len; i++){
            this.selectRow(ds.indexOf(records[i]), true);
        }
    },
    highligthRecords : function(records, keepExisting){
        if(!keepExisting){
            this.clearHighlightSelections();
        }
        var ds = this.grid.store;
        for(var i = 0, len = records.length; i < len; i++){
            this.highlightRow(ds.indexOf(records[i]), true);
        }
    },
    selectRow : function(index, keepExisting, preventViewNotify) {
    	if(this.isLocked() || (index < 0 || index >= this.grid.store.getCount()) || (keepExisting && this.isSelected(index))){
            return;
        }
        var r = this.grid.store.getAt(index);
        if(r && this.fireEvent('beforerowselect', this, index, keepExisting, r) !== false){
        	if(this.singleSelect) {
        		this.clearSelections();
        		this.clearHighlightSelections();
        	}
            if(!keepExisting){
                this.clearSelections();
            }
            var checkbox = this.getRowElement(index);
            if(!checkbox.hasClass('x-grid3-row-ss-checker-disabled')){
            	this.selections.add(r);
            	this.checkboxSelections.add(r);
            	if(this.haveFieldDataIndex) {
            		r.data[this.dataIndex]=true;
            	}
            	checkbox.removeClass('x-grid3-row-ss-checker');
            	checkbox.addClass('x-grid3-row-ss-checker-on');
	            this.last = this.lastActive = index;
	            if(!preventViewNotify){
	                this.grid.getView().onRowSelect(index);
	            }
	            this.fireEvent('rowselect', this, index, r);
	            this.fireEvent('selectionchange', this);
            }
        }
    },
    unHighlightRow : function(index, preventViewNotify){
        if(this.isLocked()){
            return;
        }
        if(this.last == index){
            this.last = false;
        }
        if(this.lastActive == index){
            this.lastActive = false;
        }
        var r = this.grid.store.getAt(index);
        if(r){
        	if(!this.checkboxSelections.contains(r)){
            	this.selections.remove(r);
            	if(!preventViewNotify){
	                this.grid.getView().onRowDeselect(index);
	            }
        	}
            this.fireEvent('rowunhighlight', this, index, r);
            this.fireEvent('highlightselectionchange', this);
        }
    },
    deselectRow : function(index, preventViewNotify){
        if(this.isLocked()){
            return;
        }
        if(this.last == index){
            this.last = false;
        }
        if(this.lastActive == index){
            this.lastActive = false;
        }
        
        var checkbox = this.getRowElement(index);        
        if(!checkbox.hasClass('x-grid3-row-ss-checker-disabled')) {
        	var r = this.grid.store.getAt(index);
	        if(r){
	            this.selections.remove(r);
	            this.checkboxSelections.remove(r);
	            if(this.haveFieldDataIndex) {
            		r.data[this.dataIndex]=false;
            	}
            	checkbox.removeClass('x-grid3-row-ss-checker-on');
	            checkbox.addClass('x-grid3-row-ss-checker');
	            if(!preventViewNotify){
	                this.grid.getView().onRowDeselect(index);
	            }
	            this.fireEvent('rowdeselect', this, index, r);
	            this.fireEvent('selectionchange', this);
	        }
        }
    },
    disableRow : function(index) {
    	var checkbox = this.getRowElement(index);
        if(!checkbox.hasClass('x-grid3-row-ss-checker-disabled')){
        	var r = this.grid.store.getAt(index);
        	if(r && this.fireEvent('beforerowdisable', this, index, r) !== false){
	        	if(this.isSelected(index)) {
	        		this.deselectRow(index);
	        	}
	        	checkbox.removeClass('x-grid3-row-ss-checker');
	        	checkbox.addClass('x-grid3-row-ss-checker-disabled');
	        	r.data[this.disabledDataIndex]=true;
	        	this.updateSelectAll();
	        	this.fireEvent('rowdisable', this, index, r);
        	}
        }
    },
    enableRow : function(index) {
    	var checkbox = this.getRowElement(index);
        if(checkbox.hasClass('x-grid3-row-ss-checker-disabled')){
        	var r = this.grid.store.getAt(index);
        	if(r && this.fireEvent('beforerowenable', this, index, r) !== false){
        		checkbox.removeClass('x-grid3-row-ss-checker-disabled');
	        	checkbox.addClass('x-grid3-row-ss-checker');
	        	r.data[this.disabledDataIndex]=false;
	        	this.updateSelectAll();
	        	this.fireEvent('rowenable', this, index, r);
        	}
        }
    },
    highlightAll : function(){
        if(this.isLocked()){
            return false;
        }
        
        if(this.fireEvent('beforerowhighlightAll', this, index, r) === false) {
        	return false;
        }
        
        this.selections.clear();
        for(var i = 0, len = this.grid.store.getCount(); i < len; i++){
            this.highlightRow(i, true);
        }
        return this.fireEvent('rowhighlightall', this);
    },
    selectAll : function(){
        if(this.isLocked()){
            return false;
        }
        
        if(this.fireEvent('beforerowselectall', this)===false) {
        	return false;
        }
        
        this.clearSelections(true);
        for(var i = 0, len = this.grid.store.getCount(); i < len; i++){
            this.selectRow(i, true);
        }
        return this.fireEvent('rowselectall', this);
    },
    updateSelectAll : function() {
        if(this.isSelectedAll()) {
        	var hd = this.getHdElement();
        	if(!hd.hasClass('x-grid3-hd-checker-on')) {
        		hd.addClass('x-grid3-hd-checker-on');
        	}
        } else {
        	var hd = this.getHdElement();
        	if(hd.hasClass('x-grid3-hd-checker-on')) {
        		hd.removeClass('x-grid3-hd-checker-on');
        	}
        }
    },
    isHighlightedAll : function() {
    	return this.grid.store.data.items.length === this.selections.items.length;
    },
    isSelectedAll : function() {
    	var countNoDisabled = 0;
    	for(var i = 0, len = this.grid.store.getCount(); i < len; i++){
            var checkbox = this.getRowElement(i);
	        if(!checkbox.hasClass('x-grid3-row-ss-checker-disabled')){
	        	countNoDisabled++;
	        }
        }
    	return (countNoDisabled !== 0) && (countNoDisabled === this.checkboxSelections.items.length);
    },
    isSelected : function(index){
        var r = Ext.isNumber(index) ? this.grid.store.getAt(index) : index;
        return (r && this.checkboxSelections.key(r.id) ? true : false);	
    },
    isHighlighted : function(index){
        var r = Ext.isNumber(index) ? this.grid.store.getAt(index) : index;
        return (r && this.selections.key(r.id) ? true : false);
    },
    clearHighlightSelections : function(fast){
        if(this.isLocked()){
            return;
        }
        if(fast !== true){
            var ds = this.grid.store;
            var s = this.selections;
            s.each(function(r){
            	if(!this.checkboxSelections.containsKey(r.id)){
                	this.unHighlightRow(ds.indexOfId(r.id));
            	}
            }, this);
            s.clear();
        }else{
            this.selections.clear();
        }
        this.selections = this.checkboxSelections.clone();
        this.last = false;
        this.fireEvent('clearrowhighlight', this, fast);
    },
    clearSelections : function(fast){
        if(this.isLocked()){
            return;
        }
        if(fast !== true){
            var ds = this.grid.store;
            var s = this.checkboxSelections;
            s.each(function(r){
                this.deselectRow(ds.indexOfId(r.id));
            }, this);
            s.clear();
        }else{
        	if(this.haveFieldDataIndex) {
	        	var s = this.checkboxSelections;
	            s.each(function(r){
	                r.data[this.dataIndex]=false;
	            }, this);
	            s.clear();
        	}
            this.checkboxSelections.clear();
        }
        this.last = false;
        this.fireEvent('clearrowselect', this, fast);
    },
    highlightRange : function(startRow, endRow, keepExisting){
        var i;
        if(this.isLocked()){
            return;
        }
        if(!keepExisting){
            this.clearHighlightSelections();
        }
        if(startRow <= endRow){
            for(i = startRow; i <= endRow; i++){
                this.highlightRow(i, true);
            }
        }else{
            for(i = startRow; i >= endRow; i--){
                this.highlightRow(i, true);
            }
        }
    },
    selectRange : function(startRow, endRow, keepExisting){
        var i;
        if(this.isLocked()){
            return;
        }
        if(!keepExisting){
            this.clearSelections();
        }
        if(startRow <= endRow){
            for(i = startRow; i <= endRow; i++){
                this.selectRow(i, true);
            }
        }else{
            for(i = startRow; i >= endRow; i--){
                this.selectRow(i, true);
            }
        }
    },
    unHighlightRange : function(startRow, endRow, preventViewNotify){
        if(this.isLocked()){
            return;
        }
        for(var i = startRow; i <= endRow; i++){
            this.unHighlightRow(i, preventViewNotify);
        }
    },
    deselectRange : function(startRow, endRow, preventViewNotify){
        if(this.isLocked()){
            return;
        }
        for(var i = startRow; i <= endRow; i++){
            this.deselectRow(i, preventViewNotify);
        }
    },
    highlightFirstRow : function(){
        this.highlightRow(0);
    },
    selectFirstRow : function(){
        this.selectRow(0);
    },
    highlightLastRow : function(keepExisting){
        this.highlightRow(this.grid.store.getCount() - 1, keepExisting);
    },
    selectLastRow : function(keepExisting){
        this.selectRow(this.grid.store.getCount() - 1, keepExisting);
    },
    highlightNext : function(keepExisting){
        if(this.hasNext()){
            this.highlightRow(this.last+1, keepExisting);
            this.grid.getView().focusRow(this.last);
            return true;
        }
        return false;
    },
    selectNext : function(keepExisting){
        if(this.hasNext()){
            this.selectRow(this.last+1, keepExisting);
            this.grid.getView().focusRow(this.last);
            return true;
        }
        return false;
    },
    hasPrevious : function(){
        return !!this.last;
    },
    hasNext : function(){
        return this.last !== false && (this.last+1) < this.grid.store.getCount();
    },
    highlightPrevious : function(keepExisting){
        if(this.hasPrevious()){
            this.highlightRow(this.last-1, keepExisting);
            this.grid.getView().focusRow(this.last);
            return true;
        }
        return false;
    },
    selectPrevious : function(keepExisting){
        if(this.hasPrevious()){
            this.selectRow(this.last-1, keepExisting);
            this.grid.getView().focusRow(this.last);
            return true;
        }
        return false;
    },
    getSelections : function(){
        return [].concat(this.checkboxSelections.items);
    },
    getHighlightSelections : function(){
        return [].concat(this.selections.items);
    },
    getSelected : function(){
        return this.checkboxSelections.itemAt(0);
    },
    getHighlighted : function(){
        return this.selections.itemAt(0);
    },
    hasSelection : function(){
        return this.checkboxSelections.length > 0;
    },
    hasHighlightSelection : function(){
        return this.selections.length > 0;
    },
    isIdSelected : function(id){
        return (this.checkboxSelections.key(id) ? true : false);
    },
    isIdHighlighted : function(id){
        return (this.selections.key(id) ? true : false);
    },
    highlightRows : function(rows, keepExisting){
        if(!keepExisting){
            this.clearHighlightSelections();
        }
        for(var i = 0, len = rows.length; i < len; i++){
            this.highlightRow(rows[i], true);
        }
    },
    selectRows : function(rows, keepExisting){
        if(!keepExisting){
            this.clearSelections();
        }
        for(var i = 0, len = rows.length; i < len; i++){
            this.selectRow(rows[i], true);
        }
    },
    acceptsNav : function(row, col, cm){
        return !cm.isHidden(col) && cm.isCellEditable(col, row);
    },
    onEditorKey : function(field, e){
        var k = e.getKey(), 
            newCell, 
            g = this.grid, 
            last = g.lastEdit,
            ed = g.activeEditor,
            ae, last, r, c;
        var shift = e.shiftKey;
        if(k == e.TAB){
            e.stopEvent();
            ed.completeEdit();
            if(shift){
                newCell = g.walkCells(ed.row, ed.col-1, -1, this.acceptsNav, this);
            }else{
                newCell = g.walkCells(ed.row, ed.col+1, 1, this.acceptsNav, this);
            }
        }else if(k == e.ENTER){
            if(this.moveEditorOnEnter !== false){
                if(shift){
                    newCell = g.walkCells(last.row - 1, last.col, -1, this.acceptsNav, this);
                }else{
                    newCell = g.walkCells(last.row + 1, last.col, 1, this.acceptsNav, this);
                }
            } else {
            	newCell = g.walkCells(last.row, last.col, 1, this.acceptsNav, this);
            }
        }
        if(newCell){
            r = newCell[0];
            c = newCell[1];
            if(last.row != r){
                this.highlightRow(r);
            }
            if(g.isEditor && g.editing){ 
                ae = g.activeEditor;
                if(ae && ae.field.triggerBlur){
                    ae.field.triggerBlur();
                }
            }
            g.startEditing(r, c);
        }
    },
    destroy : function(){
        if(this.rowNav){
            this.rowNav.disable();
            this.rowNav = null;
        }
        Ext.ss.grid.CheckboxSelectionModel.superclass.destroy.call(this);
    },
    setReadOnly: function(readOnly)
    {
    	this.readOnly = readOnly;
    }
});