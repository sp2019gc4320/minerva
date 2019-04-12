<?php
//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

if(isset($_POST["CoreComponentID"])){
$coreID= $_POST["CoreComponentID"];
}
$sql="INSERT INTO tlkpCoreComponentTasks(CoreComponentID) values('$coreID')";

$result = $conn->createRecord($sql);


?>