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
    $scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }
});
