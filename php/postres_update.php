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

    unset($_POST['tbl']);
}

// check for operation set from controller
if (isset($_POST['op'])) {
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}

if ($op == 'ADD') {

    $fkPlacementID = filter_input(INPUT_POST, "fkPlacementID");
    $PRReportType = filter_input(INPUT_POST, "PRReportType");
    $PRReporterCategory = filter_input(INPUT_POST, "PRReporterCategory");
    $PRReportDate = filter_input(INPUT_POST, "PRReportDate");
    $PRReporterID = filter_input(INPUT_POST, "PRReporterID");
    $WasContactMade = filter_input(INPUT_POST, "WasContactMade");
    $WasMentorInvolved = filter_input(INPUT_POST, "WasMentorInvolved");
    $PRReportNote = filter_input(INPUT_POST, "PRReportNote");


    $sql = "INSERT INTO $tbl 
            ( fkPlacementID,
            PRReportType,
            PRReporterCategory,
            PRReportDate,
            PRReporterID,
            WasContactMade,
            WasMentorInvolved,
            PRReportNote)
             VALUES (
             '$fkPlacementID',
            '$PRReportType',
            '$PRReporterCategory',
            '$PRReportDate',
            '$PRReporterID',
            '$WasContactMade',
            '$WasMentorInvolved',
            '$PRReportNote'
             )";
    $primaryValue  = $connection->createRecord($sql);


}
// if operation is update, query to update tblmentorcontacts
if ($op == 'UPDATE') {
    if (isset($_POST[$primaryKey])) {
        $primaryValue = filter_input(INPUT_POST, $primaryKey);
        unset($_POST[$primaryKey]);
    }
        //Get all the column names in the tblMentorContacts table
        $sql = "SELECT * FROM $tbl  WHERE  $primaryKey = $primaryValue";
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
    $sql = " DELETE FROM $tbl WHERE $primaryKey= '$primaryValue'";

    $result = $connection->runDeleteQuery($sql);
}

?>
