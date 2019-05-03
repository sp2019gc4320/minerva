'use strict';

angular.module('recruiter.applicantFind').controller('applicantFindController', function($scope, $http, $window) 
{
    $scope.cadets = JSON.parse($window.localStorage.getItem("cadets"));
    $scope.CadetID = $window.localStorage.getItem("CadetID");
    $scope.CadetName = $window.localStorage.getItem("CadetName");
    $scope.CadetGender = $window.localStorage.getItem("CadetGender");
    $scope.CadetDOB = $window.localStorage.getItem("CadetDOB");
    
    $scope.cadet = {
        CadetID: $scope.CadetID,
        CadetName: $scope.CadetName,
        CadetGender: $scope.CadetGender,
        CadetDOB: $scope.CadetDOB
    };
});
