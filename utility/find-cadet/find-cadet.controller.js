//find-cadet.controller.js
'use strict';

angular.module('findApp').
    controller( "FindCadetController", function ($scope, $http, $window) {

        // List of cadets picked on the Find Cadet View. This is instead of a
        // dictionary so that an order on when things are picked can be
        // maintained.
        $scope.pickedCadets = [];

        // Keeps track of which of the cadets have been checked
        $scope.checkedCadets = {};


        $http({
            method: 'POST',
            url: '../../php/findCadets.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            $scope.cadets = response.data.data;
        });


        /**
         * Serves as a toggle for the checkboxes on the Find Cadet View. When
         * the checkbox for a cadet is checked, the respective cadet is added to
         * the list of `pickedCadets`. When the checkbox is unchecked, the cadet
         * is removed.
         *
         * - Parameters:
         *   - cadet: The cadet being either added or removed from the list of
         *   `pickedCadets`.
         */
        $scope.selectCadet = function(cadet) {
            if(!$scope.checkedCadets[cadet.fkCadetID]) {
                var index = $scope.pickedCadets.indexOf(cadet);
                if(index >= 0) {
                    $scope.pickedCadets.splice(index, 1);
                }
            } else {
                $scope.pickedCadets.push(cadet);
            }
        };

        $scope.saveAndClose = function() {
            var cadetJSON = JSON.stringify($scope.pickedCadets);
            $window.sessionStorage.setItem("cadets", cadetJSON);
            $window.localStorage.setItem("cadets", cadetJSON);
            $window.opener.location.reload();
            $window.close();

        };

        $scope.pickCadet = function (cadet) {
            //Storing fkCadetID to be used by another view
            //CLEAN UP -- only needs to store CadetID to localStorage
            $window.sessionStorage.setItem("fkCadetID", cadet.fkCadetID);
            $window.localStorage.setItem("fkCadetID", cadet.fkCadetID);
            $window.sessionStorage.setItem("CadetID", cadet.fkCadetID);
            $window.sessionStorage.setItem("theCadet", cadet.fkCadetID);
            $window.localStorage.setItem("theCadet", cadet.fkCadetID);



            $window.localStorage.setItem("CadetID", cadet.fkCadetID);
            $window.localStorage.setItem("CadetName", cadet.PersonFN + " " + cadet.PersonLN);

            $scope.myCadet = {fkCadetID: cadet.fkCadetID};
            $http({
                method: 'POST',
                url: '../../php/getCadetViewData.php',
                data: Object.toparams($scope.myCadet),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {
                var cadet = response.data.data;

                $scope.updateDisplay = "./cadet-helper.view.html" + "?updated=" + Date.now();
            }
            );
        }
    });

