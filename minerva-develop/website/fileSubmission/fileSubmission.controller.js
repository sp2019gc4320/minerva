//File: fieSubmission.controller.js
// Used with: fileSubmission.view.html

angular.module('website.fileSubmission').controller('fileSubmissionController', function ($scope, $routeParams, $http, $window) {
    $http({
        method: 'GET',
        url: './php/fileSubmission_getDoc.php',
       // data: Object.toparams(docSearch),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
        console.log(response.data);
        $scope.documents = response.data;//---------------------------------------------------------------------------------------------------------
    });

    $scope.reqd=[];
    $scope.notRequired=[];

    $scope.togglePermission = function(document) {
        if(document.enabled) {
            $scope.reqd.push(document);
        } else {
            $scope.notRequired.push(document);
        }
    }

    $scope.updatePermissionsInDatabase = function() {
       // var updateObject = {
      //      "user" : $scope.docName,
      //  }
        $http({
            method: "POST",
            url: "./php/fileSubmission_updateDocs.php",
            //data: Object.toparams(updateObject),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function(response) {
            alert("req updated!");
        }, function(error) {
            alert("Error updating req. Check the log for details");
            console.log(error);
        });

    }

    /*reqd = reqd.join(',');
    $.post('./php/fileSubmission_updateDocs.php', {reqd: reqd});

    notRequired = reqd.join(',');
    $.post('./php/fileSubmission_updateDocs.php', {notRequired: notRequired});*/
    //JSON.stringify(reqd);
    //JSON.stringify(notRequired);
    /*



    $scope.reqDoc= function(checkbox){
        if(isChecked)
        {
            required.push(doc);
        }
        else{
            notRequired.push(doc);
        }
    }*/

    /*$scope.checkoptions = function (choice) {
        var details = [];
        angular.forEach(choice, function (value, key) {
            if (choice[key].checked) {
                details.push(choice[key].documents.docName);
            }
        });
        if (details.length > 0)
            $scope.msg = 'Selected Values: '+details.toString();
        else
            $scope.msg = 'Please choose an option';
    };*/



    /**/

    /*$scope.saveDocumentsUpdate = function () {
        var numSaved = 0;

        var update = {};
        var updates = [];
        $scope.numSaved = 0;

        for (let i = 0; i < $scope.documents.length; i++) {
            update = angular.copy($scope.documents[i]);
            update.op = "UPDATE";
            updates.push(update);
        }

        for (var j = 0; j < updates.length; j++) {
            var sendData = angular.copy(updates[j]);
           // delete sendData.fkCadetID;
           // delete sendData.fkClassID;

            //send the json object to the correct update*.php file
            $http({
                method: 'POST',
                url: "./php/fileSubmission_updateDocs.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    //only show saved message after last task saved.
                    numSaved++;
                    if (numSaved === updates.length)
                        alert("Docs Updated");
                }, function (result) {
                    alert("Error saving Docs");
                });
        }
    };*/

    /*$scope.addNote = function () {
        $scope.showNewNote = true;

        var note = {
            docName: $scope.docName,
            required: 0,
            type: "PDF",
            note: "",
            op: "ADD"
        };
        //Clear text
        $scope.tempNote = angular.copy(note);

    };*/

    /*$scope.pickCadet = function (document) {
        //Storing fkCadetID to be used by another view
        //CLEAN UP -- only needs to store CadetID to localStorage
        $window.sessionStorage.setItem("CadetID", cadet.fkCadetID);



        $window.localStorage.setItem("CadetID", cadet.fkCadetID);
        $window.localStorage.setItem("CadetName", cadet.PersonFN + " " + cadet.PersonLN);

        $scope.myCadet = {fkCadetID: cadet.fkCadetID};
        $http({
            method: 'POST',
            url: '../../php/getCadetViewData.php',
            data: Object.toparams($scope.myCadet),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
                var cadet = response.data.data;

                $scope.updateDisplay = "./cadet-helper.view.html" + "?updated=" + Date.now();
            }
        );

        $scope.selectCadet(cadet);
    }*/

});
