<?php
// File: createInspections.php
// Pulls info for JBInspections from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$fkClassDetailID = $_POST['fkClassDetailID'];

//Date Validation added 2/27
$validInspec = strtotime($_POST['InspectionDate']);
$validInspec = date('Y-m-d', $validInspec);//off by one (gets fixed when retrieving in the js)
$InspectionDate = $validInspec;

$JBInspectionType= $_POST['JBInspectionType'];
$InspectionNote= $_POST['InspectionNote'];
$DidPassInspection= $_POST['DidPassInspection'];
$InspMeritAdj= $_POST['InspMeritAdj'];


$sql = "INSERT INTO tblJBInspections(fkClassDetailID,InspectionDate,JBInspectionType,InspectionNote,DidPassInspection,InspMeritAdj)
values('$fkClassDetailID','$InspectionDate', '$JBInspectionType', '$InspectionNote', '$DidPassInspection', '$InspMeritAdj')";

$result = $conn->createRecord($sql);

//$connection->close();
?>