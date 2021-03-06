//File: site-viewgraduates.controller.js
//This code is the controller for the viewgraduates main view: viewgraduates.view.html
//This code uses viewgraduates.view.html, site-viewgraduates.php,
'use strict';
angular.module('admin.siteViewGraduates').controller('viewGraduates',  function($scope, $http, $window) {
    //request data from server
    
    $scope.loadGraduatesIntoView = function() {
        $http({
            method: 'POST',
            url: './php/site-viewgraduates.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            $scope.graduates = response.data.cadetTable;
        });
    }

    $scope.loadGraduatesIntoView();

    $scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }
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
    $scope.update = function(id){
        var cadetStatus = (document).getElementById(id+"").value;
        if(cadetStatus == "Graduate")
        {
            alert("Graduate is already Graduate");
        }
        else
        {
            var params = {"fkCadetID":id ,"cadetStatus": "Enrolled"};

            console.log(params);
            $http({
                method: 'POST',
                url: './php/admin_cadetGraduateChange.php',
                data: Object.toparams(params),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {
                console.log(response);
                alert(response.data);
                $scope.loadGraduatesIntoView();
            });
    }
        
    };
});
