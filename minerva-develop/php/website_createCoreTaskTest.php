<?php
//Created By Graham Schunk, PHP code that contacts the database to add a new Task
//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();


if(isset($_POST["fkTaskID"])){
	$taskID=$_POST["fkTaskID"];
}
$sql="INSERT INTO tlkpTaskTests(fkTaskID) values('$taskID')";

$result = $conn->createRecord($sql);


?>