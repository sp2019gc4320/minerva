<?php

//require_once './applicant_view.php';
require_once '../php/dbcontroller.php';

//session_start();

$value = $_SESSION['varName'];

function eligibility($value) {
    $appID = $value;

    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "SELECT tblAppDocs.docType, tblAppDocs.documentID, tblAppDocs.dateUploaded FROM tblAppDocs INNER JOIN tblApplicants ON tblApplicants.applicantID = tblAppDocs.applicantID WHERE tblApplicants.applicantID = $appID";

    $result = $connection->connectDB();
    if (!$result)
        die("Unable to perform query!");

    $query = mysqli_query($result, $sql);

    if (!$query) {
        printf("Error: %s\n", mysqli_error($result));
        exit();
    }

    $sql2 = "SELECT tlkpApplicationFiles.Description, tlkpApplicationFiles.isRequired FROM tlkpApplicationFiles";

    $result2 = $connection->connectDB();
    if (!$result2)
        die("Unable to perform query!");
    
    $query2 = mysqli_query($result2, $sql2);

    if (!$query2) {
        printf("Error: %s\n", mysqli_error($result2));
        exit();
    }

    $arr = array();

    while($row2 = mysqli_fetch_array($query2)){
        if($row2['isRequired']==1){
            $arr[] = $row2['Description'];
        }
    }
    
    while ($row = mysqli_fetch_array($query)) {
        
        unset($arr[array_search($row['docType'],$arr)]);
      
    }
    
    
    if(empty($arr)){
        echo '<span style="color:#32CD32;text-align:center;">ELIGIBLE FOR REVIEW</span>';
    }
    else{
        echo '<span style="color:#ff0000;text-align:center;">INELIGIBLE FOR REVIEW</span>';
    }
    
}

function displayName($value) {
    $appID = $value;

    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "SELECT tblPeople2.PersonLN, tblPeople2.PersonFN FROM tblPeople2 INNER JOIN tblApplicants ON tblApplicants.fkPersonID = tblPeople2.PersonID WHERE tblApplicants.applicantID = $appID";

    $result = $connection->connectDB();
    if (!$result)
        die("Unable to perform query!");

    $query = mysqli_query($result, $sql);

    if (!$query) {
        printf("Error: %s\n", mysqli_error($result));
        exit();
    }

    while ($row = mysqli_fetch_array($query)) {

        echo "Currently looking at documents for Applicant: " . $row['PersonFN'] . " " . $row['PersonLN'];

    }

}

function listCompleted($value) {
    $appID = $value;
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "SELECT tblAppDocs.docType, tblAppDocs.dateUploaded, tblAppDocs.filePath FROM tblAppDocs INNER JOIN tblApplicants ON tblApplicants.applicantID = tblAppDocs.applicantID WHERE tblApplicants.applicantID = $appID";

    $result = $connection->connectDB();
    if (!$result)
        die("Unable to perform query!");

    $query = mysqli_query($result, $sql);

    if (!$query) {
        printf("Error: %s\n", mysqli_error($result));
        exit();
    }


    while ($row = mysqli_fetch_array($query)) {
        $file = $row['filePath'];
        echo "<tr>";
        echo "<td style='padding:0 60px'>".$row['docType']."</td>";
        echo "<td><button type='button' style='width:100px;' class='btn btn-success' onclick=\" window.open('$file','_blank')\">View</button></td>";
        echo "<td style='padding:0 60px'>".$row['dateUploaded']."</td>";
        echo "</tr>";
    }
}

function listPending ($value) {
    $appID = $value;

    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "SELECT tblAppDocs.docType, tblAppDocs.documentID, tblAppDocs.dateUploaded FROM tblAppDocs INNER JOIN tblApplicants ON tblApplicants.applicantID = tblAppDocs.applicantID WHERE tblApplicants.applicantID = $appID";

    $result = $connection->connectDB();
    if (!$result)
        die("Unable to perform query!");

    $query = mysqli_query($result, $sql);

    if (!$query) {
        printf("Error: %s\n", mysqli_error($result));
        exit();
    }

    $sql2 = "SELECT tlkpApplicationFiles.Description FROM tlkpApplicationFiles";

    $result2 = $connection->connectDB();
    if (!$result2)
        die("Unable to perform query!");
    
    $query2 = mysqli_query($result2, $sql2);

    if (!$query2) {
        printf("Error: %s\n", mysqli_error($result2));
        exit();
    }

    $arr = array();

    while($row2 = mysqli_fetch_array($query2)){
        $arr[] = $row2['Description'];
    }

    while ($row = mysqli_fetch_array($query)) {
        
        unset($arr[array_search($row['docType'],$arr)]);
      
    }
    

    foreach($arr as $s){
        echo "<tr>";
        echo "<td style='padding:0 60px; color:red;' >".$s."</td>";
        echo "</tr>";
    }

}
