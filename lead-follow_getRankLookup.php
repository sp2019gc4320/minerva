<?php
// File: getRankLookup.php
// echos a JSON  array with all records in tlkpJBRank Table for Lead/Follow Residental Tab
//  Used by
//    lead-follow.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "RankObtained";
$sql = "SELECT " . $fields . " FROM tlkpJBRank";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";

?>


