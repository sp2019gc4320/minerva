<?php
// File: prap_updateGoals.php
// Prints JSON array
// Needs ClassDetailID

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

//connect to db controller
require_once 'dbcontroller.php';


$classDetailID = "12";
//create connection
$conn = new DBController();

$ShortTermGoalDate = $conn->getRightFormat($conn->sanitize($_POST['ShortTermGoalDate']));

$ShortTermGoal = $conn->sanitize($_POST['ShortTermGoal']);
$ShortTermGoal = filter_var($ShortTermGoal, FILTER_SANITIZE_ENCODED);

$IntermediateGoalDate = $conn->getRightFormat($conn->sanitize($_POST['IntermediateGoalDate']));

$IntermediateGoal = $conn->sanitize($_POST['IntermediateGoal']);
$IntermediateGoal = filter_var($IntermediateGoal, FILTER_SANITIZE_ENCODED);

$LongTermGoalDate = $conn->getRightFormat($conn->sanitize($_POST['LongTermGoalDate']));

$LongTermGoal = $conn->sanitize($_POST['LongTermGoal']);
$LongTermGoal = filter_var($LongTermGoal, FILTER_SANITIZE_ENCODED);

if (isset($_POST['ClassDetailID'])) {
    $classDetailID = filter_input(INPUT_POST, "ClassDetailID", FILTER_SANITIZE_NUMBER_INT);
}



$sql = "UPDATE tblClassDetails
  SET
  ShortTermGoalDate = '$ShortTermGoalDate',
  ShortTermGoal = '$ShortTermGoal',
  IntermediateGoalDate = '$IntermediateGoalDate',
  IntermediateGoal= '$IntermediateGoal',
  LongTermGoalDate='$LongTermGoalDate',
  LongTermGoal = '$LongTermGoal'
WHERE
  ClassDetailID = '$classDetailID'";

$result = $conn->runQuery($sql);

?>