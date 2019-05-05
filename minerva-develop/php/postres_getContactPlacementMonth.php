<?php
// File: postres_getContactPlacementMonth.php
// echos a JSON  array with all records in ContactPlacementMonth column in tblMentorContacts for postres mentor contact placement month dropdown
// Used by:
//   prap.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "ContactPlacementMonth";
$sql = "SELECT DISTINCT ". $fields ." FROM tblMentorContacts";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . urldecode(json_encode($result)) . "} "

?>