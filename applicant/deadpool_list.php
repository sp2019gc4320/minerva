<head>
    <meta charset="UTF-8">
    <title>Dead Pool</title>

    <link rel="stylesheet" type="text/css" href="applicant_view.css">
    <link rel="stylesheet" type="text/css" href="applicant_view2.css">


    <!-- Bootstrap 4 -->
    <link rel="stylesheet" href="lib/bootstrap/dist/css/bootstrap.css">
    <script src="lib/bootstrap/dist/js/bootstrap.js"></script>
    <script src="./searchjs.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="search-filter.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <style>
    </style>

</head>

<body>

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Dead Pool</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom: 0px" />

<div class="topnav">
    <a class="active" href="./applicant_list.php">Home</a>
    <a href="./candidate_list.php">Candidate</a>
    <a href="./applicant_documents.php">Documents</a>
</div><br>


<form method="post" action="">
    <div class="container">
        <div class="scrollingtable text-center">
            <div>
                <div>
                    <form method="post" action = "">
                        <table id="data-table">
                            <thead>
                            <tr>
                                <th><div label=" "></div></th>
                                <th><div label="Last"></div></th>
                                <th><div label="First"></div></th>
                                <th><div label="IDNumber"></div></th>
                                <th class="scrollbarhead"/> <!--extra cell at end of header row-->
                                </tr>
                                </thead>

                                <!-- Pulls data from SQL database (deadpool - tblDeadPool) to populate table-->
                                <tbody>
                                    <?php
                                    require_once './applicant_viewDeadPool.php';
                                    require_once './applicant_moveToCandidatePool.php';
                                    require_once './applicant_moveToDeadpool.php';
                                        listDeadPool();

                                    $checked_arr = array();

                                    $conn = new DBController();
                                    $result = $conn -> connectDB();
                                    //$new_result= $conn -> connectDB();
                                    if(!$conn) die("Unable to connect to the database!");


                                    //$sql = "SELECT * FROM tblApplicants";
                                    //fetch checked values
                                    $fetch = mysqli_query($result, "SELECT * FROM tblApplicants");
                                    if(mysqli_num_rows($fetch)>0) {
                                        $fetch_result = mysqli_fetch_assoc($fetch);
                                        $checked_arr = explode(",", $fetch_result['applicantID']);
                                    }


                                    //Function that sends the selected to Candidate
                                    if(isset($_POST['submitCandidate'])){
                                        if(!empty($_POST['id'])){
                                            $rows = mysqli_fetch_array($fetch);

                                            foreach($_POST['id'] as $value){
                                                $checked = "";
                                                if(in_array($value,$checked_arr)){
                                                    $checked = "checked";
                                                }

                                                //this is a test alert
                                                /*echo "<script type='text/javascript'> alert('<?php echo  $value?>');</script>";*/


                                                $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicants WHERE applicantID = $value");
                                                $dumpy = mysqli_fetch_assoc($sql);

                                                //moveToDeadpool($value, $dumpy);
                                                moveToCandidatepool($value, $dumpy);

                                                //test dumping values
                                                //var_dump($dumpy['AStatus']);
                                            }

                                            //INSERT and UPDATE database
                                            //$checkEntries = mysqli_query($result, "SELECT * FROM tblApplicants");

                                            //TODO IF the database is empty then inserts
                                            //if(mysqli_num_rows($checkEntries)==0){mysqli_query($result, "INSERT INTO tblApplicants")};

                                        }
                                    }


                                    //Function that sends the selected to Applicant
                                    if(isset($_POST['submitApplicant'])){
                                        if(!empty($_POST['id'])){
                                            $rows = mysqli_fetch_array($fetch);

                                            foreach($_POST['id'] as $value){
                                                $checked = "";
                                                if(in_array($value,$checked_arr)){
                                                    $checked = "checked";
                                                }

                                                $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicants WHERE applicantID = $value");
                                                $dumpy = mysqli_fetch_assoc($sql);

                                                moveToApplicantPool($value, $dumpy);

                                            }
                                        }
                                    }

                                    ?>
                                </tbody>
                        </table>
                     </form>
                </div>

                <button type="submit" name="submitCandidate" style="width: 300px;" class="btn btn-primary">Send to Candidate Pool</button>
                <button type="submit" name="submitApplicant" style="width: 300px;" class="btn btn-primary">Send to Applicant Pool</button>

            </div>
        </div>
</div>
</form>


</body>
