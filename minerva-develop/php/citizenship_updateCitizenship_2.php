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
$TaskTestID= $_POST['TaskTestID'];

/*
 *
 * $sql = "SELECT tblClassDetails.ClassDetailID,
 * tblClassDetails.fkCadetID,
 * tblCadetClassEvents.fkTaskID,
 * tblCadetClassEvents.fkTaskTestEventID,
 * tlkpCoreComponentTasks.CoreComponentID,
 * tblCadetClassEvents.EventDate,
 * tblCadetClassEvents.EventNote,
 * tblCadetClassEvents.DidPass,
 * tblCadetClassEvents.TestScore,
 * tlkpTaskTests.TaskTest,
 * tlkpTaskTests.IsActive,
 * tlkpTaskTests.TaskTestID
 * FROM (
 * tlkpCoreComponent INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID)
 * INNER JOIN (tlkpTaskTests INNER JOIN (tblClassDetails INNER JOIN tblCadetClassEvents ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID)
 * ON (tblCadetClassEvents.fkTaskTestEventID = tlkpTaskTests.TaskTestID) AND (tlkpTaskTests.fkTaskID = tblCadetClassEvents.fkTaskID)) ON tlkpCoreComponentTasks.TaskID = tlkpTaskTests.fkTaskID
 * WHERE (((tblClassDetails.fkCadetID)='$cadetID') AND ((tlkpCoreComponentTasks.CoreComponentID)=6));";
 *
 */


$sql = "UPDATE tlkpCoreComponent INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID INNER JOIN (tlkpTaskTests INNER JOIN (tblClassDetails INNER JOIN tblCadetClassEvents ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID)ON (tblCadetClassEvents.fkTaskTestEventID = tlkpTaskTests.TaskTestID) AND (tlkpTaskTests.fkTaskID = tblCadetClassEvents.fkTaskID)) ON tlkpCoreComponentTasks.TaskID = tlkpTaskTests.fkTaskID
SET
  EventDate = '$EventDate',
  DidPass = '$DidPass',
  EventNote = '$EventNote'
WHERE
  tlkpCoreComponent.CoreComponentID = 6
  AND tblClassDetails.fkCadetID = '$fkCadetID'
  AND TaskTestID = '$TaskTestID'";

$result = $conn->runQuery($sql);
if(!$result) die ("Update_Citizenship_2 SQL Fatal Error");
?>