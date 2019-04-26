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
    $sqlDelete = "DELETE FROM tblApplicants WHERE applicantID = ".$value;


    //throws an error if you need it
    /*if(mysqli_query($result, $sqlAdd)){
        echo "Records inserted successfully.";
    } else{
        echo "ERROR: Could not able to execute $sqlAdd. " . mysqli_error($result);
    }
    */

    mysqli_query($result, $sqlAdd);

    //DANGER DELETES FROM DATABASE
    mysqli_query($result, $sqlDelete);
}