<?php

require_once 'dbcontroller.php';

$conn = new DBController();

$siteCompany =  array();
$staffAry = array();

$sql ="SELECT * FROM tlkpcadetcompany";

$res = $conn->runSelectQuery($sql);
echo '{ "company_list":[';
if($res->num_rows > 0)
{
	
	while($row = $res->fetch_assoc())
	{
		$temp = "Site ".$row['fkSiteID']." Company ".$row['CompanyID']." ";
		$siteCompany = array_merge($siteCompany,[$temp]);
	}
	echo (json_encode($siteCompany));
}
else{
	echo 'Could Not Retrieve Companies';
}

echo '], ';


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

echo'],';

$sql = "SELECT * FROM tblusers WHERE (PRIVILEGE = 'Cadre')";
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





$sql = "SELECT * FROM tblusers WHERE (PRIVILEGE = 'Case Mgr')";
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