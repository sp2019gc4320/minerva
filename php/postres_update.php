<?php
//postres_update.php
// received an op along with tbl to determine whicht tables to upde

require_once 'dbcontroller.php';

//Create connection
$connection = new DBController();

//default to updating
$op = 'ADD';
$tbl = "tblPRReports";
$primaryKey = "0";

if (isset($_POST['tbl'])) {
    $tblType = filter_input(INPUT_POST, "tbl");
    if ($tblType == "Report") {
        $tbl = "tblPRReports";
        $primaryKey = "PRReportID";
    }
    else if ($tblType == "MentorContacts")
    {
        $tbl = "tblMentorContacts";
        $primaryKey = "MentorContactID";
    }
    else if ($tblType == "Employment")
    {
        $tbl = "tblPREmployment";
        $primaryKey = "PREmpID";
    }

    else if ($tblType == "Education")
    {
        $tbl = "tblPREducation";
        $primaryKey = "PREdID";
    }

    else if ($tblType == "Military")
    {
        $tbl = "tblPRMilitary";
        $primaryKey = "PRMilID";
    }

    else if ($tblType == "Misc")
    {
        $tbl = "tblPRMisc";
        $primaryKey = "PRMiscID";
    }

    unset($_POST['tbl']);
}

// check for operation set from controller
if (isset($_POST['op'])) {
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}

if ($op == 'ADD') {

    if ($tblType == "Report") {
        $fkPlacementID = filter_input(INPUT_POST, "fkPlacementID");
        $PRReportType = filter_input(INPUT_POST, "PRReportType");
        $PRReporterCategory = filter_input(INPUT_POST, "PRReporterCategory");
        $PRReportDate = filter_input(INPUT_POST, "PRReportDate");
        $PRReporterID = filter_input(INPUT_POST, "PRReporterID");
        $WasContactMade = filter_input(INPUT_POST, "WasContactMade");
        $WasMentorInvolved = filter_input(INPUT_POST, "WasMentorInvolved");
        $PRReportNote = filter_input(INPUT_POST, "PRReportNote");

        $sql = "INSERT INTO $tbl 
            (fkPlacementID, PRReportType, PRReporterCategory, PRReportDate, PRReporterID,
            WasContactMade, WasMentorInvolved, PRReportNote)
             VALUES ( '$fkPlacementID', '$PRReportType', '$PRReporterCategory', '$PRReportDate', '$PRReporterID',
            '$WasContactMade', '$WasMentorInvolved', '$PRReportNote'
             )";
    }
    else if ($tblType == "MentorContacts")
    {
        $fkMentorPotentialID = filter_input(INPUT_POST, "fkMentorPotentialID");
        $contactDate = filter_input(INPUT_POST, "ContactDate");
        $mentorContactType = filter_input(INPUT_POST, "MentorContactType");
        $mentorContactNote = filter_input(INPUT_POST, "MentorContactNote");
        $contactPlacementMonth = filter_input(INPUT_POST, "ContactPlacementMonth");

        $sql = "INSERT INTO tblMentorContacts ( fkMentorPotentialID, ContactDate, MentorContactType, MentorContactNote, ContactPlacementMonth)
             VALUES ('$fkMentorPotentialID', '$contactDate', '$mentorContactType', '$mentorContactNote', '$contactPlacementMonth')";

    }
    else if ($tblType == "Education")
    {
        $fkPlacementID = filter_input(INPUT_POST,'fkPlacementID');
        $PREdSchoolType= filter_input(INPUT_POST,'PREdSchoolType');
        $PREdStatus= filter_input(INPUT_POST,'PREdStatus');
        $PREdStartDate= filter_input(INPUT_POST,'PREdStartDate');
        $PREdEndDate= filter_input(INPUT_POST,'PREdEndDate');
        $IsPREdFullTime= filter_input(INPUT_POST,'IsPREdFullTime');
        $PREdNote = filter_input(INPUT_POST,'PREdNote');

    $sql = "INSERT INTO tblPREducation (fkPlacementID, PREdSchoolType, PREdStatus, PREdStartDate, PREdEndDate, IsPREdFullTime, PREdNote )
VALUES ('$fkPlacementID', '$PREdSchoolType', '$PREdStatus', '$PREdStartDate', '$PREdEndDate', '$IsPREdFullTime', '$PREdNote' )";
    }
    else if ($tblType == "Employment")
    {
        $fkPlacementID = filter_input(INPUT_POST,'fkPlacementID');
        $PREmployer = filter_input(INPUT_POST,'PREmployer');
        $PREmpHireDate = filter_input(INPUT_POST,'PREmpHireDate');
        $PREmpHrsPerWeek = filter_input(INPUT_POST,'PREmpHrsPerWeek');
        $PREmpWageRate = filter_input(INPUT_POST,'PREmpWageRate');
        $PREmpWageType = filter_input(INPUT_POST,'PREmpWageType');
        $PREmpWorkStatus = filter_input(INPUT_POST,'PREmpWorkStatus');
        $PREmpPOCPhone = filter_input(INPUT_POST,'PREmpPOCPhone');
        $PREmpPOCName = filter_input(INPUT_POST,'PREmpPOCName');
        $IsPREmpSelfEmployed = filter_input(INPUT_POST,'IsPREmpSelfEmployed');
        $PREmpTermDate = filter_input(INPUT_POST,'PREmpTermDate');
        $PREmpTermNote = filter_input(INPUT_POST,'PREmpTermNote');
        $PREmpNotes = filter_input(INPUT_POST,'PREmpNotes');


      $sql = "INSERT INTO tblPREmployment (fkPlacementID, PREmployer, PREmpHireDate, PREmpHrsPerWeek, PREmpWageRate,
PREmpWageType, PREmpWorkStatus, PREmpPOCPhone, PREmpPOCName, IsPREmpSelfEmployed,
PREmpTermDate, PREmpTermNote, PREmpNotes) VALUES
('$fkPlacementID', '$PREmployer', '$PREmpHireDate', '$PREmpHrsPerWeek', '$PREmpWageRate',
'$PREmpWageType', '$PREmpWorkStatus', '$PREmpPOCPhone', '$PREmpPOCName', '$IsPREmpSelfEmployed',
'$PREmpTermDate', '$PREmpTermNote', '$PREmpNotes')";


    }
    else if ($tblType == "Military")
    {
        $fkPlacementID = filter_input(INPUT_POST,'fkPlacementID');
        $PRMilStatus= filter_input(INPUT_POST,'PRMilStatus');
        $PRMilAffiliation= filter_input(INPUT_POST,'PRMilAffiliation');
        $IsAGR= filter_input(INPUT_POST,'IsAGR');
        $PRMilEnlistDate= filter_input(INPUT_POST,'PRMilEnlistDate');
        $PRMilDelayedEntryDate= filter_input(INPUT_POST,'PRMilDelayedEntryDate');
        $PRMilDischargeDate= filter_input(INPUT_POST,'PRMilDischargeDate');
        $PRMilNote= filter_input(INPUT_POST,'PRMilNote');

        $sql = "INSERT INTO tblPRMilitary (fkPlacementID, PRMilStatus, PRMilAffiliation, IsAGR, PRMilEnlistDate, PRMilDelayedEntryDate, PRMilDischargeDate, PRMilNote)
 VALUES ('$fkPlacementID', '$PRMilStatus', '$PRMilAffiliation', '$IsAGR', '$PRMilEnlistDate', '$PRMilDelayedEntryDate', '$PRMilDischargeDate', '$PRMilNote')";
    }
    else if ($tblType == "Misc")
    {
        $fkPlacementID = filter_input(INPUT_POST,'fkPlacementID');
        $PRMiscPlacementType = filter_input(INPUT_POST,'PRMiscPlacementType');
        $PRMiscStartDate = filter_input(INPUT_POST,'PRMiscStartDate');
        $PRMiscEndDate = filter_input(INPUT_POST,'PRMiscEndDate');
        $PRMiscHrs = filter_input(INPUT_POST,'PRMiscHrs');
        $PRMiscNote = filter_input(INPUT_POST,'PRMiscNote');

          $sql = "INSERT INTO tblPRMisc (fkPlacementID, PRMiscPlacementType, PRMiscStartDate, PRMiscEndDate, PRMiscHrs, PRMiscNote)
                  VALUES ('$fkPlacementID', '$PRMiscPlacementType', '$PRMiscStartDate', '$PRMiscEndDate', '$PRMiscHrs', '$PRMiscNote')";
    }

    $primaryValue  = $connection->createRecord($sql);


}
// if operation is update, query to update tblmentorcontacts
if ($op == 'UPDATE') {
    if (isset($_POST[$primaryKey])) {
        $primaryValue = filter_input(INPUT_POST, $primaryKey);
        unset($_POST[$primaryKey]);
    }
        //Get all the column names in the tblMentorContacts table
        $sql = "SELECT * FROM $tbl  WHERE  $primaryKey = '$primaryValue'";
        $result = $connection->runSelectQuery($sql);

        //Update each field sent as post parameter
        if ($result) {
            $fieldInfo = mysqli_fetch_fields($result);
            $row = $result->fetch_assoc();

            foreach ($fieldInfo as $val) {
                $fieldName = $val->name;

                // check to see if there is a post value
                if (isset($_POST[$fieldName])) {
                    $fieldValue = filter_input(INPUT_POST, $fieldName);
                    $sql = "UPDATE $tbl  SET  $fieldName ='$fieldValue' WHERE  $primaryKey= '$primaryValue'";
                    $connection->runQuery($sql);
                }
            }
        }
        echo '{ "status": "finished updating "}';

} // if operation is add, query to add a new record to the database
 // if operation is delete, query to delete a record from the database
else if ($op == 'DELETE') {
    if (isset($_POST[$primaryKey])) {
        $primaryValue = filter_input(INPUT_POST, $primaryKey);
        unset($_POST[$primaryKey]);
    }
    $sql = " DELETE FROM $tbl WHERE $primaryKey= '$primaryValue'";

    $result = $connection->runDeleteQuery($sql);
}

?>
