<?php
// File: life-skills_updateTasks.php
// Updates Life Skills Tasks (for the 1st table in the life-skills view) in the database by sending a sql update statment.

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$task="";
$op="";

if(isset($_POST['TaskID'])){
    $taskID= $_POST['TaskID'];
}

if(isset($_POST['Task'])){
    $task=$_POST['Task'];
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

if (isset($_POST['EventDate'])) {
    $EventDate = $_POST['EventDate'];
}

if (isset($_POST['DidPass'])) {
    $DidPass = $_POST['DidPass'];
}

if (isset($_POST['EventNote'])) {
    $EventNote = $_POST['EventNote'];
}

if (isset($_POST['MaxDate'])) {
    $MaxDate = $_POST['MaxDate'];
}

if (isset($_POST['$fkTaskTestEventID'])) {
    $fkTaskTestEventID = $_POST['$fkTaskTestEventID'];
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
   fkTaskID = $fkTaskID
    AND fkClassDetailID= $fkClassDetailID";


$result = $conn->runQuery($sql);



?>
