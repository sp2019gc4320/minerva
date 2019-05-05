<?php
// File: prap_getPrapNotes.php
// Receives a [CadetID] and returns all of GeneralNotes
// Used by prap_controller.js

require_once 'dbcontroller.php';


//Create connection
$connection = new DBController();

//Default value for testing
$CadetID="12";

//Replaced by POST parameter
if(isset($_POST['CadetID'])) {
    $CadetID = filter_input(INPUT_POST, "CadetID");
}

//Create Field List
$fields = "GenNoteID, ClassDetailID, GenNoteTopic, GenNote, CadetID, TrackerCode, NoteEditedDate, NoteEditorID, NoteCycle, NoteCreatorID, NoteCreatedDate";

$sql = "SELECT GenNoteID, tblGenNotes.fkClassDetailID AS ClassDetailID,GenNoteTopic, GenNote,
               TrackerCode, NoteEditedDate, NoteEditorID, NoteCycle, NoteCreatorID, NoteCreatedDate,
               tblClassDetails.fkCadetID AS CadetID
               FROM tblGenNotes JOIN tblClassDetails
               WHERE tblGenNotes.GenNoteTopic='PRAP' AND tblClassDetails.fkCadetID= '$CadetID'
               AND tblClassDetails.ClassDetailID = tblGenNotes.fkClassDetailID";

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{ "data":' . urldecode(json_encode($result)) . "} ";

?>



