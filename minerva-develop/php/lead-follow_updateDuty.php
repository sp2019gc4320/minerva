<?php
// File: updateDuty.php
// Updates Duty entries
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//default for testing
$op = 'UPDATE';
$DutyPositionID = $_POST['DutyPositionID'];

if (isset($_POST['DutyPositionID'])) {
    $DutyPositionID = filter_input(INPUT_POST, "DutyPositionID");
    unset($_POST['DutyPositionID']);
}

if (isset($_POST['op'])) {
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}

//checks to see if updates or deletions need to be made

if($op=='UPDATE') {

    $validStart = strtotime($_POST['DutyStartDate']);
    $validStart = date('Y-m-d', $validStart);//off by one (gets fixed when retrieving in the js)
    $DutyStartDate = $validStart;


    $validEnd = strtotime($_POST['DutyEndDate']);
    $validEnd = date('Y-m-d', $validEnd);//off by one (gets fixed when retrieving in the js)
    $DutyEndDate = $validEnd;

    $DutyNote = $_POST['DutyNote'];
    $DutyDidFail = $_POST['DutyDidFail'];

    $sql = "UPDATE tblJBDuties
SET
  DutyStartDate = '$DutyStartDate',
  DutyEndDate = '$DutyEndDate',
  DutyNote = '$DutyNote',
  DutyDidFail = '$DutyDidFail'
WHERE
  DutyPositionID = '$DutyPositionID'";

    $result = $conn->runQuery($sql);

    print_r($sql);

    if ($result === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: $sql";
    }
}
else if($op == 'DELETE')
{
    $sql = " DELETE FROM tblJBDuties
               WHERE  DutyPositionID=$DutyPositionID
             ";
    $result = $conn->runDeleteQuery($sql);

    print_r($sql);

    if ($result === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: $sql";
    }
}
?>