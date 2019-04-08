<?php

require_once 'dbcontroller.php';

$conn = new DBController();

$siteCompany =  array();



$sql ="SELECT * FROM tlkpcadetcompany";

$res = $conn->runSelectQuery($sql);
if($res->num_rows > 0)
{
	while($row = $res->fetch_assoc())
	{
		$temp = "Site ".$row['fkSiteID']." Company ".$row['CompanyID'];
		$siteCompany = array_merge($siteCompany,[$temp]);
	}
	echo (json_encode($siteCompany));
}
else{
	echo 'Could Not Retrieve Companies';
}


?>