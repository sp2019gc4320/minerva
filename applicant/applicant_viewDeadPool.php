<?php
// File: applicant_viewDocuments.php
// This file returns a new view which contains a table for all dead pool occupants
//

require_once '../php/dbcontroller.php';

function listDeadPool()
{
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    //retrieve dead pool population
    $sql = "SELECT tblPeople2.PersonFN, tblPeople2.PersonLN, tblApplicants.ApplicantStatus, tblAppContacts.Value, tblApplicants.applicantID, tblAppContacts.Description
            FROM tblApplicants
            JOIN tblAppContacts ON (tblApplicants.fkPersonID = tblAppContacts.fkPersonID)
            JOIN tblPeople2 ON (tblAppContacts.fkPersonID = tblPeople2.PersonID)
            WHERE tblApplicants.ApplicantStatus = 3";

    $result = $connection->connectDB();
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
        echo "<td>".$row['Value']."</td>";
        echo "</tr>";
    }
}
