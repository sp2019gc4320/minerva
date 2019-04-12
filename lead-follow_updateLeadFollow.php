<?php
// File: updateLeadFollow.php
// Updates Lead/Follow tasks
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//A "cadetID" should be sent when calling this php file
$fkCadetID = $conn->sanitize($_POST['fkCadetID']);
$EventDate= $conn->getRightFormat($conn->sanitize($_POST['EventDate']));
$DidPass= $conn->sanitize($_POST['DidPass']);

$EventNote= $conn->sanitize($_POST['EventNote']);
$EventNote=filter_var($EventNote, FILTER_SANITIZE_ENCODED);

$fkTaskID= $conn->sanitize($_POST['fkTaskID']);

$sql = "UPDATE tblCadetClassEvents
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
  tlkpCoreComponent.CoreComponentID = 7
  AND tblClassDetails.fkCadetID = '$fkCadetID'
  AND tlkpCoreComponentTasks.TaskID = $fkTaskID";

$result = $conn->runQuery($sql);
if ($result === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: $sql";
}
//$connection->close();
?>