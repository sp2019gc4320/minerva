<?php
// File: retrieveLeadFollow.php
// Pulls info for Lead/Follow from the database 
//(includes JBDuties,JBInspections,JBPositions,and JBRanks)
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$connection = new DBController();

//A "cadetID" should be sent when calling this php file
$cadetID = $connection->sanitize($_POST['cadet']);

//query for tasks
$sql = "SELECT tblClassDetails.ClassDetailID, tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task, tblCadetClassEvents.EventDate, tblCadetClassEvents.DidPass, tblCadetClassEvents.EventNote, tblClassDetails.fkCadetID, tblCadetClassEvents.fkTaskID
FROM (tblClassDetails INNER JOIN tblCadetClassEvents ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID) INNER JOIN (tlkpCoreComponent INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID) ON tblCadetClassEvents.fkTaskID = tlkpCoreComponentTasks.TaskID
WHERE (((tlkpCoreComponent.CoreComponentID)=7) AND ((tblClassDetails.fkCadetID)='$cadetID'))";
$result = $connection->runSelectQuery($sql);

echo '{ "taskTbl":[';
if ($result->num_rows > 0) 
{
	$count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) 
    {
    	
    	//display comma
        if ($count >0 )
        	echo ",";
      
      	//format output as an object
        echo '{"ClassDetailID": "' . $row["ClassDetailID"]. '","TaskNumber": "' . $row["TaskNumber"]. '", "Task": "' . $row["Task"]. '", "EventDate":"' . $row["EventDate"]. '", "DidPass":"' . $row["DidPass"]. '", "EventNote":"' . urldecode($row["EventNote"]). '", "fkCadetID":"' . $row["fkCadetID"]. '", "fkTaskID":"' . $row["fkTaskID"]. '"}';
       
        $count = $count+1;
    }
} 

echo '], ';

//query for duties
$duties ="SELECT tblJBDuties.DutyPositionID, tblJBDuties.fkClassDetailID, tblJBDuties.JobPosition, tblJBDuties.DutyStartDate, tblJBDuties.DutyEndDate, tblJBDuties.DutyNote, tblJBDuties.DutyDidFail, tblClassDetails.fkCadetID
FROM tblJBDuties INNER JOIN tblClassDetails ON tblJBDuties.fkClassDetailID=tblClassDetails.ClassDetailID
WHERE
tblClassDetails.fkCadetID = '$cadetID'";

$result = $connection->runSelectQuery($duties);

echo ' "dutiesTbl":[';
if ($result->num_rows > 0) 
{
    $count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) 
    {
        
        //display comma
        if ($count >0 )
            echo ",";
      
        //format output as an object
        echo '{"DutyPositionID": "' . $row["DutyPositionID"]. '", "fkClassDetailID": "' . $row["fkClassDetailID"]. '", "JobPosition":"' . $row["JobPosition"]. '", "DutyStartDate":"' . $row["DutyStartDate"]. '", "DutyEndDate":"' . $row["DutyEndDate"]. '", "DutyNote":"' . urldecode($row["DutyNote"]). '", "fkCadetID":"' . $row["fkCadetID"]. '", "DutyDidFail":"' . $row["DutyDidFail"]. '"}';
       
        $count = $count+1;
    }
} 
echo '], ';

//query for inspections
$inspections ="SELECT tblJBInspections.JBInspectionID, tblJBInspections.fkClassDetailID, tblJBInspections.InspectionDate, tblJBInspections.JBInspectionType, tblJBInspections.InspectionNote, tblJBInspections.DidPassInspection, tblJBInspections.InspMeritAdj, tblClassDetails.fkCadetID
FROM tblJBInspections INNER JOIN tblClassDetails ON tblJBInspections.fkClassDetailID=tblClassDetails.ClassDetailID
WHERE
tblClassDetails.fkCadetID='$cadetID'";
$result = $connection->runSelectQuery($inspections);

echo ' "inspectionsTbl":[';
if ($result->num_rows > 0) 
{
    $count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) 
    {
        
        //display comma
        if ($count >0 )
            echo ",";
      
        //format output as an object
        echo '{"JBInspectionID": "' . $row["JBInspectionID"]. '", "fkClassDetailID": "' . $row["fkClassDetailID"]. '", "InspectionDate":"' . $row["InspectionDate"]. '", "JBInspectionType":"' . $row["JBInspectionType"]. '", "InspectionNote":"' . urldecode($row["InspectionNote"]). '", "DidPassInspection":"' . $row["DidPassInspection"]. '", "fkCadetID":"' . $row["fkCadetID"]. '", "InspMeritAdj":"' . $row["InspMeritAdj"]. '"}';
       
        $count = $count+1;
    }
} 
echo '], ';

//query for positions
echo ' "positionTbl":[';
$pos ="SELECT tblClassDetails.fkCadetID, tblJBPositions.PositionID,
tblJBPositions.fkClassDetailID, tblJBPositions.JBPosition, tblJBPositions.PosStartDate, tblJBPositions.PosEndDate, tblJBPositions.PosNote, tblJBPositions.PosDidFail
FROM tblJBPositions INNER JOIN tblClassDetails ON tblJBPositions.fkClassDetailID=tblClassDetails.ClassDetailID
WHERE tblClassDetails.fkCadetID='$cadetID'";
$result = $connection->runSelectQuery($pos);

if ($result->num_rows > 0) 
{
    $count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) 
    {
        
        //display comma
        if ($count >0 )
            echo ",";
      
        //format output as an object
        echo '{"fkCadetID": "' . $row["fkCadetID"]. '", "PositionID": "' . $row["PositionID"]. '", "fkClassDetailID":"' . $row["fkClassDetailID"]. '", "JBPosition":"' . $row["JBPosition"]. '", "PosStartDate":"' . $row["PosStartDate"]. '", "PosEndDate":"' . $row["PosEndDate"]. '", "PosNote":"' . urldecode($row["PosNote"]). '", "PosDidFail":"' . $row["PosDidFail"]. '"}';
       
        $count = $count+1;
    }
} 
echo '], ';

//query for rank
echo ' "rankTbl":[';
$ranks ="SELECT tblClassDetails.fkCadetID, tblJBRanks.JBRankID, tblJBRanks.fkClassDetailID, tblJBRanks.JBRank, tblJBRanks.RankObtainedDate, tblJBRanks.RankPromotionNote, tblJBRanks.RankDidFail
FROM tblJBRanks INNER JOIN tblClassDetails ON tblJBRanks.fkClassDetailID=tblClassDetails.ClassDetailID
WHERE
tblClassDetails.fkCadetID='$cadetID'";
$result = $connection->runSelectQuery($ranks);

if ($result->num_rows > 0) 
{
    $count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) 
    {
        
        //display comma
        if ($count >0 )
            echo ",";
      
        //format output as an object
        echo '{"fkCadetID": "' . $row["fkCadetID"]. '", "JBRankID": "' . $row["JBRankID"]. '", "fkClassDetailID":"' . $row["fkClassDetailID"]. '", "JBRank":"' . $row["JBRank"]. '", "RankObtainedDate":"' . $row["RankObtainedDate"]. '", "RankPromotionNote":"' . urldecode($row["RankPromotionNote"]). '", "RankDidFail":"' . $row["RankDidFail"]. '"}';
       
        $count = $count+1;
    }
} 

echo ']} ';

//$connection->close();
?>