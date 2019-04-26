//File: site-viewcadets.controller.js
//This code is the controller for the viewcadets main view: viewcadets.view.html
//This code uses viewcadets.view.html, site-viewcadets.php,
'use strict';
angular.module('admin.siteViewCadets',['angularUtils.directives.dirPagination']).controller('viewCadets', function($scope, $http, $window)
{
    $scope.loadCadetsIntoView = function() {
        $http({
            method: 'POST',
            url: './php/site-viewcadets.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            console.log(response.data);
            $scope.cadets = response.data.cadetTable;
        });
    }

    $scope.loadCadetsIntoView();

    //give the "print current roster" button functionality
    $scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWindow.document.open();
        popupWindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWindow.document.close();
    }

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.update = function(id){
        var cadetStatus = (document).getElementById(id+"").value;
        if(cadetStatus == "Cadet")
        {
            alert("Cadet is already Cadet");
        }
        else
        {
            var params = {"fkCadetID":id ,"cadetStatus":cadetStatus};

            console.log(params);
            $http({
                method: 'POST',
                url: './php/admin_cadetGraduateChange.php',
                data: Object.toparams(params),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {
                console.log(response);
                $scope.loadCadetsIntoView();
            });
    }
        
    };
});


