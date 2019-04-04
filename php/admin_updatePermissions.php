<?php 
/* 
 *
 */

require 'dbcontroller.php';
$db = new DBController();

// Constants used as keys in requests
$USERID_KEY = 'UserId';
$ADDPERMISSIONS_KEY = 'AddPermissions';
$REMOVEPERMISSIONS_KEY = 'RemovePermissions';

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    // For GET requests, the user will be passing in the UserId for the user
    // selected to manage permissions. Since this is the case, we will return
    // all of the permissions that this user has.
    if(isset($_GET[$USERID_KEY])) {
        $user_id = $_GET[$USERID_KEY];
        $permissions_query = "SELECT * FROM tblUserPermissions WHERE fkUserID='$user_id'";
        $permissions = $db->runSelectQueryArray($permissions_query);
        echo $db->makeObject(["permissions" => json_encode($permissions)], "permissions");
    } 
} elseif($_SERVER['REQUEST_METHOD'] === 'POST') {
    // For POST requests, the user will be passing in a UserId, a list of
    // permissions that need to be added (AddPermissions), and a list of
    // permissions that should be removed (RemovePermissions).     
    if(!isset($_POST[$USERID_KEY])) {
        echo "{ 'error': 'A user must be selected before permissions can be changed.' }";
    } else {
        $user_id = $_POST[$USERID_KEY];
        echo "User Id: $user_id\n";
        if(isset($_POST[$ADDPERMISSIONS_KEY])) {
            $add_permissions = json_decode($_POST[$ADDPERMISSIONS_KEY]);
            $values_str = "";
            foreach($add_permissions as $index => $permission_id) {
                if($index != 0) {
                    $values_str = $values_str . ", ";
                }
                $values_str = $values_str . "($user_id, $permission_id)";
            }
            $insert_query = "INSERT INTO tblUserPermissions (fkUserID, fkPermissionId) VALUES $values_str";
            $db->createRecord($insert_query);
        }
        if(isset($_POST[$REMOVEPERMISSIONS_KEY])) {
            $remove_permissions = json_decode($_POST[$REMOVEPERMISSIONS_KEY]);
            $values_str = "(".implode(', ', $remove_permissions).")";
            $delete_query = "DELETE FROM tblUserPermissions WHERE fkUserId=$user_id AND fkPermissionId IN $values_str";
            $db->runDeleteQuery($delete_query);
        }
    }
}

?>
