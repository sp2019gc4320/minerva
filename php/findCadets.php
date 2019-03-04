<?php
// File: findCadets.php
// echos a JSON  array with all records
//  Used by:
//   utility/find-cadet/find-cadet.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Create Field List
$fields = "PersonFN, PersonLN, fkClassID, CadetRosterNumber, fkCadetID, fkMentorID";
$sql = "SELECT tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN, tblClassDetails.fkCadetID, tblClassDetails.ClassDetailID, tblClassDetails.fkClassID, tblClassDetails.CadetRosterNumber, tblMentorPotential.fkMentorID ";
$sql =  $sql." FROM tblMentorPotential RIGHT JOIN (tblPeople INNER JOIN (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) ON tblMentorPotential.fkClassDetailID = tblClassDetails.ClassDetailID";

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>




