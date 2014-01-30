<?php 
	echo $_SERVER['DOCUMENT_ROOT'];

	  //SERVER ROOT URL FIX
	  $server_root = $_SERVER['DOCUMENT_ROOT'];
	  $fix = substr(strrchr($server_root,'/'), 1);
	  $url = substr($server_root, 0, - strlen($fix));
	  $server_path = $url . "/inspired_landing/www/static/img/music/artists/";

	  rename($server_path . "002", $server_path .  "001111");



 ?>