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
$TableName = "MyLookup";
$SiteID = "1";
$SearchField = "AutoID";
$op = "Get_All";
$SearchValue = "3";

//replace defaults with values passed as POST parameter
if (isset($_POST['TableName'])) {
    $TableName = filter_input(INPUT_POST, 'TableName');
}
if (isset($_POST['SiteID'])) {
    $SiteID = filter_input(INPUT_POST, 'SiteID');
}
if (isset($_POST['SearchField'])) {
    $SearchField = filter_input(INPUT_POST, 'SearchField');
}
if (isset($_POST['op'])) {
    $op = filter_input(INPUT_POST, 'op');
}
if (isset($_POST['SearchValue'])) {
    $SearchValue = filter_input(INPUT_POST, 'SearchValue');
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
                $fieldValue = filter_input(INPUT_POST, $fieldName);
                $sanitizedFieldValue = $connection->sanitize($fieldValue);
                $sql = "UPDATE $TableName  set $fieldName = '$sanitizedFieldValue' WHERE $SearchField = '$SearchValue'";
                $connection->runQuery($sql);

                //here we update the Data field in MyLookup
                //first get the Data field for you table and split it into an array with ; as the delimiter
                //$sql="SELECT Data FROM mylookup WHERE TableName='$TableName'";
                //$sql="SELECT * FROM $TableName WHERE col_name NOT LIKE "AutoID"";
                $sql = "SELECT AllergyType FROM tlkpAllergyType";
                $result = $connection->runSelectQueryArray($sql);//this needs to return/save as a string
                //$fieldinfo1 = mysqli_fetch_object($result);
                //$sanitizedString = $connection->sanitize($fieldinfo1);
                //$resultSplit = explode(";", $result);
                //$searchvalue = index num and $sanitizedFieldValue = value edited
                //$result[$SearchValue]=$sanitizedFieldValue;//THIS WORKS
                //$resultSplit[$SearchValue+1]=$sanitizedFieldValue;
                //$result[1]=(string)$result[1];
                //print_r($result);
                //foreach ($result as &$value) {
               //     $value = $connection->sanitize((string)$result[1]);
               // }
                $QueryString = '';
                foreach ($result as $Key => $Value) {
                    //$QueryString .= ';' . $Key . '=' . $Value;
                    foreach ($Value as $Ke => $Valu){
                        $QueryString .= ';'.$Valu;
                    }
                }
                print_r($QueryString);
                //$resultString = implode(";", $result);
                //$resultString=(string)$resultString;
                //$resultString= $connection->sanitize($resultString);
                //update the Data field with the updated Data string
                $sql="UPDATE MyLookup set Data = '$QueryString' WHERE TableName='$TableName'";
                $connection->runQuery($sql);
            }
        }
    }

    echo '{ "status": "finished updating "}';

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