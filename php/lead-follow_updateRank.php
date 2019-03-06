<?php
// File: updateRank.php
// Updates rank entries
// Prints JSON array

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();


$op = 'UPDATE';
$JBRankID = $_POST['JBRankID'];


if (isset($_POST['JBRankID'])) {
    $JBRankID = filter_input(INPUT_POST, "JBRankID");
    unset($_POST['JBRankID']);
}

if (isset($_POST['op'])) {
    $op = filter_input(INPUT_POST, "op");
    unset($_POST['op']);
}


if($op=='UPDATE') {

    $validRankDate = strtotime($_POST['RankObtainedDate']);
    $validRankDate = date('Y-m-d', $validRankDate);//off by one (gets fixed when retrieving in the js)
    $RankObtainedDate = $validRankDate;

    $RankPromotionNote= $_POST['RankPromotionNote'];
    $RankDidFail= $_POST['RankDidFail'];

    $sql = "UPDATE tblJBRanks
SET
  RankObtainedDate = '$RankObtainedDate',
  RankPromotionNote = '$RankPromotionNote',
  RankDidFail = '$RankDidFail'
WHERE
  JBRankID = '$JBRankID'";

    $result = $conn->runQuery($sql);
    if ($result === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: $sql";
    }
}
else if($op == 'DELETE')
{
    $sql = " DELETE FROM tblJBRanks
               WHERE  JBRankID=$JBRankID
             ";
    $result = $conn->runDeleteQuery($sql);

    print_r($sql);

    if ($result === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: $sql";
    }
}

//$connection->close();
?>