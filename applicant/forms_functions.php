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
            saveForm($text, $name);
            break;
        case 'delete':
            deleteForm($name);
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

function listAll() {
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "SELECT tblPeople2.PersonFN, tblPeople2.PersonLN, tblApplicants.ApplicantStatus, tblAppContacts.Value, tblApplicants.applicantID, tblAppContacts.Description
            FROM tblApplicants
            JOIN tblAppContacts ON (tblApplicants.fkPersonID = tblAppContacts.fkPersonID)
            JOIN tblPeople2 ON (tblAppContacts.fkPersonID = tblPeople2.PersonID)
            ORDER BY tblApplicants.ApplicantStatus";
    $result = $connection->connectDB();
    $query = mysqli_query($result, $sql);

    while ($row = mysqli_fetch_array($query)) {
        $value = $row['applicantID'];
        echo "<tr>";
        echo "<td>" . "<label class='selected'><input type='checkbox' name='id[]' value=$value></label>&nbsp;</td>";
        echo "<td>" . $row['PersonLN'] . "</td>";
        echo "<td>" . $row['PersonFN'] . "</td>";
        if($row['ApplicantStatus'] == 0)
            echo "<td>" . "Applicant" . "</td>";
        if($row['ApplicantStatus'] == 2)
            echo "<td>" . "Candidate" . "</td>";
        if($row['ApplicantStatus'] == 1)
            echo "<td>" . "Selected" . "</td>";
        if($row['ApplicantStatus'] == 3)
            echo "<td>" . "Inactive" . "</td>";
        echo "<td>".$row['applicantID']."</td>";
        if($row['Description'] == "email")
            echo "<td>" . $row['Value'] . "</td>";
        else
            echo "<td>" . "No email set." . "</td>";
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
    <select id="select" onChange="openForm(event, this.value)">
EOT;
    while ($row = mysqli_fetch_array($query)) {
        $name = $row['formName'];
        $id = $row['formID'];
        echo <<< EOT
        <option id=$id class="tablinks">$name</option>
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
        <textarea rows='5' cols='50' name='$name' wrap='soft' style='width:650px; height:500px; float:right;'>
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
        $sql = "SELECT tblPeople2.PersonLN, tblApplicants.applicantID 
        FROM tblApplicants 
        JOIN tblPeople2 ON (tblApplicants.fkPersonID = tblPeople2.PersonID) 
        WHERE tblApplicants.applicantID = '$arr[$i]' 
        ORDER BY tblPeople2.PersonLN";
        $query = mysqli_query($result, $sql);
        $row = mysqli_fetch_array($query);

        if ($i == 0) {
            echo <<< EOT
    <div class='tab'>
EOT;
        }

        $last_name = $row['PersonLN'];
        $id = $row['applicantID'];
        echo <<< EOT
        <button id=$id type="button" class="tablinks" onclick="openForm(event, '$last_name')">$last_name</button>
EOT;
    }
    echo <<< EOT
</div>
EOT;

    for ($i = 0; $i < count($arr); $i++) {
        $text = $newText;
        $sql = "SELECT tblPeople2.PersonFN, tblPeople2.PersonLN, tblAppContacts.Value, tblApplicants.ApplicantID
            FROM tblApplicants
            JOIN tblAppContacts ON (tblApplicants.fkPersonID = tblAppContacts.fkPersonID)
            JOIN tblPeople2 ON (tblAppContacts.fkPersonID = tblPeople2.PersonID)
            WHERE applicantID = '$arr[$i]'
            ORDER BY tblPeople2.PersonLN";
        $query = mysqli_query($result, $sql);
        $row = mysqli_fetch_array($query);

        $text = str_replace("{firstname}", $row['PersonFN'], $text);
        $text = str_replace("{lastname}", $row['PersonLN'], $text);
        $text = str_replace("{email}", $row['Value'], $text);

        $last_name = $row['PersonLN'];
        $email = $row['Value'];
        $name=$formData->formName;

        echo <<< EOT
        <div id='$last_name' class='tabcontent'>
            <p style="float:left;">Email: $email</p>
            <textarea rows='5' cols='50' name='$last_name' wrap='soft' style='width:625px; height:400px; float:right;'>$text</textarea>
            <div class="container-fluid " style="float:right; margin-right: 0px;">
                <a name='$last_name' href="mailto:$email?subject=$name&body=$text">
                    <button type="button" name='$last_name' id="email" style="width: 150px; float:left;" class="btn btn-success">Email Form</button>
                </a>
            </div>
            <div>
                <form name='$last_name' action="forms.php" method="POST">
                    <button type="submit" name='$last_name' id="cancel" style="width: 150px; float:right;" class="btn btn-danger">Cancel</button>
                </form>
            </div>
        </div>
EOT;
    }
}


function createFormPage() {
    echo <<< EOT
    <div>
        <p style="float:left; margin-left: 10px;">Form name:</p>
        <input id="newFormName" type="text" style="float:left; margin-left:20px; ">
    </div>
        <div>
        <textarea id="newText" rows='5' cols='50' name='new' wrap='soft' style='width:650px; height:400px; float:right;'></textarea>
    
        <button type="submit" name="Save" id="save" style="width: 150px; float:right;" class="btn btn-success" onclick="saveNewFormJS()">
            Save New Form
        </button>
        <form action="forms.php" method="POST">
        <button type="submit" name="Cancel" id="cancel" style="width: 150px; float:right;" class="btn btn-danger">
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

function deleteForm($name) {
    $connection = new DBController();
    $result = $connection->connectDB();
    $id = mysqli_escape_string($result, $name);

    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "DELETE FROM tblApplicantForms 
            WHERE formName = '$name'";
    $query = mysqli_query($result, $sql);
    if (!$query) die("Unable to perform query.");
}

function saveForm($text, $name) {
    $connection = new DBController();
    $result = $connection->connectDB();
    $text = mysqli_escape_string($result, $text);
    $id = mysqli_escape_string($result, $name);

    if (!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "UPDATE tblApplicantForms 
            SET formText = '$text'
            WHERE formName = '$name'";
    $query = mysqli_query($result, $sql);
    if (!$query) die("Unable to perform query.");

    header("location: forms.php");
}
