<?php

//Filename: applicant_moveToCandidatePool.php
//move applicants to candidatePool

require_once '../php/dbcontroller.php';

function moveToCandidatepool($value, $dumpy)
{
    $connection = new DBController();
    $result = $connection->connectDB();
    if (!$connection) die("Unable to connect to the database!");

    $sqlAdd = "INSERT INTO tblCandidatePool (applicantID, fName, lName) VALUES ('" . $dumpy['applicantID'] . "','" . $dumpy['fName'] . "','" . $dumpy['lName'] . "')";    //,".$dumpy['PGender'].",".$dumpy['AStatus'].",".$dumpy['AGenQual'].",".$dumpy['AEmail'].",".$dumpy['guardianEmail']."

    //delete candidate from applicant once it has been moved to Candidate Pool
    $sqlDeleteApplicants = "DELETE * FROM tblApplicants WHERE applicantID = $value";
    $sqlDeleteDeadpool = "DELETE * FROM tblDeadPool WHERE applicantID = $value";

    //ADDS 
    mysqli_query($result, $sqlAdd);

    //DELETES FROM APPLICANT
    mysqli_query($result, $sqlDeleteApplicants);

    //DELETES FROM DEADPOOL
    mysqli_query($result, $sqlDeleteDeadpool);
}