<head>
    <meta charset="UTF-8">
    <title>Form Management</title>

    <link rel="stylesheet" type="text/css" href="applicant_view2.css">
    <link rel="stylesheet" type="text/css" href="../css/site.css">


    <!-- Bootstrap 4 -->
    <link rel="stylesheet" href="lib/bootstrap/dist/css/bootstrap.css">
    <script src="lib/bootstrap/dist/js/bootstrap.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="search-filter.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <?php
    require_once './forms_functions.php';
    ?>
    <script src="forms.js"></script>

</head>

<body>
<br>

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Form Managment</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom:0px"/>

<div class="topnav">
    <a href="./applicant_list.php">Home</a>
    <a href="./candidate_list.php">Candidates</a>
    <a href="./deadpool_list.php">Dead Pool</a>
    <a href="./applicant_view.php">Documents</a>
    <a class="active" href="./forms.php">Form Management</a>
</div>
<br>

<div class="container">
    <div class="scrollingtable text-center" style="float:left;">
            <table class="minerva-table" id="data-table">
                <thead>
                <tr>
                    <th>
                        <div label=" "></div>
                    </th>
                    <th>
                        <div label="Last"></div>
                        Last
                    </th>
                    <th>
                        <div label="First"></div>
                        First
                    </th>
                    <th>
                        <div label="email"></div>
                        Email
                    </th>
                    <th class="scrollbarhead"/> <!--extra cell at end of header row-->
                </tr>
                </thead>
                <!-- Pulls data from SQL database (applicant - tblApplicants) to populate table-->
                <tbody>
                <?php
                    listSelected();
                ?>
                </tbody>
            </table>
            <button type="submit" name="generateSelected" style="width: 150px; float:left;" class="btn btn-success">
                Generate Forms
            </button><br><br><br><br><br><br>
        <form action="forms.php" method="POST">
            <button type="submit" name="createForm" style="width: 150px; float:left;" class="btn btn-success">
                New Form
            </button>
        </form>
        <br><br>
            <button type="submit" name="saveForm" style="width: 150px; height: 40px; float:left;" class="btn btn-primary" onclick="saveFormJS()">
                Save Current Form
            </button>
            <button type="submit" name="deleteForm" style="width: 150px; height: 40px; float:left;" class="btn btn-danger" onclick="deleteFormJS()">
                Delete Current Form
            </button>
    </div>

    <?php
        if(isset($_POST['createForm'])){
            createFormPage();
        }
        if(empty($_POST['generateSelected']) && !isset($_POST['createForm'])) {
            generateDefaultForm();
            echo '<script type="text/javascript">',
            'document.getElementById("1").click();',
            '</script>';
        }
         else
            generateSelectedForms();

        $checked_arr = array();

        $conn = new DBController();
        $result = $conn -> connectDB();
        //$new_result= $conn -> connectDB();
        if(!$conn) die("Unable to connect to the database!");


        //fetch checked values
        $fetch = mysqli_query($result, "SELECT * FROM tblApplicants");
        if(isset($_POST['generateSelected'])){
            if(!empty($_POST['id'])){
                $rows = mysqli_fetch_array($fetch);

                foreach($_POST['id'] as $value){
                    $checked = "";
                    if(in_array($value,$checked_arr)){
                        $checked = "checked";
                    }
                    $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicants WHERE applicantID = '$value'");
                    $dumpy = mysqli_fetch_assoc($sql);

                    moveToCandidatepool($value, $dumpy);
                }

                //INSERT and UPDATE database
                //$checkEntries = mysqli_query($result, "SELECT * FROM tblApplicants");
            }
        }
    ?>
</div>

<!--<div class="container-fluid " style="float:right; margin-right: 275px;">
    <button type="submit" name="email" id="email" style="width: 150px; float:left;" class="btn btn-primary">
        Email Forms
    </button>
    <button type="submit" name="download" id="download" style="width: 150px; float:left;" class="btn btn-success">
        Download Forms
    </button>
</div>-->

<script>
    //document.getElementById("1").click();
</script>

