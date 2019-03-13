<?php
// File: zip_lookup.php
// echos a JSON  array with all records in Zip Table
//




require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Create JSON Element with a field named value: that contains an array of JSON objects
echo '{ "data":[';

//Create Field List

$fields = "ZIPCode, CityName, StateAbbr";

$sql = "SELECT ". $fields . " FROM tlkpZip";
$result = $connection->runSelectQuery($sql);

//$result is an array, num_rows provides length of array
if ($result->num_rows > 0)
{
    $count=0;

    //Create JSON object
    while($row = $result->fetch_assoc()) {
        //display comma
        if ($count >0 )
            echo ",";

           // echo  makeObject($row, "SiteCode|SiteAddress|SiteName|SiteCity|SiteState|SiteZip|SitePhone|SiteFax");
            echo  $connection->makeObject($row, $fields);

         $count = $count+1;
    }
}

echo '] }';
?>


