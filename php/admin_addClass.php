<?php
// File: admin_addClass.php
// Add a new class to the database
// Prints JSON array
//connect to db controller
require_once 'dbcontroller.php';
session_start();

//must get new files before completion

//create connection
$conn = new DBController();

$classYear= filter_input(INPUT_POST, "ClassYear", FILTER_SANITIZE_NUMBER_INT);
$challengeStartDate=$conn->getRightFormat($conn->sanitize($_POST['ChalleNGeStartDate']));
$classStartDate=$conn->getRightFormat($conn->sanitize($_POST["ClassStartDate"]));
$graduationDate=$conn->getRightFormat($conn->sanitize($_POST["GraduationDate"]));
$prCompletionDate= $conn->getRightFormat($conn->sanitize($_POST["PRCompletionDate"]));
//$targetGraduates= filter_input(INPUT_POST, "targetGraduates",FILTER_SANITIZE_NUMBER_INT);
$NGB= filter_input(INPUT_POST, "NGB",FILTER_SANITIZE_NUMBER_INT);
$classNumber=filter_input(INPUT_POST, "SiteClassNumber",FILTER_SANITIZE_NUMBER_INT);
$cycle=filter_input(INPUT_POST, "Cycle", FILTER_SANITIZE_NUMBER_INT);
//$meritBase=filter_input(INPUT_POST, "MeritBase", FILTER_SANITIZE_NUMBER_INT);
//$servAge=filter_input(INPUT_POST, "servAge",FILTER_SANITIZE_NUMBER_INT);

$fkSiteID=$_SESSION["SiteID"];

//tblclasses
$sql = "INSERT INTO
        tblClasses
        (ClassYear,ChalleNGeStartDate,ClassStartDate,GraduationDate,PRCompletionDate,SiteClassNumber,NGB,Cycle,fkSiteID,fkClassPhaseID) 
 VALUES ($classYear,'$challengeStartDate','$classStartDate','$graduationDate','$prCompletionDate','$classNumber','$NGB','$cycle','$fkSiteID','1');";
$fkClassId = $conn->createRecord($sql);

/*
 * This function generates an array of date intervals in string format to be
 * added to the database for tlkpClassWeek and tlkpPRReportMonth.
 *
 * - Parameters:
 *  - $start: The first date (as a string) to create the date intervals from.
 *  - $length: The amount of intervals to generate. This is an integer
 *  value. 
 *  - $intervalSize: The size of each interval. This is either a day, month,
 *  week, year, or any other druation of time accepted by the strtotime
 *  function for calculating intervals.
 * - Returns: An array of objects that each contain two fields: (begin, end).
 * Begin is the begin date of the interval while end is the last date in the
 * time interval.
 */
function generateDateInvervals($start, $length, $intervalSize) {
    $intervals = array();
    for($i = 0; $i < $length; $i++) {
        $beginInterval = "+".$i." ".$intervalSize;
        $endInterval = "+".($i + 1)." ".$intervalSize;
        $dateBeginInterval = date("Y-m-d", strtotime($beginInterval, $start));
        $dateEndInterval = date("Y-m-d", strtotime($endInterval, $start));

        // Create an object to hold the begin and end interval
        $interval = new stdClass();
        $interval->begin = $dateBeginInterval;
        $interval->end = $dateEndInterval;
        array_push($intervals, $interval);
    }
    return $intervals;
}

// Generate the date intervals starting from the first date specified, up until
// the 22 week. 
$tlkpClassWeeks = generateDateInvervals(strtotime($classStartDate), 22, "week");
foreach($tlkpClassWeeks as $weekNumber => $interval) {
    //tlkpclassweek
    $sql= "INSERT INTO tlkpClassWeek (fkClassID, ClassWeek,ClassWeekStartDate,ClassWeekEndDate) VALUES ($fkClassId, ".($weekNumber + 1).",'".$interval->begin."','".$interval->end."');";
    $conn->createRecord($sql);
}

// Generate the date intervals starting 22 weeks after the initials start date. 
// We need 12 months for this look up table.
$tlkpPRReportMonths = generateDateInvervals(strtotime("+22 week", strtotime($classStartDate)), 12, "month");
foreach($tlkpPRReportMonths as $monthNumber => $interval) {
    $sql= "INSERT INTO tlkpPRReportMonth (fkClassID, ReportMonth, ReportMonthStartDate, ReportMonthEndDate) VALUES ($fkClassId, ".($monthNumber + 1).",'".$interval->begin."','".$interval->end."');";
    $conn->createRecord($sql);
}


function getRightFormat($date)
{
    $valid = strtotime($date);
    $valid = date('Y-m-d', $valid);
    return $valid;
}
?>
