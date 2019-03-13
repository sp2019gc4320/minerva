//case-manager.controller.js
'use strict';

angular.module('homescreen.caseManager').
controller("caseManagerController", function($scope, $http, $window){


    $scope.CadetID = $window.localStorage.getItem("CadetID");
    $scope.CadetName = $window.localStorage.getItem("CadetName");
    //EDIT
    $scope.CadetGender = $window.localStorage.getItem("CadetGender");
    $scope.CadetDOB = $window.localStorage.getItem("CadetDOB");
    //$scope.CadetDOB = $window.localStorage.getItem("CadetDOB");
    //alert("DOB: " + $window.localStorage.getItem("CadetDOB"));

    if($scope.CadetID === null) {
        alert("You must select a cadet!");
    }

    $scope.cadet = {
        CadetID: $scope.CadetID,
        CadetName: $scope.CadetName,
        //EDIT
        CadetGender: $scope.CadetGender
        //CadetDOB: $scope.CadetDOB
    };

    $scope.caseManagerViews = [
        {view:'Mentor', url:'./case-manager/cadet-mentor/updateMentor.view.html'},
        {view:'Citizenship', url:'./core-components/citizenship/citizenship.view.html'},
        {view:'Health & Hygiene', url:'./core-components/health/health.view.html'},
        {view:'Lead/Follow', url:'./core-components/lead-follow/lead-follow.view.html'},
        {view:'S2C', url:'./core-components/s2c/s2c.view.html'},
        {view: 'Job Skills', url:'./core-components/job-skills/job-skills.view.html'},
        {view: 'PRAP', url: './notes/prap/prap.view.html'},
        {view: 'Post Residential', url:'./notes/postres/postres.view.html'}];

    $scope.showView= function showView(item){
        $scope.dataurl = item.url;
        $scope.updateDisplay = item.url+ "?updated=" + Date.now();
    };

    $scope.openFindCadetView = function()
    {

        $window.open('./utility/find-cadet/find-cadet-index.view.html', "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=300,height=300");

    };



});
