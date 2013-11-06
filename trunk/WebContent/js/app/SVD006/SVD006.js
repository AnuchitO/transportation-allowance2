var SVD006 = {};

Ext.onReady(function() {SVD006.resumeForm = new Ext.form.FormPanel({
				applyTo : "content",
				layout : 'column',
				border : false,
				width : 840,
				style : {
					"margin-left" : "auto",
					"margin-right" : "auto",
					"margin-top" : "50px"
				},
				defaults : {
					xtype : 'container',
					layout : 'form',
					columnWidth : 1,
					anchor : '100%',
					// hideBorders : true
				},

				items : [
				   {
					columnWidth : 0.5,
					items : SVD006C.createButtonSubmit,

					style : {
						"margin-left" : "150px",

					},

				}, {
					columnWidth : 0.5,
					items : SVD006C.createButtonBack,
					style : {
						"margin-left" : "5px",

					},

				},{
					items : SVD006C.tabPanel
				} ],

			});
		});
