
/* Created By: Dr. Phelps
   Date:  December 2018
   File: attachments.controller.js
   Used with attachments.view.html
      and php files: ./php/files_upload.php, ./php/files_listAll.php, ./php/files_download.php,./php/files_delete.php

   Resources:
  https://www.webcodegeeks.com/html5/html5-file-upload-example
* https://jsfiddle.net/JeJenny/ZG9re/
* https://stackoverflow.com/questions/17629126/how-to-upload-a-file-using-angularjs-like-the-traditional-way
* https://www.tutorialspoint.com/php/php_file_uploading.htm
* https://www.taniarascia.com/how-to-upload-files-to-a-server-with-plain-javascript-and-php/
        //https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        //https://developer.mozilla.org/en-US/docs/Web/API/FormData/keys
        //https://www.youtube.com/watch?v=DB-kVs76XZ4
*/

 angular.module('utility.attachments').
    controller('attachmentController', function($scope, $http, $window) {

    //Mock Data used for testing ----------------------
    $scope.fileData = {
        Category: "Category",
        CadetID:"208",
        File: "testB.html",
        DateAdded:"2017-04-27",
        Description:"Description of File"
    };
    $scope.fileData2 = {
        Category: "Category2",
        CadetID:"208",
        File: "File2",
        DateAdded:"2017-04-28",
        Description:"Description of File Two"
    };

    $scope.selectedFile ="";
    $scope.file = angular.copy($scope.fileData);
    $scope.files = [];
    $scope.files[0] = $scope.file;
    $scope.files[1] = angular.copy($scope.fileData2);
    //Set Cadet ID to value stored in local storage
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    var currDirectory='mentorFiles';
    var currCadetID= $scope.cadetID;
    var fileType= $scope.fileTypes;
    //Upload File - Specify CadetID, PATH and File
    $scope.uploadFile =  function() {

        var myFile = document.querySelector('#myFile');
        
        //Set file type based on what is stored in local storage.
        
        var formData = new FormData();
        formData.append('CadetID',currCadetID);
        formData.append('directory',currDirectory);
        formData.append('fileType',fileType);
        formData.append('file', myFile.files[0]);
        for (var key of formData.keys()) {
            console.log(key);
        }

        var task = $http({
            method: 'POST',
            url: './php/files_upload.php',
            data: formData,
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(
            //success
            function (result) {
                alert("File Uploaded!");
                //alert("success: " + JSON.stringify(result));

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
            params: {   directory:currDirectory,
                        selectCadetID:currCadetID,
                        selectFileType:fileType}
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
        }).then(function (data) {
            // SUCCESS
            console.log(data);
            var headers = data.headers();
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
        }).then(function (data) {
            // ERROR
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
    $scope.showDirectory();
});