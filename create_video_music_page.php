<?php
// Define a destination
$targetFolder = ''; // Relative to the root
$targetName = $_GET['artist_name'];
$targetSEO_keywords = $_GET['SEO_keywords'];
$targetSEO_description = $_GET['SEO_description'];
$targetVideoTitle = $_GET['video_title'];
$server_path_main = $_SERVER['DOCUMENT_ROOT'] . "/invidio/templates/artists/$targetName/";
$fileTitle = ucwords(strtr($targetName, array ('-' => ' '))) + ucwords(strtr($targetVideoTitle, array ('-' => ' ')));

if (!file_exists($server_path_main)) {
    mkdir($server_path_main, 0777, true);
}

$myFile = "$targetVideoTitle.html";
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
  <meta name="description" content="$targetSEO_description">
  <meta name="keywords" content="$targetSEO_keywords">
  
  <!-- Icon -->
  <link rel="apple-touch-icon"  href="../../../static/img/icons/icon-76.png" />
  <link rel="apple-touch-icon" sizes="76x76"  href="../../../static/img/icons/icon-76.png" />
  <link rel="apple-touch-icon" sizes="120x120"  href="../../../static/img/icons/icon-120.png" />
  <link rel="apple-touch-icon" sizes="152x152"  href="../../../static/img/icons/icon-152.png" />
  <link rel="shortcut icon" sizes="196x196"  href="../../../static/img/icons/icon-196.png">
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
  <script type="text/javascript" src="http://static.stackmob.com/js/stackmob-js-0.9.2-bundled-min.js"></script>
  <script type="text/javascript">
    StackMob.init({
      publicKey:        '9c425dc3-688f-420d-804c-9b27f3856353',
      apiVersion:       0
    });
  </script>
  
  <link rel="stylesheet" href="../../../static/css/foundation.css" />
  <title>Inspired | $targetVideoTitle</title> 
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
      <div class="settings-footer">Inspired | $fileTitle</br>Copyright Invidio, Inc 2013</div>  
    </div>   
    <div class="content">  
      <nav class="top-bar">
          <a class="back-btn" href="javascript:;" onclick="location.reload();location.href='artist.html'"></a>
          <a class="name" href="javascript:;" onclick="location.reload();location.href='../../music.html'">Inspired</a>          
      </nav>

      <div class="spinner-wrap"><div id="spinner"><img src="../../../static/img/spinner.gif"></div></div>
      <div class="main-container">
        <div class="row">
          <div class="twelve columns video-container">
            <div class="page-container">
              <div class="video-poster">
                <iframe width="320" height="240" src="" frameborder="0" allowfullscreen></iframe>
              </div>

              <div id="share-box" class="reveal-modal">
                <ul class="small-block-grid-4 large-block-grid-4">
                  <li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Finvid.io" target="_blank"><img src="../../../static/img/webicon-facebook.svg" type="image/svg+xml" /></a></li>
                  <li><a href="https://twitter.com/share?url=http%3A%2F%2Finvid.io"  target="_blank"><img src="../../../static/img/webicon-twitter.svg" type="image/svg+xml" /></a></li>        
                  <li><a href="https://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.flickr.com%2Fphotos%2Fkentbrew%2F6851755809%2F&media=http%3A%2F%2Ffarm8.staticflickr.com%2F7027%2F6851755809_df5b2051c9_z.jpg&description=Next%20stop%3A%20Pinterest" data-pin-do="buttonPin"><img src="../../../static/img/webicon-pinterest.svg" type="image/svg+xml" /></a></li>
                  <li><a href="mailto:?subject=Check this mad outfit&amp;body=I found this outift on http://www.invid.io/~~~."><img src="../../../static/img/webicon-mail.svg" type="image/svg+xml" /></a></li>    
                </ul>
                <a class="close-reveal-modal">&#215;</a>
              </div>
            
            <!--Looks LIST-->
              <div class="row looks-container">
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
  <script src="../../../static/js/fastclick.js"></script>
  <script src="../../../static/js/stackmob-music-video.js"></script>
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