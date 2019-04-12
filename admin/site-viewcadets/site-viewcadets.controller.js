//File: site-viewcadets.controller.js
//This code is the controller for the viewcadets main view: viewcadets.view.html
//This code uses viewcadets.view.html, site-viewcadets.php,
'use strict';
angular.module('admin.siteViewCadets').controller('viewCadets', function($scope, $http, $window){
    $http({
        method: 'POST',
        url: './php/site-viewcadets.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
        console.log(response.data);
        $scope.cadets = response.data.cadetTable;
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
    $scope.update = function()
    {
        //copy first row of table
        $scope.show=true;
        for (var j=0; j<$scope.tasks.length; j++)
        {
            $scope.numSaved=0;
            var sendData=angular.copy($scope.tasks[j]);//date comes in as date w time

            if(sendData.EventDate!==null) {//IF A DATE IS ENTERED
                sendData.EventDate = convertToSqlDate(sendData.EventDate);

                if($scope.tasks[j].DidPass==="1")
                {
                    $scope.tasks[j].PF="Pass";
                }
                else {
                    $scope.tasks[j].PF = "Fail";
                    $scope.show=false;
                }

                delete sendData.Task;
                delete sendData.TaskNumber;
            }
            else{//IF NO DATE ENTERED
                $scope.tasks[j].dateNoTime ="None";
                sendData.EventDate="";
                sendData.DidPass="0";
                $scope.tasks[j].PF="Fail";
                $scope.show=false;
            }
            $http ({
                method: 'POST',
                url: './php/site-viewcadets.php',

                
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {
                    if(response.data) {

                        //this only needs to be saved once all changes are saved.
                        $scope.numSaved++;
                        if($scope.numSaved == $scope.tasks.length)
                            alert("Changes Saved.");
                    }
                    //location.reload(true);
                },function(result){
                    alert("Failed");
                });
        }
        $scope.editable = false;
    };
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

});


