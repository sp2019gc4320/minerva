<?php

//Filename: applicant_moveToSelectedPool.php
//move applicants to selected


require_once '../php/dbcontroller.php';


function moveToSelectedPool($value, $dumpy)
{
    $connection = new DBController();
    $result = $connection->connectDB();
    if (!$connection) die("Unable to connect to the database!");

    //query to set status to 'selected'
    $sqlAdd = "UPDATE tblApplicants SET AStatus=1 WHERE applicantID = $value";
    
    //calls the query
    mysqli_query($result, $sqlAdd);

    
}