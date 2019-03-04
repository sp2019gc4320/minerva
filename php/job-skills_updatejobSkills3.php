<?php
// File: updatejobSkills3.php
// Updates info (for the 3rd table in the jobskills view) in the database by sending a sql update statment. 
// Input:  all info from table and cadet id in order to form sql statment.
// Output: none
//Programmer: Kevin Krider
//Known Error: cannot create new record for ASVAB scores, only update existing. 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();


//these values should be sent when calling this php file -- store this value in $valueName = $_POST['valueName'];
$ASVABDate = $_POST['ASVABDate']; 
$ASVABTechScore= $_POST['ASVABTechScore'];
$AFQTScore= $_POST['AFQTScore'];
$ASVABTestNotes= $_POST['ASVABTestNotes'];
$ASVABID= $_POST['ASVABID'];
$fkCadetID= $_POST['fkCadetID'];

//Setting the sql statment to update the 3rd table up
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
 
  
 
//sending the prepared sql statement
$result = $conn->runQuery($sql);

?>