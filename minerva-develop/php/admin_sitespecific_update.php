<?php

// File: admin_sitespecific_update.php
// Used by:
//   admin/site-dropdown/site-dropdown.component.js
//   admin/site-dropdown/dropdown-helper.controller.js
//	 admin/site-dropdown/site-dropdown.view.html
//   admin/site-dropdown/dropdown-helper.view.html

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Default values for testing if nothing is passed as a parameter
$TableName = "TestTable";
$SiteID = "1";
$SearchField = "AutoID";
$op = "Update";
$SearchValue = "3";

//replace defaults with values passed as POST parameter
if (isset($_POST['TableName'])) {
    $TableName = filter_input(INPUT_POST, 'TableName', FILTER_SANITIZE_STRING);
}
if (isset($_POST['SiteID'])) {
    $SiteID = filter_input(INPUT_POST, 'SiteID', FILTER_SANITIZE_NUMBER_INT);
}
if (isset($_POST['SearchField'])) {
    $SearchField = filter_input(INPUT_POST, 'SearchField', FILTER_SANITIZE_STRING);
}
if (isset($_POST['op'])) {
    $op = filter_input(INPUT_POST, 'op', FILTER_SANITIZE_STRING);
}
if (isset($_POST['SearchValue'])) {
    $SearchValue = filter_input(INPUT_POST, 'SearchValue', FILTER_SANITIZE_NUMBER_INT);
}


if ($op == "Delete") {
    $sql = "DELETE FROM $TableName WHERE $SearchField = $SearchValue";
    $result = $connection->runDeleteQuery($sql);
    return $result;

}
else if ($op == "Update") {
    //1. Find all fields from table -- I really just need structure
    $sql = "SELECT * FROM $TableName WHERE  $SearchField = '$SearchValue'";

    if ($result = $connection->runSelectQuery($sql)) {
        $fieldinfo = mysqli_fetch_fields($result);
        //$row = $result->fetch_assoc();
        foreach ($fieldinfo as $val) {
            $fieldName = $val->name;

            //check to see if there is a post value
            if (isset($_POST[$fieldName])) {
                $fieldValue = filter_input(INPUT_POST, $fieldName, FILTER_SANITIZE_STRING);
                $sanitizedFieldValue = $connection->sanitize($fieldValue);
                $sql = "UPDATE $TableName  set $fieldName = '$sanitizedFieldValue' WHERE $SearchField = '$SearchValue'";
                $connection->runQuery($sql);
            }
        }
    }
    echo '{ "status": "finsihed updating "}';
}
else if ($op == "Create") {
    //Unset Columns we dont want in query
    if (isset($_POST['AutoID']))
        unset($_POST['AutoID']);

    if (isset($_POST['TableName']))
        unset($_POST['TableName']);

    if (isset($_POST['op']))
        unset($_POST['op']);

    $fields = array();
    $values = array();
    foreach ($_POST as $field => $value) {
        $fields[] = $field;

        // $fieldValue = filter_input(INPUT_POST, $field);
        $sanitizedFieldValue = $connection->sanitize($_POST[$field]);
        $values[] = "'" . $sanitizedFieldValue . "'";

    }

    $sql = "INSERT INTO  $TableName (" . implode(", ", $fields) . ") values (" . implode(", ", $values) . ")";
    echo $sql;
    $result = $connection->createRecord($sql);
    return $result;

}
else if ($op == "Get_All") {
    $sql = "SELECT * FROM  $TableName";
    $result = $connection->runSelectQueryArray($sql);
    echo '{"data":' . (json_encode($result)) . "} ";
}


?>