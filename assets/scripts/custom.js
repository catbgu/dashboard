var JSON_outbound = {};
JSON_outbound.look = [];
    // -----------------------------
    // JSON_outbound = {
    //     "music_video_data" : {
    //         "artist" : "",
    //         "video_title" : "",
    //         "video_URL" : "",
    //         "video_cover_image" : ""
    //     },
    //     "look" : [{
    //         "lookDescription" : "",
    //         "product_group" : [{
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
    //         }]
    //     }]
    // };
    // ----------------------------- 

jQuery(document).ready(function() {       
    // initiate layout and plugins
    App.init();
    FormWizard.init();
    FormEditable.init();
   
    $('#youtube-but').on("click", function(e) {
        e.preventDefault();

        //add spinner
        var el = $(this).closest(".span12");
        App.blockUI(el);   

        $('.artist a, .video_title a, .full_video_title, .video_cover_image, .watch_on_youtube').html('');
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
            
            // $('.alert-error').css('display','block');
            return;
        }
        $.getScript('http://gdata.youtube.com/feeds/api/videos/' + encodeURIComponent(videoid) + '?v=2&alt=json-in-script&callback=youtubeDataCallback');
    });

    var look_id = 0;   
    var selectedProducts = [];
    $('a.find-item-but').live("click", function(e) {
        e.preventDefault();
        $('.artist a, .video_title a, .full_video_title, .video_cover_image, .watch_on_youtube').html('');
        var productKeyword = $(this).siblings('.product').val();
        $(this).closest('.portlet').find('.looks_details_panel').html("");

        var thisEl = $(this);
        
        if (productKeyword == '') {
            $('#show_modal').click();
            $('.modal-body > p').text('You need to type a keyword');
            return;
        }

        //add spinner
        var el = $(this).closest(".portlet").children(".portlet-body");
        App.blockUI(el);   

        $.ajax({
            url: "http://api-product.skimlinks.com/query?key=69a92b5e49f3482898ac2395a76f2e3c&q="+ encodeURIComponent(productKeyword) +"&country_code=US&rows=300",
            dataType: "text",
            type: "GET",
            success: function(data) {
                var JSON_inbound = $.parseJSON(data);

                selectedProducts = [];
                        // -----------------------------
                        // selectedProducts = [{
                        //      "productID" : "",
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
                                    image: JSON_inbound.skimlinksProductAPI.products[i].imageUrl.replace('http://s3.amazonaws.com/images.api-product.skimlinks.com/image/',''),
                                    retailers: {
                                        retailerName: JSON_inbound.skimlinksProductAPI.products[i].merchant,
                                        retailerLogo: 'BUILD_RETAILER_LOGO_URL',
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
                    $(thisEl).closest('.portlet').find('.looks_details_panel').append('<div class="tile image" id="'+ i +'"><div class="corner"></div><div class="check"></div><div class="tile-body"><img src="http://s3.amazonaws.com/images.api-product.skimlinks.com/image/'+ selectedProducts[i].image +'" alt=""></div><div class="tile-object"><div class="name"><a href="'+ selectedProducts[i].retailers.buyURL +'" target="_blank">'+ selectedProducts[i].title +'</a></div></div></div>');
                }

                window.setTimeout(function () {
                    App.unblockUI(el);
                    $(thisEl).closest('.portlet').find('.product_block').fadeIn(400);
                    $(thisEl).closest('.portlet').find('.button_form_group, .product_block').show();                    
                }, 100);        
            },  
            error: function (request,error) {
                alert('Network error has occurred please try again >>> '+request +error);
            },
            getResponseHeader: function (head) {
                alert(head);
            }
        });
    });

    $(".name a").live("click", function(e) {
       e.stopPropagation();
    });

    $('.tile').live("click", function() {
        // var id = $(this).attr('id');

        if ($(this).hasClass('final_product')){
            var product_id_Var = $(this).index();product_id_Var--;

            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');

            //update "selected" to 2, so this product will be the primary selection for the group
            
            var product_group_Var = $(this).closest('.product_group').index();product_group_Var = product_group_Var-2;       
            var look_id_Var = $(this).closest('.portlet').attr("id").replace('look_','');

            for (var i = 0; i < JSON_outbound.look[look_id_Var].product_group[product_group_Var].length; i++) {
                if (i == product_id_Var){
                    //mark 2
                    JSON_outbound.look[look_id_Var].product_group[product_group_Var][i].selected = 2;
                }else{
                    //mark 1
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

    $('.add_item_btn').live("click", function() {
        var count = 0;
        var innerHtml;
        var product_id_Var = $(this).closest('.portlet').find('.product_group:last-child').index();
        if (product_id_Var < 0){ product_id_Var=0; }else{product_id_Var--}
        var look_id_Var = $(this).closest('.portlet').attr("id").replace('look_','');
        
        $('.form-actions').show();

        for (var i = 0; i < selectedProducts.length; i++) {
            if (selectedProducts[i].selected == 1){
                innerHtml += '<div class="tile image final_product"><div class="corner"></div><div class="check"></div><div class="tile-body"><img src="http://s3.amazonaws.com/images.api-product.skimlinks.com/image/'+ selectedProducts[i].image +'" alt=""></div><div class="tile-object"><div class="name"><a href="'+ selectedProducts[i].retailers.buyURL +'" target="_blank">'+ selectedProducts[i].title +'</a></div></div></div>';
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
        // console.log("-------");console.log(JSON_outbound);console.log("-------");

        if (count == 0){
            $('#show_modal').click();
            $('.modal-body > p').text('Select at list 1 product for your search.');            
        }else{
            $(this).closest('.portlet').find('.product').val("");
            $(this).closest('.portlet').find('.looks_details_panel').html("");
            $(this).closest('.portlet').find('.product_block').hide();
            $(this).closest('.portlet').find('.portlet-body').append('<div class="alert alert-block alert-success fade in product_group"><button type="button" class="close" data-dismiss="alert"></button>'+ innerHtml.slice(9) +'</div>');            
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
    $('.close').live("click", function(){
        var product_group_Var = $(this).closest('.product_group').index();product_group_Var = product_group_Var-2;       
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
        $('.looks').append('<div class="portlet box green" id="look_'+ look_id +'"><div class="portlet-title"><div class="caption"><span class="required">*</span><input type="text" class="span11 m-wrap look-description" data-trigger="hover" data-original-title="Input a Brief Description" placeholder="Look Description"></div><div class="tools"><a href="javascript:;" class="collapse"></a><a href="javascript:;" class="remove hidden-phone"></a></div></div><div class="portlet-body"><div class="control-group"><div class="controls find_item_form"><input type="text" class="span6 m-wrap product" name="product_0"><a class="btn icn-only find-item-but" href="#">Find Item <i class="m-icon-swapright m-icon"></i></a></div></div><div class="alert alert-block alert-success fade in product_block"><button type="button" class="close" data-dismiss="alert"></button><div class="looks_details_panel"></div><p class="button_form_group"><a class="btn green add_item_btn" href="#">Add Item</a><a class="btn black" href="#">Cancel</a></p></div></div>');
    });   
}); 

//src: http://salman-w.blogspot.com/2010/01/retrieve-youtube-video-title.html
//src: https://developers.google.com/youtube/2.0/developers_guide_protocol_video_entries?csw=1
function youtubeDataCallback(data) {
    App.unblockUI($('#youtube-but').closest(".span12"));  
    $('#video_details_panel').fadeIn(400);
    $('.form-actions').show();

    $('.artist a').html(data.entry.title.$t);
    $('.video_title a').html(data.entry.title.$t);          

    if (data.entry.title.$t.indexOf(" - ") >= 0){
        var info = data.entry.title.$t.split(' - ');    
        $('.artist a').html(info[0].replace(' feat.',',').replace(' feat',',').replace(' ft.',','));
        $('.video_title a').html(info[1].replace("(Explicit)",""));  
    }else if (data.entry.title.$t.indexOf(": ") >= 0){
        var info = data.entry.title.$t.split(': ');
        $('.artist a').html(info[0].replace(' feat.',',').replace(' feat',',').replace(' ft.',','));
        $('.video_title a').html(info[1].replace("(Explicit)",""));                 
    }

    $('.full_video_title').html(data.entry.title.$t);
    $('.video_cover_image').html('<img src="' + data.entry.media$group.media$thumbnail[0].url + '" width="' + data.entry.media$group.media$thumbnail[0].width + '" height="' + data.entry.media$group.media$thumbnail[0].height + '" alt="' + data.entry.media$group.media$thumbnail[0].yt$name + '" align="right" style="float: left"/>');
    $('.watch_on_youtube').html('<a href="' + data.entry.media$group.media$player.url + '" target="_blank">' + data.entry.media$group.media$player.url + '</a>');
}