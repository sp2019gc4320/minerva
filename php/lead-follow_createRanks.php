<?php
// File: createRanks.php
// Pulls info for JBRanks from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

$fkClassDetailID = $_POST['fkClassDetailID'];
$JBRank= $_POST['JBRank'];
//Date Validation added 2/27
$validRankDate = strtotime($_POST['RankObtainedDate']);
$validRankDate = date('Y-m-d', $validRankDate);//off by one (gets fixed when retrieving in the js)
$RankObtainedDate = $validRankDate;

$RankPromotionNote= $_POST['RankPromotionNote'];
$RankDidFail= $_POST['RankDidFail'];



$sql = "INSERT INTO tblJBRanks(fkClassDetailID,JBRank,RankObtainedDate,RankPromotionNote,RankDidFail)
values('$fkClassDetailID', '$JBRank', '$RankObtainedDate', '$RankPromotionNote', '$RankDidFail')";

$result = $conn->createRecord($sql);

//$connection->close();
?>