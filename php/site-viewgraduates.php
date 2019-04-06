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

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//Create Field List
$fields = "PersonFN, PersonLN";
$sql = "SELECT tblPeople.PersonFN, tblPeople.PersonLN";
$sql =  $sql." FROM tblPeople";
$result = $connection->runSelectQueryArrayNotEncoded($sql);

echo '{"data":' . (json_encode($result)) . "} ";
?>