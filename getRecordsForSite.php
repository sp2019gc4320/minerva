<?php
// File: getRecordsForSite.php
// Receives a [CadetID] and returns all ClassDetails for Cadet
// Used by
//   site/lookups/lookup-details.controller.js
//   admin/site-dropdown/dropdown-helper.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//Default values  used for testing
$TableName = 'tlkpSiteServiceSites';
$SiteID = '1';

//Replace Default values with POST parameters (Caleb: since gotten from storage, these values don't need to be sanitized)
if (isset($_POST['TableName'])) {
    $TableName = filter_input(INPUT_POST, "TableName");
}

if (isset($_POST['SiteID'])) {
    $SiteID = filter_input(INPUT_POST, "SiteID");
}

$sql = "SELECT * FROM $TableName WHERE fkSiteID = '$SiteID'";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";

?>
