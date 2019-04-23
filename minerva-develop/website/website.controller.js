//website.controller.js
'use strict';

angular.module('website').
controller('websiteController', function($scope, $http, $window) {

    //set it to null
    $window.localStorage.setItem("lookupTable",null);

    $scope.websiteViews = [
        {view:'submit File', url:'./website/fileSubmission/fileSubmission.view.html'},
        {view:'edit Core Component', url:'./website/editCoreComponent/editCoreComponent.view.html'},
        {view:'add/update/delete a site', url:'./admin/site-setup/site-setup.view.html'}
    ]

    $scope.showView = function showView(item){
        $scope.dataurl = item.url;
        $scope.updateDisplay = item.url
    };
});