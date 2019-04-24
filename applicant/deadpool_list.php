<head>
    <meta charset="UTF-8">
    <title>Dead Pool</title>

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

<h3 style="font-size:40px; text-indent: 20px; text-align:left">Dead Pool</h3>

<hr style="height:3px;border:none;color:#333;background-color:#333;" />


<div class="scrollingtable">
    <div>
        <div>
            <table id="data-table">
                <thead>
                <tr>
                    <th><div label=" "</div></th>
                    <th><div label="Last"></div></th>
                    <th><div label="First"></div></th>
                    <th><div label="IDNumber"></div></th>
                    <th class="scrollbarhead"/> <!--extra cell at end of header row-->
                    </tr>
                    </thead>

                    <!-- Pulls data from SQL database (deadpool - tblDeadPool) to populate table-->
                    <tbody>
                        <?php require './applicant_viewDeadPool.php';
                            listDeadPool();
                        ?>
                    </tbody>
            </table>
        </div>
    </div>



</body>
