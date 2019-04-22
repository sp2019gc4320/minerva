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
    //$ASVABDate = $_POST['ASVABDate'];
    $ASVABDate =$conn->getRightFormat($conn->sanitize($_POST['ASVABDate']));
}

if (isset($_POST['ASVABTechScore'])) {
    //$ASVABTechScore = $_POST['ASVABTechScore'];
    $ASVABTechScore = filter_input(INPUT_POST,'ASVABTechScore',FILTER_SANITIZE_NUMBER_INT);

}
if (isset($_POST['AFQTScore'])) {
    //$AFQTScore = $_POST['AFQTScore'];
    $AFQTScore = filter_input(INPUT_POST,'AFQTScore',FILTER_SANITIZE_NUMBER_INT);
}
if (isset($_POST['ASVABTestNotes'])) {
    //$ASVABTestNotes = $_POST['ASVABTestNotes'];
    $ASVABTestNotes =$conn->sanitize($_POST['ASVABTestNotes']);//NOTE!!!!!!!
    $ASVABTestNotes=filter_var($ASVABTestNotes,FILTER_SANITIZE_ENCODED);
}

$sql = "INSERT INTO tblASVAB 
	(fkClassDetailID,   ASVABDate, AFQTScore, ASVABTechScore, ASVABTestNotes) values
	('$fkClassDetailID','$ASVABDate','$AFQTScore','$ASVABTechScore', '$ASVABTestNotes')";

$result = $conn->createRecord($sql);

//$connection->close();

?>