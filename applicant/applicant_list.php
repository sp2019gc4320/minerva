<head>
    <meta charset="UTF-8">
    <title>Applicants</title>

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
<br>

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Current Applicants</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom:0px"/>

<div class="topnav">
    <a class="active" href="./applicant_list.php">Home</a>
    <a href="#candidate">Candidate</a>
    <a href="#documents">Documents</a>
</div><br>

<div class="container">
    <div class="row searchFilter" >
        <div class="col-sm-6" >
            <div class="input-group" >
                <form action="applicant_search.php" method="post">
                    <input id="text_input" name="text_search" type="text" class="form-control" aria-label="Text input with segmented button dropdown" style="display: block;  width: 250px; height: 34px; margin: 0px; padding: 0px; float: left;">
                    <div class="input-group-btn">
                        <button id="searchBtn" type="submit" class="btn btn-secondary btn-search" style="float:right;"><span class="glyphicon glyphicon-search" >&nbsp;</span> <span class="label-icon" >Search</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="scrollingtable text-center">
        <div>
            <div>
                <table id="data-table">
                <thead>
                <tr>
                    <th><div label=" "</div></th>
                    <th><div label="Last"></div></th>
                    <th><div label="First"></div></th>
                    <th><div label="Date Submitted"></div></th>
                    <th><div label="IDNumber"></div></th>
                    <th><div label="Documents"></div></th>
                    <th class="scrollbarhead"/> <!--extra cell at end of header row-->
                </tr>
                </thead>

        <!-- Pulls data from SQL database (applicant - tblApplicants) to populate table-->
        <tbody>
        <?php require_once './applicant_listApplicants.php';
        require_once './applicant_search.php';
        if(empty($_POST['text_search']))
            listApplicants();
        else
            search();
        ?>
        </tbody>
        </table>
    </div>
</div>
</div>


<div class="col-md-20 text-center">
    <button type="button" style="width:100px;" class="btn btn-primary">VIEW</button>
    <button type="button" style="width:100px;" class="btn btn-danger" onClick="document.location.href='./deadpool_list.php'">DEADPOOL</button>
</div>

</body>

</html>
