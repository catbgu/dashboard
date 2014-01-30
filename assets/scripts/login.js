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
                    required: "Your registered email is required"
                },
                password: {
                    required: "Password is required"
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
                	login();
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
                    required: "A valid email address is required"
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit   

            },

            highlight: function (element) { // hightlight error inputs
                $(element).closest('.control-group').addClass('error'); // set error class to the control group
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
                    forgetpassword();
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
            $('#forget-password-email').val('');
        });
	}

	var handleRegister = function () {
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
                password: {
                    minlength: 5,
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit   

            },

            highlight: function (element) { // hightlight error inputs
                $(element).closest('.control-group').addClass('error'); // set error class to the control group
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
            $('#full_name, #email, #register_password, #verify_password').val('');
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
	$("#register-submit-btn").html('Processing <i class="spinner-processing"></i>').removeClass('green').addClass("black");
	var creator_name = $('#full_name').val();
	var creator_email = $('#email').val().toLowerCase();
	var pass = $('#register_password').val();
	var passconf = $('#verify_password').val();

	if ( pass == passconf && creator_name != '' && creator_email != '' && pass != '') {
		var creators = StackMob.User.extend({ schemaName: 'Curators' });
		var user = new creators({ name: creator_name, username: creator_email, password: pass });
		user.create({
			success: function(model, result, options) {
				var userlogin = new creators({ username: creator_email, password: pass });
				userlogin.login(true, {
				  success: function(model, result, options) { 
				  	window.location.href = "assets/php/login.php?email=" + creator_email + "&name=" + creator_name;
				  },
				  error: function(model, result, options) {alert("error");}
				}); 
			},
			error: function(model, response, options) {
				$("#login_button").html('Login <i class="m-icon-swapright m-icon-white"></i>').removeClass('black').addClass("green");

				$('.alert-error').show();
				$('.alert-error span').text('Error registering your account. Please report the issue!');

                window.setTimeout(function () {
					$('.alert-error').hide();
					$('.alert-error span').text('Enter your Username and Password');
                }, 2500);  		

                console.debug(response['error']);		
			}
		});
	}
}

function login() {
	var login_email = $('#login_email').val().toLowerCase();
	var login_password = $('#login_password').val();

    localStorage.removeItem('jsonObject');                                     

	if ( login_email != '' && login_password != '') {
        //check if username & pass in cookied
        if ($('#remember').attr('checked')) {
            // set cookies to expire in 30 days
            $.cookie('username', login_email, { expires: 30 });
            $.cookie('password', login_password, { expires: 30 });
            $.cookie('remember', true, { expires: 30 });
        } else {
            // reset cookies
            $.cookie('username', null);
            $.cookie('password', null);
            $.cookie('remember', null);
        }   

		$("#login_button").html('Logging In <i class="spinner-processing"></i>').removeClass('green').addClass("black");
		var curators = StackMob.User.extend({ schemaName: 'Curators', loginField: 'username', passwordField: 'password' });
		var d = new curators({ username: login_email, password: login_password });
		d.login(true, {
			success: function(model, result, options) { 
				//REF: http://stackoverflow.com/a/221297
                var time = new Date().getTime();

                var user_timestamp = new curators({ username: login_email, password: login_password });
                user_timestamp.appendAndSave('login_timestmp', [time], {
                  success: function(model, result, options) {
                    Redirect(); 
                  }
                });

			},
			error: function(model, response, options) {
				$("#login_button").html('Login <i class="m-icon-swapright m-icon-white"></i>').removeClass('black').addClass("green");

				$('.alert-error').show();
				$('.alert-error span').text('Wrong Username/Email and Password combination. Try again!');

                window.setTimeout(function () {
					$('.alert-error').hide();
					$('.alert-error span').text('Enter your Username and Password');
                }, 2500);  	

                console.debug(response['error']);			
			}
		}); 
	}
}

function forgetpassword() {
	$("#forget-password-submit").html('Processing <i class="spinner-processing"></i>').removeClass('green').addClass("black");
	var creators = StackMob.User.extend({ schemaName: 'Curators' });
	var user = new creators({ username: $('#forget-password-email').val().toLowerCase() }); 
	user.forgotPassword({ 
	    success: function(model) {
	    	jQuery('.forget-form').hide();
	        jQuery('.reset-passwd-form').show();
	        $("#forget-password-submit").html('Submit <i class="m-icon-swapright m-icon-white"></i>').removeClass('black').addClass("green");
	    },
	    error: function(model, response) {
	        $("#forget-password-submit").html('Submit <i class="m-icon-swapright m-icon-white"></i>').removeClass('black').addClass("green");

            $('.forget-form p').append('<div class="alert alert-error hide alert-error-reset-pass" style="display: block;"><button class="close" data-dismiss="alert"></button><span>No account registered for this email. Try again!</span></div>');

            window.setTimeout(function () {
                $('.alert-error-reset-pass').remove();
            }, 2500);

            console.debug(response['error']);          
	    }
	});
}

function enterforgetpassword() {
	$("#reset-passwd-btn").html('Processing <i class="spinner-processing"></i>').removeClass('green').addClass("black");

	var creators = StackMob.User.extend({ schemaName: 'Curators' });
	var user = new creators({ username: $('#forget-password-email').val().toLowerCase() });
	user.loginWithTempAndSetNewPassword( $('#old_password').val() , $('#new_password').val(), false, {
	    success: function(model) {
	        Redirect();
	    },
	    error: function(model, response) {
	        $("#reset-passwd-btn").html('Reset Password <i class="m-icon-swapright m-icon-white"></i>').removeClass('black').addClass("green");
            console.debug(response['error']);
	    }
	});
}

function Redirect() {
	window.location.href = "landing.html";
}

$('#register-submit-btn').on('click', function() {
    if ($('.register-form').validate().form()) {
        register();
    }	
	return false;
});

$('#login_button').on('click', function() {
    if ($('.login-form').validate().form()) {
    	login();
    }
	return false;
});
$('#forget-password-submit').on('click', function() {
    if ($('.forget-form').validate().form()) {
        forgetpassword();
    }	
	return false;
});
$('#reset-passwd-btn').on('click', function() {	
	enterforgetpassword();
	return false;
});