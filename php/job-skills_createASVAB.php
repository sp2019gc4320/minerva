<?php
// File: createASVAB.php
//e
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$fkClassDetailID = $_POST['fkClassDetailID'];
$ASVABDate = $_POST['ASVABDate']; 
$ASVABTechScore= $_POST['ASVABTechScore'];
$AFQTScore= $_POST['AFQTScore'];
$ASVABTestNotes= $_POST['ASVABTestNotes'];
$ASVABID= $_POST['ASVABID'];
$fkCadetID= $_POST['fkCadetID'];
/*
$sql = "UPDATE
	tblASVAB 
	INNER JOIN tblClassDetails ON tblClassDetails.ClassDetailID = tblASVAB.fkClassDetailID
SET
   ASVABDate = '$ASVABDate',
   AFQTScore = '$AFQTScore',
  ASVABTechScore = '$ASVABTechScore',
  ASVABTestNotes = '$ASVABTestNotes'
  
WHERE
  tblClassDetails.fkCadetID = '$fkCadetID' AND tblASVAB.ASVABID = '$ASVABID'";
*/
$sql = "INSERT INTO tblASVAB 
	(fkCadetID,ASVABDate,AFQTScore,ASVABTechScore,ASVABTestNotes,fkClassDetailID) values('$fkCadetID','$ASVABDate','$AFQTScore','$ASVABTechScore', '$ASVABTestNotes','$fkClassDetailID')";
	    

//echo($sql);

$result = $conn->createRecord($sql);

//$connection->close();

?>