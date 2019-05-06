<?php

//mentorStatus_update.php
// Used By:
//   updateMentorCtrl.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//set default mentor potentialID this should be overwritten
$MentorPotentialID = 367;
$TableName = 'tblMentorPotential';


if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID = filter_input(INPUT_POST, 'fkClassDetailID');

    if (isset($_POST['MenteeTrainingDate'])) {
        $MenteeTrainingDate = filter_input(INPUT_POST, 'MenteeTrainingDate');

        $sql = "UPDATE tblClassDetails set MenteeTrainingDate = '$MenteeTrainingDate' WHERE  ClassDetailID = '$fkClassDetailID'";
        $connection->runQuery($sql);

        unset($_POST['MenteeTrainingDate']);
    }

    //unset input_post
    unset($_POST['fkClassDetailID']);
}


if (isset($_POST['MentorPotentialID'])) {
    $MentorPotentialID = filter_input(INPUT_POST, 'MentorPotentialID');

    //unset input_post
    unset($_POST['MentorPotentialID']);
}


$sql = "  SELECT tblMentorPotential.*
          FROM   tblMentorPotential
          WHERE  tblMentorPotential.MentorPotentialID = '$MentorPotentialID'
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

            $sql = "UPDATE $TableName  set $fieldName = '$fieldValue' WHERE  MentorPotentialID = '$MentorPotentialID'";
            $connection->runQuery($sql);
        }
    }
}

echo '{ "status": "finsihed updating "}';
?>