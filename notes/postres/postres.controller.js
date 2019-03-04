// File:  postres.controller.js
// Used by postres.view.html

angular.module('notes.postres').controller('postresController', function($scope, $http, $window) {
    //$scope.cadetID = "12"; //with data

    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    alert("Test  with Cadet 12 -  Da'jour\tCalloway to see sample dates");

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
        //Creates an array of objects that contain data
        function (result) {
            //Current CadetID is set to 12 (Da'jour Calloway)\
            //data for header section
            $scope.allheader = result.data.header;
            $scope.header = $scope.allheader[0];

            //data for reports section
            $scope.allreports = result.data.reports;
            $scope.reports = $scope.allreports[0];

            //data for contacts section
            $scope.allcontacts = result.data.contacts;
            $scope.contacts = $scope.allcontacts[0];

            //data for education section
            $scope.alleducation = result.data.education;
            $scope.education = $scope.alleducation[0];


            //data for military section
            $scope.allmilitary = result.data.military;
            $scope.military = $scope.allmilitary[0];


            //data for employment section
            $scope.allemployment = result.data.employment;
            $scope.employment = $scope.allemployment[0];


            //data for misc section
            $scope.allmisc = result.data.misc;
            $scope.misc = $scope.allmisc[0];

        },
        //ERROR
        function (result) {
            alert("Error reading PRAP notes");
        }
    );

    //function to update education section
    $scope.updateEducation = function (index) {
        //creates an array to update each attribute in table
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


    $scope.inputList = [];
    $scope.add = function () {
        $scope.inputList.push({content: ""});
    };
    $scope.remove = function (input) {
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
    $scope.saveNote = function () {
                //save/push to db?
    };



});
