'use strict';

angular.module('recruiter').controller('recController', function($scope, $http, $window) {
    //set it to null
   // $window.localStorage.setItem("lookupTable",null);
    // Model for containing the Person to be added to tblPerson
    $scope.person = {};
    $scope.applicants = JSON.parse($window.localStorage.getItem("applicants"));
    $scope.ApplicantID = $window.localStorage.getItem("ApplicantID");
    $scope.ApplicantName = $window.localStorage.getItem("ApplicantName");
    
    $scope.applicant = {
        ApplicantID: $scope.ApplicantID,
        ApplicantName: $scope.ApplicantName
    };

    $scope.contains = function(fileName){
        for(var i = 0; i < $scope.fileList.length;i++){
            if($scope.fileList[i]['File'] === fileName){
                return false;
            }
        }
        return true;
    };

    // Mailing address toggle
    $scope.hasSameMailingAddress = false;

    // List of ContactInformationModels
    $scope.contactInformation = [];
    $scope.postInfo = [];

    $scope.guardianInformation = [];
    $scope.guardianPost = [];

    $scope.age = 0;
  
    /// Model to arrange the data for ContactInformation in the post requests.
    class ContactInformationModel {

        /**
         * Sets the ContactInformationModel to its default values
         */
        constructor() {
            this.ContactType = "phone";
            this.ContactTypeExt = "home";
            this.Value = "";
            this.Description = "";
            this.IsPreferred = 0;
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
    class GuardianInformationModel {

        /**
         * Sets the ContactInformationModel to its default values
         */
        constructor() {
            this.FName = "";
            this.LName = "";
            //this.ApplicantID = $scope.ApplicantID;
            this.Relationship = "";
            this.PhoneNum = "";
            this.Email = "";
            this.IsLegalGuard = 0;
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
        asGuardPOSTObject() {

            // Fields used in all cases
            var postObject = {
                //ApplicantID: this.ApplicantID,
                fName: this.FName,
                lName: this.LName,
                Relationship: this.Relationship,
                PhoneNum: this.PhoneNum,
                Email: this.Email,
                IsLegalGuard: this.IsLegalGuard
            }
            return postObject;
        }
    }

    // Set up options on load
    $http({
        method: "GET",
        url: "./php/recruiter_createApplicantFormOptions.php",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(function(response) {
        var data = response.data;
        // Extract data
        $scope.urbanizationOptions = data.urbanization.map(a => a.Urbanization);
        $scope.stateOptions = data.state;
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

    };
    $scope.addGuardian = function(){
        $scope.guardianInformation.push(new GuardianInformationModel());
    };

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

    };
    $scope.removeGuardian = function(elem){
        console.log(elem.$$hashKey);
        console.log(elem.asGuardPOSTObject());
        for(var i = 0; i < $scope.guardianInformation.length; i++) {
            if($scope.guardianInformation[i].$$hashKey == elem.$$hashKey) {
                $scope.guardianInformation.splice(i, 1);
            }
        }
    };

    /**
     * Calculates the age given a person's DOB in MM/DD/YYYY format. Used in the
     * view to tell the person what age a Applicant is.
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
        var i = 0;
        var len = $scope.contactInformation.length;
        for(; i < len;){
            $scope.postInfo[i] = $scope.contactInformation[i].asPOSTObject();
            alert($scope.postInfo[i]);
            console.log($scope.postInfo[i]);
            i++;
        }
        return $scope.postInfo;
    };
    $scope.getGuardianPOSTData = function(){
        var i = 0;
        var len = $scope.guardianInformation.length;
        for(; i < len;){
            $scope.guardianPost[i] = $scope.guardianInformation[i].asGuardPOSTObject();
            i++
        }
        return $scope.guardianPost;
    };

    /**
     * Submits the form data to php/admin_createApplicant.php
     */
    $scope.submit = function() {
        $http({
            method: "POST",
            url: "./php/recruiter_createApplicant.php",
            data: {
                peopleData: $scope.person,
                applicantsData: $scope.applicant,
                contactInformationData: $scope.getContactInformationPOSTData(),
                guardianData: $scope.getGuardianPOSTData()
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(response) {
                //UNCOMMENT AFTER DUNCAN GETS IT WORKING
                //console.log("Response: " + response.data);
                //alert($scope.guardianInformation.length);
            },
            function(error) {
                console.log("Error: " + error);
            });
        var form = document.getElementById("newAppForm");
        form.reset();
        //Add this in when things work properly and alerts no longer need to show
        window.location.reload();

    }
    $scope.recruiterViews = [
        {view:'Add Applicant', url:'./recruiter/site-addapplicant/site-addapplicant.view.html'},
        {view: 'View Applicant', url: './recruiter/applicant-find/applicant-find.view.html'},
        {view: 'Application Status', url: './recruiter/applicant-status/applicantstatus.view.html'},
        {view: 'Applicants with Docs', url: './recruiter/applicant-docs/applicant-docs.view.html'}
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
    //Set Applicant ID to value stored in local storage

    //TODO: Once this is changed to applicantID, send to backend in place of Applicant
    $scope.applicantID = JSON.parse($window.localStorage.getItem("ApplicantID"));

    //Upload File - Specify ApplicantID, PATH and File
    $scope.uploadFile =  function(docType) {
        var currDirectory='mentorFiles';

        var myFile = "#"+docType;
        var myFile = document.querySelector(myFile);
        var formData = new FormData();
        formData.append('ApplicantID',$scope.ApplicantID);
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
                alert(result.data);


                $scope.selectedFile = result.data;

                //Clear the name from the "Choose File" input element
                var myFile = document.querySelector('#myFile');
                //myFile.value = "";
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
            function(result){

                $scope.fileList = result.data.data;
            },
            function(result){
                alert("Failure");
            }
);

$scope.openFindApplicantView = function()
{
    $window.open('./utility/find-applicant/find-applicant-index.view.html', "_blank",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=300,height=300");

};

    //To be in its own folder once controller is registered as applicantFindContoller
    $scope.applicants = JSON.parse($window.localStorage.getItem("applicants"));
    $scope.ApplicantID = $window.localStorage.getItem("ApplicantID");
    $scope.ApplicantName = $window.localStorage.getItem("ApplicantName")
   

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
    taskListFile.then(
        //Will use this statement once we have applicant ID functioning fully
        //var applicantID = $scope.applicantID
        function(result){
            $scope.fileList = result.data.data;

        },
        function(result){
            alert("Failure");
        }
    );

    $(document).ready(function() {
        $('#example').DataTable();
    });
    $scope.showDirectory = function () {
        $scope.selectedFile ="";

        var taskShowDirectory = $http({
            method: 'GET',
            url: './php/app_fileList.php',
            params: { directory:'mentorFiles' }
        });
        taskShowDirectory.then(function (response) {

            $scope.files =[];
            var i=0;
            var max = response.data.length;
            while (i < max) {

                if ( !(response.data[i].File == "." || response.data[i].File == "..")) {

                    var option = {
                        Category: "Category",
                        CadetID: "208",
                        File: "testB.html",
                        DateAdded: "2017-04-27",
                        Description: "Description of File"
                    };
                    option.File = response.data[i].name;

                    var myFile = angular.copy(response.data[i]);
                    $scope.files.push(myFile);
                }
                i++;
            }
        });
    };
    $scope.showDirectory();
});
