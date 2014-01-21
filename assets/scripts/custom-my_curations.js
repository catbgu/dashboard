var id, music_video_url;
jQuery(document).ready(function() { 
  if (StackMob.getLoggedInUser() == null)
    {
      window.location.href = 'login.html';
    }
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

  var i = 0, temp_looks = []; 
  //JSON_video = jQuery.parseJSON('{"look":[{"product_group":[[{"productUPC":"","title":"Nike: Nike Bags","description":"Nike: Nike Bags: Nike: Nike Shoes:  Women\'s Shoes: Nike: Nike Shoes:  Men\'s Shoes: Nike: Nike Shoes: Nike Kids: Nike Kids\' Socks: Nike Kids: Nike Kids\' Rollers &amp; Coolers: Nike Kids: Nike Kids\' Shoes: Nike Kids: Nike Kids\' Clothing: Nike Kids: Nike: Nike Clothing:  Men\'s Clothing: Nike: Nike Clothing:  Women\'s Clothing: Nike: Nike Clothing: Just do it. Nike   offers a vast array of products for an active sports lifestyle. Because every athlete wants to be better, Nike is able to outfit an athlete from the top down with high performance shoes, clothing, socks, bags, watches and eyewear. Since today   s sports are about creating great athletes and transforming them into great players, Nike is there every step of the way to enhance each training experience, making each workout count. Top quality and performance are key to unlocking your inner potential. With a pair of Nike Shox beneath your feet and a Nike Dri-Fit    ensemble to help deflect sweat and discomfort, your goals will be within reach. No matter what your goals are, Nike knows that training and running are a way of life. Keep up with your active lifestyle and prepare for the game with the NikeFit apparel system. If swimming is more your game, Nike Swimwear has got you covered. From training to team swimwear, Nike remains at the forefront of new and innovative technologies. Nike Swim is constantly striving to develop new fabrics for more comfortable and effective swimwear. Since harsh, chlorinated water is hard on swimsuits, Nike has created an answer with Nike NX fabric. This chlorine-resistant, colorfast nylon fabric can withstand long hours of training and competition while retaining its shape throughout the life of the garment. Excellent shape retention and soft, lightweight comfort can be found with Nike Swimwear that utilizes Nike EVR-X poly fabric. This unique fabric blends in the revolutionary chlorine-proof Dow XLA    fiber with a comfortable stretch for maximum performance and comfort. Nike continues to seek new and innovative ways to develop superior athletic products, and creative methods to communicate directly with Nike consumers. Nike Free, Nike+ and Nike Sphere are just three examples of this approach. Nike has always been at the front of technical integration, whether it is from Bill Bowerman   s wife   s waffle iron outsole, the revolutionary Nike Pegasus, to Nike Air technology; Nike is always pushing the envelope on creativity. When it comes to creativity and functionality, Nike   s motto is    Just do it.","image":"e67c3a4b0cdfddedfd1dd0375add38f4_original","retailers":{"retailerName":"Zappos","retailerLogo":"BUILD_RETAILER_LOGO_URL","price":0,"buyURL":"http://www.zappos.com/nike"},"selected":1},{"productUPC":"","title":"Nike: Nike Bags: Duffel","description":"Nike: Nike Bags: Duffel: Nike: Nike Bags: Nike: Nike Shoes:  Women\'s Shoes: Nike: Nike Shoes:  Men\'s Shoes: Nike: Nike Shoes: Nike Kids: Nike Kids\' Socks: Nike Kids: Nike Kids\' Rollers &amp; Coolers: Nike Kids: Nike Kids\' Shoes: Nike Kids: Nike Kids\' Clothing: Nike Kids: Nike: Nike Clothing:  Men\'s Clothing: Nike: Nike Clothing:  Women\'s Clothing: Nike: Nike Clothing: Just do it. Nike   offers a vast array of products for an active sports lifestyle. Because every athlete wants to be better, Nike is able to outfit an athlete from the top down with high performance shoes, clothing, socks, bags, watches and eyewear. Since today   s sports are about creating great athletes and transforming them into great players, Nike is there every step of the way to enhance each training experience, making each workout count. Top quality and performance are key to unlocking your inner potential. With a pair of Nike Shox beneath your feet and a Nike Dri-Fit    ensemble to help deflect sweat and discomfort, your goals will be within reach. No matter what your goals are, Nike knows that training and running are a way of life. Keep up with your active lifestyle and prepare for the game with the NikeFit apparel system. If swimming is more your game, Nike Swimwear has got you covered. From training to team swimwear, Nike remains at the forefront of new and innovative technologies. Nike Swim is constantly striving to develop new fabrics for more comfortable and effective swimwear. Since harsh, chlorinated water is hard on swimsuits, Nike has created an answer with Nike NX fabric. This chlorine-resistant, colorfast nylon fabric can withstand long hours of training and competition while retaining its shape throughout the life of the garment. Excellent shape retention and soft, lightweight comfort can be found with Nike Swimwear that utilizes Nike EVR-X poly fabric. This unique fabric blends in the revolutionary chlorine-proof Dow XLA    fiber with a comfortable stretch for maximum performance and comfort. Nike continues to seek new and innovative ways to develop superior athletic products, and creative methods to communicate directly with Nike consumers. Nike Free, Nike+ and Nike Sphere are just three examples of this approach. Nike has always been at the front of technical integration, whether it is from Bill Bowerman   s wife   s waffle iron outsole, the revolutionary Nike Pegasus, to Nike Air technology; Nike is always pushing the envelope on creativity. When it comes to creativity and functionality, Nike   s motto is    Just do it.","image":"e67c3a4b0cdfddedfd1dd0375add38f4_original","retailers":{"retailerName":"Zappos","retailerLogo":"BUILD_RETAILER_LOGO_URL","price":0,"buyURL":"http://www.zappos.com/search/null/filter/departmentId/722686335/sort/productPopularity/asc"},"selected":2}],[{"productUPC":"","title":"Cotton Polo","description":"A classic polo style is rendered in fine, lightweight cotton with signature logo detail for a relaxed yet refined fit.;Three-button placket;Cotton;Machine wash;Imported;","image":"5be96bd1440c701a55d5a27689fd4b0d_original","retailers":{"retailerName":"Saks Fifth Avenue","retailerLogo":"BUILD_RETAILER_LOGO_URL","price":10500,"buyURL":"http://www.saksfifthavenue.com/main/ProductDetail.jsp?FOLDER%3C%3Efolder_id=2534374306421093&PRODUCT%3C%3Eprd_id=845524446568110"},"selected":2}]],"lookDescription":"look 1"},{"product_group":[[{"productUPC":"","title":"adidas","description":"For over 80 years adidas has been part of the world of sports and fashion, delivering state-of-the-art athletic footwear. The main goal is to design shoes that work with the foot, not against it, to help you reach your highest level of performance and comfort. adidas has, for generations, created innovative products that elevate the performance of athletes. adidas footwear, apparel and accessories, and those who use them have excelled at every sport, everywhere, at the highest levels. All-stars, amateurs, professionals and beginners - where they are, adidas is, because their passion is adidas\' passion. Here you will find the best selection of adidas shoes for adventure, baseball, basketball, football, golf, outdoor, rugby, running, soccer, softball, tennis, training, volleyball, and walking. Using adidas    developed technologies such as adiPRENE  , TRAXION  , and adiWEAR  , adidas performance footwear helps you reach your maximum athletic potential. Just as adidas footwear has a wide array of categories and selection, the adidas performance clothing, including adidas socks, is just as vast. Exclusive adidas technologies, for example, ClimaCool   ClimaLite   and ForMotion   are just a few ways adidas performance apparel and adidas socks help set themselves apart from the rest. adidas kids shoes and adidas kids clothes are available to provide these same technologies and performance in adidas footwear and apparel for the younger athlete. Racquet bags, bat bags, tournament ball bags and more by adidas bags provide the same quality and performance you have come to expect from adidas. Whether it is for performance or lifestyle, Adidas bags has a great assortment of backpacks, duffel bags and totes to choose from. adidas watches in analog, chronological and digital form feature attributes such as water resistance, lap counters, and alarms. With retro, fashion and performance watches, adidas watches are all you\'ll need to keep track of your performance and time tracking needs. From adidas socks to adidas shoes, adidas clothes to adidas bags and adidas watches, it\'s all here!","image":"576c44eb2625efcaee8e6e7893ee6fa0_original","retailers":{"retailerName":"Zappos","retailerLogo":"BUILD_RETAILER_LOGO_URL","price":0,"buyURL":"http://www.zappos.com/adidas"},"selected":1},{"productUPC":"","title":"adidas: adidas Accessories: adidas Socks","description":"adidas: adidas Accessories: adidas Socks: adidas: adidas Accessories: adidas: adidas Performance: adidas Performance Shoes: adidas: adidas Performance: adidas Performance Clothing: adidas: adidas Performance: adidas: adidas Kids\': adidas Kids\' Clothing: adidas: adidas Kids\': adidas Kids\' Shoes: adidas: adidas Kids\': adidas: adidas Originals: adidas Originals Shoes: adidas: adidas Originals: adidas Originals Clothing: adidas: adidas Originals: adidas: adidas Bags: Bags: adidas Performance Bags: adidas: adidas Bags: Bags: For over 80 years adidas has been part of the world of sports and fashion, delivering state-of-the-art athletic footwear. The main goal is to design shoes that work with the foot, not against it, to help you reach your highest level of performance and comfort. adidas has, for generations, created innovative products that elevate the performance of athletes. adidas footwear, apparel and accessories, and those who use them have excelled at every sport, everywhere, at the highest levels. All-stars, amateurs, professionals and beginners - where they are, adidas is, because their passion is adidas\' passion. Here you will find the best selection of adidas shoes for adventure, baseball, basketball, football, golf, outdoor, rugby, running, soccer, softball, tennis, training, volleyball, and walking. Using adidas    developed technologies such as adiPRENE  , TRAXION  , and adiWEAR  , adidas performance footwear helps you reach your maximum athletic potential. Just as adidas footwear has a wide array of categories and selection, the adidas performance clothing, including adidas socks, is just as vast. Exclusive adidas technologies, for example, ClimaCool   ClimaLite   and ForMotion   are just a few ways adidas performance apparel and adidas socks help set themselves apart from the rest. adidas kids shoes and adidas kids clothes are available to provide these same technologies and performance in adidas footwear and apparel for the younger athlete. Racquet bags, bat bags, tournament ball bags and more by adidas bags provide the same quality and performance you have come to expect from adidas. Whether it is for performance or lifestyle, Adidas bags has a great assortment of backpacks, duffel bags and totes to choose from. adidas watches in analog, chronological and digital form feature attributes such as water resistance, lap counters, and alarms. With retro, fashion and performance watches, adidas watches are all you\'ll need to keep track of your performance and time tracking needs. From adidas socks to adidas shoes, adidas clothes to adidas bags and adidas watches, it\'s all here!","image":"576c44eb2625efcaee8e6e7893ee6fa0_original","retailers":{"retailerName":"Zappos","retailerLogo":"BUILD_RETAILER_LOGO_URL","price":0,"buyURL":"http://www.zappos.com/search/null/filter/departmentId/722672305/sort/productPopularity/asc"},"selected":2},{"productUPC":"","title":"adidas: adidas Performance","description":"adidas: adidas Performance: adidas: adidas Kids\': adidas Kids\' Clothing: adidas: adidas Kids\': adidas Kids\' Shoes: adidas: adidas Kids\': adidas: adidas Originals: adidas Originals Shoes: adidas: adidas Originals: adidas Originals Clothing: adidas: adidas Originals: adidas: adidas Bags: Bags: adidas Performance Bags: adidas: adidas Bags: Bags: For over 80 years adidas has been part of the world of sports and fashion, delivering state-of-the-art athletic footwear. The main goal is to design shoes that work with the foot, not against it, to help you reach your highest level of performance and comfort. adidas has, for generations, created innovative products that elevate the performance of athletes. adidas footwear, apparel and accessories, and those who use them have excelled at every sport, everywhere, at the highest levels. All-stars, amateurs, professionals and beginners - where they are, adidas is, because their passion is adidas\' passion. Here you will find the best selection of adidas shoes for adventure, baseball, basketball, football, golf, outdoor, rugby, running, soccer, softball, tennis, training, volleyball, and walking. Using adidas    developed technologies such as adiPRENE  , TRAXION  , and adiWEAR  , adidas performance footwear helps you reach your maximum athletic potential. Just as adidas footwear has a wide array of categories and selection, the adidas performance clothing, including adidas socks, is just as vast. Exclusive adidas technologies, for example, ClimaCool   ClimaLite   and ForMotion   are just a few ways adidas performance apparel and adidas socks help set themselves apart from the rest. adidas kids shoes and adidas kids clothes are available to provide these same technologies and performance in adidas footwear and apparel for the younger athlete. Racquet bags, bat bags, tournament ball bags and more by adidas bags provide the same quality and performance you have come to expect from adidas. Whether it is for performance or lifestyle, Adidas bags has a great assortment of backpacks, duffel bags and totes to choose from. adidas watches in analog, chronological and digital form feature attributes such as water resistance, lap counters, and alarms. With retro, fashion and performance watches, adidas watches are all you\'ll need to keep track of your performance and time tracking needs. From adidas socks to adidas shoes, adidas clothes to adidas bags and adidas watches, it\'s all here!","image":"576c44eb2625efcaee8e6e7893ee6fa0_original","retailers":{"retailerName":"Zappos","retailerLogo":"BUILD_RETAILER_LOGO_URL","price":0,"buyURL":"http://www.zappos.com/adidas"},"selected":1}]],"lookDescription":"look 2"}],"music_video_data":{"artist":" Rihanna,Austin Mahone","video_title": "test","video_URL":"http://www.youtube.com/watch?v=ehcVomMexkY","video_cover_image":"http://i1.ytimg.com/vi/ehcVomMexkY/default.jpg"}}');
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

  items_look_data.query(qlook_data, {
    success: function(results) {
      var resultsAsJSON1 = results.toJSON();
      var username = resultsAsJSON1[i].sm_owner;
      var curators = username.substring(username.indexOf('/') +1);

      qvideo_data.equals('created_by', StackMob.getLoggedInUser()).equals('deleted', false);
      items_video_data.query(qvideo_data, {
        async: false,
        success: function(results) {
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
                  "<img src='http://www.eraytonyali.com/invidio/static/img/music/artists/" + resultsAsJSON2[i].artists.toString().replace(/\ /g, '-').toLowerCase() + "/" + encodeURIComponent(resultsAsJSON2[i].video_title) +".png' alt=''>"+
                "</div>"+
                "<div class='tile-object'>"+
                  "<div class='name'>"+
                    "<a href='http://www.youtube.com' target='_blank'>"+ resultsAsJSON2[i].artists.toString() + " - " + resultsAsJSON2[i].video_title +"</a>"+
                  "</div>"+
                "</div>"+
              "</div>");
            JSON_video.music_video_data = {
              artist: resultsAsJSON2[i].artists.toString(),
              created_by: resultsAsJSON2[i].created_by,
              video_title: resultsAsJSON2[i].video_title,
              video_URL: "http://www.youtube.com/watch?v=" + resultsAsJSON2[i].music_video_id,
              video_cover_image: 'http://www.eraytonyali.com/invidio/static/img/music/artists/' + resultsAsJSON2[i].artists.toString().replace(/\ /g, '-').toLowerCase() + '/' + encodeURIComponent(resultsAsJSON2[i].video_title) + '.png',
              SEO_keywords: resultsAsJSON2[i].SEO_keywords.toString(),
              SEO_description: resultsAsJSON2[i].SEO_description
            };


            qlook_data.equals('video_url', resultsAsJSON2[i].music_video_id);
            items_look_data.query(qlook_data, {
              async: false,
              success: function(results) {
                var resultsAsJSON3 = results.toJSON();
                for (var n = 0; n < resultsAsJSON3.length; n++) {
                  temp_looks.push({
                    lookDescription: resultsAsJSON3[n].look_title,
                    product_group: [[{
                      productUPC: "",
                      title: resultsAsJSON3[n].product_title.toString(),
                      description: resultsAsJSON3[n].product_description.toString(),
                      image: resultsAsJSON3[n].product_image.toString(),
                      retailers: [{
                        retailerName: resultsAsJSON3[n].retailer_name.toString(),
                        retailerLogo: resultsAsJSON3[n].retailer_logo.toString(),
                        price: resultsAsJSON3[n].retailer_price.toString(),
                        buyURL: resultsAsJSON3[n].buy_url.toString()
                      }],
                      selected: 2
                    }]],
                  });
                }
              }
            });

            JSON_final.push(JSON_video);
            JSON_video.look = temp_looks;
            JSON_video = {};
            JSON_video.look = [];
            JSON_video.music_video_data = {};
            temp_looks = [];
          }
        }
      });
    } 
  });

  $('.my_curation_edit').live("click", function() {
    id = $(this).closest(".tile").attr("id").slice(5);
    // console.debug($(this).closest(".tile").attr("id").slice(5));
    //store JSON data into localStorage
    var test = JSON.stringify(JSON_final[id]);
    console.debug(JSON_final[id]);
    localStorage.setItem('jsonObject', test);
    window.open("landing.html","_self");
  });    

  $('.my_curation_delete').live("click", function() {
      $( "#dialog_confirm" ).dialog( "open" );
      $('.ui-dialog button').blur();
      // avoid button autofocus
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
                  music_video_url = JSON_final[id].music_video_data.music_video_id;
                  music_video_url = music_video_url.substring(music_video_url.indexOf('=') +1);
                  qvideo_data.equals('video_url', music_video_url);
                  items_video_data.query(qvideo_data, {
                    success: function(results) {
                      var resultsAsJSON = results.toJSON();

                      var music_id = resultsAsJSON[0].music_video_id;
                      console.debug(music_id);

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
                  });;

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