<?php
// File: getReportLookup.php
// echos a JSON  array with all records in tblprreports Table for postres PRReportType Tab
// Used by
//  postres.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "p.PersonFN,p.PersonLN,p.PersonID, q.PersonType";
$sql = "SELECT DISTINCT ". $fields ." FROM tblpeople p, tblpersontypes t, tlkppersontype q WHERE p.PersonID = t.fkPersonID AND t.fkPersonTypeID = q.PersonTypeID AND t.fkPersonTypeID BETWEEN '0' AND '5' ORDER BY PersonLN ASC";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . (json_encode($result)) . "} ";
?>
