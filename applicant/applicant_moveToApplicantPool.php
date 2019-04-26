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


    $sqlAdd = "INSERT INTO tblApplicants (applicantID, fName, lName) VALUES ('" . $dumpy['applicantID'] . "','" . $dumpy['fName'] . "','" . $dumpy['lName'] . "')";    //,".$dumpy['PGender'].",".$dumpy['AStatus'].",".$dumpy['AGenQual'].",".$dumpy['AEmail'].",".$dumpy['guardianEmail']."

    //delete candidate from applicant once it has been moved to Deadpool
    $sqlDelete = "DELETE FROM tblApplicants WHERE applicantID = ".$value;


    //throws an error if error
    /*if(mysqli_query($result, $sqlAdd)){
        echo "Records inserted successfully.";
    } else{
        echo "ERROR: Could not able to execute $sqlAdd. " . mysqli_error($result);
    }
    */


    //ADDS to database
    mysqli_query($result, $sqlAdd);

    //DANGER DELETES
    //ONLY UNCOMMENT WHEN READy
    mysqli_query($result, $sqlDelete);
}