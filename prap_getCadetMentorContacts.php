<?php
// File: prap_getCadetMentorContacts.php
// Receives a [CadetID] and returns all of the Mentor Contacts
// Used by:
//  prap_controller.js


require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//default for testing
$CadetID="12";

if(isset($_POST['CadetID'])) {
    $CadetID = filter_input(INPUT_POST, "CadetID", FILTER_SANITIZE_NUMBER_INT);
}

//Create Field List
$fields = "fkMentorID, ClassDetailID, CadetID, MentorContactID, ContactDate, MentorContactType, MentorContactNote, ContactPlacementMonth";

$sql = "SELECT tblClassDetails.ClassDetailID AS ClassDetailID, tblClassDetails.fkCadetID AS CadetID,
        tblMentorPotential.fkClassDetailID, tblMentorPotential.MentorPotentialID, tblMentorPotential.fkMentorID,
        tblMentorContacts.MentorContactID,tblMentorContacts.fkMentorPotentialID, tblMentorContacts.ContactDate,
        tblMentorContacts.MentorContactType, tblMentorContacts.MentorContactNote, tblMentorContacts.ContactPlacementMonth
        FROM  tblClassDetails JOIN tblMentorPotential JOIN tblMentorContacts
        WHERE
        tblClassDetails.fkCadetID= '$CadetID' AND
        tblClassDetails.ClassDetailID=tblMentorPotential.fkClassDetailID AND
        tblMentorPotential.MentorPotentialID=tblMentorContacts.fkMentorPotentialID";

    $result = $connection->runSelectQueryArrayNotEncoded($sql);
    echo '{ "data":' . urldecode(json_encode($result)) . "} ";
?>



