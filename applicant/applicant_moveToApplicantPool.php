<?php

//Filename: applicant_moveToApplicantPool.php
//move applicants to ApplicantPool

require_once '../php/dbcontroller.php';

function moveToApplicantPool($value, $dumpy)
{
    $connection = new DBController();
    $result = $connection->connectDB();
    if (!$connection) die("Unable to connect to the database!");

    //Query to change status of applicants to 'Applicant'
    $sqlAdd = "UPDATE tblApplicants SET AStatus = 0 WHERE applicantID = $value";
    
    //calls the function to change the status
    mysqli_query($result, $sqlAdd);

    
}