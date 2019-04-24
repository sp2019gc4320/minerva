<?php
require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$siteID=$_POST["siteID"];

$sql="DELETE FROM tlkpSite WHERE SiteID='$siteID'";

$result = $conn->runQuery($sql);
?>