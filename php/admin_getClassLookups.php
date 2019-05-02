<?php 

require_once "dbcontroller.php";
$db = new DBController();

$query = "SELECT * FROM tlkpClassPhase";
$result = $db->runSelectQueryArray($query);
echo json_encode($result);

?>
