<?php
// File: physical-fitness_updateTasks.php
// Updates Phys Fit Tasks (for the 1st table in the Phys Fit view) in the database by sending a sql update statment.

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//these values should be sent when calling this php file -- store this value in $valueName = $_POST['valueName'];

if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID = $_POST['fkClassDetailID'];
}
if (isset($_POST['fkTaskID'])) {
    $fkTaskID = $_POST['fkTaskID'];
}

if (isset($_POST['EventDate'])) {
    $EventDate = $_POST['EventDate'];
}
if (isset($_POST['DidPass'])) {
    $DidPass = $_POST['DidPass'];
}
if (isset($_POST['EventNote'])) {
    $EventNote = $_POST['EventNote'];
}

//fkTaskTestEventID should be null for this update file.
if (isset($_POST['$fkTaskTestEventID'])) {
    $fkTaskTestEventID = $_POST['$fkTaskTestEventID'];
}
//sql statement to update the correct tables
$sql = "UPDATE
    tblCadetClassEvents
SET
  EventDate = '$EventDate',
  DidPass = '$DidPass',
  EventNote = '$EventNote'
WHERE
   fkTaskID = '$fkTaskID' AND 
   fkClassDetailID= '$fkClassDetailID'" ;

$result = $conn->runQuery($sql);

?>


