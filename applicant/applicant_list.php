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

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Current Applicants</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom:0px"/>

<div class="topnav">
    <a class="active" href="./applicant_list.php">Home</a>
    <a href="./candidate_list.php">Candidates</a>
    <a href="./deadpool_list.php">Dead Pool</a>
    <a href="./applicant_view.php">Documents</a>
    <a href="./forms.php">Form Management</a>
</div><br>

<div class="container">
    <div class="row searchFilter" >
        <div class="col-sm-6" >
            <div class="input-group" >
                <form action="applicant_search.php" method="post">
                    <input id="text_input" name="text_search" type="text" class="form-control" aria-label="Text input with segmented button dropdown" style="display: block;  width: 250px; height: 34px; margin: 0px; padding: 0px; float: left;">
                    <div class="input-group-btn" >
                        <button id="searchBtn" type="submit" class="btn btn-primary btn-search" style="display: block;  width: 100px; height: 34px; margin: 0px; padding: 0px; float: left;"><span class="glyphicon glyphicon-search" >&nbsp;</span> <span class="label-icon" >Search</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div><br><br>
<form method="post" action="">

    <div class="container">
        <div class="scrollingtable text-center">
            <div>
                <div>
                    <form method="post" action ="">
                        <table id="data-table" class="minerva-table" style="text-align:center;  width:90%;">
                            <thead>
                            <tr>
                                <th><div label=" "></div> </th>
                                <th><div label="Last"></div>Last</th>
                                <th><div label="First"></div>First</th>
                                <th><div label="Date Submitted">Date Submitted</div></th>
                                <th><div label="IDNumber"></div>IDNumber</th>
                                <th><div label="Documents"></div>Documents</th>
                            </tr>
                            </thead>

                            <!-- Pulls data from SQL database (applicant - tblApplicants) to populate table-->
                            <tbody>
                            <?php
                            require_once './applicant_listApplicants.php';
                            require_once './applicant_search.php';
                            require_once './applicant_moveToDeadpool.php';
                            require_once './applicant_moveToCandidatePool.php';
                            require_once './applicant_moveToSelectedPool.php';


                            if(empty($_POST['text_search']))
                                listApplicants();
                            else
                                search();

                            $conn = new DBController();
                            $result = $conn -> connectDB();
                            if(!$conn) die("Unable to connect to the database!");

                            //fetch checked values
                            $fetch = mysqli_query($result, "SELECT * FROM tblApplicants");
                            if(mysqli_num_rows($fetch)>0) {
                                $fetch_result = mysqli_fetch_assoc($fetch);
                            }

                            //changes status to dead pool
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

                            //changes the status to candidate
                            if(isset($_POST['submitCandidate'])){
                                if(count($_POST)>1){
                                    $rows = mysqli_fetch_array($fetch);

                                    //removes the button post from the array $ids
                                    $ids=$_POST;
                                    unset($ids['submitCandidate']);
                                    $ids = $ids['id'];
                                    foreach($ids as $value){

                                        $sql = mysqli_query($conn->connectDB(), "SELECT * FROM tblApplicants WHERE applicantID =$value");
                                        $dumpy = mysqli_fetch_assoc($sql);

                                        moveToCandidatepool($value, $dumpy);
                                    }
                                }
                            }

                            //changes the status to selected
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
                <button type="submit" name="submitCandidate" style="width: 300px;" class="btn btn-primary">Send to Candidate Pool</button>
                <button type="submit" name="submitDead" style="width: 300px;" class="btn btn-danger">Send to Deadpool</button>
                <button type="submit" name="submitSelected" style="width: 300px;" class="btn btn-primary">Send to Selected Pool</button>

            </div>
        </div>
    </div>
</form>


</body>

</html>
