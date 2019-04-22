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

$AppointmentID = $connection->sanitize($_POST['AppointmentID']);

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
                $fieldValue = $connection->sanitize($_POST[$fieldName]);
                $fieldValue = filter_var($fieldValue, FILTER_SANITIZE_ENCODED);
                $sql = "UPDATE tblMentorAppts set $fieldName = '$fieldValue' WHERE  AppointmentID=$AppointmentID";
                $connection->runQuery($sql);
            }
        }
    }
    echo '{ "status": "finsihed updating "}';

} else if ($op == 'ADD') {
    $fkMentorPotentialID = filter_input(INPUT_POST, "fkMentorPotentialID");
    $ApptDate = $connection->getRightFormat($connection->sanitize($_POST['ApptDate']));
    $ApptType = filter_input(INPUT_POST, "ApptType");
    //$ApptNote = filter_input(INPUT_POST, "ApptNote");
    if (isset($_POST['ApptNote'])) {
        $ApptNote = $connection->sanitize($_POST['ApptNote']);
        $ApptNote = filter_var($ApptNote, FILTER_SANITIZE_ENCODED);
    }

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