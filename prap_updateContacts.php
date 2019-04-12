<?php
//mentor_updateContacts.php
//Added MentorContactID field to table to make updating easier.
// Fields:  MentorContactID, fkMentorPotentialID, ContactDate, MentorContactType, MentorContactNote, ContactPlacementMonth

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//default to updating
$op ='UPDATE';

if(isset($_POST['MentorContactID'])){
    $mentorContactID = filter_input(INPUT_POST, "MentorContactID", FILTER_SANITIZE_NUMBER_INT);
    unset($_POST['MentorContactID']);
}

// check for operation set from controller
if(isset($_POST['op'])){
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}

// if operation is update, query to update tblmentorcontacts
if($op == 'UPDATE')
{
    //Get all the column names in the tblMentorContacts table
    $sql = "SELECT tblMentorContacts.*
          FROM tblMentorContacts
          WHERE
          MentorContactID= $mentorContactID
          ";
    $result = $connection->runSelectQuery($sql);

    //Update each field sent as post parameter
    if ($result) {
        $fieldInfo = mysqli_fetch_fields($result);
        $row = $result->fetch_assoc();

        foreach ($fieldInfo as $val) {
            $fieldName = $val->name;

            // check to see if there is a post value
            if (isset($_POST[$fieldName])) {
                $fieldValue = $connection->sanitize($_POST[$fieldName]);
                $fieldValue = filter_var($fieldValue, FILTER_SANITIZE_ENCODED);
                $sql = "UPDATE tblMentorContacts  SET  $fieldName ='$fieldValue'
                      WHERE  MentorContactID=$mentorContactID";
                $connection->runQuery($sql);
            }
        }
    }
    echo '{ "status": "finished updating "}';
}

// if operation is add, query to add a new record to the database
else if ($op=='ADD')
{
    // Fields:   fkMentorPotentialID, ContactDate, MentorContactType, MentorContactNote, ContactPlacementMonth

    $fkMentorPotentialID = filter_input(INPUT_POST, "fkMentorPotentialID", FILTER_SANITIZE_NUMBER_INT);
    $contactDate = $conn->getRightFormat($conn->sanitize($_POST['ContactDate']));
    $mentorContactType = $connection->sanitize($_POST['MentorContactType']);
    $mentorContactType = filter_var($mentorContactType, FILTER_SANITIZE_ENCODED);
    $mentorContactNote = $conn->sanitize($_POST['MentorContactNote']);
    $contactPlacementMonth = filter_input(INPUT_POST, "ContactPlacementMonth", FILTER_SANITIZE_STRING);

    $sql = "INSERT INTO tblMentorContacts ( fkMentorPotentialID, ContactDate, MentorContactType, MentorContactNote, ContactPlacementMonth)
             VALUES ('$fkMentorPotentialID', '$contactDate', '$mentorContactType', '$mentorContactNote', '$contactPlacementMonth')";

    $connection->createRecord($sql); //This will echo a json object with the MentorContactID
}

// if operation is delete, query to delete a record from the database
else if ($op =='DELETE')
{
    $sql = " DELETE FROM tblMentorContacts
      WHERE  MentorContactID=$mentorContactID";

    $result = $connection->runDeleteQuery($sql);
}

?>
