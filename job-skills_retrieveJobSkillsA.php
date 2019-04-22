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


if (isset($_POST['cadetID'])) {

    $cadetID = filter_input(INPUT_POST, 'cadetID');
}

//Create and empty array for tests
$tests = array();
$tasks = array();
$testIDs = array();
$asvabs = array();


//TASKS
$sql =
    "SELECT tblCadetClassEvents.*, tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task 
FROM
 (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID =tblClassDetails.fkCadetID) 
 INNER JOIN (tlkpCoreComponentTasks 
 INNER JOIN tblCadetClassEvents ON tlkpCoreComponentTasks.TaskID = tblCadetClassEvents.fkTaskID)
  ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID 
WHERE(((tlkpCoreComponentTasks.CoreComponentID)=3) AND ((tblClassDetails.fkCadetID)='$cadetID'))";

//sending the sql statement
$result = $connection->runSelectQuery($sql);

if ($result->num_rows > 0) {

    //Store the tasks WITHOUT any associated tests in the tasks array.
    while ($row = $result->fetch_assoc()) {

        //if fkTaskTestEventID is null, this task does NOT have tests associated with it.
        if (strlen($row['fkTaskTestEventID']) == 0)
            $tasks[] = $row;
        else {
            //Store the ID of the task that have associated tests in the testIDS array.
            if (!in_array($row['fkTaskID'], $testIDs)) {
                //Keep track of fkTaskIDs that are in a different table
                $testIDs[] = $row['fkTaskID'];

                //Store only the first task - there could be multiple tests for this task.
                $tasks[] = $row;
            }
        }
    }
}


//TESTS  Store all the tests in the tests array.
$sql =
    "SELECT tlkpCoreComponentTasks.CoreComponentID, 
tlkpCoreComponentTasks.TaskID, tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task,
tlkpTaskTests.TaskTestID, tlkpTaskTests.TaskTest, tblCadetClassEvents.* 
FROM (( tlkpCoreComponent 
INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID) 
INNER JOIN tlkpTaskTests ON tlkpCoreComponentTasks.TaskID = tlkpTaskTests.fkTaskID) 
INNER JOIN tblCadetClassEvents ON tlkpTaskTests.TaskTestID =tblCadetClassEvents.fkTaskTestEventID 
INNER JOIN tblClassDetails ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID 
WHERE (( tblClassDetails.fkCadetID = '$cadetID') AND tlkpCoreComponentTasks.CoreComponentID = 3) 
ORDER By tlkpCoreComponentTasks.TaskID, tlkpCoreComponentTasks.CoreComponentID,tlkpTaskTests.TaskTest";

//sending the sql statement
$result = $connection->runSelectQuery($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tests[] = $row;
    }
}

//ASVAB scores
$sql = "SELECT tblASVAB.*, tblClassDetails.fkCadetID, tblClassDetails.ClassDetailID
FROM tblClassDetails INNER JOIN tblASVAB ON tblClassDetails.ClassDetailID = tblASVAB.fkClassDetailID
WHERE (((tblClassDetails.fkCadetID)='$cadetID'))";

$result = $connection->runSelectQuery($sql);
//copy result into asvabs array
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $asvabs[] = $row;
    }
}


//RETURN the datea
echo '{"taskTbl":' . urldecode((json_encode($tasks))) . ', "testIDs":' . urldecode(json_encode($testIDs)) .
    ', "testTbl":' . urldecode(json_encode($tests)) . ', "asvabTbl":' .urldecode((json_encode($asvabs))) . '}';

?>