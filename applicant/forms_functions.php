<?php

require_once '../php/dbcontroller.php';

// JS Handler
if (isset($_POST['data']) && !empty($_POST['data'])) {
    $formData = json_decode($_POST['data']);
    $action = $formData->func;
    $id = $formData->formID;
    $text = $formData->formText;
    $name = $formData->formName;
    $arr = $formData->selected;
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
        case 'gen':
            generateForms();
            break;

    }
}

function listSelected() {
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
        echo "<td>" . "<label class='selected'><input type='radio' name='id[]' value=$value></label>&nbsp;</td>";
        echo "<td>" . $row['lName'] . "</td>";
        echo "<td>" . $row['fName'] . "</td>";
        echo "<td>" . $row['AEmail'] . "</td>";
        echo "</tr>";
    }
}

function generateDefaultForm() {
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "SELECT * 
            FROM tblApplicantForms
            ORDER BY formName";
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

function generateForms($formData) {
    $text = $formData->formText;
    $newText = $text;
    $arr = $formData->selected;
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");
    $result = $connection->connectDB();

    for ($i = 0; $i < count($arr); $i++) {
        $sql = "SELECT * 
            FROM tblApplicants
            WHERE applicantID = '$arr[$i]'
            ORDER BY lName;";
        $query = mysqli_query($result, $sql);
        $row = mysqli_fetch_array($query);

        if ($i == 0) {
            echo <<< EOT
    <div class='tab'>
EOT;
        }

        $last_name = $row['lName'];
        $id = $row['applicantID'];
        echo <<< EOT
        <button id=$id class="tablinks" onclick="openForm(event, '$last_name')">$last_name</button>
EOT;
    }
    echo <<< EOT
</div>
EOT;

    for ($i = 0; $i < count($arr); $i++) {
        $text = $newText;
        $sql = "SELECT * 
            FROM tblApplicants
            WHERE applicantID = '$arr[$i]'
            ORDER BY lName;";
        $query = mysqli_query($result, $sql);
        $row = mysqli_fetch_array($query);

        $text = str_replace("{firstname}", $row['fName'], $text);
        $text = str_replace("{lastname}", $row['lName'], $text);
        $text = str_replace("{email}", $row['AEmail'], $text);

        $last_name = $row['lName'];
        $email = $row['AEmail'];

        $name=$formData->formName;

        echo <<< EOT
        <div id='$last_name' class='tabcontent'>
        <p style="float:left;">Email: $email</p>
        <textarea rows='5' cols='50' name='$last_name' wrap='soft' style='width:700px; height:500px; float:right;'>$text</textarea>
    </div>
EOT;
    }
    echo <<< EOT
    <div class="container-fluid " style="float:right; margin-right: 200px;">
        <a href="mailto:$email?subject=$name&body=$text">
            <button type="submit" name="Email" id="email" style="width: 150px; float:left;" class="btn btn-success">Email Forms</button>
        </a>
    </div>
        <form action="forms.php" method="POST">
        <button type="submit" name="Cancel" id="cancel" style="width: 150px; float:right;" class="btn btn-danger">Cancel</button>
        </form>
    </div>
<br>
<br>
EOT;
}


function createFormPage() {
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
        <form action="forms.php" method="POST">
        <button type="submit" name="Cancel" id="cancel" style="width: 150px; float:left;" class="btn btn-danger">
            Cancel
        </button>
        </form>
    </div>
EOT;
}

function createNewForm($text, $last_name) {
    $connection = new DBController();
    $result = $connection->connectDB();
    $text = mysqli_escape_string($result, $text);
    $name = mysqli_escape_string($result, $last_name);

    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "INSERT INTO tblApplicantForms 
            (`formName`, `formText`)
            VALUES ('$name', '$text')";
    $query = mysqli_query($result, $sql);
    if (!$query) die("Unable to perform query.");
}

function deleteForm($id) {
    $connection = new DBController();
    $result = $connection->connectDB();
    $id = mysqli_escape_string($result, $id);

    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "DELETE FROM tblApplicantForms 
            WHERE formID = '$id'";
    $query = mysqli_query($result, $sql);
    if (!$query) die("Unable to perform query.");
}

function saveForm($text, $id) {
    $connection = new DBController();
    $result = $connection->connectDB();
    $text = mysqli_escape_string($result, $text);
    $id = mysqli_escape_string($result, $id);

    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "UPDATE tblApplicantForms 
            SET formText = '$text'
            WHERE formID = '$id'";
    $query = mysqli_query($result, $sql);
    if (!$query) die("Unable to perform query.");

    header("location: forms.php");
}
