<?php
/**
 * Created by PhpStorm.
 * User: ryanraitz
 * Date: 2019-04-30
 * Time: 23:19
 */
require_once 'dbcontroller.php';

//create connection
$connection = new DBController();

$tests = array();

if (isset($_POST['cadetID'])) {

    $cadetID = filter_input(INPUT_POST, 'cadetID');
}

if (isset($_POST['TaskID'])) {

    $TaskID = filter_input(INPUT_POST, 'TaskID');
}

$sql = "SELECT tlkpCoreComponentTasks.TaskNumber, tlkpCoreComponentTasks.Task, tlkpTaskTests.TaskTestID, tlkpTaskTests.fkTaskID, tlkpTaskTests.TaskTest, tblCadetClassEvents.EventDate, tblCadetClassEvents.EventNote, tblCadetClassEvents.MaxDate, tblCadetClassEvents.DidPass, tblCadetClassEvents.CadetClassEventID 
FROM (tlkpCoreComponentTasks INNER JOIN tlkpTaskTests ON tlkpCoreComponentTasks.TaskID = tlkpTaskTests.fkTaskID) INNER JOIN ((tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) INNER JOIN tblCadetClassEvents ON tblClassDetails.ClassDetailID = tblCadetClassEvents.fkClassDetailID) ON tlkpTaskTests.TaskTestID = tblCadetClassEvents.fkTaskTestEventID 
WHERE ((tlkpCoreComponentTasks.CoreComponentID=8) AND ((tblClassDetails.fkCadetID)=$cadetID) AND ((tlkpTaskTests.fkTaskID)=$TaskID))
ORDER BY TaskTestID";
$result = $connection->runSelectQuery($sql);
if ($result->num_rows > 0) {

    //Store the tests of tasks with the selected Test ID from the row where "Show Tests" was clicked.
    while ($row = $result->fetch_assoc())
    {
        $tests[] = $row;
    }
}

echo '{"testTbl":' . (json_encode($tests)) . '}';

?>
