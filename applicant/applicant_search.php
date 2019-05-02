<?php
// File: applicant_search.php
// This file returns a table based on the search criteria of the user in applicant_list.php

require_once '../php/dbcontroller.php';
require_once 'applicant_list.php';

function search()
{
    $connection = new DBController();
    $result = $connection->connectDB();
    if (!$connection) die("Unable to connect to the database!");

    $search = mysqli_real_escape_string($result,$_POST["text_search"]);

    $sql = "SELECT lName, fName, AppSubmitDate, applicantID, documentID FROM tblApplicants WHERE lName LIKE '%$search%' OR fName LIKE '%$search%' OR applicantID LIKE '%$search%'";

    if (!$result)
        die("Unable to perform query!");

    $query = mysqli_query($result, $sql);

    while ($row = mysqli_fetch_array($query)) {
        echo "<tr>";
        echo "<td>" . "<input type='checkbox' name=$row['applicantID']>&nbsp;</td>";
        echo "<td>" . $row['lName'] . "</td>";
        echo "<td>" . $row['fName'] . "</td>";
        echo "<td>" . $row['AppSubmitDate'] . "</td>";
        echo "<td>" . $row['applicantID'] . "</td>";
        echo "<td>" . $row['documentID'] . "</td>";
        echo "</tr>";
    }
}
