<?php

	require_once 'dbcontroller.php';

	$conn = new DBController();

	$user = $_POST["user"];
	$siteCompany = $_POST["company"];

	$site = explode(" ", $siteCompany)[1];
	$company  = explode(" ", $siteCompany)[3];

	//echo "$user $site $company";


	$sql = "DELETE FROM tblcompanystaff WHERE(fkUserLoginName='".$user."' AND fkSiteID='".$site."' AND fkCompanyID='".$company."')";

	$res=$conn->runQuery($sql);
	if(!$res)die("Fatal Error in Query");

	echo $user." Removed from ".$site." ".$company."";


?>