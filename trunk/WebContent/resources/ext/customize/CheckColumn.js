Ext.namespace('Ext.ss.grid');

Ext.ss.grid.CheckColumn = Ext.extend(Ext.ux.grid.CheckColumn,
{
	uncheckedValue:0,
	inputValue:1,
	disabled:false,
	locked:false,
	columnLocked:false,
	init : function(grid){
		this.grid = grid;
        this.grid.on('render', function(){
            var view = this.grid.getView();
            view.mainBody.on('mousedown', this.onMouseDown, this);
        }, this);

	    var records = this.grid.store.getRange();
	    for(var i=0;i<records.length;i++) {
	    	records[i].set(this.dataIndex, this.uncheckedValue);
	    }
	},
	onMouseDown : function(e, t) {
		if(!this.isLocked() && !this.isDisabled()) {
			if(Ext.fly(t).hasClass(this.createId())){
	            e.stopEvent();
	            var index = this.grid.getView().findRowIndex(t);
	            var record = this.grid.store.getAt(index);
	            var value = record.data[this.dataIndex];
	            var e = {
	            	checkColumn: this,
	            	grid: this.grid,
	            	store: this.grid.store,
	                record: record,
	                field: this.dataIndex,
	                originalValue: value,
	                value: (value===this.inputValue)?this.uncheckedValue:this.inputValue,
	                row: index,
	                column: this.grid.colModel.getIndexById(this.dataIndex),
	                cancel:false
	            };
	            if(this.beforeCheck(e) !== false && !e.cancel) {
	            	var checked = !(value===this.inputValue);
		            if(checked) {
		            	record.set(this.dataIndex, this.inputValue);
		            }
		            else {
		            	record.set(this.dataIndex, this.uncheckedValue);
		            }
		            this.afterCheck(e);
	            }
			}
        }
	},
	beforeCheck : function(e) {},
	afterCheck : function(e) {},
	redererCheckbox : function(v,disabled) {
		return String.format('<div class="x-grid3-check-ss-col{0}{1} {2}">&#160;</div>', v ? '-on' : '',disabled?'-disabled':'' , this.createId());
	},
	renderer : function(v, p, record){
        p.css += ' x-grid3-check-col-td'; 
        return this.redererCheckbox(v,this.disabled);
    },
    setDisabled : function(disabled) {
    	if(disabled && this.disabled!==disabled) {
	    	this.disabled = disabled;
	    	this.grid.getView().refresh(false);
    	}
    },
    isDisabled : function() {
    	return this.disabled;
    },
    lock : function() {
    	this.locked = true;
    },
    unlock : function() {
    	this.locked = false;
    },
    isLocked : function() {
    	return this.locked;	
    }
});

Ext.reg('ss-checkcolumn', Ext.ss.grid.CheckColumn);
