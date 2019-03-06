<?php
// File: createPosition.php
// Pulls info for JBPositions from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$fkClassDetailID = $_POST['fkClassDetailID']; 
$JBPosition= $_POST['JBPosition'];
//Date Validation added 2/27
$validStartDate = strtotime($_POST['PosStartDate']);
$validStartDate = date('Y-m-d', $validStartDate);//off by one (gets fixed when retrieving in the js)
$PosStartDate = $validStartDate;

$validEndDate = strtotime($_POST['PosEndDate']);
$validEndDate = date('Y-m-d', $validEndDate);//off by one (gets fixed when retrieving in the js)
$PosEndDate = $validEndDate;

$PosNote= $_POST['PosNote'];
$PosDidFail= $_POST['PosDidFail'];


$sql = "INSERT INTO tblJBPositions(fkClassDetailID,JBPosition,PosStartDate,PosEndDate,PosNote,PosDidFail) 
values('$fkClassDetailID', '$JBPosition', '$PosStartDate', '$PosEndDate', '$PosNote', '$PosDidFail')";

$result = $conn->createRecord($sql);

//$connection->close();
?>