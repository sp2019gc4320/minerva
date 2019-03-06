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
$PosStartDate= $_POST['PosStartDate'];
$PosEndDate= $_POST['PosEndDate'];
$PosNote= $_POST['PosNote'];
$PosDidFail= $_POST['PosDidFail'];


$sql = "INSERT INTO tblJBPositions(fkClassDetailID,JBPosition,PosStartDate,PosEndDate,PosNote,PosDidFail) 
values('$fkClassDetailID', '$JBPosition', '$PosStartDate', '$PosEndDate', '$PosNote', '$PosDidFail')";

$result = $conn->createRecord($sql);

//$connection->close();
?>