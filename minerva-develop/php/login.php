<?php

/* 
 * login.php
 * Sign in 
 * The purpose of this file is to use the information input from adminsLogin.html
 * and to check if there is a user that matches that username and password and sign them in.
 */
require_once 'dbcontroller.php';

session_start(); 
$connection = new DBController();

$username = $_POST['username'];
$password = $_POST['password'];


$sql = "SELECT * FROM tblUsers WHERE UserLoginName = '$username' AND UserPW = '$password'";

//Puts rowCount equal to the amount of users with that specific information
$rowCount = $connection->numRows($sql);



if($rowCount) //If there is a user with that information, this signs them in
{

   $result = $connection->runSelectQuery($sql);
   $record = $result->fetch_assoc();
   $privilege = $record['Privilege'];
   $fkSiteID = $record['fkSiteID'];

   //print_r ($record);  //used during debugging to show all fields retrieved

     $_SESSION["loggedIn"] = true; //Put to true so all pages know that this user is signed in.

     setcookie("minerva_user", $username, time() + 86400, "/");
     $_SESSION["minerva_user"] = $username; //hmmm not added on users computer
     $_SESSION["Privilege"] = $privilege;

     //generates positive message  -- access it with  result.data.status
     echo '{"status": "user logged in", "fkSiteID" :"'. $fkSiteID.'", "username": "'.$username.'"}' ;

}
else
{
  echo 'not found';
  http_response_code(404);

}


?>


