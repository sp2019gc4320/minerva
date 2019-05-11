<head>
    <meta charset="UTF-8">
    <title>Form Management</title>

    <link rel="stylesheet" type="text/css" href="applicant_view2.css">
    <link rel="stylesheet" type="text/css" href="../css/site.css">


    <!-- Bootstrap 4 -->
    <!-- <link rel="stylesheet" href="lib/bootstrap/dist/css/bootstrap.css">
    <script src="lib/bootstrap/dist/js/bootstrap.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="search-filter.css" rel="stylesheet">-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <?php
    require_once './forms_functions.php';
    require_once './applicant_moveToCandidatePool.php';
    require_once './applicant_moveToApplicantPool.php';
    require_once './applicant_moveToDeadpool.php';
    require_once './move_action.php';

    ?>
    <script src="forms.js"></script>
</head>

<body>

    <h3 style="font-size:40px; text-indent: 20px; text-align:left">Form Management</h3>

    <hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom:0px" />

    <div class="topnav">
        <a href="../index.html#!homeOptions">Home</a>
        <a href="./applicant_list.php">Applicants</a>
        <a href="./candidate_list.php">Candidates</a>
        <a href="./deadpool_list.php">Dead Pool</a>
        <a href="./selected_list.php">Selected</a>
        <a class="active" href="./forms.php">Form Management</a>
        <a href="./applicant_view.php">Documents</a>

    </div>
    <br>

    <form method="post" action="">
        <div class="container">
            <div class="scrollingtable text-center" style="float:left; height: 600px; overflow: auto;">
                <table class="minerva-table" id="data-table" style="width:25%;">
                    <thead>
                        <tr>
                            <th>
                                <div label=" "></div>
                            </th>
                            <th>
                                <div label="Last"></div>Last
                            </th>
                            <th>
                                <div label="First"></div>First
                            </th>
                            <th>
                                <div label="Status"></div>Status
                            </th>
                            <th>
                                <div label="IDNumber"></div>IDNumber
                            </th>
                            <th>
                                <div label="AEmail"></div>Email
                            </th>
                        </tr>
    </form>
    </thead>
    <tbody>
        <!-- Pulls data from SQL database (applicant - tblApplicants) to populate table-->
        <?php
        listAll();


        // //moveTo pools
        $conn = new DBController();
        $result = $conn->connectDB();
        if (!$conn) die("Unable to connect to the database!");
        //fetch checked values	
        $fetch = mysqli_query($result, "SELECT * FROM tblApplicants");
        if (mysqli_num_rows($fetch) > 0) {
            $fetch_result = mysqli_fetch_assoc($fetch);
        }
/*                        
                        //changes status to dead pool	
                        if (isset($_POST['submitDead'])) {	
                            //checks if anything is selected	
                            if (count($_POST) > 1) {	
                                $rows = mysqli_fetch_array($fetch);	
                                 //removes the button post from the array $ids	
                                $ids = $_POST;	
                                unset($ids['submitDead']);	
                                $ids = $ids['id'];	
                                foreach ($ids as $value) {	
                                     $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicantsWrong WHERE applicantID =$value");	
                                    $dumpy = mysqli_fetch_assoc($sql);	
                                     moveToDeadpool($value, $dumpy);	
                                }	
                            }	
                        }	
                         //changes the status to candidate	
                        if (isset($_POST['submitCandidate'])) {	
                            if (count($_POST) > 1) {	
                                $rows = mysqli_fetch_array($fetch);	
                                 //removes the button post from the array $ids	
                                $ids = $_POST;	
                                unset($ids['submitCandidate']);	
                                $ids = $ids['id'];	
                                foreach ($ids as $value) {	
                                     $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicantsWrong WHERE applicantID =$value");	
                                    $dumpy = mysqli_fetch_assoc($sql);	
                                     moveToCandidatepool($value, $dumpy);	
                                }	
                            }	
                        }	
                         //Function that sends the selected to Applicant	
                        if (isset($_POST['submitApplicant'])) {	
                            // var_dump($_POST);	
                            // die();	
                            if (count($_POST) > 1) {	
                                $rows = mysqli_fetch_array($fetch);	
                                 //removes the button post from the array $ids	
                                $ids = $_POST;	
                                unset($ids['submitApplicant']);	
                                $ids = $ids['id'];	
                                foreach ($ids as $value) {	
                                     $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicantsWrong WHERE applicantID = $value");	
                                    $dumpy = mysqli_fetch_assoc($sql);	
                                     moveToApplicantPool($value, $dumpy);	
                                }	
                            }	
                        }	
*/
        ?>
    </tbody>
    </table>

    <button id="genbtn" type="button" style="width: 150px; float:left;" class="btn btn-success" onclick="post()">
        Generate Forms
    </button>
    <div style="float:left; margin-left: 15px;">
        <button type="submit" name="submitApplicant" style="width: 150px;" class="btn btn-primary">Send to Applicant Pool</button>
        <button type="submit" name="submitCandidate" style="width: 150px;" class="btn btn-primary">Send to Candidate Pool</button>
        <button type="submit" name="submitDead" style="width: 150px;" class="btn btn-primary">Send to Deadpool</button>
    </div>
    <div>
    <button type="submit" name="submitSelected" style="width: 150px; float:left;" class="btn btn-primary">Send to Selected</button>
    </div>
    <br><br><br>

    <script type="text/javascript">
        function post() {
            var selected, func, formID, formName, formText;

            selected = new Array();
            func = 'gen';
            formID = document.getElementsByClassName("active")[1].id;
            formName = document.getElementById(formID).value;
            formText = document.getElementsByName(formName)[0].value;
            $('.selected').each(function() {
                if ($(this).find('input').is(':checked')) {
                    selected.push($(this).find('input').val());
                }
            });

            var formData = {
                selected,
                func,
                formText,
                formID,
                formName
            };

            var form = document.createElement('form');
            form.setAttribute('method', 'post');
            form.setAttribute('action', 'forms.php');
            form.style.display = 'hidden';
            document.body.appendChild(form);

            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("name", "gen");
            hiddenField.setAttribute("value", JSON.stringify(formData));
            form.appendChild(hiddenField);

            form.submit();
        }
    </script>
    <br><br><br><br><br><br>
    <div style="float:left;">

    <button type="submit" name="createForm" style="width: 150px;" class="btn btn-success">
        New Form
    </button>

    <br><br>
        <button type="submit" name="saveForm" style="width: 150px;" class="btn btn-primary" onclick="saveFormJS()">
            Save Current Form
        </button>
    
        <button type="submit" name="deleteForm" style="width: 150px;" class="btn btn-danger" onclick="deleteFormJS()">
            Delete Current Form
        </button>
    </div>

    </div>
    <?php
    if (isset($_POST['gen'])) {
        $formData = json_decode($_POST['gen']);
        generateForms($formData);
    }
    if (isset($_POST['createForm'])) {
        createFormPage();
    }
    if (empty($_POST['gen']) && !isset($_POST['createForm']) && !isset($_POST['gen'])) {
        generateDefaultForm();
        echo '<script type="text/javascript">',
            'document.getElementById("1").click();',
            '</script>';
    }



    ?>

    </div>
</body>