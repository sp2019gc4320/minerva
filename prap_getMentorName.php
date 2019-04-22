<?php
// File: prap_getMentorName.php
// Receives a [MentorID] and returns Name of Person
// Used by:
//   prap_controller.js
//

require_once 'dbcontroller.php';


//Create connection
$connection = new DBController();

//default for testing
$MentorID="545";

echo '{ ';

if(isset($_POST['index'])){
    $index = filter_input(INPUT_POST, "index", FILTER_SANITIZE_NUMBER_INT);

    echo '"index" : "'.$index.'",  ';
}


if(isset($_POST['MentorID'])) {
    $MentorID = filter_input(INPUT_POST, "MentorID", FILTER_SANITIZE_NUMBER_INT);
}

$fields = "MentorID, PersonID, PersonFN, PersonLN";
$sql = "SELECT tblMentors.MentorID, tblMentors.fkPersonID,
        tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN
        FROM tblMentors JOIN tblPeople
        WHERE tblMentors.fkPersonID = tblPeople.PersonID AND
        tblMentors.MentorID= '$MentorID'";


//CHECK -- this will return fkPersonID as well as PersonID will this be a problem?
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo ' "data":' . urldecode(json_encode($result)) . "} ";

?>



