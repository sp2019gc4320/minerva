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

if (isset($_POST['ShortTermGoalDate'])) {
    $ShortTermGoalDate = filter_input(INPUT_POST, "ShortTermGoalDate");
}
if (isset($_POST['ShortTermGoal'])) {
    $ShortTermGoal1 = $_POST['ShortTermGoal'];
    $ShortTermGoal1 = str_replace('"', "'", $ShortTermGoal1);
    $ShortTermGoal1 = str_replace("\\", "/", $ShortTermGoal1);
    $ShortTermGoal = filter_var($ShortTermGoal1,FILTER_SANITIZE_ENCODED);
}
if (isset($_POST['IntermediateGoalDate'])) {
    $IntermediateGoalDate = filter_input(INPUT_POST, "IntermediateGoalDate");
}
if (isset($_POST['IntermediateGoal'])) {
    $IntermediateGoal1 = $_POST['IntermediateGoal'];
    $IntermediateGoal1 = str_replace('"', "'", $IntermediateGoal1);
    $IntermediateGoal1 = str_replace("\\", "/", $IntermediateGoal1);
    $IntermediateGoal = filter_var($IntermediateGoal1,FILTER_SANITIZE_ENCODED);
}
if (isset($_POST['LongTermGoalDate'])) {
    $LongTermGoalDate = filter_input(INPUT_POST, "LongTermGoalDate");
}
if (isset($_POST['LongTermGoal'])) {
    $LongTermGoal1 = $_POST['LongTermGoal'];
    $LongTermGoal1 = str_replace('"', "'", $LongTermGoal1);
    $LongTermGoal1 = str_replace("\\", "/", $LongTermGoal1);
    $LongTermGoal = filter_var($LongTermGoal1,FILTER_SANITIZE_ENCODED);
}
if (isset($_POST['ClassDetailID'])) {
    $classDetailID = filter_input(INPUT_POST, "ClassDetailID");
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