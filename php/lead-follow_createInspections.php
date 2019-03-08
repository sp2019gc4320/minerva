<?php
// File: createInspections.php
// Pulls info for JBInspections from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//set everything to empty string
$InspectionDate= "";
$DidPassInspection="0";
$fkClassDetailID="";
$JBInspectionType="";
$InspectionNote="";
$InspMeritAdj="";

//then if isset to something, reset to the value passed in
if (isset($_POST['InspectionDate'])) {
    $InspectionDate= $_POST['InspectionDate'];
}
if (isset($_POST['DidPassInspection'])) {
    $DidPassInspection= $_POST['DidPassInspection'];
}
if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID= $_POST['fkClassDetailID'];
}
if (isset($_POST['JBInspectionType'])) {
    $JBInspectionType= $_POST['JBInspectionType'];
}
if (isset($_POST['InspectionNote'])) {
    $InspectionNote= $_POST['InspectionNote'];
}
if (isset($_POST['InspMeritAdj'])) {
    $InspMeritAdj = $_POST['InspMeritAdj'];
}

$sql = "INSERT INTO tblJBInspections(fkClassDetailID,InspectionDate,JBInspectionType,InspectionNote,DidPassInspection,InspMeritAdj)
values('$fkClassDetailID','$InspectionDate', '$JBInspectionType', '$InspectionNote', '$DidPassInspection', '$InspMeritAdj')";

$result = $conn->createRecord($sql);
?>