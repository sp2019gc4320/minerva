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

$fkSiteID=$_POST['fkSiteID'];



//Incomplete functionality
$weeks=json_decode($_POST['weeks']);
//$weeks=["2019-03-01","2019-03-02","2019-03-03"];
$counter=1;
for($i=0;$i<(count($weeks)-1);$i+=2,$counter++)
{
    $classWeek=$counter;
    $weeklyStart=getRightFormat($weeks[$i]);
    $weeklyEnd=getRightFormat($weeks[$i+1]);

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
        (ClassYear,ChalleNGeStartDate,ClassStartDate,GraduationDate,PRCompletionDate,TargetGraduates,SiteClassNumber,NGB,Cycle,MeritBase,SelServAge,fkSiteID,fkClassPhaseID) 
 VALUES ($classYear,'$challengeStartDate','$classStartDate','$graduationDate','$prCompletionDate','$targetGraduates','$classNumber','$NGB','$cycle','$meritBase','$servAge','$fkSiteID','1');";

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