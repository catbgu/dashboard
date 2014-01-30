jQuery(document).ready(function() { 
	if (StackMob.getLoggedInUser() == null)
	{
	  window.location.href = 'login.html';
	}

	App.blockUI($('.portlet-body'));   

	//LANDING PAGE CURATORS NAME
	var curator_name = StackMob.Model.extend({ schemaName: 'Curators' });
	var curators = StackMob.Collection.extend({ model: curator_name }); 
	var items = new curators();
	var q = new StackMob.Collection.Query();
	q.equals('username', StackMob.getLoggedInUser());
	items.query(q, {
		success: function(results) {
		  var resultsAsJSON = results.toJSON();
		  $('#curator-name').text(resultsAsJSON[0].name);
		}
	});

	//ARTIST STACKMOB ACCESS
	var artist_data = StackMob.Model.extend({ schemaName: 'Artist' });
	var myartist_data = StackMob.Collection.extend({ model: artist_data }); 
	var items_artist_data = new myartist_data();
	var qartist_data = new StackMob.Collection.Query();
	var artist_list = [];
	qartist_data.orderAsc('artist_name');
	items_artist_data.query(qartist_data, {
	    async: false,
	    success: function(results) {
			var resultsAsJSON = results.toJSON();
			if (resultsAsJSON.length == 0){
				$(".my_curations").append("There are no artists in the database at the moment.");
				return false;
			}
			for (i = 0; i < resultsAsJSON.length; i++) {
				$(".my_curations").append(""+
				"<li class='tile image curation' id='card_"+ i +"'>"+
				    "<div class='tile-body'>"+
				    "<a href='#form_modal10' data-toggle='modal'><div class='my_curation_edit'></div></a>" +
				    "<img src='http://inspiredapp.tv/img/music/artists/" + resultsAsJSON[i].artist_name.replace(/\ /g, '-').toLowerCase() + "/cover.png' alt=''>"+
				    "</div>"+
				    "<div class='tile-object'>"+
				      "<div class='name' id='artist_name'>"+
				        resultsAsJSON[i].artist_name +
				      "</div>"+
				    "</div>"+
				"</li>");	

				artist_list.push(resultsAsJSON[i].artist_name);
			}

			window.setTimeout(function () {
	            App.unblockUI($('.portlet-body'));
	        }, 100); 
	    }, 
	    error: function (request,error) {
	    	window.setTimeout(function () {
	            App.unblockUI($('.portlet-body'));
	        }, 100);
	    }
	});

	// var options = { valueNames: [ 'name' ] }, userList = new List('artist_list', options);
	
	var options = new List('artist_list', {
	  valueNames: ['name'],
	  page: 18,
	  plugins: [ ListPagination({}) ] 
	});	

	//ADD NEW ARTISTS
	$('#add_new_artist').live("click", function() {
		$("#new_artist_name").val('');
		$("#artist_image").attr('src', 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=add+image');	
		$('.my_curations').find('li').removeClass('selected');
		$(this).addClass('selected');
	});

	$('#reset_artist_image_form').on("click", function() {
		$("#new_artist_name").val('');
		$("#remove-new-artist-btn").click();
		$('.my_curations').find('li').removeClass('selected');
	}); 	

	//EDIT ARTIST BUTTON
	var old_artist_name = '';
	$('.my_curation_edit').on("click", function() {
		$('.my_curations').find('li').removeClass('selected');
		$(this).closest('.tile').addClass('selected');

		var artist_name = $('.selected').find('#artist_name').text(); 
		old_artist_name = artist_name;

		$("#new_artist_name").val(artist_name);
		artist_name = artist_name.replace(/\ /g, '-').toLowerCase();
		$("#artist_image").attr('src', 'http://inspiredapp.tv/img/music/artists/' + artist_name + '/cover.png');
	});  

	//ARTIST SAVE BUTTON
	$('#submit-artist').on("click", function() {
		// if ($('.fileupload').hasClass('fileupload-new') || $('#new_artist_name').val() == '' || $('#artist_image').attr('src') == 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=add+image'){
		// 	$('.alert-error').show();

		// 	return false;
		// }		
		$('.alert-error').hide();

		if( $('#add_new_artist').hasClass('selected') ) {
			var artist_register = StackMob.Model.extend({ schemaName: 'Artist' });
			var myartist_register = new artist_register({ artist_name: $("#new_artist_name").val(), cover_image: 'cover.png' });

			qartist_data.equals('artist_name', $("#new_artist_name").val())
			items_artist_data.query(qartist_data, {
				success: function(results) {
			        var resultsAsJSON = results.toJSON();
			        console.debug(resultsAsJSON.length);
			        if(resultsAsJSON.length > 0){
			        	alert("Artist is already in the database.");
			        } else {
			        	myartist_register.create({
						    success: function(model) {
						        console.debug(model);
						    },
						    error: function(model, response) {
						        console.debug(response);
						    }
						});
			        }
			    }
			});
		}
		if( $('.tile').hasClass('selected') ) {
			//SAVE BUTTON - SAVES INTO STACKMOB
			var artist_update = StackMob.Model.extend({ schemaName: 'Artist' });
		    var myartist_update = StackMob.Collection.extend({ model: artist_update }); 
		    var artists = new myartist_update();
		    var qitems = new StackMob.Collection.Query();
			var artist_name_submit = $('.selected').find('#artist_name').text();
		    artists.query(qitems, {
		      	success: function(results) {
			        var resultsAsJSON = results.toJSON();
			        var artist_id = '';
			        for (i = 0; i < resultsAsJSON.length; i++) {
			        	if(resultsAsJSON[i].artist_name == artist_name_submit) {
			        		artist_id = resultsAsJSON[i].artist_id;
			        		break;
			        	} else {

			        	}
			        }
					var mynewartist_update = new artist_update({ Artist_id: artist_id });
					var changed_artist_name = $("#new_artist_name").val();
					mynewartist_update.save({ artist_name: changed_artist_name, cover_image: 'cover.png' }, {
				        success: function(model) {
				        	$('.selected').find('#artist_name').text(changed_artist_name);
				            console.debug(model.toJSON());
				        },
				        error: function(model, response) {
				            console.debug(response);
				        }
				    });
		      	}
		    });
		}
		//UPLOAD ARTIST IMAGE
        fileUpload(document.forms.artist_image_form,'http://dashboard.inspiredapp.tv/assets/php/artist_cover_image_upload.php?artist_name=' + $("#new_artist_name").val().replace(/\ /g, '-').toLowerCase() + '&changed_artist=' + old_artist_name.replace(/\ /g, '-').toLowerCase() ,'artist_image_upload_iframe');

		$("#remove-new-artist-btn").click();
	});
}); 