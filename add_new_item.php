
 <?php
/*
PekeUpload
Copyright (c) 2013 Pedro Molina
*/

// Define a destination
$targetFolder = ''; // Relative to the root
$product_name = $_GET['product_name'];
$server_path = $_SERVER['DOCUMENT_ROOT'] . "/invidio/static/img/products/";

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