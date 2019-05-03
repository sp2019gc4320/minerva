//find-cadet.controller.js
// TODO Cadet 406  has  3 mentors -- selecting all 3 rows or just select one.
'use strict';

angular.module('findApp').controller("FindCadetController", function FindCadetController($scope, $http, $window) {

    //Search Criteria
    $scope.cadetSearch = {};

    //TODO: set the fkSiteID to be the same as the user's login Site.
    $scope.cadetSearch.fkSiteID = 1;

    //TODO: add needed search fields -- tblClasses has SiteClassNumber, NGB

    // TODO: add options to quickly choose cadets for Mentor, CaseManager, Cadre etc.


    $scope.selectAll = false;


    // List of cadets picked on the Find Cadet View. This is instead of a
    // dictionary so that an order on when things are picked can be
    // maintained.
    $scope.pickedCadets = [];

    // Keeps track of which of the cadets have been checked
    $scope.checkedCadets = {};


    /**
     * Retrieve only records from server that match the given search criteria. This will reduce the data
     * returned from server.
     */
    $scope.search = function search() {

        //copy search criteria
        var cadetSearch = angular.copy($scope.cadetSearch);

        //deselect all checkboxes
        $scope.checkedCadets = {};
        $scope.pickedCadets = [];
        $scope.selectAll = false;

        //request data from server
        $scope.searchTask = $http({
            method: 'POST',
            url: '../../php/findCadets.php',
            data: Object.toparams(cadetSearch),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            $scope.cadets = response.data.data;
        });
    };


    /**
     * Select all cadets currently matching the search criteria
     */
    $scope.selectGroup = function selectGroup() {
        //restrict search to the search criteria
        var cadetSearch = angular.copy($scope.cadetSearch);

        //Retrieve data from server to ensure the same hashcode is used when comparing cadets
        // the selectCadet function uses indexOf which needs matching objects to have the same hashcode.
        $scope.searchTask = $http({
            method: 'POST',
            url: '../../php/findCadets.php',
            data: Object.toparams(cadetSearch),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            $scope.cadets = response.data.data;
            $scope.checkedCadets = {};
            $scope.pickedCadets = [];

            //After data returned, select all cadets
            if ($scope.selectAll) {
                let index = 0;
                while (index < $scope.cadets.length) {
                    $scope.selectCadet($scope.cadets[index]);
                    index++;
                }
            }

        });


    };
    /**
     * Serves as a toggle for the cadets selected on the Find Cadet View. When
     * the checkbox for a cadet is checked or row is selected, the respective cadet is added to
     * the list of `pickedCadets`. When the checkbox is unchecked or the row is selected again, the cadet
     * is removed.
     *
     * - Parameters:
     *   - cadet: The cadet being either added or removed from the list of
     *   `pickedCadets`.
     */
    $scope.selectCadet = function (cadet) {
        if (!$scope.checkedCadets[cadet.fkCadetID]) {
            $scope.pickedCadets.push(cadet);

            //ensure the checkbox is selected.
            $scope.checkedCadets[cadet.fkCadetID] = true;
        }
        else {
            var index = $scope.pickedCadets.indexOf(cadet);
            if (index >= 0) {
                $scope.pickedCadets.splice(index, 1);

                //deselect the checkbox
                $scope.checkedCadets[cadet.fkCadetID] = false;
            }
            else { //This only occurs if the cadet is in the list but does not have the same hashCode
                alert("index is not found -- adding to list");
                $scope.pickedCadets.push(cadet);
                $scope.checkedCadets[cadet.fkCadetID] = true;

            }
        }

    };

    $scope.saveAndClose = function () {
        var cadetJSON = JSON.stringify($scope.pickedCadets);
        $window.sessionStorage.setItem("cadets", cadetJSON);
        $window.localStorage.setItem("cadets", cadetJSON);

        //Set the cadet for the first item in the list
        if ($scope.pickedCadets.length > 0) {
            var list = "";
            var chosen=0;
            var firstChosen=$scope.pickedCadets[0];
            let i =0;
            while(i<$scope.pickedCadets.length){
                list = list + (i+1) + ". " + $scope.pickedCadets[i].PersonFN + " " + $scope.pickedCadets[i].PersonLN + "\n";
                i++;
            }
            if($scope.pickedCadets.length > 1) {
                chosen = prompt("Enter the number next to the cadet that you would \nlike to use from the following list: \n" +
                    list);
                firstChosen = $scope.pickedCadets[chosen - 1];
            }
            $window.localStorage.setItem("CadetID", firstChosen.fkCadetID);
            $window.localStorage.setItem("CadetName", firstChosen.PersonFN + " " + firstChosen.PersonLN);
            $window.localStorage.setItem("CadetGender", firstChosen.PGender);
            $window.localStorage.setItem("CadetDOB", firstChosen.PDOB);
            $window.localStorage.setItem("ClassDetailID", firstChosen.fkCadetID);
        }
        else {
            $window.localStorage.removeItem("CadetID");
            $window.localStorage.removeItem("CadetName");
            $window.localStorage.removeItem("CadetGender");
            $window.localStorage.removeItem("CadetDOB");
            $window.localStorage.removeItem("ClassDetailID");
        }

        $window.opener.location.reload();
        $window.close();

    };

    $scope.pickCadet = function (cadet) {
        //Storing fkCadetID to be used by another view
        //CLEAN UP -- only needs to store CadetID to localStorage
        $window.sessionStorage.setItem("fkCadetID", cadet.fkCadetID);
        $window.localStorage.setItem("fkCadetID", cadet.fkCadetID);
        $window.sessionStorage.setItem("CadetID", cadet.fkCadetID);
        $window.sessionStorage.setItem("theCadet", cadet.fkCadetID);
        $window.localStorage.setItem("theCadet", cadet.fkCadetID);

        //store class detail id here?
        $window.sessionStorage.setItem("fkClassDetailID", cadet.fkCadetID);
        $window.localStorage.setItem("fkClassDetailID", cadet.fkCadetID);
        $window.localStorage.setItem("ClassDetailID", cadet.fkCadetID);


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
    }
});

