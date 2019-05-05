//Applicant-helper.controller.js This is the file that will show Applicant's picture
'use strict';

angular.module('findApp').controller("showApplicantViewController", function($scope, $http, $window){

    $scope.person = {};
    $scope.applicants = JSON.parse($window.localStorage.getItem("applicants"));
    $scope.ApplicantID = $window.localStorage.getItem("ApplicantID");
    $scope.ApplicantName = $window.localStorage.getItem("ApplicantName");

    $scope.applicant = {
        ApplicantID: $scope.ApplicantID,
        ApplicantName: $scope.ApplicantName
    };
    $scope.loadView = function() {
        $scope.ApplicantID = $window.localStorage.getItem("AppID");
        $scope.myApplicant = {ApplicantID: $scope.ApplicantID};
        $http({
            method: 'POST',
            url: '../../php/getApplicantViewData.php',
            data: Object.toparams($scope.myApplicant),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
                $scope.applicant = response.data.data[0];

                if($scope.ApplicantID=="1" || $scope.ApplicantID=='7' || $scope.ApplicantID=='5' || $scope.ApplicantID=='8')
                    $scope.applicant.Photo = "../../images/applicants/" + $scope.ApplicantID + ".jpg";

                else
                    $scope.applicant.Photo = "../../images/workInProgress.jpeg";

                var str=$scope.ApplicantID;
                $scope.applicant.AppID = str;

            }
        );
    };

    $scope.loadView();



});