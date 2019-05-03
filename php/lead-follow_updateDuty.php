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
$DutyPositionID = $conn->sanitize($_POST['DutyPositionID']);

//do i need to sanitize here too???????
if (isset($_POST['DutyPositionID'])) {
    $DutyPositionID = filter_input(INPUT_POST, "DutyPositionID", FILTER_VALIDATE_INT);
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

    $DutyNote1=$_POST['DutyNote'];
    $DutyNote1=str_replace('"', "'", $DutyNote1);
    $DutyNote1=str_replace("\\", "/", $DutyNote1);
    $DutyNote=filter_var($DutyNote1, FILTER_SANITIZE_ENCODED);

    $DutyDidFail= $conn->sanitize($_POST['DutyDidFail']);

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