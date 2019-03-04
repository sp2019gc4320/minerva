<?php
// File: citizenship_get.php
// Used by core-components/citizenship/citizenship.controller.js
// Pulls info for Citizenship from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$connection = new DBController();

//A "cadetID" should be sent when calling this php file -- store this value in $curCadetID
$cadetID = $_POST['cadet']; 
//$cadetID = '361';

$sql = "SELECT DISTINCT tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task, tblCadetClassEvents.EventDate, tblCadetClassEvents.DidPass, tblCadetClassEvents.EventNote, tblClassDetails.fkCadetID, tblCadetClassEvents.fkTaskID
FROM (tblClassDetails INNER JOIN tblCadetClassEvents ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID) INNER JOIN (tlkpCoreComponent INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID) ON tblCadetClassEvents.fkTaskID = tlkpCoreComponentTasks.TaskID
WHERE (((tlkpCoreComponent.CoreComponentID)=6) AND ((tblClassDetails.fkCadetID)='$cadetID'));";
$result = $connection->runSelectQuery($sql);

echo '{ "taskTbl":[';
//print_r($result);
if ($result->num_rows > 0) 
{
	$count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {
    	
    	//display comma
        if ($count >0 )
        	echo ",";
      
      	//format output as an object -- specify each field along with its value
        echo '{"TaskNumber": "' . $row["TaskNumber"]. '", "Task": "' . $row["Task"]. '", "EventDate":"' . $row["EventDate"]. '", "DidPass":"' . $row["DidPass"]. '", "EventNote":"' . $row["EventNote"]. '", "fkTaskID":"' . $row["fkTaskID"]. '", "fkCadetID":"' . $row["fkCadetID"].'"}';
       
        $count = $count+1;
    }
 }
echo '],';

$sql = "SELECT tblClassDetails.ClassDetailID,tblClassDetails.fkCadetID, tblCadetClassEvents.fkTaskID, tblCadetClassEvents.fkTaskTestEventID, tlkpCoreComponentTasks.CoreComponentID, tblCadetClassEvents.EventDate, tblCadetClassEvents.EventNote, tblCadetClassEvents.DidPass, tblCadetClassEvents.TestScore, tlkpTaskTests.TaskTest, tlkpTaskTests.IsActive, tlkpTaskTests.TaskTestID
FROM (tlkpCoreComponent INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID) INNER JOIN (tlkpTaskTests INNER JOIN (tblClassDetails INNER JOIN tblCadetClassEvents ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID) ON (tblCadetClassEvents.fkTaskTestEventID = tlkpTaskTests.TaskTestID) AND (tlkpTaskTests.fkTaskID = tblCadetClassEvents.fkTaskID)) ON tlkpCoreComponentTasks.TaskID = tlkpTaskTests.fkTaskID
WHERE (((tblClassDetails.fkCadetID)='$cadetID') AND ((tlkpCoreComponentTasks.CoreComponentID)=6));";
$result = $connection->runSelectQuery($sql);

echo ' "testTbl":[';
//print_r($result);
if ($result->num_rows > 0) 
{
    $count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {
        
        //display comma
        if ($count >0 )
            echo ",";
      
        //format output as an object -- specify each field along with its value
        echo '{"TaskTestID": "' . $row["TaskTestID"]. '","TaskTest": "' . $row["TaskTest"]. '", "EventDate": "' . $row["EventDate"]. '", "DidPass":"' . $row["DidPass"]. '", "TestScore":"' . $row["TestScore"]. '", "EventNote":"' . $row["EventNote"]. '", "fkTaskTestEventID":"' . $row["fkTaskTestEventID"]. '", "ClassDetailID":"' . $row["ClassDetailID"]. '", "fkTaskID": "' . $row["fkTaskID"]. '"}';
       
        $count = $count+1;
    }
}

 
echo ']} ';


//$connection->close();
?>