<?php
// File: minerva_getSiteSettings.php
// echos a JSON  array with all records in Site Table
// Used by: login.component.js


require_once 'dbcontroller.php';

$SiteID = $_POST['SiteID'];

//Create connection
$connection = new DBController();

$fields = "SiteID, PrimaryColor, SecondaryColor, TertiaryColor, InputTextColor, LabelTextColor, InputBackgroundColor, SiteLogo";
$sql = "SELECT ". $fields . " FROM tlkpSite WHERE SiteID= '". $SiteID."'";

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>


