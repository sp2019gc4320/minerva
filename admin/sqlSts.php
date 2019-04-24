<?php
function connectDB()
{
    //For local host
    $host = "localhost";
    $user = "root";
    $pwd = "";
    $db = "minerva";



    $conn = new mysqli($host, $user, $pwd, $db);
    if($conn->connect_error)
    {
        die("Connection failed: ".$conn->connect_error);
    }
    else
        return $conn;
}
?>
