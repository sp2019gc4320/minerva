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

$ApplicantID = $_POST['ApplicantID'];
if(isset($_FILES['file'])){

    //echo 'Yay! File was received by server!';0
    $fileName = $_FILES['file']['name'];
    $fileSize = $_FILES['file']['size'];
    $fileTmpName  = $_FILES['file']['tmp_name'];
    $fileType = $_POST['fileType'];
    $fileExtension = strtolower(end(explode('.', $_FILES['file']['name'])));

    // print_r($_FILES);
    $nameForDatabase=$ApplicantID.$fileName;
    //now move file to new location
    // move_uploaded_file($fileTmpName, "../datas/gita".$fileName);



    move_uploaded_file($fileTmpName,  "../". $directory. "/". $ApplicantID .$fileName);
    $aPath="". $directory. "/". $ApplicantID .$fileName;
    $currentDate=date("Y-m-d");

    //SQL for inserting new file into the database.
    $sql= "INSERT INTO `tblappdocs` (`dateUploaded`, `applicantID`, `docType`, `note`, `filePath`)
 VALUES ('$currentDate', '$ApplicantID', '$fileType', 'Testing123', '$aPath');";
    $result = $conn->runQuery($sql);

}
else
{
    echo 'no $_FILES object was detected';
}
?>