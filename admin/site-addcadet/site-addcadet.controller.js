'use strict';

// TODO: Remove mailing address from the person model when the form is submitted
// and hasSameMailingAddress is set to true. 
// TODO: Form sanitization
// TODO: Ensure the person accessing this page has admin priveleges
// TODO: Make sure mandatory fields must be filled out before submitting
// TODO: Make sure drop down fields send the right values to the database
// TODO: Set up redirect after submit

angular.module('admin.siteAddCadet').controller('addCadetController', function($scope, $http, $window) {

    // Model for containing the Person to be added to tblPerson
    $scope.person = {};

    // Mailing address toggle
    $scope.hasSameMailingAddress = false;

    // Set up options on load
    $http({
        method: "GET",
        url: "./php/admin_createCadetFormOptions.php",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(function(response) {
        var data = response.data;
        // Extract data
        $scope.urbanizationOptions = data.urbanization.map(a => a.Urbanization);
        $scope.stateOptions = data.state
        $scope.salutationOptions = data.salutation.map(a => a.Salutation);
        $scope.regionOptions = data.region.map(a => a.Region);
        $scope.genqualOptions = data.genqual.map(a => a.PersonGenQual);
        $scope.raceOptions = data.race;
    }, function(error){
    });


    $scope.submit = function() {
        /**
         * Submits the form data to php/admin_createCadet.php
         */
        console.log({ "peopleData" : $scope.person});
        $http({
            method: "POST",
            url: "./php/admin_createCadet.php",
            data: { peopleData: $scope.person },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(response) {
                console.log("Response: " + response.data);
            },
            function(error) {
                console.log("Error: " + error);
            });
        
    }

});
