<?php
require_once 'dbcontroller.php';
$db = new DBController();
$fields = "fname, lname, applicantID, Attendance, AStatus";
$sql = "SELECT fname, lname, applicantID, AStatus 
        FROM tblApplicants";
$results = $db->runSelectQueryArray($sql);
echo '{"applicantTable": [';
if($result->num_rows > 0)
{
    $count = 0;
    while($row = $result->fetch_assoc()){
        if($count >0)
            echo ",";
        echo'{"fname": "'.$row["fname"]. '" , "lname": "'.$row["lname"]. '" , "applicantID": "'.$row["applicantID"].
            '" ,"AStatus": "'.$row["AStatus"].'"}';
        $count = $count+1;
    }
}
echo']}';
?>