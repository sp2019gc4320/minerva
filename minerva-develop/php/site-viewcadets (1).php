<?php
/**
 * Created by PhpStorm.
 * User: Lauren Alibey
 * Date: 4/3/2019
 * Time: 7:05 PM
 */

require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//Create Field List
$fields = "PersonFN, PersonLN, fkClassID, CadetRosterNumber, fkCadetID";
$sql = "SELECT tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN, tblClassDetails.fkCadetID, tblClassDetails.ClassDetailID, tblClassDetails.fkClassID, tblClassDetails.CadetRosterNumber";
$sql =  $sql." FROM tblMentorPotential RIGHT JOIN (tblPeople INNER JOIN (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) ON tblMentorPotential.fkClassDetailID = tblClassDetails.ClassDetailID";
$result = $connection->runSelectQueryArrayNotEncoded($sql);

echo '{"data":' . (json_encode($result)) . "} ";
?>