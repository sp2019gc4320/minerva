/*
File: health.controller.js
Use: health.view.html
*/

angular.module('core-components.health').controller('healthController', function($scope, $http, $window) {

    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    alert("Test  with Cadet 361 - Jennifer Avila to see sample dates");

    // $scope.cadetID = "361"; //with data
    // alert("setting cadetID  for testing : " +$scope.cadetID);

    var cadet = {CadetID: $scope.cadetID};  // notice does not send cadet the number to the healt_updateHyge php
    $scope.editable = false;
    $scope.update = function()
    {
        //copy first row of table
        $scope.show=true;
        for (var j=0; j<$scope.tasks.length; j++)
        {
            $scope.numSaved=0;
            var sendData=angular.copy($scope.tasks[j]);//date comes in as date w time

            if(sendData.EventDate!==null) {//IF A DATE IS ENTERED
                    sendData.EventDate = convertToSqlDate(sendData.EventDate);

                if($scope.tasks[j].DidPass==="1")
                {
                    $scope.tasks[j].PF="Pass";
                }
                else {
                    $scope.tasks[j].PF = "Fail";
                    $scope.show=false;
                }

                    delete sendData.Task;
                    delete sendData.TaskNumber;
            }
            else{//IF NO DATE ENTERED
                $scope.tasks[j].dateNoTime ="None";
                sendData.EventDate="";
                sendData.DidPass="0";
                $scope.tasks[j].PF="Fail";
                $scope.show=false;
            }
            $http ({
                method: 'POST',
                url: "./php/health_updateHealthHyg.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {
                    if(response.data) {

                        //this only needs to be saved once all changes are saved.
                        $scope.numSaved++;
                         if($scope.numSaved == $scope.tasks.length)
                            alert("Changes Saved.");
                    }
                    //location.reload(true);
                },function(result){
                    alert("Failed");
                });
        }
        $scope.editable = false;
    };

//var test = $scope.cadet;
    var myRequest= {cadet: $scope.cadetID};
//var myRequest = {cadet: '361'};

    $http ({
        method: 'POST',
        url: "./php/health_retrieveHealthHyg.php",
        data: Object.toparams(myRequest),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(
        function(result)
        {
            $scope.tasks=result.data.taskTbl;
            $scope.show=true;

            for(var i=0; i<$scope.tasks.length; i++)
            {
                if($scope.tasks[i].EventDate!=="0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                    /*
                    $scope.tasks[i].EventDate = $scope.tasks[i].EventDate.split(" ")[0];
                    var noTimeary = $scope.tasks[i].EventDate.split("-");
                    $scope.tasks[i].dateNoTime = noTimeary[1] + "-" + noTimeary[2] + "-" + noTimeary[0];
                    $scope.tasks[i].EventDate += "T00:00:00";//added to fix the incorrect date that is returned from php
                    $scope.tasks[i].EventDate = new Date($scope.tasks[i].EventDate);//need to be a date to display

                    */
                    $scope.tasks[i].EventDate = convertToHtmlDate($scope.tasks[i].EventDate);
                    if($scope.tasks[i].DidPass==="1")
                    {
                        $scope.tasks[i].PF="Pass";
                    }
                    else {
                        $scope.tasks[i].PF = "Fail";
                        $scope.show = false;
                    }
                }
                else{//IF DATE IS NULL, SET FALSE VALUES
                    $scope.tasks[i].dateNoTime="None";
                    $scope.tasks[i].EventDate = new Date("");//need to be a date to display
                    $scope.show=false;
                    $scope.tasks[i].DidPass="0";
                    $scope.tasks[i].PF="Fail";
                }
            }

        },function(result){
            alert(result);
        });


    $scope.cancelUpdate = function() {
       // location.reload(true);
        $scope.editable = false;
        $scope.tasks = angular.copy($scope.tasksBackup);
    };
    $scope.edit = function() {
        $scope.editable = true;
        $scope.show=false;

        //backup data
        $scope.tasksBackup = angular.copy($scope.tasks);

    };
    $scope.stylePass = function stylePass(didpass)
    {
         if (didpass ==="1")
              return "bg-danger text-center";
       else  return "bg-success text-center";

    }


});