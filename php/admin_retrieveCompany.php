<?php


/*
	admin_retrieveCompany.php

	this is called when the company assignment view is called. It returns the following tables:

	company_list - a list of strings for each company name and site sorted by site
	
	companyStaffTbl - a list of all staff currently in the company staff table (sorted and linked in the js to the first table in functions linkMgrs and linkCadre)

	Cadre - a table of all available cadre in tblUsers that can be assigned a company
	
	CaseMgrs - a table of all available case managers in tblUsers that can be assigned a company
 */

require_once 'dbcontroller.php';

$conn = new DBController();

$siteCompany =  array();
$staffAry = array();


//this section selects all available companies from each site. 

$sql ="SELECT tlkpCadetCompany.fkSiteID, tlkpCadetCompany.CompanyID, tlkpsite.SiteName FROM tlkpCadetCompany JOIN tlkpsite ON(tlkpsite.SiteID = tlkpCadetCompany.fkSiteID) ";

$res = $conn->runSelectQuery($sql);
echo '{ "company_list":[';
if($res->num_rows > 0)
{
	
	while($row = $res->fetch_assoc())
	{
		$temp = "Site ".$row['fkSiteID']." Company ".$row['CompanyID']." ".$row['SiteName'];
		$siteCompany = array_merge($siteCompany,[$temp]);
	}
	echo (json_encode($siteCompany));
}
else{
	echo 'Could Not Retrieve Companies';
}

echo '], ';


//this section selects all currently assigned staff from the companystaff table. It is able to select all staff types for later iterations if needed

$sql = "SELECT * FROM tblcompanystaff";
$res = $conn->runSelectQuery($sql);
echo '"companyStaffTbl" :[';
if($res->num_rows > 0)
{
	while($row = $res->fetch_assoc())
	{

		$temp = array( 'user' => $row['fkUserLoginName'] , 'privilege' => $row['fkPrivilege'], 'site' => $row['fkSiteID'], 'company' => $row['fkCompanyID'] , 'assignmentID' => $row['companyStaffID']);
		$staffAry = array_merge($staffAry,[json_encode($temp)]);
	}
	foreach ($staffAry as $key => $sa) {
		if ($key > 0) echo ',';
		echo ($sa);
	}

}

//this section selects all the cadre from the users table

echo'],';

$sql = "SELECT * FROM tblUsers WHERE (PRIVILEGE = 'Cadre')";
$res = $conn->runSelectQuery($sql);

$staffAry = array();

echo '"Cadre" :[';
if($res->num_rows > 0)
{
	while($row = $res->fetch_assoc())
	{

		$temp = $row['UserLoginName'];
		$staffAry = array_merge($staffAry,[json_encode($temp)]);
	}
	foreach ($staffAry as $key => $sa) {
		if ($key > 0) echo ',';
		echo ($sa);
	}

}
echo '],';


//This section selects all case managers from the users table


$sql = "SELECT * FROM tblUsers WHERE (PRIVILEGE = 'Case Mgr')";
$res = $conn->runSelectQuery($sql);
$staffAry = array();
echo '"CaseMgrs" :[';
if($res->num_rows > 0)
{
	while($row = $res->fetch_assoc())
	{

		$temp =  $row['UserLoginName'] ;
		$staffAry = array_merge($staffAry,[json_encode($temp)]);
	}
	foreach ($staffAry as $key => $sa) {
		if ($key > 0) echo ',';
		echo ($sa);
	}

}





echo ']}';

?>
