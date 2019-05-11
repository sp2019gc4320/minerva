<?php
//Filename: applicant_moveToDeadpool.php
//move applicants to deadpool


require_once '../php/dbcontroller.php';


function moveToDeadpool($value,$dumpy){
    $connection = new DBController();
    $result = $connection -> connectDB();
    if(!$connection) die("Unable to connect to the database!");

    //query to set status to 'deadpool'
    $sqlAdd = "UPDATE tblApplicants SET ApplicantStatus = 3 WHERE ApplicantID = $value";

    //calls the query
    mysqli_query($result, $sqlAdd);
}