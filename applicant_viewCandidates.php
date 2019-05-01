<?php
// File: applicant_viewCandidates.php
// Outputs an HTML table that includes fName, lName, idNumber, and a button to view documents
//

require_once '../php/dbcontroller.php';

function listCandidates() {
    $connection = new DBController();
    if(!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "SELECT lName, fName, applicantID FROM tblCandidatePool";
    $result = $connection -> connectDB();
    $query = mysqli_query($result, $sql);

    $i=0;
    while($row = mysqli_fetch_array($query)) {
        echo "<tr>";
        echo "<td>"."<input type='checkbox' name='id$i' value=".$row['applicantID'].">&nbsp;</td>";
        echo "<td>".$row['lName']."</td>";
        echo "<td>".$row['fName']."</td>";
        echo "<td>".$row['applicantID']."</td>";
        // echo "<td><a href=\"mailto:".$row['AEmail']."?cc= ".$row['guardianEmail']." &amp;subject=Congratulations&amp;body=You%20have%20been%20selected%20as%20a%20potential%20candidate%20for%20the%20upcoming%20class%20of%20cadets.%20Please%20respond%20to%20this%20example%20email.\">email candidate</a></td>";
        echo "</tr>";
        $i++;
    }
}