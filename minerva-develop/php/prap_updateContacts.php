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
    $mentorContactID = filter_input(INPUT_POST, "MentorContactID");
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
                $fieldName1 = $_POST[$fieldName];
                $fieldName1 = str_replace('"', "'", $fieldName1);
                $fieldName1 = str_replace("\\", "/", $fieldName1);
                $fieldValue = filter_var($fieldName1,FILTER_SANITIZE_ENCODED);
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

    $fkMentorPotentialID = filter_input(INPUT_POST, "fkMentorPotentialID");
    $contactDate = filter_input(INPUT_POST, "ContactDate");
    $mentorContactType1 = $_POST['MentorContactType'];
    $mentorContactType1 = str_replace('"', "'", $mentorContactType1);
    $mentorContactType1 = str_replace("\\", "/", $mentorContactType1);
    $mentorContactType = filter_var($mentorContactType1,FILTER_SANITIZE_ENCODED);

    $mentorContactNote1 = $_POST['MentorContactNote'];
    $mentorContactNote1 = str_replace('"', "'", $mentorContactNote1);
    $mentorContactNote1 = str_replace("\\", "/", $mentorContactNote1);
    $mentorContactNote = filter_var($mentorContactNote1,FILTER_SANITIZE_ENCODED);

    $contactPlacementMonth = filter_input(INPUT_POST, "ContactPlacementMonth");

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
