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

//Use ClassDetailID
$ClassDetailID = 229; //ClassDetail for Cadet 230 Judson has two Education Records
if (isset($_POST['ClassDetailID'])) {
    $ClassDetailID = filter_input(INPUT_POST, "CadetID");
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
}echo '{ "data":' . (json_encode($data)) . "} ";


/*

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{ "header":' . (json_encode($result)) . ", ";

$sql = "SELECT tblPRPlacements.PlacementMonth, tblPRPlacements.MeetsRequiredContact, tblPRPlacements.MeetsPlacementCriteria,
               tblPRReports.PRReportType, tblPRReports.PRReporterCategory, tblPRReports.PRReportDate, tblPRReports.PRReporterID, 
               tblPRReports.WasContactMade, tblPRReports.PRReportNote, 
              tblCadets.CadetID, tblPeople.PersonFN, tblPeople.PersonLN
        FROM tblPeople INNER JOIN (tblCadets INNER JOIN ((tblClassDetails INNER JOIN tblPRPlacements ON tblClassDetails.ClassDetailID = tblPRPlacements.fkClassDetailID) INNER JOIN tblPRReports ON tblPRPlacements.PlacementID = tblPRReports.fkPlacementID) ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID
        WHERE (((tblCadets.CadetID)='$CadetID'))
        ";
$result = $connection->runSelectQueryArray($sql);  //TODO uses encoded version
echo ' "reports":' . (json_encode($result)) . ", ";

$sql = "SELECT tblMentorContacts.ContactDate, tblMentorContacts.MentorContactType, tblMentorContacts.MentorContactNote, tblMentorContacts.ContactPlacementMonth, 
              tblClassDetails.fkCadetID
        FROM (tblMentorPotential 
        INNER JOIN tblClassDetails ON tblMentorPotential.fkClassDetailID = tblClassDetails.ClassDetailID) 
        INNER JOIN tblMentorContacts ON tblMentorPotential.MentorPotentialID = tblMentorContacts.fkMentorPotentialID
        WHERE (((tblClassDetails.fkCadetID)='$CadetID')) AND ( tblMentorContacts.ContactPlacementMonth IS NOT NULL);
       ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo ' "contacts":' . (json_encode($result)) . ", ";

$sql = "SELECT tblPRPlacements.PlacementMonth, tblPRPlacements.MeetsRequiredContact, tblPRPlacements.MeetsPlacementCriteria, 
               tblCadets.CadetID, tblPeople.PersonFN, tblPeople.PersonLN, 
               tblPREducation.PREdSchoolType, tblPREducation.PREdStatus, tblPREducation.PREdStartDate, tblPREducation.PREdEndDate, 
               tblPREducation.IsPREdFullTime, tblPREducation.PREdNote, tblPREducation.PREdID
        FROM ((tblPeople 
        INNER JOIN (tblCadets 
        INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) 
        INNER JOIN tblPRPlacements ON tblClassDetails.ClassDetailID = tblPRPlacements.fkClassDetailID) 
        INNER JOIN tblPREducation ON tblPRPlacements.PlacementID = tblPREducation.fkPlacementID
        WHERE (((tblCadets.CadetID)='$CadetID'));
       ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo ' "education":' . (json_encode($result)) . ", ";

$sql = "SELECT tblPRPlacements.PlacementMonth, tblPRPlacements.MeetsRequiredContact, tblPRPlacements.MeetsPlacementCriteria, 
tblCadets.CadetID, tblPeople.PersonFN, tblPeople.PersonLN, 
tblPRMilitary.PRMilStatus, tblPRMilitary.PRMilAffiliation, tblPRMilitary.IsAGR, tblPRMilitary.PRMilEnlistDate, tblPRMilitary.PRMilDelayedEntryDate, tblPRMilitary.PRMilDischargeDate, tblPRMilitary.PRMilNote, tblPRMilitary.PRMilID
        FROM ((tblPeople INNER JOIN (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) INNER JOIN tblPRPlacements ON tblClassDetails.ClassDetailID = tblPRPlacements.fkClassDetailID) INNER JOIN tblPRMilitary ON tblPRPlacements.PlacementID = tblPRMilitary.fkPlacementID
        WHERE (((tblCadets.CadetID)='$CadetID'));
        ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo ' "military":' . (json_encode($result)) . ", ";

$sql = "SELECT tblPRPlacements.PlacementMonth, tblPRPlacements.MeetsRequiredContact, tblPRPlacements.MeetsPlacementCriteria, 
tblCadets.CadetID, tblPeople.PersonFN, tblPeople.PersonLN, 
tblPREmployment.PREmployer, tblPREmployment.PREmpHireDate, tblPREmployment.PREmpHrsPerWeek, tblPREmployment.PREmpWageRate, 
tblPREmployment.PREmpWageType, tblPREmployment.PREmpWorkStatus, tblPREmployment.PREmpPOCPhone, tblPREmployment.PREmpPOCName, 
tblPREmployment.IsPREmpSelfEmployed, tblPREmployment.PREmpTermDate, tblPREmployment.PREmpTermNote, tblPREmployment.PREmpNotes, 
tblPREmployment.PREmpID
        FROM ((tblPeople INNER JOIN (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) INNER JOIN tblPRPlacements ON tblClassDetails.ClassDetailID = tblPRPlacements.fkClassDetailID) INNER JOIN tblPREmployment ON tblPRPlacements.PlacementID = tblPREmployment.fkPlacementID
        WHERE (((tblCadets.CadetID)='$CadetID'));
        ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo ' "employment":' . (json_encode($result)) . ", ";

$sql = "SELECT tblPRPlacements.PlacementMonth, tblPRPlacements.MeetsRequiredContact, tblPRPlacements.MeetsPlacementCriteria, 
tblCadets.CadetID, tblPeople.PersonFN, tblPeople.PersonLN, tblPRMisc.PRMiscPlacementType, tblPRMisc.PRMiscStartDate, 
tblPRMisc.PRMiscEndDate, tblPRMisc.PRMiscHrs, tblPRMisc.PRMiscNote, tblPRMisc.PRMiscID, tblPRPlacements.PlacementID
        FROM ((tblPeople 
        INNER JOIN (tblCadets 
        INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) 
        ON tblPeople.PersonID = tblCadets.fkPersonID) 
        INNER JOIN tblPRPlacements ON tblClassDetails.ClassDetailID = tblPRPlacements.fkClassDetailID) 
        INNER JOIN tblPRMisc ON tblPRPlacements.PlacementID = tblPRMisc.fkPlacementID
        WHERE (((tblCadets.CadetID)='$CadetID'));
        ";
$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo ' "misc":' . (json_encode($result)) . "} ";
*/
?>