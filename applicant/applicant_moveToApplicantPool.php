<?php

//Filename: applicant_moveToApplicantPool.php
//move applicants to ApplicantPool


require_once '../php/dbcontroller.php';


function moveToApplicantPool($value, $dumpy)
{
    $connection = new DBController();
    $result = $connection->connectDB();
    if (!$connection) die("Unable to connect to the database!");

    //use variables to get values of selected candidate
    $sqlAdd = "INSERT INTO tblapplicants (applicantID, fName, lName) VALUES ('" . $dumpy['applicantID'] . "','" . $dumpy['fName'] . "','" . $dumpy['lName'] . "')";    //,".$dumpy['PGender'].",".$dumpy['AStatus'].",".$dumpy['AGenQual'].",".$dumpy['AEmail'].",".$dumpy['guardianEmail']."

    //delete candidate from both pools once it has been moved to applicant
    $sqlDeleteCandidate = "DELETE * FROM tblcandidatepool WHERE applicantID = ".$value;
    $sqlDeleteDeadpool = "DELETE * FROM tbldeadpool WHERE applicantID = ".$value;
    
    //ADDS to database
    mysqli_query($result, $sqlAdd);

    //DANGER DELETES FROM deadpool
    mysqli_query($result, $sqlDeleteDeadpool);

    //DANGER DELETES FROM candidate
    mysqli_query($result, $sqlDeleteCandidate);    
    
}