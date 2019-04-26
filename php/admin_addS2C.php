<?php
// File: admin_addClass.php
// Add a new class to the database
// Prints JSON array
//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$serviceSite = $_POST['serviceSite'];
$siteDescript = $_POST['siteDescript'];
$reportCode = $_POST['reportCode'];
$siteStatus = $_POST['siteStatus'];
$siteID = $_POST['siteID'];
//tblclasses

$sql = "INSERT INTO 
        tlkpservicesite
        (AutoID, ServiceSite, ServiceSiteDesc, ReportingCode, IsActive, fkSiteID) 
        VALUES 
        ('$serviceSite', '$siteDescript', '$reportCode', '$siteStatus', '$siteID');";

$result = $conn->runQuery($sql);

print_r($sql);
?>