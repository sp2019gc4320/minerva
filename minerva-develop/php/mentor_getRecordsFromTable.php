<?php

// File: mentor_getRecordsFromTable.php
// Used By
//  updateMentorCtrl.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Default value for testing
$CadetID = 406;

//Replace default value with POST parameter
if(isset($_POST['CadetID'])){
    $CadetID = filter_input(INPUT_POST, "CadetID");
    }

  $sql = "SELECT tblMentorPotential.*,
          tblClassDetails.ClassDetailID, tblClassDetails.fkCadetID, tblClassDetails.fkClassID,tblClassDetails.MenteeTrainingDate,
          tblClassDetails.EnrollmentZip,
          tblPeople.PersonFN, tblPeople.PersonLN, tblPeople.PZip, tblPeople.PersonID
          FROM tblMentorPotential JOIN tblClassDetails JOIN tblMentors JOIN tblPeople
          WHERE
          tblClassDetails.ClassDetailID = tblMentorPotential.fkClassDetailID AND
          tblMentorPotential.fkMentorID = tblMentors.MentorID AND
          tblPeople.PersonID = tblMentors.fkPersonID AND
          tblClassDetails.fkCadetID = $CadetID
          ";

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";

?>