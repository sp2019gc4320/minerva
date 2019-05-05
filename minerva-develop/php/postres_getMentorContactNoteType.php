<?php
// File: postres_getMentorContactNoteType.php
// echos a JSON  array with all records in MentorContactType column in tblMentorContacts for postres mentor contact note type dropdown
// Used by:
//   prap.controller.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$fields = "MentorContactType";
$sql = "SELECT DISTINCT ". $fields ." FROM tblMentorContacts";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"data":' . urldecode(json_encode($result)) . "} "

?>