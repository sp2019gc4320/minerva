<?php 

require_once "dbcontroller.php"
$db = new DBController();

$query = "SELECT * FROM tlkpClassPhase";
$result = $db->runSelectQueryArray($query);
return json_encode($result);

?>
