<?php
//File: postres_updateMisc.php
//Used by:
//   postres.controller.js
//
require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//set default mentor potentialID this should be overwritten
$PRMiscID = 1;
$TableName = 'tblPRMisc';

if (isset($_POST['PRMiscID'])) {
    $PRMiscID = filter_var(FILTER_SANITIZE_NUMBER_INT, 'PRMiscID');
    unset($_POST['PRMiscID']);
}

if (isset($_POST['TableName'])) {
    $TableName = filter_var(FILTER_SANITIZE_STRING, "TableName");
    unset($_POST['TableName']);
}


$sql = "SELECT tblPRMisc.*
          FROM   tblPRMisc
          WHERE  tblPRMisc.PRMiscID = '$PRMiscID'
         ";

if ($result = $connection->runSelectQuery($sql)) {

    $fieldinfo = mysqli_fetch_fields($result);
    $row = $result->fetch_assoc();

    foreach ($fieldinfo as $val) {
        $fieldName = $val->name;

        // check to see if there is a post value
        if (isset($_POST[$fieldName])) {
            //$fieldValue = filter_input(INPUT_POST,"fieldName");

            $connection->sanitize($_POST[$fieldName]);
            $fieldValue = filter_var($fieldName,FILTER_SANITIZE_ENCODED);
            $sql = "UPDATE tblPRMisc  set $fieldName = '$fieldValue' WHERE  PRMiscID = '$PRMiscID'";
            echo $sql;
            $connection->runQuery($sql);
        }
    }
}
echo '{ "status": "finsihed updating "}';
?>