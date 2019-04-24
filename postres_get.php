<?php
//File: postres_get.php
//Used by
//  postres.controller.js
//  This file provides the sql statments and puts them in an object. The object is passed to the controller.

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


// default values for testing
$CadetID = 230;//Uses CadetID 12 (Judson has 2 education placements in one month
//Replace with POST parameters

//Use ClassDetailID and ClassID for cadet 230
$ClassDetailID = 229; //ClassDetail for Cadet 230 Judson has two Education Records
$ClassID =1;

//1. Get related ClassID and ClassDetailID
$sql= "SELECT fkClassID, ClassDetailID FROM tblClassDetails WHERE fkCadetID = '$CadetID'";
$result = $connection->runSelectQuery($sql);
if ($result->num_rows > 0)
{
    //TODO : this always gets the first row -- we are assuming only one matching cadet ID which may not be the case
    $row = $result->fetch_assoc();
    $ClassID =$row['fkClassID'];
    $ClassDetailID =$row['ClassDetailID'];
}

$data = array();
//1. Get All Placement records for a given ClassDetailID
$sql= "SELECT * FROM tblPRPlacements WHERE fkClassDetailID = '$ClassDetailID'";
$result = $connection->runSelectQuery($sql);

//2.  For each placement record store education, employment, military, misc, and report arrays
if ($result->num_rows > 0)
{
    while($row = $result->fetch_assoc()) {
        //An associate array is returned.  so convert this into an object
        $placement = (object)$row;

        //Store the placementID so it can be used in subsequent queries
        $placementID = $placement->PlacementID;

        //Store Education Information
        $sectionSQL = "SELECT * FROM tblPREducation WHERE fkPlacementID = '$placementID'";
        $sectionResult = $connection->runSelectQueryArrayNotEncoded($sectionSQL);
        $placement->education = $sectionResult;

        //Store Employment Information
        $sectionSQL = "SELECT * FROM tblPREmployment WHERE fkPlacementID = '$placementID'";
        $sectionResult = $connection->runSelectQueryArrayNotEncoded($sectionSQL);
        $placement->employment = $sectionResult;

        //Store Military Information
        $sectionSQL = "SELECT * FROM tblPRMilitary WHERE fkPlacementID = '$placementID'";
        $sectionResult = $connection->runSelectQueryArrayNotEncoded($sectionSQL);
        $placement->military = $sectionResult;

        //Store Misc Information
        $sectionSQL = "SELECT * FROM tblPRMisc WHERE fkPlacementID = '$placementID'";
        $sectionResult = $connection->runSelectQueryArrayNotEncoded($sectionSQL);
        $placement->misc = $sectionResult;

        //Store Report Information
        $sectionSQL = "SELECT * FROM tblPRReports WHERE fkPlacementID = '$placementID'";
        $sectionResult = $connection->runSelectQueryArrayNotEncoded($sectionSQL);
        $placement->reports = $sectionResult;

        //add placement object to data array
        $data[] = $placement;
    }
}

//3. Retrieve mentor contacts
$sql = "SELECT tblMentorContacts.* FROM tblMentorContacts 
      INNER JOIN tblMentorPotential ON tblMentorContacts.fkMentorPotentialID = tblMentorPotential.MentorPotentialID 
      WHERE tblMentorPotential.fkClassDetailID = $ClassDetailID";
$contacts = $connection->runSelectQueryArrayNotEncoded($sql);


//4. Retrive placement month date ranges
$sql = "SELECT * FROM tlkpPRReportMonth WHERE fkClassID =$ClassID  ORDER BY ReportMonth";
$reportMonths = $connection->runSelectQueryArrayNotEncoded($sql);

//5. Retrieve all related Potential mentors

$sql = "SELECT fkMentorID, MentorPotentialID FROM tblMentorPotential WHERE fkClassDetailID = $ClassDetailID";
$mentors = $connection->runSelectQueryArrayNotEncoded($sql);

echo '{ "data":' . (urldecode(json_encode($data))) . ', "contacts": ', (urldecode(json_encode($contacts))) .', "mentors": '. (urldecode(json_encode($mentors))).', "reportMonths": '. (urldecode(json_encode($reportMonths))) .' } ';

?>