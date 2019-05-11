<?php
session_start();
?>
<head>
    <meta charset="UTF-8">
    <title>Applicant</title>

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
    require_once './applicant_listApplicants.php';
    require_once './applicant_moveToCandidatePool.php';
    require_once './applicant_moveToApplicantPool.php';
    require_once './applicant_moveToDeadpool.php';
    require_once './move_action.php';

    ?>
    <script src="forms.js"></script>
</head>

<body>

    <h3 style="font-size:40px; text-indent: 20px; text-align:left">Applicant</h3>

    <hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom:0px" />

    <div class="topnav">
        <a href="../index.html#!homeOptions">Home</a>
        <a class="active" href="./applicant_list.php">Applicants</a>
        <a href="./candidate_list.php">Candidates</a>
        <a href="./deadpool_list.php">Dead Pool</a>
        <a href="./selected_list.php">Selected</a>
        <a href="./forms.php">Form Management</a>
        <a href="./applicant_view.php">Documents</a>

    </div>
    <br>

    <div class="container">
    <div class="row searchFilter" >
        <div class="col-sm-6" >
            <div class="input-group" align="center">
                <form action="applicant_search.php" method="post">
                    <input id="text_input" name="text_search" type="text" class="form-control" aria-label="Text input with segmented button dropdown" style="display: block;  width: 250px; float: left; height: 34px; margin: 0px; padding: 0px;">
                    <div class="input-group-btn" >
                        <button id="searchBtn" type="submit" class="btn btn-primary btn-search" style="display: block;  width: 100px; height: 34px; margin: 0px; padding: 0px; float:left;"><span class="glyphicon glyphicon-search" >&nbsp;</span> <span class="label-icon" >Search</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div><br><br>

    <form method="post" action="">
        <div class="container">
            <div class="scrollingtable text-center" align="center">
                <table class="minerva-table" id="data-table" style="text-align:center;  width:70%;">
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
                                <div label="IDNumber"></div>IDNumber
                            </th>
                            <th>
                                <div label="AEmail"></div>Email
                            </th>
                            <th class="scrollbarhead" />
                            <!--extra cell at end of header row-->
                        </tr>
    </form>
    </thead>
    <tbody>
        <!-- Pulls data from SQL database (applicant - tblApplicants) to populate table-->
        <?php
        if(empty($_POST['text_search']))
            listApplicants();
        else
            search();


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

        if (isset($_POST['viewDocuments'])) {
                                    $ids = $_POST;
                                    unset($ids['viewDocuments']);
                                    $ids = $ids['id'];

                                    if (count($ids) > 1) {
                                        echo '<div style="font-size:1.25em;color:#ff0000;font-weight:bold;">TOO MANY APPLICANTS SELECTED. ONLY SELECT ONE.</div>';
                                    } 
                                    
                                    else if(count($ids) < 1) {
                                        echo '<div style="font-size:1.25em;color:#ff0000;font-weight:bold;">NO APPLICANT SELECTED. PLEASE SELECT ONE.</div>';

                                    }
                                    
                                    else {
                                        
                                        echo '<div style="font-size:1.25em;font-weight:bold;">DOCUMENTS LOADED. CLICK ON DOCUMENTS TAB ABOVE TO VIEW.</div>';
                                        $rows = mysqli_fetch_array($fetch);

                                        foreach ($ids as $value) {

                                            $_SESSION['varName'] = $value;
                                            
                                        }

                                    }
                            }
        ?>
    </tbody>
    </table>

    <!--<button id="genbtn" type="button" style="width: 150px; float:left;" class="btn btn-success" onclick="post()">
        Generate Forms
    </button>

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

    <button type="submit" name="createForm" style="width: 150px; float:left;" class="btn btn-success">
        New Form
    </button>

    <br><br>

    <button type="submit" name="saveForm" style="width: 150px; float:left;" class="btn btn-primary" onclick="saveFormJS()">
        Save Current Form
    </button>

    <button type="submit" name="deleteForm" style="width: 150px;  float:left;" class="btn btn-danger" onclick="deleteFormJS()">
        Delete Current Form
    </button>

    </div>

    ?>-->
    <div style="text-align:center;">
    <button type="submit" name="submitCandidate" style="width: 300px;" class="btn btn-primary">Send to Candidate Pool</button>
    <button type="submit" name="submitDead" style="width: 300px;" class="btn btn-primary">Send to Dead Pool</button>
    <button type="submit" name="submitSelected" style="width: 300px;" class="btn btn-primary">Send to Selected</button>
    <button type="submit" name="viewDocuments" style="width: 300px;" class="btn btn-primary">Load Documents</button>
</div>

    </div>
</body>