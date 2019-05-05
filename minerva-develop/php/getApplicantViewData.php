<?php
// File: getCadetViewData.php
// Receives a [fkCadetID] and returns information about the Cadet
// Used by
//    find-cadet.controller.js
//    cadet-helper.controller

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Default values for testing if nothing is passed as POST parameter
$ApplicantID = "11";

//Replace default with value passed in POST
if (isset($_POST['ApplicantID'])) {

    $ApplicantID = filter_input(INPUT_POST, "ApplicantID");
}

$sql = "SELECT tblApplicants.ApplicantID, tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN, tblApplicants.fkPersonID
       FROM tblPeople INNER JOIN tblApplicants ON tblPeople.PersonID = tblApplicants.fkPersonID
       WHERE  tblApplicants.ApplicantID ='" . $ApplicantID . "'";

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>



