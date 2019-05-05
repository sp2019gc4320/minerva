<?php

require_once '../php/dbcontroller.php';

function listDocuments(){
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "SELECT * FROM tblreqdocs";

    $result = $connection->connectDB();
    if (!$result)
        die("Unable to perform query!");

    $result = $connection->runSelectQueryArray($sql);
    echo json_encode($result);
}
listDocuments();



/*
function reqDocument(){
    $connection = new DBController();
    if (!$connection) die("Unable to connect to the database!");

    $sql = "SELECT * FROM tblreqdocs";

    $result = $connection->connectDB();
    if (!$result)
        die("Unable to perform query!");

    $result = $connection->runSelectQueryArray($sql);
    echo json_encode($result);
}
reqDocument();*/
