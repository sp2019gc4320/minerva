<?php
// File: createRanks.php
// Pulls info for JBRanks from the database
// Prints JSON array
// Needs CadetID 

//connect to db controller
require_once 'dbcontroller.php';

//create connection
$conn = new DBController();

//set everything to empty string
$RankPromotionNote= "";
$RankDidFail="0";
$fkClassDetailID="";
$JBRank="";
$RankObtainedDateDate="";

//then if isset to something, reset to the value passed in
if (isset($_POST['RankPromotionNote'])) {
    $RankPromotionNote= $_POST['RankPromotionNote'];
}
if (isset($_POST['RankDidFail'])) {
    $RankDidFail= $_POST['RankDidFail'];
}
if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID= $_POST['fkClassDetailID'];
}
if (isset($_POST['JBRank'])) {
    $JBRank= $_POST['JBRank'];
}
if (isset($_POST['RankObtainedDate'])) {
    $RankObtainedDate= $_POST['RankObtainedDate'];
}

$sql = "INSERT INTO tblJBRanks(fkClassDetailID,JBRank,RankObtainedDate,RankPromotionNote,RankDidFail)
values('$fkClassDetailID', '$JBRank', '$RankObtainedDate', '$RankPromotionNote', '$RankDidFail')";

$result = $conn->createRecord($sql);
?>