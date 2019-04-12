'use strict'

// TODO: Make sure that the user accessing this page has the permissions to be
// acessing this page. 

angular.module('admin.siteManagePermissions').controller('managePermissionsController', function($scope, $http, $window) {

    // Data structure for holding the differents subsets of permissions
    // available to each user
    class PermissionSet {
        constructor(name, permissionNames, permissionList) {
            this.name = name;

            // Only allow the permissions for the given subset into this set.
            // This works as an intersection with the permissionList and
            // permissionNames. The reason we don't just store permissionNames
            // into this.permissions is because permissionList contains Objects
            // from the database, so if these objects were to change then this
            // functionality would still work.
            this.permissions = permissionList
                .filter(permission => permissionNames.includes(permission.PermissionName));
        }
    }

    // Variables

    // Holds the permissions being added by the admin
    $scope.addPermissions = new Set();

    // Holds the permissions being removed by the admin
    $scope.removePermissions = new Set();

    // Get the user and permission data to populate the fields
    $http({
        method: "GET",
        url: "./php/admin_getPermissionData.php",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response) {
        const data = response.data;
        $scope.users = data.users;
        $scope.setUpPermissionSets(data.permissions);
    }, function(error) {
        // Handle errors
        console.log(error);
    });

    /*
     * Given the set of permissions retrieved from the database, this function
     * divides the permissions into subsets of permissions that fall into
     * different categories. When permissions are added in the future, this is
     * the function that should be updated in order for those permissions to be
     * shown on the page.
     *
     * - Parameter permissions: The array or permissions retrieved from the
     *   database to be divided into subsets
     */
    $scope.setUpPermissionSets = function(permissions) {
        var adminPermissions = ["Manage Permissions"]
        var selectionCommitteePermissions = ["Review Applications"]
        $scope.permissionSets = [
            new PermissionSet("ADMIN", adminPermissions, permissions),
            new PermissionSet("SELECTION COMMITTEE", selectionCommitteePermissions, permissions),
        ];
    }

    /* 
     * Goes through all of the checkboxes on the managePErmissions pages and
     * sets them to the values consistent with their permissions. This is called
     * whenenver the user is changed, since each user has different permissions.
     */
    $scope.updatePermissionCheckboxes = function() {
        for(var i = 0; i < $scope.permissionSets.length; i++) {
            var permissionSet = $scope.permissionSets[i];
            for(var j = 0; j < permissionSet.permissions.length; j++) {
                var permission = permissionSet.permissions[j];
                permission.enabled = $scope.enabledPermissions !== undefined
                    && $scope.enabledPermissions.includes(permission.PermissionName);
            }
        }
    }

    /*
     * Given a user object from the databse, retrieves a list of all the
     * permissions that this user has. 
     * 
     * It might be useful in the future to make this more globalized, since
     * permissions will be a security feature throughout the website and this
     * can be used to store this information for the user. Note: Do NOT store
     * these permissions in localStorage. local storage is editable, so someone
     * could very easily give themselves priveleges that way if things aren't
     * being handled correctly. 
     *
     * - Parameter u: The user object to retrieve permissions for
     */
    $scope.getPermissionsForUser = function(u) {
        $http({
            method: "POST",
            url: "./php/getUserPermissions.php",
            data: Object.toparams({"user" : u.UserLoginName}),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function(response) {
            var objectData = response.data;
            $scope.enabledPermissions = objectData.map(item => item.PermissionName)
            $scope.updatePermissionCheckboxes();
        }, function(error) {
            // Handle errors
            console.log(error);
        });
    }

    /*
     * An On Change event for the user select at the top of the view
     */
    $scope.onChangeUser = function() {
        $scope.getPermissionsForUser($scope.selectedUser);
    }

    /*
     * Function to add and remove permissions from a list of permissions to be
     * sent to the database.
     *
     * - Parameter permission: The permission to be added or removed from the
     *   database. Whether it is being added or removed is based on whether or
     *   not its checkbox is enabled.
     */
    $scope.togglePermission = function(permission) {
        if(permission.enabled) {
            $scope.removePermissions.delete(permission.PermissionName);
            $scope.addPermissions.add(permission.PermissionName);
        } else {
            $scope.addPermissions.delete(permission.PermissionName);
            $scope.removePermissions.add(permission.PermissionName);
        }
    }

    /*
     * Function that sends all of the adding and removing information to the
     * database.
     */
    $scope.updatePermissionsInDatabase = function() {
        var updateObject = {
            "user" : $scope.selectedUser.UserLoginName,
        }
        if($scope.addPermissions.size != 0) {
            updateObject.AddPermissions = Array.from($scope.addPermissions)
        }
        if($scope.removePermissions.size != 0) {
            updateObject.RemovePermissions = Array.from($scope.removePermissions)
        }
        $http({
            method: "POST",
            url: "./php/admin_updatePermissions.php",
            data: Object.toparams(updateObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function(response) {
            alert("Permissions saved!");
        }, function(error) {
            alert("Error saving permissions. Check the log for details");
            console.log(error);
        });
    
    }


});
