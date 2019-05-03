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
if (isset($_POST['fkTaskTestEventID'])) {
    $fkTaskTestEventID = $_POST['fkTaskTestEventID'];
}

// Data being updated

if (isset($_POST['EventDate'])) {
    $EventDate =$conn->getRightFormat($conn->sanitize($_POST['EventDate']));//DATE
}
if (isset($_POST['DidPass'])) {
    $DidPass= filter_input(INPUT_POST,'DidPass',FILTER_SANITIZE_NUMBER_INT);
}
if (isset($_POST['EventNote'])) {
    //$EventNote =$conn->sanitize($_POST['EventNote']);//NOTE!!!!!!! tech 2
    //$EventNote=filter_var($EventNote,FILTER_SANITIZE_ENCODED);

    $EventNote1 = $_POST['EventNote'];//technique 3
    $EventNote1 = str_replace('"', "'", $EventNote1);
    $EventNote1 = str_replace("\\", "/", $EventNote1);
    $EventNote= filter_var($EventNote1,FILTER_SANITIZE_ENCODED);
}
if (isset($_POST['TestScore'])) {
    $TestScore= filter_input(INPUT_POST,'TestScore',FILTER_SANITIZE_NUMBER_INT);
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