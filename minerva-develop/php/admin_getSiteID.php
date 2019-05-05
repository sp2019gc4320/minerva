<?php

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Create Field List
$fields = "SiteID";
$sql = "SELECT ". $fields . " FROM tlkpSite";
$result = $connection->runSelectQuery($sql);
echo '{ "data":[';
$connection->display($result,$fields);
echo '] }';
?>