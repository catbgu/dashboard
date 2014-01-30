var id, music_video_url;
jQuery(document).ready(function() { 
  if (StackMob.getLoggedInUser() == null) {
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

  var i = 0, temp_looks = [], temp_looks2 = []; 
  JSON_final = [];
  JSON_video = {};
  JSON_video.look = [];
  JSON_video.music_video_data = {};

  //LOOK STACKMOB ACCESS
  var look_data = StackMob.Model.extend({ schemaName: 'Look' });
  var mylook_data = StackMob.Collection.extend({ model: look_data }); 
  var items_look_data = new mylook_data();
  var qlook_data = new StackMob.Collection.Query();
  //MUSIC_VIDEO STACKMOB ACCESS
  var video_data = StackMob.Model.extend({ schemaName: 'Music_Video' });
  var myvideo_data = StackMob.Collection.extend({ model: video_data }); 
  var items_video_data = new myvideo_data();
  var qvideo_data = new StackMob.Collection.Query();

  qvideo_data.equals('created_by', StackMob.getLoggedInUser()).equals('deleted', false);
  items_video_data.query(qvideo_data, {
    async: false,
    success: function(results) {
      window.setTimeout(function () {
          App.unblockUI($('.portlet-body'));
      }, 100);        
         
      var resultsAsJSON2 = results.toJSON();

      if (resultsAsJSON2.length == 0){
        $(".my_curations").append("You don't have any curated videos yet.");

        return false;
      }
      var curator_artist = resultsAsJSON2[0].artists.toString().replace(/\ /g, '-').toLowerCase();
      for (i = 0; i < resultsAsJSON2.length; i++) {
        $(".my_curations").append(""+
            "<div class='tile image curation' id='card_"+ i +"'>"+
              "<div class='tile-body'>"+
                "<div class='my_curation_edit'></div>"+
                "<div class='my_curation_delete'></div>"+
                "<img src='http://inspiredapp.tv/img/music/artists/" + resultsAsJSON2[i].artists.toString().replace(/\ /g, '-').toLowerCase() + "/" + encodeURIComponent(resultsAsJSON2[i].video_title) +".png' alt=''>"+
              "</div>"+
              "<div class='tile-object'>"+
                "<div class='name'>"+
                  "<a href='http://www.youtube.com/watch?v=" + resultsAsJSON2[i].music_video_id +"' target='_blank'>"+ resultsAsJSON2[i].artists.toString() + " - " + resultsAsJSON2[i].video_title +"</a>"+
                "</div>"+
              "</div>"+
            "</div>");
        JSON_video.music_video_data = {
          artist: resultsAsJSON2[i].artists.toString(),
          created_by: resultsAsJSON2[i].created_by,
          video_title: resultsAsJSON2[i].video_title,
          video_URL: "http://www.youtube.com/watch?v=" + resultsAsJSON2[i].music_video_id,
          video_cover_image: 'http://inspiredapp.tv/img/music/artists/' + resultsAsJSON2[i].artists.toString().replace(/\ /g, '-').toLowerCase() + '/' + encodeURIComponent(resultsAsJSON2[i].video_title) + '.png',
          SEO_keywords: resultsAsJSON2[i].SEO_keywords.toString(),
          SEO_description: resultsAsJSON2[i].SEO_description
        };

        qlook_data.equals('video_url', resultsAsJSON2[i].music_video_id);
        items_look_data.query(qlook_data, {
          async: false,
          success: function(results) {
            var resultsAsJSON3 = results.toJSON();
            for (var n = 0; n < resultsAsJSON3.length; n++) {
              temp_looks.push({lookDescription: resultsAsJSON3[n].look_title});
              temp_looks[n].product_group = [];
              for (var g = 0; g < resultsAsJSON3[n].product_image.length; g++) {
                temp_looks[n].product_group.push([{
                    productUPC: "",
                    title: resultsAsJSON3[n].product_title[g].toString(),
                    description: resultsAsJSON3[n].product_description[g].toString(),
                    image: resultsAsJSON3[n].product_image[g].toString(),
                    retailers: {
                      retailerName: resultsAsJSON3[n].retailer_name[g].toString(),
                      retailerLogo: resultsAsJSON3[n].retailer_logo[g].toString(),
                      price: resultsAsJSON3[n].retailer_price[g],
                      buyURL: resultsAsJSON3[n].buy_url[g].toString()
                    },
                    selected: 2
                }]);
              }
            }
          }
        });

        JSON_final.push(JSON_video);
        JSON_video.look = temp_looks;
        JSON_video = {};
        JSON_video.look = [];
        JSON_video.music_video_data = {};
        temp_looks = [];
        temp_looks2 = [];
      }
    }
  });

  $('.my_curation_edit').on("click", function() {
    id = $(this).closest(".tile").attr("id").slice(5);
    //store JSON data into localStorage
    var test = JSON.stringify(JSON_final[id]);
    localStorage.setItem('jsonObject', test);
    window.open("landing.html","_self");
  });    

  $('.my_curation_delete').on("click", function() {
      $( "#dialog_confirm" ).dialog( "open" );
      $('.ui-dialog button').blur();
      id = $(this).closest(".tile").attr("id").slice(5);
  });

      $("#dialog_confirm" ).dialog({
        dialogClass: 'ui-dialog-green',
        async: false,
        autoOpen: false,
        resizable: false,
        height: 210,
        modal: true,
        buttons: [
          {
              'class' : 'btn red',    
              "text" : "Delete",
              click: function() {
                  //add your JS code 
                  $('#card_' + id).remove();
                  //remove goes here
                  music_video_url = JSON_final[id].music_video_data.video_URL;
                  music_video_url = music_video_url.substring(music_video_url.indexOf('=') +1);
                  qvideo_data.equals('Music_Video_id', music_video_url);
                  items_video_data.query(qvideo_data, {
                    success: function(results) {
                      var resultsAsJSON = results.toJSON();
                      var music_id = resultsAsJSON[0].music_video_id;
                      var video_data1 = StackMob.Model.extend({ schemaName: 'Music_Video' });
                      var new_video_data = new video_data1({ Music_Video_id: music_id,  });
                      new_video_data.save({ deleted: true }, {
                          success: function(model) {
                              console.debug(model.toJSON());
                          },
                          error: function(model, response) {
                              console.debug(response);
                          }
                      });
                    }
                  });

                  $(this).dialog( "close" );
              }
          },
          {
              'class' : 'btn',
              "text" : "Cancel",
              click: function() {
                  $(this).dialog( "close" );
              }
          }
        ]
      }); 
}); 