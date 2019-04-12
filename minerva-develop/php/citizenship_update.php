<?php

//citizenship_update.php

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//set default mentor potentialID this should be overwritten
/*$fkClassDetailID =;
$fkTaskID = ;
$fkTaskTestEventID;*/



if(isset($_POST['fkTaskID'])){
     $fkTaskID = filter_input(INPUT_POST, 'fkTaskID');
     unset($_POST['fkTaskID']);
 }


if(isset($_POST['ClassDetailID'])){
     $fkClassDetailID = filter_input(INPUT_POST, 'ClassDetailID');
     unset($_POST['ClassDetailID']);
 }


if(isset($_POST['fkTaskTestEventID'])){
     $fkTaskTestEventID = filter_input(INPUT_POST, 'fkTaskTestEventID');
     unset($_POST['fkTaskTestEventID']);
 }



 $sql = "SELECT tblCadetClassEvents.*
          FROM   tblCadetClassEvents
          WHERE  fkClassDetailID='$fkClassDetailID' AND fkTaskID='$fkTaskID' AND fkTaskTestEventID='$fkTaskTestEventID'
         ";

  if ($result = $connection->runSelectQuery($sql)){

     $fieldinfo=mysqli_fetch_fields($result);
     $row = $result->fetch_assoc();

     foreach ($fieldinfo as $val) {
        $fieldName = $val->name;


       // check to see if there is a post value
       if(isset($_POST[$fieldName])){
            $fieldValue = filter_input(INPUT_POST, $fieldName);

  
              $sql = "UPDATE tblCadetClassEvents  set $fieldName = '$fieldValue'
                     WHERE  fkClassDetailID='$fkClassDetailID' AND fkTaskID='$fkTaskID' AND fkTaskTestEventID='$fkTaskTestEventID'";

                  $connection->runQuery($sql);
              }
    }
  }



 echo '{ "status": "finsihed updating "}';
?>