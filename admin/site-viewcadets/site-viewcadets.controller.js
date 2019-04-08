//File: site-viewcadets.controller.js
//This code is the controller for the viewcadets main view: viewcadets.view.html
//This code uses viewcadets.view.html, site-viewcadets.php,
'use strict';
angular.module('admin.siteViewCadets').controller('viewCadets', function($scope, $http, $window){
        // $scope.viewCadet = function viewCadet() {

        //request data from server
         $http({
            method: 'POST',
            url: './php/site-viewcadets.php',
            //data: Object.toparams(cadetSearch),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            console.log(response.data);
            $scope.cadets = response.data.cadetTable;
        });
});
//};
