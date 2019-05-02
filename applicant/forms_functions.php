<?php

require_once '../php/dbcontroller.php';

// JS Handler
if (isset($_POST['data']) && !empty($_POST['data'])) {
    $formData = json_decode($_POST['data']);
    $action = $formData->func;
    $id = $formData->formID;
    $text = $formData->formText;
    $name = $formData->formName;
    switch ($action) {
        case 'save':
            saveForm($text, $id);
            break;
        case 'delete':
            deleteForm($id);
            break;
        case 'create':
            createFormPage();
            break;
        case 'saveNew':
            createNewForm($text, $name);
            break;

    }
}

function listSelected()
{
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "SELECT lName, fName, AEmail, applicantID 
            FROM tblApplicants 
            WHERE AStatus = 1
            ORDER BY lName";
    $result = $connection->connectDB();
    $query = mysqli_query($result, $sql);

    while ($row = mysqli_fetch_array($query)) {
        $value = $row['applicantID'];
        echo "<tr>";
        echo "<td>" . "<input type='checkbox' name='id[]' value=$value/>&nbsp;</td>";
        echo "<td>" . $row['lName'] . "</td>";
        echo "<td>" . $row['fName'] . "</td>";
        echo "<td>" . $row['AEmail'] . "</td>";
        echo "</tr>";
    }
}

function generateDefaultForm()
{
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "SELECT * 
            FROM tblApplicantForms
            ORDER BY formName;";
    $result = $connection->connectDB();
    $query = mysqli_query($result, $sql);

    echo <<< EOT
    <div class='tab'>
    Forms: 
        <select>
EOT;
    while ($row = mysqli_fetch_array($query)) {
        $name = $row['formName'];
        $id = $row['formID'];
        echo <<< EOT
        <option id=$id class="tablinks" onclick="openForm(event, '$name')">$name</option>
EOT;
    }
    echo <<< EOT
    </select>
</div>
EOT;

    $query = mysqli_query($result, $sql);
    while ($row = mysqli_fetch_array($query)) {
        $name = $row['formName'];
        $text = $row['formText'];
        echo <<< EOT
        <div id='$name' class='tabcontent'>
        <textarea rows='5' cols='50' name='$name' wrap='soft' style='width:700px; height:500px; float:right;'>
$text
        </textarea>
    </div>

EOT;
    }
}

function generateSelectedForms()
{

}

function createFormPage()
{
    echo <<< EOT
    <div>
        <p style="float:left; margin-left: 25px;">Form name:</p>
        <input id="newFormName" type="text" style="float:left; margin-left:9px;">
    </div>
        <div id='99'>
        <textarea id="newText" rows='5' cols='50' name='new' wrap='soft' style='width:700px; height:500px; float:right;'></textarea>
    </div>
    <div class="container-fluid " style="float:right; margin-right: 275px;">
        <button type="submit" name="Save" id="save" style="width: 150px; float:left;" class="btn btn-success" onclick="saveNewFormJS()">
            Save New Form
        </button>
        <button type="submit" name="Cancel" id="cancel" style="width: 150px; float:left;" class="btn btn-danger">
            Cancel
        </button>
    </div>

EOT;
}

function createNewForm($text, $name) {
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "INSERT INTO tblApplicantForms 
            (`formName`, `formText`)
            VALUES ('$name', '$text')";
    $result = $connection->connectDB();
    $query = mysqli_query($result, $sql);
    if (!$query) die("Unable to perform query.");
}

function deleteForm($id)
{
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "DELETE FROM tblApplicantForms 
            WHERE formID = '$id'";
    $result = $connection->connectDB();
    $query = mysqli_query($result, $sql);
    if (!$query) die("Unable to perform query.");

    header("location: forms.php");
}

function saveForm($text, $id)
{
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "UPDATE tblApplicantForms 
            SET formText = '$text'
            WHERE formID = '$id'";
    $result = $connection->connectDB();
    $query = mysqli_query($result, $sql);
    if (!$query) die("Unable to perform query.");

    header("location: forms.php");
}

function downloadForms()
{

}

function emailForms()
{

}