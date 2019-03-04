<?php
// File: updatejobSkills.php
// Updates info (for the 1st table in the jobskills view) in the database by sending a sql update statment. 
// Input:  all info from table and cadet id in order to form sql statment.
// Output: none
//Programmer: Kevin Krider

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//these values should be sent when calling this php file -- store this value in $valueName = $_POST['valueName'];
$fkCadetID = $_POST['fkCadetID']; 
$EventDate= $_POST['EventDate'];
$DidPass= $_POST['DidPass'];
$EventNote= $_POST['EventNote'];
$fkTaskID= $_POST['fkTaskID'];

//sql statement to update the correct tables
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
  tlkpCoreComponent.CoreComponentID = 3
  AND tblClassDetails.fkCadetID = '$fkCadetID'
  AND tlkpCoreComponentTasks.TaskID = '$fkTaskID'";

$result = $conn->runQuery($sql);

?>