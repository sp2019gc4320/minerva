<?php
// File: admin_addClass.php
// Add a new class to the database
// Prints JSON array
//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$classYear= $_POST['classYear'];
$challengeStartDate=getRightFormat($_POST['challengeStartDate']);
$classStartDate=getRightFormat($_POST["classStartDate"]);
$graduationDate=getRightFormat($_POST["graduationDate"]);
$prCompletionDate= getRightFormat($_POST["prCompletionDate"]);
$targetGraduates= $_POST['targetGraduates'];

$classWeek= $_POST['classWeek'];
$weeklyStart= getRightFormat($_POST['weeklyStart']);
$weeklyEnd= getRightFormat($_POST['weeklyEnd']);


/*
$classYear= "2019";
$challengeStartDate=getRightFormat("2019-04-05");
$classStartDate=getRightFormat("2019-04-05");
$graduationDate=getRightFormat("2019-04-05");
$prCompletionDate= getRightFormat("2019-04-05");
$targetGraduates= "201";

$classWeek= "14";
$weeklyStart= getRightFormat("2019-04-05");
$weeklyEnd= getRightFormat("2019-04-05");
*/

//tblclasses
$sql = "INSERT INTO
        tblclasses
        (ClassYear,ChalleNGeStartDate,ClassStartDate,GraduationDate,PRCompletionDate,TargetGraduates) 
 VALUES ($classYear,'$challengeStartDate','$classStartDate','$graduationDate','$prCompletionDate','$targetGraduates');";

$result = $conn->runQuery($sql);

//tlkpclassweek
$sql= "INSERT INTO
        tlkpclassweek
        (ClassWeek,ClassWeekStartDate,ClassWeekEndDate)
 VALUES ($classWeek,'$weeklyStart','$weeklyEnd');";

$result = $conn->runQuery($sql);

print_r($sql);

function getRightFormat($date)
{
    $valid = strtotime($date);
    $valid = date('Y-m-d', $valid);
    return $valid;
}
?>