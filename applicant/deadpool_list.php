<?php
session_start();
?>
<head>
    <meta charset="UTF-8">
    <title>Deadpool</title>

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
    require_once './applicant_viewDeadPool.php';
    require_once './applicant_moveToCandidatePool.php';
    require_once './applicant_moveToApplicantPool.php';
    require_once './applicant_moveToDeadpool.php';
    require_once './move_action.php';

    ?>
    <script src="forms.js"></script>
</head>

<body>

    <h3 style="font-size:40px; text-indent: 20px; text-align:left">Deadpool</h3>

    <hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom:0px" />

    <div class="topnav">
        <a href="../index.html#!homeOptions">Home</a>
        <a href="./applicant_list.php">Applicants</a>
        <a href="./candidate_list.php">Candidates</a>
        <a class="active" href="./deadpool_list.php">Dead Pool</a>
        <a href="./selected_list.php">Selected</a>
        <a href="./forms.php">Form Management</a>
        <a href="./applicant_view.php">Documents</a>

    </div>
    <br>

    <form method="post" action="">
        <div class="container">
            <div class="scrollingtable text-center" align="center">
                <table class="minerva-table" id="data-table" style="width:70%">
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
        listDeadPool();


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

    <!--<br><br><br><br><br><br>-->

    
    <button type="submit" name="submitApplicant" style="width: 300px;" class="btn btn-primary">Send to Applicant Pool</button>
    <button type="submit" name="submitCandidate" style="width: 300px;" class="btn btn-primary">Send to Candidate Pool</button>
    <button type="submit" name="submitSelected" style="width: 300px;" class="btn btn-primary">Send to Selected</button>
    <button type="submit" name="viewDocuments" style="width: 300px;" class="btn btn-primary">Load Documents</button>



    </div>
</body>