<?php
// File: life-skills_updateTests.php
// Updates Life Skills Tests (for the 2nd table in the life-skills view) in the database by sending a sql update statment.

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


?>
