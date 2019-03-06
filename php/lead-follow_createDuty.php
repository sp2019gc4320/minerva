<?php
// File: createDuty.php
// Pulls info for JBDuties from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$fkClassDetailID = $_POST['fkClassDetailID']; 
$JobPosition= $_POST['JobPosition'];
$DutyStartDate= $_POST['DutyStartDate'];
$DutyEndDate= $_POST['DutyEndDate'];
$DutyNote= $_POST['DutyNote'];
$DutyDidFail= $_POST['DutyDidFail'];


$sql = "INSERT INTO tblJBDuties(fkClassDetailID,JobPosition,DutyStartDate,DutyEndDate,DutyNote,DutyDidFail) values('$fkClassDetailID','$JobPosition','$DutyStartDate', '$DutyEndDate', '$DutyNote', '$DutyDidFail')";

//echo($sql);

$result = $conn->createRecord($sql);

//$connection->close();
?>