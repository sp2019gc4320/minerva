<?php

require_once './applicant_view.php';
require_once '../php/dbcontroller.php';

//pass appID from other page into each 3 functions
//make sure file path can open document
//fix which tables each function is pulling from

function displayName() {
    $appID = 12;

    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "SELECT tblApplicants.lName, tblApplicants.fName FROM tblApplicants WHERE tblApplicants.applicantID = $appID";

    $result = $connection->connectDB();
    if (!$result)
        die("Unable to perform query!");

    $query = mysqli_query($result, $sql);

    if (!$query) {
        printf("Error: %s\n", mysqli_error($result));
        exit();
    }

    while ($row = mysqli_fetch_array($query)) {

        echo "Currently looking at documents for Applicant: " . $row['fName'] . " " . $row['lName'];

    }

}

function listCompleted() {
    $appID = 12;
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "SELECT tblappdocs.docType, tblappdocs.dateUploaded, tblappdocs.filePath FROM tblappdocs INNER JOIN tblApplicants ON tblApplicants.applicantID = tblappdocs.applicantID WHERE tblApplicants.applicantID = $appID";

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
        echo "<td><button type='button' style='width:100px;' class='btn btn-success' onclick=\"location.href='$file'\">View</button></td>";
        echo "<td style='padding:0 60px'>".$row['dateUploaded']."</td>";
        echo "</tr>";
    }
}

function listPending () {
    $appID = 12;

    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "SELECT tblAppDocs.docType, tblAppDocs.documentID, tblAppDocs.dateUploaded FROM tblappdocs INNER JOIN tblApplicants ON tblApplicants.applicantID = tblappdocs.applicantID WHERE tblApplicants.applicantID = $appID";

    $result = $connection->connectDB();
    if (!$result)
        die("Unable to perform query!");

    $query = mysqli_query($result, $sql);

    if (!$query) {
        printf("Error: %s\n", mysqli_error($result));
        exit();
    }

    $arr = array("Education Plan Documentation"=>'0', "School Behavioral & Attendance Records"=>'1', "Medical Insurance Forms"=>'2', "Immunization Record"=>'3', "Unoffical Academic Transcript"=>'4',
        "Candidate Application Document Form"=>'5', "Medical History Form"=>'6', "Copy of Birth Certificate"=>'7', "Legal History Form"=>'8', "Mentor Application"=>'9', "Copy of Social Security Card"=>'10',
        "Government Issued ID"=>'11', "Mental Health Information Form"=>'12');


    while ($row = mysqli_fetch_array($query)) {
        foreach($arr as $x => $x_value){
            foreach($row as $key => $value){
                if($value==$x_value){

                    //$my_string = $x;
                    //echo $my_string . "ok";
                    unset($arr["$x"]);
                }
            }
        }
    }

        foreach($arr as $s => $s_value){
        echo "<tr>";
        echo "<td style='padding:0 60px; color:red;' >".$s."</td>";
        echo "<td><button type='button' style='width:100px;' class='btn btn-success'>Upload File</button></td>";
        echo "</tr>";
    }

    /*while ($row = mysqli_fetch_array($query)) {

        echo "<tr>";
        echo "<td style='padding:0 60px'>".$row['docType']."</td>";
        echo "<td><button type='button' style='width:100px;' class='btn btn-success'>Upload File</button></td>";
        echo "<td>PDF file here</td>";
        echo "</tr>";

    }*/
}
