<?php
	$targetName = $_GET['artist_name'];
	$targetCover = $_GET['cover_name'];
	$targetLocation = $_GET['img_url'];

	//SERVER ROOT URL FIX
	$server_root = $_SERVER['DOCUMENT_ROOT'];
	$fix = substr(strrchr($server_root,'/'), 1);
	$url = substr($server_root, 0, - strlen($fix));
	$serverPath = $url . "/inspired_landing/www/static/img/music/artists/$targetName/";

	if (!file_exists($serverPath)) {
	    mkdir($serverPath, 0777, true);
	}

	$file1_fp = md5_file($serverPath + "/" + $targetCover + ".png");
	$file2_fp = md5_file($targetLocation);

	if ($file1_fp === $file2_fp ) {
		//same file exists
	} else {
		file_put_contents($serverPath . "$targetCover.png", fopen("$targetLocation", 'r'));
	}

?>