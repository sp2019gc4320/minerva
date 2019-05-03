<?php
require_once 'dbcontroller.php';
$conn = new DBController();

$task="";
$isActive=0;
$taskNumber=$_POST['TaskNumber'];
if(isset($_POST['CoreComponentID'])){
$coreID= $_POST['CoreComponentID'];
}
echo $_POST['CoreComponentID'];
echo $coreID;
if(isset($_POST['Task'])){
	$task=$_POST['Task'];
}
if(isset($_POST['IsActive'])){
	$isActive=$_POST['IsActive'];
}

$sql="UPDATE tlkpCoreComponentTasks 
		SET
			Task='$task',
			IsActive='$isActive'
			WHERE TaskNumber='$taskNumber'
			AND  CoreComponentID='$coreID'";
		 	

$result = $conn->runQuery($sql);			















?>