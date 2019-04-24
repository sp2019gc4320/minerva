<?php 

require_once 'dbcontroller.php';
$db = new DBController();

$query = "SELECT * FROM tblApplicants";
$results = $db->runSelectQueryArray($query);

echo json_encode($results);

?>
