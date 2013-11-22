var SLI001 = {};
SLI001.Login = new Ext.FormPanel({
	labelWidth:80,
	frame:true,
	title:'Please Login',
	defaultType:'textfield',
	width:300,
	height:150,
	monitorValid:true,
	items:[{
			fieldLabel:'Username',
			name:'username',
			allowBlank:false
		 },{
			fieldLabel:'Password',
			name:'password',
			inputType:'password',
			allowBlank:false
		 }],

	// All the magic happens after the user clicks the button
	buttons:[{
		text:'Login',
		formBind: true,
		// Function that fires when user clicks the button
		handler:function(){
			SLI001.Login.getForm().submit({
			method:'POST',
			success:function(response,jsonResponse){
			Ext.Msg.alert('Status', 'Login Successful!', function(btn, text){
				if (btn == 'ok'){
					window.location = "/TransportationAllowance/"+jsonResponse.result.message;
				}
			});

		},
		failure:function(form, action){
			if(action.result.failure){
				Ext.Msg.alert('Login', "Login Failed!");
				SLI001.Login.getForm().reset();
			}else{
				alert("Failure Else");
			}
		}

		});
	}
	}]
});

Ext.onReady(function() {SLI001.resumeForm = new Ext.form.FormPanel({
				applyTo : "content",
				layout : 'column',
				border : false,
				width : 840,
				style : {
					"margin-left" : "auto",
					"margin-right" : "auto",
					"margin-top" : "80px"
				},
				defaults : {
					xtype : 'container',
					layout : 'form',
					columnWidth : 1,
					anchor : '100%',
					// hideBorders : true
				},

				items : [{
				        	items : SLI001.Login,
				    		style : {
				    			"position" : "relative",
				    			"left" : "280px",
				    			"top" : "0px"
				    		}
				         }]
			});
});

	
