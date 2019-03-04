<?php

/* 
 * Created by: The A-Team (James Harrison, Charles Ramsey, Evan Thomas, and Colton Thompson)
 * Sign in 
 * The purpose of this file is to use the information input from index.php and to check if there is a user that matches that email and password and sign them in.
 */
require_once 'dbcontroller.php'; 
session_start(); 
$connection = new DBController(); 
$email = filter_input(INPUT_POST, 'email');
$email = $_POST['email'];
$password = $_POST['password']; 

$rowCount = $connection->numRows("SELECT * FROM users WHERE email = '$email' AND password = '$password'"); //Puts rowCount equal to the amount of users with that specific information

if($rowCount) //If there is a user with that information, this signs them in
{
     $record = $connection->runQuery("SELECT * FROM users WHERE email = '$email' AND password = '$password'")[0];
	 $role = $record['role'];
     $_SESSION["loggedIn"] = true; //Put to true so all pages know that this user is signed in.
	 $_SESSION["permissions"] = $connection->runQuery("SELECT * FROM roles WHERE role = '$role'")[0]; //Checks that users permissions.
     
     setcookie("email", $record['email'], time() + 86400, "/"); 
     header("Location: allCadetView.php?"); //Redirects to the allCadetView.php
}
else
	header("Location: index.php"); //Redirects to login page if user is not logged in.



?>
