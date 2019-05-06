<?php
require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


//default to updating
$op ='UPDATE';

$docName = "Education Plan Documentation";


/*if(isset($_POST['docName'])){
    $docName = filter_input(INPUT_POST, "docName");
    unset($_POST['docName']);
}

if(isset($_POST['op'])){
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}*/

//if($op == 'UPDATE')
//if checked set required to 1

//$reqd=json_decode($_POST['jsondataREQUIRED']);
//$notRequired=json_decode($_POST['jsondataNOTREQUIRED']);

$reqd = $_POST['reqd'];
$reqd = explode(',', $reqd);

$notRequired = $_POST['notRequired'];
$notRequired = explode(',', $notRequired);

    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "UPDATE tblreqdocs
            SET required = 1
            WHERE docName in $reqd";//fix this

    $result = $connection->connectDB();
    if (!$result)
        die("Unable to perform query!");

    $result = $connection->runSelectQueryArray($sql);
    echo json_encode($result);


    //if not checked set required to 0
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "UPDATE tblreqdocs
                SET required = 0
                WHERE docName in $notRequired";//fix this

    $result = $connection->connectDB();
    if (!$result)
        die("Unable to perform query!");

    $result = $connection->runSelectQueryArray($sql);
    echo json_encode($result);

