<?php
// File: updateDuty.php
// Updates Duty entries
// Prints JSON array
// Needs CadetID

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

$op ='UPDATE';
$genNoteID = 2;


if(isset($_POST['GenNoteID'])){
    $genNoteID = filter_input(INPUT_POST, "GenNoteID");
    unset($_POST['GenNoteID']);
}

if(isset($_POST['op'])){
    $op = filter_input(INPUT_POST, "op");
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
                $fieldValue = filter_input(INPUT_POST, $fieldName);
                $sql = "UPDATE tblGenNotes set $fieldName = '$fieldValue' WHERE  GenNoteID=$genNoteID";
                $connection->runQuery($sql);
            }

        }
    }


    echo '{ "status": "finsihed updating "}';
}
else if ($op=='ADD')
{
    $fkClassDetailID = filter_input(INPUT_POST, "fkClassDetailID");
    $genNoteTopic = filter_input(INPUT_POST, "GenNoteTopic");
    $noteCreatorID =filter_input(INPUT_POST, "NoteCreatorID");
    $noteEditorID = filter_input(INPUT_POST, "NoteEditorID");
    $noteCreatedDate = filter_input(INPUT_POST, "NoteCreatedDate");
    $noteEditedDate = filter_input(INPUT_POST, "NoteEditedDate");
    $genNote = filter_input(INPUT_POST, "GenNote");

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