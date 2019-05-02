
//File: site-viewcadets.controller.js
//This code is the controller for the viewcadets main view: viewcadets.view.html
//This code uses viewcadets.view.html, site-viewcadets.php,
'use strict';
angular.module('admin.siteViewCadets',['angularUtils.directives.dirPagination']).controller('viewCadets', function($scope, $http, $window) {
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

    $scope.addSeltoGrads = function()
    {

        var toGrad = [];
        var n=0;
        for(var i = 0; i<$scope.cadets.length; i++)
        {
            var elem = document.getElementById($scope.cadets[i].fkCadetID);
            if(elem != undefined && elem.checked)
            {
                toGrad.push({
                    "PersonFN": $scope.cadets[i].PersonFN, 
                    "PersonLN": $scope.cadets[i].PersonLN, 
                    "fkClassID": $scope.cadets[i].fkClassID, 
                    "CadetRosterNumber": $scope.cadets[i].CadetRosterNumber,
                    "fkCadetID": $scope.cadets[i].fkCadetID,
                    "cadetStatus": "Graduated" 
                });
                n = n+1;
            }
        }
        if (n<1)
            alert("No Cadetss Selected!"); // respond to no cadets selected
        else
        {
            console.log(toGrad);
            addToGrads(toGrad); // pass to main add function
        }
    }

    $scope.addCadetToGrad = function(fkCadetID) {
        var i = 0;
        var toGrad = [];

        while (i < $scope.cadets.length) {
            if ($scope.cadets[i].fkCadetID == fkCadetID) {
                console.log($scope.cadets[i]);
                toGrad[0] = {
                    "PersonFN": $scope.cadets[i].PersonFN,
                    "PersonLN": $scope.cadets[i].PersonLN,
                    "fkClassID": $scope.cadets[i].fkClassID,
                    "CadetRosterNumber": $scope.cadets[i].CadetRosterNumber,
                    "fkCadetID": $scope.cadets[i].fkCadetID,
                    "cadetStatus": "Graduated"
                };
            }
            i = i + 1;
        }

        if (!(null == toGrad)) {
            console.log(toGrad);
            addToGrads(toGrad);
        } else
            alert("Controller Error!");

    }

    function addToGrads(toGradAry) {
        var cadetIds = toGradAry;
        console.log(cadetIds);
        for (var i = 0; i < cadetIds.length; i++) {
            var params = cadetIds[i];
            $http({
                method: 'POST',
                url: './php/admin_cadetGraduateChange.php',
                data: Object.toparams(params),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {
                $scope.loadCadetsIntoView();
            }, function (error) {
                alert(error);
            });
        }
    }

});

/*$scope.update = function(id){
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
                alert(response.data);
                $scope.loadCadetsIntoView();
            }, function(error) {
                alert(error);
            });
        }

    };
});
*/



