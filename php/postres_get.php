<?php
//File: postres_get.php
//Used by
//  postres.controller.js
//  This file provides the sql statments and puts them in an object. The object is passed to the controller.

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();


// default values for testing
$CadetID = 12;//Uses CadetID 12 (Da'jour Calloway)
$CadetID = 230;//Uses CadetID 12 (Judson has 2 education placements in one month
//Replace with POST parameters
if (isset($_POST['CadetID'])) {
    $CadetID = filter_input(INPUT_POST, "CadetID");
}

$sql = "SELECT tblPRPlacements.PlacementMonth, tblPRPlacements.MeetsRequiredContact, tblPRPlacements.MeetsPlacementCriteria,
               tblCadets.CadetID, tblPeople.PersonFN, tblPeople.PersonLN
        FROM (tblPeople INNER JOIN (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) INNER JOIN tblPRPlacements ON tblClassDetails.ClassDetailID = tblPRPlacements.fkClassDetailID
        WHERE (((tblCadets.CadetID)='$CadetID'));
       ";
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

?>