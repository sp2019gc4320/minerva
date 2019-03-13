<?php
//mentor_updateContacts.php

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//temporary values for testing
$op ='UPDATE';
$fkMentorPotentialID= 308;
$cadetID = 12;


if(isset($_POST['fkMentorPotentialID'])){
    $fkMentorPotentialID = filter_input(INPUT_POST, "fkMentorPotentialID");
    unset($_POST['fkMentorPotentialID']);
}
if(isset($_POST['ContactDate'])){
    $ContactDate = filter_input(INPUT_POST, "ContactDate");
    unset($_POST['ContactDate']);
}
// check for operation set from controller
if(isset($_POST['op'])){
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}

/*$fkMentorPotentialID = filter_input(INPUT_POST, "fkMentorPotentialID");
$ContactDate = filter_input(INPUT_POST, "ContactDate");
$MentorContactType =filter_input(INPUT_POST, "MentorContactType");
$MentorContactNote = filter_input(INPUT_POST, "MentorContactNote");*/
// if operation is update, query to update tblmentorcontacts
if($op == 'UPDATE')
{
    $sql = "SELECT tblmentorcontacts.*
          FROM tblmentorcontacts
          WHERE
          fkMentorPotentialID= $fkMentorPotentialID
          ";
    $result = $connection->runSelectQuery($sql);
    if ($result) {
        $fieldInfo = mysqli_fetch_fields($result);
        $row = $result->fetch_assoc();

        foreach ($fieldInfo as $val) {
            $fieldName = $val->name;

            // check to see if there is a post value
            if (isset($_POST[$fieldName])) {
                $fieldValue = filter_input(INPUT_POST, $fieldName);
                $sql = "UPDATE tblmentorcontacts set $fieldName =
          '$fieldValue' WHERE  fkMentorPotentialID=$fkMentorPotentialID AND ContactDate=$ContactDate";
                /*$sql = "UPDATE tblMentorContacts
JOIN tblClassDetails
JOIN tblMentorPotential 
  SET
  MentorContactType = '$MentorContactType',
  MentorContactNote = '$MentorContactNote'
WHERE
   tblClassDetails.fkCadetID='$CadetID' AND tblMentorContacts.ContactDate = '$ContactDate' AND
        tblClassDetails.ClassDetailID=tblMentorPotential.fkClassDetailID AND
        tblMentorPotential.MentorPotentialID='$fkMentorPotentialID'";*/

                $connection->runQuery($sql);
            }

        }
    }
    /*$sql = "UPDATE tblMentorContacts
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
    }*/
    echo '{ "status": "finished updating "}';
}
         /*   fkMentorPotentialID: $scope.cadetClass.MentorPotentialID,//===========================================================================================================
            CadetID:$scope.CadetID,
            ContactDate:"",
            MentorName: "",
            MentorContactType:"",
            MentorContactNote:"",
            ContactPlacementMonth:"",*/
// if operation is add, query to add a new record to the database
else if ($op=='ADD')
{
    $fkMentorPotentialID = filter_input(INPUT_POST, "fkMentorPotentialID");
    $contactDate = filter_input(INPUT_POST, "ContactDate");
    //$mentorName = filter_input(INPUT_POST, "MentorName");
    $mentorContactType = filter_input(INPUT_POST, "MentorContactType");
    $mentorContactNote = filter_input(INPUT_POST, "MentorContactNote");
    $contactPlacementMonth = filter_input(INPUT_POST, "ContactPlacementMonth");

    $sql = "INSERT INTO tblmentorcontacts ( fkMentorPotentialID, ContactDate, MentorContactType, MentorContactNote, ContactPlacementMonth)
             VALUES ('$fkMentorPotentialID', '$contactDate', '$mentorContactType', '$mentorContactNote', '$contactPlacementMonth')";

    $connection->createRecord($sql);
    /*$result = $conn->runQuery($sql);
    if ($result === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: $sql";
    }*/

    // echo "adding sql: $sql";
}

// if operation is delete, query to delete a record from the database
else if ($op =='DELETE')
{
    $sql= "SELECT MentorPotentialID FROM tblmentorpotential where fkmentorID='$fkMentorID'";
    $fkMentorPotentialID = 308;

    $sql = " DELETE FROM tblmentorcontacts
     WHERE ContactDate='$ContactDate'
      AND MentorContactNote='$MentorContactNote' AND
       fkMentorPotentialID='$fkMentorPotentialID' AND MentorContactType='$MentorContactType'";

    $result = $conn->runDeleteQuery($sql);
}

?>
