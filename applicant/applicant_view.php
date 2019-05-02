<head>
    <meta charset="UTF-8">
    <title>Documents and Forms</title>

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
        table, th, td {
            border: 0px solid black;
        }
        .gfg {
            border-collapse: separate;
            border-spacing: 0 30px;
        }
        .gfg2 {
            border-collapse: separate;
            border-spacing: 0 50px;
        }
        #main {
            width: 650px;
        }
        h1 {
            margin: 0;
            display: inline-block;
        }
        button {
            float: right;
        }
        table {
            border-collapse: separate;
            border-spacing: 50px 0;
        }

        td {
            padding: 10px 0;
        }
    </style>

</head>
<body>
<br>
<div id="main">
    <h3 style="font-size:40px; text-indent: 20px; text-align:left">Documents and Forms</h3></div>

<hr style="height:3px;border:none;color:#333;background-color:#333;margin-bottom: 0px" />

<div class="topnav">
    <a href="./applicant_list.php">Home</a>
    <a href="./candidate_list.php">Candidates</a>
    <a href="./deadpool_list.php">Dead Pool</a>
    <a class="active"  href="./applicant_view.php">Documents</a>
    <a href="./forms.php">Form Management</a>
</div><br>
<button type="button" style="width:300px;" class="btn btn-danger">INELIGIBLE FOR REVIEW</button>

<font size="5"><?php require_once "./applicant_documents.php"; displayName(); ?></font>
    
<table border="0" class="gfg">
    <tr>
        <th><font size="5"> Pending Documents </font> <button type="button" style="width:65px;height:35px;" class="btn btn-primary">SAVE</button></th>
        <th style="width:30%"> </th>
        <th style="width:30%"></th>
    </tr>
    <?php require_once "./applicant_documents.php"; listPending(); ?>
</table>
<hr style="height:3px;border:none;color:#333;background-color:#333;" />

<table border="0" class = "gfg2">
    <tr>
        <th><font size="5"> Completed Documents </font></th>
        <th style="padding:0 150px"></th>
        <th><font size="5"> Date Completed </font></th>
    </tr>
    <?php require_once "./applicant_documents.php"; listCompleted(); ?>
</table>


</body>
</html>
