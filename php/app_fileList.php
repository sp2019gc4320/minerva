<?php
// File: files_listAll.php
// echos a JSON  array with all logo images
//
require_once 'dbcontroller.php';
$conn = new DBController();

$directory= "datas";
$applicantID=12;

$fileType=NULL;
if(isset($_POST['directory'])){
    $directory = filter_input(INPUT_POST, 'directory');
}
if(isset($_GET['directory'])){
    $directory =  basename(filter_input(INPUT_GET, "directory"));
    //  echo "$_GET:  $_GET";
}
if(isset($_GET['selectCadetID'])){
    $cadetID=filter_input(INPUT_GET,"selectCadetID");
}
if(isset($_GET['selectFileType'])){
    $fileType=filter_input(INPUT_GET,"selectFileType");
}

$sql= "SELECT docType FROM tblappdocs WHERE applicantID=12";
$result = $conn->runSelectQuery($sql);
echo '{ "data":[';
//print_r($result);
if ($result->num_rows > 0)
{
    $count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {

        //display comma
        if ($count >0 )
            echo ",";

        echo '{"File": "' . $row["docType"].'"}';
        $count=$count+1;
    }
    echo '] }';
}
