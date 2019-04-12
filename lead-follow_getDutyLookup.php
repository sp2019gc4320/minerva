<?php
// File: getDutyLookup.php
// echos a JSON  array with all records in tlkpJBDutyPosition Table for Lead/Follow Resdiental Tab
// Used By:
//   lead-follow.controller.js


require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();



//Create Field List
$fields = "DutyPosition";
$sql = "SELECT ". $fields ." FROM tlkpJBDutyPosition";

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>


