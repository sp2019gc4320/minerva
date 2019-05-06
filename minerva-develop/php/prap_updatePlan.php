<?php
// File: prap_updatePlan.php
// Needs ClassDetailID

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$classDetailID = "12";

if(isset($_POST['ClassDetailID'])){
    $classDetailID = filter_input(INPUT_POST, "ClassDetailID");
}

if(isset($_POST['PRAPCategory'])){
    $PRAPCategory = filter_input(INPUT_POST, "PRAPCategory");
}
if(isset($_POST['PRAPSponsorID'])){
    $PRAPSponsorID = filter_input(INPUT_POST, "PRAPSponsorID");
}
if(isset($_POST['PRAPInitDate'])){
    $PRAPInitDate = filter_input(INPUT_POST, "PRAPInitDate");
}
if(isset($_POST['PRAPCompleteDate'])){
    $PRAPCompleteDate = filter_input(INPUT_POST, "PRAPCompleteDate");
}
if(isset($_POST['MenteeTrainingDate'])){
    $MenteeTrainingDate = filter_input(INPUT_POST, "MenteeTrainingDate");
}


$sql = "UPDATE tblClassDetails
  SET
  PRAPCategory = '$PRAPCategory',
  PRAPSponsorID = '$PRAPSponsorID',
  PRAPInitDate = '$PRAPInitDate',
  PRAPCompleteDate= '$PRAPCompleteDate',
  MenteeTrainingDate='$MenteeTrainingDate'
  WHERE
  ClassDetailID = '$classDetailID'";

$result = $conn->runQuery($sql);

//$connection->close();
?>