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
echo '{ "data":' . (json_encode($result)) . "} ";

?>



