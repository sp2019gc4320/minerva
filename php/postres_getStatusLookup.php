<?php
// File: getInspectionLookup.php
// echos a JSON  array with all records in tlkpJBInspectionType Table for Lead?/Follow Residental Tab
// Used by
//  lead-follow.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "MilitaryStatus";
$sql = "SELECT ". $fields ." FROM tlkpMilitaryStatus ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>