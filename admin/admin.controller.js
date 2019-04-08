'use strict';

angular.module('admin').
controller('ctrl_homeOptions', function($scope, $http, $window) {

    //set it to null
    $window.localStorage.setItem("lookupTable",null);

    $scope.adminViews = [
        {view:'Add Class', url:'./admin/site-addclass/site-addclass.view.html'},
        {view:'Add Cadet', url:'./admin/site-addcadet/site-addcadet.view.html'},
        {view:'View Cadets', url:'./admin/site-viewcadets/site-viewcadets.view.html'},
        {view:'View Graduates', url:'./admin/site-viewgraduates.view.html'}
    ]

    $scope.showView = function showView(item){
        $scope.dataurl = item.url;
        $scope.updateDisplay = item.url
    };
});