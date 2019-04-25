'use strict';

angular.module('recruiter').controller('recController', function($scope, $http, $window) {
    //set it to null
   // $window.localStorage.setItem("lookupTable",null);
    // Model for containing the Person to be added to tblPerson
    $scope.person = {};
    $scope.applicant = {};


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

    // Mailing address toggle
    $scope.hasSameMailingAddress = false;

    // List of ContactInformationModels
    $scope.contactInformation = []

    $scope.age = 0
  
    /// Model to arrange the data for ContactInformation in the post requests.
    class ContactInformationModel {

        /**
         * Sets the ContactInformationModel to its default values
         */
        constructor() {
            this.ContactType = "phone"
            this.ContactTypeExt = "home"
            this.IsPreferred = 0
        }

        /**
         * Defines the data used in the POST object for when the form is
         * submitted. It's important to specify this because when contact
         * information is added to the field, some of the field values aren't
         * included when the contact type differs. For example, Ext (Extension)
         * is not needed when the Contact Type is a social media account.
         *
         * - Returns:
         *   - An object containing the necessary fields for this object to be
         *   added to the database
         */
        asPOSTObject() {

            // Fields used in all cases
            var postObject = {
                ContactType: this.ContactType,
                Value: this.Value,
                Description: this.Description,
                IsPreferred: this.IsPreferred
            }

            if(this.ContactType == "social media") {
                return postObject;
            } else {
                if(this.ContactType == "phone") {
                    postObject.Ext = this.Ext;
                }
                if(this.ContactTypeExt != undefined) {
                    postObject.ContactType += "-" + this.ContactTypeExt;
                }
                return postObject;
            }
        }
    }

    // Set up options on load
    $http({
        method: "GET",
        url: "./php/admin_createCadetFormOptions.php",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(function(response) {
        var data = response.data;
        // Extract data
        $scope.urbanizationOptions = data.urbanization.map(a => a.Urbanization);
        $scope.stateOptions = data.state
        $scope.salutationOptions = data.salutation.map(a => a.Salutation);
        $scope.genqualOptions = data.genqual.map(a => a.PersonGenQual);
        $scope.raceOptions = data.race;
    }, function(error){
    });

    /**
     * Creates a new ContactInformationModel to correspond with the row being
     * added in the Contact Information section of the form.
     */
    $scope.addContactInformation = function() {
        $scope.contactInformation.push(new ContactInformationModel());
    }

    /**
     * Removes the selected row from the ContactInformation section of the form.
     *
     * - Parameters:
     *   - elem: The element corresponding to the row to be removed.
     */
    $scope.removeContactInformation = function(elem) {
        console.log(elem.$$hashKey);
        console.log(elem.asPOSTObject());
        for(var i = 0; i < $scope.contactInformation.length; i++) {
            if($scope.contactInformation[i].$$hashKey == elem.$$hashKey) {
                $scope.contactInformation.splice(i, 1);
            }
        }

    }

    /**
     * Calculates the age given a person's DOB in MM/DD/YYYY format. Used in the
     * view to tell the person what age a cadet is.
     *
     * - Parameters:
     *   - dateString: The string containing the person's birth date
     * - Returns:
     *   - 0 if the date string is invalid or undefined, the age otherwise
     */
    $scope.getAge = function (dateString) {
        // We want a valid value if the full date has not yet been input.
        // Since the minimum for a full date would be constitued by M/D/YYYY,
        // we need to make sure there are at least 8 characters.
        if(dateString == undefined || dateString.length < 8) { return 0 }

        // Otherwise, run calculations
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // If the date string is invalid, return 0. It may be more preferable
        // just to write "invalid".
        return isNaN(age) ? 0 : age;
    };

    /**
     * Shortcut function added for readability. Creates a new array containing
     * the contact information put into the format for posting objects.
     */
    $scope.getContactInformationPOSTData = function() {
        return $scope.contactInformation.map(ci => ci.asPOSTObject());
    }

    /**
     * Submits the form data to php/admin_createCadet.php
     */
    $scope.submit = function() {
        $http({
            method: "POST",
            url: "./php/recruiter_createApplicant.php",
            data: {
                peopleData: $scope.person,
                applicantsData: $scope.applicant,
                contactInformationData: $scope.getContactInformationPOSTData()
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(response) {
                console.log("Response: " + response.data);
            },
            function(error) {
                console.log("Error: " + error);
            });
        var form = document.getElementById("newAppForm");
        form.reset();

    }
    $scope.recruiterViews = [
        {view:'Add Applicant', url:'./recruiter/site-addapplicant/site-addapplicant.view.html'},
        {view: 'View Applicant', url: './recruiter/applicant-find/applicant-find.view.html'},
        {view: 'Application Status', url: './recruiter/applicant-status/applicantstatus.view.html'}
    ];

    $scope.showView = function showView(item){
        $scope.dataurl = item.url;
        $scope.updateDisplay = item.url
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
    $scope.uploadFile =  function(docType) {
        var currDirectory='mentorFiles';

        var myFile = "#"+docType;
        var myFile = document.querySelector(myFile);


        var formData = new FormData();
        formData.append('CadetID',$scope.cadetID);
        formData.append('directory',currDirectory);
        formData.append('fileType',docType);
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



    //resource:
    //http://jaliyaudagedara.blogspot.com/2016/05/angularjs-download-files-by-sending.html
    $scope.downloadFile = function (name) {

        //alert("Downloading:" + name);
        $http({
            method: 'GET',
            url: './php/app_fileDownload.php',
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
            function(result){


                //alert("Success");
                $scope.fileList = result.data.data;
            },
            function(result){
                alert("Failure");
            }


);

$scope.openFindApplicantView = function()
{
    $window.open('./utility/find-cadet/find-applicant-index.view.html', "_blank",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=300,height=300");

};
    
});