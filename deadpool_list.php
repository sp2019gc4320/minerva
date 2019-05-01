<head>
    <meta charset="UTF-8">
    <title>Dead Pool</title>

    <link rel="stylesheet" type="text/css" href="applicant_view2.css">
    <link rel="stylesheet" type="text/css" href="../css/site.css">
</head>

<body>
<br>

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Dead Pool</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom: 0px" />

<div class="topnav">
    <a href="./applicant_list.php">Home</a>
    <a href="./candidate_list.php">Candidates</a>
    <a class="active" href="./deadpool_list.php">Dead Pool</a>
</div><br>


<form method="post" action="">
    <div class="container">
        <div class="scrollingtable">
            <div>
                <div>
                    <form method="post" action = "">
                        <table id="data-table" class="minerva-table">
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
                                    require_once './applicant_moveToApplicantPool.php';
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
                                        //checks if anything is selected
                                        if(count($_POST)>1){
                                            $rows = mysqli_fetch_array($fetch);

                                            //removes the button post from the array $ids
                                            $ids=$_POST;
                                            unset($ids['submitCandidate']);

                                            foreach($ids as $value){
                                                $checked = "";
                                                if(in_array($value,$checked_arr)){
                                                    $checked = "checked";
                                                }

                                                $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tbldeadpool WHERE applicantID =".$value);
                                                $dumpy = mysqli_fetch_assoc($sql);

                                                moveToCandidatepool($value, $dumpy);
                                            }

                                        }
                                    }


                                    //Function that sends the selected to Applicant
                                   
                                    if(isset($_POST['submitApplicant'])){
                                        //checks if anything is selected
                                        if(count($_POST)>1){
                                            $rows = mysqli_fetch_array($fetch);
                                            
                                            $ids=$_POST;
                                            unset($ids['submitApplicant']);
                                            foreach($ids as $value){
                                                $checked = "";
                                                if(in_array($value,$checked_arr)){
                                                    $checked = "checked";
                                                }

                                                $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tbldeadpool WHERE applicantID =".$value);
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
