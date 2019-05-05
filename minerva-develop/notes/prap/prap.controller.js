//File: prap.controller.js
// Used with: prap.view.html

angular.module('notes.prap').controller('prapController', function ($scope, $http, $window) {


    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    // alert("Test  with Cadet 12 -  Da'jour\tCalloway to see sample dates");


    var cadet = {CadetID: $scope.cadetID};

/*
    $scope.saveNotesOLD = function () {
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
    */
/*

    $scope.addMentorContactNoteOLD = function () {
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
    */
/*
    // function to send mentor contacts data to prap_updateContacts.php to save data to tblMentorContacts in database
    $scope.saveContactsOLD = function () {
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
*/

    //----------- NOTES

    $scope.editNotes = false;
    $scope.deleteNote = function (index) {
        $scope.prapNotes.splice(index, 1);
    };

    $scope.makeNotesEditable = function () {
        $scope.editNotes = true;
        //create backup of tasks
        $scope.notesBackup = angular.copy($scope.prapNotes);
    };

    $scope.cancelNotesUpdate = function () {
        $scope.editNotes = false;
        $scope.prapNotes = angular.copy($scope.notesBackup);
    };
    $scope.saveNotesUpdate = function () {
        $scope.editNotes = false;
        var numSaved = 0;

        var update = {};
        var updates = [];
        $scope.numSaved = 0;

        // loops for # rows in table
        for (let i = 0; i < $scope.prapNotes.length; i++) {
            update = angular.copy($scope.prapNotes[i]);
            update.op = "UPDATE";
            updates.push(update);
        }

        //Find deleted contacts
        for (let i = 0; i < $scope.notesBackup.length; i++) {
            let id = $scope.notesBackup[i].GenNoteID;

            let found = false;
            for (let j = 0; j < $scope.prapNotes.length; j++) {
                if (id == $scope.prapNotes[j].GenNoteID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found) {
                update = angular.copy($scope.notesBackup[i]);
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
                url: "./php/prap_updateNotes.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    //only show saved message after last task saved.
                    numSaved++;
                    if (numSaved === updates.length)
                        alert("Notes Updated");
                }, function (result) {
                    alert("Error saving Notes");
                });
        }
    };


// ------ MENTOR CONTACTS
    $scope.editContacts = false;
    $scope.deleteContact = function (index) {
        $scope.mentorContacts.splice(index, 1);
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

    // function to send mentor contacts data to prap_updateContacts.php to save data to tblMentorContacts in database
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

        update.PRAPCategory=$scope.cadetClass.PRAPCategory.PRAPCategory;

        //dropdown
        $scope.cadetClass.PRAPCategory = $scope.cadetClass.PRAPCategory.PRAPCategory;

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
                if($scope.prapNotes[i].NoteEditorID == null)
                    $scope.prapNotes[i].NoteEditorID ="";
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

            //create CategoryType dropdown
            $http.get("./php/prap_getCategory.php").then(function (response)
            {
                $scope.CategoryOptions = response.data.data;

                var i=0;
                var max = $scope.CategoryOptions.length;
                while (i < max)
                {
                    $scope.CategoryOptions[i].id= i;
                    i++;
                }
            })

        },
        //ERROR
        function (result) {
            alert("Error reading Cadet Class Details." + JSON.stringify(result));
        }
    );

/*
// function to save a new note inserted into the database
    $scope.saveNewNoteOLD = function () {
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
*/
    /******************************************************************************************/
/*

    $scope.addNoteOLD = function () {
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
            },

            //ERROR
            function (result) {
                alert("Error updating record" + JSON.stringify(result));
            });
    };
*/
//---------------------------------------
//create new record for prapNote
    $scope.addNote = function () {
        //TODO store NoteEditorID and NoteCreatedByID as userID
        //TODO  store userID in when logging in
        //set flag to show new record
        $scope.showNewNote = true;

        var note = {
            GenNoteID: "",
            fkClassDetailID: $scope.cadetClass.ClassDetailID,
            CadetID: $scope.cadetID,
            GenNoteTopic: "PRAP",
            GenNote: "",
            NoteCycle: "",
            NoteCreatorID: "",
            NoteCreatedDate: new Date(),
            NoteEditorID: "",
            NoteEditedDate: new Date(),
            TrackerCode: "",
            op: "ADD"
        };
        //Clear text
        $scope.tempNote = angular.copy(note);

    };

    $scope.cancelNoteCreate = function () {
        $scope.showNewNote = false;
    };

    $scope.showNewNote = false;
    $scope.saveNoteCreate = function () {
        $scope.showNewNote = false;

        var sendData = angular.copy($scope.tempNote);

        //convert all dates to SQL
        sendData.NoteCreatedDate = convertToSqlDate(sendData.NoteCreatedDate);
        sendData.NoteEditedDate = convertToSqlDate(sendData.NoteEditedDate);

        //create data entry using updateNotes.php
        $http({
            method: 'POST',
            url: "./php/prap_updateNotes.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                if (response.data)
                //give new entry unique id
                    sendData.GenNoteID = response.data.id;
                //display new entry

                delete sendData.op;
                sendData.NoteCreatedDate = convertToHtmlDate(sendData.NoteCreatedDate);
                sendData.NoteEditedDate = convertToHtmlDate(sendData.NoteEditedDate);
                $scope.prapNotes.push(sendData);
                //alert("data updated");
            }, function (result) {
            });
    };

//----------------------------

    $scope.addContact = function () {
        //TODO store NoteEditorID and NoteCreatedByID as userID
        //TODO  store userID in when logging in
        //TODO YOu must have a valid MentorPotentiaID
        //set flag to show new record
        $scope.showNewContact = true;

        var contactNote = {
            fkMentorPotentialID: $scope.mentorContacts[0].MentorPotentialID,
            CadetID: $scope.CadetID,
            ContactDate: new Date(),
            //MentorName: "",
            MentorContactType: "",
            MentorContactNote: "",
            ContactPlacementMonth: "",
            op: "ADD"
        };

        //Clear text
        $scope.tempContact = angular.copy(contactNote);
    };


    $scope.cancelContactCreate = function () {
        $scope.showNewContact = false;
    };

    $scope.showNewContact = false;
    $scope.saveContactCreate = function () {
        $scope.showNewContact = false;


        var sendData = angular.copy($scope.tempContact);

        //convert all dates to SQL
        sendData.ContactDate = convertToSqlDate(sendData.ContactDate);

        //create data entry using updateContacts.php
        $http({
            method: 'POST',
            url: "./php/prap_updateContacts.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (response) {
                if (response.data)
                //give new entry unique id
                    sendData.MentorContactID = response.data.id;

                delete sendData.op;
                sendData.ContactDate = convertToHtmlDate(sendData.ContactDate);
                $scope.mentorContacts.push(sendData);
            },
            function (result) {
            });
    }

    //saves selection from PRAP Category dropdown
    $scope.changePRAPCategory = function (PRAPCategory) {
        if (PRAPCategory != null) {
            $scope.cadetClass.PRAPCategory.value = PRAPCategory;
        }
    };
});
