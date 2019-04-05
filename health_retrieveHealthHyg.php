<?php
// File: health_retrieveHealthHyg.php
// Pulls info for Health/Hyg from the database
// Prints JSON array
// Needs CadetID
// Used By:
//    health/health.controller.js


//connect to db controller
require_once 'dbcontroller.php';

//create connection
$connection = new DBController();

//A "cadetID" should be sent when calling this php file -- store this value in $curCadetID
$cadetID = $connection->sanitize($_POST['cadet']);
//$cadetID = '361';

$sql = "SELECT tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task, tblCadetClassEvents.EventDate, tblCadetClassEvents.DidPass, tblCadetClassEvents.EventNote, tblClassDetails.fkCadetID, tblCadetClassEvents.fkTaskID
FROM (tblClassDetails INNER JOIN tblCadetClassEvents ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID) INNER JOIN (tlkpCoreComponent INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID) ON tblCadetClassEvents.fkTaskID = tlkpCoreComponentTasks.TaskID
WHERE (((tlkpCoreComponent.CoreComponentID)=5) AND ((tblClassDetails.fkCadetID)='$cadetID'))";
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
        echo '{"TaskNumber": "' . $row["TaskNumber"]. '", "Task": "' . $row["Task"]. '", "EventDate":"' . $row["EventDate"]. '", "DidPass":"' . $row["DidPass"]. '", "EventNote":"' . $row["EventNote"]. '", "fkCadetID":"' . $row["fkCadetID"]. '", "fkTaskID":"' . $row["fkTaskID"]. '"}';
       
        $count = $count+1;
    }
} 
echo ']} ';

//$connection->close();
?>

