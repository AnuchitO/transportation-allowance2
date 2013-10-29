Ext.namespace('Ext.ss.form');

Ext.ss.form.LovField = Ext.extend(Ext.form.TriggerField, {
	/**
	 * Constant 
	 */
	SEARCHCLICK: 'SearchClick',
	ASSERTVALUE: 'AssertValue',
	SETVALUE: 'SetValue',
	BEFOREBLUR: 'BeforeBlur',
	ENTER: 'Enter',
	lovTitle: 'List of value',
	lovWidth: 400,
	lovHeight: 375,
	isShowLov: false,
	isGridEditor: false,
	submitValue: undefined,
	triggerClass: 'x-form-search-trigger',
	searchTriggerClass: 'x-form-search-trigger',
	noDataFoundMessage: 'No Data Found.',
	searchValueIsRequiredMessage: 'Search Value is required.',
	closeBtnText: 'Close',
	searchFieldLabel: 'Search value',
	zIndex: undefined,
	/**
	 * Store properties
	 */
	url: undefined,
	baseParams: undefined,
	/**
	 * Column Model properties
	 */
	valueHeader: 'Code',
	descriptionHeader: 'Description',
	codeAlign: 'center',
	descriptionAlign: 'left',
	columns: undefined,
	fields: undefined,
	selModel: undefined,
	/**
	 * PagingToolbar properties
	 */
	pageSize: 10,
	displayInfo: false,
	/**
	 * LoadMask properties
	 */
	emptyLoadMask: undefined,
	searchLoadMask: undefined,
	/**
	 * Combobox properties and methods.
	 */
	valueField: 'code',
	//required
	displayField: 'code',
	descriptionField: 'description',
	showDescription: true,
	descriptionWidth: undefined,
	descriptionStyle: undefined,
	hiddenField: undefined,
	hiddenId: undefined,
	hiddenName: undefined,
	forceSelection: true,
	queryParam: 'query',
	fieldParam: 'field',
	initComponent: function () {
		Ext.ss.form.LovField.superclass.initComponent.call(this);
		this.addEvents('beforeshow', 'beforehide', 'show', 'hide', 'beforeselect', 'select', 'beforequery');
	},
	initEvents: function () {
		Ext.ss.form.LovField.superclass.initEvents.call(this);
		this.keyNav = new Ext.KeyNav(this.el, {
            "enter" : function(e){
                this.onEnter();
            },
            scope : this,
            forceKeyDown : true,
            defaultEventAction: 'stopEvent'
        });
	},
	onRender: function (ct, position) {
		this.displayField = Ext.value(this.displayField, this.valueField);
		this.descriptionField = Ext.value(this.descriptionField, this.displayField);

		if (this.hiddenName && !Ext.isDefined(this.submitValue)) {
			this.submitValue = false;
		}

		Ext.ss.form.LovField.superclass.onRender.call(this, ct, position);

		if (this.hiddenName) {
			this.hiddenField = this.el.insertSibling({
				tag: 'input',
				type: 'hidden',
				name: this.hiddenName,
				id: (this.hiddenId || this.hiddenName)
			}, 'before', true);
		}

		if (Ext.isGecko) {
			this.el.dom.setAttribute('autocomplete', 'off');
		}
	},
	afterRender: function (ct) {
		Ext.ss.form.LovField.superclass.afterRender.call(this);

		if (this.showDescription) {
			this.descriptionStyle = this.descriptionStyle || {};
			if (typeof descriptionStyle == "string") {
				var cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
					matches;
				while ((matches = cssRe.exec(styles))) {
					this.descriptionStyle[matches[1]] = matches[2];
				}
			}
			Ext.applyIf(this.descriptionStyle, {
				'margin-left': '20px'
			});
			this.descriptionId = Ext.value(this.descriptionId, this.id + '-combobox-descfield');
			this.descriptionName = Ext.value(this.descriptionName, this.descriptionId);
			this.desctextfield = new Ext.form.TextField({
				renderTo: this.wrap.id,
				id: this.descriptionId,
				name: this.descriptionName,
				style: this.descriptionStyle,
				tabIndex: -1,
				readOnly: true,
				alwaysReadOnly: true
			});
			this.renderedDesc = true;
			this.resizeDescription();
		}

		this.initLov();
	},
	onResize: function (w, h) {
		Ext.form.TriggerField.superclass.onResize.call(this, w, h);
		var tw = this.getTriggerWidth();
		if (Ext.isNumber(w)) {
			this.el.setWidth(w - tw);
		}
		this.wrap.setWidth(this.el.getWidth() + tw);

		this.resizeDescription();
	},
	resizeDescription: function () {
		if (this.renderedDesc) {
			if (!this.descriptionWidth) {
				var length = this.container.getComputedWidth() - this.container.getPadding('l') - this.wrap.getComputedWidth();
				var descriptionWidth = (length - this.desctextfield.el.getMargins('l')) + this.el.getMargins('l');
				this.desctextfield.setWidth(descriptionWidth);
			} else {
				this.desctextfield.setWidth(this.descriptionWidth);
			}
		}
	},
	initValue: function () {
		Ext.ss.form.LovField.superclass.initValue.call(this);
		if (this.hiddenField) {
			this.hiddenField.value = Ext.value(Ext.isDefined(this.hiddenValue) ? this.hiddenValue : this.value, '');
		}
	},
	onEnable: function () {
		Ext.ss.form.LovField.superclass.onEnable.apply(this, arguments);
		if (this.hiddenField) {
			this.hiddenField.disabled = false;
		}
		if (this.showDescription) {
			this.desctextfield.setDisabled(false);
		}
	},
	onDisable: function () {
		Ext.ss.form.LovField.superclass.onDisable.apply(this, arguments);
		if (this.hiddenField) {
			this.hiddenField.disabled = true;
		}
		if (this.showDescription) {
			this.desctextfield.setDisabled(true);
		}
	},
	getName: function () {
		var hf = this.hiddenField;
		return hf && hf.name ? hf.name : this.hiddenName || Ext.ss.form.LovField.superclass.getName.call(this);
	},
	getValue: function () {
		if (this.valueField) {
			return Ext.isDefined(this.value) ? this.value : '';
		} else {
			return Ext.ss.form.LovField.superclass.getValue.call(this);
		}
	},
	applyEmptyText: function () {
		if (this.getRawValue().length < 1) {
			if (this.rendered && this.emptyText && !this.hasFocus) {
				this.setRawValue(this.emptyText);
				this.el.addClass(this.emptyClass);
			}
			if (this.showDescription) {
				this.desctextfield.setValue('');
			}
		}
	},
	clearValue: function () {
		if (this.hiddenField) {
			this.hiddenField.value = '';
		}
		this.setRawValue('');
		this.lastSelectionText = '';
		this.applyEmptyText();
		this.value = '';
	},
	setValue: function (v) {
		if (this.isGridEditor) {
			this.startValue = v;
		}
		var text = v,
			desc = '';
		var r = this.findRecord(this.valueField, v);
		if (r) {
			text = r.data[this.displayField];
			desc = r.data[this.descriptionField];
			this.lastSelectionText = text;
			if (this.hiddenField) {
				this.hiddenField.value = Ext.value(v, '');
			}
			Ext.form.TriggerField.superclass.setValue.call(this, text);
			this.value = v;
			if (this.showDescription) {
				this.desctextfield.setValue(desc);
			}
		} else {
			if (!Ext.isEmpty(v)) {
				this.value = v;
				this.doQuery(this.valueField, v, this.SETVALUE, this.editingRow, this.editingCol, this.startValue);
			} else {
				if (Ext.isDefined(this.valueNotFoundText)) {
					text = this.valueNotFoundText;
				}

				this.lastSelectionText = text;
				if (this.hiddenField) {
					this.hiddenField.value = Ext.value(v, '');
				}
				Ext.form.TriggerField.superclass.setValue.call(this, text);
				this.value = v;
				if (this.showDescription) {
					this.desctextfield.setValue(desc);
				}
			}
		}
		return this;
	},
	findRecord: function (prop, value) {
		var record;
		var store = this.store;
		if (store.getCount() > 0) {
			store.each(function (r) {
				if (r.data[prop] === value) {
					record = r;
					return false;
				}
			});
		}
		return record;
	},
	onEnter : function() {
		if (!this.isShowLov && !this.isGridEditor) {
			var val = this.getRawValue(),
				rec = this.findRecord(this.displayField, val);
			val = val.trim(); //.replace(/%/gi,'');
			if (this.fireEvent('beforeselect', this, rec, this.editingRow, this.editingCol) === false) {
				return;
			}

			if (!Ext.isEmpty(val)) {
				if (!rec) {
					this.doQuery(this.displayField, val, this.ENTER, this.editingRow, this.editingCol, this.startValue);
					return false;
				} else {
					if (val == rec.get(this.displayField) && this.value == rec.get(this.valueField)) {
						return true;
					}
					val = rec.get(this.valueField || this.displayField);
					this.setValue(val);
					this.fireEvent('select', this, rec, this.editingRow, this.editingCol);
				}
			} else {
				this.clearValue();
				this.fireEvent('select', this, undefined, this.editingRow, this.editingCol);
			}
		}
	},
	beforeBlur: function () {
		if (!this.isShowLov && !this.isGridEditor) {
			var val = this.getRawValue(),
				rec = this.findRecord(this.displayField, val);
			val = val.trim(); //.replace(/%/gi,'');
			if (this.fireEvent('beforeselect', this, rec, this.editingRow, this.editingCol) === false) {
				return;
			}

			if (!Ext.isEmpty(val)) {
				if (!rec) {
					this.doQuery(this.displayField, val, this.BEFOREBLUR, this.editingRow, this.editingCol, this.startValue);
					return false;
				} else {
					if (val == rec.get(this.displayField) && this.value == rec.get(this.valueField)) {
						return true;
					}
					val = rec.get(this.valueField || this.displayField);
					this.setValue(val);
					this.fireEvent('select', this, rec, this.editingRow, this.editingCol);
				}
			} else {
				this.clearValue();
				this.fireEvent('select', this, undefined, this.editingRow, this.editingCol);
			}
		}
		return true;
	},
	onFocus: function () {
		Ext.form.TriggerField.superclass.onFocus.call(this);
		if (!this.mimicing) {
			this.wrap.addClass(this.wrapFocusClass);
			this.mimicing = true;
			this.doc.on('mousedown', this.mimicBlur, this, {
				delay: 10
			});
			if (this.monitorTab) {
				this.on('specialkey', this.checkTab, this);
			}
		}
	},
	onCustomBlur: function (blurOnly) {
		if (blurOnly || this.beforeBlur()) {
			if (this.focusClass) {
				this.el.removeClass(this.focusClass);
			}
			this.hasFocus = false;
			if (this.validationEvent !== false && (this.validateOnBlur || this.validationEvent == 'blur')) {
				this.validate();
			}
			var v = this.getValue();
			if (String(v) !== String(this.startValue)) {
				this.fireEvent('change', this, v, this.startValue);
			}

			this.fireEvent('blur', this);
			this.postBlur();
		}
	},
	assertValue: function () {
		var val = this.getRawValue(),
			rec = this.findRecord(this.displayField, val);
		val = val.trim(); //.replace(/%/gi,'');
		if (this.fireEvent('beforeselect', this, rec, this.editingRow, this.editingCol) === false) {
			return;
		}

		if (!Ext.isEmpty(val)) {
			if (!rec) {
				this.doQuery(this.displayField, val, this.ASSERTVALUE, this.editingRow, this.editingCol, this.startValue);
			} else {
				if (val == rec.get(this.displayField) && this.value == rec.get(this.valueField)) {
					return;
				}
				this.fireEvent('select', this, rec, this.editingRow, this.editingCol);
			}
		} else {
			this.clearValue();
			this.fireEvent('select', this, undefined, this.editingRow, this.editingCol);
		}
	},
	/**
	 * Lov Field properties and methods.
	 */
	initLov: function () {

		if (this.windowLov === undefined) {
			if(Ext.isArray(this.columns) && this.columns.length == 0) {
				this.columns = undefined;
			}
			
			this.columns = Ext.value(this.columns, [{
				header: '<center>' + this.valueHeader + '</center>',
				menuDisabled: true,
				width: 30,
				dataIndex: this.displayField,
				align: this.codeAlign
			},
			{
				header: '<center>' + this.descriptionHeader + '<center>',
				menuDisabled: true,
				width: 70,
				dataIndex: this.descriptionField,
				align: this.descriptionAlign
			}]);

			if(Ext.isArray(this.fields) && this.fields.length == 0) {
				this.fields = undefined;
			}
			
			this.fields = Ext.value(this.fields, [this.valueField, this.displayField, this.descriptionField]);

			this.selModel = Ext.value(this.selModel, new Ext.grid.RowSelectionModel({
				singleSelect: true,
				listeners: {
					scope: this,
					beforerowselect: this.onBeforeSelect,
					rowselect: this.onSelect
				}
			}));

			this.store = new Ext.data.JsonStore({
				root: 'records',
				xtype: 'jsonstore',
				idProperty: this.valueField,
				fields: this.fields,
				url: this.url,
				messageProperty: 'message',
				baseParams: this.baseParams,
				listeners: {
					scope: this,
					beforeload: this.onBeforeLoad,
					load: this.onLoad,
					exception: this.onException
				}
			});

			this.searchField = new Ext.form.TriggerField({
				xtype: 'trigger',
				labelStyle: 'background-color:transparent;',
				fieldLabel: this.searchFieldLabel,
				triggerClass: this.searchTriggerClass,
				criterionField: true,
				value: '',
				onTriggerClick: this.onSearchClick.createDelegate(this),
				listeners: {
					scope : this,
	                specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                       this.onSearchClick();
	                    }
	                }
	            }
			});

			this.pagingToolbar = new Ext.PagingToolbar({
				store: this.store,
				displayInfo: this.displayInfo,
				pageSize: this.pageSize
			});

			this.gridLov = new Ext.grid.GridPanel({
				store: this.store,
				columns: this.columns,
				region: 'center',
				stripeRows: true,
				enableColumnMove: false,
				columnLines: true,
				xtype: 'grid',
				enableHdMenu: false,
				viewConfig: {
					forceFit: true,
					scrollOffset: 0
				},
				selModel: this.selModel,
				bbar: this.pagingToolbar
			});

			this.windowLov = new Ext.Window({
				title: this.lovTitle,
				modal: true,
				resizable: false,
				closable: false,
				closeAction: 'hide',
				width: this.lovWidth,
				height: this.lovHeight,
				border: false,
				layout: 'border',
				items: [{
					xtype: 'panel',
					region: 'north',
					layout: 'form',
					border: false,
					labelAlign: 'right',
					labelSeparator: ' ',
					height: 22,
					margins: {
						top: 5,
						bottom: 5,
						left: 5,
						right: 5
					},
					labelWidth: (this.lovWidth - 90) / 2,
					items: [this.searchField]
				},
				this.gridLov],
				buttonAlign: 'center',
				buttons: [{
					text: this.closeBtnText,
					scope: this,
					handler: this.hideLov
				}],
				listeners: {
					scope: this,
					show: this.onShow,
					hide: this.onHide
				}
			});
		}
	},
	getListParent: function () {
		return document.body;
	},
	getParentZIndex: function () {
		var zindex;
		if (this.ownerCt) {
			this.findParentBy(function (ct) {
				zindex = parseInt(ct.getPositionEl().getStyle('z-index'), 10);
				return !!zindex;
			});
		}
		return zindex;
	},
	onBeforeSelect: function (sm, rowIndex, keepExisting, record) {
		return (this.fireEvent('beforeselect', this, record, this.editingRow, this.editingCol) === false) ? false : true;
	},
	onSelect: function (sm, rowIndex, record) {
		this.setValue(record.get(this.valueField));
		this.fireEvent('select', this, record, this.editingRow, this.editingCol);
		this.hideLov();
	},
	onLoad: function (store, records, options) {
		if (options.params.__status == this.SEARCHCLICK) {
			if (records.length === 0) {
				if (this.isShowLov) {
					this.emptyLoadMask.show();
				}
			}
		} else if (options.params.__status == this.ASSERTVALUE) {
			var val = options.params[this.queryParam],
				editingRow = options.params.__editingRow,
				editingCol = options.params.__editingCol,
				startValue = options.params.__startValue,
				rec;
			if (records.length > 0) {
				rec = records[0];
				if (startValue == rec.get(this.valueField)) {
					return;
				}
			}
			this.fireEvent('select', this, rec, editingRow, editingCol);
		} else if (options.params.__status == this.BEFOREBLUR) {
			var val = options.params[this.queryParam],
				editingRow = options.params.__editingRow,
				editingCol = options.params.__editingCol;
			if (records.length === 0 && this.forceSelection) {
				if (val.length > 0 && val != this.emptyText) {
					this.el.dom.value = Ext.value(this.lastSelectionText, '');
					this.applyEmptyText();
				} else {
					this.clearValue();
				}
				this.fireEvent('select', this, undefined, editingRow, editingCol);
			} else {
				var rec;
				if (records.length > 0) {
					rec = records[0];
					if (val == rec.get(this.displayField) && this.value == rec.get(this.valueField)) {
						return;
					}
					val = rec.get(this.valueField || this.displayField);
				}
				this.setValue(val);
				this.fireEvent('select', this, rec, editingRow, editingCol);
			}
			this.onCustomBlur(true);
		} else if (options.params.__status == this.SETVALUE) {
			var v = options.params[this.queryParam],
				text = v,
				desc = '';
			if (records.length == 0) {
				if (Ext.isDefined(this.valueNotFoundText)) {
					text = this.valueNotFoundText;
				}
			} else {
				var r = records[0];
				text = r.data[this.displayField];
				desc = r.data[this.descriptionField];
			}
			this.lastSelectionText = text;
			if (this.hiddenField) {
				this.hiddenField.value = Ext.value(v, '');
			}
			Ext.form.TriggerField.superclass.setValue.call(this, text);
			this.value = v;
			if (this.showDescription) {
				this.desctextfield.setValue(desc);
			}
		} else if(options.params.__status == this.ENTER) {
			var val = options.params[this.queryParam],
				editingRow = options.params.__editingRow,
				editingCol = options.params.__editingCol;
			if(!(records.length === 0 && this.forceSelection)){
				var rec;
				if (records.length > 0) {
					rec = records[0];
					if (val == rec.get(this.displayField) && this.value == rec.get(this.valueField)) {
						return;
					}
					val = rec.get(this.valueField || this.displayField);
				}
				this.setValue(val);
				this.fireEvent('select', this, rec, editingRow, editingCol);
			}
		}
	},
	onBeforeLoad: function (store, options) {},
	mimicBlur: function (e) {
		if (!this.isDestroyed && !this.wrap.contains(e.target) && this.validateBlur(e)) {
			this.triggerBlur();
		}
	},
	triggerBlur: function () {
		this.mimicing = false;
		this.doc.un('mousedown', this.mimicBlur, this);
		if (this.monitorTab && this.el) {
			this.un('specialkey', this.checkTab, this);
		}
		this.onCustomBlur(false);
		if (this.wrap) {
			this.wrap.removeClass(this.wrapFocusClass);
		}
	},
	backupTriggerBlur: function () {
		this.mimicing = false;
		this.doc.un('mousedown', this.mimicBlur, this);
		if (this.monitorTab && this.el) {
			this.un('specialkey', this.checkTab, this);
		}
		this.onCustomBlur(false);
		if (this.wrap) {
			this.wrap.removeClass(this.wrapFocusClass);
		}
	},
	onException: function (proxy, type, action, options, response, e) {
		if (response && response.messageHeader) {
			Ext.Msg.alert(response.messageHeader, response.message);
		}
	},
	initZIndex: function () {
		if (!this.zIndex) {
			var listParent = Ext.getDom(this.getListParent() || Ext.getBody()),
				zindex = parseInt(Ext.fly(listParent).getStyle('z-index'), 10);

			if (!zindex) {
				zindex = this.getParentZIndex();
			}
			this.zIndex = ((zindex || 12000) + 5);
		}
		this.windowLov.setZIndex(this.zIndex);
	},
	onShow: function (window) {
		if (window) {
			this.initZIndex();
			this.triggerBlur = Ext.emptyFn;
			this.fireEvent('show', this);
			this.isShowLov = true;
		}
	},
	onHide: function (window) {
		this.triggerBlur = this.backupTriggerBlur;
		this.fireEvent('hide', this);
		this.isShowLov = false;
	},
	initMask: function () {
		if (!this.searchLoadMask) {
			this.searchLoadMask = new Ext.LoadMask(this.gridLov.bwrap, {
				msg: this.searchValueIsRequiredMessage,
				msgCls: 'lov-load-mask'
			});
		}

		if (!this.emptyLoadMask) {
			this.emptyLoadMask = new Ext.LoadMask(this.gridLov.bwrap, {
				msg: this.noDataFoundMessage,
				msgCls: 'lov-load-mask'
			});
		}
	},
	showLov: function () {
		if (this.isShowLov) {
			return false;
		}
		if (this.fireEvent('beforeshow', this) !== false) {
			this.store.removeAll();
			this.windowLov.show(this);
			this.initMask();
		} else {
			return false;
		}
	},
	hideLov: function (a) {
		if (!this.isShowLov) {
			return false;
		}
		if (this.fireEvent('beforehide', this) !== false) {
			this.windowLov.hide();
			this.searchLoadMask.hide();
			this.emptyLoadMask.hide();
			this.gridLov.getSelectionModel().clearSelections(true);
		} else {
			return false;
		}
		return this;
	},
	onTriggerClick: function () {
		if (this.disabled || this.readOnly) {
			return;
		}
		if (this.showLov() === false) {
			return;
		}
		this.onFocus();
		var rawValue = this.getRawValue();
		if (Ext.isEmpty(rawValue)) {
			this.searchField.setValue('');
			if (this.pagingToolbar) {
				this.pagingToolbar.cursor = 0;
				this.pagingToolbar.afterTextItem.setText(String.format(this.pagingToolbar.afterPageText, '1'));
				this.pagingToolbar.inputItem.setValue(1);
				this.pagingToolbar.first.setDisabled(true);
				this.pagingToolbar.prev.setDisabled(true);
				this.pagingToolbar.next.setDisabled(true);
				this.pagingToolbar.last.setDisabled(true);
				this.pagingToolbar.refresh.enable();
				this.pagingToolbar.updateInfo();
			}
			return;
		}
		this.searchField.setValue(rawValue + '%');
		this.onSearchClick();
	},
	onSearchClick: function () {
		var searchValue = this.searchField.getValue();

		if (Ext.isEmpty(searchValue.trim())) {
			this.searchLoadMask.show();
			return;
		}
		this.searchLoadMask.hide();
		this.emptyLoadMask.hide();
		this.doQuery('', searchValue, this.SEARCHCLICK, this.editingRow, this.editingCol);
	},
	doQuery: function (fieldName, query, __status, editingRow, editingCol, startValue) {
		query = Ext.isEmpty(query) ? '' : String(query);
		var qe = {
			query: query,
			lov: this,
			cancel: false,
			status: __status,
			editingRow: editingRow,
			editingCol: editingCol,
			startValue: startValue
		};
		if (this.fireEvent('beforequery', qe) === false || qe.cancel) {
			return false;
		}
		query = qe.query.trim();
		if (!Ext.isEmpty(query)) {
			this.store.baseParams[this.queryParam] = query;
			this.store.baseParams[this.fieldParam] = fieldName;
			this.store.baseParams['__status'] = qe.status;
			this.store.baseParams['__editingRow'] = editingRow;
			this.store.baseParams['__editingCol'] = editingCol;
			this.store.baseParams['__startValue'] = startValue;
			this.store.load({
				params: this.getParams()
			});
		}
	},
	getParams: function () {
		var params = {};
		var paging = this.pagingToolbar;
		var pn = paging.getParams();
		if (!params[pn.start]) { params[pn.start] = 0 };
		if (!params[pn.limit]) { params[pn.limit] = paging.pageSize };
		return params;
	},
	getStore: function () {
		return this.store;
	},
	getPagingToolbar: function () {
		return this.pagingToolbar;
	},
	updateEditState: function () {
		if (this.rendered) {
			if (this.readOnly) {
				this.el.dom.readOnly = true;
				this.el.addClass('x-trigger-noedit');
				this.mun(this.el, 'click', this.onTriggerClick, this);
			} else {
				if (!this.editable) {
					this.el.dom.readOnly = true;
					this.el.addClass('x-trigger-noedit');
					this.mon(this.el, 'click', this.onTriggerClick, this);
				} else {
					this.el.dom.readOnly = false;
					this.el.removeClass('x-trigger-noedit');
					this.mun(this.el, 'click', this.onTriggerClick, this);
				}
				this.trigger.setDisplayed(!this.hideTrigger);
			}
			this.onResize(this.width || this.wrap.getWidth());
		}
	}
});
Ext.reg('ss-lovfield', Ext.ss.form.LovField);