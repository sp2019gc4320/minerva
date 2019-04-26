<?php
// File: getReportLookup.php
// echos a JSON  array with all records in tblprreports Table for postres PRReportType Tab
// Used by
//  postres.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "PREdSchoolType";
$sql = "SELECT DISTINCT ". $fields ." FROM tblpreducation";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . urldecode(json_encode($result)) . "} ";
?>


