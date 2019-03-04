
<?php
//mentor_getMatchWeek.php

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

function makeObject($row, $fieldinfo)
{
   $count = 0;
   $str = "{";

   foreach ($fieldinfo as $val)
   {
       $field = $val->name;

       //display comma
          if ($count >0 )
             $str = $str .  ",";

             //format output as an object -- specify each field along with its value
           $str=  $str . '"' .$field. '": "'.  $row[$field]. '" ';

       ++$count;
   }
   $str = $str .  '}';

   return $str;
}


$fkClassID = 1;
$MMatchDate = '2017-07-13';

if(isset($_POST['fkClassID'])){
    $fkClassID = filter_input(INPUT_POST, "fkClassID");
    }

 if(isset($_POST['MMatchDate'])){
     $MMatchDate = filter_input(INPUT_POST, "MMatchDate");
     }

  $sql = "SELECT ClassWeek
          FROM tlkpClassWeek
          WHERE ((fkClassID= $fkClassID) AND (ClassWeekStartDate <='$MMatchDate') AND (ClassWeekEndDate >= '$MMatchDate'))
          ";

  $result = $connection->runSelectQuery($sql);
  //print_r($result);


 //Create Field List
  $fieldinfo=mysqli_fetch_fields($result);
  echo '{ "data":[';

  if ($result->num_rows > 0)
  {
     $row = $result->fetch_assoc();
     echo  makeObject($row, $fieldinfo);
  }
  else{
     echo '{"ClassWeek": "" }';
  }

   echo '] }';

?>