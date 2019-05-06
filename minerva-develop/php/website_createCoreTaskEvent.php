<?php
//Created By Graham Schunk, PHP code that contacts the database to add a new Task
//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();


if(isset($_POST["fkTaskTestID"])){
	$taskTestID=$_POST["fkTaskTestID"];
}
$sql="INSERT INTO tlkpTaskTestEvents(fkTaskTestID) values('$taskTestID')";

$result = $conn->createRecord($sql);


?>