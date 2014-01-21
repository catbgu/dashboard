function fileUpload(form, action_url, div_id) {
    // Create the iframe...
    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "upload_iframe");
    iframe.setAttribute("name", "upload_iframe");
    iframe.setAttribute("width", "0");
    iframe.setAttribute("height", "0");
    iframe.setAttribute("border", "0");
    iframe.setAttribute("style", "width: 0; height: 0; border: none;");
 
    // Add to document...
    form.parentNode.appendChild(iframe);
    window.frames['upload_iframe'].name = "upload_iframe";
 
    iframeId = document.getElementById("upload_iframe");
 
    // Add event...
    var eventHandler = function () {
 
            if (iframeId.detachEvent) iframeId.detachEvent("onload", eventHandler);
            else iframeId.removeEventListener("load", eventHandler, false);
 
            // Message from server...
            if (iframeId.contentDocument) {
                content = iframeId.contentDocument.body.innerHTML;
            } else if (iframeId.contentWindow) {
                content = iframeId.contentWindow.document.body.innerHTML;
            } else if (iframeId.document) {
                content = iframeId.document.body.innerHTML;
            }
 
            // document.getElementById(div_id).innerHTML = content;
 
            // Del the iframe...
            setTimeout('iframeId.parentNode.removeChild(iframeId)', 250);
        }
 
    if (iframeId.addEventListener) iframeId.addEventListener("load", eventHandler, true);
    if (iframeId.attachEvent) iframeId.attachEvent("onload", eventHandler);
 
    // Set properties of form...
    form.setAttribute("target", "upload_iframe");
    form.setAttribute("action", action_url);
    form.setAttribute("method", "post");
    form.setAttribute("enctype", "multipart/form-data");
    form.setAttribute("encoding", "multipart/form-data");
 
    // Submit the form...
    form.submit();
 
    // document.getElementById(div_id).innerHTML = "Uploading...";
}


jQuery(document).ready(function() { 
    
    

    //UPLOAD ARTIST IMAGE
    $("#submit-artist").on('click', function() {
        fileUpload(this.form,'artist_cover_image_upload.php?artist_name=' + $("#new_artist_name").val().replace(/\ /g, '-').toLowerCase(),'artist_image_upload_iframe'); return false;
    });

    // $("#save_new_item").on('click', function() {
    //     fileUpload(document.forms.add_new_product_form,'add_new_item.php?product_name=' + $('#new_product_title').val() ,'add_new_item_upload_iframe'); return false;
    // });

    //UPLOAD VIDEO COVER IMAGE
    $(".button-next").on('click', function()  {
        if ( $(".step-title").text() == "Step 2 of 3") {
            if ($("#video_cover_image_changed").hasClass("fileupload-exists")) {
                //upload from script\
                var artist_name = $('.select2-search-choice').text().replace(/\    /g, ',').replace(/\,,/g, '-').replace(/\,/g, '').split('-');
                artist_name = artist_name[0].replace(/\ /g, '-').toLowerCase();
                var artist_video_title = $('#video_title_id').val();
                fileUpload(document.forms.music_video_form,'video_cover_image_upload.php?artist_name=' + artist_name + '&cover_name=' + artist_video_title,'video_image_upload_iframe'); return false;
            } else {
                //upload form youtube api
                var artist_name = $('.select2-search-choice').text().replace(/\    /g, ',').replace(/\,,/g, '-').replace(/\,/g, '').split('-');
                artist_name = artist_name[0].replace(/\ /g, '-').toLowerCase();
                var artist_video_title = $('#video_title_id').val();
                fileUpload(document.forms.music_video_form,'video_cover_image_upload_api.php?artist_name=' + artist_name + '&cover_name=' + artist_video_title + '&img_url=' + $(".video_cover_image").attr("src"),'video_image_upload_iframe'); return false;
            }
        }
        
    });

    $('#form_wizard_1 .button-submit').click(function () {
        var artist_name = $('.select2-search-choice').text().replace(/\    /g, ',').replace(/\,,/g, '-').replace(/\,/g, '').split('-');
        artist_name = artist_name[0].replace(/\ /g, '-').toLowerCase();
        var artist_video_title = $('#video_title_id').val();
        fileUpload(document.forms.music_video_form,'create_video_music_page.php?artist_name=' + artist_name + '&video_title=' + artist_video_title + '&SEO_description=' +
        $("#seo-description").val() + '&SEO_keywords=' + $("#seo-tags").val() ,'create_video_music_page'); return false;

    });

});
