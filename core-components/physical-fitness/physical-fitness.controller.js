// physical-fitness.controller.js
// 
// 


angular.module('core-components.physical-fitness').controller('physicalFitnessController', function($scope, $http, $window) {

    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));

    $scope.tasks=[];
    $scope.tests=[];
    $scope.PTDetails=[];
    $scope.editTasks = false;
    $scope.editTests = false;
    $scope.editPTDetails = false;
    $scope.showTest = false;
    $scope.flags=[1,1,1];


    $scope.showTable = function(index)
    {
        return $scope.flags[index] == '1';
    };


  //  minDate();
   $scope.showTest = function(index)
    {
        if(index == "2(a)") {
            if ($scope.flags[0] == 0) {
                $scope.flags[0] = 1;
            } else {
                $scope.flags[0] = 0;
            }
        }
        else if(index == "2(b)")
        {
            if ($scope.flags[1] == 0) {
                $scope.flags[1] = 1;
            } else {
                $scope.flags[1] = 0;
            }
        }
        else if(index == "2(c)")
        {
            if ($scope.flags[2] == 0) {
                $scope.flags[2] = 1;
            } else {
                $scope.flags[2] = 0;
            }
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
                $scope.tasks[i].EventDate=convertToHtmlDate($scope.tasks[i].EventDate);
            }


            for(var j=0; j<$scope.tests.length; j++)
            {
                $scope.tests[j].PTDate=convertToHtmlDate($scope.tests[j].PTDate);
            }

           //$scope.convertDatesInArrayToHtml(  $scope.tasks);
           // $scope.convertDatesInArrayToHtml(  $scope.tests);
        },function(result){
            alert(result);
        });



  /*  $scope.cancelUpdate = function(section) {
        if(section=="tasks")
        {
            $scope.tasks = angular.copy($scope.backup_tasks);
            $scope.editTasks = true;

            document.getElementById("editButtonTasks").style.display = "block";

            var element1 = document.getElementById("taskSaveCancelButtons");
            if (element1.style.display == 'block')
            {
                element1.style.display = 'none';
            }
        }
        else if(section=="tests")
        {
            $scope.tests = angular.copy($scope.backup_tests);
            $scope.editTests = true;

            document.getElementById("editButtonTests").style.display = "block";
            var element1 = document.getElementById("testSaveCancelButtons");
            if (element1.style.display == 'block')
            {
                element1.style.display = 'none';
            }
        }
    };
*/
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



   /* function minDate()
    {
        let min = new Date(),
            day = min.getDate(),
            month = min.getMonth() + 1, //January is 0
            year = min.getFullYear();

        if (day < 10)
        {
            day = '0' + day
        }

        if (month < 10)
        {
            month = '0' + month
        }

        min = year + '-' + month + '-' + day;
        let today = min.toString();

        let list = document.getElementsByClassName("LF-Date");
        for (let i = 0; i < list.length; i++)
        {
            list[i].setAttribute("min",today);
        }
    }


    function dateFormat(dateArray)
    {

        let month;

        if(dateArray[1]==='Jan')
            month="01";
        else if(dateArray[1]==='Feb')
            month="02";
        else if(dateArray[1]==='Mar')
            month="03";
        else if(dateArray[1]==='Apr')
            month="04";
        else if(dateArray[1]==='May')
            month="05";
        else if(dateArray[1]==='Jun')
            month="06";
        else if(dateArray[1]==='Jul')
            month="07";
        else if(dateArray[1]==='Aug')
            month="08";
        else if(dateArray[1]==='Sep')
            month="09";
        else if(dateArray[1]==='Oct')
            month="10";
        else if(dateArray[1]==='Nov')
            month="11";
        else
            month="12";
        let dateString=dateArray[3]+'-'+month+'-'+dateArray[2];

        return dateString;
    }
*/
});