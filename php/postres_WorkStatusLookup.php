<?php
// File: getAffiliationLookup.php
// echos a JSON  array with all records in tlkpMilitaryStatus Table for PostRes Residental Tab

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "WorkStatus";
$sql = "SELECT ". $fields ." FROM tlkpworkstatus ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>