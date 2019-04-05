<?php


$task="";
$isActive=0;
$taskNumber=$_POST["TaskNumber"];
if(isset($_POST["CoreComponentID"])){
$coreID= $_POST["CoreComponentID"];
}
if(isset($_POST["Task"])){
	$task=$_POST["Task"];
}
if(isset($_POST["IsActive"])){
	$isActive=$_POST["IsActive"];
}

$sql="UPDATE tlkpCoreComponentTasks 
		SET
			Task='$task',
			IsActive='$isActive'
			WHERE TaskNumber='taskNumber'
			AND  CoreComponentID='$coreID'";
		 	

$result = $conn->runQuery($sql);			















?>