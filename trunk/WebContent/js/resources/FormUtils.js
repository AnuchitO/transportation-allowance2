var FormUtils = {};

FormUtils.clear = function(formPanel)
{
	var formFields = formPanel.getForm().items.items;
	for (var i = 0; i < formFields.length; i++)
	{
		var formField = formFields[i];
		if (formField['setValue'])
		{
			if (formField.xtype && formField.xtype == 'checkbox')
			{
				formField.setValue(false);
			}
			else
			{
				formField.setValue('');
			}
		}
	}
};

FormUtils.disable = function(id)
{
};

FormUtils.getFieldValues = function(id)
{
	var fieldValues = {};
	var fields = Ext.query('.x-form-field', document.getElementById(id));
	for (var i = 0; i < fields.length; i++)
	{
		var componentId = fields[i].id;
		var component = Ext.getCmp(componentId);
		if (!Ext.isEmpty(component))
		{
			fieldValues[componentId] = component.getValue();
		}
	}
	return fieldValues;
};

FormUtils.getMapFieldValues = function(id)
{
	var fieldValues = new Ext.util.MixedCollection();
	var fields = Ext.query('.x-form-field', document.getElementById(id));
	for (var i = 0; i < fields.length; i++)
	{
		var componentId = fields[i].id;
		var component = Ext.getCmp(componentId);
		if (!Ext.isEmpty(component))
		{
			fieldValues.add(componentId, component.getValue());
		}
	}
	return fieldValues;
};

FormUtils.clean = function(id)
{
	var fields = FormUtils.getMapFieldValues(id);
	fields.eachKey
	(
		function(id)
		{
			var component = Ext.getCmp(id);
			component.originalValue = null;
			if (component['setValue'])
			{
				if (component.xtype && component.xtype == 'checkbox')
				{
					component.setValue(false);
				}
				else
				{
					component.setValue('');
				}
			}
		}
	);
};


FormUtils.isValid = function(id)
{
	var isValid = true;
	var fields = FormUtils.getMapFieldValues(id);
	
	fields.eachKey
	(
		function(id)
		{
			var component = Ext.getCmp(id);
			if (!component.validate())
			{
				isValid = false;
			}
		}
	);
	return isValid;
};

FormUtils.reset = function(id)
{
	var fields = FormUtils.getMapFieldValues(id);
	fields.eachKey
	(
		function(id)
		{
			var component = Ext.getCmp(id);
			component.reset();
		}
	);
};

FormUtils.load = function(loadObject)
{
	if (!Ext.isEmpty(loadObject))
	{
		for (var key in loadObject) 
		{
			var cmp = Ext.getCmp(key);
			if (cmp) 
			{
				if (cmp.getXType() == 'checkbox')
				{
					var value = loadObject[key];
					if (!value || value == false 
						|| value == 'N' || value == 'n' 
						|| value == 0 || value == '0')
					{
						cmp.setValue(false);
						cmp.originalValue = false;
					}
					else
					{
						cmp.setValue(true);
						cmp.originalValue = true;
					}
				}
				else if (cmp.getXType() == 'radiogroup')
				{
					cmp.setValue(loadObject[key], true);
					cmp.originalValue = cmp.getValue();
				
					cmp.eachItem(function(item) 
					{
						item.originalValue = item.getValue();
				    });
				}
				else if (cmp.getXType() == 'fission-textdatefield')
				{
					var loadValue = loadObject[key];
					if (loadValue && loadValue.time)
					{
						loadValue = DateUtils.formatShortDate(new Date(loadValue.time));
					}
					cmp.setValue(loadValue, true);
					cmp.originalValue = cmp.getValue();
				}
				else
				{
					cmp.setValue(loadObject[key], true);
					cmp.originalValue = cmp.getValue();
				}
			}
		}
	}
};
