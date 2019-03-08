<?php
//mentor_updateContacts.php

require_once 'dbcontroller.php';

//Create connection
$conn = new DBController();

//temporary values for testing
$op ='UPDATE';
//$fkMentorPotentialID= 308;
$CadetID = 12;

// check for operation set from controller
if(isset($_POST['op'])){
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}

$fkMentorPotentialID = filter_input(INPUT_POST, "fkMentorPotentialID");
$ContactDate = filter_input(INPUT_POST, "ContactDate");
$MentorContactType =filter_input(INPUT_POST, "MentorContactType");
$MentorContactNote = filter_input(INPUT_POST, "MentorContactNote");

// if operation is update, query to update tblMentorContacts
if($op == 'UPDATE')
{
    $sql = "UPDATE tblMentorContacts
JOIN tblClassDetails
JOIN tblMentorPotential 
  SET
  MentorContactType = '$MentorContactType',
  MentorContactNote = '$MentorContactNote'
WHERE
   tblClassDetails.fkCadetID='$CadetID' AND tblMentorContacts.ContactDate = '$ContactDate' AND
        tblClassDetails.ClassDetailID=tblMentorPotential.fkClassDetailID AND
        tblMentorPotential.MentorPotentialID='$fkMentorPotentialID'";

    $result = $conn->runQuery($sql);
    if ($result === TRUE) {
        echo $sql;
        echo "Record updated successfully";
    } else {
        echo "Error updating record: $sql";
    }
    echo '{ "status": "finished updating "}';
}

// if operation is add, query to add a new record to the database
else if ($op=='ADD')
{

    $sql = "INSERT INTO tblMentorContacts ( fkMentorPotentialID, ContactDate, MentorContactType, MentorContactNote)
             VALUES ('$fkMentorPotentialID', '$ContactDate', '$MentorContactType', '$MentorContactNote')";


    $result = $conn->runQuery($sql);
    if ($result === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: $sql";
    }

    // echo "adding sql: $sql";
}

// if operation is delete, query to delete a record from the database
else if ($op =='DELETE')
{
    //$sql= "SELECT MentorPotentialID FROM tblmentorPotential where fkmentorID='$fkMentorID'";
    $fkMentorPotentialID = 308;

    $sql = " DELETE FROM tblmentorcontacts
     WHERE ContactDate='$ContactDate'
      AND MentorContactNote='$MentorContactNote' AND
       fkMentorPotentialID='$fkMentorPotentialID' AND MentorContactType='$MentorContactType'";

    $result = $conn->runDeleteQuery($sql);
}

?>
