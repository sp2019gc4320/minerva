<?php
// File: getAffiliationLookup.php
// echos a JSON  array with all records in tlkpMilitaryStatus Table for PostRes Residental Tab

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "MilitaryAffiliation";
$sql = "SELECT ". $fields ." FROM tlkpMilitaryAffiliation ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>
