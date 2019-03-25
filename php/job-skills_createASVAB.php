<?php
// File: job-skills_createASVAB.php
//e
// Prints JSON array

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();


if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID = $_POST['fkClassDetailID'];
}
if (isset($_POST['ASVABDate'])) {
    $ASVABDate = $_POST['ASVABDate'];
}

if (isset($_POST['ASVABTechScore'])) {
    $ASVABTechScore = $_POST['ASVABTechScore'];
}
if (isset($_POST['AFQTScore'])) {
    $AFQTScore = $_POST['AFQTScore'];
}
if (isset($_POST['ASVABTestNotes'])) {
    $ASVABTestNotes = $_POST['ASVABTestNotes'];
}

$sql = "INSERT INTO tblASVAB 
	(fkClassDetailID,   ASVABDate, AFQTScore, ASVABTechScore, ASVABTestNotes) values
	('$fkClassDetailID','$ASVABDate','$AFQTScore','$ASVABTechScore', '$ASVABTestNotes')";

$result = $conn->createRecord($sql);

//$connection->close();

?>