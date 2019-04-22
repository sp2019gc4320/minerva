<?php

//admin_site_update.php
// Used by admin/site-setup/site-setup.component.js
//         admin/site-setup/site-setup.view.html

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//Default values for testing if nothing is passed as POST parameter
$TableName = "tlkpSite";
$searchField = "SiteID";
$searchValue = "2";

//Replace defaults with values passed as POST parameters.
if (isset($_POST['UpdateTable'])) {
    $TableName = filter_input(INPUT_POST, 'UpdateTable', FILTER_SANITIZE_STRING);
}
if (isset($_POST['SearchField'])) {
    $searchField = filter_input(INPUT_POST, 'SearchField', FILTER_SANITIZE_STRING);
}
if (isset($_POST['SearchValue'])) {
    $searchValue = filter_input(INPUT_POST, 'SearchValue', FILTER_SANITIZE_NUMBER_INT);
}

//1. Find all fields from table -- get existing value -- I really just need structure
$sql = "SELECT * FROM " . $TableName . " WHERE " . $searchField . " = '" . $searchValue . "'";
if ($result = $connection->runSelectQuery($sql)) {

    $fieldinfo = mysqli_fetch_fields($result);
    //$row = $result->fetch_assoc();
    foreach ($fieldinfo as $val) {
        $fieldName = $val->name;

        //check to see if there is a POST value
        if (isset($_POST[$fieldName])) {
            $fieldValue = filter_input(INPUT_POST, $fieldName, FILTER_SANITIZE_STRING);
            $sql = "UPDATE $TableName  set $fieldName = '$fieldValue' WHERE $searchField = '$searchValue'";
            $connection->runQuery($sql);
        }
    }
}

echo '{ "status": "finsihed updating "}';
?>