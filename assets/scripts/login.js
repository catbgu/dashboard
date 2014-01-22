var Login = function () {

	var handleLogin = function() {
		$('.login-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                remember: {
	                    required: false
	                }
	            },

	            messages: {
	                username: {
	                    required: "Username is required1."
	                },
	                password: {
	                    required: "Password is required2."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-error', $('.login-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.login-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.login-form').validate().form()) {
	                }
	                return false;
	            }
	        });

	        jQuery('.reset-passwd-form').hide();
	}

	var handleForgetPassword = function () {
		$('.forget-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                email: {
	                    required: true,
	                    email: true
	                }
	            },

	            messages: {
	                email: {
	                    required: "Email is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.forget-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.forget-form').validate().form()) {
	                    $('.forget-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#forget-password').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.reset-passwd-form').hide();
	            jQuery('.forget-form').show();
	        });

	        jQuery('#back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.forget-form').hide();
	            jQuery('.reset-passwd-form').hide();
	        });

	}

	var handleRegister = function () {

		function format(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='flag' src='assets/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
        }


		$("#select2_sample4").select2({
		  	placeholder: '<i class="icon-map-marker"></i>&nbsp;Select a Country',
            allowClear: true,
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function (m) {
                return m;
            }
        });


			$('#select2_sample4').change(function () {
                $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });



         $('.register-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                
	                fullname: {
	                    required: true
	                },
	                email: {
	                    required: true,
	                    email: true
	                },
	                address: {
	                    required: true
	                },
	                city: {
	                    required: true
	                },
	                country: {
	                    required: true
	                },

	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                rpassword: {
	                    equalTo: "#register_password"
	                },

	                tnc: {
	                    required: true
	                }
	            },

	            messages: { // custom messages for radio buttons and checkboxes
	                tnc: {
	                    required: "Please accept TNC first."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
	                    error.addClass('help-small no-left-padding').insertAfter($('#register_tnc_error'));
	                } else if (element.closest('.input-icon').size() === 1) {
	                    error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	                } else {
	                	error.addClass('help-small no-left-padding').insertAfter(element);
	                }
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

			$('.register-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.register-form').validate().form()) {
	                    $('.register-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#register-btn').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.reset-passwd-form').hide();
	            jQuery('.register-form').show();
	        });

	        jQuery('#register-back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.register-form').hide();
	            jQuery('.reset-passwd-form').hide();
	        });
	}

	var handleEnterForgetPassword = function () {
		$('.reset-passwd-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {

	                email: {
	                    required: true,
	                    email: true
	                },
	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                rpassword: {
	                    equalTo: "#register_password"
	                }

	            },

	            messages: {
	                email: {
	                    required: "Email is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        // $('.reset-passwd-form input').keypress(function (e) {
	        //     if (e.which == 13) {
	        //         if ($('.reset-passwd-form').validate().form()) {
	        //             $('.reset-passwd-form').submit();
	        //         }
	        //         return false;
	        //     }
	        // });

	        // jQuery('#forget-password').click(function () {
	            // jQuery('.login-form').hide();
	            // jQuery('.reset-passwd-form').show();
	        // });

	        // jQuery('#back-btn').click(function () {
	        //     jQuery('.login-form').show();
	        //     jQuery('.reset-passwd-form').hide();
	        // });

	}
    
    return {
        //main function to initiate the module
        init: function () {
        	
            handleLogin();
            handleForgetPassword();
            handleRegister();        
	       
        }

    };

}();

//LOGIN FUNCTIONS
function register() {

	var creator_name = $('#full_name').val();
	var creator_email = $('#email').val();
	var pass = $('#register_password').val();
	var passconf = $('#verify_password').val();


	if ( pass == passconf && creator_name != '' && creator_email != '' && pass != '') {
		var creators = StackMob.User.extend({ schemaName: 'Curators' });
		var user = new creators({ name: creator_name, username: creator_email, password: pass });
		user.create({
				success: function(model, result, options) {
					$("#register-submit-btn").html('Processing <i class="spinner-processing"></i>').removeClass('green').addClass("black");
					var userlogin = new creators({ username: creator_email, password: pass });
					userlogin.login(false, {
					  success: function(model, result, options) { 
					  	window.location.href = "login.php?email=" + creator_email + "&name=" + creator_name;
					  },
					  error: function(model, result, options) {alert("error");}
					}); 
				},
				error: function(model, response, options) {
					alert('could not create user');
					console.debug(response);
				}
		});
	}
}

function login() {
	var login_email = $('#login_email').val();
	var login_password = $('#login_password').val();



	if ( login_email != '' && login_password != '') {

		var curators = StackMob.User.extend({ schemaName: 'Curators', loginField: 'username', passwordField: 'password' });

		var d = new curators({ username: login_email, password: login_password });
		d.login(false, {
		  success: function(model, result, options) { 
		  	Redirect(); 

		  },
		}); 
	}
}

function forgetpassword() {

	var creators = StackMob.User.extend({ schemaName: 'Curators' });
	var user = new creators({ username: $('#forget-password-email').val() }); 
	user.forgotPassword({ 
	    success: function(model) {
	    	jQuery('.forget-form').hide();
	        jQuery('.reset-passwd-form').show();
	        console.debug(model);
	    },
	    error: function(model, response) {
	        console.debug(response['error']);
	    }
	});

}

function enterforgetpassword() {

	var creators = StackMob.User.extend({ schemaName: 'Curators' });
	var user = new creators({ username: $('#forget-password-email').val() });
	user.loginWithTempAndSetNewPassword( $('#old_password').val() , $('#new_password').val(), false, {
    success: function(model) {
        // now password for user 'Bill Watterson' has changed
        console.debug(model);
        Redirect();
    },
    error: function(model, response) {
        console.debug(response['error']);
    }
});

}

function Redirect() {
		window.location.href = "landing.html";
}


$('#register-submit-btn').on('click', function() {
	register();

	return false;
});

$('#login_button').on('click', function() {
	login();

	return false;
});
$('#forget-password-submit').on('click', function() {
	forgetpassword();


	return false;
});
$('#reset-passwd-btn').on('click', function() {
	enterforgetpassword();

	return false;
});


