'use strict';

angular.module('recruiter.applicantFind').controller('applicantFindController', function($scope, $http, $window) 
{
    $scope.applicants = JSON.parse($window.localStorage.getItem("applicants"));
    $scope.ApplicantID = $window.localStorage.getItem("ApplicantID");
    $scope.ApplicantName = $window.localStorage.getItem("ApplicantName");

    $scope.applicant = {
        ApplicantID: $scope.ApplicantID,
        ApplicantName: $scope.ApplicantName
    };

    $scope.app = {AppID: $scope.ApplicantID};
    var taskListFile = $http({
        method: 'POST',
        url: './php/app_fileList.php',
        data: Object.toparams($scope.app),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

    });
    var taskListRequired=$http({
        method: 'POST',
        url: './php/app_getReqDocs.php',
        data: '',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    taskListRequired.then(
        function(result) {
            $scope.requiredFileList = result.data.data;
            for(let x = 0; x < $scope.requiredFileList.length; x++){


                var toBeReplaced = ""+String($scope.requiredFileList[x].FileName);
                /*      if($scope.requiredFileList[x].isRequired==1){
                          toBeReplaced = toBeReplaced+"*";
                      }
      */

                toBeReplaced = toBeReplaced.split(' ').join('_');
                $scope.requiredFileList[x].FileName = toBeReplaced;
            }
            alert(JSON.stringify($scope.requiredFileList));

        },
        function(result){
            alert("Failure");
        }
    );

    taskListFile.then(
        //Will use this statement once we have applicant ID functioning fully
        //var applicantID = $scope.applicantID
        function (result) {
            alert(result.data);
            $scope.fileList = result.data.data;


        },
        function (result) {
            alert("Failure");
        }
    );
});
