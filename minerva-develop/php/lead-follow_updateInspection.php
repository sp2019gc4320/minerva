<?php
// File: updateInspection.php
// Updates inspection entries
// Prints JSON array


//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$op = 'UPDATE';
$JBInspectionID = $_POST['JBInspectionID'];

if (isset($_POST['JBInspectionID'])) {
    $JBInspectionID = filter_input(INPUT_POST, "JBInspectionID");
    unset($_POST['JBInspectionID']);
}

if (isset($_POST['op'])) {
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}

if($op=='UPDATE') {
    $validInspec = strtotime($_POST['InspectionDate']);
    $validInspec = date('Y-m-d', $validInspec);//off by one (gets fixed when retrieving in the js)
    $InspectionDate = $validInspec;

    $InspectionNote = $_POST['InspectionNote'];
    $DidPassInspection = $_POST['DidPassInspection'];
    $InspMeritAdj = $_POST['InspMeritAdj'];

    $sql = "UPDATE tblJBInspections
SET
  InspectionDate = '$InspectionDate',
  InspectionNote = '$InspectionNote',
  DidPassInspection = '$DidPassInspection',
  InspMeritAdj = '$InspMeritAdj'
WHERE
  JBInspectionID = '$JBInspectionID'";


    $result = $conn->runQuery($sql);
    if ($result === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: $sql";
    }
}
else if($op == 'DELETE')
{
    $sql = " DELETE FROM tblJBInspections
               WHERE  JBInspectionID=$JBInspectionID
             ";
    $result = $conn->runDeleteQuery($sql);

    print_r($sql);

    if ($result === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: $sql";
    }
}
//$connection->close();
?>