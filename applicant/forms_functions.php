<?php

require_once '../php/dbcontroller.php';

function listSelected() {
    $connection = new DBController();
    if(!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "SELECT lName, fName, AEmail, applicantID 
            FROM tblApplicants 
            WHERE AStatus = 1
            ORDER BY lName";
    $result = $connection -> connectDB();
    $query = mysqli_query($result, $sql);

    while($row = mysqli_fetch_array($query)) {
        $value = $row['applicantID'];
        echo "<tr>";
        echo "<td>"."<input type='checkbox' name='id[]' value=$value/>&nbsp;</td>";
        echo "<td>".$row['lName']."</td>";
        echo "<td>".$row['fName']."</td>";
        echo "<td>".$row['AEmail']."</td>";
        echo "</tr>";
    }
}

function generateDefaultForm() {
    $connection = new DBController();
    if(!$connection) die("Unable to connect to the database!");

    // retrieve applicant info
    $sql = "SELECT * 
            FROM tblApplicantForms
            ORDER BY formName;";
    $result = $connection -> connectDB();
    $query = mysqli_query($result, $sql);

    echo <<< EOT
    <div class='tab'>
        <select>
EOT;
    while($row = mysqli_fetch_array($query)) {
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
    while($row = mysqli_fetch_array($query)) {
        $name = $row['formName'];
        $text = $row['formText'];
        echo <<< EOT
        <div id='$name' class='tabcontent'>
        <textarea rows='5' cols='50' name='text_field' wrap='soft' style='width:700px; height:500px; float:right;'>
$text
        </textarea>
    </div>

EOT;
    }
}

function generateSelectedForms() {

}

function addForm() {

}

function deleteForm() {

}

function downloadForms() {

}

function emailForms() {

}