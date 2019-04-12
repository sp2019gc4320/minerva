<?php
// File: health_updateHealthHyg.php
// Updates info for Health/Hyg to the database
// Prints JSON array
// Needs CadetID
// Used by
//   health/health.controller.js

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//A "cadetID" should be sent when calling this php file -- store this value in $curCadetID
$fkCadetID = $_POST['fkCadetID'];
if ($_POST["EventDate"!=""]) {
    $valid = strtotime($_POST["EventDate"]);
    $valid = date('Y-m-d', $valid);//off by one (gets fixed when retrieving in the js)
    $EventDate = $valid;
}
else{
    $EventDate=$_POST["EventDate"];
}
$DidPass= $_POST['DidPass'];
$EventNote= $_POST['EventNote'];
$fkTaskID= $_POST['fkTaskID'];



//TEST VALUES
//$fkCadetID = '1';
//$EventDate = '1234-12-12 00:12:00'; //'01-02-0234'
//$DidPass = '1'; //'1'
//$EventNote = 'hello'; //'note'
//$fkTaskID = 17;


$sql = "UPDATE
    tblCadetClassEvents
    INNER JOIN tblClassDetails ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID
  INNER JOIN (
    tlkpCoreComponent
    INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID
  ) ON tblCadetClassEvents.fkTaskID = tlkpCoreComponentTasks.TaskID
SET
  EventDate = '$EventDate',
  DidPass = '$DidPass',
  EventNote = '$EventNote'
WHERE
  tlkpCoreComponent.CoreComponentID = 5
  AND tblClassDetails.fkCadetID = '$fkCadetID'
  AND tlkpCoreComponentTasks.TaskID = $fkTaskID";

$result = $conn->runQuery($sql);

//print_r($sql);

//print_r($result);
/*
if ($result === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: $sql";
}
*/
//$connection->close();
?>