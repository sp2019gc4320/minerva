<?php
// Created By Graham Schunk This php Code will update or delete the task TESTS based on whats passed to it.
require_once 'dbcontroller.php';
$conn = new DBController();

$task="";
$isActive=0;
$op="";
if(isset($_POST['TaskTestID'])){
$testID= $_POST['TaskTestID'];
}
if(isset($_POST['TaskTest'])){
	$task=$_POST['TaskTest'];
}
if(isset($_POST['IsActive'])){
	$isActive=$_POST['IsActive'];
}
if(isset($_POST['op'])){
	$op=$_POST['op'];
}

if($op=='DELETE'){
$sql="DELETE FROM tlkpTaskTests WHERE TaskTestID='$testID'";
$result=$conn->runQuery($sql);
}
else{
$sql="UPDATE tlkpTaskTests 
		SET
			TaskTest='$task',
			IsActive='$isActive'
			WHERE TaskTestID=$testID";
		 	

$result = $conn->runQuery($sql);			

}

?>