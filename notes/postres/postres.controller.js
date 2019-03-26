// File:  postres.controller.js
// Used by postres.view.html
//Edits made 2/28/2019: names of functions have been changed for clarity. add is now addNote and remove is now removeNote. Be sure to update these in the html file.
//Edits made 2/28/2019: addReport, addEducation, addMilitary, addEmployemnet, addMisc $scope functions have been created to provide button functionality.
angular.module('notes.postres').controller('postresController', function($scope, $http, $window) {
    //$scope.cadetID = "12"; //with data

    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    var cadet = {CadetID: $scope.cadetID};


    //1. Get Cadet's PostRes sql
    var taskGetPostResReports = $http({
        method: 'POST',
        url: './php/postres_get.php',
        data: Object.toparams(cadet),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    taskGetPostResReports.then(
        //SUCCESS
        function (result) {
           /* {data: [
                {PlacementMonth: 1,  Education:[], Employment:[], Military:[], Misc:[], Report:[]},
                {PlacementMonth: 2,  Education:[], Employment:[], Military:[], Misc:[], Report:[]}
                {PlacementMonth: 3,  Education:[], Employment:[], Military:[], Misc:[], Report:[]}
            ],
                contacts: []
            }
            */
            $scope.postres = result.data.data;
            $scope.current = $scope.postres[0];
            $scope.contacts = result.data.contacts;
            $scope.findStatus();
        },
        //ERROR
        function (result) {
            alert("Error reading PRAP notes");
        }
    );

    $scope.selectMonth = function(index)
    {
       $scope.current =  $scope.postres[index];
    };

    $scope.status ={};
    $scope.findStatus = function()
    {
        $scope.status.LastMonthPlacementCriteriaMet ="";
        $scope.status.LastMonthContactMade = "";
        $scope.status.LastMonthMentorContactRequirementsMet ="";
        $scope.status.LastMonthAllRequirementsMet= "";
        let i=0;

        //assumes postres is in order by PlacementMonth
        while (i < $scope.postres.length) {
            var placement = $scope.postres[i];
            if (placement.MeetsPlacementCriteria == '1')
                $scope.status.LastMonthPlacementCriteriaMet = placement.PlacementMonth;

            if (placement.MeetsRequiredContact == '1')
                $scope.status.LastMonthMentorContactRequirementsMet = placement.PlacementMonth ;

            //look at report for current month, and see if  WasContactMade==1.
            var report = placement.reports;
            if(report.length >0) {
                let j = 0;
                while (j < report.length) {
                    if (report[j].WasContactMade == '1')
                    $scope.status.LastMonthContactMade = placement.PlacementMonth;
                    j++;
                }
            }

            if( $scope.status.LastMonthPlacementCriteriaMet == $scope.status.LastMonthMentorContactRequirementsMet &&
                $scope.status.LastMonthMentorContactRequirementsMet == $scope.status.LastMonthContactMade ) {
                $scope.status.LastMonthAllRequirementsMet = $scope.status.LastMonthContactMade;
            }

            i++;
        }
    };
    $scope.checkboxStyle = function(value) {
        return {'bg-danger': value == '0', 'bg-success':  value== '1'};
    };



        //function to update education section
    $scope.updateEducation = function (index) {
        //creates an array to update each attribute in table
        alert("Index: " +index);
        var sendData = {};
        sendData.PREdSchoolType = $scope.alleducation[index].PREdSchoolType;
        sendData.PREdStatus = $scope.alleducation[index].PREdStatus;
        sendData.PREdStartDate = $scope.alleducation[index].PREdStartDate;
        sendData.PREdEndDate = $scope.alleducation[index].PREdEndDate;
        sendData.IsPREdFullTime = $scope.alleducation[index].IsPREdFullTime;
        sendData.PREdNote = $scope.alleducation[index].PREdNote;
        sendData.PREdID = $scope.alleducation[index].PREdID;
        //Links to php file
        sendData.TableName = 'tblPREducation';
        var taskUpdateEducation = $http({
            method: 'POST',
            url: './php/postres_updateEducation.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        //alerts page whether or not the update to the database was successful.
        taskUpdateEducation.then(function (result) {
                alert("Education update succesful.");
            },
            function (result) {
                alert("Education update error.");
            });

    };
    //function for updating military, same concept as education section
    $scope.updateMilitary = function (index) {
        var sendData = {};
        sendData.PRMilStatus = $scope.allmilitary[index].PRMilStatus;
        sendData.PRMilAffiliation = $scope.allmilitary[index].PRMilAffiliation;
        sendData.IsAGR = $scope.allmilitary[index].IsAGR;
        sendData.PRMilEnlistDate = $scope.allmilitary[index].PRMilEnlistDate;
        sendData.PRMilDelayedEntryDate = $scope.allmilitary[index].PRMilDelayedEntryDate;
        sendData.PRMilDischargeDate = $scope.allmilitary[index].PRMilDischargeDate;
        sendData.PRMilNote = $scope.allmilitary[index].PRMilNote;
        sendData.PRMilID = $scope.allmilitary[index].PRMilID;
        sendData.TableName = 'tblPRMilitary';
        var taskUpdateMilitary = $http({
            method: 'POST',
            url: './php/postres_updateMilitary.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        taskUpdateMilitary.then(function (result) {
                alert("Military update successful.");
            },
            function (result) {
                alert("Military update error.");
            });
    };

    $scope.updateEmployment = function (index) {
        var sendData = {};
        sendData.PREmployer = $scope.allemployment[index].PREmployer;
        sendData.PREmpHireDate = $scope.allemployment[index].PREmpHireDate;
        sendData.PREmpHrsPerWeek = $scope.allemployment[index].PREmpHrsPerWeek;
        sendData.PREmpWageRate = $scope.allemployment[index].PREmpWageRate;
        sendData.PREmpWageType = $scope.allemployment[index].PREmpWageType;
        sendData.PREmpWorkStatus = $scope.allemployment[index].PREmpWorkStatus;
        sendData.PREmpPOCPhone = $scope.allemployment[index].PREmpPOCPhone;
        sendData.PREmpPOCName = $scope.allemployment[index].PREmpPOCName;
        sendData.IsPREmpSelfEmployed = $scope.allemployment[index].IsPREmpSelfEmployed;
        sendData.PREmpTermDate = $scope.allemployment[index].PREmpTermDate;
        sendData.PREmpTermNote = $scope.allemployment[index].PREmpTermNote;
        sendData.PREmpNotes = $scope.allemployment[index].PREmpNotes;
        sendData.PREmpID = $scope.allemployment[index].PREmpID;
        sendData.TableName = 'tblPREmployment';
        var taskUpdateEmployment = $http({
            method: 'POST',
            url: './php/postres_updateEmployment.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        taskUpdateEmployment.then(function (result) {
                alert("Employment update successful.");
            },
            function (result) {
                alert("Employment update error.");
            });
    };
    $scope.updateMisc = function (index) {
        var sendData = {};
        sendData.PRMiscPlacementType = $scope.allmisc[index].PRMiscPlacementType;
        sendData.PRMiscStartDate = $scope.allmisc[index].PRMiscStartDate;
        sendData.PRMiscEndDate = $scope.allmisc[index].PRMiscEndDate;
        sendData.PRMiscHrs = $scope.allmisc[index].PRMiscHrs;
        sendData.PRMiscNote = $scope.allmisc[index].PRMiscNote;
        sendData.PRMiscID = $scope.allmisc[index].PRMiscID;
        sendData.TableName = 'tblPRMisc';
        var taskUpdateMisc = $http({
            method: 'POST',
            url: './php/postres_updateMisc.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        taskUpdateMisc.then(function (result) {
                alert("Misc update succesful.");
            },
            function (result) {
                alert("Misc update error.");
            });

    };
//Denotes selection month. This function is linked to the Select Placement Month dropdown in the PostRes screen
    $scope.selectPlacementMonth = function (month) {
        $scope.reports = $scope.allreports[month - 1];
        $scope.contacts = $scope.allcontacts[month - 1];
        $scope.military = $scope.allmilitary[month - 1];
        $scope.employment = $scope.allemployment[month - 1];
        $scope.misc = $scope.allmisc[month - 1];
    };
//Pulls data dependent on which placement month is selected
    $scope.isCurrentReports = function (index) {
        var temp = $scope.alleducation[index].PlacementMonth;
        return $scope.reports.PlacementMonth == $scope.allreports[index].PlacementMonth;
    };
    $scope.isCurrentContacts = function (index) {
        //alert("index1 "+index);
        return $scope.reports.PlacementMonth == $scope.allcontacts[index].ContactPlacementMonth;

    };
    $scope.isCurrentEducation = function (index) {
        var temp = $scope.alleducation[index].PlacementMonth;
        return $scope.reports.PlacementMonth == $scope.alleducation[index].PlacementMonth;
    };
    $scope.isCurrentMilitary = function (index) {
        return $scope.reports.PlacementMonth == $scope.allmilitary[index].PlacementMonth;
    };
    $scope.isCurrentEmployment = function (index) {
        return $scope.reports.PlacementMonth == $scope.allemployment[index].PlacementMonth;
    };
    $scope.isCurrentMisc = function (index) {
        return $scope.reports.PlacementMonth == $scope.allmisc[index].PlacementMonth;
    };

    //This is where the new edits for the controller start.
    // New $scope functions have been created starting on line 250 in this file. These functions are used in the HTML file. Example: ng-button click (function).
    $scope.inputList = [];
    $scope.addNote = function () {
        $scope.inputList.push({content: ""});
    };
    $scope.removeNote = function (input) {
        var idx = $scope.inputList.indexOf(input);
        $scope.inputList.splice(idx, 1)
    };


    $scope.enableEdit1 = function () {
        var nodes = document.getElementById("notes1").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
            nodes[i].disabled = false;
        }
    };
    $scope.disableEdit1 = function () {
        var nodes = document.getElementById("notes1").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
            nodes[i].disabled = true;
        }
    };

    $scope.enableEdit2 = function () {
        var nodes = document.getElementById("notes2").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
            nodes[i].disabled = false;
        }
    };
    $scope.disableEdit2 = function () {
        var nodes = document.getElementById("notes2").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
            nodes[i].disabled = true;
        }
    };

    $scope.enableEdit3 = function () {
        var nodes = document.getElementById("notes3").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
            nodes[i].disabled = false;
        }
    };
    $scope.disableEdit3 = function () {
        var nodes = document.getElementById("notes3").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
            nodes[i].disabled = true;
        }
    };
    $scope.viewNote = function(){
        window.open('notes/postres/noteView.html', 'height=250', 'width=250');
    };

    $scope.saveNote = function () {
    };
    //This function gives the add report button functionality.
    $scope.addReport = function()
    {
        var report = {
            MeetsRequiredContact:"",
            MeetsPlacementCriteria:"",
            PlacementMonth:"",
            PRReportType:"",
            PRReporterCategory:"",
            PRReporterID:"",
            PRReportDate:"",
            WasContactMade:""
        };
        var nextIndex = $scope.allreports.length;
        $scope.allreports[nextIndex] = angular.copy(report);
    };

    $scope.removeReport = function (reports) {
        var idx = $scope.allreports.indexOf(reports);
        $scope.allreports.splice(idx, 1);
    };
    //This function gives the add mentor contact button functionality.
    $scope.addMentor = function() {
        var mentorContact = {
            ContactDate:"",
            MentorContactType:"",
            fkMentorID:"",
            ContactPlacementMonth: $scope.reports.PlacementMonth,
            MentorContactNote:""
        };
        var nextIndex = $scope.allcontacts.length;
        $scope.allcontacts[nextIndex] = angular.copy(mentorContact);
    };

    //This function gives the remove mentor contact button its functionality.
    $scope.removeMentor = function (contacts) {
        var idx = $scope.allcontacts.indexOf(contacts);
        $scope.allcontacts.splice(idx, 1);
    };

    //This function gives the add education button functionality.
    $scope.addEducation = function() {
        var education = {
            PREdStartDate: "",
            PREdEndDate:"",
            IsPREdFullTime:"",
            PREdNote:""
        };
        var nextIndex = $scope.alleducation.length;
        $scope.alleducation[nextIndex] = angular.copy(education);
    };
    //This function gives the remove education button its functionality.
    $scope.removeEducation = function(education){
        var idx = $scope.alleducation.indexOf(education);
        $scope.alleducation.splice(idx, 1);
    };
    //This function gives the add military button functionality.
    $scope.addMilitary = function(){
        var military = {
            PRMilAffiliation:"",
            PRMilStatus:"",
            PRMilEnlistDate:"",
            PRMilDelayedEntryDate:"",
            PRMilDischargeDate:"",
            isAGR:"",
            PRMilNote:""
        };
        var nextIndex = $scope.allmilitary.length;
        $scope.allmilitary[nextIndex] = angular.copy(military);
    };
    //This function gives the remove military  button its functionality.
    $scope.removeMilitary = function(military){
        var idx = $scope.allmilitary.indexOf(military);
        $scope.allmilitary.splice(idx, 1);
    };
    //This function gives the add employment button functionality.
    $scope.addEmployment = function(){
        var employment = {
            PREmployer:"",
            PREmpHireDate:"",
            PREmpTermDate:"",
            PREmpWorkStatus:"",
            IsPREmpSelfEmployed:"",
            PREmpHrsPerWeek:"",
            PREmpWageRate:"",
            PREmpPOCName:"",
            PREmpPOCPhone:"",
            PREmpTermNote:"",
            PREmpNotes:""
        };
        var nextIndex = $scope.allemployment.length;
        $scope.allemployment[nextIndex] = angular.copy(employment);
    };
    //This function gives the remove employment button its functionality.
    $scope.removeEmployment = function(employment){
        var idx = $scope.allemployment.indexOf(employment);
        $scope.allemployment.splice(idx, 1);
    };
    //This function gives the add misc button functionality.
    $scope.addMisc = function() {
        var misc = {
            PRMiscPlacementType:"",
            PRMiscHrs:"",
            PRMiscStartDate:"",
            PRMiscEndDate:""
        };
        var nextIndex = $scope.allmisc.length;
        $scope.allmisc[nextIndex] = angular.copy(misc);
    };
    //This function gives the remove misc button its functionality.
    $scope.removeMisc = function(misc){
        var idx = $scope.allmisc.indexOf(misc);
        $scope.allmisc.splice(idx, 1);
    };

});