<?php
// File: postres_updateEmployment.php
// Used by:
//   postres.controller.js
//
require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//set default mentor potentialID this should be overwritten
$PREmpID = 128;
$TableName = 'tblPREmployment';

if (isset($_POST['PREmpID'])) {
    $PREmpID = filter_input(INPUT_POST, 'PREmpID');
    unset($_POST['PREmpID']);
}

if (isset($_POST['TableName'])) {
    $TableName = filter_input(INPUT_POST, '$TableName');
    unset($_POST['TableName']);
}


$sql = "SELECT tblPREmployment.*
          FROM   tblPREmployment
          WHERE  tblPREmployment.PREmpID = '$PREmpID'
         ";

if ($result = $connection->runSelectQuery($sql)) {

    $fieldinfo = mysqli_fetch_fields($result);
    $row = $result->fetch_assoc();

    foreach ($fieldinfo as $val) {
        $fieldName = $val->name;

        // check to see if there is a post value
        if (isset($_POST[$fieldName])) {
           // $fieldValue = filter_input(INPUT_POST, $fieldName);
            $fieldValue1 = $_POST[$fieldName];
            $fieldValue1 = str_replace('"', "'", $fieldValue1);
            $fieldValue1 = str_replace("\\", "/", $fieldValue1);
            $fieldValue = filter_var($fieldValue1,FILTER_SANITIZE_ENCODED);
            $sql = "UPDATE tblPREmployment  set $fieldName = '$fieldValue' WHERE  PREmpID = '$PREmpID'";
            echo $sql;
            $connection->runQuery($sql);
        }
    }
}

echo '{ "status": "finsihed updating "}';
?>