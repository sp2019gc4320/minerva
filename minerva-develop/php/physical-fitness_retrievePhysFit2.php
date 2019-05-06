<?php
// File: retrievePhysFit2
// Accesses the info needed for the Physical Fitness Page
// Prints a Json array with all info
// This file should be passed a cadetID

require_once 'dbcontroller.php';

//create connection
$conn = new DBController();
$tests = array();
$tasks = array();
$PTDetails = array();

//A "cadetID" should be sent when calling this php file -- store this value in $CadetID
$cadetID = $_POST['cadet'];


$sql = "SELECT tblCadetClassEvents.*, tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task
FROM (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID =tblClassDetails.fkCadetID) INNER JOIN (tlkpCoreComponentTasks
INNER JOIN tblCadetClassEvents ON tlkpCoreComponentTasks.TaskID = tblCadetClassEvents.fkTaskID)
ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID WHERE(((tlkpCoreComponentTasks.CoreComponentID)=2)
AND ((tblClassDetails.fkCadetID)='$cadetID'))";
$result = $conn->runSelectQuery($sql);
if ($result->num_rows > 0) {

    //Store the tasks WITHOUT any associated tests in the tasks array.
    while ($row = $result->fetch_assoc())
    {
            $tasks[] = $row;
    }
}

$tempSQL = "SELECT tblClassDetails.ClassDetailID FROM (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID =tblClassDetails.fkCadetID) WHERE tblCadets.CadetID = '$cadetID'";
$tempResult = $conn->runSelectQuery($tempSQL);

if($tempResult->num_rows > 0) {
    while ($row = $tempResult->fetch_assoc()) {
        $physical = (object)$row;

        //Store the placementID so it can be used in subsequent queries
        $ClassDetailID = $physical->ClassDetailID;


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
                $PTDetails[] = $detailResult;


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
    }
}

echo '{"tasks":' . (json_encode($tasks)) . ' , "data":' . (json_encode($data)) . ',"PTDetails":' . (json_encode($PTDetails)) . '}';

?>
