'use strict';

angular.module('recruiter.applicantFind').controller('applicantFindController', function($scope, $http, $window) 
{
    $scope.cadets = JSON.parse($window.localStorage.getItem("cadets"));
    $scope.CadetID = $window.localStorage.getItem("CadetID");
    $scope.CadetName = $window.localStorage.getItem("CadetName");
    $scope.CadetGender = $window.localStorage.getItem("CadetGender");
    $scope.CadetDOB = $window.localStorage.getItem("CadetDOB");

    $scope.contains = function(name){
        for(var i = 0; i < $scope.fileList.length; i++){
            if($scope.fileList[i]["File"]==name)
                return false;

        }
        return true;
    }
    $scope.cadet = {
        CadetID: $scope.CadetID,
        CadetName: $scope.CadetName,
        CadetGender: $scope.CadetGender,
        CadetDOB: $scope.CadetDOB
    };
    $scope.app = {AppID: $scope.CadetID};

    var taskListFile = $http({
        method: 'POST',
        url: './php/app_fileList.php',
        data: Object.toparams($scope.app),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

    });
    taskListFile.then(
        //Will use this statement once we have applicant ID functioning fully
        //var applicantID = $scope.applicantID
        function (result) {
            alert("Yoo")


            $scope.fileList = result.data.data;
            alert(JSON.stringify($scope.fileList));

            $scope.missingList = ["EducationPlan", "BandARecords", "MedicalInsurance", "Immunization", "Transcript",
                "CandidateApplication", "MedicalHistory", "BirthCertificate", "LegalHistory",
                "MentorApplication", "SocialSecurityCard", "IDCard", "MentalHealthHistory"];

            for (var i = 0; i < $scope.fileList.length; i++) {
                if ($scope.missingList.includes(String($scope.fileList[i]["File"]))) {
                    var index = $scope.missingList.indexOf(String($scope.fileList[i]["File"]));
                    $scope.missingList.splice(index, 1);
                }
            }
        },
        function (result) {
            alert("Failure");
        }
    );
});