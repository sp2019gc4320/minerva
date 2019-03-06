//find-cadet.component.js
'use strict';

angular.module('utility.findCadet'). component('findCadet', {
    //the url is relative to the index.html,
    templateUrl: 'utility/find-cadet/find-cadet.view.html',
    controller:
        ['$scope','$http','$window',
            function FindCadetController ($scope, $http, $window) {
                $http({
                    method: 'POST',
                    url: './php/findCadets.php',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {
                    $scope.cadets = response.data.data;
                });

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
                    //EDIT
                    $window.localStorage.setItem("CadetGender",cadet.PGender);
                    $window.localStorage.setItem("CadetDOB",cadet.PDOB);

                    $scope.myCadet = {fkCadetID: cadet.fkCadetID};
                    $http({
                        method: 'POST',
                        url: './php/getCadetViewData.php',
                        data: Object.toparams($scope.myCadet),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function (response) {
                            var cadet = response.data.data;

                            $scope.updateDisplay = "./main/find-cadet/cadet-helper.view.html" + "?updated=" + Date.now();
                        }
                    );
                }
            }
    ]
});