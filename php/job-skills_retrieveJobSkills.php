<?php
// File: retrieveJobSkills.php
// Pulls info for JobSkills from the database
// Input is a cadetID from the post function in the jobSkillsCtrl.js it will echo a JSON array back to the jobSkillsCtrl
//Programmer: Kevin Krider

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$connection = new DBController();

//A "cadetID" should be sent when calling this php file -- store this value in $curCadetID

$cadetID = $_POST['cadet']; 



//sql statement to get the first table of jobskills tasks
$sql ="SELECT DISTINCT tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task, tblCadetClassEvents.EventDate, tblCadetClassEvents.EventNote, tblCadetClassEvents.DidPass, tlkpCoreComponentTasks.CoreComponentID, tblClassDetails.fkCadetID, tblCadetClassEvents.fkTaskID
FROM (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) INNER JOIN (tlkpCoreComponentTasks INNER JOIN tblCadetClassEvents ON tlkpCoreComponentTasks.TaskID = tblCadetClassEvents.fkTaskID) ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID
WHERE (((tlkpCoreComponentTasks.CoreComponentID)=3) AND ((tblClassDetails.fkCadetID)='$cadetID'));";

//sending the sql statement
$result = $connection->runSelectQuery($sql);

//starting to build our json
echo '{ "taskTbl":[';
//format and echo our results from the first sql statment
if ($result->num_rows > 0) 
{
	$count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {
    	
    	//display comma
        if ($count >0 )
        	echo ",";
      
      	//format output as an object -- specify each field along with its value
        echo '{"TaskNumber": "' . $row["TaskNumber"]. '", "Task": "' . $row["Task"]. '", "EventDate":"' . $row["EventDate"]. '", "DidPass":"' . $row["DidPass"]. '", "EventNote":"' . $row["EventNote"]. '","fkCadetID":"' . $row["fkCadetID"]. '","fkTaskID":"' . $row["fkTaskID"]. '"}';
       
        $count = $count+1;
    }
} 

echo '],"testTbl":[';
//second sql to grab all the tests related to 2(a)

$sql ="SELECT DISTINCT tlkpTaskTests.TaskTest, tblCadetClassEvents.EventDate, tblCadetClassEvents.TestScore, tblCadetClassEvents.DidPass, tblCadetClassEvents.EventNote, tblCadetClassEvents.fkTaskID, tblClassDetails.fkCadetID, tblCadetClassEvents.fkTaskTestEventID
FROM (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) INNER JOIN (tlkpTaskTests INNER JOIN tblCadetClassEvents ON (tblCadetClassEvents.fkTaskTestEventID = tlkpTaskTests.TaskTestID) AND (tlkpTaskTests.fkTaskID = tblCadetClassEvents.fkTaskID)) ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID
WHERE (((tblCadetClassEvents.fkTaskID)=9) AND ((tblCadets.CadetID)='$cadetID'))";

$result = $connection->runSelectQuery($sql);
//format and echo our results from the second sql statment
if ($result->num_rows > 0) 
{
	$count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {
    	
    	//display comma
        if ($count >0 )
        	echo ",";
      
      	//format output as an object -- specify each field along with its value
        echo '{"TaskTest": "' . $row["TaskTest"]. '", "EventDate": "' . $row["EventDate"]. '", "Score":"' . $row["TestScore"]. '", "DidPass":"' . $row["DidPass"]. '", "EventNote":"' . $row["EventNote"]. '","fkCadetID":"' . $row["fkCadetID"]. '","fkTaskID":"' . $row["fkTaskID"]. '","fkTaskTestEventID":"' . $row["fkTaskTestEventID"]. '"}';
       
        $count = $count+1;
    }
} 

//third table and sql statment to get information about asvab scores
echo '],"asvabTbl":[';


$sql ="SELECT tblASVAB.ASVABDate, tblASVAB.ASVABTechScore, tblASVAB.AFQTScore, tblASVAB.ASVABTestNotes, tblClassDetails.fkCadetID, tblASVAB.ASVABID, tblClassDetails.ClassDetailID
FROM tblClassDetails INNER JOIN tblASVAB ON tblClassDetails.ClassDetailID = tblASVAB.fkClassDetailID
WHERE (((tblClassDetails.fkCadetID)='$cadetID'))";

$result = $connection->runSelectQuery($sql);
//format and echo our results from the third sql statment
if ($result->num_rows > 0) 
{
	$count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {
    	
    	//display comma
        if ($count >0 )
        	echo ",";
      
      	//format output as an object -- specify each field along with its value
        echo '{"ASVABDate": "' . $row["ASVABDate"]. '", "ASVABTechScore": "' . $row["ASVABTechScore"]. '", "AFQTScore":"' . $row["AFQTScore"]. '", "ASVABTestNotes":"' . $row["ASVABTestNotes"]. '","fkCadetID":"' . $row["fkCadetID"]. '","ASVABID":"' . $row["ASVABID"]. '","ClassDetailID":"' . $row["ClassDetailID"]. '"}';
       
        $count = $count+1;
    }
} 
//closing the json
echo ']} ';

//$connection->close();
?>