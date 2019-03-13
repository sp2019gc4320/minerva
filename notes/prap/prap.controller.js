//File: prap.controller.js
// Used with: prap.view.html

angular.module('notes.prap').controller('prapController', function($scope, $http, $window){

    $scope.NotEditable=true;

    // Deletes the contact/note next to the clicked button

    $scope.deleteContact=function(index)
    {
        var sendData = $scope.mentorContacts[index];
        alert(JSON.stringify(sendData));
        sendData.op = "DELETE";

        $http({
            method: 'POST',
            url: "./php/prap_updateContacts.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                alert("updated: prap_updateContacts.php" + JSON.stringify(response));
                alert("Data deleted");
            }, function (result) {
                alert("Failed");
            });

    };

    // called when cancel in notes section is clicked
    $scope.cancelNotes=function()
    {
        // input no longer editable
        $scope.NotEditable=true;
        // retrieve backed up notes
        $scope.prapNotes=angular.copy($scope.prapNotesBackup);
        // alert user
        alert("Notes cancelled");
    };

    // called when cancel in Mentor Contacts section is clicked
    $scope.cancelMentorContacts=function()
    {
        // input no longer editable
        $scope.NotEditable=true;
        //retrieve backed up mentor contact info
        $scope.mentorContacts=angular.copy($scope.mentorContactsBackup);
        // alert user
        alert("Mentor Contacts Cancelled");
    };

    //this might be wrong this is template for contact info
    $scope.contact={
            fkMentorPotentialID: "1",
            ContactDate:"1",
            MentorName: "1",
            MentorContactType:"1",
            MentorContactNote:"1",
            op:"ADD"
    }; //-------------------------------------------------------------------------------------------------------------------------------------------------



    // called when cancel in Action Plan and Goals section is clicked
    $scope.cancelActionPlanAndGoals=function()
    {
        // input no longer editable
        $scope.NotEditable=true;
        //retrieve backed up action plan info
        $scope.cadetClass=angular.copy($scope.cadetClassBackup);
        // alert user
        alert("Action Plan Cancelled");
    };

    // called when edit button is clicked. backs up current data and makes input uneditable
    $scope.editSection=function()
    {
        $scope.NotEditable= !$scope.NotEditable;
        $scope.prapNotesBackup=angular.copy($scope.prapNotes);
        $scope.mentorContactsBackup=angular.copy($scope.mentorContacts);
        // back up info in Action Plan and Goals
        $scope.cadetClassBackup=angular.copy($scope.cadetClass);
    };

    //$scope.cadetID = "12"; //with data
    //alert("setting cadetID to for testing " +$scope.cadetID);
    //Create Local Storage for catagory of file to forward to database
    $window.localStorage.setItem("PRAP","PRAP");
    $scope.fileTypes=$window.localStorage.getItem("PRAP");
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    alert("Test  with Cadet 12 -  Da'jour\tCalloway to see sample dates");


    var cadet = {CadetID: $scope.cadetID};

    // called when save is clicked in notes section
    $scope.saveNotes = function () {
        // loops for # rows in table
        for (var j = 0; j < $scope.prapNotes.length; j++) {
            // copy current row
            var sendData = angular.copy($scope.prapNotes[j]);
            alert(JSON.stringify(sendData));

            //update using prap_updateNotes.php
            $http({
                method: 'POST',
                url: "./php/prap_updateNotes.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    alert("updated: [prap_updateNotes.php" + JSON.stringify(response));
                    alert("data updated");
                }, function (result) {
                    alert("Failed");
                });
        }
        alert("notes updated");
    };
    // function to send mentor contacts data to prap_updateContacts.php to save data to tblMentorContacts in database
    $scope.saveContacts = function () {
        var sendData = {};
        var updates = [];
        // loops for # rows in table
        for (var j = 0; j < $scope.mentorContacts.length; j++) {
            // copy current row
            sendData = angular.copy($scope.mentorContacts[j]);
            let id = $scope.mentorContacts[j].fkMentorPotentialID;
            alert(JSON.stringify(sendData));

            if (id=="") {
                sendData.op = "ADD";
            }
            else {
                sendData.op = "UPDATE";
            }
            updates.push(sendData);
        }
        //Find deleted notes
        for (let i =0; i< $scope.mentorContactsBackup.length; i++) {
            let id = $scope.mentorContactsBackup[i].fkMentorPotentialID;

            let found = false;
            for(let j =0; j< $scope.mentorContacts.length; j++) {
                if (id == $scope.mentorContacts[j].fkMentorPotentialID)
                    found = true;
            }
            if (!found){
                sendData = angular.copy($scope.mentorContactsBackup[i]);
                sendData.op = "DELETE";
                updates.push(sendData);
            }
        }
        // send updates to php file
        for (let index = 0; index < updates.length; index++) {
            $http({
                method: 'POST',
                url: "./php/prap_updateContacts.php",
                data: Object.toparams(updates[index]),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    alert("updated: [prap_updateContacts.php" + JSON.stringify(response));
                    //alert("data updated");
                }, function (result) {
                    alert("Failed");
                });
        }
        alert("contacts updated");
    };

    $scope.addMentorContactNote = function()
    {
        var contactNote={
            fkMentorPotentialID: 308,//===========================================================================================================
            ContactDate:"",
            MentorName: "",
            MentorContactType:"",
            MentorContactNote:"",
            op:"ADD"
        };

        $http({
            method: 'POST',
            url: './php/prap_updateContacts.php',
            data: Object.toparams(contactNote),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //  SUCESS
          function (result) {

    //1. Get Cadet's PRAP Notes
    var taskGetPrapNotes = $http({
        method: 'POST',
        url: './php/prap_getPrapNotes.php',
        data: Object.toparams(cadet),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    //2. Get Mentor Contacts
    var taskGetCadetMentorContacts = $http({
        method: 'POST',
        url: './php/prap_getCadetMentorContacts.php',
        data: Object.toparams(cadet),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    //3 GEt Cadet Class Details
    var taskGetCadetClassDetails =$http({
        method: 'POST',
        url: './php/prap_getCadetClassDetails.php',
        data: Object.toparams(cadet),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    taskGetPrapNotes.then(
        //SUCCESS
        function(result) {
            alert(JSON.stringify(result));
            $scope.prapNotes = result.data.data;

    taskGetPrapNotes.then(
        //SUCCESS
        function(result) {
            alert(JSON.stringify(result));
            if (result.data.data.length > 0) {
                $scope.prapNotes = result.data.data[0];

                //Add Created By Name to each Note
                for (var i=0; i< $scope.prapNotes.length; i++) {
                    if($scope.prapNotes[i].NoteCreatorID.length > 0)
                    {
                        var index = i;
                        var nameRequest = {PersonID: $scope.prapNotes[i].NoteCreatorID, index: index};
                        //Get NoteCreatedByName
                        $http({
                            method: 'POST',
                            url: './php/prap_getPersonName.php',
                            data: Object.toparams(nameRequest),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(
                            //SUCCESS
                            function (result) {
                                var obj =result.data.data[0];
                                var myIndex = result.data.index;

                                if(obj)
                                    $scope.prapNotes[myIndex].NoteCreatedByName = obj.PersonLN+", "+obj.PersonFN;
                            }
                        )};

                    //Add NoteEditedByName to each Note
                    if($scope.prapNotes[i].NoteEditorID.length > 0)
                    {
                        var index = i;
                        var nameRequest = {PersonID: $scope.prapNotes[i].NoteEditorID, index:index};
                        //Get NoteCreatedByName
                        $http({
                            method: 'POST',
                            url: './php/prap_getPersonName.php',
                            data: Object.toparams(nameRequest),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(
                            //SUCCESS
                            function (result) {
                                var obj =result.data.data[0];
                                var myIndex = result.data.index;

                                if(obj)
                                    $scope.prapNotes[myIndex].NoteEditedByName = obj.PersonLN+", "+obj.PersonFN;
                            }
                        )}
                }

            }
        },
        //ERROR
        function(result){
            alert("Error reading PRAP notes");
        }
    );

    taskGetCadetMentorContacts.then(
        //SUCCESS
        function(result){
            $scope.mentorContacts = result.data.data;

            //Fillin the MentorName
            for (var i=0; i< $scope.mentorContacts.length; i++) {
                if ($scope.mentorContacts[i].fkMentorID.length > 0) {
                    var index = i;
                    var nameRequest = {MentorID: $scope.mentorContacts[i].fkMentorID, index:index};
                    //Get NoteCreatedByName
                    $http({
                        method: 'POST',
                        url: './php/prap_getMentorName.php',
                        data: Object.toparams(nameRequest),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(
                        //SUCCESS
                        function (result) {
                            var obj = result.data.data[0];
                            var myIndex = result.data.index;

                            if (obj)
                                $scope.mentorContacts[myIndex].MentorName = obj.PersonLN + ", " + obj.PersonFN;
                        }
                    )
                }
            }
        },
        //ERROR
        function(result){
            alert("Error reading CadetMentorContacts");

        }
    );

            //send updates to php file:
            for (let index = 0; index < updates.length; index++) {
                var taskSaveAppts = $http({
                    method: 'POST',
                    url: './php/mentor_updateAppts.php',
                    data: Object.toparams(updates[index]),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });

    taskGetCadetClassDetails.then(
        //SUCESS
        function(result){
            $scope.cadetClass = result.data.data[0];
            //alert(JSON.stringify($scope.cadetClass));

        },
        //ERROR
        function(result){
            alert("Error reading Cadet Class Details." + JSON.stringify(result));
        }
    )

        //all other updates besides appts
        else {

            if (section == "info") {
                $scope.editMentorInfo = false;
                //there may be more than one mentor:
                $scope.backup_info = [];
                for (let i = 0; i < $scope.mentors.length; i++) {
                    $scope.backup_info[i] = $scope.getPartialBackup($scope.infoFields, $scope.mentors[i]);
                    update = angular.copy($scope.backup_info[i]);
                    updates.push(update);
                }
            }
            else if (section == "personal") {
                $scope.editPersonal = false;
                $scope.backup_personal = $scope.getPartialBackup($scope.personalFields, $scope.mentors[$scope.mentorIndex]);
                update = angular.copy($scope.backup_personal);
                updates.push(update);
            }
            else if (section == "dates") {
                $scope.calculateMatchDate();
                $scope.editDates = false;
                $scope.backup_dates = $scope.getPartialBackup($scope.datesFields, $scope.mentors[$scope.mentorIndex]);
                update = angular.copy($scope.backup_dates);
                updates.push(update);
            }
            else if (section == "endInfo"){
                $scope.editEndInfo = false;
                $scope.backup_endInfo = $scope.getPartialBackup($scope.endInfoFields, $scope.mentors[$scope.mentorIndex]);
                update = angular.copy($scope.backup_endInfo);
                updates.push(update);
            }

            //send  tblMentorPotenial updates to php file:
            for (let index = 0; index < updates.length; index++) {
                updates[index].MentorPotentialID = $scope.mentors[index].MentorPotentialID;

                var taskSaveUpdates = $http({
                    method: 'POST',
                    url: './php/mentorStatus_update.php',
                    data: Object.toparams(updates[index]),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });

                taskSaveUpdates.then(
                    //SUCESS
                    function (result) {
                        //alert("records updated");
                    },
                    //ERROR
                    function (result) {
                        alert("Error updating record" + JSON.stringify(result));
                    });
            }
        }//else
    };

});
angular.module('notes.prap').filter('seedate', function($filter)
 return function(input)
 {
  if(input == null){ return ""; } 
    alert(input);
  var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
 
  return _date.toUpperCase();

 };

});
    {
        return function(input)
        {
            if(input == null){ return ""; } 
            alert(input);
            var _date = $filter('date')(new Date(input), 'MMM dd yyyy');

            return _date.toUpperCase();

        };
    });
