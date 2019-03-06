<?php
// File: updateRank.php
// Updates rank entries
// Prints JSON array

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$JBRankID = $_POST['JBRankID']; 
$RankObtainedDate = $_POST['RankObtainedDate'];
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
//$connection->close();
?>