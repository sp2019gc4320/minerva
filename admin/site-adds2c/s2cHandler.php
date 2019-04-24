<?php

require_once("../sqlSts.php");

$conn = connectDB();
$site = $_POST['serviceSite'];
$descript = $_POST['descript'];
$group = $_POST['rGroup'];
$isActive = $_POST['isActive'];

if($group == " ")
{
    $group=NULL;
}

$query = "INSERT INTO tlkpservicesite (AutoID, ServiceSite, ServiceSiteDesc, ReportingCode, IsActive, fkSiteID)
VALUES (0, \"$site\", \"$descript\", \"$group\", \"$isActive\", 0);";
$conn->query($query);

$message = "Site Successfully added";
echo "<script type='text/javascript'>alert('$message');
window.location.href='../admin.view.html';</script>";
?>