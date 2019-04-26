<?php 

require_once("dbcontroller.php");
$db = new DBController();

// Tables
$permissionsTable = "tblUserPermissions";
$lookupPermissionsTable = "tlkpPermissions";

// Keys
$permissionUserId = "fkUserId";
$permissionId = "fkPermissionId";
$lookupPermissionName = "PermissionName";
$userKey = "user";

if(isset($_POST[$userKey])) {
    $user = $_POST[$userKey];
    $query = "SELECT $permissionsTable.$permissionId FROM $permissionsTable WHERE $permissionsTable.$permissionUserId='$user'";
    $result = $db->runSelectQueryArray($query);
    echo json_encode($result);
}

?>
