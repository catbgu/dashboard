
 <?php
/*
PekeUpload
Copyright (c) 2013 Pedro Molina
*/

// Define a destination
$targetFolder = ''; // Relative to the root
$targetName = $_GET['artist_name'];
$targetCover = $_GET['cover_name'];
$server_path = $_SERVER['DOCUMENT_ROOT'] . "/invidio/static/img/music/artists/$targetName/";

if (!file_exists($server_path)) {
    mkdir($server_path, 0777, true);
}


if (!empty($_FILES)) {
        $tempFile = $_FILES['video_cover']['tmp_name'];
        $filename = "$targetCover.png";
        $targetPath = $server_path;
        $targetFile = $server_path . $filename;
        
        // Validate the file type
        $fileTypes = array('jpg','jpeg','gif','png'); // File extensions
        $fileParts = pathinfo($_FILES['video_cover']['name']);
        
        if (in_array($fileParts['extension'],$fileTypes)) {
                move_uploaded_file($tempFile,$targetFile);
                echo "Upload successful!";
        } else {
        		move_uploaded_file($tempFile,$targetFile);
                echo 'Invalid file type.';
        }
}
?>