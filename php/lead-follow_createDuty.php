<?php
// File: createDuty.php
// Pulls info for JBDuties from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//set everything to empty string

$DutyNote= "";
$DutyDidFail="0";
$fkClassDetailID="";
$JobPosition="";
$DutyStartDate="";
$DutyEndDate="";

//then if isset to something, reset to the value passed in

if (isset($_POST['DutyNote'])) {
    $DutyNote= $_POST['DutyNote'];
}
if (isset($_POST['DutyDidFail'])) {
    $DutyDidFail= $_POST['DutyDidFail'];
}
if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID= $_POST['fkClassDetailID'];
}
if (isset($_POST['JobPosition'])) {
    $JobPosition= $_POST['JobPosition'];
}
if (isset($_POST['DutyStartDate'])) {
    $DutyStartDate= $_POST['DutyStartDate'];
}
if (isset($_POST['DutyEndDate'])) {
    $DutyEndDate= $_POST['DutyEndDate'];
}

$sql = "INSERT INTO tblJBDuties(fkClassDetailID,JobPosition,DutyStartDate,DutyEndDate,DutyNote,DutyDidFail) values('$fkClassDetailID','$JobPosition','$DutyStartDate', '$DutyEndDate', '$DutyNote', '$DutyDidFail')";


$result = $conn->createRecord($sql);
?>