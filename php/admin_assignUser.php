<?php


	/*
		admin_assignUser.php 

		this is called from the compassign.controller.js function addUser. It is posted with parameters:
		User - the user to be added to the companystaff table
		Privilege - the type of user, currently limited to cadre and case managers
		Company - this is broken down to site and company

		the values for insert are:
		companyStaffID(auto-increments and should be left NULL)
		fkUserLoginName,
		fkSiteID,
		fkCompanyID,
		fkPrivilege

	 */
	require_once 'dbcontroller.php';

	$conn = new DBController();

	$user = $_POST["user"];
	$privilege = $_POST["privilege"];
	$siteCompany = $_POST["company"];

	$site = explode(" ", $siteCompany)[1];
	$company  = explode(" ", $siteCompany)[3];


	$sql = "INSERT INTO tblcompanystaff Values(NULL,'".$user."', '".$site."' , '".$company."','".$privilege."')";

	$res=$conn->runQuery($sql);
	if(!$res)die("Fatal Error in Query");

	echo $privilege." ".$user." Added to ".$site." ".$company."";


?>