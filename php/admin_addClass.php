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


$NGB=$_POST['NGB'];
$classNumber=$_POST['classNumber'];
$cycle=$_POST['cycle'];
$meritBase=$_POST['meritBase'];
$servAge=$_POST['servAge'];



//Incomplete functionality
$weeks=$_POST['weeks'];
//$weeks=["2019-03-01","2019-03-02","2019-03-03"];

for($i=0;$i<count($weeks)-1;$i++)
{
    $classWeek=($i+1);
    echo $classWeek."\n";
    $weeklyStart=getRightFormat($weeks[$i]);
    echo  $weeklyStart."\n";
    $weeklyEnd=getRightFormat($weeks[$i+1]);
    echo $weeklyEnd."\n";
    //tlkpclassweek
    $sql= "INSERT INTO
        tlkpclassweek
        (ClassWeek,ClassWeekStartDate,ClassWeekEndDate)
 VALUES ($classWeek,'$weeklyStart','$weeklyEnd');";

    $result = $conn->runQuery($sql);
}

//tblclasses
$sql = "INSERT INTO
        tblclasses
        (ClassYear,ChalleNGeStartDate,ClassStartDate,GraduationDate,PRCompletionDate,TargetGraduates,SiteClassNumber,NGB,Cycle,MeritBase,SelServAge) 
 VALUES ($classYear,'$challengeStartDate','$classStartDate','$graduationDate','$prCompletionDate','$targetGraduates','$classNumber','$NGB','$cycle','$meritBase','$servAge');";

/*
//tblclasses
$sql = "INSERT INTO
        tblclasses
        (ClassYear,ChalleNGeStartDate,ClassStartDate,GraduationDate,PRCompletionDate,TargetGraduates) 
 VALUES ($classYear,'$challengeStartDate','$classStartDate','$graduationDate','$prCompletionDate','$targetGraduates');";
*/
$result = $conn->runQuery($sql);

/*
//tlkpclassweek
$sql= "INSERT INTO
        tlkpclassweek
        (ClassWeek,ClassWeekStartDate,ClassWeekEndDate)
 VALUES ($classWeek,'$weeklyStart','$weeklyEnd');";

$result = $conn->runQuery($sql);
*/
print_r($sql);

function getRightFormat($date)
{
    $valid = strtotime($date);
    $valid = date('Y-m-d', $valid);
    return $valid;
}
?>