<?php
// File: updateDuty.php
// Updates Duty entries
// Prints JSON array
// Needs CadetID

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//default to updating
$op ='UPDATE';

$genNoteID = 2;


if(isset($_POST['GenNoteID'])){
    $genNoteID = filter_input(INPUT_POST, "GenNoteID", FILTER_SANITIZE_NUMBER_INT);
    unset($_POST['GenNoteID']);
}

if(isset($_POST['op'])){
    $op = filter_input(INPUT_POST, "op", FILTER_SANITIZE_STRING);
    unset($_POST['op']);
}

if($op == 'UPDATE')
{
    $sql = "SELECT tblGenNotes.*
          FROM tblGenNotes
          WHERE
          GenNoteID= $genNoteID
          ";
    $result = $connection->runSelectQuery($sql);
    if ($result){
        $fieldInfo=mysqli_fetch_fields($result);
        $row = $result->fetch_assoc();

        foreach ($fieldInfo as $val) {
            $fieldName = $val->name;

            // check to see if there is a post value
            if(isset($_POST[$fieldName])){
                $fieldValue = $connection->sanitize($_POST[$fieldName]);
                $fieldValue = filter_var($fieldValue, FILTER_SANITIZE_ENCODED);
                $sql = "UPDATE tblGenNotes set $fieldName = '$fieldValue' WHERE  GenNoteID=$genNoteID";
                $connection->runQuery($sql);
            }
        }
    }

    echo '{ "status": "finsihed updating "}';
}
else if ($op=='ADD')
{
    $fkClassDetailID = filter_input(INPUT_POST, "fkClassDetailID", FILTER_SANITIZE_NUMBER_INT);
    $genNoteTopic = filter_input(INPUT_POST, "GenNoteTopic", FILTER_SANITIZE_STRING);
    $noteCreatorID =filter_input(INPUT_POST, "NoteCreatorID", FILTER_SANITIZE_NUMBER_INT);
    $noteEditorID = filter_input(INPUT_POST, "NoteEditorID", FILTER_SANITIZE_NUMBER_INT);
    $noteCreatedDate = $connection->getRightFormat($connection->sanitize($_POST['NoteCreatedDate']));
    $noteEditedDate = $connection->getRightFormat($connection->sanitize($_POST['NoteEditedDate']));
    $genNote = $connection->sanitize($_POST['GenNote']);
    $genNote = filter_var($genNote, FILTER_SANITIZE_ENCODED);

    $sql = "INSERT INTO tblGenNotes ( fkClassDetailID, GenNoteTopic, NoteCreatorID, NoteEditorID, NoteCreatedDate, NoteEditedDate, GenNote)
             VALUES ('$fkClassDetailID',  '$genNoteTopic',  '$noteCreatorID',  '$noteEditorID', '$noteCreatedDate', '$noteEditedDate', '$genNote')";

    $connection->createRecord($sql);


}
else if ($op =='DELETE')
{
    $sql = " DELETE FROM tblGenNotes
               WHERE  GenNoteID=$genNoteID
             ";
    $connection->runDeleteQuery($sql);

}

?>