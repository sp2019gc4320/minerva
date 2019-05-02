<?php

//Filename: applicant_moveToCandidatePool.php
//move applicants to candidatePool

require_once '../php/dbcontroller.php';

function moveToCandidatepool($value, $dumpy)
{
    $connection = new DBController();
    $result = $connection->connectDB();
    if (!$connection) die("Unable to connect to the database!");

    //query to change status to candidate
    $sqlAdd = "UPDATE tblApplicants SET AStatus = 2 WHERE applicantID = $value";

    //calls the query 
    mysqli_query($result, $sqlAdd);
}