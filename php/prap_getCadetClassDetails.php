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

// This code originally would print an empty string because not all of the data
// was utf8 encoded. This fixes an array to have utf8 encoding.
// https://stackoverflow.com/questions/19361282/why-would-json-encode-return-an-empty-string
// TODO: Move this code to a more global file, in case other files encounter the
// same issue.
function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}

$sql = "SELECT * FROM tblClassDetails WHERE
        fkCadetID = '$CadetID'";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{ "data":' . (json_encode(utf8ize($result))) . "} ";

?>



