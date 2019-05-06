<?php
// File: prap_getCategory.php
// echos a JSON  array with all records in tblClassDetails Table for PRAP Action plan and Goals
// Used by:
//   prap.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "PRAPCategory";
$sql = "SELECT DISTINCT ". $fields ." FROM tblClassDetails";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . urldecode(json_encode($result)) . "} "

?>
