<?php
//mentor_getMentorHistory.php
// UsedBy:
//  addMentorCtrl.js

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//Default value for testing
$PersonID = 223;
$PersonID = 288;

$PersonID = $connection->sanitize($_POST['PersonID']);

//Replace testing value with POST parameter
if (isset($_POST['PersonID'])) {
    $PersonID = filter_input(INPUT_POST, "PersonID");
}

$sql = "SELECT tblPeople.PersonID, tblMentors.IsPooled, tblMentors.MPermTerminateReason, tblMentors.MIsPermTerminate, tblMentors.MentorID
          FROM tblPeople INNER JOIN tblMentors ON tblPeople.PersonID = tblMentors.fkPersonID
          WHERE (((tblPeople.PersonID)= '$PersonID'))
          ";

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '{"mentor":' . urldecode(json_encode($result)) . ", ";


$sql = "SELECT tblClasses.ClassYear, tblClasses.Cycle, tblPeople.PersonLN, tblMentors.fkPersonID,
                   tblMentorPotential.MPStatus, tblCadets.CadetID, tblPeople.PersonFN, tblPeople.PersonGenQual,
                   tblClasses.fkSiteID, tblClasses.SiteClassNumber, tblClasses.FYrStartDate, tblMentors.MentorID, tlkpSite.SiteCode
            FROM tlkpSite INNER JOIN ((
                     (tblPeople INNER JOIN (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID)  ON tblPeople.PersonID = tblCadets.fkPersonID)
                     INNER JOIN
                     (tblMentors INNER JOIN tblMentorPotential ON tblMentors.MentorID = tblMentorPotential.fkMentorID) ON tblClassDetails.ClassDetailID = tblMentorPotential.fkClassDetailID)
                     INNER JOIN
                     tblClasses ON tblClassDetails.fkClassID = tblClasses.ClassID) ON tlkpSite.SiteID = tblClasses.fkSiteID
            WHERE (((tblMentors.fkPersonID)= '$PersonID'))
            ORDER BY tblClasses.ClassYear DESC , tblClasses.Cycle DESC , tblPeople.PersonLN;
             ";

$result = $connection->runSelectQueryArrayNotEncoded($sql);
echo '"cadets":' . urldecode(json_encode($result)) . "} ";

?>