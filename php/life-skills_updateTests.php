<?php
// File: job-skills_updateTests.php
// Updates Job Skills Tests (for the 2nd table in the jobskills view) in the database by sending a sql update statment.
// Input:  all info from test table -- only the test with a fkTaskEventID will be sent.
// Output: none

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$task="";
$op="";
if(isset($_POST['TaskTestID']))
{
    $testID= $_POST['TaskTestID'];
}

if(isset($_POST['CadetClassEventID']))
{
    $CadetClassEventID= $_POST['CadetClassEventID'];
}

if(isset($_POST['TaskTest']))
{
    $task=$_POST['TaskTest'];
}

if(isset($_POST['op'])){
    $op=$_POST['op'];
}
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
if (isset($_POST['MaxDate'])) {
    $MaxDate = $_POST['MaxDate'];
}

if($op=='DELETE'){
    $sql="DELETE FROM tlkpTaskTests WHERE TaskTestID='$testID'";
    $result=$conn->runQuery($sql);
}
else {
//sql statement to update the correct tables
    $sql = "UPDATE
    tblCadetClassEvents
SET
  EventDate = '$EventDate',
  DidPass = '$DidPass',
  EventNote = '$EventNote',
  MaxDate = '$MaxDate'
WHERE
   fkTaskTestEventID = $testID
    AND CadetClassEventID = $CadetClassEventID";

    $result = $conn->runQuery($sql);

}

?>