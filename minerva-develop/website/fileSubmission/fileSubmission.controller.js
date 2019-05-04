//File: fieSubmission.controller.js
// Used with: fileSubmission.view.html

angular.module('website.fileSubmission').controller('fileSubmissionController', function ($scope, $http, $window) {

    $scope.postUpdate = function(myRequest)
    {
        myRequest.TableName =  $scope.TableName;

        $http({
            method: 'POST',
            url: "./php/website_dropdown_update.php",
            data: Object.toparams(myRequest),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCCESS
            function (result) {
                $scope.loadView();

            },
            //ERROR
            function (result) {
                alert("error: " + result.data);
            }
        );
    };

    $scope.loadView = function(){
        //Testing
        $scope.TableName = 'tlkpApplicationFiles';
        $scope.TableDescription ="Application Files";

        //$scope.TableName =  $window.sessionStorage.getItem("SiteLookupTable");
        //$scope.TableDescription = $window.sessionStorage.getItem("SiteLookupTableDescription");
        $scope.SiteID  = $window.sessionStorage.getItem("SiteID");

        var myRequest = {TableName: $scope.TableName };
        $http({
            method: 'POST',
            url: "./php/website_getRecordsForDropdown.php",
            data: Object.toparams(myRequest),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCCESS function
            function(result) {
                $scope.lookupTable = result.data.data;

                //create space to store one record -- copy all fields of 1st tow
                $scope.editFields = angular.copy($scope.lookupTable[0]);

                //Make each field value empty
                $scope.resetEditFields();
            },
            //ERROR function
            function(result){
                //on error, the result has a lot of different fields including status, statusText and config
                $scope.lookupError = result;
            }
        );

    };
    $scope.loadView();
    $scope.deleteOption = function(vNum){

        var response =  $window.confirm("Are you sure you want to delete?");
        if ((response)) {

            var id =  $scope.lookupTable[vNum-1].AutoID;
            var myRequest = {SearchField:'AutoID', SearchValue: id, op:'Delete'};

            $scope.postUpdate(myRequest);



        }

        $scope.resetEditFields();

    };

    $scope.createOption = function(){

        //Get a copy of edit
        var newItem = angular.copy($scope.editFields);

        //add that to lookupTable
        //$scope.lookupTable.push(newItem);

        //send create request for 1 record

        //remove the AutoID property
        delete newItem.AutoID;
        newItem.op ="Create";
        $scope.postUpdate(newItem);


        //reset editField to empty
        $scope.resetEditFields();

    };
    $scope.saveChanges = function(){

        var vNum = $scope.editOption.id;

        //copy lookup values in edit field
        Object.keys($scope.editFields).forEach(function(key) {
            $scope.lookupTable[vNum - 1][key] = $scope.editFields[key];
        });

        //send update request for 1 record
        var myRequest = angular.copy($scope.editFields);
        var id =  $scope.lookupTable[vNum-1].AutoID;
        myRequest.SearchField ='AutoID';
        myRequest.SearchValue = id;
        myRequest.op='Update';
        alert("update posted");
        $scope.postUpdate(myRequest);


        $scope.resetEditFields();
    };


    $scope.startEdit = function(vNum){


        $scope.editOption= {};
        $scope.editOption.id= vNum;

        //copy lookup values in edit field
        Object.keys($scope.editFields).forEach(function(key) {
            $scope.editFields[key] = $scope.lookupTable[vNum-1][key];
        });
    };

    $scope.cancelEdit = function(){

        $scope.resetEditFields();
    };

    $scope.resetEditFields = function()
    {
        $scope.editOption = null;
        Object.keys($scope.editFields).forEach(function(key) {

            if(key != 'AutoID')
                $scope.editFields[key] = "";

        });
    };

    $scope.loadView();

















   /* $http({
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

    }*/

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
