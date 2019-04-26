<?php
// File: postres_getPRReporterCategory.php
// echos a JSON  array with all records in PRReporterCategory column in tblPRReports for postres Category dropdown
// Used by:
//   prap.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "PRReporterCategory";
$sql = "SELECT DISTINCT ". $fields ." FROM tblPRReports";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . urldecode(json_encode($result)) . "} "

?>