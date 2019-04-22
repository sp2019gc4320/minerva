<?php
//File: getRecord.php
//Used by:
//   site-setup.component.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


class Row
{

}


//1.  Read the table structure for a specific table
$TableName = "tlkpSite";
$FieldName = "SiteID";
$FieldValue = "1";

//$TableName = "tblClassDetails";
//$FieldName = "ClassDetailID";
//$FieldValue = "7";

$obj =  new Row;

  $sql = "SELECT * FROM ".$TableName." WHERE " .$FieldName. " = '". $FieldValue."'";
  if ($result = $connection->runSelectQuery($sql))
  {

   $fieldinfo=mysqli_fetch_fields($result);
   $row = $result->fetch_assoc();
   foreach ($fieldinfo as $val)
    {
    //printf("Name: %s\n",$val->name);
    //printf("type: %s\n",$val->type);
    //printf("max. Len: %d\n",$val->max_length);

        $obj->{$val->name} = new Row;

        $dataValue = $row[$val->name];
        if ($dataValue == null)
        {
           $dataValue = "";
        }
        $obj->{$val->name}->value = $dataValue;

        $dataType = "unknown";
          $obj->{$val->name}->length = $val->length;

        switch($val->type)
        {
           case 3: $dataType = 'INT'; break;
           case 253: $dataType = "VARCHAR"; break;
           case 1: $dataType = "TINYINT"; break;
           case 252: $dataType = "LONGTEXT"; $obj->{$val->name}->length =50; break;
           case 253: $dataType = "DOUBLE"; break;
           case 12: $dataType = "DATETIME"; break;
        };

        $obj->{$val->name}->type = $dataType;
        //$obj->{$val->name}->max_length = $val->max_length;

    }
    }

 echo '{ "data": '.json_encode($obj). '}';
?>