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
$RankObtainedDate= $_POST['RankObtainedDate'];
$RankPromotionNote= $_POST['RankPromotionNote'];
$RankDidFail= $_POST['RankDidFail'];



$sql = "INSERT INTO tblJBRanks(fkClassDetailID,JBRank,RankObtainedDate,RankPromotionNote,RankDidFail)
values('$fkClassDetailID', '$JBRank', '$RankObtainedDate', '$RankPromotionNote', '$RankDidFail')";

$result = $conn->createRecord($sql);

//$connection->close();
?>