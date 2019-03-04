/*
File: citizenship.controller.js
 Use: citizenship.view.html
 */

angular.module('core-components.citizenship').controller('citizenshipController', function($scope, $http, $window) {


    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));

    alert("Test Citizenship with Cadet 361 - Jennifer Avila to see sample dates");

   // $scope.cadetID = "361"; //with data
   // alert("setting cadetID  for testing  citizenship: " +$scope.cadetID);

    var cadet = {CadetID: $scope.cadetID};
$scope.update = function() 
{
    //copy first row of table
    for (var j=0; j<$scope.tasks.length; j++)
    {
    var sendData=angular.copy($scope.tasks[j]);

    delete sendData.Task;
    delete sendData.TaskNumber;

$http ({
            method: 'POST',
            url: "./php/citizenship_updateCitizenship.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
        function(response)
        {
            if(response.data)
            //$scope.msg="data updated";
        alert("data updated")
        //location.reload(true);
        },function(result){
            
        });
    }
    //second table
    for (var j=0; j<$scope.tests.length; j++)
    {
    var sendDataTwo=angular.copy($scope.tests[j]);

    delete sendDataTwo.TaskTestID;
    delete sendDataTwo.TaskTest;

$http ({
            method: 'POST',
            url: "./php/citizenship_update.php",
            data: Object.toparams(sendDataTwo),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
        function(response)
        {
            if(response.data)
            //$scope.msg="data updated";
        {}
        //location.reload(true);
        },function(result){
            
        });
    }
};
    var myRequest= {cadet: '361'};
        $http ({
            method: 'POST',
            url: "./php/citizenship_retrieveCitizenship.php",
            data: Object.toparams(myRequest),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
        function(result)
        {
            $scope.tasks=result.data.taskTbl;
            $scope.tests=result.data.testTbl;
            for(var i=0; i<$scope.tasks.length; i++)
            {
                $scope.tasks[i].EventDate=$scope.tasks[i].EventDate.split(" ")[0];
            }
            for(var i=0; i<$scope.tests.length; i++)
            {
                $scope.tests[i].EventDate=$scope.tests[i].EventDate.split(" ")[0];
            }
        },function(error){
            alert(error);
        });

        $scope.cancelUpdate = function() {
        location.reload(true);
      };
});