<?php
// File: prap_getCadetClassDetails.php
// Receives a [CadetID] and returns on necessary values of ClassDetails for Cadet
// Used by: prap_controller.js

require_once 'dbcontroller.php';


//Create connection
$connection = new DBController();

//Default value used for testing
$CadetID="12";

//Replaced with POST parameter
if(isset($_POST['CadetID'])) {
    $CadetID = filter_input(INPUT_POST, "CadetID");

}


$sql = "SELECT 
PRAPCategory, PRAPSponsorID, PRAPInitDate, PRAPCompleteDate, MenteeTrainingDate,  ShortTermGoalDate,
ShortTermGoal, IntermediateGoalDate, IntermediateGoal, LongTermGoal, LongTermGoalDate,
ClassDetailID, fkCadetID, fkClassID
FROM tblClassDetails WHERE
        fkCadetID = '$CadetID'";
$result = $connection->runSelectQueryArrayNotEncoded($sql);

// This code originally would print an empty string because not all of the data
// was utf8 encoded. This fixes an array to have utf8 encoding.
// https://stackoverflow.com/questions/19361282/why-would-json-encode-return-an-empty-string
echo '{ "data":' . urldecode(json_encode(utf8ize($result))) . "} ";


?>



