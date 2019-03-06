//find-cadet.controller.js
'use strict';

angular.module('findApp').
    controller( "FindCadetController", function ($scope, $http, $window) {
                $http({
                    method: 'POST',
                    url: '../../php/findCadets.php',
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
                    //EDIT set items were added for PGender and PDOB in order to set the gender and the dob of the cadet
                    $window.localStorage.setItem("CadetGender",cadet.PGender);
                    $window.localStorage.setItem("CadetDOB",cadet.PDOB);

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
