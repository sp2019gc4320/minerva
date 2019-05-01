<?php
// File to Retrive list of
//Created By Graham Schunk PHP Code to retrieve each tasks TESTS and grabs them from the table
//connect to db controller
require_once 'dbcontroller.php';

//create connection
$connection = new DBController();
$id= $_POST['TaskID'];
$sql="SELECT TaskTestID,fkTaskID,TaskTest,IsActive FROM tlkpTaskTests WHERE fkTaskID='$id' ORDER BY TaskTestID";
$result = $connection->runSelectQuery($sql);

echo '{ "testTbl":[';
//print_r($result);
if ($result->num_rows > 0) 
{
	$count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {
    	
    	//display comma
        if ($count >0 )
        	echo ",";
      
      	//format output as an object -- specify each field along with its value
        echo '{"fkTaskID": "' . $row["fkTaskID"]. '","TaskTestID": "' . $row["TaskTestID"]. '","TaskTest": "' . $row["TaskTest"]. '", "IsActive":"'.$row["IsActive"].'"}';
       
        $count = $count+1;
    }
} 
echo ']} ';

?>