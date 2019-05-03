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
    $DutyNote= $conn->sanitize($_POST['DutyNote']);
    $DutyNote=filter_var($DutyNote, FILTER_SANITIZE_ENCODED);
}
if (isset($_POST['DutyDidFail'])) {
    $DutyDidFail= $conn->sanitize($_POST['DutyDidFail']);
}
if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID= filter_input(INPUT_POST,"fkClassDetailID", FILTER_SANITIZE_NUMBER_INT);
}
if (isset($_POST['JobPosition'])) {
    $JobPosition= filter_input(INPUT_POST,"JobPosition", FILTER_SANITIZE_STRING);
}
if (isset($_POST['DutyStartDate'])) {
    $DutyStartDate= $conn->getRightFormat($conn->sanitize($_POST['DutyStartDate']));
}
if (isset($_POST['DutyEndDate'])) {
    $DutyEndDate= $conn->getRightFormat($conn->sanitize($_POST['DutyEndDate']));
}

$sql = "INSERT INTO tblJBDuties(fkClassDetailID,JobPosition,DutyStartDate,DutyEndDate,DutyNote,DutyDidFail) values('$fkClassDetailID','$JobPosition','$DutyStartDate', '$DutyEndDate', '$DutyNote', '$DutyDidFail')";


$result = $conn->createRecord($sql);
?>