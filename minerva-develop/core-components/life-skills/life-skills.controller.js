//To be used in conjunction with life-skills.view.html and life-skills.module.js

angular.module('core-components.life-skills').controller('lifeSkillsController', function($scope, $http, $window) {



    //Set cadetID to the cadetID that is stored in localStorage
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));

    $scope.editTasks = false;
    $scope.editTests = false;
    $scope.currTask="";
    $scope.currTest="";

    //sets the current task for the showTests() function
    $scope.setCurrTask=function(TaskName)
    {
        $scope.currTask=TaskName;
    };
    //sets the current test to access the test name
    $scope.setCurrTest=function(TestName)
    {
        $scope.currTest=TestName;
    };

    $scope.makeTasksEditable = function()
    {
        $scope.editTasks = true;
        //create backup of tasks
        $scope.tasksBackup = angular.copy($scope.tasks);

    };

    $scope.cancelTasksUpdate = function()
    {
        $scope.editTasks = false;
        $scope.tasks = angular.copy($scope.tasksBackup);
    };

     $scope.saveTasksUpdate = function()
     {
        var numSaved = 0;
        //
        $scope.editTasks = false;

        //copy rows of Task table
        for (var j=0; j<$scope.tasks.length; j++)
        {
            var sendData = angular.copy($scope.tasks[j]);
            //Only send tasks that do not have tests associated with them
           if($scope.tasks[j].fkTaskTestEventID == null) {


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
                        if (numSaved === $scope.tasks.length-$scope.testIDs.length)
                            alert("Life Skills Tasks Updated!");
                    }, function (result) {
                        alert("Error saving tasks");
                    });
            }
        }

     };

    //Function implemented for the "Show Tests" button. Retrieves tests specific to the $taskID of the row you clicked the button on
    $scope.showTests=function($taskID)
    {
        var sendData= {cadetID: $scope.cadetID, TaskID: $taskID};
        
        $http({
            method: 'POST',
            url: './php/life-skills_retrieveLifeSkillsTests.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (result){
                
                $scope.tests = result.data.testTbl;

                for(let i=0; i<$scope.tests.length; i++) {
                    if ($scope.tests[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                        $scope.tests[i].EventDate = convertToHtmlDate($scope.tests[i].EventDate);
                        $scope.tests[i].DidPass = '1';

                    }
                    else { //IF THE DATE IS NULL
                        $scope.tests[i].EventDate = new Date("");
                        $scope.tests[i].DidPass = '0';
                    }
                }
            }
        )};

    $scope.makeTestsEditable = function()
    {
        $scope.editTests = true;
        //create backup of tests
        $scope.testsBackup = angular.copy($scope.tests);

    };

    $scope.cancelTestsUpdate = function()
    {
        $scope.editTests = false;
        $scope.tests = angular.copy($scope.testsBackup);
    };

    $scope.saveTestsUpdate=function()
    {

        var updates=angular.copy($scope.tests);
        for (let i =0; i< $scope.testsBackup.length; i++)
        {
            let id = $scope.testsBackup[i].TaskTestID;

            let found = false;
            for(let j =0; j< $scope.tests.length; j++)
            {
                if (id == $scope.tests[j].TaskTestID) //Organize tests by TaskTestID
                {
                    found = true;
                }
            }
            //mark scores that should be deleted from the database. Used in our attempt to make dates/did pass dynamic when saving
            if (!found)
            {
                var update = angular.copy($scope.testsBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }
        var maxDate = updates[0].EventDate; //Initialize the maximum date to the first date found in the array of tasks with the same task number
        for(var i=0; i<updates.length;i++)
        {
            $scope.numSaved=0;
            var sendData= angular.copy(updates[i]);

            delete sendData.Task;
            delete sendData.TaskNumber;
            if(sendData.EventDate > maxDate) maxDate = sendData.EventDate; //Determine the maximum date out of specific tests
            sendData.EventDate = convertToSqlDate(sendData.EventDate);

            $http ({
                method: 'POST',
                url: "./php/life-skills_updateTests.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {

                        //this only needs to be saved once all changes are saved.
                        $scope.numSaved++;
                        if($scope.numSaved == $scope.tests.length)
                            alert("Changes Saved.");
                        $scope.showTests();

                //location.reload(true);
                },function(result){
                    alert("Failed");
                });
        }
        $scope.editTests = false;
        $scope.currTask.EventDate = maxDate; //Set the current task's date to  the max date
        $scope.currTask.MaxDate = maxDate; //Attempt at dynamic date conversion between tables
        for(var i=0;i<$scope.tasks.length;i++) //Goes through tasks and updates the EventDate based on the currTask's task name
        {
            if($scope.tasks[i].TaskName == $scope.currTask)
            {
                $scope.tasks[i].EventDate = $scope.currTask.EventDate;
            }
        }
        //Update the tasks after saving the tests
        $scope.saveTasksUpdate();
    };


    //Function to retrieve task table data upon loading page
    $scope.getTasks = function() {
        var myRequest= {cadetID: $scope.cadetID};
        $http({
            method: 'POST',
            url: "./php/life-skills_retrieveLifeSkillsTasks.php",
            data: Object.toparams(myRequest),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (result) {
                $scope.tasks = result.data.taskTbl; //Tasks without repeats
                $scope.allTasks = result.data.allTasks; //Tasks with repeats for date/did pass comparison
                $scope.testIDs = result.data.testIDs; //TaskIDs for tasks that have repeats, used in hasTests() function


                for (let i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i].EventDate !== "0000-00-00 00:00:00") { //IF DATE IS NOT NULL

                        $scope.tasks[i].EventDate = convertToHtmlDate($scope.tasks[i].EventDate);
                        $scope.tasks[i].DidPass = '1';

                    } else {
                        $scope.tasks[i].EventDate = new Date(""); //IF DATE IS NULL
                        $scope.tasks[i].DidPass = '0';
                    }

                }

                for (let i = 0; i < $scope.allTasks.length; i++) {
                    if ($scope.allTasks[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                        $scope.allTasks[i].EventDate = convertToHtmlDate($scope.allTasks[i].EventDate);
                        $scope.allTasks[i].DidPass = '1';

                    } else {
                        $scope.allTasks[i].EventDate = new Date(""); //IF DATE IS NULL
                        $scope.allTasks[i].DidPass = '0';
                    }

                }
                
                //CAUTION: This section of data manipulation had to be hardcoded due to 3 different tasks
                //having expandable test tables that include all of the tasks with that same Task ID. 
                //If future tasks are added, these indexes will be subject to change, however comments
                //have been added so that the logic is fully understood
                
                let maxDate1 = $scope.allTasks[0].EventDate; //Initializing maxDate1 to the date of the first 1(a) task
                for(let j = 1; j < 3; j++) //Iterate through the first 3 tasks in allTasks, in other words, all 1(a) tasks
                {
                    if($scope.allTasks[j].EventDate > maxDate1) //Compare each of the 1(a) tasks' dates to that of the first 1(a) task
                    {
                        maxDate1 = $scope.allTasks[j].EventDate; //Update value of maxDate1 if another 1(a) task has a later date
                        $scope.tasks[0].EventDate = maxDate1; //Set the value of tasks[0].EventDate, or the displayed task 1(a)'s date, to the maxDate of the 3. This is what will be displayed in the task table 
                    }
                }

                let maxDate2 = $scope.allTasks[5].EventDate;//Initializing maxDate2 to the date of the first '2' task
                for(let k = 6; k < 10; k++) //Iterate through the 5 tasks in allTasks that have task number 2, in other words, all '2' tasks
                {
                    if($scope.allTasks[k].EventDate > maxDate2) //Compare each of the '2' tasks' dates to that of the first '2' task
                    {
                        maxDate2 = $scope.allTasks[k].EventDate; //Update value of maxDate2 if another '2' task has a later date
                        $scope.tasks[3].EventDate = maxDate2; //Set the value of tasks[3].EventDate, or the displayed task '2' date, to the maxDate of the 5. This is what will be displayed in the task table
                    }
                }

                let maxDate3 = $scope.allTasks[10].EventDate;//Initializing maxDate3 to the date of the first '3' task
                for(let l = 11; l < 12; l++) //Iterate through the 2 tasks in allTasks that have task number 3, in other words, all '3' tasks
                {
                    if($scope.allTasks[l].EventDate > maxDate3)//Compare each of the '3' tasks' dates to that of the first '3' task
                    {
                        maxDate3 = $scope.allTasks[l].EventDate;//Update value of maxDate3 if another '3' task has a later date
                        $scope.tasks[4].EventDate = maxDate3;//Set the value of tasks[4].EventDate, or the displayed task '3' date, to the maxDate of the 2. This is what will be displayed in the task table
                    }
                }

                for(let x = 0; x < 3; x++) //Check all 1(a) tasks to see if any of the dates are null, and if they are set DidPass to 0 for the allTasks table
                {
                    if ($scope.allTasks[x].EventDate === "0000-00-00 00:00:00")
                    {
                        $scope.allTasks[x].DidPass = '0';
                    }
                }

                for(let y = 5; y < 10; y++) //Check all '2' tasks to see if any of the dates are null, and if they are set DidPass to 0 for the allTasks table
                {
                    if ($scope.allTasks[y].EventDate === "0000-00-00 00:00:00")
                    {
                        $scope.allTasks[y].DidPass = '0';
                    }
                }

                for(let z = 10; z < 12; z++) //Check all '3' tasks to see if any of the dates are null, and if they are set DidPass to 0 for the allTasks table
                {
                    if ($scope.allTasks[z].EventDate === "0000-00-00 00:00:00")
                    {
                        $scope.allTasks[z].DidPass = '0';
                    }
                }

                if($scope.allTasks[0].DidPass == 1 && $scope.allTasks[1].DidPass == 1 && $scope.allTasks[2].DidPass == 1) //Check all 1(a) tasks to see if any of them have a DidPass = 0, and if not set the DidPass for the task 1(a) as 1, which will display in the task table
                {
                    $scope.tasks[0].DidPass = '1';
                }
                else{
                    $scope.tasks[0].DidPass = '0'; //If any of the 3 tasks did not pass, set the displayed task's DidPass to 0
                }

                if($scope.allTasks[5].DidPass == 1 && $scope.allTasks[6].DidPass == 1 && $scope.allTasks[7].DidPass == 1 && $scope.allTasks[8].DidPass == 1 && $scope.allTasks[9].DidPass == 1) //Check all '2' tasks to see if any of them have a DidPass = 0, and if not set the DidPass for the task '2' as 1, which will display in the task table
                {
                    $scope.tasks[3].DidPass = '1';
                }
                else{
                    $scope.tasks[3].DidPass = '0'; //If any of the 5 tasks did not pass, set the displayed task's DidPass to 0
                }

                if($scope.allTasks[10].DidPass == 1 && $scope.allTasks[11].DidPass == 1) //Check all '3' tasks to see if any of them have a DidPass = 0, and if not set the DidPass for the task '3' as 1, which will display in the task table
                {
                    $scope.tasks[4].DidPass = '1';
                }
                else{
                    $scope.tasks[4].DidPass = '0'; //If either of the 2 tasks did not pass, set the displayed task's DidPass to 0
                }


            }, function (result) {
                alert(result);
            });
    };
    $scope.getTasks(); //Automatically call when the page loads to populate task table data


    //Checks whether or not a task has multiple tasks(tests) included, only the tasks that have an id included in testIDs have multiple entries
    $scope.hasTests = function hasTests(task) {
        var found = $scope.testIDs.includes(task.TaskID);
        if (found)
        {
            return true;
        }
        else {
            return false;
        }
    };

    //Stores the current index 
    $scope.store = function(index)
    {
        $scope.curIndex = index;
    };
    //Checks index against the current task's index
    $scope.current = function(index)
    {
        if (index === $scope.curIndex )
            return "alert-info";
        else
            return "";
    };
    //Stores the current task test
    $scope.storeTaskTest = function(index)
    {
        $scope.curTaskTestIndex = index;
    };
    //Checks index against the current task's task test index
    $scope.currentTaskTest = function(index)
    {
        if (index === $scope.curTaskTestIndex )
            return "alert-info";
        else
            return "";
    };

});

