'use strict';

angular.module('recruiter').controller('recController', function($scope, $http, $window) {
    //set it to null
   // $window.localStorage.setItem("lookupTable",null);

    $scope.recruiterViews = [
        // This has been replaced by an indivual button {view:'View Applicants', url:'./utility/find-cadet/find-cadet.view.html'},
        {view:'Add Applicant', url:'./recruiter/site-addcadet/site-addcadet.view.html'},
    ];

    $scope.showView = function showView(item){
        $scope.dataurl = item.url;
        $scope.updateDisplay = item.url
    };

    //Mock Data used for testing ----------------------
    $scope.fileData = {
        Category: "Category",
        CadetID:"208",
        File: "testB.html",
        Description:"Description of File"
    };
    $scope.fileData2 = {
        Category: "Category2",
        CadetID:"208",
        File: "File2",
        Description:"Description of File Two"
    };

    $scope.selectedFile ="";
    $scope.file = angular.copy($scope.fileData);
    $scope.files = [];
    $scope.files[0] = $scope.file;
    $scope.files[1] = angular.copy($scope.fileData2);
    //Set Cadet ID to value stored in local storage

    //TODO: Once this is changed to applicantID, send to backend in place of cadet
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));

    //Upload File - Specify CadetID, PATH and File
    $scope.uploadFile =  function() {
        var currDirectory='mentorFiles';
        var myFile = document.querySelector('#myFile');

        var formData = new FormData();
        formData.append('CadetID',$scope.cadetID);
        formData.append('directory',currDirectory);
        formData.append('fileType',$scope.file);
        formData.append('file', myFile.files[0]);
        for (var key of formData.keys()) {
            console.log(key);
        }
        var task = $http({
            method: 'POST',
            url: './php/app_fileUpload.php',
            data: formData,
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(
            //success
            function (result) {
                alert("File Uploaded!");
                alert("success: " + JSON.stringify(result));

                $scope.selectedFile = result.data;
                $scope.showDirectory();

                //Clear the name from the "Choose File" input element
                var myFile = document.querySelector('#myFile');
                myFile.value = "";
            },
            //error
            function (result) {
                alert("Error Uploading File: " + JSON.stringify(result));
            }
        );
    };

    // showDirectory -- Currently Lists all files in the mentorFiles -
    // Will need to modify to only list files that match a criteria.  The directory should not be passed.
    $scope.showDirectory = function () {
        $scope.selectedFile ="";

        var taskShowDirectory = $http({
            method: 'GET',
            url: './php/files_listAll.php',
            params: { directory:'mentorFiles' }
        });
        taskShowDirectory.then(function (response) {

            $scope.files =[];
            var i=0;
            var max = response.data.data.length;
            while (i < max) {

                if ( !(response.data.data[i].File == "." || response.data.data[i].File == "..")) {

                    var option = {
                        Category: "Category",
                        CadetID: "208",
                        File: "testB.html",
                        DateAdded: "2017-04-27",
                        Description: "Description of File"
                    };
                    option.File = response.data.data[i].name;

                    var myFile = angular.copy(response.data.data[i]);
                    $scope.files.push(myFile);
                }
                i++;
            }
        });
    };

    //resource:
    //http://jaliyaudagedara.blogspot.com/2016/05/angularjs-download-files-by-sending.html
    $scope.downloadFile = function (name) {

        //alert("Downloading:" + name);
        $http({
            method: 'GET',
            url: './php/files_download.php',
            params: { file: name ,directory:'mentorFiles' },
            responseType: 'arraybuffer'
        }).success(function (data, status, headers) {
            headers = headers();

            var filename = headers['x-filename'];

            //There is no x-filename field in the value returned.  I was able to use content-disposition
            //content-disposition: "attachment; filename=sample.pdf"
            filename=  headers['content-disposition'].split("=")[1];

            var contentType = headers['content-type'];

            var linkElement = document.createElement('a');
            try {
                var blob = new Blob([data], { type: contentType });
                var url = window.URL.createObjectURL(blob);

                linkElement.setAttribute('href', url);
                linkElement.setAttribute("download", filename);

                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);
            } catch (ex) {
                console.log(ex);
            }
        }).error(function (data) {
            console.log(data);
        });
    };

    $scope.deleteFile = function(name){
        var myFileObj = {file: name, directory:'mentorFiles'};

        var taskDeleteFile = $http({
            method: 'POST',
            url: './php/files_delete.php',
            data: Object.toparams(myFileObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCESS
            function(result){   //NOTE: the result needs to be checked to see if the file was deleted successfully
                alert("File Deleted!");
                $scope.showDirectory();
            },
            //ERROR
            function(result){
                alert("Error Deleting File." + JSON.stringify(result));
            }
        );
    };

    $scope.openFindCadetView = function()
    {
        $window.open('./utility/find-cadet/find-cadet-index.view.html', "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=300,height=300");

    };
    
    $scope.showDirectory();
});
