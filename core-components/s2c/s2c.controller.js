/* File: s2c.controller.js
   used by s2c.view.html
 */

angular.module('core-components.s2c').controller('s2cController', function($scope, $http, $window) {

    //pre-loaded cadetID
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));

    alert("Test  with Cadet 361 - Jennifer Avila to see sample dates");
   // $scope.cadetID = "361"; //with data
   // alert("setting cadetID  for testing: " +$scope.cadetID);

    var myRequest= {cadet: $scope.cadetID};
        $http ({
            method: 'POST',
            url: "./php/s2c_retrieveS2C.php",
            data: Object.toparams(myRequest),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
        function(result)
        {
            $scope.tasks=result.data.taskTbl;
            $scope.tests=result.data.testTbl;
        },function(error){
            alert(error);
        });
});