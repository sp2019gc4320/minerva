<?php 
/* 
 *
 */

require 'dbcontroller.php';
$db = new DBController();

// Constants used as keys in requests
$USERID_KEY = 'user';
$ADDPERMISSIONS_KEY = 'AddPermissions';
$REMOVEPERMISSIONS_KEY = 'RemovePermissions';

if($_SERVER['REQUEST_METHOD'] === 'POST') {

    // For POST requests, the user will be passing in a UserId, a list of
    // permissions that need to be added (AddPermissions), and a list of
    // permissions that should be removed (RemovePermissions).     
    if(!isset($_POST[$USERID_KEY])) { 
        echo "{ 'error': 'A user must be selected before permissions can be changed.' }";
    } else {
        $user_id = $_POST[$USERID_KEY];
        echo "User Id: $user_id\n";
        if(isset($_POST[$ADDPERMISSIONS_KEY])) {

            // Parameters in an array form are sent as comma separated items, so
            // we need to explode them into an array
            $add_permissions = explode(",", $_POST[$ADDPERMISSIONS_KEY]);
            $values_str = "";

            // Add all the parameters to the array. Do this with for each
            // because we need to format the strings before they are inserted.
            foreach($add_permissions as $index => $permission_id) {
                if($index != 0) {
                    $values_str = $values_str . ", ";
                }
                $values_str = $values_str . "(\"$user_id\", \"$permission_id\")";
            }

            $insert_query = "INSERT INTO tblUserPermissions (fkUserID, fkPermissionId) VALUES $values_str";
            $db->createRecord($insert_query);
        }
        if(isset($_POST[$REMOVEPERMISSIONS_KEY])) {

            // Parameters in an array form are sent as comma separated items, so
            // we need to explode them into an array
            $remove_permissions = explode(",", $_POST[$REMOVEPERMISSIONS_KEY]);
            $values_str = "(\"".implode('", "', $remove_permissions)."\")";
            $delete_query = "DELETE FROM tblUserPermissions WHERE fkUserId='$user_id' AND fkPermissionId IN $values_str";
            $db->runDeleteQuery($delete_query);
        }
    }
}

?>
