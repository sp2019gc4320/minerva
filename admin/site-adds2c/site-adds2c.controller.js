//File: site-viewcadets.controller.js
//This code is the controller for the viewcadets main view: viewcadets.view.html
//This code uses viewcadets.view.html, site-viewcadets.php,
'use strict';
angular.module('admin.siteViewS2C',['angularUtils.directives.dirPagination']).controller('viewS2C', function($scope, $http, $window)
{
    $http({
        method: 'POST',
        url: './php/site-views2c.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
        console.log(response.data);
        $scope.s2c = response.data.s2cTable;
    });

    $scope.editable = false;

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});


