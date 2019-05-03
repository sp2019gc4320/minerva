<?php
/**
 * Created by PhpStorm.
 * User: Lauren Alibey
 * Date: 4/6/2019
 * Time: 10:47 AM
 */

require_once 'dbcontroller.php';

//create connection
$conn = new DBController();
//$res = array();


//Create Field List
$fields = "PersonFN, PersonLN, fkClassDetailID, CadetRosterNumber, fkCadetID";

$sql = "SELECT tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN, tblClassDetails.fkCadetID, tblClassDetails.ClassDetailID, tblClassDetails.fkClassID, tblClassDetails.CadetRosterNumber
       FROM tblMentorPotential RIGHT JOIN (tblPeople INNER JOIN (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) ON tblMentorPotential.fkClassDetailID = tblClassDetails.ClassDetailID
       WHERE(tblClassDetails.cadetStatus = 'Graduated')";

$result = $conn->runSelectQuery($sql);
echo '{"cadetTable": [';
if($result->num_rows > 0)
{
    $count = 0;

    while($row = $result->fetch_assoc()){

        if($count >0)
            echo ",";

        echo'{"PersonFN": "'.$row["PersonFN"]. '" , "PersonLN": "'.$row["PersonLN"]. '" , "fkClassID": "'.$row["ClassDetailID"].
            '" , "CadetRosterNumber": "'.$row["CadetRosterNumber"]. '" , "fkCadetID": "'.$row["fkCadetID"].'"}';
        $count = $count+1;
    }

}
echo']}';
/*if($result-> num_rows > 0){
    while($row = $result->fetch_assoc()){

        $res = array_merge($res, [$row]);
    }
    echo(json_encode($res));
}
else{
    echo("could not retrieve cadets");
}*/
?>

