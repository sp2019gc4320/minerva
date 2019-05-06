<?php
// File to Retrive list of
//Created By Graham Schunk PHP Code to retrieve each tasks TESTS and grabs them from the table
//connect to db controller
require_once 'dbcontroller.php';

//create connection
$connection = new DBController();
$id= $_POST['TaskTestID'];
$sql="SELECT TaskTestEventID,fkTaskTestID,TaskEvent,TaskEventMeas,IsActive,TaskEventFormat FROM tlkpTaskTestEvents WHERE fkTaskTestID='$id' ORDER BY TaskTestEventID";
$result = $connection->runSelectQuery($sql);

echo '{ "taskEventTbl":[';
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
        echo '{"fkTaskTestID": "' . $row["fkTaskTestID"]. '","TaskEventFormat": "' . $row["TaskEventFormat"]. '","TaskTestEventID": "' . $row["TaskTestEventID"]. '","TaskEvent": "' . $row["TaskEvent"]. '","TaskEventMeas": "' . $row["TaskEventMeas"]. '", "IsActive":"'.$row["IsActive"].'"}';
       
        $count = $count+1;
    }
} 
echo ']} ';

?>