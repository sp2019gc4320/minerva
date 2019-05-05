<?php
// File: mentor_updateAppts.php
// Used by:
// updateMentorCtrl.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Default values for testing
$op = 'UPDATE';
$AppointmentID = 2;

if (isset($_POST['AppointmentID'])) {
    $AppointmentID = filter_input(INPUT_POST, "AppointmentID");
    unset($_POST['AppointmentID']);
}

if (isset($_POST['op'])) {
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}

if ($op == 'UPDATE') {
    $sql = "SELECT tblMentorAppts.*
          FROM tblMentorAppts
          WHERE
          AppointmentID= $AppointmentID
          ";

    if ($result = $connection->runSelectQuery($sql)) {
        $fieldinfo = mysqli_fetch_fields($result);
        $row = $result->fetch_assoc();

        foreach ($fieldinfo as $val) {
            $fieldName = $val->name;

            // check to see if there is a post value
            if (isset($_POST[$fieldName])) {
              //  $fieldValue = filter_input(INPUT_POST, $fieldName);
                $fieldValue1 = $_POST[$fieldName];
                $fieldValue1 = str_replace('"', "'", $fieldValue1);
                $fieldValue1 = str_replace("\\", "/", $fieldValue1);
                $fieldValue = filter_var($fieldValue1,FILTER_SANITIZE_ENCODED);

                $sql = "UPDATE tblMentorAppts set $fieldName = '$fieldValue' WHERE  AppointmentID=$AppointmentID";
                $connection->runQuery($sql);
            }
        }
    }
    echo '{ "status": "finsihed updating "}';

} else if ($op == 'ADD') {
    $fkMentorPotentialID = filter_input(INPUT_POST, "fkMentorPotentialID");
    $ApptDate = filter_input(INPUT_POST, "ApptDate");
    $ApptType = filter_input(INPUT_POST, "ApptType");
   // $ApptNote = filter_input(INPUT_POST, "ApptNote");
    $ApptNote1 = $_POST['ApptNote'];
    $ApptNote1 = str_replace('"', "'", $ApptNote1);
    $ApptNote1 = str_replace("\\", "/", $ApptNote1);
    $ApptNote = filter_var($ApptNote1,FILTER_SANITIZE_ENCODED);

    $sql = "INSERT INTO tblMentorAppts ( fkMentorPotentialID, ApptDate, ApptType, ApptNote)
             VALUES ('$fkMentorPotentialID', '$ApptDate', '$ApptType', '$ApptNote')";

    $connection->createRecord($sql);

    // echo "adding sql: $sql";
} else if ($op == 'DELETE') {
    $sql = " DELETE FROM tblMentorAppts
               WHERE  AppointmentID=$AppointmentID
             ";
    $connection->runDeleteQuery($sql);

}

?>