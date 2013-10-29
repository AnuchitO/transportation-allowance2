Ext.ss = {};

Ext.ss.getUrlParam = function(param) {
	var params = Ext.urlDecode(location.search.substring(1));
	return param ? params[param] : '';
};

Ext.ss.submitForm = function(form, params, successCallback, failureCallback) {
	form.submit({
		params : params,
		success : function(form, action) {
			if (Ext.isString(successCallback)) {
				Ext.Msg.alert('Success', successCallback);
			} else if (successCallback) {
				successCallback.call(this, form, action);
			}
		},
		failure : function(form, action) {
			if (Ext.isString(failureCallback)) {
				Ext.Msg.alert('Failure', failureCallback);
			} else if (failureCallback) {
				failureCallback.call(this, form, action);
			} else {
				switch (action.failureType) {
					case Ext.form.Action.CLIENT_INVALID :
						Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
						break;
					case Ext.form.Action.CONNECT_FAILURE :
						Ext.Msg.alert('Failure', 'Ajax communication failed');
						break;
					case Ext.form.Action.SERVER_INVALID :
						break;
				}
			}
		}
	});
};