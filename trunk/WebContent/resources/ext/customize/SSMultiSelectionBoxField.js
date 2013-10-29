Ext.namespace('Ext.ss.form');

Ext.ss.form.MultiSelectionBoxField = Ext.extend(Ext.form.TriggerField, {
	msbTitle: 'Multi Selection Box',
	msbWidth: 400,
	msbHeight: 375,
	isShowMsb: false,
	submitValue: undefined,
	zIndex: undefined,
	value: [],
	triggerClass: 'x-form-search-trigger',
	okBtnText: 'OK',
	closeBtnText: 'Close',
	noDataFoundMessage: 'No Data Found.',
	loaded: false,
	seperator: ',',
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
	 * LoadMask properties
	 */
	emptyLoadMask: undefined,
	/**
	 * Combobox properties and methods.
	 */
	valueField: 'code',
	//required
	displayField: 'code',
	descriptionField: 'description',
	initComponent: function () {
		Ext.ss.form.MultiSelectionBoxField.superclass.initComponent.call(this);
		this.addEvents('beforeshow', 'beforehide', 'show', 'hide', 'beforequery', 'beforeclickok', 'clickok');
	},
	initEvents: function () {
		this.maskRe = /^\w*$/;
		Ext.ss.form.MultiSelectionBoxField.superclass.initEvents.call(this);
	},
	filterKeys: function (e) {
		var k = e.getKey();
		if (k == e.TAB) {
			return;
		}
		e.stopEvent();
		return;
	},
	onRender: function (ct, position) {
		this.displayField = Ext.value(this.displayField, this.valueField);
		this.descriptionField = Ext.value(this.descriptionField, this.displayField);

		Ext.ss.form.MultiSelectionBoxField.superclass.onRender.call(this, ct, position);

		if (Ext.isGecko) {
			this.el.dom.setAttribute('autocomplete', 'off');
		}
	},
	afterRender: function (ct) {
		Ext.ss.form.MultiSelectionBoxField.superclass.afterRender.call(this);
		this.initMsb();
	},
	onResize: function (w, h) {
		Ext.form.TriggerField.superclass.onResize.call(this, w, h);
		var tw = this.getTriggerWidth();
		if (Ext.isNumber(w)) {
			this.el.setWidth(w - tw);
		}
		this.wrap.setWidth(this.el.getWidth() + tw);
	},
	getValue: function () {
		if (this.valueField) {
			this.value = Ext.value(this.value,[]);
			if(Ext.isArray(this.value)) {
				this.value.sort(); // Sort for ascii
				this.value.sort(function(a,b){ // Sort for number
					return a-b;
				});
			} else {
				v = this.value;
			}
			return this.value;
		} else {
			return Ext.ss.form.MultiSelectionBoxField.superclass.getValue.call(this);
		}
	},
	/**
	 * Msb Field properties and methods.
	 */
	initMsb: function () {

		if (this.windowMsb === undefined) {

			if(Ext.isArray(this.fields) && this.fields.length == 0) {
				this.fields = undefined;
			}
			
			this.fields = Ext.value(this.fields, [this.valueField, this.displayField, this.descriptionField]);

			this.selModel = Ext.value(this.selModel, new Ext.ss.grid.CheckboxSelectionModel({}));

			if(Ext.isArray(this.columns) && this.columns.length == 0) {
				this.columns = undefined;
			}
			
			this.columns = Ext.value(this.columns, [this.selModel,
			{
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
					load: this.onLoad,
					exception: this.onException
				}
			});

			this.gridMsb = new Ext.grid.GridPanel({
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
				selModel: this.selModel
			});

			this.windowMsb = new Ext.Window({
				title: this.msbTitle,
				modal: true,
				resizable: false,
				closable: false,
				closeAction: 'hide',
				width: this.msbWidth,
				height: this.msbHeight,
				border: false,
				layout: 'border',
				items: [this.gridMsb],
				buttonAlign: 'center',
				buttons: [{
					text: this.okBtnText,
					scope: this,
					handler: this.onClickOk
				},
				{
					text: this.closeBtnText,
					scope: this,
					handler: this.hideMsb
				}],
				listeners: {
					scope: this,
					show: this.onShow,
					hide: this.onHide
				}
			});
		}
	},
	clearValue: function () {
		this.setRawValue('');
		this.value = [];
	},
	onClickOk: function () {
		var sm = this.gridMsb.getSelectionModel(),
			records, values = [],
			rawValue = '';
		if (sm.hasSelection()) {
			records = sm.getSelections();
		}

		if (records && records.length > 0) {
			rawValue = records[0].get(this.displayField);
			values.push(records[0].get(this.valueField));
			for (var i = 1; i < records.length; i++) {
				rawValue += this.seperator + records[i].get(this.displayField);
				values.push(records[i].get(this.valueField));
			}
		}

		if (this.fireEvent('beforeclickok', this, records, values, rawValue) !== false) {
			this.setRawValue(rawValue);
			this.setValue(values);
			this.fireEvent('clickok', this, records, values, rawValue);
			this.hideMsb();
		}
	},
	setValue: function (v) {
		if (Ext.isString(v) && !Ext.isEmpty(v)) {
			this.value = v.split(this.seperator);
		} else if (Ext.isArray(v)) {
			this.value = v;
		} else {
			this.value = [];
		}

		var rawValue = '';
		if (Ext.isArray(this.value) && this.value.length > 0 && this.store.getCount() > 0) {
			var record = this.store.getById(this.value[0]);
			rawValue = (record) ? record.get(this.displayField) : this.value[0];
			for (var i = 1; i < this.value.length; i++) {
				record = this.store.getById(this.value[i]);
				rawValue += this.seperator + (record) ? record.get(this.displayField) : this.value[i];
			}
		}

		Ext.ss.form.MultiSelectionBoxField.superclass.setRawValue.call(this, this.getValue());
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
	onLoad: function (store, records, options) {
		this.loaded = true;
		if (records) {
			if (records.length === 0) {
				if (this.isShowLov) {
					this.emptyLoadMask.show();
				}
			} else {
				this.applyCheckboxSelectionModel();
			}
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
		this.windowMsb.setZIndex(this.zIndex);
	},
	onShow: function (window) {
		if (window) {
			this.initZIndex();
			this.triggerBlur = Ext.emptyFn;
			this.fireEvent('show', this);
			this.isShowMsb = true;
		}
	},
	onHide: function (window) {
		this.triggerBlur = Ext.ss.form.MultiSelectionBoxField.superclass.triggerBlur;
		this.fireEvent('hide', this);
		this.isShowMsb = false;
		this.hasFocus = true;
		this.focus();
	},
	initMask: function () {
		if (!this.emptyLoadMask) {
			this.emptyLoadMask = new Ext.LoadMask(this.gridMsb.bwrap, {
				msg: this.noDataFoundMessage,
				msgCls: 'msb-load-mask'
			});
		}
	},
	showMsb: function () {
		if (this.isShowMsb) {
			return;
		}
		if (this.fireEvent('beforeshow', this) !== false) {
			this.windowMsb.show(this);
			this.initMask();
			this.doQuery();
		}
	},
	hideMsb: function (a) {
		if (!this.isShowMsb) {
			return false;
		}
		if (this.fireEvent('beforehide', this) !== false) {
			this.windowMsb.hide();
			this.emptyLoadMask.hide();
			this.gridMsb.getSelectionModel().clearSelections();
		}
		return this;
	},
	onTriggerClick: function () {
		if (this.disabled || this.readOnly) {
			return;
		}
		if (this.showMsb() === false) {
			return;
		}
	},
	applyCheckboxSelectionModel: function () {
		var values = this.getValue();
		if (Ext.isArray(values)) {
			var records = [];
			for (var i = 0; i < values.length; i++) {
				records.push(this.store.getById(values[i]));
			}
			this.gridMsb.getSelectionModel().selectRecords(records);
		}
	},
	doQuery: function () {
		var qe = {
			msb: this,
			cancel: false,
			loaded: this.loaded
		};
		if (this.fireEvent('beforequery', qe) === false || qe.cancel) {
			return false;
		}
		if (!qe.loaded) {
			this.store.load({
				params: this.getParams()
			});
		} else {
			this.applyCheckboxSelectionModel();
		}
	},
	getParams: function () {
		var params = {};
		return params;
	},
	getStore: function () {
		return this.store;
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
Ext.reg('ss-msbfield', Ext.ss.form.MultiSelectionBoxField);