<?php
// File: getAffiliationLookup.php
// echos a JSON  array with all records in tlkpMilitaryStatus Table for PostRes Residental Tab

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "WageType";
$sql = "SELECT ". $fields ." FROM tlkpprempwagetype ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>