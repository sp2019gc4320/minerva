<?php
// File: applicant_search.php
// This file returns a table based on the search criteria of the user in applicant_list.php

require_once '../php/dbcontroller.php';
require_once './applicant_list.php';

function search()
{
    $connection = new DBController();
    $result = $connection->connectDB();
    if (!$connection) die("Unable to connect to the database!");

    $search = mysqli_real_escape_string($result,$_POST["text_search"]);
    $sql = "SELECT tblPeople2.PersonFN, tblPeople2.PersonLN, tblApplicants.ApplicantStatus, tblAppContacts.Value, tblApplicants.applicantID, tblAppContacts.Description
            FROM tblApplicants
            JOIN tblAppContacts ON (tblApplicants.fkPersonID = tblAppContacts.fkPersonID)
            JOIN tblPeople2 ON (tblAppContacts.fkPersonID = tblPeople2.PersonID)
            WHERE tblPeople2.PersonLN LIKE '$search' AND tblApplicants.ApplicantStatus = 0
            OR tblPeople2.PersonFN LIKE '$search' AND tblApplicants.ApplicantStatus = 0
            OR applicantID LIKE '$search' AND tblApplicants.ApplicantStatus = 0";

    if (!$result)
        die("Unable to perform query!");

    $query = mysqli_query($result, $sql);

    while ($row = mysqli_fetch_array($query)) {
        $value = $row['applicantID'];
        echo "<tr>";
        echo "<td>" . "<input type='checkbox' name='id[]' value=$value>&nbsp;</td>";
        echo "<td>" . $row['PersonLN'] . "</td>";
        echo "<td>" . $row['PersonFN'] . "</td>";
        // echo "<td>" . $row['AppSubmitDate'] . "</td>";
        echo "<td>" . $row['applicantID'] . "</td>";
        // echo "<td>" . $row['documentID'] . "</td>";
        echo "<td>" . $row['Value'] . "</td>";
        echo "</tr>";
    }
}