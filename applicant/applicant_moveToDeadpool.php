<?php
//Filename: applicant_moveToDeadpool.php
//move applicants to deadpool


require_once '../php/dbcontroller.php';
//require_once './applicant_list.php';


function moveToDeadpool($value,$dumpy){
    $connection = new DBController();
    $result = $connection -> connectDB();
    if(!$connection) die("Unable to connect to the database!");

    //TODO function needs to add candidate to deadpool then delete from table
    //use variables to get values of selected candidate


   // $sqlUpdate = "UPDATE tblDeadPool (applicantID,fName, mName, lName, PGender, AStatus, AGenQual, AEmail, guardianEmail, RejectedDate, RejectedReason, DeselectedDate, DeselectedReason) VALUES ()";

    //sqlAdd is called if the tblDeadPool is empty

    $sqlAdd = "INSERT INTO tblDeadPool (applicantID, fName, lName) VALUES ('".$dumpy['applicantID']."','".$dumpy['fName']."','".$dumpy['lName']."')";    //,".$dumpy['PGender'].",".$dumpy['AStatus'].",".$dumpy['AGenQual'].",".$dumpy['AEmail'].",".$dumpy['guardianEmail']."

    //delete candidate from applicant once it has been moved to Deadpool
    //$sqlDelete = "DELETE FROM tblApplicants WHERE applicantID = ".$value;


    //throws an error
    /*if(mysqli_query($result, $sqlAdd)){
        echo "Records inserted successfully.";
    } else{
        echo "ERROR: Could not able to execute $sqlAdd. " . mysqli_error($result);
    }
    */

    mysqli_query($result, $sqlAdd);
    //var_dump($sqlAdd);

    //DANGER DELETES
    //mysqli_query($result, $sqlDelete);
}