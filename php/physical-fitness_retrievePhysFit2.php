<?php
// File: showPhysFit2.php
// Accesses the info needed for the Physical Fitness Page
// Prints a Json array with all info
// This file should be passed a cadetID

require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//A "cadetID" should be sent when calling this php file -- store this value in $curCadetID
//$cadetID = $_POST['cadet'];
$cadetID = "169";

//Sample sql statements
//$curCadetID = "";
//$sql = "SELECT Major, Name, Age FROM Student WHERE Major LIKE 'CSCI';

//First Query database - insert the major sent when calling this php file
//$sql = "SELECT Major, Name, Age FROM Student WHERE Major LIKE '".$userMajor."'"; //need to change this
//$result = $conn->query($sql);

//$sql = "SELECT tblCadetClassEvents.*, tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task, tblCadetClassEvents.EventDate, tblPT.PTTestNote
//FROM ((tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) INNER JOIN (tlkpCoreComponentTasks INNER JOIN tblCadetClassEvents
//ON tlkpCoreComponentTasks.TaskID = tblCadetClassEvents.fkTaskID) ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID) INNER JOIN tblPT ON tblClassDetails.ClassDetailID = tblPT.fkClassDetailID
//WHERE (((tblCadets.CadetID)='$cadetID') AND ((tlkpCoreComponentTasks.CoreComponentID)=2))";

$sql = "SELECT tblCadetClassEvents.*, tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task
FROM (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID =tblClassDetails.fkCadetID) INNER JOIN (tlkpCoreComponentTasks
INNER JOIN tblCadetClassEvents ON tlkpCoreComponentTasks.TaskID = tblCadetClassEvents.fkTaskID)
ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID WHERE(((tlkpCoreComponentTasks.CoreComponentID)=2)
AND ((tblClassDetails.fkCadetID)='$cadetID'))";
$result = $conn->runSelectQuery($sql);


//output results as a json array of objects {"value":[{"major":"CSCI", "name":"Amy", "age":"21"} ... ], "value2":[{}]}
echo '{ "taskTbl":[';
if ($result->num_rows > 0) 
{
	$count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {
    	
    	//display comma
        if ($count >0 )
        	echo ",";
      
      	//format output as an object -- specify each field along with its value
        //echo '{"taskNumber": "' . $row["TaskNumber"]. '", "task": "' . $row["Task"]. '", "date":"' . $row["EventDate"]. '", "note":"' . $row["PTTestNote"]. '"}';
        echo '{"taskNumber": "' . $row["TaskNumber"]. '", "task": "' . $row["Task"]. '", "date":"' . $row["EventDate"]. '", "DidPass":"' . $row["DidPass"]. '"}';
        $count = $count+1;
    }
} 


//Ending first json array

echo '], ';

//Second SQL query


$sql = "SELECT DISTINCT tlkpCoreComponentTasks.TaskNumber, tlkpTaskTests.TaskTest, tblPTDetails.PTDetailResult, tblPT.PTDate, tblPT.PTHeight, tblPT.PTWeight, tblPT.PTBodyFat, tblPT.PTTestNote
FROM (tlkpTaskTestEvents INNER JOIN (tlkpTaskTests INNER JOIN tlkpCoreComponentTasks ON tlkpTaskTests.fkTaskID = tlkpCoreComponentTasks.TaskID) ON tlkpTaskTestEvents.fkTaskTestID = tlkpTaskTests.TaskTestID) INNER JOIN (((tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) INNER JOIN tblPT ON tblClassDetails.ClassDetailID = tblPT.fkClassDetailID) INNER JOIN tblPTDetails ON tblPT.PTID = tblPTDetails.fkPTID) ON tlkpTaskTestEvents.TaskTestEventID = tblPTDetails.fkTaskTestEventID
WHERE (((tblCadets.CadetID)='$cadetID') AND ((tlkpCoreComponentTasks.CoreComponentID)=2))
ORDER BY tlkpCoreComponentTasks.TaskNumber";
$result = $conn->runSelectQuery($sql);



echo '"testTbl":[';
if ($result->num_rows > 0)
{
	$count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {

    	//display comma
        if ($count >0 )
        	echo ",";

      	//format output as an object -- specify each field along with its value
        echo '{"taskNumber": "' . $row["TaskNumber"]. '", "test": "' . $row["TaskTest"]. '", "result":"' . $row["PTDetailResult"]. '", "date":"' . $row["PTDate"]. '", "height":"' . $row["PTHeight"]. '", "weight":"' . $row["PTWeight"]. '","bmi":"' . $row["PTBodyFat"]. '","note":"' . $row["PTTestNote"]. '"}';

        $count = $count+1;
    }
}
//ending second json array
echo '], ';


//Third SQL query
/*
$sql = "SELECT DISTINCT tlkpCoreComponentTasks.TaskNumber, tlkpTaskTests.TaskTest
FROM tlkpTaskTestEvents INNER JOIN (tlkpTaskTests INNER JOIN (tlkpCoreComponent INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID) ON tlkpTaskTests.fkTaskID = tlkpCoreComponentTasks.TaskID) ON tlkpTaskTestEvents.fkTaskTestID = tlkpTaskTests.TaskTestID
WHERE (((tlkpCoreComponentTasks.CoreComponentID)=2))
ORDER BY tlkpCoreComponentTasks.TaskNumber, tlkpTaskTests.TaskTest";
$result = $conn->runSelectQuery($sql);

echo '"testTblAlways":[';
if ($result->num_rows > 0) 
{
	$count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {
    	
    	//display comma
        if ($count >0 )
        	echo ",";
      
      	//format output as an object -- specify each field along with its value
        echo '{"taskNumber": "' . $row["TaskNumber"]. '", "test": "' . $row["TaskTest"]. '"}';
       
        $count = $count+1;
    }
} 

//ending third json array
echo '], ';


//fourth goes here
$sql = "SELECT DISTINCT tlkpCoreComponentTasks.TaskNumber, tlkpTaskTests.TaskTest, tlkpTaskTestEvents.TaskEvent
FROM tlkpTaskTestEvents INNER JOIN (tlkpTaskTests INNER JOIN (tlkpCoreComponent INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID) ON tlkpTaskTests.fkTaskID = tlkpCoreComponentTasks.TaskID) ON tlkpTaskTestEvents.fkTaskTestID = tlkpTaskTests.TaskTestID
WHERE (((tlkpCoreComponentTasks.CoreComponentID)=2))
ORDER BY tlkpTaskTests.TaskTest";
$result = $conn->runSelectQuery($sql);

echo '"testTblOptions":[';
if ($result->num_rows > 0) 
{
	$count=0;

   // output data on each row
    while($row = $result->fetch_assoc()) {
    	
    	//display comma
        if ($count >0 )
        	echo ",";
      
      	//format output as an object -- specify each field along with its value
        echo '{"taskNumber": "' . $row["TaskNumber"]. '","taskTest": "' . $row["TaskTest"]. '", "testEvent": "' . $row["TaskEvent"]. '"}';
       
        $count = $count+1;
    }
} 

//closing json
echo '] }';

*/
$ClassDetailID = 168; //ClassDetail for Cadet Reginald harris


//1. Get all PT records where ClassDetailID matches
$sql = "SELECT * FROM tblPT  WHERE fkClassDetailID = '$ClassDetailID'";
$result = $conn->runSelectQuery($sql);


//2.  For each pt record store the relate PTDetails and TestEvent format -- this will be needed verifying data
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        //An associate array is returned.  so convert this into an object
        $physical = (object)$row;

        //Store the placementID so it can be used in subsequent queries
        $ptID = $physical->PTID;

        //Store Details
        $detailSQL = "SELECT * FROM tblPTDetails WHERE fkPTID = '$ptID'";
        $detailResult = $conn->runSelectQueryArrayNotEncoded($detailSQL);
        $physical->details = $detailResult;


        //create array to store the test type of each detail.
        $tests = array();

        $index = 0;
        $len = count($detailResult);

        //For each detail store the test type
        while ($index < $len) {
            $tempDetail = $detailResult[$index];
            $taskTestEventID = $tempDetail['fkTaskTestEventID'];

            $testSQL = "SELECT * FROM tlkpTaskTestEvents WHERE TaskTestEventID = '$taskTestEventID'";
            $testResult = $conn->runSelectQueryArrayNotEncoded($testSQL);

            //add each test to the end of the array -- there should only be one test type for each detail ptdetail
            $tests[] = $testResult[0];

            ++$index;
        }

        $physical->tests = $tests;

        //add physical object to data array
        $data[] = $physical;
    }
}

echo ' "data":' . (json_encode($data)) . ' } ';

?>