// physical-fitness.controller.js
// 
// 


angular.module('core-components.physical-fitness').controller('physicalFitnessController', function($scope, $http, $window) {

    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));

    $scope.tasks=[];
    $scope.tests=[];
    $scope.PTDetails=[];
    $scope.PTDetailHeaders=['2(a)',' 2(b)', '2(c)'];
    $scope.editTasks = false;
    $scope.editTests = false;
    $scope.editPTDetails = false;
    $scope.showTest = true;

    $scope.showHeader = function(index)
    {
        //This function is for table headers when displaying PT Details tests in HTML view
        //As this is hardcoded if tests are added or removed
        return $scope.PTDetailHeaders[index];
    }

    $scope.waiveAll = function(index)
    {
        //added to tlbPTDetails SQL statement:
        //ALTER TABLE `tblPTDetails` ADD `IsWaived` TINYINT(1) NOT NULL DEFAULT '0' AFTER `PTDetailResult`;

        for(let i = 0; i < $scope.tests[index].details.length; i++)
        {
            $scope.tests[index].details[i].IsWaived = 1;
        }
    };

    $scope.makeTasksEditable = function()
    {
        $scope.editTasks = true;
        //create backup of tasks
        $scope.tasksBackup = angular.copy($scope.tasks);

    };
    $scope.saveTasksUpdate = function()
    {
        var numSaved = 0;
        //
        $scope.editTasks = false;

        //copy rows of Task table
        for (var j=0; j<$scope.tasks.length; j++)
        {
            //Only send tasks that do not have tests associated with them
            if($scope.tasks[j].fkTaskTestEventID == null) {
                var sendData = angular.copy($scope.tasks[j]);

                delete sendData.Task;
                delete sendData.TaskNumber;
                sendData.EventDate = convertToSqlDate(sendData.EventDate);

                //send the json object to the correct update*.php file
                $http({
                    method: 'POST',
                    url: "./php/physical-fitness_updateTasks.php",
                    data: Object.toparams(sendData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function (response) {
                        //only show saved message after last task saved.
                        numSaved++;
                        if (numSaved === $scope.tasks.length)
                            alert("Physical Fitness Tasks Updated!");
                    }, function (result) {
                        alert("Error saving tasks");
                    });
            }
        }

    };

    $scope.cancelTasksUpdate = function()
    {
        $scope.editTasks = false;
        $scope.tasks = angular.copy($scope.tasksBackup);
    };

    $scope.makeTestsEditable = function()
    {
        $scope.editTests = true;
        //create backup of tasks
        $scope.testsBackup = angular.copy($scope.tests);

    };
    $scope.saveTestsUpdate = function()
    {
        var numSaved = 0;
        //
        $scope.editTests = false;

        //copy rows of Task table
        for (var j=0; j<$scope.tests.length; j++)
        {
            var sendData = angular.copy($scope.tests[j]);

            delete sendData.Task;
            delete sendData.TaskNumber;
            sendData.PTDate = convertToSqlDate(sendData.PTDate);

            //send the json object to the correct update*.php file
            $http({
                method: 'POST',
                url: "./php/physical-fitness_updateTests.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (response) {
                    //only show saved message after last task saved.
                    numSaved++;
                    if (numSaved === $scope.tests.length)
                        alert("Physical Fitness Tests Updated!");
                }, function (result) {
                    alert("Error saving tests.");
                });
        }

    };

    $scope.cancelTestsUpdate = function()
    {
        $scope.editTests = false;
        $scope.tests = angular.copy($scope.testsBackup);
    };

    $scope.makePTDetailsEditable = function()
    {
        $scope.editPTDetails = true;
        //create backup of tasks
        $scope.ptDetailsBackup = angular.copy($scope.PTDetails);

    };

    $scope.savePTDetailsUpdate = function()
    {

        //
        $scope.editPTDetails = false;

        //copy rows of Task table
        for (var a=0; a < $scope.tests.length; a++)
        {
            var numSaved = 0;
            for (var b = 0; b < $scope.tests[a].details.length; b++)
            {
                    var sendData = angular.copy($scope.tests[a].details[b]);

                    //send the json object to the correct update*.php file
                    $http({
                        method: 'POST',
                        url: "./php/physical-fitness_updatePTDetails.php",
                        data: Object.toparams(sendData),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(
                        function (response) {
                            //only show saved message after last task saved.
                            numSaved++;
                            if (numSaved === $scope.tests.length)
                                alert("PT Details Updated!");
                        }, function (result) {
                            alert("Error saving tests.");
                        });
            }
        }

    };

    $scope.cancelPTDetailsUpdate = function()
    {
        $scope.editPTDetails = false;
        $scope.PTDetails = angular.copy($scope.ptDetailsBackup);
    };


    var myRequest= {cadet: $scope.cadetID};


    $http ({
        method: 'POST',
        url: "./php/physical-fitness_retrievePhysFit2.php",
        data: Object.toparams(myRequest),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(
        function(result)
        {
            //alert("updated: [physical-fitness_retrievePhysFit2.php" + JSON.stringify(result));

            //split result into variables
            $scope.tasks=result.data.tasks;
            $scope.tests=result.data.data;
            $scope.PTDetails=result.data.PTDetails;



            for(var i=0; i<$scope.tasks.length; i++)
            {
                if ($scope.tasks[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                    $scope.tasks[i].EventDate = convertToHtmlDate($scope.tasks[i].EventDate);
                    $scope.tasks[i].DidPass = '1';

                }
                else {
                    $scope.tasks[i].EventDate = new Date("");
                    $scope.tasks[i].DidPass = '0';
                }
            }


            for(var j=0; j<$scope.tests.length; j++)
            {
                $scope.tests[j].PTDate=convertToHtmlDate($scope.tests[j].PTDate);
            }

        },function(result){
            alert(result);
        });


    $scope.convertDatesInObjectToHtml = function (myObject)
    {
        for (var fieldName in myObject) {
            //Check to see if property name contains Date
            if (fieldName.includes("EventDate")) {
                if (myObject[fieldName] !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL
                    myObject[fieldName] = convertToHtmlDate(myObject[fieldName]);
                }
                else {
                    myObject[fieldName] = new Date("");
                }
            }
        }
    };

    $scope.convertDatesInArrayToHtml = function( myArray)
    {
        let index = 0;
        while (index < myArray.length) {
            $scope.convertDatesInObjectToHtml(myArray[index]);
            index++;
        }
    };
    $scope.convertDatesInArrayToSql = function( myArray)
    {
        let index = 0;
        while (index < myArray.length) {
            $scope.convertDatesInObjectToSql(myArray[index]);
            index++;
        }
    };
    $scope.convertDatesInObjectToSql = function( myObject)
    {
        for (var fieldName in myObject) {
            //Check to see if property name contains Date
            if (fieldName.includes("EventDate")) {
                if (myObject[fieldName] !== null) {//IF DATE IS NOT NULL
                    myObject[fieldName] = convertToSqlDate(myObject[fieldName]);
                }
                else {
                    myObject[fieldName] = "";
                }
            }
        }
    };

    $scope.calcBMI = function(PTHeight, PTWeight)
    {
        let bmi;
        if(PTHeight != null && PTWeight != null)
        {
            bmi = (703 * PTWeight / (Math.pow(PTHeight, 2))).toFixed(2);
        }
        return bmi;
    }

});