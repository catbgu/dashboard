var last_step = false;
var FormWizard = function () {
    return {
        //main function to initiate the module
        init: function () {
            if (!jQuery().bootstrapWizard) {
                return;
            }

            // default form wizard
            $('#form_wizard_1').bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function (tab, navigation, index) {
                    return false;
                },
                onNext: function (tab, navigation, index) {
                    // validation on TAB 1
                    if (index == 1) {
                        var artist_value = $('#s2id_artist').find('.select2-search-choice');
                        if (artist_value == undefined || artist_value == null || artist_value.length == 0){
                            $('#show_modal').click();
                            $('.modal-body > p').text('You need to add Artist');
                            $('.select2-choices').css('background','#f2dede');

                            window.setTimeout(function () {
                                $('.select2-choices').css('background','#fff');
                            }, 4000); 
                            return false; 
                        }                       
                    }

                    // validation on TAB 2
                    if (index == 2) {
                        var count = 0;
                        var breakout = 0;

                        $('.product_group').each(function(){
                            var selects = 0;
                            if ($(this).find('.final_product').hasClass('selected')){
                                selects++;
                            }
                            if (selects == 0){
                                $(this).css('background','#f2dede');
                                breakout = 1;
                            }
                        }); 

                        if (breakout == 1){
                            $('#show_modal').click();
                            $('.modal-body > p').text('You need to select at list 1 product per group'); 

                            return false;
                        }   

                        $('.looks > .portlet').each(function(){
                            if (!$(this).find('.caption input').val()){
                                $('#show_modal').click();
                                $('.modal-body > p').text('You need to add Look Descriptions');
                                $(this).find('.look-description').css('background','#f2dede');
                                window.setTimeout(function () {
                                    $(this).find('.look-description').css('background','#49c35c');
                                }, 3000);                                   
                                breakout = 1;
                                return false;
                            }
                            if("undefined" == typeof (JSON_outbound.look[count])) {
                                $('#show_modal').click();
                                $('.modal-body > p').text('You need to add some Products to each Look'); 

                                breakout = 1;
                                return false;
                            }else{
                                JSON_outbound.look[count].lookDescription = $(this).find('.caption input').val();
                                count++;
                            }
                        });

                        if (breakout == 1){
                            return false;
                        }                        
                    }

                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var artist_list = '';
                     $('.select2-choices > .select2-search-choice').each(function(){
                        artist_list = artist_list + $(this).text().trim() + ",";

                    });
                    artist_list = artist_list.slice(0,-1); 
                    
                    if (current == 2) {
                        JSON_outbound.music_video_data = {
                            artist: artist_list,
                            video_title: $('.video_title input').val(),
                            video_URL: $('.watch_on_youtube').text().replace("&feature=youtube_gdata_player",""),
                            video_cover_image: $('.video_cover_image').attr('src')
                        };

                        $(".product_group").css('display', 'block');
                    }

                    // set wizard title
                    $('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);
                    // set done steps
                    jQuery('li', $('#form_wizard_1')).removeClass("done");
                    var li_list = navigation.find('li');
                    for (var i = 0; i < index; i++) {
                        jQuery(li_list[i]).addClass("done");
                    }

                    if (current == 1) {
                        $('#form_wizard_1').find('.button-previous').hide();
                    } else {
                        $('#form_wizard_1').find('.button-previous').show();
                    }

                    if (current >= total) {
                        $('#form_wizard_1').find('.button-next').hide();
                        $('#form_wizard_1').find('.button-submit').show();
                    } else {
                        $('#form_wizard_1').find('.button-next').show();
                        $('#form_wizard_1').find('.button-submit').hide();
                    }
                    App.scrollTo($('.page-title'));
                },
                onPrevious: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    // set wizard title
                    $('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);
                    // set done steps
                    jQuery('li', $('#form_wizard_1')).removeClass("done");
                    var li_list = navigation.find('li');
                    for (var i = 0; i < index; i++) {
                        jQuery(li_list[i]).addClass("done");
                    }

                    if (current == 1) {
                        $('#form_wizard_1').find('.button-previous').hide();
                    } else {
                        $('#form_wizard_1').find('.button-previous').show();
                    }

                    if (current >= total) {
                        $('#form_wizard_1').find('.button-next').hide();
                        $('#form_wizard_1').find('.button-submit').show();
                    } else {
                        $('#form_wizard_1').find('.button-next').show();
                        $('#form_wizard_1').find('.button-submit').hide();
                    }

                    App.scrollTo($('.page-title'));
                },
                onTabShow: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var $percent = (current / total) * 100;
                    $('#form_wizard_1').find('.bar').css({
                        width: $percent + '%'
                    });
                }
            });

            $('#form_wizard_1').find('.button-previous').hide();

            $('#form_wizard_1 .button-submit').click(function () {
                //verify SEO fields
                if ($('#seo-description').val() == ''){
                    $('#show_modal').click();
                    $('.modal-body > p').text('You need to fill in the Page Description field'); 

                    return false;
                }else if ($('#seo-tags').val() ==''){
                    $('#show_modal').click();
                    $('.modal-body > p').text('You need to fill in the Page Keywords field'); 

                    return false;                    
                }

                var look = StackMob.Model.extend({ schemaName: 'Look' });
                var looks = StackMob.Collection.extend({ model: look }); 
                var lookitems = new looks();
                var itemset = new StackMob.Collection.Query();
                var video_url = /[^=]*$/.exec(JSON_outbound.music_video_data.video_URL)[0];
                itemset.equals('video_url', video_url);
                lookitems.query(itemset, {
                    success: function(results) {
                        var resultsAsJSON = results.toJSON();
                        for (s = 0; s < resultsAsJSON.length; s++) {
                            var destroylooks = new look({"Look_id": resultsAsJSON[s].look_id});
                            destroylooks.destroy();
                        }
                    }
                });
                var description = '';
                var image = '';
                var productUPC = '';
                var buyURL = '';
                var price = '';
                var retailerLogo = '';
                var retailerName = '';
                var mylook = {};
                for(var i = 0; i < JSON_outbound.look.length; i++) { 
                    mylook = [];
                    mylook.video_url = [];
                    mylook.product_description = [];
                    mylook.product_image = [];
                    mylook.product_title = [];
                    mylook.buy_url = [];
                    mylook.retailer_price = [];
                    mylook.retailer_logo = [];
                    mylook.retailer_name = [];

                    var selected_products = 0, ready_to_submit = 0;
                    for(var c = 0; c < JSON_outbound.look[i].product_group.length; c++) { 
                        selected_products = 0;
                        for(var d = 0; d < JSON_outbound.look[i].product_group[c].length; d++) {
                            if (JSON_outbound.look[i].product_group[c][d].selected == 2){
                                description     = JSON_outbound.look[i].product_group[c][d].description.replace(/\,/g, '&#44;').toLowerCase();
                                image           = JSON_outbound.look[i].product_group[c][d].image;
                                productUPC      = JSON_outbound.look[i].product_group[c][d].productUPC;
                                title           = JSON_outbound.look[i].product_group[c][d].title;
                                look_title      = JSON_outbound.look[i].lookDescription;
                                buyURL          = JSON_outbound.look[i].product_group[c][d].retailers.buyURL;
                                price           = JSON_outbound.look[i].product_group[c][d].retailers.price;
                                retailerLogo    = JSON_outbound.look[i].product_group[c][d].retailers.retailerLogo;
                                retailerName    = JSON_outbound.look[i].product_group[c][d].retailers.retailerName;

                                mylook.video_url.push(video_url);
                                mylook.product_description.push(description);
                                mylook.product_image.push(image);
                                mylook.product_title.push(title);
                                mylook.buy_url.push(buyURL);
                                mylook.retailer_price.push(price);
                                mylook.retailer_logo.push(retailerLogo);
                                mylook.retailer_name.push(retailerName);

                                selected_products++;
                            }
                        }
                        if (selected_products == 0) {
                            $('#show_modal').click();
                            $('.modal-body > p').text('You need to select at least one product from each group.');
                            return false;
                        } else {
                            ready_to_submit++;
                        }
                    }

                    if (JSON_outbound.look[i].product_group.length == ready_to_submit) {
                        var SEO_keywords = $("#seo-tags").val();
                        var SEO_descriptions = $("#seo-description").val();
                        var video_featured_data = $('.switch input').prop('checked');
                        var music_video = StackMob.Model.extend({ schemaName: 'Music_Video' });
                        var model_artists = StackMob.Collection.extend({ model: music_video });
                        var myMusic_Video_id = new music_video({"Music_Video_id": video_url}); 
                        var items = new model_artists();
                        var id_exist = new StackMob.Collection.Query();

                        var myMusic_Video = new music_video({
                            artists: [JSON_outbound.music_video_data.artist],
                            featured: video_featured_data,
                            created_by: StackMob.getLoggedInUser(),
                            deleted: false,
                            video_title: JSON_outbound.music_video_data.video_title,
                            music_video_id: video_url,
                            SEO_keywords: [SEO_keywords],
                            SEO_description: SEO_descriptions
                        });

                        id_exist.mustBeOneOf('Music_Video_id', video_url);
                        items.query(id_exist, {
                            success: function(results) {
                                var resultsAsJSON = results.toJSON();
                                if(resultsAsJSON.length > 0)
                                {
                                    //update
                                    myMusic_Video_id.save({ 
                                        artists: [JSON_outbound.music_video_data.artist], 
                                        featured: video_featured_data, 
                                        //created_by: StackMob.getLoggedInUser(),  will be changed to edited by
                                        deleted: false, 
                                        video_title: JSON_outbound.music_video_data.video_title, 
                                        SEO_keywords: [SEO_keywords], 
                                        SEO_description: SEO_descriptions 
                                    }, {
                                        success: function(model) {
                                            // console.debug(model.toJSON());
                                        },
                                        error: function(model, response) {
                                            // console.debug(response);
                                        }
                                    });
                                } else {
                                    //create
                                    myMusic_Video.create({
                                        success: function(model) {
                                        },
                                        error: function(model, response) {
                                            // console.debug(response);
                                        }
                                    });
                                }

                            }
                        });


                        var all_looks = new look({
                            video_url: video_url,
                            look_title: look_title,
                            product_description: mylook.product_description,
                            product_image: mylook.product_image,
                            product_title: mylook.product_title,
                            buy_url: mylook.buy_url,
                            retailer_logo: mylook.retailer_logo,
                            retailer_name: mylook.retailer_name,
                            retailer_price: mylook.retailer_price
                        });

                        all_looks.create({
                            async: false,                            
                            success: function(model) {
                                last_step = true;
                                $('#show_modal').click();
                                $('.modal-body > p').text('Video curation saved!');
                                window.setTimeout(function () {
                                    //empty localStorage
                                    localStorage.removeItem('jsonObject');                                     

                                    window.location.href = 'landing.html';                                    
                                }, 1500);                                 
                            },
                            error: function(model, response) {
                                console.debug(response);
                                console.debug(model);
                            }
                        });
                    }  
                }
            }).hide();
        }
    };
}();