<?php
    $product_name = $_GET['product_name'];
    $artist_name = $_GET['artist_name'];
    $video_name = $_GET['video_name'];

    //SERVER ROOT URL FIX
    $server_root = $_SERVER['DOCUMENT_ROOT'];
    $fix = substr(strrchr($server_root,'/'), 1);
    $url = substr($server_root, 0, - strlen($fix));
    $server_path = $url . "/inspired_landing/www/static/img/music/artists/$artist_name/$video_name/";

    if (!file_exists($server_path)) {
        mkdir($server_path, 0777, true);
    }

    if (!empty($_FILES)) {
        $tempFile = $_FILES['add_new_product']['tmp_name'];
        $filename = "$product_name.png";
        $targetPath = $server_path;
        $targetFile = $server_path . $filename;
        
        // Validate the file type
        $fileTypes = array('jpg','jpeg','gif','png'); // File extensions
        $fileParts = pathinfo($_FILES['add_new_product']['name']);
        
        if (in_array($fileParts['extension'],$fileTypes)) {
                move_uploaded_file($tempFile,$targetFile);
                echo "Upload successful!";
        } else {
        		move_uploaded_file($tempFile,$targetFile);
                echo 'Invalid file type.';
        }
    }
?>