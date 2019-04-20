<?php

require_once 'dbcontroller.php';

$conn = new DBController();

$sql = "SELECT * FROM tblusers WHERE (PRIVILEGE = 'Cadre')";
$res = $conn->runSelectQuery($sql);

$staffAry = array();

echo '{"Cadre" :[';
if($res->num_rows > 0)
{
	while($row = $res->fetch_assoc())
	{

		$temp = array( $row['UserLoginName'] );
		$staffAry = array_merge($staffAry,[json_encode($temp)]);
	}
	foreach ($staffAry as $key => $sa) {
		if ($key > 0) echo ',';
		echo ($sa);
	}

}
echo ']}';




?>