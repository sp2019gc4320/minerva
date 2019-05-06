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
//print_r($_POST);
//Required to determine which record to update.

if (isset($_POST['fkTaskTestEventID'])) {

    $fkTaskTestEventID = $_POST['fkTaskTestEventID'];
}

if (isset($_POST['PTDetailID'])) {

    $PTDetailID = $_POST['PTDetailID'];
}

if (isset($_POST['fkPTID'])) {

    $fkPTID = $_POST['fkPTID'];
}

if (isset($_POST['PTDetailResult'])) {

    $PTDetailResult = $_POST['PTDetailResult'];
}

if (isset($_POST['IsWaived'])) {

    $IsWaived = $_POST['IsWaived'];
}


//sql statement to update the correct tables
$sql = "UPDATE
    tblPTDetails
SET
   PTDetailResult = '$PTDetailResult',
   IsWaived = '$IsWaived'
WHERE
   PTDetailID = '$PTDetailID'";
echo $sql;
$result = $conn->runQuery($sql);

?>