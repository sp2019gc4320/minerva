<?php
//files_upload.php
//Remember to change the permissions on the directory chmod 777 to allow read and write
//----------------------------------------------
//Connect to Database
require_once 'dbcontroller.php';
$conn = new DBController();
$directory= "datas";
if(isset($_POST['directory'])){
     $directory = filter_input(INPUT_POST, 'directory');
 }

$CadetID="gita";
if(isset($_POST['CadetID'])){
     $CadetID = filter_input(INPUT_POST, 'CadetID');
 }


// $_FILES  is a global variable that keeps all information related to uploaded file
// in the code below the input's name attribute in uploading the file was 'file'
 //echo '>>>>>>>>>>>>>>>>>>  $_FILES:';
 // print_r($_FILES);

 //echo '<<<<<<<<<<<<<<<<< $_POST:';
 //print_r($_POST);

 // echo '<<<<<<<<<<<<<<<<< $_GET:';
 // print_r($_GET);

 //echo ' --------------------RESULT:';
if(isset($_FILES['file'])){

 //echo 'Yay! File was received by server!';0
  $fileName = $_FILES['file']['name'];
  $fileSize = $_FILES['file']['size'];
  $fileTmpName  = $_FILES['file']['tmp_name'];
  $fileType = $_POST['fileType'];
  $fileExtension = strtolower(end(explode('.', $_FILES['file']['name'])));

 // print_r($_FILES);
  $nameForDatabase=$CadetID.$fileName;
  //now move file to new location
 // move_uploaded_file($fileTmpName, "../datas/gita".$fileName);

  
  
   move_uploaded_file($fileTmpName,  "../". $directory. "/". $CadetID .$fileName);
   $aPath="../". $directory. "/". $CadetID .$fileName;
   echo "$CadetID$fileName";
   //SQL for inserting new file into the database.
  $sql= "INSERT INTO tblAttachments (fkClassDetailID,fkAttachmentType,UploadedFileName, AttachmentPath, FileType) VALUES ('$CadetID','$fileType','$CadetID$fileName','$aPath','$fileExtension')";
  $result = $conn->runQuery($sql);

}
else
{
   echo 'no $_FILES object was detected';
}
?>