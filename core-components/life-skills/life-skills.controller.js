

angular.module('core-components.life-skills').controller('lifeSkillsController', function($scope, $http, $window) {



//Hardcoded in for now. Once a cadetID is stored in localStorage, switch the two statments below.
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));


    //$scope.cadetID = "7"; //with data
    //alert("setting cadetID  for testing: " +$scope.cadetID);


    $scope.editTasks = false;
    $scope.editTests = false;



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
            if($scope.tasks[j].fkTaskTestEventID != null) {
                var sendData = angular.copy($scope.tasks[j]);

                delete sendData.Task;
                delete sendData.TaskNumber;
                sendData.EventDate = convertToSqlDate(sendData.EventDate);

                //send the json object to the correct update*.php file
                $http({
                    method: 'POST',
                    url: "./php/life-skills_updateTasks.php",
                    data: Object.toparams(sendData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function (response) {
                        //only show saved message after last task saved.
                        numSaved++;
                        if (numSaved === $scope.tasks.length)
                            alert("Life Skills Tasks Updated!");
                    }, function (result) {
                        alert("Error saving tasks");
                    });
            }
            else {
                var sendData = angular.copy($scope.tasks[j]);

                delete sendData.Task;
                delete sendData.TaskNumber;
                sendData.EventDate = convertToSqlDate(sendData.EventDate);

                //send the json object to the correct update*.php file
                $http({
                    method: 'POST',
                    url: "./php/life-skills_updateTasksByID.php",
                    data: Object.toparams(sendData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function (response) {
                        //only show saved message after last task saved.
                        numSaved++;
                        if (numSaved === $scope.tasks.length)
                            alert("Life Skills Tasks Updated!");
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
                sendData.EventDate = convertToSqlDate(sendData.EventDate);

                //send the json object to the correct update*.php file
                $http({
                    method: 'POST',
                    url: "./php/life-skills_updateTests.php",
                    data: Object.toparams(sendData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function (response) {
                        //only show saved message after last task saved.
                        numSaved++;
                        if (numSaved === $scope.tests.length)
                            alert("Life Skill Tests Updated!");
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



//request data for jsView.html when it is opened
    var myRequest= {cadetID: $scope.cadetID};

//request the daata
    $http ({
        method: 'POST',
        url: "./php/life-skills_retrieveLifeSkills.php",
        data: Object.toparams(myRequest),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(
        function(result)
        {
            $scope.tasks = result.data.taskTbl;
            $scope.tests = result.data.testTbl;
            $scope.testIDs= result.data.testIDs;


            for(let i=0; i<$scope.tasks.length; i++) {
                if ($scope.tasks[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                    $scope.tasks[i].EventDate = convertToHtmlDate($scope.tasks[i].EventDate);

                }
                else
                    $scope.tasks[i].EventDate = new Date("");
            }
            for(let i=0; i<$scope.tests.length; i++) {
                if ($scope.tests[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                    $scope.tests[i].EventDate = convertToHtmlDate($scope.tests[i].EventDate);

                }
                else
                    $scope.tests[i].EventDate = new Date("");
            }

        },function(result){
            alert(result);
        });

    $scope.hasTests = function hasTests(task) {
        var found = $scope.testIDs.includes(task.fkTaskID);
        if (found) {


            task.EventDate = $scope.tests[0].EventDate;
            task.DidPass = $scope.tests[0].DidPass;
            let i = 1;
            while (i < $scope.tests.length) {

                if (task.DidPass == '1' && $scope.tests[i].DidPass == '1')
                    task.DidPass = '1';
                else
                    task.DidPass = '0';
                if ($scope.tests[i].EventDate > task.EventDate)
                    task.EventDate = $scope.tests[i].EventDate;
                i++;
            }
            return true;
        }
        else
            return false;
    };

});