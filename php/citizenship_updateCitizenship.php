<?php
// File: retrieveHealthHyg.php
// Pulls info for Health/Hyg from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//A "cadetID" should be sent when calling this php file -- store this value in $curCadetID
$fkCadetID = $_POST['fkCadetID']; 
$EventDate= $_POST['EventDate'];
$DidPass= $_POST['DidPass'];
$EventNote= $_POST['EventNote'];
$fkTaskID= $_POST['fkTaskID'];


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
  tlkpCoreComponent.CoreComponentID = 6
  AND tblClassDetails.fkCadetID = '$fkCadetID'
  AND tlkpCoreComponentTasks.TaskID = '$fkTaskID'";

$result = $conn->runQuery($sql);
if(!$result) die ("Update_Citizenship SQL Fatal Error");
?>