//find-Applicant.controller.js
// TODO Applicant 406  has  3 mentors -- selecting all 3 rows or just select one.
'use strict';

angular.module('findApp').controller("FindApplicantController", function FindApplicantController($scope, $http, $window) {

    //Search Criteria
    $scope.applicantSearch = {};

    //TODO: set the fkSiteID to be the same as the user's login Site.
    $scope.applicantSearch.fkSiteID = 1;

    //TODO: add needed search fields -- tblClasses has SiteClassNumber, NGB

    // TODO: add options to quickly choose Applicants for Mentor, CaseManager, Cadre etc.

    $scope.selectAll = false;

    // List of Applicants picked on the Find Applicant View. This is instead of a
    // dictionary so that an order on when things are picked can be
    // maintained.
    $scope.pickedApplicants = [];

    // Keeps track of which of the Applicants have been checked
    $scope.checkedApplicants = {};

    /**
     * Retrieve only records from server that match the given search criteria. This will reduce the data
     * returned from server.
     */
    $scope.search = function search() {

        //copy search criteria
        var applicantSearch = angular.copy($scope.applicantSearch);

        //deselect all checkboxes
        $scope.checkedApplicants = {};
        $scope.pickedApplicants = [];
        $scope.selectAll = false;

        //request data from server
        $scope.searchTask = $http({
            method: 'POST',
            url: '../../php/findApplicants.php',
            data: Object.toparams(applicantSearch),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            $scope.applicants = response.data.data;
            //$scope.applicants = $scope.applicants.split(",");
            alert($scope.applicants);
            var i;
            for(i = 0; i < $scope.applicants.length; i++)
            {
                $scope.applicants[i] = (JSON.parse(JSON.stringify($scope.applicants[i])));
            }
            alert($scope.applicants[1].PersonFN)

        });
    };

    /**
     * Select all Applicants currently matching the search criteria
     */
    $scope.selectGroup = function selectGroup() {
        //restrict search to the search criteria
        var applicantSearch = angular.copy($scope.applicantSearch);

        //Retrieve data from server to ensure the same hashcode is used when comparing Applicants
        // the selectApplicant function uses indexOf which needs matching objects to have the same hashcode.
        $scope.searchTask = $http({
            method: 'POST',
            url: '../../php/findApplicants.php',
            data: Object.toparams(applicantSearch),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            $scope.applicants = response.data.data;
            $scope.checkedApplicants = {};
            $scope.pickedApplicants = [];

            //After data returned, select all Applicants
            if ($scope.selectAll) {
                let index = 0;
                while (index < $scope.applicants.length) {
                    $scope.selectApplicant($scope.applicants[index]);
                    index++;
                }
            }

        });


    };
    /**
     * Serves as a toggle for the Applicants selected on the Find Applicant View. When
     * the checkbox for a Applicant is checked or row is selected, the respective Applicant is added to
     * the list of `pickedApplicants`. When the checkbox is unchecked or the row is selected again, the Applicant
     * is removed.
     *
     * - Parameters:
     *   - Applicant: The Applicant being either added or removed from the list of
     *   `pickedApplicants`.
     */
    $scope.selectApplicant = function (applicant) {
        if (!$scope.checkedApplicants[applicant.ApplicantID]) {
            $scope.pickedApplicants.push(applicant);

            //ensure the checkbox is selected.
            $scope.checkedApplicants[applicant.ApplicantID] = true;
        }
        else {
            var index = $scope.pickedApplicants.indexOf(applicant);
            if (index >= 0) {
                $scope.pickedApplicants.splice(index, 1);

                //deselect the checkbox
                $scope.checkedApplicants[applicant.ApplicantID] = false;
            }
            else { //This only occurs if the Applicant is in the list but does not have the same hashCode
                alert("index is not found -- adding to list");
                $scope.pickedApplicants.push(applicant);
                $scope.checkedApplicants[applicant.ApplicantID] = true;

            }
        }

    };

    $scope.saveAndClose = function () {
        var applicantJSON = JSON.stringify($scope.pickedApplicants);
        $window.sessionStorage.setItem("applicants", applicantJSON);
        $window.localStorage.setItem("applicants", applicantJSON);

        //Set the Applicant for the first item in the list
        if ($scope.pickedApplicants.length > 0) {
            var firstChosen = $scope.pickedApplicants[0];
            $window.localStorage.setItem("ApplicantID", firstChosen.ApplicantID);
            $window.localStorage.setItem("ApplicantName", firstChosen.PersonFN + " " + firstChosen.PersonLN);
        }
        else {
            $window.localStorage.removeItem("ApplicantID");
            $window.localStorage.removeItem("ApplicantName");
        }

        $window.opener.location.reload();
        $window.close();

    };

    $scope.applicantSaveAndClose = function () {
        var applicantJSON = JSON.stringify($scope.pickedApplicants);
        $window.sessionStorage.setItem("applicants", applicantJSON);
        $window.localStorage.setItem("applicants", applicantJSON);

        //Set the Applicant for the first item in the list
        if ($scope.pickedApplicants.length > 0) {
            var firstChosen = $scope.pickedApplicants[0];
            $window.localStorage.setItem("ApplicantID", firstChosen.ApplicantID);
            $window.localStorage.setItem("ApplicantName", firstChosen.PersonFN + " " + firstChosen.PersonLN);
        }
        else {
            $window.localStorage.removeItem("ApplicantID");
            $window.localStorage.removeItem("ApplicantName");
        }

        $window.opener.location.reload();
        $window.close();

    };

    $scope.pickApplicant = function (applicant) {
        alert('Something happened');
        //Storing ApplicantID to be used by another view
        //CLEAN UP -- only needs to store ApplicantID to localStorage
        $window.sessionStorage.setItem("ApplicantID", applicant.ApplicantID);
        $window.localStorage.setItem("ApplicantID", applicant.ApplicantID);
        $window.sessionStorage.setItem("ApplicantID", applicant.ApplicantID);
        $window.sessionStorage.setItem("theApplicant", applicant.ApplicantID);
        $window.localStorage.setItem("theApplicant", applicant.ApplicantID);
        $window.localStorage.setItem("ApplicantID", applicant.ApplicantID);
        $window.localStorage.setItem("ApplicantName", applicant.PersonFN + " " + applicant.PersonLN);

        $scope.myApplicant = {ApplicantID: applicant.ApplicantID};
        $http({
            method: 'POST',
            url: '../../php/getApplicantViewData.php',
            data: Object.toparams($scope.myApplicant),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
                var applicant = response.data.data;
                alert(response.data.data);
                $scope.updateDisplay = "./applicant-helper.view.html" + "?updated=" + Date.now();
            }
        );

        $scope.selectApplicant(applicant);
    }
});

