<?php
// File: applicant_viewDocuments.php
// This file returns a new view which contains a table for all dead pool occupants
//

require_once '../php/dbcontroller.php';

function listDeadPool() {
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    //retrieve dead pool population
    $sql = "SELECT lName, fName, applicantID FROM tblDeadPool";

    $result = $connection -> connectDB();
    $query = mysqli_query($result, $sql);

    while($row = mysqli_fetch_array($query)) {
        echo "<tr>";
        echo "<td>"."<input type='checkbox' name='$row[applicantID]' />&nbsp;</td>";
        echo "<td>".$row['lName']."</td>";
        echo "<td>".$row['fName']."</td>";
        echo "<td>".$row['applicantID']."</td>";
        echo "</tr>";
    }
}