<?php
// File: updateInspection.php
// Updates inspection entries
// Prints JSON array


//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$op = 'UPDATE';
$JBInspectionID = $conn->sanitize($_POST['JBInspectionID']);

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

    $InspectionNote1=$_POST['InspectionNote'];
    $InspectionNote1=str_replace('"', "'", $InspectionNote1);
    $InspectionNote1=str_replace("\\", "/", $InspectionNote1);
    $InspectionNote=filter_var($InspectionNote1, FILTER_SANITIZE_ENCODED);

    $DidPassInspection= $conn->sanitize($_POST['DidPassInspection']);
    $InspMeritAdj = filter_input(INPUT_POST,"InspMeritAdj", FILTER_SANITIZE_NUMBER_INT);

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