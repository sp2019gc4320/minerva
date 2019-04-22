<head>
    <meta charset="UTF-8">
    <title>Applicants</title>

    <link rel="stylesheet" type="text/css" href="applicant_view.css">

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

<hr style="height:3px;border:none;color:#333;background-color:#333;" />


<div class="container">
    <div class="row searchFilter" >
        <div class="col-sm-6" >
            <div class="input-group" >
                <input id="table_filter" type="text" class="form-control" aria-label="Text input with segmented button dropdown" >
                <div class="input-group-btn" >
                    <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="label-icon" >Category</span> <span class="caret" >&nbsp;</span></button>
                    <div class="dropdown-menu dropdown-menu-right" >
                        <ul style="list-style-type:none;">
                            <li >
                                <input class="cat_type category-input" data-label="All" id="all" value="" name="radios" type="radio" ><label for="all" >All</label>
                            </li>
                            <li >
                                <input type="radio" name="radios" id="FirstName" value="FirstName" ><label class="category-label" for="FirstName" >First Name</label>
                            </li>
                            <li >
                                <input type="radio" name="radios" id="LastName" value="LastName" ><label class="category-label" for="LastName" >Last Name</label>
                            </li>
                            <li >
                                <input type="radio" name="radios" id="IDNumber" value="IDNumber" ><label class="category-label" for="IDNumber" >ID Number</label>
                            </li>
                        </ul>
                    </div>
                    <button id="searchBtn" type="button" class="btn btn-secondary btn-search" ><span class="glyphicon glyphicon-search" >&nbsp;</span> <span class="label-icon" >Search</span></button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="scrollingtable">
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

                <!-- TODO pull data from SQL database (applicant - tblApplicants) to populate below table-->
                <tbody>
                    <?php require './applicant_listApplicants.php';
                        listApplicants();
                        ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<br>
<div class="col-md-20 text-center">
<button type="button" style="width:100px;" class="btn btn-primary">VIEW</button>
<button type="button" style="width:100px;" class="btn btn-danger">DEADPOOL</button>
</div>

</body>
</html>
