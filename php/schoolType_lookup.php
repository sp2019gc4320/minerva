<?php
// File: schoolType_lookup.php
// echos a JSON  array with all records in SchoolType Table
// Used By:
//   site-setup.component.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Create Field List
$fields = "SchoolType";
$sql = "SELECT ". $fields . " FROM tlkpSchoolType";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{ "data":' . (json_encode($result)) . "} ";

?>


