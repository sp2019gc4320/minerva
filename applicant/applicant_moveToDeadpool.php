<?php
//Filename: applicant_moveToDeadpool.php
//move applicants to deadpool


require_once '../php/dbcontroller.php';


function moveToDeadpool($value,$dumpy){
    $connection = new DBController();
    $result = $connection -> connectDB();
    if(!$connection) die("Unable to connect to the database!");


    $sqlAdd = "INSERT INTO tblDeadPool (applicantID, fName, lName) VALUES ('".$dumpy['applicantID']."','".$dumpy['fName']."','".$dumpy['lName']."')";    //,".$dumpy['PGender'].",".$dumpy['AStatus'].",".$dumpy['AGenQual'].",".$dumpy['AEmail'].",".$dumpy['guardianEmail']."

    //delete candidate from applicant once it has been moved to Deadpool
    $sqlDeleteApplicant = "DELETE * FROM tblApplicants WHERE applicantID = $value";
    $sqlDeleteCandidate = "DELETE * FROM tblCandidatePool WHERE applicantID = $value";

    mysqli_query($result, $sqlAdd);

    //DANGER DELETES FROM applicant
    mysqli_query($result, $sqlDeleteApplicant);

    //DANGER DELETES FROM candidate
    mysqli_query($result, $sqlDeleteCandidate);
}