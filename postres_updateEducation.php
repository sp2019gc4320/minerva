<?php

//File: postres_updateEducation.php
// Used by:
//   postres.controller.js
//
require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//set default mentor potentialID this should be overwritten
$PREdID = 39;
$TableName = 'tblPREducation';

if (isset($_POST['PREdID'])) {
    $PREdID = filter_input(INPUT_POST, "PREdID",FILTER_SANITIZE_NUMBER_INT);
    unset($_POST['PREdID']);
}

if (isset($_POST['TableName'])) {
    $TableName = filter_input(INPUT_POST, "TableName",FILTER_SANITIZE_STRING);
    unset($_POST['TableName']);
}

$sql = "SELECT tblPREducation.*
          FROM   tblPREducation
          WHERE  tblPREducation.PREdID = '$PREdID'
         ";

if ($result = $connection->runSelectQuery($sql)) {

    $fieldinfo = mysqli_fetch_fields($result);
    $row = $result->fetch_assoc();

    foreach ($fieldinfo as $val) {
        $fieldName = $val->name;

        // check to see if there is a post value
        if (isset($_POST[$fieldName])) {

            $connection->sanitize($_POST[$fieldName]);

            //$fieldValue = filter_var($fieldName,FILTER_SANITIZE_ENCODED);
            $fieldValue = filter_var($fieldName,FILTER_SANITIZE_ENCODED);
            $sql = "UPDATE tblPREducation  set $fieldName = '$fieldValue' WHERE  PREdID = '$PREdID'";

            echo $sql;
            $connection->runQuery($sql);
        }
    }
}

echo '{ "status": "finsihed updating "}';
?>