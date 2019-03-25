//File: prap.controller.js
// Used with: prap.view.html

angular.module('notes.prap').controller('prapController', function ($scope, $http, $window) {

    $scope.NotEditable = true;

    // called when cancel in notes section is clicked
    $scope.cancelNotes = function () {
        // input no longer editable
        $scope.NotEditable = true;
        // retrieve backed up notes
        $scope.prapNotes = angular.copy($scope.prapNotesBackup);
        // alert user
        alert("Notes cancelled");
    };

    // called when cancel in Mentor Contacts section is clicked
    $scope.cancelMentorContacts = function () {
        // input no longer editable
        $scope.NotEditable = true;
        //retrieve backed up mentor contact info
        $scope.mentorContacts = angular.copy($scope.mentorContactsBackup);
        // alert user
        alert("Mentor Contacts Cancelled");
    };

    // called when cancel in Action Plan and Goals section is clicked
    $scope.cancelActionPlanAndGoals = function () {
        // input no longer editable
        $scope.NotEditable = true;
        //retrieve backed up action plan info
        $scope.cadetClass = angular.copy($scope.cadetClassBackup);
        // alert user
        alert("Action Plan Cancelled");
    };

    // called when edit button is clicked. backs up current data and makes input uneditable
    $scope.editSection = function () {
        $scope.NotEditable = !$scope.NotEditable;
        $scope.prapNotesBackup = angular.copy($scope.prapNotes);
        $scope.mentorContactsBackup = angular.copy($scope.mentorContacts);
        // back up info in Action Plan and Goals
        $scope.cadetClassBackup = angular.copy($scope.cadetClass);
    };

    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    // alert("Test  with Cadet 12 -  Da'jour\tCalloway to see sample dates");


    var cadet = {CadetID: $scope.cadetID};


    $scope.saveNotes = function () {
        var update = {};
        var updates = [];
        $scope.numSaved = 0;

        //Find new and updated appts
        for (let i = 0; i < $scope.prapNotes.length; i++) {
            update = angular.copy($scope.prapNotes[i]);
            update.op = "UPDATE";
            updates.push(update);
        }

        //send updates to php file:
        for (let index = 0; index < updates.length; index++) {
            var test = Object.toparams(updates[index]);
            var req = $http({
                method: 'POST',
                url: './php/prap_updateNotes.php',
                data: Object.toparams(updates[index]),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                //SUCESS
                function (result) {
                    // notes updated
                    alert("saving: " + JSON.stringify(result));
                    $scope.numSaved++;
                    if ($scope.numSaved == $scope.prapNotes.length)
                        alert("all saved");
                },
                //ERROR
                function (result) {
                    alert("Error updating record" + JSON.stringify(result));
                });
        }
        ;

    };

    // called when save is clicked in notes section
    //   $scope.saveNotes = function () {
    /*   var update = {};
       var updates = [];
       $scope.numSaved = 0;*/
    // loops for # rows in table
    /*  for (var j = 0; j < $scope.prapNotes.length; j++) {
          // copy current row
          update = angular.copy($scope.prapNotes[j]);
          update.op = "UPDATE";
          updates.push(update);
      } */
    //update using prap_updateNotes.php
    /* for (let index = 0; index < updates.length; index++) {
         var test = Object.toparms(updates[index]);
         var req = $http({
             method: 'POST',
             url: "./php/prap_updateNotes.php",
             data: Object.toparams(updates[index]),
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(
             function (result) {
                 $scope.numSaved++;
                 if ($scope.numSaved == $scope.prapNotes.length)
                     alert("updated: [prap_updateNotes.php" + JSON.stringify(response));
                 //  alert("data updated");
             }, function (result) {
                 alert("Failed");
             });
     };

 };
*/

    $scope.addMentorContactNote = function () {
        var contactNote = {
            fkMentorPotentialID: $scope.mentorContacts.MentorPotentialID,
            CadetID: $scope.CadetID,
            ContactDate: "",
            //MentorName: "",
            MentorContactType: "",
            MentorContactNote: "",
            ContactPlacementMonth: "",
            op: "ADD"
        };


        $http({
            method: 'POST',
            url: './php/prap_updateContacts.php',
            data: Object.toparams(contactNote),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //  SUCESS
            function (result) {

                contactNote.fkMentorPotentialID = result.data.id;
                var nextIndex = $scope.mentorContacts.length;
                delete  contactNote.op;

                $scope.mentorContacts[nextIndex] = angular.copy(contactNote);
                //$scope.mentorContactsBackup.push(angular.copy(contactNote));
            },

            //  ERROR
            function (result) {
                alert("Error updating record" + JSON.stringify(result));
            });

    };

    // function to send mentor contacts data to prap_updateContacts.php to save data to tblMentorContacts in database
    $scope.saveContacts = function () {
        var update = {};
        var updates = [];
        $scope.numSaved = 0;

        // loops for # rows in table
        for (let i = 0; i < $scope.mentorContacts.length; i++) {
            update = angular.copy($scope.mentorContacts[i]);
            update.op = "UPDATE";
            updates.push(update);
        }

        // send updates to php file
        for (let index = 0; index < updates.length; index++) {
            var test = Object.toparams(updates[index]);
            var req = $http({
                method: 'POST',
                url: "./php/prap_updateContacts.php",
                data: Object.toparams(updates[index]),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                //SUCCESS
                function (result) {
                    alert("saving: " + JSON.stringify(result));
                    $scope.numSaved++;
                    if ($scope.numSaved == $scope.mentorContacts.length)
                        alert("all saved");
                },
                //ERROR
                function (result) {
                    alert("Error updating record" + JSON.stringify(result));
                });
        }
        //alert("contacts updated");
    };
    //OLD VERSION
    /*$scope.saveContacts = function () {
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

    // called when save in Action Plan function is clicked
    $scope.savePlan = function () {

        var sendData = angular.copy($scope.cadetClass);
        alert(JSON.stringify(sendData));
        //update using prap_updatePlan.php
        $http({
            method: 'POST',
            url: "./php/prap_updatePlan.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                alert("updated: [prap_updatePlan.php" + JSON.stringify(response));
                //alert("data updated");
            }, function (result) {
                alert("Failed");
            });
        alert("plan updated");
    };*/

    // called when save button in Goals section is clicked

// ------ MENTOR CONTACTS
    $scope.editContacts = false;
    $scope.deleteContact = function (index)
    {
        $scope.mentorContacts.splice(index,1);
    };


    $scope.makeContactsEditable = function () {
        $scope.editContacts = true;
        //create backup of tasks
        $scope.contactsBackup = angular.copy($scope.mentorContacts);
    };

    $scope.cancelContactsUpdate = function () {
        $scope.editContacts = false;
        $scope.mentorContacts = angular.copy($scope.contactsBackup);
    };

    $scope.saveContactsUpdate = function () {
        $scope.editContacts = false;
        var numSaved = 0;

        var updates = angular.copy($scope.mentorContacts);

        //Find deleted contacts
        for (let i = 0; i < $scope.contactsBackup.length; i++) {
            let id = $scope.contactsBackup[i].MentorContactID;

            let found = false;
            for (let j = 0; j < $scope.mentorContacts.length; j++) {
                if (id == $scope.mentorContacts[j].MentorContactID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found) {
                var update = angular.copy($scope.contactsBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }


        //Send update requests to the server
        for (var j = 0; j < updates.length; j++) {
            var sendData = angular.copy(updates[j]);
            delete sendData.fkCadetID;
            delete sendData.fkClassID;

            //Convert all Dates to sql format
            for (var fieldName in sendData) {
                //Check to see if property name contains Date
                if (fieldName.includes("Date")) {
                    sendData[fieldName] = convertToSqlDate(sendData[fieldName]);
                }
            }

            //send the json object to the correct update*.php file
            $http({
                method: 'POST',
                url: "./php/prap_updateContacts.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    //only show saved message after last task saved.
                    numSaved++;
                    if (numSaved === updates.length)
                        alert("Contacts Updated");
                }, function (result) {
                    alert("Error saving Contacts");
                });
        }
    };

    //---------- ACTION PLAN AND GOALS

    $scope.editGoals = false;

    $scope.makeGoalsEditable = function () {
        $scope.editGoals = true;
        //create backup of tasks
        $scope.goalsBackup = angular.copy($scope.cadetClass);
    };

    $scope.cancelGoalsUpdate = function () {
        $scope.editGoals = false;
        $scope.cadetClass = angular.copy($scope.goalsBackup);
    };


    $scope.saveGoalsUpdate = function () {
        $scope.editGoals = false;

        var update = angular.copy($scope.cadetClass);

        //Convert all Dates to sql format
        for (var fieldName in update) {
            //Check to see if property name contains Date
            if (fieldName.includes("Date")) {
                update[fieldName] = convertToSqlDate(update[fieldName]);
            }
        }

        //Send action plan to server
        $http({
            method: 'POST',
            url: "./php/prap_updatePlan.php",
            data: Object.toparams(update),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                alert("Goals Updated.");

            }, function (result) {
                alert("Error Updating Goals");
            });

        //Send goals to server
        $http({
            method: 'POST',
            url: "./php/prap_updateGoals.php",
            data: Object.toparams(update),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                alert("Goals Updated.");

            }, function (result) {
                alert("Error Updating Goals");
            });

    };


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
    var taskGetCadetClassDetails = $http({
        method: 'POST',
        url: './php/prap_getCadetClassDetails.php',
        data: Object.toparams(cadet),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    taskGetPrapNotes.then(
        //SUCCESS
        function (result) {
            //   alert(JSON.stringify(result));
            $scope.prapNotes = result.data.data;


            for (var i = 0; i < $scope.prapNotes.length; i++) {

                //Convert Date to be displayed in html

                for (var fieldName in $scope.prapNotes[i]) {
                    //Check to see if property name contains Date
                    if (fieldName.includes("Date")) {

                        if ($scope.prapNotes[i][fieldName] !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL


                            $scope.prapNotes[i][fieldName] = convertToHtmlDate($scope.prapNotes[i][fieldName]);
                        }
                        else {
                            $scope.prapNotes[i][fieldName] = new Date("");
                        }
                    }
                }

                //Add Created By Name to each Note
                if ($scope.prapNotes[i].NoteCreatorID.length > 0) {
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
                            var obj = result.data.data[0];
                            var myIndex = result.data.index;

                            if (obj)
                                $scope.prapNotes[myIndex].NoteCreatedByName = obj.PersonLN + ", " + obj.PersonFN;
                        }
                    )
                }
                ;

                //Add NoteEditedByName to each Note
                if ($scope.prapNotes[i].NoteEditorID.length > 0) {
                    var index = i;
                    var nameRequest = {PersonID: $scope.prapNotes[i].NoteEditorID, index: index};
                    //Get NoteCreatedByName
                    $http({
                        method: 'POST',
                        url: './php/prap_getPersonName.php',
                        data: Object.toparams(nameRequest),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(
                        //SUCCESS
                        function (result) {
                            var obj = result.data.data[0];
                            var myIndex = result.data.index;

                            if (obj)
                                $scope.prapNotes[myIndex].NoteEditedByName = obj.PersonLN + ", " + obj.PersonFN;
                        }
                    )
                }
            }
        },
        //ERROR
        function (result) {
            alert("Error reading PRAP notes");
        }
    );

    taskGetCadetMentorContacts.then(
        //SUCCESS
        function (result) {
            $scope.mentorContacts = result.data.data;


            //Fillin the MentorName
            for (var i = 0; i < $scope.mentorContacts.length; i++) {

                //Convert all dates to html format
                for (var fieldName in $scope.mentorContacts[i]) {
                    //Check to see if property name contains Date
                    if (fieldName.includes("Date")) {

                        if ($scope.mentorContacts[i][fieldName] !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL


                            $scope.mentorContacts[i][fieldName] = convertToHtmlDate($scope.mentorContacts[i][fieldName]);
                        }
                        else {
                            $scope.mentorContacts[i][fieldName] = new Date("");
                        }
                    }
                }


                if ($scope.mentorContacts[i].fkMentorID.length > 0) {
                    var index = i;
                    var nameRequest = {MentorID: $scope.mentorContacts[i].fkMentorID, index: index};
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
        function (result) {
            alert("Error reading CadetMentorContacts");

        }
    );


    taskGetCadetClassDetails.then(
        //SUCESS
        function (result) {
            $scope.cadetClass = result.data.data[0];
            //alert(JSON.stringify($scope.cadetClass));

            //Convert all dates to html format
            for (var fieldName in $scope.cadetClass) {
                //Check to see if property name contains Date
                if (fieldName.includes("Date")) {

                    if ($scope.cadetClass[fieldName] !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL


                        $scope.cadetClass[fieldName] = convertToHtmlDate($scope.cadetClass[fieldName]);
                    }
                    else {
                        $scope.cadetClass[fieldName] = new Date("");
                    }
                }
            }

        },
        //ERROR
        function (result) {
            alert("Error reading Cadet Class Details." + JSON.stringify(result));
        }
    )


    angular.module('notes.prap').filter('seedate', function ($filter) {
        return function (input) {
            if (input == null) {
                return "";
            }
            alert(input);
            var _date = $filter('date')(new Date(input), 'MMM dd yyyy');

            return _date.toUpperCase();

        };
    });

//add and remove note functions
    $scope.inputList = [];
    $scope.remove = function (input) {
        var idx = $scope.inputList.indexOf(input);
        $scope.inputList.splice(idx, 1);
    };

    /*******************************************************************************************/

// function to save a new note inserted into the database
    $scope.saveNewNote = function () {
        alert("hi");
        var sendData = angular.copy($scope.prapNotes);
        alert(JSON.stringify(sendData));

        //update using prap_addNote.php
        $http({
            method: 'POST',
            url: "./php/prap_addNote.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                alert("updated: [prap_addNote.php" + JSON.stringify(response));
                alert("data updated");
            }, function (result) {
                alert("Failed");
            });
        alert("notes updated");
    };

    /******************************************************************************************/


    $scope.addNote = function () {
        alert("in add note");
        //TODO store NoteEditorID and NoteCreatedByID as userID
        //TODO  store userID in when logging in
        //TODO NoteCreatedDate and NoteEditedDate should be todays date

        var note = {
            GenNoteID: "",
            fkClassDetailID: $scope.cadetClass.ClassDetailID,
            CadetID: $scope.cadetID,
            GenNoteTopic: "PRAP",
            GenNote: "",
            NoteCycle: "",
            NoteCreatorID: "",
            NoteCreatedDate: "",
            NoteEditorID: "",
            NoteEditedDate: "",
            TrackerCode: "",
            op: "ADD"
        };

        $http({
            method: 'POST',
            url: './php/prap_updateNotes.php',
            data: Object.toparams(note),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCESS
            function (result) {

                note.GenNoteID = result.data.id;
                var nextIndex = $scope.prapNotes.length;
                delete  note.op;

                $scope.prapNotes[nextIndex] = angular.copy(note);
                //$scope.backup_note.push( angular.copy(note));
            },

            //ERROR
            function (result) {
                alert("Error updating record" + JSON.stringify(result));
            });

    };
// this function adds a new row to te Notes table
    /*$scope.addNote = function () {

        var note={
            NoteCreatedDate: "",
            NoteEditedDate:"",
            fkClassDetailID: $scope.cadetClass.ClassDetailID,
            GenNote:"",
            GenNoteID:"",
            NoteEditorID: "",
            NoteCreatorID: "",
            GenNoteTopic: "PRAP",
            CadetID:$scope.CadetID,
            NoteCycle:"",
            TrackerCode:"",
            op:"ADD"
        };

        $http({
            method: 'POST',
            url: './php/prap_updateNotes.php',
            data: Object.toparams(note),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //  SUCESS
            function (result) {

                note.GenNoteID = result.data.id + "";
                var nextIndex = $scope.prapNotes.length;
                delete note.op;
              //  note.ClassDetailID=note.fkClassDetailID;
                //delete note.fkClassDetailID;
               // note.CadetID = $scope.CadetID;

                $scope.prapNotes[nextIndex] = angular.copy(note);
               // $scope.prapNotesBackup.push(angular.copy(note));
            },

            //  ERROR
            function (result) {
                alert("Error updating record" + JSON.stringify(result));
            });
    }; */

    $scope.deleteNote = function (index) {
        var sendData = $scope.prapNotes[index];

        //Creates a list without the removed notes then re renders it.
        var listWithoutDelete = $scope.prapNotes;
        listWithoutDelete.splice(index, 1);
        angular.copy(listWithoutDelete);

        alert(JSON.stringify(sendData));
        sendData.op = "DELETE";

        $http({
            method: 'POST',
            url: "./php/prap_updateNotes.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                alert("updated: prap_updateNotes.php" + JSON.stringify(response));
                alert("Data deleted");
            }, function (result) {
                alert("Failed");
            });

    };
});