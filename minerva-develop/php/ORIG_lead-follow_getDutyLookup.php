<?php
// File: getDutyLookup.php
// echos a JSON  array with all records in tlkpJBDutyPosition Table for Lead/Follow Resdiental Tab
//

require_once 'dbcontroller.php';

function makeObject($row, $fieldNames)
{
   //Create array of field names
   $fieldArray = explode(", ", $fieldNames);
   $length = count($fieldArray);
   $count = 0;
   $str = "{";

   while($count < $length)
   {
       $field = $fieldArray[$count];

        //display comma
         if ($count >0 )
             $str = $str .  ",";

             //format output as an object
         $str=  $str . '"' .$field. '": "'.  $row[$field]. '" ';

       ++$count;
   }
   $str = $str .  '}';

   return $str;

}

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

            echo  makeObject($row, $fields);

         $count = $count+1;
    }
}

echo '] }';
?>


