<?php
// File: getDutyLookup.php
// echos a JSON  array with all records in tlkpJBDutyPosition Table for Lead/Follow Resdiental Tab
//

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();



//Create Field List

$fields = "DutyPosition";
$sql = "SELECT ". $fields ." FROM tlkpJBDutyPosition";


$result = $connection->runSelectQuery($sql);
echo '{ "data":[';

//$result is an array, num_rows provides length of array
if ($result->num_rows > 0)
{
    $count=0;

    //Create JSON object
    while($row = $result->fetch_assoc()) {
        //display comma
        if ($count >0 )
            echo ",";

            echo  $connection->makeObject($row, $fields);

         $count = $count+1;
    }
}

echo '] }';
?>


