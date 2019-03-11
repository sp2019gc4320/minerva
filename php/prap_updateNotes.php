<?php
// File: updateDuty.php
// Updates Duty entries
// Prints JSON array
// Needs CadetID

//connect to db controller
require_once 'dbcontroller.php';

// cadet id to test with
$CadetID = "12";

//create connection
$conn = new DBController();

// assign variables to content sent to server in prap.view.html
$GenNote= $_POST['GenNote'];
$GenNoteID= $_POST['GenNoteID'];
$NoteEditorID= $_POST['NoteEditorID'];
$NoteCreatorID= $_POST['NoteCreatorID'];
$NoteCreatedDate = $_POST['NoteCreatedDate'];
$NoteEditedDate = $_POST['NoteEditedDate'];

// query to update tblGenNotes
$sql1 = "UPDATE tblGenNotes
         INNER JOIN tblClassDetails 
         ON tblClassDetails.ClassDetailID = tblGenNotes.fkClassDetailID 
         SET GenNote='$GenNote', 
             GenNoteID='$GenNoteID',
             NoteEditorID='$NoteEditorID',
             NoteCreatedDate='$NoteCreatedDate',
             NoteCreatorID='$NoteCreatorID',
             NoteEditedDate='$NoteEditedDate'
         WHERE tblClassDetails.fkCadetID= '$CadetID' AND GenNoteID='$GenNoteID'";

// send first query
$result = $conn->runQuery($sql1);
if ($result === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: $sql1";
}

//$connection->close();
?>