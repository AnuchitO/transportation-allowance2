Ext.override(Ext.data.Store, {
	afterEdit : function(record,fast){
        if(this.modified.indexOf(record) == -1){
            this.modified.push(record);
        }
        if(fast!=true) {
        	this.fireEvent('update', this, record, Ext.data.Record.EDIT);
        }
    },
    remove : function(record ,fast){
        if(Ext.isArray(record)){
            Ext.each(record, function(r){
                this.remove(r ,fast);
            }, this);
        }
        var index = this.data.indexOf(record);
        if(index > -1){
            record.join(null);
            this.data.removeAt(index);
        }
        if(this.pruneModifiedRecords){
            this.modified.remove(record);
        }
        if(this.snapshot){
            this.snapshot.remove(record);
        }
        if(fast!=true && index > -1){
            this.fireEvent('remove', this, record, index);
        }
    },
    add : function(records,fast){
        records = [].concat(records);
        if(records.length < 1){
            return;
        }
        for(var i = 0, len = records.length; i < len; i++){
            records[i].join(this);
        }
        var index = this.data.length;
        this.data.addAll(records);
        if(this.snapshot){
            this.snapshot.addAll(records);
        }
        if(fast != true) {
        	this.fireEvent('add', this, records, index);
        }
    }
});

Ext.override(Ext.data.Record, {
	set : function(name, value, fast){
        var encode = Ext.isPrimitive(value) ? String : Ext.encode;
        if(encode(this.data[name]) == encode(value)) {
            return;
        }        
        this.dirty = true;
        if(!this.modified){
            this.modified = {};
        }
        if(this.modified[name] === undefined){
            this.modified[name] = this.data[name];
        }
        this.data[name] = value;
        if(!this.editing){
            this.afterEdit(fast);
        }
    },
    afterEdit : function(fast){
        if (this.store != undefined && typeof this.store.afterEdit == "function") {
            this.store.afterEdit(this,fast);
        }
    }
});

Ext.namespace('Ext.ss.grid');

Ext.ss.grid.EditorGridPanel = function(config) {
	this.pagingSnapshot = {removedRecords:[], removedPhantomRecords:[]};
    this.addEvents({
        "noSelectRow": true,
        "newRowDataNoComplete": true,
        "saveRowDataNoComplete": true
    });
    
    if(config['columnCenter']) this.columnCenter = config['columnCenter'];
    if(config['requireStyle']) this.requireStyle = config['requireStyle'];
    if(config['requireCls']) this.requireCls = config['requireCls'];
    if(config['saveNoCommitChanges']) this.saveNoCommitChanges = config['saveNoCommitChanges'];
    
    var fields = config.store.fields.items; /* use for new constructor */
    if(!fields) { fields = config.store.fields; }  /* use for xtype*/
    
    var configColumns;
    if(config.colModel && config.colModel.columns) {
	    configColumns = config.colModel.columns;
    } else {
    	configColumns = config.columns;
    }
    
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].require == true) {
            var columns = configColumns;
            for (var j = 0; j < columns.length; j++) {
                if (fields[i].name == columns[j].dataIndex) {
                	var require = '<label '
                		+(this.requireStyle?'style="'+this.requireStyle+'"':'')+' '
                		+(this.requireCls?'class="'+this.requireCls+'"':'')+'>&nbsp;*</label>';
                	configColumns[j].header = columns[j].header + require;
                }
            }
        }
    }
    
    if(this.columnCenter) {
	    var columns = configColumns;
	    for (var j = 0; j < columns.length; j++) {
	    	configColumns[j].header = '<center>'+configColumns[j].header+'</center>';
	    }
    }
    
    if(config.colModel && config.colModel.columns) {
	    config.colModel.columns = configColumns;
    } else {
    	config.columns = configColumns;
    }
    
//    if (config.store && config.store.fields)
//    {
//    	config.store.fields.add('extRecordId', new Ext.data.Field({name: 'extRecordId'}));
//    }

    Ext.ss.grid.EditorGridPanel.superclass.constructor.call(this, config);

    var pagingToolbar = this.getPagingToolbar();
    var store = this.getStore();
    if (pagingToolbar && store && !store.pruneModifiedRecords)
    {
    	pagingToolbar.addListener('beforechange', this.__pagingBeforeChange, this);
    }

    if (store)
    {
    	store.addListener('load', this.__storeLoad, this);
    }
    //this.reconfigure(store, this.colModel);
};

Ext.extend(Ext.ss.grid.EditorGridPanel, Ext.grid.EditorGridPanel, {
	columnCenter : true,
	requireStyle : undefined,
	requireCls : 'requiredField',
	saveNoCommitChanges : false,
	newRowDataNoCompleteAvailable: true,
    initEvents: function () {
        Ext.ss.grid.EditorGridPanel.superclass.initEvents.call(this);
        this.el.on("beforeedit", this.onBeforeEdit, this);
    },
    onBeforeEdit: function (e) {
    	e.grid.syncSize();
        return true;
    },
    isGridDirty: function() {
    	var store = this.getStore();
    	var records = store.getModifiedRecords();
    	var dirty = (records && records.length > 0)?true:false;
    	dirty = dirty || (store.removed && store.removed.length > 0)?true:false;
    	dirty = dirty || (this.pagingSnapshot && this.pagingSnapshot.removedRecords && this.pagingSnapshot.removedRecords.length > 0)?true:false;
    	return dirty;
    },
    getPagingToolbar: function() {
    	var bbar = this.getBottomToolbar();
    	if(bbar) {
    		if(bbar.isXType('paging',true)){
				return bbar;
			} else {
				var paging = bbar.findByType('paging',true)[0];
				if(paging){
			        return paging;
				}
			}
    	}
		return undefined;
    },
    checkRowDataNoComplete: function(store,record,eventName){
    	var count = store.getCount(); 
        if (count > 0) {
            var checkIndex = (count - 1);
            var checkRow = store.data.items[checkIndex];
            if(checkRow) {
	            var checkField = store.fields.items;
	            for (var i = 0; i < checkField.length; i++) {
	                if (checkField[i].require == true) {
	                    fieldName = checkField[i].name;
	                    if (Ext.isEmpty(checkRow.data[fieldName])) {
	                        var e = { grid: this, record: record, field: checkField[i]};
	                        this.fireEvent(eventName, e);
	                        return true;
	                    }
	                }
	            }
        	}
        }
        return false;
    },
    addRow: function (record) 
    {
    	var store = this.getStore();
    	var defaultValue = {};
    	
    	if(this.checkRowDataNoComplete(store,record,'newRowDataNoComplete')) { return; }
        
    	var checkField = store.fields.items;
        for (var i = 0; i < checkField.length; i++) {
        	defaultValue[checkField[i].name] = '';
        }
        
        Ext.applyIf(record,defaultValue);
        var extRecords = new store.recordType(record);
        extRecords.markDirty();
        store.afterEdit(extRecords,true);
        store.add(extRecords);
        var row = store.getCount()-1;
        var cm = this.getColumnModel();
        var colCount = cm.getColumnCount(true);
        for(var col=0 ; col<colCount ; col++){
	        if(cm.isCellEditable(col, row)){
	        	var selectionModel = this.getSelectionModel();
	        	if(selectionModel && Ext.isFunction(selectionModel.highlightRow)) {
	        		selectionModel.highlightRow(row, false);
	        	}
	       		this.startEditing(row,col);
	       		break;
	        }
        }
    },
    clearState: function()
    {
		var popCount = this.getStore().getModifiedRecords().length;
		for (var i = 0; i < popCount; i++) 
		{
			var record = this.getStore().getModifiedRecords().pop();
			record.reject();
		}
		this.pagingSnapshot.removedRecords = [];
		this.pagingSnapshot.removedPhantomRecords = [];
		this.getStore().removeAll();
		
		// Do not refresh because store remove all, it already update view. 
		//this.getView().refresh(true); 
		
		var pagingToolbar = this.getPagingToolbar();
		if(pagingToolbar)
		{
			pagingToolbar.cursor = 0;
			
			pagingToolbar.afterTextItem.setText(String.format(pagingToolbar.afterPageText, '1'));
			pagingToolbar.inputItem.setValue(1);
			pagingToolbar.first.setDisabled(true);
			pagingToolbar.prev.setDisabled(true);
			pagingToolbar.next.setDisabled(true);
			pagingToolbar.last.setDisabled(true);
			pagingToolbar.refresh.enable();
			pagingToolbar.updateInfo();
		}
		
		this.getStore().baseParams.jsonAddedRecords = [];
		this.getStore().baseParams.jsonOriginalRecords = [];
		this.getStore().baseParams.jsonRemovedRecords = [];
		this.getStore().baseParams.jsonRemovedPhantomRecords = [];
		this.getStore().baseParams.jsonUpdatedRecords = [];
    },
    createPagingSnapshotParameters: function()
    {
    	var removedRecords = [];
    	for (var i = 0; i < this.pagingSnapshot.removedRecords.length; i++)
    	{
    		var removedRecord = {};
    		Ext.apply(removedRecord, this.pagingSnapshot.removedRecords[i].data);
    		removedRecord.extRecordId = this.pagingSnapshot.removedRecords[i].id;
    		removedRecords.push(removedRecord);
    	}
    	
    	var removedPhantomRecords = [];
    	for (var i = 0; i < this.pagingSnapshot.removedPhantomRecords.length; i++)
    	{
    		var removedPhantomRecord = {};
    		Ext.apply(removedPhantomRecord, this.pagingSnapshot.removedPhantomRecords[i].data);
    		removedPhantomRecord.extRecordId = this.pagingSnapshot.removedPhantomRecords[i].id;
    		removedPhantomRecords.push(removedPhantomRecord);
    	}
    	
    	var modifiedRecords = this.getStore().getModifiedRecords();
    	var idProperty = this.getStore().idProperty;
    	var addedRecords = [];
    	var updatedRecords = [];
    	var originalRecords = [];
    	for (var i = 0; i < modifiedRecords.length; i++)
    	{
    		var modifiedRecord = modifiedRecords[i].data;
    		if (modifiedRecord['__generated'] || !modifiedRecord[idProperty] || modifiedRecord[idProperty] == '')
    		{
    			var toBeAdded = {};
        		Ext.apply(toBeAdded, modifiedRecord);
        		toBeAdded.extRecordId = modifiedRecords[i].id;
    			addedRecords.push(toBeAdded);
    		}
    		else
    		{
    			var toBeUpdated = {};
        		Ext.apply(toBeUpdated, modifiedRecord);
        		updatedRecords.push(toBeUpdated);
        		
        		if (modifiedRecords[i].json)
        		{
        			var original = {};
            		Ext.apply(original, modifiedRecords[i].json);
        			originalRecords.push(original);
        		}
    		}
    	}
    	var parameters = {};
    	parameters.jsonRemovedRecords = Ext.util.JSON.encode(removedRecords);
    	parameters.jsonRemovedPhantomRecords = Ext.util.JSON.encode(removedPhantomRecords);
    	parameters.jsonAddedRecords = Ext.util.JSON.encode(addedRecords);
    	parameters.jsonUpdatedRecords = Ext.util.JSON.encode(updatedRecords);
    	parameters.jsonOriginalRecords = Ext.util.JSON.encode(originalRecords);
    	return parameters;
    },
    addPagingRow: function(record, options)
    {
    	if (this.newRowDataNoCompleteAvailable)
    	{
    		this.newRowDataNoCompleteAvailable = false;
    		if (this.checkRowDataNoComplete(this.getStore(), record,'newRowDataNoComplete'))
    		{
            		this.newRowDataNoCompleteAvailable = true;
            		return;
    		}
    		var pagingSnapshotParameters = this.createPagingSnapshotParameters();
    		pagingSnapshotParameters.newRecord = record;
    		
    		Ext.apply(pagingSnapshotParameters, options);
    		
    		if (!pagingSnapshotParameters.method) pagingSnapshotParameters.method = 'handlePagingGrid';
    		pagingSnapshotParameters.subMethod = 'getTotalForAdding';
    		
        	this.load(pagingSnapshotParameters, this.__getTotalForAdding, null, pagingSnapshotParameters.method, this);
    	}
    },
    __getTotalForAdding: function(store, records, options)
    {
		var pagingSnapshotParameters = options.params;
		
		if (!pagingSnapshotParameters.method) pagingSnapshotParameters.method = 'handlePagingGrid';
		pagingSnapshotParameters.subMethod = 'moveToLastForAdding';
		
		var pagingToolbar = this.getPagingToolbar();
		if(pagingToolbar)
		{
			var pn = pagingToolbar.getParams();
			var total = store.getTotalCount();
			var lastPageStart = Math.floor((total - 1)/pagingToolbar.pageSize) * pagingToolbar.pageSize;
			pagingSnapshotParameters[pn.start] = lastPageStart;
			pagingSnapshotParameters[pn.limit] = pagingToolbar.pageSize;
		}
    	this.load(pagingSnapshotParameters, this.__moveToLastForAdding, null, pagingSnapshotParameters.method, this);
    },
    __moveToLastForAdding: function(store, records, options)
    {
    	this.addRow(options.params.newRecord);
    	this.newRowDataNoCompleteAvailable = true;
    },
    __pagingBeforeChange: function(pagingToolbar, params)
    {
		if (!params.method) params.method = 'handlePagingGrid';
    	params.subMethod = 'changePage';
    	Ext.apply(params, this.createPagingSnapshotParameters());
    },
    __storeLoad: function(store, records, options)
    {
    	for (var i = 0; i < store.getCount(); i++)
    	{
    		var record = store.getAt(i);
    		for (var j = 0; j < store.getModifiedRecords().length; j++)
    		{
    			var modifiedRecord = store.getModifiedRecords()[j];
    			if ((record.id == modifiedRecord.id) || (record.data['extRecordId'] == modifiedRecord.id))
    			{
    				store.removeAt(i);
    				store.insert(i, modifiedRecord);
    			}
    		}
    	}
    	this.getView().refresh(true);
    },
    dirtyRemoveRows: function(options, callback, errorHandler)
    {
    	this.removePagingRows(options, callback, errorHandler);
    },
    removePagingRows: function(options, callback, errorHandler)
    {
    	var removedRecords = null;
        var selectionModel = this.getSelectionModel();
		if(selectionModel.hasSelection()) 
		{
			removedRecords = selectionModel.getSelections();
		} 
		else 
		{
			var e = {grid: this, cancel: false};
            this.fireEvent("noSelectRow", e);
            return;
		}
		
    	for (var i = 0; i < removedRecords.length; i++)
    	{
    		var removeRecord = removedRecords[i];
    		if (removeRecord.data['__generated'])
    		{
    			this.pagingSnapshot.removedPhantomRecords.push(removeRecord);
    		}
    		else if (!removeRecord.phantom)
    		{
        		this.pagingSnapshot.removedRecords.push(removeRecord);
    		}
    		else
    		{
    			this.pagingSnapshot.removedPhantomRecords.push(removeRecord);
    		}
			removeRecord.commit();
			
			this.getStore().getModifiedRecords().remove(removeRecord);
			this.getStore().remove(removeRecord);
    	}

		var pagingSnapshotParameters = this.createPagingSnapshotParameters();
		Ext.apply(pagingSnapshotParameters, options);
		
		if (!pagingSnapshotParameters.method) pagingSnapshotParameters.method = 'handlePagingGrid';
		pagingSnapshotParameters.subMethod = 'remove';
		
		var pagingToolbar = this.getPagingToolbar();
		if(pagingToolbar)
		{
			var pn = pagingToolbar.getParams();
			pagingSnapshotParameters[pn.start] = pagingToolbar.cursor;
			pagingSnapshotParameters[pn.limit] = pagingToolbar.pageSize;
		}
		
		if (callback) pagingSnapshotParameters.callback = callback;
		if (errorHandler) pagingSnapshotParameters.errorHandler = errorHandler;
		
		this.load(pagingSnapshotParameters, this.__checkPage, null, pagingSnapshotParameters.method, this);
    },
    __checkPage: function(store, records, options)
    {
		var pagingToolbar = this.getPagingToolbar();
		if(pagingToolbar)
		{
			if (pagingToolbar.cursor >= store.getTotalCount())
			{
				var pagingSnapshotParameters = options.params;
				
				if (!pagingSnapshotParameters.method) pagingSnapshotParameters.method = 'handlePagingGrid';
				pagingSnapshotParameters.subMethod = 'changePage';
				
				var pageIndex = Math.ceil(store.getTotalCount() / pagingToolbar.pageSize);
				if (pageIndex == 0) pageIndex = 1;
				
				var pn = pagingToolbar.getParams();
				pagingSnapshotParameters[pn.start] = (pageIndex - 1) * pagingToolbar.pageSize;
				pagingSnapshotParameters[pn.limit] = pagingToolbar.pageSize;
				this.load(pagingSnapshotParameters, pagingSnapshotParameters.callback, pagingSnapshotParameters.errorHandler, pagingSnapshotParameters.method);
			}
			else
			{
				var pagingSnapshotParameters = options.params;
				if (pagingSnapshotParameters.callback) pagingSnapshotParameters.callback.call(this, store, records, options);
			}
		}
    },
    refresh: function(options)
    {
		var pagingSnapshotParameters = this.createPagingSnapshotParameters();
		Ext.apply(pagingSnapshotParameters, options);

		if (!pagingSnapshotParameters.method) pagingSnapshotParameters.method = 'handlePagingGrid';
		pagingSnapshotParameters.subMethod = 'refresh';
		var pagingToolbar = this.getPagingToolbar();
		if(pagingToolbar)
		{
			var pn = pagingToolbar.getParams();
			pagingSnapshotParameters[pn.start] = pagingToolbar.cursor;
			pagingSnapshotParameters[pn.limit] = pagingToolbar.pageSize;
		}

    	this.load(pagingSnapshotParameters, this.__checkPage, null, pagingSnapshotParameters.method, this);
    },
    removePhantomRecord: function(record)
    {
    	this.getStore().remove(record);
    	this.getStore().getModifiedRecords().remove(record);
    },
    removeRow: function (parameters, callback, errorHandler) {
        var store = this.getStore();
        var jsonArray = [];
        var records = undefined;
        
        if(parameters&&parameters.records) {
            records = parameters.records;
            delete parameters.records;
        }
        else {
            var sm = this.getSelectionModel();
			if(sm.hasSelection()) {
				records = sm.getSelections();
			} else {
				var e = {grid: this,cancel: false};
	            this.fireEvent("noSelectRow", e);
	            return;
			}
        }
        
        if(records && records.length>0) {
	       	for(var i = 0 ; i < records.length ; i++) {
				jsonArray.push(records[i].data);	
			}
        }
		
		if(jsonArray.length > 0) {
			var params = {method : 'delete', records : Ext.util.JSON.encode(jsonArray)};
			Ext.apply(params, parameters);
			
			var paging = this.getPagingToolbar();
			if(paging){
				var pn = paging.getParams();
		        params[pn.start] = 0;
		        params[pn.limit] = paging.pageSize;
			}
			
			var successFn = undefined;
			if(callback){
				successFn = function(store, records, options){
					callback.call(this, store, records, options);
				};
				store.addListener('load',successFn);
			}
			
			var errorFn = undefined;
			if(errorHandler) {
				errorFn = function(proxy, type, action, options, response, e){
					if(type=='response') {
						response = (response.responseText) ? Ext.decode(response.responseText) : response;
						errorHandler.call(this, store, response, options, e);
					} else if(type=='remote') {
						errorHandler.call(this, store, response, options);
					}
				};
				store.addListener('exception',errorFn);
			}		
			store.load({
				params:params,
				callback : function(r,options,success){
					if(callback) { store.removeListener('load',successFn); delete successFn; }
					if(errorHandler) { store.removeListener('exception',errorFn); delete errorFn; }
					if(store.lastOptions && store.lastOptions.params) 
					{
						store.lastOptions.params.method = this.loadMethod;
					}
				}
			});
		} 
    },
    removeRowWithPhantom: function (parameters, callback, errorHandler) {
        var grid = this;
        var store = this.getStore();
        
        var jsonArray = [];
        var phantomRecords = [];
        var records = undefined;
        
        if(parameters&&parameters.records) {
            records = parameters.records;
            delete parameters.records;
        }
        else {
            var sm = this.getSelectionModel();
			if(sm.hasSelection()) {
				records = sm.getSelections();
			} else {
				var e = {grid: grid,cancel: false};
	            this.fireEvent("noSelectRow", e);
	            return;
			}
        }
        
        if(records && records.length>0) {
	        for(var i = 0 ; i < records.length ; i++) {
				if(records[i].phantom) {
					phantomRecords.push(records[i]);
				} else {
					jsonArray.push(records[i].data);	
				}
			}
        }
  
		if(jsonArray.length > 0) {
			var params = {method : 'delete', records : Ext.util.JSON.encode(jsonArray)};
			Ext.apply(params, parameters);
			
			var paging = grid.getPagingToolbar();
			if(paging){
				var pn = paging.getParams();
		        params[pn.start] = 0;
		        params[pn.limit] = paging.pageSize;
			}
			
			var successFn = undefined;
			if(callback){
				successFn = function(store, records, options){
					callback.call(grid, store, records, options);
				};
				store.addListener('load',successFn);
			}
			
			var errorFn = undefined;
			if(errorHandler) {
				errorFn = function(proxy, type, action, options, response, e){
					if(type=='response') {
						response = (response.responseText) ? Ext.decode(response.responseText) : response;
						errorHandler.call(grid, store, response, options, e);
					} else if(type=='remote') {
						errorHandler.call(grid, store, response, options);
					}
				};
				store.addListener('exception',errorFn);
			}		
			store.load({
				params:params,
				callback : function(r,options,success){
					if(store.lastOptions && store.lastOptions.params) {
						store.lastOptions.params.method = this.loadMethod;
					}
					if(callback) { store.removeListener('load',successFn); delete successFn; }
					if(errorHandler) { store.removeListener('exception',errorFn); delete errorFn; }
				}
			});
		} else {
			try{
				store.remove(phantomRecords,true);
				grid.getView().refresh(false);
				callback.call(grid, store, phantomRecords, undefined);
			}catch(e){
				errorHandler.call(grid, store, phantomRecords ,undefined ,e);
			}
		}
    },
    loadState: function(parameters, callback, errorHandler)
    {
    	var store = this.getStore();
    	store.load({
			params:parameters
		});
    },
    loadForGenerating: function(parameters, callback, errorHandler)
    {
    	var store = this.getStore();
    	var params = {'method' : 'search'};
		Ext.apply(params, parameters);
		Ext.apply(store.baseParams,params);
		var paging = this.getPagingToolbar();
		if(paging){
			var pn = paging.getParams();
	        params[pn.start] = -1;
	        params[pn.limit] = -1;
		}

		var connection = store.proxy.getConnection();
		connection.request({
			url: store.proxy.url
			, params:params
			, success: function(response, options) {
				var responseObject = eval('(' + response.responseText + ')');
				if (responseObject.records && responseObject.records.length > 0)
				{
					for (var i = 0; i < responseObject.records.length; i++)
					{
						var record = responseObject.records[i];
						record['__generated'] = true;
						var idProperty = store.idProperty;
						var extRecord = null;
						if (record[idProperty])
						{
							extRecord = new store.recordType(record, record[idProperty]);
						}
						else
						{
							extRecord = new store.recordType(record);
						}
				        extRecord.markDirty();
				        store.afterEdit(extRecord,true);
					}
				}
				callback.call(this, response, options);
			}
			, failure: function(response, options) {
				errorHandler.call(this, response, options);
			}
		});
    },
    load: function (parameters, callback, errorHandler, method, callbackScope) 
    {
		if (!callbackScope) callbackScope = store;
    	var store = this.getStore();
    	
    	if (!method) method = 'search';
    	var params = {'method' : method};
		Ext.apply(params, parameters);
		Ext.apply(store.baseParams,params);
		var paging = this.getPagingToolbar();
		if(paging){
			var pn = paging.getParams();
	        if (!params[pn.start]) params[pn.start] = 0;
	        if (!params[pn.limit]) params[pn.limit] = paging.pageSize;
		}
		var successFn = undefined;
		if(callback){
			successFn = function(store, records, options){
				callback.call(callbackScope, store, records, options);
			};
			store.addListener('load',successFn);
		}
		
		var errorFn = undefined;
		if(errorHandler) {
			errorFn = function(proxy, type, action, options, response, e){
				function showRecords(store,response) {
					if(response && !Ext.isEmpty(response.data)) {
						store.loadData(response.data,false);
					}
				};
				
				if(type=='response') {
					response = (response.responseText) ? Ext.decode(response.responseText) : response;
					showRecords(store,response);
					errorHandler.call(this, store, response, options, e);
				} else if(type=='remote') {
					showRecords(store,response);
					errorHandler.call(this, store, response, options);
				}
			};
			store.addListener('exception',errorFn);
		}
    	
		var editorGrid = this;
    	store.load({
			params:params,
			callback : function(r,options,success){
				if (this.loadMethod != 'handlePagingGrid') this.loadMethod = options.params.method;
				if(callback) { store.removeListener('load',successFn); delete successFn;}
				if(errorHandler) { store.removeListener('exception',errorFn); delete errorFn; }
//				if (options.params.method == 'search')
//				{
//					var popCount = store.getModifiedRecords().length;
//					for (var i = 0; i < popCount; i++) store.getModifiedRecords().pop();
//					editorGrid.pagingSnapshot.removedRecords = [];
//				}
			},
    		scope: callbackScope
		});
    },
    saveDirtyRows: function(parameters, callback, errorHandler)
    {
		var store = this.getStore();
		if (this.checkRowDataNoComplete(store, pagingSnapshotParameters, 'saveRowDataNoComplete'))
		{
            return;
        }
		
		var pagingSnapshotParameters = this.createPagingSnapshotParameters();
		Ext.apply(pagingSnapshotParameters, parameters);
		if (!pagingSnapshotParameters.method) pagingSnapshotParameters.method = 'save';

		var pagingToolbar = this.getPagingToolbar();
		if(pagingToolbar)
		{
			var pn = pagingToolbar.getParams();
			pagingSnapshotParameters[pn.start] = pagingToolbar.cursor;
			pagingSnapshotParameters[pn.limit] = pagingToolbar.pageSize;
		}
		
		var isSuccess = true;
		var successFn = undefined;
		if(callback){
			successFn = function(store, records, options){
				callback.call(this, store, records, options);
				isSuccess = true;
			};
			store.addListener('load',successFn);
		}
		
		var errorFn = undefined;
		if(errorHandler) {
			errorFn = function(proxy, type, action, options, response, e){
				if(type=='response') {
					response = (response.responseText) ? Ext.decode(response.responseText) : response;
					errorHandler.call(this, store, response, options, e);
				} else if(type=='remote') {
					errorHandler.call(this, store, response, options);
				}
				isSuccess = false;
			};
			store.addListener('exception',errorFn);
		}
		
		var editorGrid = this;
		store.load({
			params:pagingSnapshotParameters,
			callback : function(r,options,success){				
				if(callback) { store.removeListener('load',successFn); delete successFn;}
				if(errorHandler) { store.removeListener('exception',errorFn); delete errorFn; }
				if (isSuccess)
				{
					var popCount = store.getModifiedRecords().length;
					for (var i = 0; i < popCount; i++) 
					{
						var record = store.getModifiedRecords().pop();
						record.commit();
					}
					editorGrid.pagingSnapshot.removedRecords = [];
					editorGrid.pagingSnapshot.removedPhantomRecords = [];
					editorGrid.getView().refresh(true);
					if(store.lastOptions && store.lastOptions.params) {
						store.lastOptions.params.method = this.loadMethod;
					}
				}
			}
		});
    },
    savePagingRows: function(parameters, callback, errorHandler)
    {
    	if (!parameters) parameters = {};
    	if (!parameters.method) parameters.method = 'savePagingRows';
    	this.saveDirtyRows(parameters, callback, errorHandler);
    },
    save: function (parameters, callback, errorHandler) {
		var store = this.getStore();
        var records = undefined;
        if(parameters&&parameters.records) {
            records = parameters.records;
            delete parameters.records;
        }
        else {
            records = store.getModifiedRecords();
        }
        
		if(this.checkRowDataNoComplete(store,records,'saveRowDataNoComplete')) {
            return;
        }

        var jsonArray = [];
        if(records && records.length>0) {
            for(var i = 0 ; i < records.length ; i ++) {
                jsonArray.push(records[i].data);
            }
        }
        
        var params = {method : 'save', records : Ext.util.JSON.encode(jsonArray)};
        Ext.apply(params, parameters);

		var paging = this.getPagingToolbar();
		if(paging){
			var pn = paging.getParams();
	        params[pn.start] = 0;
	        params[pn.limit] = paging.pageSize;
		}
		
		var successFn = undefined;
		if(callback){
			successFn = function(store, records, options){
				callback.call(this, store, records, options);
			};
			store.addListener('load',successFn);
		}
		
		var errorFn = undefined;
		if(errorHandler) {
			errorFn = function(proxy, type, action, options, response, e){
				if(type=='response') {
					response = (response.responseText) ? Ext.decode(response.responseText) : response;
					errorHandler.call(this, store, response, options, e);
				} else if(type=='remote') {
					errorHandler.call(this, store, response, options);
				}
			};
			store.addListener('exception',errorFn);
		}
		
		store.load({
			params:params,
			callback : function(r,options,success){				
				if(callback) { store.removeListener('load',successFn); delete successFn;}
				if(errorHandler) { store.removeListener('exception',errorFn); delete errorFn; }
				
				if(store.lastOptions && store.lastOptions.params) {
					store.lastOptions.params.method = this.loadMethod;
				}
			}
		});
    },
    saveNoLoad: function(parameters, callback, errorHandler){
    	var store = this.getStore();
		
		var records = undefined;
        if(parameters&&parameters.records) {
            records = parameters.records;
            delete parameters.records;
        }
        else {
            records = store.getModifiedRecords();
        }
		
		if(this.checkRowDataNoComplete(store,records,'saveRowDataNoComplete')) { 
			return; 
		}
		
		var jsonArray = [];
        if(records && records.length>0) {
            for(var i = 0 ; i < records.length ; i ++) {
                jsonArray.push(records[i].data);
            }
        }
			
		var params = { method : 'save', records : Ext.util.JSON.encode(jsonArray)};
		Ext.apply(params, parameters);
		
		var saveNoCommitChanges = this.saveNoCommitChanges;
		
		var connection = store.proxy.getConnection();
		connection.request({
			url: store.proxy.url
			, params:params
			, success: function(response, options) {
				if(saveNoCommitChanges===false) {
					store.commitChanges();
				}
				response = (response.responseText) ? Ext.decode(response.responseText) : response;
				if(callback){ callback.call(this, store, records, options, response);}
			}
			, failure: function(response, options) {
				if(errorHandler) {
					response = (response.responseText) ? Ext.decode(response.responseText) : response;
					errorHandler.call(this, store, response, options);
				} else {
					Ext.Msg.alert('Error',response.responseText);
				}
			}
		});
    },
    removeRowNoLoad: function (parameters, callback, errorHandler) {
    	var grid = this;
        var store = grid.getStore();
        
        var jsonArray = [];
        var records = undefined;
        
        if(parameters&&parameters.records) {
            records = parameters.records;
            delete parameters.records;
        }
        else {
            var sm = grid.getSelectionModel();
			if(sm.hasSelection()) {
				records = sm.getSelections();
			} else {
				var e = {grid: grid,cancel: false};
	            this.fireEvent("noSelectRow", e);
	            return;
			}
        }
        
        if(records && records.length>0) {
	       	for(var i = 0 ; i < records.length ; i++) {
				jsonArray.push(records[i].data);	
			}
        }
		
		if(jsonArray.length > 0) {
			var params = { method : 'delete', records : Ext.util.JSON.encode(jsonArray)};
			Ext.apply(params, parameters);
			
			var connection = store.proxy.getConnection();
			connection.request({
				url: store.proxy.url
				, params:params
				, success: function(response, options) {
					store.remove(records,true);
					grid.getView().refresh(false);
					response = (response.responseText) ? Ext.decode(response.responseText) : response;
					if(callback){ callback.call(grid, store, records, options, response);}
				}
				, failure: function(response, options) {
					if(errorHandler) {
						response = (response.responseText) ? Ext.decode(response.responseText) : response;
						errorHandler.call(grid, store, response, options);
					} else {
						Ext.Msg.alert('Error',response.responseText);
					}
				}
			});
		}
    },
    removeRowNoLoadWithPhantom: function (parameters, callback, errorHandler) {
        var grid = this;
        var store = grid.getStore();
        
        var jsonArray = [];
        var jsonRecords = [];
        var phantomRecords = [];
        var records = undefined;
        
        if(parameters&&parameters.records) {
            records = parameters.records;
            delete parameters.records;
        }
        else {
            var sm = grid.getSelectionModel();
			if(sm.hasSelection()) {
				records = sm.getSelections();
			} else {
				var e = {grid: grid,cancel: false};
	            this.fireEvent("noSelectRow", e);
	            return;
			}
        }
        
        if(records && records.length>0) {
	        for(var i = 0 ; i < records.length ; i++) {
				if(records[i].phantom) {
					phantomRecords.push(records[i]);
				} else {
					jsonArray.push(records[i].data);
					jsonRecords.push(records[i]);
				}
			}
        }
		
		if(jsonArray.length > 0) {
			var params = { method : 'delete', records : Ext.util.JSON.encode(jsonArray)};
			Ext.apply(params, parameters);
			
			var connection = store.proxy.getConnection();
			connection.request({
				url: store.proxy.url
				, params:params
				, success: function(response, options) {
					if(phantomRecords.length > 0) {
						jsonRecords.push(phantomRecords);
					}
					store.remove(jsonRecords,true);
					grid.getView().refresh(false);
					response = (response.responseText) ? Ext.decode(response.responseText) : response;
					if(callback){ callback.call(grid, store, records, options, response);}
				}
				, failure: function(response, options) {
					if(errorHandler) {
						response = (response.responseText) ? Ext.decode(response.responseText) : response;
						errorHandler.call(grid, store, response, options);
					} else {
						Ext.Msg.alert('Error',response.responseText);
					}
				}
			});
		}
		else {
			try{
				store.remove(phantomRecords,true);
				grid.getView().refresh(false);
				callback.call(grid, store, phantomRecords, undefined);
			}catch(e){
				errorHandler.call(grid, store, phantomRecords, undefined, e);
			}
		}
    },
    startEditing : function(row, col){
        this.stopEditing();
        if(this.colModel.isCellEditable(col, row)){
            this.view.ensureVisible(row, col, true);
            var r = this.store.getAt(row),
                field = this.colModel.getDataIndex(col),
                e = {
                    grid: this,
                    record: r,
                    field: field,
                    value: r.data[field],
                    row: row,
                    column: col,
                    cancel:false
                };
            if(this.fireEvent("beforeedit", e) !== false && !e.cancel){
                this.editing = true;
                var ed = this.colModel.getCellEditor(col, row);
                if(!ed){
                    return;
                }
                if(!ed.rendered){
                    ed.parentEl = this.view.getEditorParent(ed);
                    ed.on({
                        scope: this,
                        render: {
                            fn: function(c){
                                c.field.focus(false, true);
                            },
                            single: true,
                            scope: this
                        },
                        specialkey: function(field, e){
                            this.getSelectionModel().onEditorKey(field, e);
                        },
                        complete: this.onEditComplete,
                        canceledit: this.stopEditing.createDelegate(this, [true])
                    });
                }
                Ext.apply(ed.field,{editingRow : row, editingCol : col, record  : r, grid: this});
                Ext.apply(ed, {row : row, col : col, record  : r});
                this.lastEdit = {row: row,col: col};
                this.activeEditor = ed;
                ed.selectSameEditor = (this.activeEditor == this.lastActiveEditor);
                var v = this.preEditValue(r, field);
                ed.startEdit(this.view.getCell(row, col).firstChild, Ext.isDefined(v) ? v : '');
                (function(){
                    delete ed.selectSameEditor;
                }).defer(50);
            }
        }
    }
});
Ext.reg('ss-editorgrid', Ext.ss.grid.EditorGridPanel);