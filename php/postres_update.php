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
//gotten from storage
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

    if ($tblType == "Report") {//DOES NOT WORK

        $fkPlacementID = filter_input(INPUT_POST, "fkPlacementID");
        $PRReportType = filter_input(INPUT_POST, "PRReportType",FILTER_SANITIZE_STRING);
        $PRReporterCategory = filter_input(INPUT_POST, "PRReporterCategory",FILTER_SANITIZE_STRING);
        $PRReportDate =$connection->getRightFormat($connection->sanitize($_POST["PRReportDate"]));
        $PRReporterID = filter_input(INPUT_POST, "PRReporterID",FILTER_SANITIZE_NUMBER_INT);
        $WasContactMade = filter_input(INPUT_POST, "WasContactMade", FILTER_SANITIZE_NUMBER_INT);
        $WasMentorInvolved = filter_input(INPUT_POST, "WasMentorInvolved",FILTER_SANITIZE_NUMBER_INT);

        $PRReportNote1 = $_POST['PRReportNote'];
        $PRReportNote1 = str_replace('"', "'", $PRReportNote1);
        $PRReportNote1 = str_replace("\\", "/", $PRReportNote1);
        $PRReportNote= filter_var($PRReportNote1,FILTER_SANITIZE_ENCODED);


        $sql = "INSERT INTO $tbl 
            (fkPlacementID, PRReportType, PRReporterCategory, PRReportDate, PRReporterID,
            WasContactMade, WasMentorInvolved, PRReportNote)
             VALUES ( '$fkPlacementID', '$PRReportType', '$PRReporterCategory', '$PRReportDate', '$PRReporterID',
            '$WasContactMade', '$WasMentorInvolved', '$PRReportNote'
             )";
    }
    else if ($tblType == "MentorContacts")
    {
        $fkMentorPotentialID = filter_input(INPUT_POST, "fkMentorPotentialID",FILTER_SANITIZE_NUMBER_INT);
        $contactDate =$connection->getRightFormat($connection->sanitize($_POST['ContactDate']));
        $mentorContactType = filter_input(INPUT_POST, "MentorContactType",FILTER_SANITIZE_STRING);

        $mentorContactNote1 = $_POST['MentorContactNote'];
        $mentorContactNote1 = str_replace('"', "'", $mentorContactNote1);
        $mentorContactNote1 = str_replace("\\", "/", $mentorContactNote1);
        $mentorContactNote= filter_var($mentorContactNote1,FILTER_SANITIZE_ENCODED);

        $contactPlacementMonth = filter_input(INPUT_POST, "ContactPlacementMonth",FILTER_SANITIZE_NUMBER_INT);

        $sql = "INSERT INTO tblMentorContacts ( fkMentorPotentialID, ContactDate, MentorContactType, MentorContactNote, ContactPlacementMonth)
             VALUES ('$fkMentorPotentialID', '$contactDate', '$mentorContactType', '$mentorContactNote', '$contactPlacementMonth')";
    }
    else if ($tblType == "Education")//WORKS
    {
        $fkPlacementID = filter_input(INPUT_POST,"fkPlacementID",FILTER_SANITIZE_NUMBER_INT);
        $PREdSchoolType= filter_input(INPUT_POST,"PREdSchoolType",FILTER_SANITIZE_STRING);
        $PREdStatus= filter_input(INPUT_POST,"PREdStatus",FILTER_SANITIZE_STRING);
        $PREdStartDate =$connection->getRightFormat($connection->sanitize($_POST['PREdStartDate']));
        $PREdEndDate =$connection->getRightFormat($connection->sanitize($_POST['PREdEndDate']));
        $IsPREdFullTime= filter_input(INPUT_POST,'IsPREdFullTime');

        $PREdNote1 = $_POST['PREdNote'];
        $PREdNote1 = str_replace('"', "'", $PREdNote1);
        $PREdNote1 = str_replace("\\", "/", $PREdNote1);
        $PREdNote= filter_var($PREdNote1,FILTER_SANITIZE_ENCODED);

        $sql = "INSERT INTO tblPREducation (fkPlacementID, PREdSchoolType, PREdStatus, PREdStartDate, PREdEndDate, IsPREdFullTime, PREdNote )
VALUES ('$fkPlacementID', '$PREdSchoolType', '$PREdStatus', '$PREdStartDate', '$PREdEndDate', '$IsPREdFullTime', '$PREdNote' )";
    }
    else if ($tblType == "Employment")//WORKS
    {
        $fkPlacementID = filter_input(INPUT_POST,'fkPlacementID',FILTER_SANITIZE_NUMBER_INT);

        $PREmployer1 = $_POST['PREmployer'];
        $PREmployer1 = str_replace('"', "'", $PREmployer1);
        $PREmployer1 = str_replace("\\", "/", $PREmployer1);
        $PREmployer= filter_var($PREmployer1,FILTER_SANITIZE_ENCODED);

        $PREmpHireDate =$connection->getRightFormat($connection->sanitize($_POST['PREmpHireDate']));
        $PREmpHrsPerWeek = filter_input(INPUT_POST,'PREmpHrsPerWeek',FILTER_SANITIZE_NUMBER_INT);
        $PREmpWageRate = filter_input(INPUT_POST,'PREmpWageRate',FILTER_SANITIZE_NUMBER_FLOAT);
        $PREmpWageType = filter_input(INPUT_POST,'PREmpWageType',FILTER_SANITIZE_STRING);
        $PREmpWorkStatus = filter_input(INPUT_POST,'PREmpWorkStatus',FILTER_SANITIZE_STRING);

        $PREmpPOCPhone1 = $_POST['PREmpPOCPhone'];
        $PREmpPOCPhone1 = str_replace('"', "'", $PREmpPOCPhone1);
        $PREmpPOCPhone1 = str_replace("\\", "/", $PREmpPOCPhone1);
        $PREmpPOCPhone= filter_var($PREmpPOCPhone1,FILTER_SANITIZE_ENCODED);

        $PREmpPOCName1 = $_POST['PREmpPOCName'];
        $PREmpPOCName1 = str_replace('"', "'", $PREmpPOCName1);
        $PREmpPOCName1 = str_replace("\\", "/", $PREmpPOCName1);
        $PREmpPOCName= filter_var($PREmpPOCName1,FILTER_SANITIZE_ENCODED);

        $IsPREmpSelfEmployed = filter_input(INPUT_POST,'IsPREmpSelfEmployed',FILTER_SANITIZE_NUMBER_INT);



        $PREmpTermDate =$connection->getRightFormat($connection->sanitize($_POST['PREmpTermDate']));//DATE

        $PREmpTermNote1 = $_POST['PREmpTermNote'];
        $PREmpTermNote1 = str_replace('"', "'", $PREmpTermNote1);
        $PREmpTermNote1 = str_replace("\\", "/", $PREmpTermNote1);
        $PREmpTermNote= filter_var($PREmpTermNote1,FILTER_SANITIZE_ENCODED);

        $PREmpNotes1 = $_POST['PREmpNotes'];
        $PREmpNotes1 = str_replace('"', "'", $PREmpNotes1);
        $PREmpNotes1 = str_replace("\\", "/", $PREmpNotes1);
        $PREmpNotes= filter_var($PREmpNotes1,FILTER_SANITIZE_ENCODED);

        $sql = "INSERT INTO tblPREmployment (fkPlacementID, PREmployer, PREmpHireDate, PREmpHrsPerWeek, PREmpWageRate,
PREmpWageType, PREmpWorkStatus, PREmpPOCPhone, PREmpPOCName, IsPREmpSelfEmployed,
PREmpTermDate, PREmpTermNote, PREmpNotes) VALUES
('$fkPlacementID', '$PREmployer', '$PREmpHireDate', '$PREmpHrsPerWeek', '$PREmpWageRate',
'$PREmpWageType', '$PREmpWorkStatus', '$PREmpPOCPhone', '$PREmpPOCName', '$IsPREmpSelfEmployed',
'$PREmpTermDate', '$PREmpTermNote', '$PREmpNotes')";
    }
    else if ($tblType == "Military")//WORKS
    {
        $fkPlacementID = filter_input(INPUT_POST,'fkPlacementID',FILTER_SANITIZE_NUMBER_INT);
        $PRMilStatus= filter_input(INPUT_POST,'PRMilStatus',FILTER_SANITIZE_STRING);
        $PRMilAffiliation= filter_input(INPUT_POST,'PRMilAffiliation',FILTER_SANITIZE_STRING);
        $IsAGR= filter_input(INPUT_POST,'IsAGR',FILTER_SANITIZE_NUMBER_INT);

        $PRMilEnlistDate =$connection->getRightFormat($connection->sanitize($_POST['PRMilEnlistDate']));
        $PRMilDelayedEntryDate =$connection->getRightFormat($connection->sanitize($_POST['PRMilDelayedEntryDate']));
        $PRMilDischargeDate =$connection->getRightFormat($connection->sanitize($_POST['PRMilDischargeDate']));

        $PRMilNote1 = $_POST['PRMilNote'];
        $PRMilNote1 = str_replace('"', "'", $PRMilNote1);
        $PRMilNote1 = str_replace("\\", "/", $PRMilNote1);
        $PRMilNote= filter_var($PRMilNote1,FILTER_SANITIZE_ENCODED);

        $sql = "INSERT INTO tblPRMilitary (fkPlacementID, PRMilStatus, PRMilAffiliation, IsAGR, PRMilEnlistDate, PRMilDelayedEntryDate, PRMilDischargeDate, PRMilNote)
 VALUES ('$fkPlacementID', '$PRMilStatus', '$PRMilAffiliation', '$IsAGR', '$PRMilEnlistDate', '$PRMilDelayedEntryDate', '$PRMilDischargeDate', '$PRMilNote')";
    }
    else if ($tblType == "Misc")//WORKS
    {
        $fkPlacementID = filter_input(INPUT_POST,'fkPlacementID',FILTER_SANITIZE_NUMBER_INT);
        $PRMiscPlacementType = filter_input(INPUT_POST,'PRMiscPlacementType',FILTER_SANITIZE_STRING);
        $PRMiscStartDate =$connection->getRightFormat($connection->sanitize($_POST['PRMiscStartDate']));
        $PRMiscEndDate =$connection->getRightFormat($connection->sanitize($_POST['PRMiscEndDate']));
        $PRMiscHrs = filter_input(INPUT_POST,'PRMiscHrs',FILTER_SANITIZE_NUMBER_FLOAT);

        $PRMiscNote1 = $_POST['PRMiscNote'];
        $PRMiscNote1 = str_replace('"', "'", $PRMiscNote1);
        $PRMiscNote1 = str_replace("\\", "/", $PRMiscNote1);
        $PRMiscNote= filter_var($PRMiscNote1,FILTER_SANITIZE_ENCODED);

        $sql = "INSERT INTO tblPRMisc (fkPlacementID, PRMiscPlacementType, PRMiscStartDate, PRMiscEndDate, PRMiscHrs, PRMiscNote)
                  VALUES ('$fkPlacementID', '$PRMiscPlacementType', '$PRMiscStartDate', '$PRMiscEndDate', '$PRMiscHrs', '$PRMiscNote')";
    }

    $primaryValue  = $connection->createRecord($sql);
}
// if operation is update, query to update tblmentorcontacts
if ($op == 'UPDATE') {
    if (isset($_POST[$primaryKey])) {
        $primaryValue=filter_input(INPUT_POST, $primaryKey);
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
                    $fieldName1 = $_POST[$fieldName];
                    $fieldName1 = str_replace('"', "'", $fieldName1);
                    $fieldName1 = str_replace("\\", "/", $fieldName1);
                    $fieldValue = filter_var($fieldName1,FILTER_SANITIZE_ENCODED);

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
