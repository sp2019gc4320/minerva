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
        $MenteeTrainingDate = $connection->getRightFormat($connection->sanitize($_POST['MenteeTrainingDate']));
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
            $fieldValue = $connection->sanitize($_POST[$fieldName]);
            $fieldValue = filter_var($fieldValue, FILTER_SANITIZE_ENCODED);
          //  $fieldValue = filter_input(INPUT_POST, $fieldName);

            $sql = "UPDATE $TableName  set $fieldName = '$fieldValue' WHERE  MentorPotentialID = '$MentorPotentialID'";
            $connection->runQuery($sql);
        }
    }
}

echo '{ "status": "finsihed updating "}';
?>