<?php
// File: updateDuty.php
// Updates Duty entries
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$DutyPositionID = $_POST['DutyPositionID'];

$validStart = strtotime($_POST['DutyStartDate']);
$validStart = date('Y-m-d', $validStart);//off by one (gets fixed when retrieving in the js)
$DutyStartDate=$validStart;


$validEnd = strtotime($_POST['DutyEndDate']);
$validEnd = date('Y-m-d', $validEnd);//off by one (gets fixed when retrieving in the js)
$DutyEndDate=$validEnd;

$DutyNote= $_POST['DutyNote'];
$DutyDidFail= $_POST['DutyDidFail'];

$sql = "UPDATE tblJBDuties
SET
  DutyStartDate = '$DutyStartDate',
  DutyEndDate = '$DutyEndDate',
  DutyNote = '$DutyNote',
  DutyDidFail = '$DutyDidFail'
WHERE
  DutyPositionID = '$DutyPositionID'";

$result = $conn->runQuery($sql);

print_r($sql);

if ($result === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: $sql";
}

?>