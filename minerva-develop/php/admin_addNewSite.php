<?php
// File: admin_addNewSite.php
// Add a new site to the database

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$siteID= $_POST['siteID'];
$siteName=$_POST['siteName'];
$siteCode=$_POST['siteCode'];
$siteAddress=$_POST['siteAddress'];
$siteCity= $_POST['siteCity'];
$siteState= $_POST['siteState'];
$siteZip=$_POST['siteZip'];
$sitePhone=$_POST['sitePhone'];
$siteFax=$_POST['siteFax'];
$schoolType=$_POST['schoolType'];
$startingNGB=$_POST['startingNGB'];
$usdaSchoolLunch=$_POST['usdaSchoolLunch'];
$studentGovt=$_POST['studentGovt'];
$backgroundChkSrc=$_POST['backgroundChkSrc'];
$defaultTABEVers=$_POST['defaultTABEVers'];
$unionsCount=$_POST['unionsCount'];
$sec501c3AltFunding=$_POST['sec501c3AltFunding'];
$sec501c3Foundation=$_POST['sec501c3Foundation'];
$requireSSN=$_POST['requireSSN'];
$siteLogo=$_POST['siteLogo'];
$legislatorLink=$_POST['legislatorLink'];
$primaryColor="#E0E0E0";
$secondaryColor="#0080FF";
$tertiaryColor="#FFFF66";
$inputTextColor="#202020";
$labelTextColor="#66ffff";
$inputBackgroundColor="#000000";



$sql = "INSERT INTO
        tlkpSite
        (SiteID,SiteName,SiteCode,SiteAddress,SiteCity,SiteState, SiteZip, SitePhone, SiteFax, SchoolType, StartingNGB, USDASchoolLunch, StudentGovt, BackgroundChkSrc, 
        DefaultTABEVers, UnionsCount, Sec501c3AltFunding, Sec501c3Foundation, RequireSSN, SiteLogo, LegislatorLink, PrimaryColor, SecondaryColor, TertiaryColor,
        InputTextColor, LabelTextColor, InputBackgroundColor) 
 VALUES ('$siteID','$siteName','$siteCode','$siteAddress','$siteCity','$siteState','$siteZip','$sitePhone','$siteFax','$schoolType','$startingNGB','$usdaSchoolLunch','$studentGovt','$backgroundChkSrc','$defaultTABEVers','$unionsCount','$sec501c3AltFunding','$sec501c3Foundation','$requireSSN','$siteLogo','$legislatorLink','$$primaryColor','$secondaryColor','$tertiaryColor', '$inputTextColor', '$labelTextColor', '$inputBackgroundColor');";

$result = $conn->createRecord($sql);

?>
