<?php

require_once 'dbcontroller.php';
$conn = new DBController();

$serviceSite = $_POST['serviceSite'];
$siteDescript = $_POST['siteDescript'];
$reportCode = $_POST['reportCode'];
$siteStatus = $_POST['siteStatus'];
$siteID = $_POST['siteID'];

$sql = "INSERT INTO 
        tlkpservicesite
        (AutoID, ServiceSite, ServiceSiteDesc, ReportingCode, IsActive, fkSiteID) 
        VALUES 
        ('$serviceSite', '$siteDescript', '$reportCode', '$siteStatus', '$siteID');";

$result = $conn->runQuery($sql);

print_r($sql);
?>