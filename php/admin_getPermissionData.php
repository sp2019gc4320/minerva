<? php 
/**
 * PHP script to get the data necessary to populate the view for the manage
 * permissions module. Note that this script is only to GET the data, but none
 * of the data is specific to any user. This is to keep the application secure.
 *
 * Created by: Zachary Ross
 */

require 'dbcontroller.php'
$db = new DBController();

// Query strings for the db
$user_query = "SELECT fkUserLoginName FROM tblUsers";
$permissions_query = "SELECT * FROM tlkpPermissions";

// Run the queries
$users = $db->runSelectQueryArray($user_query);
$permissions = $db->runSelectQueryArray($permissions_query);

// Return the data
$data = $db->makeObject([
    "users" => json_encode($users), 
    "permissions" => json_encode($permissions)
], "users, permissions");
echo $data;

?>
