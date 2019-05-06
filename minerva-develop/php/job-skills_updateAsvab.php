<?php
// File: job-skills_updateAsvab.php
// Updates Job Skills ASVAB info (for the 3rd table in the jobskills view) in the database by sending a sql update statment.
// Input:  all info from table and cadet id in order to form sql statment.
// Output: none

//Known Error: cannot create new record for ASVAB scores, only update existing.

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();


//these values should be sent when calling this php file -- store this value in $valueName = $_POST['valueName'];
if (isset($_POST['ASVABDate'])) {
    //$ASVABDate = $_POST['ASVABDate'];
    $ASVABDate =$conn->getRightFormat($conn->sanitize($_POST['ASVABDate']));

}

if (isset($_POST['ASVABTechScore'])) {
    //$ASVABTechScore = $_POST['ASVABTechScore'];
    $ASVABTechScore = filter_input(INPUT_POST,'ASVABTechScore',FILTER_SANITIZE_NUMBER_INT);

}
if (isset($_POST['AFQTScore'])) {
    //$AFQTScore = $_POST['AFQTScore'];
    $AFQTScore = filter_input(INPUT_POST,'AFQTScore',FILTER_SANITIZE_NUMBER_INT);
}
if (isset($_POST['ASVABTestNotes'])) {
    //$ASVABTestNotes = $_POST['ASVABTestNotes']; tech 1

    //$ASVABTestNotes =$conn->sanitize($_POST['ASVABTestNotes']);//NOTE!!!!!!! tech 2
    //$ASVABTestNotes=filter_var($ASVABTestNotes,FILTER_SANITIZE_ENCODED);

    $ASVABTestNotes1 = $_POST['ASVABTestNotes'];//technique 2
    $ASVABTestNotes1 = str_replace('"', "'", $ASVABTestNotes1);
    $ASVABTestNotes1 = str_replace("\\", "/", $ASVABTestNotes1);
    $ASVABTestNotes= filter_var($ASVABTestNotes1,FILTER_SANITIZE_ENCODED);

}

if (isset($_POST['ASVABID'])) {
    $ASVABID = $_POST['ASVABID'];
}

//Default to UPDATE
$op = "UPDATE";
if (isset($_POST['op'])) {
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}

//DELETING existing record
if ($op == 'DELETE') {
    $sql = " DELETE FROM tblASVAB
             WHERE  tblASVAB.ASVABID = '$ASVABID'
             ";
    $result = $conn->runDeleteQuery($sql);

    print_r($sql);

    if ($result === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: $sql";
    }
}

//UPDATING existing record
else {
//Setting the sql statment to update the 3rd table up
    $sql = "UPDATE
	tblASVAB 
SET
  ASVABDate = '$ASVABDate',
  AFQTScore = '$AFQTScore',
  ASVABTechScore = '$ASVABTechScore',
  ASVABTestNotes = '$ASVABTestNotes'
  
WHERE
  tblASVAB.ASVABID = '$ASVABID'";

//sending the prepared sql statement
    $result = $conn->runQuery($sql);
}
?>