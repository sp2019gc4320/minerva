<?php
// File: postres_getPlacementType.php
// echos a JSON  array with all records in PRMiscPlacementType column in tblPRMisc for postres misc placement type dropdown
// Used by:
//   prap.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "PRMiscPlacementType";
$sql = "SELECT DISTINCT ". $fields ." FROM tblPRMisc";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . urldecode(json_encode($result)) . "} "

?>