<?php

$conn = new mysqli("localhost", "root", "", "minerva");
$result = $conn->query("SELECT tblPeople2.PersonFN, tblPeople2.PersonLN, tblApplicants.ApplicantID 
                        FROM tblappdocs INNER JOIN (tblPeople2 INNER JOIN tblApplicants ON tblPeople2.PersonID = tblApplicants.fkPersonID) ON tblappdocs.applicantID = tblapplicants.ApplicantID 
                        GROUP BY tblapplicants.ApplicantID");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"Name":"'  . $rs["PersonFN"] . '",';
  $outp .= '"City":"'   . $rs["PersonLN"]        . '",';
  $outp .= '"Country":"'. $rs["ApplicantID"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);

?>