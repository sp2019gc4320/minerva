<?php

//File: postres_updateEducation.php
// Used by:
//   postres.controller.js
//
require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//set default mentor potentialID this should be overwritten
$fkMentorPotentialID = 24;
$TableName = 'tblMentorContacts';

if (isset($_POST['fkMentorPotentialID'])) {
    $PREdID = filter_input(INPUT_POST, 'fkMentorPotentialID');
    unset($_POST['fkMentorPotentialID']);
}
if (isset($_POST['TableName'])) {
    $TableName = filter_input(INPUT_POST, '$TableName');
    unset($_POST['TableName']);
}

//set's the SQL query to $sql
//This sql query is tested and works

$sql = "SELECT tblMentorContacts.*
          FROM   tblMentorContacts
          WHERE  tblMentorContacts.fkMentorPotentialID = '$fkMentorPotentialID'
         ";


if ($result = $connection->runSelectQuery($sql)) {
    //alert("query run");
    $fieldinfo = mysqli_fetch_fields($result);
    $row = $result->fetch_assoc();

    foreach ($fieldinfo as $val) {
        $fieldName = $val->name;

        // check to see if there is a post value
        if (isset($_POST[$fieldName])) {
            $fieldValue = filter_input(INPUT_POST, $fieldName);

            $sql = "UPDATE tblMentorContacts  set $fieldName = '$fieldValue' WHERE  fkMentorPotentialID = '$fkMentorPotentialID'";
            //echo $sql;
            $connection->runQuery($sql);
            echo '{ "STATUS": "finished updating "}';

        }
    }
}
echo '{ "status": "finished updating "}';

?>
