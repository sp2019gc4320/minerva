<?php
// Created By Graham Schunk This php Code will update or delete the task based on whats passed to it.
require_once 'dbcontroller.php';
$conn = new DBController();

$task="";
$isActive=0;
$op="";
$taskNumber=$_POST['TaskNumber'];
if(isset($_POST['TaskID'])){
$taskID= $_POST['TaskID'];
}
if(isset($_POST['Task'])){
	$task=$_POST['Task'];
}
if(isset($_POST['IsActive'])){
	$isActive=$_POST['IsActive'];
}
if(isset($_POST['op'])){
	$op=$_POST['op'];
}

if($op=='DELETE'){
$sql="DELETE FROM tlkpCoreComponentTasks WHERE TaskID='$taskID'";
$result=$conn->runQuery($sql);
}
else{
$sql="UPDATE tlkpCoreComponentTasks 
		SET
			TaskNumber='$taskNumber',
			Task='$task',
			IsActive='$isActive'
			WHERE TaskID=$taskID";
		 	

$result = $conn->runQuery($sql);			

}













?>