<?php
// File: updateDuty.php
// Updates Duty entries
// Prints JSON array
// Needs CadetID

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$fkCadetID = "12";

if(isset($_POST['PRAPCategory'])){
    $PRAPCategory = filter_input(INPUT_POST, "PRAPCategory");
}
if(isset($_POST['PRAPSponsorID'])){
    $PRAPSponsorID = filter_input(INPUT_POST, "PRAPSponsorID");
}
if(isset($_POST['PRAPInitDate'])){
    $PRAPInitDate = filter_input(INPUT_POST, "PRAPSponsorID");
}
if(isset($_POST['PRAPCompleteDate'])){
    $PRAPCompleteDate = filter_input(INPUT_POST, "PRAPCompleteDate");
}
if(isset($_POST['MenteeTrainingDate'])){
    $MenteeTrainingDate = filter_input(INPUT_POST, "MenteeTrainingDate");
}
//$fkCadetID= $_POST['fkCadetID'];

$sql = "UPDATE tblClassDetails
  SET
  PRAPCategory = '$PRAPCategory',
  PRAPSponsorID = '$PRAPSponsorID',
  PRAPInitDate = '$PRAPInitDate',
  PRAPCompleteDate= '$PRAPCompleteDate',
  MenteeTrainingDate='$MenteeTrainingDate'
  WHERE
  fkCadetID = '$fkCadetID'";

$result = $conn->runQuery($sql);
if ($result === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: $sql";
}
//$connection->close();
?>