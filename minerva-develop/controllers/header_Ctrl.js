
var app = angular.module('myApp');

// controller uses $scope, $http and $window data
app.controller('ctrl_header', function($scope, $window, $rootScope) {


    //set it to null
   $scope.header={};
   $scope.header.user=$window.sessionStorage.getItem("minerva_user");
   //alert("loading header");

   if($scope.header.user)
   {
      $scope.loggedIn="true";
   }
   else
   {
      $scope.loggedIn="false";
   }
   $scope.header.date = Date.now();

   $scope.loggingOut = function()
   {
       //clear $window.sessionStorage
       $window.sessionStorage.removeItem("minerva_user");

       var status = $window.sessionStorage.getItem("minerva_user");
      // alert("angular minerva_user removed from storage." + status);

       $rootScope.headerDisplay = "./views/header.html?updated="+Date.now();
   };

});
/*
loggingOut = function()
{
    //clear $window.sessionStorage
    sessionStorage.removeItem("minerva_user");

    var status = sessionStorage.getItem("minerva_user");
    alert("javascript minerva_user removed from storage." + status);

};
*/