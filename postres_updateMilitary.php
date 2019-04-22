<?php
// File: postres_updateMilitary.php
// Used by:
//   postres.controller.js
//
require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//set default mentor potentialID this should be overwritten
$PRMilID = 2;
$TableName = 'tblPRMilitary';

if (isset($_POST['PRMilID'])) {
    $PRMilID = filter_var(FILTER_SANITIZE_NUMBER_INT, "PRMilID");
    unset($_POST['PRMilID']);
}

if (isset($_POST['TableName'])) {
    $TableName = filter_var(FILTER_SANITIZE_STRING, "TableName");
    unset($_POST['TableName']);
}


$sql = "SELECT tblPRMilitary.*
          FROM   tblPRMilitary
          WHERE  tblPRMilitary.PRMilID = '$PRMilID'
         ";

if ($result = $connection->runSelectQuery($sql)) {

    $fieldinfo = mysqli_fetch_fields($result);
    $row = $result->fetch_assoc();

    foreach ($fieldinfo as $val) {
        $fieldName = $val->name;

        // check to see if there is a post value
        if (isset($_POST[$fieldName])) {

            $connection->sanitize($_POST[$fieldName]);
            $fieldValue = filter_var($fieldName,FILTER_SANITIZE_ENCODED);

            $sql = "UPDATE tblPRMilitary  set $fieldName = '$fieldValue' WHERE  PRMilID = '$PRMilID'";
            echo $sql;
            $connection->runQuery($sql);
        }
    }
}


echo '{ "status": "finsihed updating "}';
?>