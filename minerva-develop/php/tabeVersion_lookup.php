<?php
// File: tabeVersion_lookup.php
// echos a JSON  array with all records in SchoolType Table
// Used By
//   site-setup.component.js


require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//Create Field List
$fields = "TABEVersion";
$sql = "SELECT ". $fields . " FROM tlkpTABEVersion";
$result = $connection->runSelectQuery($sql);

//Create JSON Element with a field named value: that contains an array of JSON objects
echo '{ "data":[';
$connection->display($result,$fields);
echo '] }';
?>


