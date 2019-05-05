'use strict';
// TODO: Data validation
angular.module('admin.siteAddClass').controller('addClassController', function ($scope, $http, $window) {

    $http({
        method: 'GET',
        url: "./php/admin_getClassLookups.php",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(
        function(response)
        {
            console.log(response.data);
            $scope.classPhases = response.data;

        },function(result){
        }
    );

    $scope.submit = function() {
        $http({
            method: 'POST',
            url: "./php/admin_addClass.php",
            data: $("#adminClassForm").serialize(),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(response)
            {
                alert("Classes added successfully!");
            },function(result){
                alert("Error adding class. Please check the formatting for your inputs.");
            }
        );
    }

});
