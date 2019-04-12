<?php 
/**
 * PHP script for retrieving the form options used in the various drop down
 * menus for cadet creation. Associated with the file
 * admin/add-cadet/add-cadet.view.html
 *
 * Created by: Zachary Ross
 */

require_once 'dbcontroller.php';
$db = new DBController();

$urbanization_query = "SELECT * FROM tlkpUrbanization;";
$state_query = "SELECT StateID, StateName FROM tlkpState;";
$salutation_query = "SELECT * FROM tlkpSalutation;";
$region_query = "SELECT * FROM tlkpRegion;";
$race_query = "SELECT RaceID, Race FROM tlkpRace WHERE IsActiveRace=1;";
$genqual_query = "SELECT * FROM tlkpGenQual;";

$urbanization = $db->runSelectQueryArrayNotEncoded($urbanization_query);
$state = $db->runSelectQueryArrayNotEncoded($state_query);
$salutation = $db->runSelectQueryArrayNotEncoded($salutation_query);
$region = $db->runSelectQueryArrayNotEncoded($region_query);
$race = $db->runSelectQueryArrayNotEncoded($race_query);
$genqual = $db->runSelectQueryArrayNotEncoded($genqual_query);

$result_arr = array( 
    "urbanization" => $urbanization,
    "state" => $state,
    "salutation" => $salutation,
    "region" => $region,
    "race" => $race,
    "genqual" => $genqual
);

echo json_encode($result_arr);

?>
