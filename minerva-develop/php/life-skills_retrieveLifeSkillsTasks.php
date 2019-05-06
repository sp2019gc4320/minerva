<?php
/**
 * Created by PhpStorm.
 * User: ryanraitz
 * Date: 2019-04-30
 * Time: 23:14
 */
require_once 'dbcontroller.php';

//create connection
$connection = new DBController();

if (isset($_POST['cadetID'])) {

    $cadetID = filter_input(INPUT_POST, 'cadetID');
}

//Create and empty array for tasks
$tasks = array();
$testIDs = array();

$sql="SELECT tblCadetClassEvents.*, tlkpCoreComponentTasks.TaskID, tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task 
FROM
(tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID =tblClassDetails.fkCadetID) 
 INNER JOIN (tlkpCoreComponentTasks 
 INNER JOIN tblCadetClassEvents ON tlkpCoreComponentTasks.TaskID = tblCadetClassEvents.fkTaskID)
  ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID
  WHERE(((tlkpCoreComponentTasks.CoreComponentID)=8) AND ((tblClassDetails.fkCadetID)=$cadetID))";

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

$sql2 = "SELECT tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task, tblCadetClassEvents.EventDate, tblCadetClassEvents.DidPass, tblCadetClassEvents.EventNote, tblClassDetails.fkCadetID, tblCadetClassEvents.fkTaskID
FROM (tblClassDetails INNER JOIN tblCadetClassEvents ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID) INNER JOIN (tlkpCoreComponent INNER JOIN tlkpCoreComponentTasks ON tlkpCoreComponent.CoreComponentID = tlkpCoreComponentTasks.CoreComponentID) ON tblCadetClassEvents.fkTaskID = tlkpCoreComponentTasks.TaskID
WHERE (((tlkpCoreComponent.CoreComponentID)=8) AND ((tblClassDetails.fkCadetID)=$cadetID))";
$result2 = $connection->runSelectQuery($sql2);

if ($result2->num_rows > 0) {

    //Store all tasks including repeats for date and did pass comparison
    while ($row2 = $result2->fetch_assoc())
    {
        $allTasks[] = $row2;
    }
}

echo '{"taskTbl":' . (json_encode($tasks)) . ', "testIDs":' . (json_encode($testIDs)) . ', "allTasks":' . (json_encode($allTasks)) . '}';

?>
