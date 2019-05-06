<?php
// File: getRecordsForSite.php
// Receives a [CadetID] and returns all ClassDetails for Cadet
// Used by
//   site/lookups/lookup-details.controller.js
//   admin/site-dropdown/dropdown-helper.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//Default values  used for testing
$TableName = 'tlkpApplicationFiles';

//Replace Default values with POST parameters
if (isset($_POST['TableName'])) {
    $TableName = filter_input(INPUT_POST, "TableName");
}


$sql = "SELECT * FROM $TableName";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";

?>
