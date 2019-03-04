<?php
// File: updatejobSkills2.php
// Updates info (for the 2nd table in the jobskills view) in the database by sending a sql update statment. 
// Input:  all info from table and cadet id in order to form sql statment.
// Output: none
//Programmer: Kevin Krider

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//these values should be sent when calling this php file -- store this value in $valueName = $_POST['valueName'];
$fkCadetID = $_POST['fkCadetID']; 
$EventDate= $_POST['EventDate'];
$DidPass= $_POST['DidPass'];
$EventNote= $_POST['EventNote'];
$fkTaskID= $_POST['fkTaskID'];
$TaskTest= $_POST['TaskTest'];
$Score= $_POST['Score']; 
$fkTaskTestEventID= $_POST['fkTaskTestEventID'];

 //sql statment to update the 2 nd table
 $sql = "UPDATE
	tblCadetClassEvents 
	INNER JOIN tblClassDetails ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID
SET
   EventDate = '$EventDate',
  DidPass = '$DidPass',
  EventNote = '$EventNote',
  TestScore ='$Score'
WHERE
  tblClassDetails.fkCadetID = '$fkCadetID'
  AND tblCadetClassEvents.fkTaskTestEventID = '$fkTaskTestEventID'";
 
  
 
//sending the statement
$result = $conn->runQuery($sql);

?>