<?php
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();
//$res = array();

$fkCadetID = $_POST['fkCadetID'];
$cadetStatus = $_POST['cadetStatus'];

//Create Field List

$sql = "
       UPDATE tblMentorPotential RIGHT JOIN (tblPeople INNER JOIN (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) ON tblMentorPotential.fkClassDetailID = tblClassDetails.ClassDetailID
       SET tblClassDetails.CadetStatus = '$cadetStatus'
       WHERE(tblClassDetails.fkCadetID = '$fkCadetID')";

$result = $conn->runSelectQuery($sql);
if(!$result)die("ERROR IN QUERY");

$sql2 = "SELECT tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN, tblClassDetails.fkCadetID, tblClassDetails.CadetStatus
       FROM tblMentorPotential RIGHT JOIN (tblPeople INNER JOIN (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) ON tblMentorPotential.fkClassDetailID = tblClassDetails.ClassDetailID
       WHERE(tblClassDetails.fkCadetID = '$fkCadetID')";

$res2= $conn->runSelectQuery($sql2);
if(!$res2)die("ERROR IN QUERY2");
while($row=$res2->fetch_assoc())
{
    echo "Cadet: ".$row['fkCadetID']." ".$row['PersonFN']." ".$row['PersonLN']." is now ".$row['CadetStatus'];
}




?>
