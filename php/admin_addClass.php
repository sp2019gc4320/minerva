<?php
// File: admin_addClass.php
// Add a new class to the database
// Prints JSON array
//connect to db controller
require_once 'dbcontroller.php';

//must get new files before completion

//create connection
$conn = new DBController();

$classYear= filter_input(INPUT_POST, "classYear", FILTER_SANITIZE_NUMBER_INT);
$challengeStartDate=$conn->getRightFormat($conn->sanitize($_POST['challengeStartDate']));
$classStartDate=$conn->getRightFormat($conn->sanitize($_POST["classStartDate"]));
$graduationDate=$conn->getRightFormat($conn->sanitize($_POST["graduationDate"]));
$prCompletionDate= $conn->getRightFormat($conn->sanitize($_POST["prCompletionDate"]));
$targetGraduates= filter_input(INPUT_POST, "targetGraduates",FILTER_SANITIZE_NUMBER_INT);
$NGB= filter_input(INPUT_POST, "NGB",FILTER_SANITIZE_NUMBER_INT);
$classNumber=filter_input(INPUT_POST, "classNumber",FILTER_SANITIZE_NUMBER_INT);
$cycle=filter_input(INPUT_POST, "cycle", FILTER_SANITIZE_NUMBER_INT);
$meritBase=filter_input(INPUT_POST, "meritBase", FILTER_SANITIZE_NUMBER_INT);
$servAge=filter_input(INPUT_POST, "servAge",FILTER_SANITIZE_NUMBER_INT);

$fkSiteID=filter_input(INPUT_POST, "fkSiteID",FILTER_SANITIZE_NUMBER_INT);

//Incomplete functionality
$weeks=json_decode($_POST['weeks']);
//$weeks=["2019-03-01","2019-03-02","2019-03-03"];
$counter=1;
for($i=0;$i<(count($weeks)-1);$i+=2,$counter++)
{
    $classWeek=$counter;
    $weeklyStart=$conn->getRightFormat($weeks[$i]);
    $weeklyEnd=$conn->getRightFormat($weeks[$i+1]);

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

?>