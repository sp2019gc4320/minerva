<head>
    <meta charset="UTF-8">
    <title>Applicants</title>

    <!-- <link rel="stylesheet" type="text/css" href="applicant_view.css"> -->
    <link rel="stylesheet" type="text/css" href="applicant_view2.css">
    <link rel="stylesheet" type="text/css" href="../css/site.css">


    <style>
    </style>
</head>

<body>
<br>

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Current Applicants</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom: 0px"/>

<div class="topnav">
    <a class="active" href="./applicant_list.php">Home</a>
    <a href="./candidate_list.php">Candidates</a>
    <a href="./deadpool_list.php">Dead Pool</a>
</div><br>

<div class="container">
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
</div>
<form method="post" action="">

    <div class="container">
        <div class="scrollingtable pageCenter">
            <div>
                <div>
                    <form method="post" action ="">
                        <table class="minerva-table" id="data-table">
                            <thead>
                            <tr>
                                <th><div label=" "></div></th>
                                <th><div label="Last"></div>Last</th>
                                <th><div label="First"></div>First</th>
                                <th><div label="Date Submitted">Date Submitted</div></th>
                                <th><div label="IDNumber"></div>IDNumber</th>
                                <th><div label="Documents"></div>Documents</th>
                                <!-- <th class="scrollbarhead"/> extra cell at end of header row -->
                            </tr>
                            </thead>

                            <!-- Pulls data from SQL database (applicant - tblApplicants) to populate table-->
                            <tbody>
                            <?php
                            require_once './applicant_listApplicants.php';
                            require_once './applicant_search.php';
                            require_once './applicant_moveToDeadpool.php';
                            require_once './applicant_moveToCandidatePool.php';

                            if(empty($_POST['text_search']))
                                listApplicants();
                            else
                                search();

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


                            if(isset($_POST['submitDead'])){
                                //checks if anything is selected
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

                                        $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicants WHERE applicantID =$value");
                                        $dumpy = mysqli_fetch_assoc($sql);

                                        moveToDeadpool($value, $dumpy);
                                    }
                                }
                            }

                            if(isset($_POST['submitCandidate'])){
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

                                        $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicants WHERE applicantID =$value");
                                        $dumpy = mysqli_fetch_assoc($sql);

                                        moveToCandidatepool($value, $dumpy);

                                    }

                                    //INSERT and UPDATE database
                                    //$checkEntries = mysqli_query($result, "SELECT * FROM tblApplicants");
                                }
                            }

                            ?>
                            </tbody>
                        </table>
                    </form>
                </div>
                <!-- submit button is just used for testing-->
                <!--<button type="submit" value="Submit" name="submit">submit</button>-->
                <button type="submit" name="submitCandidate" style="width: 300px;" class="btn btn-primary">Send to Candidate Pool</button>
                <button type="submit" name="submitDead" style="width: 300px;" class="btn btn-danger">Send to Deadpool</button>
                <!--<a href = 'applicant_list.php?alert=true'>post alert</a>-->
            </div>
        </div>
    </div>
</form>


</body>

</html>
