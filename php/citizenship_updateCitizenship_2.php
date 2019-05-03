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
/*
$fkCadetID = $conn->sanitize($_POST['fkCadetID']);
$EventDate= $conn->sanitize($_POST['EventDate']);
$DidPass=$conn->sanitize($_POST['DidPass']);
$EventNote=$conn->sanitize($_POST['EventNote']);
$fkTaskID=$conn->sanitize($_POST['fkTaskID']);
$TaskTestID=$conn->sanitize($_POST['TaskTestID']);
*/

$fkCadetID = filter_input(INPUT_POST,'fkCadetID');
$EventDate =$conn->getRightFormat($conn->sanitize($_POST['EventDate']));
$DidPass = filter_input(INPUT_POST,'DidPass',FILTER_SANITIZE_NUMBER_INT);

//$EventNote =$conn->sanitize($_POST['EventNote']);//NOTE!!!!!!!!!!!!!!!!!! tech 2
//$EventNote=filter_var($EventNote,FILTER_SANITIZE_ENCODED);


$EventNote1 = $_POST['EventNote'];//technique 3
$EventNote1 = str_replace('"', "'", $EventNote1);
$EventNote1 = str_replace("\\", "/", $EventNote1);
$EventNote= filter_var($EventNote1,FILTER_SANITIZE_ENCODED);

$fkTaskID = filter_input(INPUT_POST,'fkTaskID');
$TaskTestID = filter_input(INPUT_POST,'TaskTestID');


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