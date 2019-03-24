<?php
// File: job-skills_updateTests.php
// Updates Job Skills Tests (for the 2nd table in the jobskills view) in the database by sending a sql update statment.
// Input:  all info from test table -- only the test with a fkTaskEventID will be sent.
// Output: none

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//these values should be sent when calling this php file -- store this value in $valueName = $_POST['valueName'];

//Required to determine which record to update.
if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID = $_POST['fkClassDetailID'];
}
if (isset($_POST['fkTaskID'])) {
    $fkTaskID = $_POST['fkTaskID'];
}
if (isset($_POST['$fkTaskTestEventID'])) {
    $fkTaskTestEventID = $_POST['$fkTaskTestEventID'];
}
// Data being updated

if (isset($_POST['EventDate'])) {
    $EventDate = $_POST['EventDate'];
}
if (isset($_POST['DidPass'])) {
    $DidPass = $_POST['DidPass'];
}
if (isset($_POST['EventNote'])) {
    $EventNote = $_POST['EventNote'];
}
if (isset($_POST['TestScore'])) {
    $TestScore = $_POST['TestScore'];
}

//sql statement to update the correct tables
$sql = "UPDATE
    tblCadetClassEvents
SET
  EventDate = '$EventDate',
  DidPass = '$DidPass',
  EventNote = '$EventNote',
  TestScore = '$TestScore'
WHERE
   fkTaskID = '$fkTaskID' AND 
   fkClassDetailID= '$fkClassDetailID'
  AND fkTaskTestEventID = '$fkTaskTestEventID'";

$result = $conn->runQuery($sql);

?>