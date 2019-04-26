'use strict';

angular.module('recruiter.applicantFind').controller('applicantFindController', function($scope, $http, $window) 
{
    $scope.applicants = JSON.parse($window.localStorage.getItem("applicants"));
    $scope.ApplicantID = $window.localStorage.getItem("ApplicantID");
    $scope.ApplicantName = $window.localStorage.getItem("ApplicantName");
    $scope.ApplicantGender = $window.localStorage.getItem("ApplicantGender");
    $scope.ApplicantDOB = $window.localStorage.getItem("ApplicantDOB");

    $scope.applicant = {
        ApplicantID: $scope.ApplicantID,
        ApplicantName: $scope.ApplicantName,
        ApplicantGender: $scope.ApplicantGender,
        ApplicantDOB: $scope.ApplicantDOB
    };

    $scope.app = {AppID: $scope.ApplicantID};
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
            $scope.fileList = result.data.data;

            $scope.missingList = ["EducationPlan","BandARecords","MedicalInsurance",
                "Immunization","CandidateApplication",
                "MedicalHistory","BirthCertificate","LegalHistory","MentorApplication",
                "SocialSecurityCard","IDCard","MentalHealthHistory"];

            for (var i = 0; i < $scope.fileList.length; i++){
                if($scope.missingList.includes(String($scope.fileList[i]["File"]))){
                    var index = $scope.missingList.indexOf(String($scope.fileList[i]["File"]));
                    $scope.missingList.splice(index,1);
                }
            }

        },
        function (result) {
            alert("Failure");
        }
    );
});
