<head>
    <meta charset="UTF-8">
    <title>Candidate Pool</title>

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

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Candidate Pool</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom: 0px" />

<div class="topnav">
    <a href="./applicant_list.php">Home</a>
    <a class="active" href="./candidate_list.php">Candidate</a>
    <a href="#documents">Documents</a>
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
                            require_once './applicant_moveToApplicantPool.php';
                            require_once './applicant_moveToDeadpool.php';
                            require_once './applicant_viewCandidates.php';
                            listCandidates();


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

                            //Function that sends the selected to Dead
                            if(isset($_POST['submitDead'])){
                                if(!empty($_POST['id'])){
                                    $rows = mysqli_fetch_array($fetch);

                                    foreach($_POST['id'] as $value){
                                        $checked = "";
                                        if(in_array($value,$checked_arr)){
                                            $checked = "checked";
                                        }

                                        $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicants WHERE applicantID = $value");
                                        $dumpy = mysqli_fetch_assoc($sql);

                                        moveToDeadpool($value, $dumpy);

                                    }


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

                <button type="submit" name="submitApplicant" style="width: 300px;" class="btn btn-primary">Send to Applicant Pool</button>
                <button type="submit" name="submitDead" style="width: 300px;" class="btn btn-danger">Send to Dead Pool</button>


            </div>
        </div>
    </div>
</form>



</body>