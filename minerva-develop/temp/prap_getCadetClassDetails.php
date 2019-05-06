<?php
// File: prap_getCadetClassDetails.php
// Receives a [CadetID] and returns all ClassDetails for Cadet
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


$sql = "SELECT * FROM tblClassDetails WHERE
        fkCadetID = '$CadetID'";
$result = $connection->runSelectQueryArrayNotEncoded($sql);

//calls utf8size -- originally would print an empty string because not all
// of the data was utf8 encoded. this fixes an array to utf8 encoding.
echo '{ "data":' . (json_encode(utf8ize($result))) . "} ";

?>



