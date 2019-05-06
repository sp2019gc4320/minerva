<?php
require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();
$taskID=$_POST["TaskID"];
$sql="DELETE FROM tlkpCoreComponentTasks WHERE TaskID='$taskID'";
$result=$connection->runQuery($sql);


?>