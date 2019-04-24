'use strict';
angular.module('admin.siteViewApplicants', ['angularUtils.directives.dirPagination']).controller('viewApplicants', function($scope, $http, $window) {
    $http({
        method: 'POST',
        url: './php/admin_getApplicantList.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
        console.log(response.data);
        $scope.applicants = response.data.applicantTable;
    });

    //give the "print current roster" button functionality
    $scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWindow.document.open();
        popupWindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWindow.document.close();
    }


    $scope.editable = false;
    $scope.cancelUpdate = function() {
        $scope.editable = false;
        $scope.cadets = angular.copy($scope.cadetsBackup);
    };
    $scope.edit = function() {
        $scope.editable = true;
        $scope.show=false;

        //backup data
        $scope.cadetsBackup = angular.copy($scope.cadets);
    };
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});
