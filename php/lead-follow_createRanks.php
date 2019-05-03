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
    $RankPromotionNote1=$_POST['RankPromotionNote'];
    $RankPromotionNote1=str_replace('"', "'", $RankPromotionNote1);
    $RankPromotionNote1=str_replace("\\", "/", $RankPromotionNote1);
    $RankPromotionNote=filter_var($RankPromotionNote1, FILTER_SANITIZE_ENCODED);
}
if (isset($_POST['RankDidFail'])) {
    $RankDidFail= $conn->sanitize($_POST['RankDidFail']);
}
if (isset($_POST['fkClassDetailID'])) {
    $fkClassDetailID= filter_input(INPUT_POST, "fkClassDetailID", FILTER_SANITIZE_NUMBER_INT);
}
if (isset($_POST['JBRank'])) {
    $JBRank= filter_input(INPUT_POST, "JBRank", FILTER_SANITIZE_STRING);
}
if (isset($_POST['RankObtainedDate'])) {
    $RankObtainedDate= $conn->getRightFormat($conn->sanitize($_POST['RankObtainedDate']));
}

$sql = "INSERT INTO tblJBRanks(fkClassDetailID,JBRank,RankObtainedDate,RankPromotionNote,RankDidFail)
values('$fkClassDetailID', '$JBRank', '$RankObtainedDate', '$RankPromotionNote', '$RankDidFail')";

$result = $conn->createRecord($sql);
?>