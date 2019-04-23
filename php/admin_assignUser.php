<?php

	require_once 'dbcontroller.php';

	$conn = new DBController();

	$user = $_POST["user"];
	$privilege = $_POST["privilege"];
	$siteCompany = $_POST["company"];

	$site = explode(" ", $siteCompany)[1];
	$company  = explode(" ", $siteCompany)[3];

	//echo "$user $site $company";


	$sql = "INSERT INTO tblcompanystaff Values(NULL,'".$user."', '".$site."' , '".$company."','".$privilege."')";

	$res=$conn->runQuery($sql);
	if(!$res)die("Fatal Error in Query");

	echo $privilege." ".$user." Added to ".$site." ".$company."";


?>