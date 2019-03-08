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
    $JBPosition= $_POST['JBPosition'];
}
if (isset($_POST['PosDidFail'])) {
    $PosDidFail= $_POST['PosDidFail'];
}
if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID= $_POST['fkClassDetailID'];
}
if (isset($_POST['PosNote'])) {
    $PosNote= $_POST['PosNote'];
}
if (isset($_POST['PosStartDate'])) {
    $PosStartDate= $_POST['PosStartDate'];
}
if (isset($_POST['PosEndDate'])) {
    $PosEndDate= $_POST['PosEndDate'];
}

$sql = "INSERT INTO tblJBPositions(fkClassDetailID,JBPosition,PosStartDate,PosEndDate,PosNote,PosDidFail) 
values('$fkClassDetailID', '$JBPosition', '$PosStartDate', '$PosEndDate', '$PosNote', '$PosDidFail')";

$result = $conn->createRecord($sql);
?>