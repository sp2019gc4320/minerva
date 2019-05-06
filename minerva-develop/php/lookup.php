<?php
// File: lookup.php
// Receives a [TableName] and returns an array with all data values for that each field
// Used by:
//   web-dropdown-helper.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


echo '{';

if (isset($_POST['TableName'])) {
    $TableName = filter_input(INPUT_POST, "TableName");

    $sql = "SELECT Data, Structure  FROM tlkpWebsiteLookups WHERE TableName = '" . $TableName . "'";
    $result = $connection->runSelectQuery($sql);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $dataValue = $row["Data"];
        $structureValue = $row["Structure"];

        echo ' "data": "' . $dataValue . '"';
        echo ', "structure": "' . $structureValue . '"';
    }
}

echo '}';
?>


