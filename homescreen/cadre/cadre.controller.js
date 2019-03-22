//cadre.controller.js
'use strict';

angular.module('homescreen.cadre').
controller("cadreController", function($scope, $http, $window){
    $scope.cadets = JSON.parse($window.localStorage.getItem("cadets"));
    $scope.CadetID = $window.localStorage.getItem("CadetID");
    $scope.CadetName = $window.localStorage.getItem("CadetName");
    //EDIT
    $scope.CadetGender = $window.localStorage.getItem("CadetGender");
    $scope.CadetDOB = $window.localStorage.getItem("CadetDOB");

    if($scope.CadetID === null) {
        alert("You must select a cadet!");
    }

    $scope.cadet = {
        CadetID: $scope.CadetID,
        CadetName: $scope.CadetName,
        CadetGender: $scope.CadetGender,
        CadetDOB: $scope.CadetDOB
    };

    $scope.cadreViews = [
        {view:'Physical Fitness', url:'./core-components/physical-fitness/physical-fitness.view.html'},
        {view:'Lead/Follow', url:'./core-components/lead-follow/lead-follow.view.html'},
        {view:'Service To Community', url:'./core-components/s2c/s2c.view.html'}
        ];


    $scope.showView= function showView(item){
        $scope.dataurl = item.url;
        $scope.updateDisplay = item.url+ "?updated=" + Date.now();
    };

    $scope.openFindCadetView = function()
    {
        $window.open('./utility/find-cadet/find-cadet-index.view.html', "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=300,height=300");

    };

    $scope.localStorageUpdate = function localStorageUpdate(item)
    {
        $window.localStorage.setItem("CadetID", item.fkCadetID);
        $window.localStorage.setItem("CadetGender", item.PGender);
        $window.localStorage.setItem("CadetDOB", item.PDOB);
        $window.localStorage.setItem("fkCadetID", item.fkCadetID);
        $window.localStorage.setItem("CadetName", item.PersonFN + " " + item.PersonLN);
        location.reload(true);
    }

});
