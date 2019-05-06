<?php
// File: physical-fitness_updatePTDetails.php
// Updates Phys Fit PT Tests  in the database by sending a sql update statement.
// Input:  all info from test table -- only the test with a fkTaskEventID will be sent.
// Output: none

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//Required to determine which record to update.

if (isset($_POST['fkTaskTestEventID'])) {

    $fkTaskTestEventID = $_POST['fkTaskTestEventID'];
}

if (isset($_POST['PTDetailID'])) {

    $PTDetailID = $_POST['PTDetailID'];
}

if (isset($_POST['fkPTID'])) {

    $fkPTID = $_POST['fkPTID'];
}

if (isset($_POST['PTDetailResult'])) {

    $PTDetailResult = $_POST['PTDetailResult'];
}

if (isset($_POST['IsWaived'])) {

    $IsWaived = $_POST['IsWaived'];
}


//sql statement to update the correct tables
$sql = "UPDATE
    tblPTDetails
SET
   PTDetailResult = '$PTDetailResult',
   IsWaived = '$IsWaived'
WHERE
   PTDetailID = '$PTDetailID'";
echo $sql;
$result = $conn->runQuery($sql);

?>
