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

    
    var taskListFile = $http({
        method: 'POST',
        url: './php/app_fileList.php',
        data: '',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

    });
    taskListFile.then(
        //Will use this statement once we have applicant ID functioning fully
        //var applicantID = $scope.applicantID
            function(result){
                alert("Success");

                $scope.fileList = result.data.data;

                alert(JSON.stringify($scope.fileList));

                
                $scope.missingList = ["EducationPlan","BandARecods","MedicalInsurance",
                 "Immunization","CandidateApplication",
            "MedicalHistory","BirthCertificate","LegalHistory","MentorApplication",
            "SocialSecurityCard","IDCard","MentalHealthHistory"];

            for (var i = 0; i < $scope.fileList.length; i++){
                if($scope.missingList.includes(String($scope.fileList[i]["File"]))){
                    var index = $scope.missingList.indexOf(String($scope.fileList[i]["File"]));
                    $scope.missingList.splice(index,1);
                }
            }
            alert(JSON.stringify($scope.missingList));
            },
            function(result){
                alert("Failure");
            }
);

    $(document).ready(function() {
        $('#example').DataTable();
      });
});
