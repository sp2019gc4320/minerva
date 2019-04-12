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
    $classDetailID = filter_input(INPUT_POST, "ClassDetailID", FILTER_SANITIZE_NUMBER_INT);
}

if(isset($_POST['PRAPCategory'])){
    $PRAPCategory = $conn->sanitize($_POST['PRAPCategory']);
    $PRAPCategory = filter_var($PRAPCategory, FILTER_SANITIZE_ENCODED);
}
if(isset($_POST['PRAPSponsorID'])){
    $PRAPSponsorID = filter_input(INPUT_POST, "PRAPSponsorID", FILTER_SANITIZE_NUMBER_INT);
}
$PRAPInitDate = $conn->getRightFormat($conn->sanitize($_POST['PRAPInitDate']));
$PRAPCompleteDate = $conn->getRightFormat($conn->sanitize($_POST['PRAPCompleteDate']));
$MenteeTrainingDate = $conn->getRightFormat($conn->sanitize($_POST['MenteeTrainingDate']));

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