<?php
// Created By Graham Schunk This php Code will update or delete the task TESTS based on whats passed to it.
require_once 'dbcontroller.php';
$conn = new DBController();

$task="";
$isActive=0;
$op="";
if(isset($_POST['TaskTestEventID'])){
	$taskEventID= $_POST['TaskTestEventID'];
}
if(isset($_POST['TaskEvent'])){
	$taskEvent=$_POST['TaskEvent'];
}
if(isset($_POST['IsActive'])){
	$isActive=$_POST['IsActive'];
}
if(isset($_POST['TaskEventMeas'])){
	$taskEventMeas=$_POST['TaskEventMeas'];
}
if(isset($_POST['TaskEvent'])){
	$taskEventFormat=$_POST['TaskEventFormat'];
}
if(isset($_POST['op'])){
	$op=$_POST['op'];
}

if($op=='DELETE'){
$sql="DELETE FROM tlkpTaskTestEvents WHERE TaskTestEventID='$taskEventID'";
$result=$conn->runQuery($sql);
}
else{
$sql="UPDATE tlkpTaskTestEvents 
		SET
			TaskEvent='$taskEvent',
			IsActive='$isActive',
			TaskEventMeas='$taskEventMeas',
			TaskEventFormat='$taskEventFormat'
			WHERE TaskTestEventID=$taskEventID";
		 	

$result = $conn->runQuery($sql);			

}

?>