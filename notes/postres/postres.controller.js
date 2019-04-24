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
            $scope.mentors = result.data.mentors;
            $scope.reportMonths = result.data.reportMonths;


            //Convert all dates to html format
            let i = 0;
            while (i < $scope.postres.length) {
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
            let curMonth = 0;
            let today = new Date();
            i = 0;
            while (i < $scope.reportMonths.length)
            {
                if (today > $scope.reportMonths[i].ReportMonthStartDate)
                    curMonth = i;
                i++;
            }

            $scope.selectMonth(curMonth);
            $scope.findStatus();

            //create PRReportType dropdown
            $http.get("./php/postres_getReportTypeLookup.php").then(function (response) {
                $scope.ReportTypeOptions = response.data.data;

                var i = 0;
                var max = $scope.ReportTypeOptions.length;
                while (i < max) {
                    $scope.ReportTypeOptions[i].id = i;
                    i++;
                }
            })

            //create PREdStatus dropdown
            $http.get("./php/postres_getSchoolStatusLookup.php").then(function (response) {
                $scope.PREdTypeOptions = response.data.data;

                var i = 0;
                var max = $scope.PREdTypeOptions.length;
                while (i < max) {
                    $scope.PREdTypeOptions[i].id = i;
                    i++;
                }
            })

            //create PREdSchoolType dropdown
            $http.get("./php/postres_getSchoolTypeLookup.php").then(function (response) {
                $scope.PREdSchoolTypeOptions = response.data.data;

                var i = 0;
                var max = $scope.PREdSchoolTypeOptions.length;
                while (i < max) {
                    $scope.PREdSchoolTypeOptions[i].id = i;
                    i++;
                }
            })

            //create MentorContactNoteType dropdown
            $http.get("./php/postres_getMentorContactNoteType.php").then(function (response)
            {
                $scope.NoteTypeOptions = response.data.data;

                var i=0;
                var max = $scope.NoteTypeOptions.length;
                while (i < max)
                {
                    $scope.NoteTypeOptions[i].id= i;
                    i++;
                }
            })

            //create ContactPlacementMonth dropdown
            $http.get("./php/postres_getContactPlacementMonth.php").then(function (response)
            {
                $scope.ContactPlacementMonthOptions = response.data.data;

                var i=0;
                var max = $scope.ContactPlacementMonthOptions.length;
                while (i < max)
                {
                    $scope.ContactPlacementMonthOptions[i].id= i;
                    i++;
                }
            })

            //create report type dropdown
            $http.get("./php/postres_getPRReporterCategory.php").then(function (response)
            {
                $scope.PRReportTypeOptions = response.data.data;

                var i=0;
                var max = $scope.PRReportTypeOptions.length;
                while (i < max)
                {
                    $scope.PRReportTypeOptions[i].id= i;
                    i++;
                }
            })

            //create placement type dropdown
            $http.get("./php/postres_getPlacementType.php").then(function (response)
            {
                $scope.PlacementTypeOptions = response.data.data;

                var i=0;
                var max = $scope.PlacementTypeOptions.length;
                while (i < max)
                {
                    $scope.PlacementTypeOptions[i].id= i;
                    i++;
                }
            })



            $http.get("./php/postres_getStatusLookup.php").then(function (response)
            {
                $scope.CategoryOptions = response.data.data;

                var i=0;
                var max = $scope.CategoryOptions.length;
                while (i < max)
                {
                    $scope.CategoryOptions[i].id= i;////////////////4
                    i++;
                }
            })



            $http.get("./php/postres_getAffiliationLookup.php").then(function (response)
            {
                $scope.CategoryOptions2 = response.data.data;

                var i=0;
                var max = $scope.CategoryOptions2.length;
                while (i < max)
                {
                    $scope.CategoryOptions2[i].id= i;
                    i++;
                }
            })

            $http.get("./php/postres_WageTypeLookup.php").then(function (response)
            {
                $scope.CategoryOptions3 = response.data.data;

                var i=0;
                var max = $scope.CategoryOptions3.length;
                while (i < max)
                {
                    $scope.CategoryOptions3[i].id= i;
                    i++;
                }
            })

            $http.get("./php/postres_WorkStatusLookup.php").then(function (response)
            {
                $scope.CategoryOptions4 = response.data.data;

                var i=0;
                var max = $scope.CategoryOptions4.length;
                while (i < max)
                {
                    $scope.CategoryOptions4[i].id= i;
                    i++;
                }
            })

        },
        //ERROR
        function (result) {
            alert("Error reading PostRes notes");
        }
    );

    //saves selection from PostRes Category dropdown
    $scope.changePostResCategory = function (PostResCategory) {
        if (PostResCategory != null) {
            if(PostResCategory.MilitaryStatus!=undefined)
                $scope.tempMilitary.MilitaryStatus.value= PostResCategory.MilitaryStatus;///////////////////3
            else if(PostResCategory.MilitaryAffiliation!=undefined)
                $scope.tempMilitary.MilitaryAffiliation.value=PostResCategory.MilitaryAffiliation;
            else if(PostResCategory.WageType!=undefined)
                $scope.tempEmployment.WageType.value=PostResCategory.WageType;
            else if(PostResCategory.WorkStatus!=undefined)
                $scope.tempEmployment.WorkStatus.value=PostResCategory.WorkStatus;
        }
    };

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

    $scope.copyPreviousMonth = function(index)
    {
        if(index!= 0) {

            $scope.current =  $scope.postres[index];
            $scope.reportsBackup = angular.copy($scope.current.reports);

            $scope.previous = $scope.postres[index - 1];
            $scope.currentIndex = index;

            $scope.current.fkPlacementID = Number($scope.previous.PlacementID)+1;
            $scope.current.reports = $scope.previous.reports;
            $scope.current.education = $scope.previous.education;
            $scope.current.employment = $scope.previous.employment;
            $scope.current.military = $scope.previous.military;
            $scope.current.misc = $scope.previous.misc;


            let m=0;
            while(m<$scope.previous.reports.length){
                $scope.current.reports[m].fkPlacementID = Number($scope.previous.PlacementID)+1;
                m++;
            }
            m=0;
            while(m<$scope.previous.education.length){
                $scope.current.education[m].fkPlacementID = Number($scope.previous.PlacementID)+1;
                m++;
            }
            m=0;
            while(m<$scope.previous.employment.length){
                $scope.current.employment[m].fkPlacementID = Number($scope.previous.PlacementID)+1;
                m++;
            }
            m=0;
            while(m<$scope.previous.military.length){
                $scope.current.military[m].fkPlacementID = Number($scope.previous.PlacementID)+1;
                m++;
            }
            m=0;
            while(m<$scope.previous.misc.length){
                $scope.current.misc[m].fkPlacementID = Number($scope.previous.PlacementID)+1;
                m++;
            }
        }

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

        if($scope.tempReport.PRReportType.PRReportType!=undefined) {
            //save for dropdown
            sendData.PRReportType = $scope.tempReport.PRReportType.PRReportType;
        }
        //pull month from dropdown
        if($scope.tempReport.PRReporterCategory.PRReporterCategory != undefined)
            sendData.PRReporterCategory=$scope.tempReport.PRReporterCategory.PRReporterCategory;

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
    $scope.saveReportCopies = function () {
        $scope.showNewReport = false;

        var numSaved=0;
        var copy = {};
        var copies = [];

        for (let i = 0; i < $scope.current.reports.length; i++) {
            copy = angular.copy($scope.current.reports[i]);
            copy.op = "ADD";
            copies.push(copy);
        }
        for (var j = 0; j < copies.length; j++) {
            var sendData = angular.copy(copies[j]);
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
                    if (numSaved === copies.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].reports = angular.copy(current.reports);
                        alert("Reports Updated");
                    }
                }, function (result) {
                    alert("Error saving Reports");
                });
        }
    };

    //saves selection from PRReportType dropdown
    $scope.changeReportType = function (Report) {
        if (Report.PRReportType != null) {
            $scope.tempReport.PRReportType.value = Report.PRReportType.PRReportType;
        }
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

            //dropdown
            if(sendData.MentorContactType.MentorContactType != undefined) {
                sendData.MentorContactType = sendData.MentorContactType.MentorContactType;
                $scope.updatedMentorContactType = true;
            }

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
           // MentorContactID:
            fkMentorPotentialID:$scope.mentors[0].MentorPotentialID, //TODO get default Mentors -- the potential mentor should not be empty
            ContactDate: new Date(),
            MentorContactType:"",
            MentorContactNote:"",
            ContactPlacementMonth:$scope.current.PlacementMonth,
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

        //pull MentorContactType from dropdown
        if($scope.contact.MentorContactType.MentorContactType != undefined)
        sendData.MentorContactType=$scope.contact.MentorContactType.MentorContactType;

        //pull month from dropdown
        if($scope.contact.ContactPlacementMonth.ContactPlacementMonth != undefined)
            sendData.ContactPlacementMonth=$scope.contact.ContactPlacementMonth.ContactPlacementMonth;

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
                $scope.contacts.push(sendData);
            },
            function (result) {
            });
    };

    //--------------------

    //-------- Education
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

        if ($scope.tempEducation.PREdStatus.PREdStatus != undefined) {

        //save for dropdown
        sendData.PREdStatus = $scope.tempEducation.PREdStatus.PREdStatus;
        }
        if($scope.tempEducation.PREdSchoolType.PREdSchoolType != undefined)
        sendData.PREdSchoolType = $scope.tempEducation.PREdSchoolType.PREdSchoolType;

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
    $scope.saveEducationCopies = function () {
        $scope.showNewReport = false;

        var numSaved=0;
        var copy = {};
        var copies = [];

        for (let i = 0; i < $scope.current.education.length; i++) {
            copy = angular.copy($scope.current.education[i]);
            copy.op = "ADD";
            copies.push(copy);
        }
        for (var j = 0; j < copies.length; j++) {
            var sendData = angular.copy(copies[j]);
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
                    if (numSaved === copies.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].reports = angular.copy(current.reports);
                        alert("Reports Updated");
                    }
                }, function (result) {
                    alert("Error saving Reports");
                });
        }
    };
    //saves selection from PREdStatus dropdown
    $scope.changeEdStatusType = function (Status) {
        if (Status.PREdStatus != null) {
            $scope.tempEducation.PREdStatus.value = Status.PREdStatus.PREdStatus;
        }
    }
    //saves selection from PREdSchoolType dropdown
    $scope.changeEdSchoolType = function (Type) {
        if (Type.PREdSchoolType != null) {
            $scope.tempEducation.PREdSchoolType.value = Type.PREdSchoolType.PREdSchoolType;
        }
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

        sendData.PREmpWageType=$scope.tempEmployment.WageType.WageType;////////////////////////////2
        sendData.PREmpWorkStatus=$scope.tempEmployment.WorkStatus.WorkStatus;////////////////////////////2



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
    $scope.saveEmploymentCopies = function () {
        $scope.showNewReport = false;

        var numSaved=0;
        var copy = {};
        var copies = [];

        for (let i = 0; i < $scope.current.employment.length; i++) {
            copy = angular.copy($scope.current.employment[i]);
            copy.op = "ADD";
            copies.push(copy);
        }
        for (var j = 0; j < copies.length; j++) {
            var sendData = angular.copy(copies[j]);
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
                    if (numSaved === copies.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].reports = angular.copy(current.reports);
                        alert("Reports Updated");
                    }
                }, function (result) {
                    alert("Error saving Reports");
                });
        }
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

                ////////////////////////////////////////////////////////////////////////////////////////////////////////1.
                //only set new value if not undefined - for dropdown
                if(sendData.PRMilStatus.PRMilStatus != undefined) {

                    sendData.PRMilStatus = sendData.PRMilStatus.PRMilStatus;
                    $scope.updatedReportType = true;
                }
                if(sendData.PRMilAffiliation.PRMilAffiliation != undefined) {

                    sendData.PRMilAffiliation = sendData.PRMilAffiliation.PRMilAffiliation;
                    $scope.updatedReportType = true;
                }

                if(sendData.PREmpWageRate.PREmpWageRate != undefined) {

                    sendData.PREmpWageRate = sendData.PREmpWageRate.PREmpWageRate;
                    $scope.updatedReportType = true;
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

        //save for dropdown
        sendData.PRMilStatus=$scope.tempMilitary.MilitaryStatus.MilitaryStatus;////////////////////////////2
        sendData.PRMilAffiliation=$scope.tempMilitary.MilitaryAffiliation.MilitaryAffiliation;

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
    $scope.saveMilitaryCopies = function () {
        $scope.showNewReport = false;

        var numSaved=0;
        var copy = {};
        var copies = [];

        for (let i = 0; i < $scope.current.military.length; i++) {
            copy = angular.copy($scope.current.military[i]);
            copy.op = "ADD";
            copies.push(copy);
        }
        for (var j = 0; j < copies.length; j++) {
            var sendData = angular.copy(copies[j]);
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
                    if (numSaved === copies.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].reports = angular.copy(current.reports);
                        alert("Reports Updated");
                    }
                }, function (result) {
                    alert("Error saving Reports");
                });
        }
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

        //pull placement type from dropdown
        if($scope.tempMisc.PRMiscPlacementType.PRMiscPlacementType != undefined)
            sendData.PRMiscPlacementType=$scope.tempMisc.PRMiscPlacementType.PRMiscPlacementType;

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
    $scope.saveMiscCopies = function () {
        $scope.showNewReport = false;

        var numSaved=0;
        var copy = {};
        var copies = [];

        for (let i = 0; i < $scope.current.misc.length; i++) {
            copy = angular.copy($scope.current.misc[i]);
            copy.op = "ADD";
            copies.push(copy);
        }
        for (var j = 0; j < copies.length; j++) {
            var sendData = angular.copy(copies[j]);
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
                    if (numSaved === copies.length) {
                        //may not be needed since shallow copy initially
                        //$scope.postres[currentIndex].reports = angular.copy(current.reports);
                        alert("Reports Updated");
                    }
                }, function (result) {
                    alert("Error saving Reports");
                });
        }
    };

    //saves selection from MentorContactNoteType dropdown
    $scope.changeMentorContactNoteType = function (MentorContactType) {
        if (MentorContactType != null) {
            $scope.contact.MentorContactType.value = MentorContactType.MentorContactType;
        }
    };


    //saves selection from ContactPlacementMonth dropdown
    $scope.changeContactPlacementMonth = function (ContactPlacementMonth) {
        if (ContactPlacementMonth != null) {
            $scope.contact.ContactPlacementMonth.value = ContactPlacementMonth;
        }
    };

    //changed from contact to tempContact

    //saves selection from category dropdown
    $scope.changePRReporterCategory = function (PRReporterCategory) {
        if (PRReporterCategory != null) {
            $scope.tempReport.PRReporterCategory.value = PRReporterCategory;
        }
    };

    //saves selection from placement type dropdown
    $scope.changePlacementType = function (PRMiscPlacementType) {
        if (PRMiscPlacementType != null) {
            $scope.tempMisc.PRMiscPlacementType.value = PRMiscPlacementType;
        }
    };

});