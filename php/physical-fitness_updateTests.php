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
if (isset($_POST['PTID'])) {
    $PTID = $_POST['PTID'];
}

// Data being updated

if (isset($_POST['PTDate'])) {
    $PTDate = $_POST['PTDate'];
}
if (isset($_POST['PTTestType'])) {
    $PTTestType = $_POST['PTTestType'];
}
if (isset($_POST['PTAward'])) {
    $PTAward = $_POST['PTAward'];
}
if (isset($_POST['PTBodyFat'])) {
    $PTBodyFat = $_POST['PTBodyFat'];
}
if (isset($_POST['PTHeight'])) {
    $PTHeight = $_POST['PTHeight'];
}
if (isset($_POST['PTWeight'])) {
    $PTWeight = $_POST['PTWeight'];
}

//sql statement to update the correct tables
$sql = "UPDATE
    tblPT
SET
  PTDate = '$PTDate',
  PTTestType = '$PTTestType',
  PTAward = '$PTAward',
  PTBodyFat = '$PTBodyFat',
  PTHeight = '$PTHeight',
  PTWeight = '$PTHeight'
WHERE
   PTID = '$PTID' AND 
   fkClassDetailID= '$fkClassDetailID'";

$result = $conn->runQuery($sql);

?>