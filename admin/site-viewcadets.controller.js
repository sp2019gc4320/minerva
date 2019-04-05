//File: site-viewcadets.controller.js
//This code is the controller for the viewcadets main view: viewcadets.view.html
//This code uses viewcadets.view.html, site-viewcadets.php,
'use strict';
angular.module('admin.siteViewCadets').component('viewCadets',{
    //the url is relative to the index.html
    templateUrl:'admin/site-viewCadets/site-viewCadets.view.html',
    controller: function(){
        // $scope.viewCadet = function viewCadet() {

        //request data from server
         $http({
            method: 'POST',
            url: '../../php/site-viewcadets.php',
            //data: Object.toparams(cadetSearch),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            $scope.cadets = response.data.data;
        });

    }
});
//};