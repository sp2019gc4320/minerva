<?php
// File: lookup_update.php
// Demonstrates accessing products table in sportsstore database and query database
// Used by
//    web-dropdown-helper.controller.js
//

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

var_dump($_SERVER['REQUEST_METHOD']);

echo ' POST var dump';
var_dump($_POST);

echo ' print_r _POST';
print_r($_POST);


//Query Database

if(isset($_POST['TableName']))
{
    $TableName = $_POST['TableName'];

    if(isset($_POST['data']))
      {
          $data = filter_input(INPUT_POST, "data");

          //added below 4/11/19 - check to see if works??
          $data=$connection->sanitize($data);

          $connection->runQuery("UPDATE tlkpWebsiteLookups set data = '$data' WHERE TableName='$TableName'");
          //$connection->runQuery("UPDATE MyLookUp set data = '$data' WHERE TableName='$TableName'");
      }
}

?>

<pre>
<?php var_dump($_POST); ?>
</pre>

<pre>
<?php var_dump($_SERVER['REQUEST_METHOD']); ?>
</pre>
