<?php
// File: applicant_viewCandidates.php
// Outputs an HTML table that includes fName, lName, idNumber, and a button to view documents
//

require_once '../php/dbcontroller.php';

function listCandidates() {
    $connection = new DBController();
    if(!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "SELECT lName, fName, applicantID 
            FROM tblApplicants 
            WHERE AStatus = 2";
    $result = $connection -> connectDB();
    $query = mysqli_query($result, $sql);

    while($row = mysqli_fetch_array($query)) {
        $value = $row['applicantID'];
        echo "<tr>";
        echo "<td>"."<input type='checkbox' name='id[]' value=$value>&nbsp;</td>";
        echo "<td>".$row['lName']."</td>";
        echo "<td>".$row['fName']."</td>";
        echo "<td>".$row['applicantID']."</td>";
        echo "</tr>";
    }
}