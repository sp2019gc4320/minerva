'use strict';

angular.module('admin.siteDropdown').
    controller("siteDropdownCtrl", function($scope, $http, $window){

    $scope.postUpdate = function(myRequest)
    {
        myRequest.TableName =  $scope.TableName;

        $http({
            method: 'POST',
            url: "./php/admin_sitespecific_update.php",
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
        $scope.TableName = 'tlkpSiteServiceSites';
        $scope.TableDescription ="Service Sites";
        $scope.SiteID = '1';

        $scope.TableName = 'TestTable';
        $scope.TableDescription ="TestTable";
        $scope.SiteID = '1';


        $scope.TableName =  $window.sessionStorage.getItem("SiteLookupTable");
        $scope.TableDescription = $window.sessionStorage.getItem("SiteLookupTableDescription");
        $scope.SiteID  = $window.sessionStorage.getItem("SiteID");

        var myRequest = {TableName: $scope.TableName, SiteID: $scope.SiteID};


        $http({
            method: 'POST',
            url: "./php/getRecordsForSite.php",
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

    $scope.deleteOption = function(vNum){

        var response =  $window.confirm("Are you sure you want to delete?");
        if ((response)) {

            var id =  $scope.lookupTable[vNum-1].AutoID;
            var myRequest = {SearchField:'AutoID', SearchValue: id, op:'Delete'};

            $scope.postUpdate(myRequest);

            // --- $scope.lookupTable.splice(vNum-1,1);

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

            if((key != 'fkSiteID')&&( key != 'AutoID'))
                $scope.editFields[key] = "";

        });
    };

    $scope.loadView();




});