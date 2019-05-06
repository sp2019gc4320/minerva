'use strict';

// TODO: Extend the form to work with multiple addresses (similar to contacts)
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

    // List of ContactInformationModels
    $scope.contactInformation = []

    $scope.age = 0

    /// Model to arrange the data for ContactInformation in the post requests.
    class ContactInformationModel {

        /**
         * Sets the ContactInformationModel to its default values
         */
        constructor() {
            this.ContactType = "phone"
            this.ContactTypeExt = "home"
            this.IsPreferred = 0
        }
        
        /**
         * Defines the data used in the POST object for when the form is
         * submitted. It's important to specify this because when contact
         * information is added to the field, some of the field values aren't
         * included when the contact type differs. For example, Ext (Extension)
         * is not needed when the Contact Type is a social media account.
         *
         * - Returns:
         *   - An object containing the necessary fields for this object to be
         *   added to the database
         */
        asPOSTObject() {

            // Fields used in all cases
            var postObject = {
                    ContactType: this.ContactType, 
                    Value: this.Value, 
                    Description: this.Description, 
                    IsPreferred: this.IsPreferred
            }

            if(this.ContactType == "social media") {
                return postObject;
            } else {
                if(this.ContactType == "phone") {
                    postObject.Ext = this.Ext;
                }
                if(this.ContactTypeExt != undefined) {
                    postObject.ContactType += "-" + this.ContactTypeExt;
                }
                return postObject;
            }
        }
    }


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
        $scope.genqualOptions = data.genqual.map(a => a.PersonGenQual);
        $scope.raceOptions = data.race;
    }, function(error){
    });

    /**
     * Creates a new ContactInformationModel to correspond with the row being
     * added in the Contact Information section of the form.
     */
    $scope.addContactInformation = function() {
        $scope.contactInformation.push(new ContactInformationModel());
    }

    /**
     * Removes the selected row from the ContactInformation section of the form.
     *
     * - Parameters:
     *   - elem: The element corresponding to the row to be removed.
     */
    $scope.removeContactInformation = function(elem) {
        console.log(elem.$$hashKey);
        console.log(elem.asPOSTObject());
        for(var i = 0; i < $scope.contactInformation.length; i++) {
            if($scope.contactInformation[i].$$hashKey == elem.$$hashKey) {
                $scope.contactInformation.splice(i, 1);
            }
        }

    }

    /**
     * Calculates the age given a person's DOB in MM/DD/YYYY format. Used in the
     * view to tell the person what age a cadet is.
     *
     * - Parameters: 
     *   - dateString: The string containing the person's birth date 
     * - Returns:
     *   - 0 if the date string is invalid or undefined, the age otherwise
     */
    $scope.getAge = function (dateString) {
        // We want a valid value if the full date has not yet been input. 
        // Since the minimum for a full date would be constitued by M/D/YYYY,
        // we need to make sure there are at least 8 characters.
        if(dateString == undefined || dateString.length < 8) { return 0 }

        // Otherwise, run calculations
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // If the date string is invalid, return 0. It may be more preferable
        // just to write "invalid".
        return isNaN(age) ? 0 : age;
    };

    /**
     * Shortcut function added for readability. Creates a new array containing
     * the contact information put into the format for posting objects.
     */
    $scope.getContactInformationPOSTData = function() {
        return $scope.contactInformation.map(ci => ci.asPOSTObject());
    }

    /**
     * Submits the form data to php/admin_createCadet.php
     */
    $scope.submit = function() {
        $http({
            method: "POST",
            url: "./php/admin_createCadet.php",
            data: { 
                peopleData: $scope.person,
                contactInformationData: $scope.getContactInformationPOSTData()
            },
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
