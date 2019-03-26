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

            $scope.contacts = result.data.contacts;
            $scope.reportMonths = result.data.reportMonths;


            //Convert all dates to html format
            let i=0;
            while (i<$scope.postres.length){
                $scope.convertDatesInArrayToHtml($scope.postres[i].education);
                $scope.convertDatesInArrayToHtml($scope.postres[i].employment);
                $scope.convertDatesInArrayToHtml($scope.postres[i].military);
                $scope.convertDatesInArrayToHtml($scope.postres[i].misc);
                $scope.convertDatesInArrayToHtml($scope.postres[i].reports);
                i++;
            }
            $scope.convertDatesInArrayToHtml($scope.contacts);
            $scope.convertDatesInArrayToHtml($scope.reportMonths);

            //select the placement month relative to today's date
            let curMonth =0;
            let today  = new Date();
            i=0;
            while (i < $scope.reportMonths.length)
            {
                if (today > $scope.reportMonths[i].ReportMonthStartDate)
                    curMonth = i;
                i++;
            }

            $scope.selectMonth(curMonth);
            $scope.findStatus();
        },
        //ERROR
        function (result) {
            alert("Error reading PRAP notes");
        }
    );

    $scope.convertDatesInObjectToHtml = function (myObject)
    {
        for (var fieldName in myObject) {
            //Check to see if property name contains Date
            if (fieldName.includes("Date")) {
                if (myObject[fieldName] !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL
                    myObject[fieldName] = convertToHtmlDate(myObject[fieldName]);
                }
                else {
                    myObject[fieldName] = new Date("");
                }
            }
        }
    };

    $scope.convertDatesInArrayToHtml = function( myArray)
    {
        let index = 0;
        while (index < myArray.length) {
            $scope.convertDatesInObjectToHtml(myArray[index]);
            index++;
        }
    };
    $scope.convertDatesInArrayToSql = function( myArray)
    {
        let index = 0;
        while (index < myArray.length) {
            $scope.convertDatesInObjectToSql(myArray[index]);
            index++;
        }
    };
    $scope.convertDatesInObjectToSql = function( myObject)
    {
        for (var fieldName in myObject) {
        //Check to see if property name contains Date
            if (fieldName.includes("Date")) {
                if (myObject[fieldName] !== null) {//IF DATE IS NOT NULL
                myObject[fieldName] = convertToSqlDate(myObject[fieldName]);
                }
                else {
                myObject[fieldName] = "";
                }
            }
        }
    };
    $scope.selectMonth = function(index)
    {
       $scope.current =  $scope.postres[index];
       $scope.currentIndex = index;

       //Find dates of related week
       let dateRange = "";
       let i = 0;
       while (i< $scope.reportMonths.length)
       {
           if($scope.reportMonths[i].ReportMonth == (index+1)) {
               let tempStartDate = convertToSqlDate( $scope.reportMonths[i].ReportMonthStartDate);
               let tempEndDate = convertToSqlDate( $scope.reportMonths[i].ReportMonthEndDate);
               dateRange = tempStartDate + " - " + tempEndDate;
           }
           i++;
       }

       $scope.current.dateRange = dateRange;
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


//-------- REPORTS
    $scope.editReports = false;
    $scope.deleteReport = function (index) {
        $scope.current.reports.splice(index, 1);
    };

    $scope.makeReportsEditable = function () {
        $scope.editReports = true;
        //create backup of tasks
        $scope.reportsBackup = angular.copy($scope.current.reports);
    };

    $scope.cancelReportsUpdate = function () {
        $scope.editReports = false;
        $scope.current.reports = angular.copy($scope.reportsBackup);
    };



    $scope.saveReportsUpdate = function () {
        $scope.editReports = false;
        var numSaved = 0;

        var update = {};
        var updates = [];
        $scope.numSaved = 0;

        // loops for # rows in table
        for (let i = 0; i < $scope.current.reports.length; i++) {
            update = angular.copy($scope.current.reports[i]);
            update.op = "UPDATE";
            updates.push(update);
        }

        //Find deleted reports
        for (let i = 0; i < $scope.reportsBackup.length; i++) {
            let id = $scope.reportsBackup[i].PRReportID;

            let found = false;
            for (let j = 0; j < $scope.current.reports.length; j++) {
                if (id == $scope.current.reports[j].PRReportID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found) {
                update = angular.copy($scope.reportsBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }

        //Send update requests to the server
        for (var j = 0; j < updates.length; j++) {
            var sendData = angular.copy(updates[j]);
            sendData.tbl = 'Report';

            //Convert all Dates to sql format
            for (var fieldName in sendData) {
                //Check to see if property name contains Date
                if (fieldName.includes("Date")) {
                    sendData[fieldName] = convertToSqlDate(sendData[fieldName]);
                }
            }

            //send the json object along with specified table to  update*.php file
            $http({
                method: 'POST',
                url: "./php/postres_update.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    //only show saved message after last task saved.
                    numSaved++;
                    if (numSaved === updates.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].reports = angular.copy(current.reports);
                        alert("Reports Updated");
                    }
                }, function (result) {
                    alert("Error saving Reports");
                });
        }
    };

    $scope.addReport = function () {
        //set flag to show new record
        $scope.showNewReport = true;

        var reportObj = {
            //PRReportID:"",
            fkPlacementID: $scope.current.PlacementID,
            PRReportType:"",
            PRReporterCategory:"",
            PRReportDate: new Date(),
            PRReporterID:"",
            WasContactMade:"0",
            WasMentorInvolved:"0",
            PRReportNote:"",
            op: "ADD",
            tbl: "Report"
        };

        //Clear text
        $scope.tempReport = angular.copy(reportObj);
    };


    $scope.cancelReportCreate = function () {
        $scope.showNewReport = false;
    };

    $scope.showNewReport = false;
    $scope.saveReportCreate = function () {
        $scope.showNewReport = false;

        var sendData = angular.copy($scope.tempReport);

        //convert all dates to SQL
        $scope.convertDatesInObjectToSql(sendData);

        //create data entry using updateContacts.php
        $http({
            method: 'POST',
            url: "./php/postres_update.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                if (response.data)
                //give new entry unique id
                    sendData.PRReportID = response.data.id;

                delete sendData.op;
                delete sendData.tbl;

                $scope.convertDatesInObjectToHtml(sendData);
                $scope.current.reports.push(sendData);
            },
            function (result) {
            });
    };



//-------- CONTACTS
    $scope.editContacts = false;
    $scope.deleteContact = function (index) {
        $scope.contacts.splice(index, 1);
    };

    $scope.makeContactsEditable = function () {
        $scope.editContacts = true;
        //create backup of tasks
        $scope.contactsBackup = angular.copy($scope.contacts);
    };

    $scope.cancelContactsUpdate = function () {
        $scope.editContacts = false;
        $scope.contacts = angular.copy($scope.contactsBackup);
    };



    $scope.saveContactsUpdate = function () {
        $scope.editContacts = false;
        var numSaved = 0;

        var update = {};
        var updates = [];
        $scope.numSaved = 0;

        // loops for # rows in table
        for (let i = 0; i < $scope.contacts.length; i++) {
            update = angular.copy($scope.contacts[i]);
            update.op = "UPDATE";
            updates.push(update);
        }

        //Find deleted reports
        for (let i = 0; i < $scope.contacts.length; i++) {
            let id = $scope.contactsBackup[i].MentorContactID;

            let found = false;
            for (let j = 0; j < $scope.contacts.length; j++) {
                if (id == $scope.contacts[j].MentorContactID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found) {
                update = angular.copy($scope.contactsBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }

        //Send update requests to the server
        for (var j = 0; j < updates.length; j++) {
            var sendData = angular.copy(updates[j]);
            sendData.tbl = 'MentorContacts';

            //Convert all Dates to sql format
            for (var fieldName in sendData) {
                //Check to see if property name contains Date
                if (fieldName.includes("Date")) {
                    sendData[fieldName] = convertToSqlDate(sendData[fieldName]);
                }
            }

            //send the json object along with specified table to  update*.php file
            $http({
                method: 'POST',
                url: "./php/postres_update.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    //only show saved message after last task saved.
                    numSaved++;
                    if (numSaved === updates.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].reports = angular.copy(current.reports);
                        alert("Contacts Updated");
                    }
                }, function (result) {
                    alert("Error saving Contacts");
                });
        }
    };

    $scope.addContact = function () {
        //set flag to show new record
        $scope.showNewContact = true;

        var reportObj = {
            //PRReportID:"",
            fkPlacementID: $scope.current.PlacementID,
            PRReportType:"",
            PRReporterCategory:"",
            PRReportDate: new Date(),
            PRReporterID:"",
            WasContactMade:"0",
            WasMentorInvolved:"0",
            PRReportNote:"",
            op: "ADD",
            tbl: "MentorContacts"
        };

        //Clear text
        $scope.tempContact = angular.copy(reportObj);
    };


    $scope.cancelContactCreate = function () {
        $scope.showNewContact = false;
    };

    $scope.showNewContact = false;
    $scope.saveContactCreate = function () {
        $scope.showNewContact = false;

        var sendData = angular.copy($scope.tempContact);

        //convert all dates to SQL
        $scope.convertDatesInObjectToSql(sendData);

        //create data entry using updateContacts.php
        $http({
            method: 'POST',
            url: "./php/postres_update.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                if (response.data)
                //give new entry unique id
                    sendData.MentorContactID = response.data.id;

                delete sendData.op;
                delete sendData.tbl;

                $scope.convertDatesInObjectToHtml(sendData);
                //$scope.contacts.push(sendData);
            },
            function (result) {
            });
    };

    //--------------------

    //-------- REPORTS
    $scope.editEducation = false;
    $scope.deleteEducation = function (index) {
        $scope.current.education.splice(index, 1);
    };

    $scope.makeEducationEditable = function () {
        $scope.editEducation = true;
        //create backup of tasks
        $scope.educationBackup = angular.copy($scope.current.education);
    };

    $scope.cancelEducationUpdate = function () {
        $scope.editEducation = false;
        $scope.current.education = angular.copy($scope.educationBackup);
    };



    $scope.saveEducationUpdate = function () {
        $scope.editEducation = false;
        var numSaved = 0;

        var update = {};
        var updates = [];
        $scope.numSaved = 0;

        // loops for # rows in table
        for (let i = 0; i < $scope.current.education.length; i++) {
            update = angular.copy($scope.current.education[i]);
            update.op = "UPDATE";
            updates.push(update);
        }

        //Find deleted education
        for (let i = 0; i < $scope.educationBackup.length; i++) {
            let id = $scope.educationBackup[i].PREdID;

            let found = false;
            for (let j = 0; j < $scope.current.education.length; j++) {
                if (id == $scope.current.education[j].PREdID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found) {
                update = angular.copy($scope.educationBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }

        //Send update requests to the server
        for (var j = 0; j < updates.length; j++) {
            var sendData = angular.copy(updates[j]);
            sendData.tbl = 'Education';

            //Convert all Dates to sql format
            for (var fieldName in sendData) {
                //Check to see if property name contains Date
                if (fieldName.includes("Date")) {
                    sendData[fieldName] = convertToSqlDate(sendData[fieldName]);
                }
            }

            //send the json object along with specified table to  update*.php file
            $http({
                method: 'POST',
                url: "./php/postres_update.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    //only show saved message after last task saved.
                    numSaved++;
                    if (numSaved === updates.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].education = angular.copy(current.education);
                        alert("Education Updated");
                    }
                }, function (result) {
                    alert("Error saving Education");
                });
        }
    };

    $scope.addEducation = function () {
        //set flag to show new record
        $scope.showNewEducation = true;

        var educationObj = {
            //PREdID:"",
            fkPlacementID: $scope.current.PlacementID,
            PREdSchoolType:"", 
            PREdStatus:"",
            PREdStartDate: null,
            PREdEndDate: null,
            IsPREdFullTime:"0",
            PREdNote:"",
            op: "ADD",
            tbl: "Education"
        };

        //Clear text
        $scope.tempEducation = angular.copy(educationObj);
    };


    $scope.cancelEducationCreate = function () {
        $scope.showNewEducation = false;
    };

    $scope.showNewEducation = false;
    $scope.saveEducationCreate = function () {
        $scope.showNewEducation = false;

        var sendData = angular.copy($scope.tempEducation);

        //convert all dates to SQL
        $scope.convertDatesInObjectToSql(sendData);

        //create data entry using updateContacts.php
        $http({
            method: 'POST',
            url: "./php/postres_update.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                if (response.data)
                //give new entry unique id
                    sendData.PREdID = response.data.id;

                delete sendData.op;
                delete sendData.tbl;

                $scope.convertDatesInObjectToHtml(sendData);
                $scope.current.education.push(sendData);
            },
            function (result) {
            });
    };

    //-------- EMPLOYMENT
    $scope.editEmployment = false;
    $scope.deleteEmployment = function (index) {
        $scope.current.employment.splice(index, 1);
    };

    $scope.makeEmploymentEditable = function () {
        $scope.editEmployment = true;
        //create backup of tasks
        $scope.employmentBackup = angular.copy($scope.current.employment);
    };

    $scope.cancelEmploymentUpdate = function () {
        $scope.editEmployment = false;
        $scope.current.employment = angular.copy($scope.employmentBackup);
    };



    $scope.saveEmploymentUpdate = function () {
        $scope.editEmployment = false;
        var numSaved = 0;

        var update = {};
        var updates = [];
        $scope.numSaved = 0;

        // loops for # rows in table
        for (let i = 0; i < $scope.current.employment.length; i++) {
            update = angular.copy($scope.current.employment[i]);
            update.op = "UPDATE";
            updates.push(update);
        }

        //Find deleted employment
        for (let i = 0; i < $scope.employmentBackup.length; i++) {
            let id = $scope.employmentBackup[i].PREmpID;

            let found = false;
            for (let j = 0; j < $scope.current.employment.length; j++) {
                if (id == $scope.current.employment[j].PREmpID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found) {
                update = angular.copy($scope.employmentBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }

        //Send update requests to the server
        for (var j = 0; j < updates.length; j++) {
            var sendData = angular.copy(updates[j]);
            sendData.tbl = 'Employment';

            //Convert all Dates to sql format
            for (var fieldName in sendData) {
                //Check to see if property name contains Date
                if (fieldName.includes("Date")) {
                    sendData[fieldName] = convertToSqlDate(sendData[fieldName]);
                }
            }

            //send the json object along with specified table to  update*.php file
            $http({
                method: 'POST',
                url: "./php/postres_update.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    //only show saved message after last task saved.
                    numSaved++;
                    if (numSaved === updates.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].employment = angular.copy(current.employment);
                        alert("Employment Updated");
                    }
                }, function (result) {
                    alert("Error saving Employment");
                });
        }
    };

    $scope.addEmployment = function () {
        //set flag to show new record
        $scope.showNewEmployment = true;

        var employmentObj = {
            //PREmpID:"",
            fkPlacementID: $scope.current.PlacementID,
            PREmployer:"",
            PREmpHireDate:"",
            PREmpHrsPerWeek:"",
            PREmpWageRate:"",
            PREmpWageType:"",
            PREmpWorkStatus:"",
            PREmpPOCPhone:"",
            PREmpPOCName:"",
            IsPREmpSelfEmployed:"0",
            PREmpTermDate:"",
            PREmpTermNote:"",
            PREmpNotes:"",

            op: "ADD",
            tbl: "Employment"
        };

        //Clear text
        $scope.tempEmployment = angular.copy(employmentObj);
    };


    $scope.cancelEmploymentCreate = function () {
        $scope.showNewEmployment = false;
    };

    $scope.showNewEmployment = false;
    $scope.saveEmploymentCreate = function () {
        $scope.showNewEmployment = false;

        var sendData = angular.copy($scope.tempEmployment);

        //convert all dates to SQL
        $scope.convertDatesInObjectToSql(sendData);

        //create data entry using updateContacts.php
        $http({
            method: 'POST',
            url: "./php/postres_update.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                if (response.data)
                //give new entry unique id
                    sendData.PREmpID = response.data.id;

                delete sendData.op;
                delete sendData.tbl;

                $scope.convertDatesInObjectToHtml(sendData);
                $scope.current.employment.push(sendData);
            },
            function (result) {
            });
    };

    //-------- MILITARY
    
    $scope.editMilitary = false;
    $scope.deleteMilitary = function (index) {
        $scope.current.military.splice(index, 1);
    };

    $scope.makeMilitaryEditable = function () {
        $scope.editMilitary = true;
        //create backup of tasks
        $scope.militaryBackup = angular.copy($scope.current.military);
    };

    $scope.cancelMilitaryUpdate = function () {
        $scope.editMilitary = false;
        $scope.current.military = angular.copy($scope.militaryBackup);
    };



    $scope.saveMilitaryUpdate = function () {
        $scope.editMilitary = false;
        var numSaved = 0;

        var update = {};
        var updates = [];
        $scope.numSaved = 0;

        // loops for # rows in table
        for (let i = 0; i < $scope.current.military.length; i++) {
            update = angular.copy($scope.current.military[i]);
            update.op = "UPDATE";
            updates.push(update);
        }

        //Find deleted military
        for (let i = 0; i < $scope.militaryBackup.length; i++) {
            let id = $scope.militaryBackup[i].PRMilID;

            let found = false;
            for (let j = 0; j < $scope.current.military.length; j++) {
                if (id == $scope.current.military[j].PRMilID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found) {
                update = angular.copy($scope.militaryBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }

        //Send update requests to the server
        for (var j = 0; j < updates.length; j++) {
            var sendData = angular.copy(updates[j]);
            sendData.tbl = 'Military';

            //Convert all Dates to sql format
            for (var fieldName in sendData) {
                //Check to see if property name contains Date
                if (fieldName.includes("Date")) {
                    sendData[fieldName] = convertToSqlDate(sendData[fieldName]);
                }
            }

            //send the json object along with specified table to  update*.php file
            $http({
                method: 'POST',
                url: "./php/postres_update.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    //only show saved message after last task saved.
                    numSaved++;
                    if (numSaved === updates.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].military = angular.copy(current.military);
                        alert("Military Updated");
                    }
                }, function (result) {
                    alert("Error saving Military");
                });
        }
    };

    $scope.addMilitary = function () {
        //set flag to show new record
        $scope.showNewMilitary = true;

        var militaryObj = {
            //PRMilID:"",
            fkPlacementID: $scope.current.PlacementID,
            PRMilStatus:"",
            PRMilAffiliation:"",
            IsAGR:"0",
            PRMilEnlistDate:"",
            PRMilDelayedEntryDate:"",
            PRMilDischargeDate:"",
            PRMilNote:"",

            op: "ADD",
            tbl: "Military"
        };

        //Clear text
        $scope.tempMilitary = angular.copy(militaryObj);
    };


    $scope.cancelMilitaryCreate = function () {
        $scope.showNewMilitary = false;
    };

    $scope.showNewMilitary = false;
    $scope.saveMilitaryCreate = function () {
        $scope.showNewMilitary = false;

        var sendData = angular.copy($scope.tempMilitary);

        //convert all dates to SQL
        $scope.convertDatesInObjectToSql(sendData);

        //create data entry using updateContacts.php
        $http({
            method: 'POST',
            url: "./php/postres_update.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                if (response.data)
                //give new entry unique id
                    sendData.PRMilID = response.data.id;

                delete sendData.op;
                delete sendData.tbl;

                $scope.convertDatesInObjectToHtml(sendData);
                $scope.current.military.push(sendData);
            },
            function (result) {
            });
    };

    //-------- REPORTS
    $scope.editMisc = false;
    $scope.deleteMisc = function (index) {
        $scope.current.misc.splice(index, 1);
    };

    $scope.makeMiscEditable = function () {
        $scope.editMisc = true;
        //create backup of tasks
        $scope.miscBackup = angular.copy($scope.current.misc);
    };

    $scope.cancelMiscUpdate = function () {
        $scope.editMisc = false;
        $scope.current.misc = angular.copy($scope.miscBackup);
    };

    $scope.saveMiscUpdate = function () {
        $scope.editMisc = false;
        var numSaved = 0;

        var update = {};
        var updates = [];
        $scope.numSaved = 0;

        // loops for # rows in table
        for (let i = 0; i < $scope.current.misc.length; i++) {
            update = angular.copy($scope.current.misc[i]);
            update.op = "UPDATE";
            updates.push(update);
        }

        //Find deleted misc
        for (let i = 0; i < $scope.miscBackup.length; i++) {
            let id = $scope.miscBackup[i].PRMiscID;

            let found = false;
            for (let j = 0; j < $scope.current.misc.length; j++) {
                if (id == $scope.current.misc[j].PRMiscID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found) {
                update = angular.copy($scope.miscBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }

        //Send update requests to the server
        for (var j = 0; j < updates.length; j++) {
            var sendData = angular.copy(updates[j]);
            sendData.tbl = 'Misc';

            //Convert all Dates to sql format
            for (var fieldName in sendData) {
                //Check to see if property name contains Date
                if (fieldName.includes("Date")) {
                    sendData[fieldName] = convertToSqlDate(sendData[fieldName]);
                }
            }

            //send the json object along with specified table to  update*.php file
            $http({
                method: 'POST',
                url: "./php/postres_update.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    //only show saved message after last task saved.
                    numSaved++;
                    if (numSaved === updates.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].misc = angular.copy(current.misc);
                        alert("Misc Updated");
                    }
                }, function (result) {
                    alert("Error saving Misc");
                });
        }
    };

    $scope.addMisc = function () {
        //set flag to show new record
        $scope.showNewMisc = true;

        var miscObj = {
            //PRMiscID:"",
            fkPlacementID: $scope.current.PlacementID,
            PRMiscPlacementType:"",
            PRMiscStartDate:"",
            PRMiscEndDate:"",
            PRMiscHrs:"",
            PRMiscNote:"",

            op: "ADD",
            tbl: "Misc"
        };

        //Clear text
        $scope.tempMisc = angular.copy(miscObj);
    };


    $scope.cancelMiscCreate = function () {
        $scope.showNewMisc = false;
    };

    $scope.showNewMisc = false;
    $scope.saveMiscCreate = function () {
        $scope.showNewMisc = false;

        var sendData = angular.copy($scope.tempMisc);

        //convert all dates to SQL
        $scope.convertDatesInObjectToSql(sendData);

        //create data entry using updateContacts.php
        $http({
            method: 'POST',
            url: "./php/postres_update.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                if (response.data)
                //give new entry unique id
                    sendData.PRMiscID = response.data.id;

                delete sendData.op;
                delete sendData.tbl;

                $scope.convertDatesInObjectToHtml(sendData);
                $scope.current.misc.push(sendData);
            },
            function (result) {
            });
    };





    /*
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
        $scope.addReportOLD = function()
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
    */
});