<?php
// File: getPersonName.php
// Receives a [PersonID] and returns Name of Person
//

require_once 'dbcontroller.php';


//Create connection
$connection = new DBController();

$PersonID="1339";

echo '{ ';

if(isset($_POST['index'])){
    $index = filter_input(INPUT_POST, "index", FILTER_SANITIZE_NUMBER_INT);

       echo '"index" : "'.$index.'",  ';
}

if(isset($_POST['PersonID'])){
    $PersonID = filter_input(INPUT_POST, "PersonID", FILTER_SANITIZE_NUMBER_INT);
}

//Create Field List
$fields = "PersonID, PersonFN, PersonLN";
$sql = "SELECT tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN FROM tblPeople  WHERE  tblPeople.PersonID = '$PersonID'";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo ' "data":' . urldecode(json_encode($result)) . "} ";
?>



