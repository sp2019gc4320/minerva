<?php
// File: createPosition.php
// Pulls info for JBPositions from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//set everything to empty string
$JBPosition= "";
$PosDidFail="0";
$fkClassDetailID="";
$PosNote="";
$PosStartDate="";
$PosEndDate="";

//then if isset to something, reset to the value passed in

if (isset($_POST['JBPosition'])) {
    $JBPosition= filter_input(INPUT_POST, "JBPosition", FILTER_SANITIZE_STRING);
}
if (isset($_POST['PosDidFail'])) {
    $PosDidFail= $conn->sanitize($_POST['PosDidFail']);
}
if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID= filter_input(INPUT_POST, "fkClassDetailID", FILTER_SANITIZE_NUMBER_INT);
}
if (isset($_POST['PosNote'])) {
    $PosNote1=$_POST['PosNote'];
    $PosNote1=str_replace('"', "'", $PosNote1);
    $PosNote1=str_replace("\\", "/", $PosNote1);
    $PosNote=filter_var($PosNote1, FILTER_SANITIZE_ENCODED);
}
if (isset($_POST['PosStartDate'])) {
    $PosStartDate= $conn->getRightFormat($conn->sanitize($_POST['PosStartDate']));
}
if (isset($_POST['PosEndDate'])) {
    $PosEndDate= $conn->getRightFormat($conn->sanitize($_POST['PosEndDate']));
}

$sql = "INSERT INTO tblJBPositions(fkClassDetailID,JBPosition,PosStartDate,PosEndDate,PosNote,PosDidFail) 
values('$fkClassDetailID', '$JBPosition', '$PosStartDate', '$PosEndDate', '$PosNote', '$PosDidFail')";

$result = $conn->createRecord($sql);
?>