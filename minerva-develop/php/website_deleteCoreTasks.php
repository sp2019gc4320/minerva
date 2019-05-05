<?php
require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();
$taskNumber=$_POST["TaskNumber"];
if(isset($_POST["CoreComponentID"])){
$coreID= $_POST["CoreComponentID"];
}

$sql="DELETE FROM tlkpCoreComponentTasks WHERE TaskNumber='$taskNumber' AND CoreComponentID='$coreID'";
$result=$connection->runQuery($sql);


?>