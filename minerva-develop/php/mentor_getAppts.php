<?php
//File: mentor_getAppts.php
//Used by
//  updateMentorCtrl.js
//  peopleViewCtrl.js (commented out)

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Default value for testing
$MentorPotentialID = 77;

//Replace with value from POST parameter
if (isset($_POST['MentorPotentialID'])) {
    $MentorPotentialID = filter_input(INPUT_POST, "MentorPotentialID");
}

$sql = "SELECT tblMentorAppts.*
          FROM tblMentorAppts
          WHERE
          fkMentorPotentialID= '$MentorPotentialID'
          ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";

?>