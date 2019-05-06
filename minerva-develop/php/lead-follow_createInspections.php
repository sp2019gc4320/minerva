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
    $InspectionDate= $conn->getRightFormat($conn->sanitize($_POST['InspectionDate']));
}
if (isset($_POST['DidPassInspection'])) {
    $DidPassInspection= $conn->sanitize($_POST['DidPassInspection']);
}
if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID= filter_input(INPUT_POST,"fkClassDetailID", FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
}
if (isset($_POST['JBInspectionType'])) {
    $JBInspectionType= filter_input(INPUT_POST,"JBInspectionType", FILTER_SANITIZE_STRING);
}
if (isset($_POST['InspectionNote'])) {
    $InspectionNote1=$_POST['InspectionNote'];
    $InspectionNote1=str_replace('"', "'", $InspectionNote1);
    $InspectionNote1=str_replace("\\", "/", $InspectionNote1);
    $InspectionNote=filter_var($InspectionNote1, FILTER_SANITIZE_ENCODED);
}
if (isset($_POST['InspMeritAdj'])) {
    $InspMeritAdj = filter_input(INPUT_POST,"InspMeritAdj", FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
}

$sql = "INSERT INTO tblJBInspections(fkClassDetailID,InspectionDate,JBInspectionType,InspectionNote,DidPassInspection,InspMeritAdj)
values('$fkClassDetailID','$InspectionDate', '$JBInspectionType', '$InspectionNote', '$DidPassInspection', '$InspMeritAdj')";

$result = $conn->createRecord($sql);
?>