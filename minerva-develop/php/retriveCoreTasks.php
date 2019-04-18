<?php
// File to Retrive list of

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$connection = new DBController();

$coreComponentID= $_POST['CoreComponentID'];

$sql="SELECT TaskNumber, Task, IsActive FROM tlkpCoreComponentTasks WHERE CoreComponentID=$coreComponentID";

$result = $connection->runSelectQuery($sql);

echo '{ "taskTbl":[';
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
        echo '{"TaskNumber": "' . $row["TaskNumber"]. '", "Task": "' . $row["Task"]. '", "IsActive":"'.$row["TaskNumber"].'"}';
       
        $count = $count+1;
    }
} 
echo ']} ';

//$connection->close();
?>
        