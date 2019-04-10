<?php
// File: dbctrl.php
// Use by all php files to access database
//

class DBController{

private $host = "localhost";
private $user = "root";
private $pass = "";
private $database = "applicant";
private $conn;

    function __construct() {
        $this->conn = $this->connectDB();
    }

    function connectDB() { //Used to establish the connection between the client and server.
        $conn = mysqli_connect($this->host,$this->user,$this->pass,$this->database);
        return $conn;
    }
}
