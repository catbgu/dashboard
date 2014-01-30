var JSON_outbound = {};
JSON_outbound.look = [];
    // -----------------------------
    // JSON_outbound = {
    //     "music_video_data" : {
    //         "artist" : "",
    //         "video_title" : "",
    //         "video_URL" : "",
    //         "video_cover_image" : ""
    //     },[
    //     "look" : {
    //         "lookDescription" : "",
    //         "product_group" : [[{
    //             "productID" : "",
    //             "productUPC" : "",
    //             "title" : "",
    //             "description" : "",
    //             "image" : "",
    //             "retailers" : {
    //                 "retailerName" : "",
    //                 "retailerLogo" : "",
    //                 "price" : "",
    //                 "buyURL" : ""
    //             },
    //             "selected" : ""
    //         }]]
    //     }]
    // };
    // ----------------------------- 

jQuery(document).ready(function() { 
    App.init();
    FormWizard.init();
    last_step = false;

    window.onbeforeunload = function() {
        if ($('#video_title_id').val() != "" && last_step == false){
            return 'Your work isn\'t save yet and it will be lost!';
        }
    };

    //GET username from StackMob
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


//-------------------------     TAB 1 FUNCTIONS     -------------------------//
    if (JSON_outbound.music_video_data != undefined) {
        var video_title_data = JSON_outbound.music_video_data.video_title.replace(/ /g, '-').toLowerCase();
        var artist_name_data = $("#new_artist_name").text().replace(/\ /g, '-').toLowerCase();
        if (artist_name_data.indexOf(',') != -1) {
            artist_name_data = artist_name_data.substring(0, artist_name_data.indexOf(','))
        }
        localStorage.setItem('ARTIST_IMG_PATH', artist_name_data);
        localStorage.setItem('VIDEO_TITLE_DATA', video_title_data);
    }

    $('#youtubeID').keypress(function (e) {
        if (e.which == 13) {
            $('#youtube-but').click();
            return false;
        }
    });    
   
    $('#youtube-but').on("click", function(e) {
        e.preventDefault();

        //add spinner
        var el = $(this).closest(".span12");
        App.blockUI(el);   

        $('.artist input, .video_title input, .full_video_title, .watch_on_youtube').html('');
        $('.video_cover_image').attr('src','');
        $('#video_details_panel, .form-actions').hide();
        var videoid = $('#youtubeID').val();
        var m;
        if (m = videoid.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^https:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^http:\/\/youtu\.be\/([^?]+)/i)) {
          videoid = m[1];
        }
        if (!videoid.match(/^[a-z0-9_-]{11}$/i)) {
            App.unblockUI(el);   
            $('#show_modal').click();
            $('.modal-body > p').text('You might want to try again since I couldn\'t find any YouTube videos that has the ID you input');      
            return;
        }
        $.getScript('http://gdata.youtube.com/feeds/api/videos/' + encodeURIComponent(videoid) + '?v=2&alt=json-in-script&callback=youtubeDataCallback');
    });

    //ref: http://ivaynberg.github.io/select2/
    $("#artist").select2({ 
        placeholder: "Select Artist(s)",
        allowClear: true      
    });

    //Fetching all the artists from the database
    var artist = StackMob.Model.extend({ schemaName: 'Artist' });
    var artists = StackMob.Collection.extend({ model: artist }); 
    var items = new artists();
    var q = new StackMob.Collection.Query();
    q.orderAsc('artist_name');
    items.query(q, {
        success: function(results) {
            //converting Collection to JSON and iterating it the traditional way
            var resultsAsJSON = results.toJSON();
            for(var i = 0; i < resultsAsJSON.length; i++) {
              $( "#artist" ).append("<option value="+ i +">" + resultsAsJSON[i]['artist_name'] +"</option>");
            }
        }
    });

    //submit new artist
    $('#submit-artist').on('click', function() {
        //ENTERING ARTISTS NAME TO THE DATABASE
        var new_artist = $('#new_artist_name').val();
        var my_new_artist = StackMob.Model.extend({ schemaName: 'Artist' });
        var artist_entry = new my_new_artist({ artist_name: new_artist, cover_image: 'cover.png' });

        q.equals('artist_name', new_artist);
        items.query(q, {
            success: function(results) {
                var resultsAsJSON = results.toJSON();
                if(resultsAsJSON.length > 0){
                    alert("Artist exists in the database!");
                } else {
                    //CREATE NEW ARTIST FROM LANDING.HTML
                    artist_entry.create({
                        success: function(model) {
                            var existing_artists = $('.select2-search-choice').text().replace(/\    /g, ',').replace(/\,,/g, '-').replace(/\,/g, '').split('-');
                            var newval = '[';
                            for(var i = 0; i < existing_artists.length; i++) {
                                newval += '{"id": '+ i +', "text": \"' + existing_artists[i] + '\"},';
                            }
                            newval += '{"id": 1001, "text": \"'+ new_artist +'\"}]';
                            var newdata = jQuery.parseJSON(newval);
                            if (newdata[0].text == "") {
                                $("#artist").select2("data", newdata[1]);
                            } else {
                                $("#artist").select2("data", newdata);
                            }

                            //ADDS TO THE SELECT LIST AFTER ADDING NEW ARTISTS
                            $( "#artist" ).append("<option>" + new_artist +"</option>");

                            $("#reset_artist_image_form" ).click();
                            $('#artist_image_upload_iframe').remove();
                        },
                        error: function(model, response) {
                            console.debug(response);
                        }
                    });
                    //UPLOAD ARTIST IMAGE
                    fileUpload(document.forms.music_video_form,'http://dashboard.inspiredapp.tv/assets/php/artist_cover_image_upload.php?artist_name=' + $("#new_artist_name").val().replace(/\ /g, '-').toLowerCase(),'artist_image_upload_iframe'); return false;
                }
            }
        });
    });

    //reset add new artist form
    $("#reset_artist_image_form").on("click", function() {
        $('#new_artist_name').val('');
        $('#remove-new-artist-btn').click();
    });



//-------------------------     TAB 2 FUNCTIONS     -------------------------//
    var look_id = 0;   
    var selectedProducts = [];    

    $('.find_item_form input').live('keypress',function (e) {
        if (e.which == 13) {
            $(this).blur();
            $(this).next('.find-item-but').click();
            return false;
        }
    });  

    $('a.find-item-but').live("click", function(e) {
        var productKeyword = $(this).siblings('.product').val();

        if (productKeyword == '') {
            $('#show_modal').click();
            $('.modal-body > p').text('You need to type a keyword');
            
            window.setTimeout(function () {
                $('#close_skimlinks_results').click();
            }, 200);             

            return false;
        }else{
            //add spinner
            App.blockUI($('#skimlinks_results_modal > .modal-body')); 

            $(this).addClass('this-is-search');

            $('.looks_details_panel_form').html("");
            $('#skimlinks_results_modal h3').append(productKeyword);   

            $.ajax({
                url: "http://api-product.skimlinks.com/query?key=69a92b5e49f3482898ac2395a76f2e3c&q="+ encodeURIComponent(productKeyword) +"&country_code=US&rows=300",
                dataType: "text",
                type: "GET",
                success: function(data) {
                    var JSON_inbound = $.parseJSON(data);

                    selectedProducts = [];
                            // -----------------------------
                            // selectedProducts = [{
                            //      "productUPC" : "",
                            //      "title" : "",
                            //      "description" : "",
                            //      "image" : "",
                            //      "retailers" : [{
                            //          "retailerName" : "",
                            //          "retailerLogo" : "",
                            //          "price" : "",
                            //          "buyURL" : ""
                            //      }],
                            //      "selected" : ""
                            // }];
                            // -----------------------------
                    if (JSON_inbound != null && JSON_inbound.skimlinksProductAPI.status == '200') {
                        for (var i = 0; i < JSON_inbound.skimlinksProductAPI.products.length; i++) {    
                            if (JSON_inbound.skimlinksProductAPI.products[i].country == 'US'){//restrict to US retailers
                                if (JSON_inbound.skimlinksProductAPI.products[i].imageUrl || JSON_inbound.skimlinksProductAPI.products[i].images.imageOriginalUrl || JSON_inbound.skimlinksProductAPI.products[i].images.imageThumb2Url){
                                    selectedProducts.push({
                                        productUPC: JSON_inbound.skimlinksProductAPI.products[i].identifiers.upc,
                                        title: JSON_inbound.skimlinksProductAPI.products[i].title,
                                        description: JSON_inbound.skimlinksProductAPI.products[i].description,
                                        image: JSON_inbound.skimlinksProductAPI.products[i].imageUrl,
                                        retailers: {
                                            retailerName: JSON_inbound.skimlinksProductAPI.products[i].merchant,
                                            retailerLogo: JSON_inbound.skimlinksProductAPI.products[i].merchant,
                                            price: JSON_inbound.skimlinksProductAPI.products[i].price,
                                            buyURL: JSON_inbound.skimlinksProductAPI.products[i].url
                                        },
                                        selected: 0
                                    }); 
                                }
                            }
                        }
                    }      

                    for (var i = 0; i < selectedProducts.length; i++) {
                        $('.looks_details_panel_form').append('<div class="tile image" id="'+ i +'"><div class="corner"></div><div class="check"></div><div class="tile-body"><img src="'+ selectedProducts[i].image +'" alt=""></div><div class="tile-object"><div class="name"><a href="'+ selectedProducts[i].retailers.buyURL +'" target="_blank">'+ selectedProducts[i].title +'</a></div></div></div>');
                    }

                    window.setTimeout(function () {
                        App.unblockUI($('#skimlinks_results_modal > .modal-body'));
                    }, 100);        
                },  
                error: function (request,error) {
                    $('#close_skimlinks_results').click();
                    App.unblockUI($('#skimlinks_results_modal > .modal-body'));
                    
                    window.setTimeout(function () {
                        alert('Product Search Engine Error!');
                    }, 300);                     
                },
                getResponseHeader: function (head) {
                    alert(head);
                }
            });
        }
    });    

    $('.add_item_btn').live("click", function() {
        var count = 0;
        var innerHtml;
        var product_id_Var = $('.this-is-search').closest('.portlet').find('.product_group:last-child').index();
        if (product_id_Var < 0){ product_id_Var=0; }else{product_id_Var--}
        var look_id_Var = $('.this-is-search').closest('.portlet').attr("id").replace('look_','');
  
        for (var i = 0; i < selectedProducts.length; i++) {
            if (selectedProducts[i].selected == 1){              
                innerHtml += '<div class="tile image final_product"><div class="corner"></div>' + 
                '<div class="check"></div><div class="tile-body"><img src="'+ selectedProducts[i].image +
                '" alt=""></div><div class="tile-object"><div class="name"><a href="'+ selectedProducts[i].retailers.buyURL +
                '" target="_blank">'+ selectedProducts[i].title +'</a></div></div></div>';
                count++;

                if("undefined" == typeof (JSON_outbound.look[look_id_Var])) {
                    JSON_outbound.look[look_id_Var] = {};
                }                 
                if("undefined" == typeof (JSON_outbound.look[look_id_Var].product_group)) {
                    JSON_outbound.look[look_id_Var].product_group = [];
                }                
                if("undefined" == typeof (JSON_outbound.look[look_id_Var].product_group[product_id_Var])) {
                    JSON_outbound.look[look_id_Var].product_group[product_id_Var] = [];
                }    
                JSON_outbound.look[look_id_Var].product_group[product_id_Var].push(selectedProducts[i]);
            }
        }

        if (count == 0){
            $('#show_modal').click();
            $('.modal-body > p').text('Select at list 1 product for your search.');
        }else{
            $('.this-is-search').closest('.portlet').find('.product').val("");
            $('.this-is-search').closest('.portlet').find('.looks_details_panel').html("");
            $('.this-is-search').closest('.portlet').find('.product_block').hide();
            $('.this-is-search').closest('.portlet').find('.portlet-body').append('<div class="alert alert-block alert-success fade in product_group"><button type="button" class="close" data-dismiss="alert"></button>'+ innerHtml.slice(9) +'</div>');
       
            $('.find-item-but').removeClass('this-is-search');
            $('.looks_details_panel_form').html("");
            $('#skimlinks_results_modal h3').text('Search results for: ');
            $('.form-actions').show();
        }
    });

    $("#close_skimlinks_results").live("click", function() {
       $(".looks_details_panel_form").html('');
       $('#skimlinks_results_modal h3').text('Search results for: ');
    });

    $(".name a").live("click", function(e) {
       e.stopPropagation();
    });

    $('.tile').live("click", function() {
        if ($(this).hasClass('final_product')){
            var product_id_Var = $(this).index();product_id_Var--;

            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');
            $(this).closest('.product_group').css('background','#dff0d8');

            //update "selected" to 2, so this product will be the primary selection for the group
            var product_group_Var = $(this).closest('.product_group').index();product_group_Var = product_group_Var-2;       
            var look_id_Var = $(this).closest('.portlet').attr("id").replace('look_','');

            for (var i = 0; i < JSON_outbound.look[look_id_Var].product_group[product_group_Var].length; i++) {
                if (i == product_id_Var){
                    JSON_outbound.look[look_id_Var].product_group[product_group_Var][i].selected = 2;
                }else{
                    JSON_outbound.look[look_id_Var].product_group[product_group_Var][i].selected = 1;
                }
            }
            return false;
        }else{
            var product_id_Var = $(this).index();

            if ($(this).hasClass('selected')){
                $(this).removeClass('selected');
                selectedProducts[product_id_Var].selected = 0;
            }else{
                $(this).addClass('selected');
                selectedProducts[product_id_Var].selected = 1;
            }
        }       
    });

    //remove a selected product
    $('.final_product').live("dblclick", function() {
        $( "#dialog_confirm" ).dialog( "open" );
        $('.ui-dialog button').blur();// avoid button autofocus
        $(this).attr('id','remove_element');
    });
        $("#dialog_confirm" ).dialog({
          dialogClass: 'ui-dialog-green',
          autoOpen: false,
          resizable: false,
          height: 210,
          modal: true,
          buttons: [
            {
                'class' : 'btn red',    
                "text" : "Delete",
                click: function() {
                    //remove PRODUCT from JSON
                    var product_id_Var = $('#remove_element').index();product_id_Var--;
                    var product_group_Var = $('#remove_element').closest('.product_group').index();product_group_Var = product_group_Var-2;       
                    var look_id_Var = $('#remove_element').closest('.portlet').attr("id").replace('look_','');          
                    JSON_outbound.look[look_id_Var].product_group[product_group_Var].splice(product_id_Var,1);

                    $('#remove_element').hide();
                    var node = $('#remove_element').closest('.portlet');

                    // remove product_group if no children
                    if ($('#remove_element').closest('.product_group').children('.tile').length == 1){
                        $('#remove_element').closest('.product_group').remove();
                        JSON_outbound.look[look_id_Var].product_group.splice(product_group_Var,1);
                    }
                    // remove look if no children
                    if (node.find('.final_product').length == 0){
                        if (node.attr('id') != "look_0"){
                            node.remove();
                            JSON_outbound.look.splice(look_id_Var,1);
                        }
                    }
                    $('#remove_element').remove(); 

                    $(this).dialog( "close" );
                }
            },
            {
                'class' : 'btn',
                "text" : "Cancel",
                click: function() {
                    $(this).dialog( "close" );
                    $('#remove_element').attr('id',''); 
                }
            }
          ]
        });
    $('#save_new_item').live("click", function(){          
        if ($('#new_product_title').val() == '' || $('#new_product_description').val() == '' || $('#new_retailer_name').val() == '' || $('#new_retailer_url').val() == '' || $('#new_price').val() == '' || $('#form_manual_product_entry').find('.fileupload').hasClass('fileupload-new')){
            $('#show_modal').click();
            $('.modal-body > p').text('You need to fill in all the fields and pick an image.');

            return false;
        }

        App.blockUI($('#form_manual_product_entry'));

        var innerHtml = '<div class="tile image final_product selected just_added"><div class="corner"></div><div class="check"></div><div class="tile-body"><img src="' + $('#form_manual_product_entry').find('.fileupload-preview img').attr('src') + '" alt=""></div><div class="tile-object"><div class="name"><a href="'+ $("#new_retailer_url").val() +'" target="_blank">'+ $("#new_product_title").val() +'</a></div></div></div>';
        $('.addFromLinkClicked > .portlet-body').append('<div class="alert alert-block alert-success fade in product_group"><button type="button" class="close" data-dismiss="alert"></button>'+ innerHtml +'</div>');

        var product_id_Var = $('.just_added').index();product_id_Var--;
        var product_group_Var = $('.just_added').closest('.product_group').index();product_group_Var = product_group_Var-2;
        var look_id_Var = $('.just_added').closest('.portlet').attr("id").replace('look_',''); 

        if("undefined" == typeof (JSON_outbound.look[look_id_Var])) {
            JSON_outbound.look[look_id_Var] = {};
        }                 
        if("undefined" == typeof (JSON_outbound.look[look_id_Var].product_group)) {
            JSON_outbound.look[look_id_Var].product_group = [];
        }                
        if("undefined" == typeof (JSON_outbound.look[look_id_Var].product_group[product_group_Var])) {
            JSON_outbound.look[look_id_Var].product_group[product_group_Var] = [];
        }      

        var path_artist_name = JSON_outbound.music_video_data.artist.replace(/\ /g, '-').toLowerCase();
        var path_video_name = JSON_outbound.music_video_data.video_title.replace(/\ /g, '-').toLowerCase();      

        JSON_outbound.look[look_id_Var].product_group[product_group_Var].push({
            productUPC: '',
            title: $("#new_product_title").val(),
            description: $("#new_product_description").val(),
            image: 'http://inspiredapp.tv/img/music/artists/' + path_artist_name + '/' + path_video_name + '/' + encodeURIComponent($("#new_product_title").val()) + '.png' ,
            retailers: {
                retailerName: $("#new_retailer_name").val(),
                retailerLogo: 'BUILD_RETAILER_LOGO_URL',
                price: parseInt($("#new_price").val()),
                buyURL: 'http://go.redirectingat.com?id=35687X941090&xs=1&url=' + encodeURIComponent($("#new_retailer_url").val())
            },
            selected: 2
        });

        window.setTimeout(function () {
            $('#new_image').attr('src','');
            $('.final_product').removeClass('just_added');
            $('#close_new_item').click();
            $('#form_manual_product_entry').find('.fileupload-exists').click();
            $('#form_manual_product_entry').find('.fileupload-new img').attr('src','http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=add+image');
            App.unblockUI($('#form_manual_product_entry'));
        }, 3000);     

        fileUpload(document.forms.add_new_product_form,'http://dashboard.inspiredapp.tv/assets/php/add_new_item.php?product_name=' + $('#new_product_title').val() + '&artist_name=' + path_artist_name + '&video_name=' + path_video_name ,'add_new_item_upload_iframe'); return false;
    });

    $('#close_new_item').live("click", function(){
        $('#new_product_title, #new_product_description, #new_retailer_name, #new_retailer_url, #new_price').val('');
        $(".portlet").removeClass('addFromLinkClicked');
        $('#new_image').attr('src','');
    });

    $('.close').live("click", function(){
        var product_group_Var = $(this).closest('.product_group').index();
            product_group_Var = product_group_Var-2;       
        var look_id_Var = $(this).closest('.portlet').attr("id").replace('look_','');               
        JSON_outbound.look[look_id_Var].product_group.splice(product_group_Var,1);

        $(this).closest('.product_group').remove();
    });

    $('.remove').live("click", function(){
        var product_group_Var = $(this).closest('.product_group').index();product_group_Var = product_group_Var-2;       
        var look_id_Var = $(this).closest('.portlet').attr("id").replace('look_','');               
        JSON_outbound.look.splice(look_id_Var,1);

        $(this).closest('.portlet').remove();
    });  

    $('.add-look').live("click", function() {
        look_id++;
        $('.looks').append('<div class="portlet box green" id="look_'+ look_id +'"><div class="portlet-title"><div class="caption"><input type="text" class="span11 m-wrap look-description" data-trigger="hover" data-original-title="Input a Brief Description" placeholder="Look Description"></div><div class="tools"><a href="javascript:;" class="collapse"></a><a href="javascript:;" class="remove hidden-phone"></a></div></div><div class="portlet-body"><div class="control-group"><div class="controls find_item_form"><input type="text" class="span6 m-wrap product" name="product_0"><a class="btn icn-only find-item-but" href="#skimlinks_results_modal" data-toggle="modal"><i class="icon-search m-icon"></i> Search Item </a><a class="btn icn-only add_product black" href="#form_manual_product_entry" data-toggle="modal" onClick="addFromLinkClicked(this)"><i class="icon-link m-icon"></i> Add From Link </a></div></div><div class="alert alert-block alert-success fade in product_block"><button type="button" class="close" data-dismiss="alert"></button><div class="looks_details_panel"></div></div></div>');
    }); 


//-------------------------     TAB 3 FUNCTIONS     -------------------------//
    $('#seo-tags').tagsInput({
        width: 'auto'
    });
    $('#seo-description').text('default')
}); 

//src: http://salman-w.blogspot.com/2010/01/retrieve-youtube-video-title.html
//src: https://developers.google.com/youtube/2.0/developers_guide_protocol_video_entries?csw=1
function youtubeDataCallback(data) {
    App.unblockUI($('#youtube-but').closest(".span12"));  
    $('#video_details_panel').fadeIn(400);
    $('.form-actions').show();

    $('.video_title input').val(data.entry.title.$t);          

    if (data.entry.title.$t.indexOf(" - ") >= 0){
        var info = data.entry.title.$t.split(' - ');  
        var artist_name = info[0].replace(' feat.',',').replace(' feat',',').replace(' ft.',',');
        var artist = StackMob.Model.extend({ schemaName: 'Artist' });
        var artists = StackMob.Collection.extend({ model: artist }); 
        var items = new artists();
        var q = new StackMob.Collection.Query();
        q.mustBeOneOf('artist_name', artist_name);
        items.query(q, {
          success: function(results) {
            var resultsAsJSON = results.toJSON();
            for(var i = 0; i < resultsAsJSON.length; i++) {
                //ADDS THE VIDEO ARTIST NAME TO THE ARTIST ON LANDING.HTML
                $("#artist").select2("data", [{text: artist_name}]);
            }
          }
        });
        $('.video_title input').val(info[1].replace("(Explicit)",""));
    }else if (data.entry.title.$t.indexOf(": ") >= 0){
        var info = data.entry.title.$t.split(': ');
        var artist_name = info[0].replace(' feat.',',').replace(' feat',',').replace(' ft.',',');
        var artist = StackMob.Model.extend({ schemaName: 'Artist' });
        var artists = StackMob.Collection.extend({ model: artist }); 
        var items = new artists();
        var q = new StackMob.Collection.Query();
        q.mustBeOneOf('artist_name', artist_name);
        items.query(q, {
          success: function(results) {
            var resultsAsJSON = results.toJSON();
            for(var i = 0; i < resultsAsJSON.length; i++) {
                //ADDS THE VIDEO ARTIST NAME TO THE ARTIST ON LANDING.HTML
                $("#artist").select2("data", [{text: artist_name}]);
            }
          }
        });
        $('.video_title input').val(info[1].replace("(Explicit)",""));                 
    }

    $('.full_video_title').html(data.entry.title.$t);
    $('.video_cover_image').attr('src', data.entry.media$group.media$thumbnail[0].url);
    $('.watch_on_youtube').html('<a href="' + data.entry.media$group.media$player.url + '" target="_blank">' + data.entry.media$group.media$player.url + '</a>');
}

function addFromLinkClicked(el) {
    $(".portlet").removeClass('addFromLinkClicked');
    $(el).closest(".portlet").addClass('addFromLinkClicked');
}