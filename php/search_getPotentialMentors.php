<?php
//File: search_getPotentialMentors.php
// Used By
//   searchMentorViewCtrl.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Testing values:
$PersonID = 223;
$PersonID = 312;

//Defaults are replaced by POST parameters
if (isset($_POST['PersonID'])) {
    $PersonID = filter_input(INPUT_POST, "PersonID");
}

$sql = "SELECT DISTINCTROW tblPeople.PersonID, Max(tblMentorPotential.MTrainedDate) AS LastTrainedDate, tblPeople.PersonLN, tblPeople.PersonFN ,
   tblPeople.PCounty, tblPeople.PGender, tblPeople.PersonGenQual, tblMentors.IsPooled
    FROM tblPeople INNER JOIN (tblMentors INNER JOIN tblMentorPotential ON tblMentors.MentorID = tblMentorPotential.fkMentorID)
    ON tblPeople.PersonID = tblMentors.fkPersonID
  GROUP BY tblPeople.PersonID, tblMentorPotential.MTrainedDate
  ORDER BY tblPeople.PersonID DESC , Max(tblMentorPotential.MTrainedDate) DESC , tblMentorPotential.MTrainedDate DESC
          ";

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{ "potentials":' . (json_encode($result)) . "} ";

?>