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
$fkCadetID = "361";

//Replace default with value passed in POST
if (isset($_POST['fkCadetID'])) {

    $fkCadetID = filter_input(INPUT_POST, "fkCadetID",FILTER_SANITIZE_STRING);
}

$sql = "SELECT tblCadets.CadetID, tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN, tblPeople.PDOB, tblPeople.PGender, tblCadets.fkPersonID
       FROM tblPeople INNER JOIN tblCadets ON tblPeople.PersonID = tblCadets.fkPersonID
       WHERE  (((tblCadets.CadetID)='" . $fkCadetID . "'))";

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>



