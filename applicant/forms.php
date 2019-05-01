<head>
    <meta charset="UTF-8">
    <title>Applicants</title>

    <link rel="stylesheet" type="text/css" href="applicant_view2.css">
    <link rel="stylesheet" type="text/css" href="../css/site.css">


    <!-- Bootstrap 4 -->
    <link rel="stylesheet" href="lib/bootstrap/dist/css/bootstrap.css">
    <script src="lib/bootstrap/dist/js/bootstrap.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="search-filter.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <?php
    require_once './forms_functions.php';
    ?>

    <style>
    </style>
</head>

<body>
<br>

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Form Managment</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom:0px"/>

<div class="topnav">
    <a href="./applicant_list.php">Home</a>
    <a href="./candidate_list.php">Candidates</a>
    <a href="./deadpool_list.php">Dead Pool</a>
    <a href="./applicant_view.php">Documents</a>
    <a class="active" href="./forms.php">Form Management</a>
</div>
<br>

<div class="container">
    <div class="scrollingtable text-center" style="float:left;">
        <form method="post" action="">
            <table class="minerva-table" id="data-table">
                <thead>
                <tr>
                    <th>
                        <div label=" "></div>
                    </th>
                    <th>
                        <div label="Last"></div>
                        Last
                    </th>
                    <th>
                        <div label="First"></div>
                        First
                    </th>
                    <th>
                        <div label="email"></div>
                        Email
                    </th>
                    <th class="scrollbarhead"/> <!--extra cell at end of header row-->
                </tr>
                </thead>
                <!-- Pulls data from SQL database (applicant - tblApplicants) to populate table-->
                <tbody>
                <?php
                listSelected();
                ?>
                </tbody>
            </table>
            <button type="submit" name="submitCandidate" style="width: 150px; float:left;" class="btn btn-success">
                Generate Forms
            </button>
        </form>
    </div>

    <div class="container-fluid" style="float:right;">
    <textarea rows="5" cols="50" name="text_field" wrap="soft" style="width:650px; height:500px;">
Dear (first-name),
    Congratulations! You have been accepted.

From
Us
    </textarea>
    </div>

</div>


