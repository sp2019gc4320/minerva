<?php
// File: findLookups.php
// Used by:
//   website-dropdown.component.js

require_once 'dbcontroller.php';


//Create connection
$connection = new DBController();

$sql = "SELECT TableName, Category, Description, Data, Structure FROM  tlkpWebsiteLookups ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";

?>


