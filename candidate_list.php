<head>
    <meta charset="UTF-8">
    <title>Candidate Pool</title>

    <!-- <link rel="stylesheet" type="text/css" href="applicant_view.css"> -->
    <link rel="stylesheet" type="text/css" href="applicant_view2.css">
    <link rel="stylesheet" type="text/css" href="../css/site.css">
</head>

<body>

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Candidate Pool</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom: 0px" />

<div class="topnav">
    <a href="./applicant_list.php">Home</a>
    <a class="active" href="./candidate_list.php">Candidates</a>
    <a href="./deadpool_list.php">Dead Pool</a>
    <a href="./applicant_view.php">Documents</a>
    <a href="./forms.php">Form Management</a>
</div><br>


<form method="post" action="">
    <div class="container">
        <div class="scrollingtable text-center">
            <div>
                <div>
                    <form method="post" action = "">
                    <table id="data-table" class="minerva-table" style="text-align:center;  width:90%;">
                            <thead>
                            <tr>
                                <th><div label=" "></div></th>
                                <th><div label="Last"></div>Last</th>
                                <th><div label="First"></div>First</th>
                                <th><div label="IDNumber"></div>IDNumber</th>
                                <!-- <th class="scrollbarhead"/> extra cell at end of header row -->
                            </tr>
                            </thead>

                            <!-- Pulls data from SQL database (deadpool - tblDeadPool) to populate table-->
                            <tbody>
                            <?php
                            require_once './applicant_moveToApplicantPool.php';
                            require_once './applicant_moveToDeadpool.php';
                            require_once './applicant_moveToSelectedPool.php';
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
                                //checks if anything is selected
                                if(count($_POST)>1){
                                    $rows = mysqli_fetch_array($fetch);

                                    //removes the button post from the array $ids
                                    $ids=$_POST;
                                    unset($ids['submitDead']);
                                    $ids = $ids['id'];
                                    foreach($ids as $value){

                                        $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicants WHERE applicantID =$value");
                                        $dumpy = mysqli_fetch_assoc($sql);

                                        moveToDeadpool($value, $dumpy);
                                    }
                                }
                            }


                            //Function that sends the selected to Applicant
                            if(isset($_POST['submitApplicant'])){
                                if(count($_POST)>1){
                                    $rows = mysqli_fetch_array($fetch);

                                    //removes the button post from the array $ids
                                    $ids=$_POST;
                                    unset($ids['submitDead']);
                                    $ids=$ids['id'];
                                    foreach($ids as $value){

                                        $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicants WHERE applicantID = $value");
                                        $dumpy = mysqli_fetch_assoc($sql);

                                        moveToApplicantPool($value, $dumpy);

                                    }
                                }
                            }

                            if(isset($_POST['submitSelected'])){
                                if(count($_POST)>1){
                                    $rows = mysqli_fetch_array($fetch);

                                    //removes the button post from the array $ids
                                    $ids=$_POST;
                                    unset($ids['submitSelected']);
                                    $ids=$ids['id'];
                                    foreach($ids as $value){

                                        $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicants WHERE applicantID = $value");
                                        $dumpy = mysqli_fetch_assoc($sql);

                                        moveToSelectedPool($value, $dumpy);
                                    }
                                }
                            }

                            ?>
                            </tbody>
                        </table>
                    </form>
                </div><br>

                <button type="submit" name="submitApplicant" style="width: 300px;" class="btn btn-primary">Send to Applicant Pool</button>
                <button type="submit" name="submitDead" style="width: 300px;" class="btn btn-danger">Send to Dead Pool</button>
                <button type="submit" name="submitSelected" style="width: 300px;" class="btn btn-primary">Send to Selected Pool</button>



            </div>
        </div>
    </div>
</form>



</body>