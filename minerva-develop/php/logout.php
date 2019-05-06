<?php

/* 
 * Created by: The A-Team (James Harrison, Charles Ramsey, Evan Thomas, and Colton Thompson)
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
session_start(); 
$_SESSION["loggedIn"] = false; //Sets to false so that the user can not access any other page without signing back in.
unset($_SESSION["loggedIn"]); 
unset($_SESSION["permissions"]);
setcookie("email", NULL, time() - 86400);
header("Location: index.php"); //Redirects to login page.
?>