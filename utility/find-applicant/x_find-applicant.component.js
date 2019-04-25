//find-applicant.component.js
'use strict';

angular.module('utility.findApplicant').component('findApplicant', {
    //the url is relative to the index.html,
    templateUrl: 'utility/find-applicant/find-applicant.view.html',
    controller:
        ['$scope','$http','$window',
            function FindApplicantController ($scope, $http, $window) {
                $http({
                    method: 'POST',
                    url: './php/findApplicants.php',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {
                    $scope.applicants = response.data.data;
                });

                $scope.pickApplicant = function (applicant) {
                    //Storing ApplicantID to be used by another view
                    //CLEAN UP -- only needs to store ApplicantID to localStorage
                    $window.sessionStorage.setItem("ApplicantID", applicant.ApplicantID);
                    $window.localStorage.setItem("ApplicantID", applicant.ApplicantID);
                    $window.sessionStorage.setItem("ApplicantID", applicant.ApplicantID);
                    $window.sessionStorage.setItem("theApplicant", applicant.ApplicantID);
                    $window.localStorage.setItem("theApplicant", applicant.ApplicantID);
                    $window.localStorage.setItem("ApplicantID", applicant.ApplicantID);
                    $window.localStorage.setItem("ApplicantName", applicant.PersonFN + " " + applicant.PersonLN);

                    $scope.myApplicant = {ApplicantID: applicant.ApplicantID};
                    $http({
                        method: 'POST',
                        url: './php/getApplicantViewData.php',
                        data: Object.toparams($scope.myApplicant),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function (response) {
                            var applicant = response.data.data;

                            $scope.updateDisplay = "./main/find-applicant/applicant-helper.view.html" + "?updated=" + Date.now();
                        }
                    );
                }
            }
    ]
});