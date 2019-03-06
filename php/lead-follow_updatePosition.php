<?php
// File: updatePosition.php
// Updates position entries
// Prints JSON array

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$PositionID = $_POST['PositionID']; 
$PosStartDate= $_POST['PosStartDate'];
$PosEndDate= $_POST['PosEndDate'];
$PosNote= $_POST['PosNote'];
$PosDidFail= $_POST['PosDidFail'];

$sql = "UPDATE tblJBPositions
SET
  PosStartDate = '$PosStartDate',
  PosEndDate = '$PosEndDate',
  PosNote = '$PosNote',
  PosDidFail = '$PosDidFail'
WHERE
  PositionID = '$PositionID'";

$result = $conn->runQuery($sql);
if ($result === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: $sql";
}
//$connection->close();
?>