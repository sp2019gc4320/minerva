<?php
// File: updateDuty.php
// Updates Duty entries
// Prints JSON array
// Needs CadetID

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
    $_POST = json_decode(file_get_contents('php://input'), true);

//connect to db controller
require_once 'dbcontroller.php';


$CadetID = "12";
//create connection
$conn = new DBController();

if(isset($_POST['ShortTermGoalDate'])){
    $ShortTermGoalDate = filter_input(INPUT_POST, "ShortTermGoalDate");
}
if(isset($_POST['ShortTermGoal'])){
    $ShortTermGoal = filter_input(INPUT_POST, "ShortTermGoal");
}if(isset($_POST['IntermediateGoalDate'])){
    $IntermediateGoalDate = filter_input(INPUT_POST, "IntermediateGoalDate");
}
if(isset($_POST['IntermediateGoal'])){
    $IntermediateGoal = filter_input(INPUT_POST, "IntermediateGoal");
}if(isset($_POST['LongTermGoalDate'])){
    $LongTermGoalDate = filter_input(INPUT_POST, "LongTermGoalDate");
}
if(isset($_POST['LongTermGoal'])){
    $LongTermGoal = filter_input(INPUT_POST, "LongTermGoal");
}


//if(isset($_POST['CadetID'])) {
  //  $CadetID = filter_input(INPUT_POST, "CadetID");

    $sql = "UPDATE tblClassDetails
  SET
  ShortTermGoalDate = '$ShortTermGoalDate',
  ShortTermGoal = '$ShortTermGoal',
  IntermediateGoalDate = '$IntermediateGoalDate',
  IntermediateGoal= '$IntermediateGoal',
  LongTermGoalDate='$LongTermGoalDate',
  LongTermGoal = '$LongTermGoal'
WHERE
  fkCadetID = '$CadetID'";

    $result = $conn->runQuery($sql);
    if ($result === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: $sql";
    }
//}
//$connection->close();
?>