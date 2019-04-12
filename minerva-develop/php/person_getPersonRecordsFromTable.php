<?php
//File: person_getPersonRecordsFromTable.php
// Used By
//   case-manager/cadet-mentor/peopleViewCtrl.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Testing Values for Peson id
$PersonID = 223; //Raymond Cooper
$PersonID = 693; //Cedric Hunter


if (isset($_POST['PersonID'])) {
    $PersonID = filter_input(INPUT_POST, "PersonID");
}

$sql = "  SELECT tblPeople.*
          FROM tblPeople
          WHERE
          PersonID = '$PersonID'
          ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"person":' . (json_encode($result)) . ", ";


$sql = "SELECT tblPersonContacts.*
        FROM tblPersonContacts
        WHERE
        fkPersonID = '$PersonID'
       ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo ' "contacts":' . (json_encode($result)) . ", ";


$sql = "SELECT tblPersonRace.RaceID, tlkpRace.Race
        FROM tblPersonRace INNER JOIN tlkpRace ON
               tblPersonRace.RaceID = tlkpRace.RaceID
        WHERE fkPersonID = '$PersonID'
        ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo ' "races":' . (json_encode($result)) . ", ";

$sql = "SELECT tblPeopleAddresses.*
        FROM tblPeopleAddresses
        WHERE
        fkPersonID = '$PersonID'
        ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo ' "addresses":' . (json_encode($result)) . "} ";
?>