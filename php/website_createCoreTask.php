<?php
//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

if(isset($_POST["CoreComponentID"])){
$coreID= $_POST["CoreComponentID"];
}
if(isset($_POST["TaskNumber"])){
	$taskNumber=$_POST["TaskNumber"];
}
$sql="INSERT INTO tlkpCoreComponentTasks(CoreComponentID,TaskNumber) values('$coreID','$taskNumber')";

$result = $conn->createRecord($sql);


?>