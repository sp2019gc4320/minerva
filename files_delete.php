<?php

//files_delete.php
//connect to database
require_once 'dbcontroller.php';
$conn = new DBController();
$filename = 'gita000.jpg';

if(isset($_POST['file'])){
          $filename =  basename(filter_input(INPUT_POST, "file"));
          // echo "$_POST:  $_POST";
}

if(isset($_GET['file'])){
          $filename =  basename(filter_input(INPUT_GET, "file"));
        //  echo "$_GET:  $_GET";
}

$directory= "datas";
if(isset($_POST['directory'])){
     $directory = filter_input(INPUT_POST, 'directory');
 }
 if(isset($_GET['directory'])){
           $directory =  basename(filter_input(INPUT_GET, "directory"));
         //  echo "$_GET:  $_GET";
 }



// Specify file path.
$path =  "..//". $directory.'/';
$myFile =  $path.$filename;
//SQL to remove file from databse.
$sql="DELETE FROM tblAttachments WHERE UploadedFileName= '$filename'";

if(!empty($filename)){
    // Check file is exists on given path.

    if(file_exists($myFile))
    {
      $result = $conn->runQuery($sql);    
      unlink($myFile);
    }
    else{
      echo 'File does not exists on given path';
    }
 }
 ?>
