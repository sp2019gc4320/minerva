<?php
// File: getReportLookup.php
// echos a JSON  array with all records in tblprreports Table for postres PRReportType Tab
// Used by
//  postres.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "PREdStatus";
$sql = "SELECT DISTINCT ". $fields ." FROM tlkppreducationstatus";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>


