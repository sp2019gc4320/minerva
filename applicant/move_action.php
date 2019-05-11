<?php

require_once '../php/dbcontroller.php';
require_once './applicant_moveToApplicantPool.php';
require_once './applicant_moveToSelectedPool.php';
require_once './applicant_moveToDeadpool.php';
require_once './applicant_moveToCandidatePool.php';
require_once './forms_functions.php';



$conn = new DBController();
$result = $conn->connectDB();
if (!$conn) die("Unable to connect to the database!");

//fetch checked values
$fetch = mysqli_query($result, "SELECT * FROM tblApplicantsWrong");
if (mysqli_num_rows($fetch) > 0) {
    $fetch_result = mysqli_fetch_assoc($fetch);
}

//DEAD

if (isset($_POST['submitDead'])) {
    //checks if anything is selected
    if (count($_POST) > 1) {
        $rows = mysqli_fetch_array($fetch);

        //removes the button post from the array $ids
        $ids = $_POST;
        unset($ids['submitDead']);
        $ids = $ids['id'];
        foreach ($ids as $value) {

            $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicantsWrong WHERE applicantID =$value");
            $dumpy = mysqli_fetch_assoc($sql);

            moveToDeadpool($value, $dumpy);
        }
    }
}

//CANDIDATE

if (isset($_POST['submitCandidate'])) {
    if (count($_POST) > 1) {
        $rows = mysqli_fetch_array($fetch);

        //removes the button post from the array $ids
        $ids = $_POST;
        unset($ids['submitCandidate']);
        $ids = $ids['id'];
        foreach ($ids as $value) {

            $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicantsWrong WHERE applicantID =$value");
            $dumpy = mysqli_fetch_assoc($sql);

            moveToCandidatepool($value, $dumpy);
        }
    }
}

//SELECTED

if (isset($_POST['submitSelected'])) {
    if (count($_POST) > 1) {
        $rows = mysqli_fetch_array($fetch);

        //removes the button post from the array $ids
        $ids = $_POST;
        unset($ids['submitSelected']);
        $ids = $ids['id'];
        foreach ($ids as $value) {

            $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicantsWrong WHERE applicantID = $value");
            $dumpy = mysqli_fetch_assoc($sql);

            moveToSelectedPool($value, $dumpy);
        }
    }
}

//APPLICANT

if (isset($_POST['submitApplicant'])) {
    if (count($_POST) > 1) {
        $rows = mysqli_fetch_array($fetch);

        //removes the button post from the array $ids
        $ids = $_POST;
        unset($ids['submitApplicant']);
        $ids = $ids['id'];
        foreach ($ids as $value) {

            $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicantsWrong WHERE applicantID = $value");
            $dumpy = mysqli_fetch_assoc($sql);

            moveToApplicantPool($value, $dumpy);
        }
    }
}