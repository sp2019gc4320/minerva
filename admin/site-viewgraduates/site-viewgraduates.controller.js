//File: site-viewgraduates.controller.js
//This code is the controller for the viewgraduates main view: viewgraduates.view.html
//This code uses viewgraduates.view.html, site-viewgraduates.php,
'use strict';
angular.module('admin.siteViewGraduates').controller('viewGraduates',  function($scope, $http, $window) {
        //request data from server
        $http({
            method: 'POST',
            url: './php/site-viewgraduates.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            $scope.graduates = response.data.data;
        });
});
