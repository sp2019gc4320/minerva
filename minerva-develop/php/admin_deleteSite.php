<?php
require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$siteID=$_POST['SiteID'];

$sql="DELETE FROM tlkpSite WHERE SiteID='$siteID'";

$result = $connection->runQuery($sql);
?>
