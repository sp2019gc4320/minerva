<?php
// File: updateInspection.php
// Updates inspection entries
// Prints JSON array


//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$JBInspectionID = $_POST['JBInspectionID'];

$validInspec= strtotime($_POST['DutyEndDate']);
$validInspec = date('Y-m-d', $validInspec);//off by one (gets fixed when retrieving in the js)
$InspectionDate= $validInspec;

$InspectionNote= $_POST['InspectionNote'];
$DidPassInspection= $_POST['DidPassInspection'];
$InspMeritAdj= $_POST['InspMeritAdj'];

$sql = "UPDATE tblJBInspections
SET
  InspectionDate = '$InspectionDate',
  InspectionNote = '$InspectionNote',
  DidPassInspection = '$DidPassInspection',
  InspMeritAdj = '$InspMeritAdj'
WHERE
  JBInspectionID = '$JBInspectionID'";

$result = $conn->runQuery($sql);
if ($result === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: $sql";
}
//$connection->close();
?>