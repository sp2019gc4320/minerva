<head>
    <meta charset="UTF-8">
    <title>Candidate Pool</title>

    <link rel="stylesheet" type="text/css" href="applicant_view2.css">
    <link rel="stylesheet" type="text/css" href="../css/site.css">
</head>

<body>
<br>

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Candidate Pool</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom: 0px" />

<div class="topnav">
    <a href="./applicant_list.php">Home</a>
    <a class="active" href="./candidate_list.php">Candidates</a>
    <a href="./deadpool_list.php">Dead Pool</a>
</div><br>


<!--TODO search function -->
<!-- <div class="container">
    <div class="row searchFilter" >
        <div class="col-sm-6" >
            <div class="input-group" >
                <form action="applicant_search.php" method="post">
                    <input id="text_input" name="text_search" type="text" class="form-control" aria-label="Text input with segmented button dropdown" style="display: block;  width: 250px; height: 34px; margin: 0px; padding: 0px; float: left;">
                    <div class="input-group-btn" >
                        <button id="searchBtn" type="submit" class="btn btn-secondary btn-search" style="display: block;  width: 100px; height: 34px; margin: 0px; padding: 0px; float: right;"><span class="glyphicon glyphicon-search" >&nbsp;</span> <span class="label-icon" >Search</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> -->

<form method="post" action="">
    <div class="container">
        <div class="scrollingtable text-center">
            <div>
                <div>
                    <form method="post" action = "">
                    <table id="data-table" class="minerva-table">
                            <thead>
                            <tr>
                                <th><div label=" "></div> </th>
                                <th><div label="Last"></div>Last</th>
                                <th><div label="First"></div>First</th>
                                <th><div label="IDNumber"></div>IDNumber</th>
                                <!-- <th><div label="Email"></div>Email</th> -->
                                <!-- <th class="scrollbarhead"/> extra cell at end of header row -->
                            </tr>
                            </thead>

                            <!-- Pulls data from SQL database (deadpool - tblDeadPool) to populate table-->
                            <tbody>
                            <?php
                            require_once './applicant_moveToApplicantPool.php';
                            require_once './applicant_moveToDeadpool.php';
                            require_once './applicant_viewCandidates.php';

                            if(empty($_POST['text_search']))
                                listCandidates();
                            else
                                search();

                            $checked_arr = array();

                            $conn = new DBController();
                            $result = $conn -> connectDB();
                            //$new_result= $conn -> connectDB();
                            if(!$conn) die("Unable to connect to the database!");


                            //$sql = "SELECT * FROM tblApplicants";
                            //fetch checked values
                            $fetch = mysqli_query($result, "SELECT * FROM tblCandidatePool");
                            if(mysqli_num_rows($fetch)>0) {
                                $fetch_result = mysqli_fetch_assoc($fetch);
                                $checked_arr = explode(",", $fetch_result['applicantID']);
                            }

                            //Function that sends the selected to Dead
                            if(isset($_POST['submitDead'])){
                                if(count($_POST)>1){
                                    $rows = mysqli_fetch_array($fetch);

                                    //removes the button post from the array $ids
                                    $ids=$_POST;
                                    unset($ids['submitDead']);

                                    foreach($ids as $value){
                                        $checked = "";
                                        if(in_array($value,$checked_arr)){
                                            $checked = "checked";
                                        }

                                        $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblCandidatePool WHERE applicantID =$value");
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
                                    unset($ids['submitApplicant']);

                                    foreach($ids as $value){
                                        $checked = "";
                                        if(in_array($value,$checked_arr)){
                                            $checked = "checked";
                                        }

                                        $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblCandidatePool WHERE applicantID =$value");
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