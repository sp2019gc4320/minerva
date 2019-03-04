<?php
// File: s2c_retrieveS2C.php
// Pulls info for Service to Community from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$connection = new DBController();

//TODO this file has not been fully tested. May not work.

//A "cadetID" should be sent when calling this php file -- store this value in $curCadetID
//$cadetID = $_POST['cadet']; 
$cadetID = '36';

$sql = "SELECT DISTINCT tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task, tblCadetClassEvents.EventDate, tblCadetClassEvents.DidPass, tblCadetClassEvents.EventNote, tblClassDetails.fkCadetID
FROM (tblClassDetails INNER JOIN tblCadetClassEvents ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID) INNER JOIN (tlkpCoreComponent INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID) ON tblCadetClassEvents.fkTaskID = tlkpCoreComponentTasks.TaskID
WHERE (((tlkpCoreComponent.CoreComponentID)=4) AND ((tblClassDetails.fkCadetID)='$cadetID'));";
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
        echo '{"TaskNumber": "' . $row["TaskNumber"]. '", "Task": "' . $row["Task"]. '", "EventDate":"' . $row["EventDate"]. '", "DidPass":"' . $row["DidPass"]. '", "EventNote":"' . $row["EventNote"]. '"}';
       
        $count = $count+1;
    }
}
echo ']} ';

?>