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
    $sqlDelete = "DELETE FROM tblApplicants WHERE applicantID = ".$value;


    //throws an error
    /*if(mysqli_query($result, $sqlAdd)){
        echo "Records inserted successfully.";
    } else{
        echo "ERROR: Could not able to execute $sqlAdd. " . mysqli_error($result);
    }
    */

    mysqli_query($result, $sqlAdd);

    //DANGER DELETES
    mysqli_query($result, $sqlDelete);
}