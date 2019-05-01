<?php
// File: applicant_listApplicants.php
// Outputs an HTML table that includes fName, lName, dateSubmitted, idNumber, and documentID
//

require_once '../php/dbcontroller.php';

function listApplicants() {
    $connection = new DBController();
    if(!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "SELECT lName, fName, AppSubmitDate, applicantID, documentID 
            FROM tblApplicants 
            WHERE AStatus = 0";
    $result = $connection -> connectDB();
    $query = mysqli_query($result, $sql);

    while($row = mysqli_fetch_array($query)) {
        $value = $row['applicantID'];
        echo "<tr>";
        echo "<td>"."<input type='checkbox' name='id[]' value=$value/>&nbsp;</td>";
        echo "<td>".$row['lName']."</td>";
        echo "<td>".$row['fName']."</td>";
        echo "<td>".$row['AppSubmitDate']."</td>";
        echo "<td>".$row['applicantID']."</td>";
        echo "<td>".$row['documentID']."</td>";
        echo "</tr>";
    }
}