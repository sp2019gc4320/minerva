<?php
// File: getPositionlookup.php
// echos a JSON  array with all records in tlkpJBPosition Table for Lead/Follow Residental Tab
// Used by:
//   lead-follow.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "JBPosition";
$sql = "SELECT ". $fields ." FROM tlkpJBPosition";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} "

?>


