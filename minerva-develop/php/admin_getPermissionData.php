<?php 
/**
 * PHP script to get the data necessary to populate the view for the manage
 * permissions module. Note that this script is only to GET the data, but none
 * of the data is specific to any user. This is to keep the application secure.
 *
 * Created by: Zachary Ross
 */

require_once('dbcontroller.php');
$db = new DBController();

session_start();
$fkSiteId = $_SESSION['SiteID'];

// TODO: Make sure this page can't be accessed if the user is not admin or they
// don't have the permissions

// Query strings for the db
$user_query = "SELECT UserLoginName FROM tblUsers WHERE fkSiteId=$fkSiteId";
$users = $db->runSelectQueryArray($user_query);

$permissions_query = "SELECT * FROM tlkpPermissions";
$permissions = $db->runSelectQueryArray($permissions_query);

// Return the data
$data = json_encode([ "users" => $users, "permissions" => $permissions]);
echo $data;

?>
