jQuery(document).ready(function() {
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('jsonObject');
    retrievedObject = JSON.parse(retrievedObject);
    //console.debug(retrievedObject);

    if(!jQuery.isEmptyObject(retrievedObject)) {
        $('#video_details_panel').fadeIn(400);

        var artists = retrievedObject.music_video_data.artist;
        var existing_artists = artists.split(',')
        var newval = '[';
        for(var i = 0; i < existing_artists.length; i++) {
            newval += '{"id": '+ i +', "text": \"' + existing_artists[i] + '\"},';
        }
        var slice = newval.slice(0,-1);
        slice += ']';
        var newdata = jQuery.parseJSON(slice);

        $(window).load(function(){
        $("#artist").select2("data", newdata);
        });
        $('.video_title input').val(retrievedObject.music_video_data.video_title);
        $('.video_cover_image').attr('src', retrievedObject.music_video_data.video_cover_image);
        $('.watch_on_youtube').html('<a href="' + retrievedObject.music_video_data.video_URL + '" target="_blank">' + retrievedObject.music_video_data.video_URL + '</a>');
        $("#seo-description").val(retrievedObject.music_video_data.SEO_description);
        $("#seo-tags").val(retrievedObject.music_video_data.SEO_keywords);

        $('.form-actions').show();

        JSON_outbound = retrievedObject;
        var innerHtml;
        for (var i = 0; i < retrievedObject.look.length; i++) {
        	//recreate look
        	if (i > 0){
                $('.looks').append('<div class="portlet box green" id="look_'+ i +'"><div class="portlet-title"><div class="caption"><span class="required">*</span><input type="text" class="span11 m-wrap look-description" data-trigger="hover" data-original-title="Input a Brief Description" placeholder="Look Description"></div><div class="tools"><a href="javascript:;" class="collapse"></a><a href="javascript:;" class="remove hidden-phone"></a></div></div><div class="portlet-body"><div class="control-group"><div class="controls find_item_form"><input type="text" class="span6 m-wrap product" name="product_0"><a class="btn icn-only find-item-but" href="#"><i class="icon-search m-icon"></i> Search Item </a><a class="btn icn-only add_product black" href="#form_manual_product_entry" data-toggle="modal" onClick="addFromLinkClicked(this)"><i class="icon-link m-icon"></i> Add From Link </a></div></div><div class="alert alert-block alert-success fade in product_block"><button type="button" class="close" data-dismiss="alert"></button><div class="looks_details_panel"></div><p class="button_form_group"><a class="btn green add_item_btn" href="#">Add Item</a><a class="btn black" href="#">Cancel</a></p></div></div>');
        	}
            for (var j = 0; j < retrievedObject.look[i].product_group.length; j++) {
        		// recreate product group
        		innerHtml = null;
                for (var k = 0; k < retrievedObject.look[i].product_group[j].length; k++) {
                    //console.debug(retrievedObject.look[i].product_group[j]);
        			//add products
                    if (retrievedObject.look[i].product_group[j][k].selected == 2){
                        innerHtml += '<div class="tile image final_product selected"><div class="corner"></div><div class="check"></div><div class="tile-body"><img src="'+ retrievedObject.look[i].product_group[j][k].image +'" alt=""></div><div class="tile-object"><div class="name"><a href="'+ retrievedObject.look[i].product_group[j][k].retailers.buyURL +'" target="_blank">'+ retrievedObject.look[i].product_group[j][k].title +'</a></div></div></div>';                        
                    }else{
                        innerHtml += '<div class="tile image final_product"><div class="corner"></div><div class="check"></div><div class="tile-body"><img src="'+ retrievedObject.look[i].product_group[j][k].image +'" alt=""></div><div class="tile-object"><div class="name"><a href="'+ retrievedObject.look[i].product_group[j][k].retailers.buyURL +'" target="_blank">'+ retrievedObject.look[i].product_group[j][k].title +'</a></div></div></div>';
                    }    			
        		}
                //console.debug(retrievedObject.look[i].product_group[j][k].selected);
                $("#look_"+ i).closest('.portlet').find('.portlet-body').append('<div class="alert alert-block alert-success fade in product_group"><button type="button" class="close" data-dismiss="alert"></button>'+ innerHtml.slice(4) +'</div>');
        	}
            $("#look_"+ i).find('.caption input').val(retrievedObject.look[i].lookDescription);
        }
    } 
});