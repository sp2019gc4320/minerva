
var app = angular.module('myApp');

// controller uses $scope
app.controller('ctrl_headerVisible', function($rootScope) {

   $rootScope.headerDisplay = "./views/header.html?updated="+Date.now();

});
