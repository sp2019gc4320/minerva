<?php
// File: postRes_Position.php
// echos a JSON  array with all records in  Table tblJBPositions
// Used By:
//   lead-follow.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Create Field List
$fields = filter_var($_POST["JBPosition"], FILTER_SANITIZE_STRING);

$sql = "SELECT ". $fields . " FROM tblJBPositions";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{ "data":' . urldecode(json_encode($result)) . "} ";

?>

