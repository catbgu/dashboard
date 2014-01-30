<?php
  $targetName = $_GET['artist_name'];
  $changed_artist = $_GET['changed_artist'];
  
  //SERVER ROOT URL FIX
  $server_root = $_SERVER['DOCUMENT_ROOT'];
  $fix = substr(strrchr($server_root,'/'), 1);
  $url = substr($server_root, 0, - strlen($fix));
  $server_path = $url . "/inspired_landing/www/static/img/music/artists/$targetName/";
  $server_path_main = $url . "/inspired_landing/www/templates/artists/$targetName/";
  $fileTitle = ucwords(strtr($targetName, array ('-' => ' ')));

  if ($changed_artist == null) {
    if (!file_exists($server_path)) {
        mkdir($server_path, 0777, true);
        mkdir($server_path_main, 0777, true);
    }
  } else {
    if ( $targetName != $changed_artist) {
      $change_artist_path_static = $url . '/inspired_landing/www/static/img/music/artists/';
      $change_artist_path_temp = $url . '/inspired_landing/www/templates/artists/';
      rename($change_artist_path_static . $changed_artist, $change_artist_path_static . $targetName);
      rename($change_artist_path_temp . $changed_artist, $change_artist_path_temp . $targetName);
    }
  }


  if (!empty($_FILES)) {
          $tempFile = $_FILES['datafile']['tmp_name'];
          $filename = "cover.png";
          $targetPath = $server_path;
          $targetFile = $server_path . $filename;
          
          // Validate the file type
          $fileTypes = array('jpg','jpeg','gif','png'); // File extensions
          $fileParts = pathinfo($_FILES['datafile']['name']);
          
          if (in_array($fileParts['extension'],$fileTypes)) {
                  move_uploaded_file($tempFile,$targetFile);
                  echo "Upload successful!";
          } else {
          		move_uploaded_file($tempFile,$targetFile);
                  echo 'Invalid file type.';
          }
  }


  $myFile = "artist.html";
  $fh = fopen($server_path_main . $myFile, 'w') or die("can't open file");
  $stringData = <<<TEST

  <!DOCTYPE html>
  <!--[if IE 8]>         <html class="no-js lt-ie9" lang="en" manifest="../../inspired.appcache"> <![endif]-->
  <!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable = no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="mobile-web-app-capable" content="yes">
    
    <!-- Icon -->
    <link rel="apple-touch-icon"  href="../../../static/img/icons/icon-76.png" />
    <link rel="apple-touch-icon" sizes="76x76"  href="../../../static/img/icons/icon-76.png" />
    <link rel="apple-touch-icon" sizes="120x120"  href="../../../static/img/icons/icon-120.png" />
    <link rel="apple-touch-icon" sizes="152x152"  href="../../../static/img/icons/icon-152.png" />
    <link rel="shortcut icon" sizes="196x196"  href="../../../static/img/icons/icon-196.png">
    
    <link rel="stylesheet" href="../../../static/css/foundation.css" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://static.stackmob.com/js/stackmob-js-0.9.2-bundled-min.js"></script>
    <script type="text/javascript">
      //Stackmob Auth
      StackMob.init({
        publicKey:        'da5f9b0d-676e-4d57-be03-e8436eb6313b',
        apiVersion:       1
      });
    </script>
    <title>Inpired | $fileTitle - Music Video</title> 
  </head>
  <body>
    <div class="screen">
      <div class="settings-menu">
        <a class="settings-back">Back</a>
        <a class="settings-back-back">Back</a>
        <a class="settings-logout" href="">Logout</a>
        <div class="settings-title">Settings</div>      
        <ul class="settings-menu-list">
          <li class="my-profile">My Profile</li>
          <li class="email-preferences">Email Preferences</li>
          <li class="invite-friends">Invite Friends</li>
          <li class="send-feedback">Send Feedback</li>
          <li class="help">Help</li>
          <li class="legal">Legal</li>
        </ul>
        <div class="ajax-container"></div>
        <div class="settings-footer">Inspired - v.0.1</br>Copyright Invidio, Inc 2013</div>  
      </div>   
      <div class="content">  
        <nav class="top-bar">
            <a class="back-btn" href="javascript:;" onclick="location.reload();location.href='../../music.html'"></a>
            <a class="name" href="javascript:;" onclick="location.reload();location.href='../../music.html'">Inspired</a>    
        </nav>
        <div class="spinner-wrap"><div id="spinner"><img src="../../../static/img/spinner.gif"></div></div>
        <div class="main-container">
          <div class="row">
            <div class="twelve columns artist-poster-container">
              <div class="page-container">
                <div class="artist-poster">
                  <div class="follow-btn"></div>
                  <img src="../../../static/img/music/artists/$targetName/cover.png" />
                </div>
                <div class="row" id="stats-tab">
                  <div class="small-12 small-centered columns">
                    <div class="artist-page-band"><span><!--artist name here !--></span> Music Videos</div>
                  </div>
                </div>  
              <!--MUSIC VIDEO LIST-->
                <div class="row artist-video-list">
                </div>   
              </div>
            </div>
          </div>
        </div>
        <div id="footer-container"><!-- Dynamic Content --></div>
      </div>  
    </div>
    <!--FOOTER-->
    <div class="footer">
      <a href="javascript:;" class="footer-settings"></a>
      <a href="javascript:;" class="footer-btn footer-bookmarks">Bookmarks</a>
      <a href="javascript:;" class="footer-btn footer-following">Following</a>
    </div>
  <!--SCRIPTS-->
    <script src="../../../static/js/vendor/custom.modernizr.js"></script>
    <script>
      document.write('<script src='+('__proto__'in{}?'../../../static/js/vendor/zepto':'../../../static/js/vendor/jquery')+'.js><\/script>')
    </script>
    <script src="../../../static/js/foundation/foundation.js"></script>
    <script src="../../../static/js/js.functions.js"></script>
    <script src="../../../static/js/auth.js"></script>
    <script src="../../../static/js/fastclick.js"></script>
    <script src="../../../static/js/stackmob-artist.js"></script>
    <script>
        //add fastclick: https://github.com/ftlabs/fastclick
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);    
    </script>   
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-42670109-1', 'invid.io');ga('send', 'pageview');
    </script>     
  </body>
  </html>

TEST;
fwrite($fh, $stringData);

?>