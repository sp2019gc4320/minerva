

angular.module('core-components.life-skills').controller('lifeSkillsController', function($scope, $http, $window) {



//Hardcoded in for now. Once a cadetID is stored in localStorage, switch the two statments below.
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));


    //$scope.cadetID = "7"; //with data
    //alert("setting cadetID  for testing: " +$scope.cadetID);


    $scope.editTasks = false;
    $scope.editTests = false;
    //$scope.corecomponent;
    //$scope.editable= false; // Tasks are editable
    //$scope.editableTests=false; //Tests are editable
    //$scope.editableTaskEvents=false;//TaskEvents Are Editable;
    $scope.currTask="";
    $scope.currTest="";


    $scope.setCurrTask=function(TaskName)
    {
        $scope.currTask=TaskName;
    };

    $scope.setCurrTest=function(TestName)
    {
        $scope.currTest=TestName;
    };

 /*   $scope.showTasks= function()
    {
        $http({
            method: 'POST',
            url: './php/life-skills_retrieveLifeSkillsTasks.php',
            data: Object.toparams(corecomponent),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCCESS
            function (result){
                //   alert(JSON.stringify(result));
                $scope.tasks = result.data.taskTbl;
            }
        )};
*/
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
/*
    $scope.saveTasksUpdate = function()
    {

        var updates=angular.copy($scope.tasks);
        console.log($scope.tasksBackup);

        for (let i =0; i< $scope.tasksBackup.length; i++)
        {
            let id = $scope.tasksBackup[i].TaskID;

            let found = false;
            for(let j =0; j< $scope.tasks.length; j++)
            {
                if (id == $scope.tasks[j].TaskID)
                {
                    found = true;
                }
            }
            //mark scores that should be deleted from the database
            if (!found)
            {
                var update = angular.copy($scope.tasksBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }
        for(var i=0; i<updates.length;i++)
        {
            $scope.numSaved=0;
            var sendData= angular.copy(updates[i]);

            delete sendData.Task;
            delete sendData.TaskNumber;
            sendData.EventDate = convertToSqlDate(sendData.EventDate);

            $http ({
                method: 'POST',
                url: "./php/life-skills_updateTasks.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {

                    if(response.data)
                    {

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
        $scope.editTasks = false;
    };
    */
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
                //sendData.MaxDate = convertToSqlDate($scope.currTask.MaxDate);

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


    $scope.showTests=function($taskID)
    {
        var sendData= {cadetID: $scope.cadetID, TaskID: $taskID};
        //var sendData= angular.copy($scope.tasks[0]);
        //ALTER TABLE `tblCadetClassEvents` ADD `CadetClassEventID` INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`CadetClassEventID`);
        //sendData['TaskID']=$taskID;
        $http({
            method: 'POST',
            url: './php/life-skills_retrieveLifeSkillsTests.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCCESS
            function (result){
                //   alert(JSON.stringify(result));
                $scope.tests = result.data.testTbl;

                for(let i=0; i<$scope.tests.length; i++) {
                    if ($scope.tests[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                        $scope.tests[i].EventDate = convertToHtmlDate($scope.tests[i].EventDate);
                        $scope.tests[i].DidPass = '1';

                    }
                    else {
                        $scope.tests[i].EventDate = new Date("");
                        $scope.tests[i].DidPass = '0';
                    }
                }
            }
        )};

    $scope.retrieveTests=function($taskID)
    {
        var sendData= {cadetID: $scope.cadetID, TaskID: $taskID};
        //var sendData= angular.copy($scope.tasks[0]);
        //ALTER TABLE `tblCadetClassEvents` ADD `CadetClassEventID` INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`CadetClassEventID`);
        //sendData['TaskID']=$taskID;
        $http({
            method: 'POST',
            url: './php/life-skills_retrieveLifeSkillsTests.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCCESS
            function (result){
                //   alert(JSON.stringify(result));
                $scope.testDates = result.data.testTbl;


                for(let i=0; i<$scope.testDates.length; i++) {
                    if ($scope.testDates[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                        $scope.testDates[i].EventDate = convertToHtmlDate($scope.testDates[i].EventDate);
                        $scope.testDates[i].DidPass = '1';

                    }
                    else {
                        $scope.testDates[i].EventDate = new Date("");
                        $scope.testDates[i].DidPass = '0';
                    }
                }

                var maxDate = $scope.testDates[0].EventDate;
                for(let j=1; j<$scope.testDates.length; j++)
                {
                    if($scope.testDates[j].EventDate > maxDate)
                    {
                        maxDate = $scope.testDates[j].EventDate;
                    }
                }
                return maxDate;
            }
        )};


 /*   $scope.getTestDates=function($taskID)
    {
        var sendData= {cadetID: $scope.cadetID, TaskID: $taskID};
        //var sendData= angular.copy($scope.tasks[0]);
        //sendData['TaskID']=$taskID;
        $http({
            method: 'POST',
            url: './php/life-skills_retrieveLifeSkillsTests.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCCESS
            function (result) {
                //   alert(JSON.stringify(result));
                $scope.testDates = result.data.testTbl;

                for (let i = 0; i < $scope.testDates.length; i++) {
                    if ($scope.testDates[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                        $scope.testDates[i].EventDate = convertToHtmlDate($scope.testDates[i].EventDate);

                    } else
                        $scope.testDates[i].EventDate = new Date("");
                }
                var updates = angular.copy($scope.testDates);
                for (let i = 0; i < $scope.testDates.length; i++) {
                    let id = $scope.testDates[i].TaskTestID;

                    let found = false;
                    for (let j = 0; j < $scope.testDates.length; j++) {
                        if (id == $scope.testDates[j].TaskTestID) {
                            found = true;
                        }
                    }
                    //mark scores that should be deleted from the database
                    if (!found) {
                        var update = angular.copy($scope.testDates[i]);
                        update.op = "DELETE";
                        updates.push(update);
                    }
                }
                var maxDate = updates[0].EventDate;
                for (var i = 0; i < updates.length; i++) {
                    $scope.numSaved = 0;
                    var findMaxDate = angular.copy(updates[i]);

                    delete findMaxDate.Task;
                    delete findMaxDate.TaskNumber;
                    if (findMaxDate.EventDate > maxDate) maxDate = findMaxDate.EventDate;
                    //sendData.EventDate = convertToSqlDate(sendData.EventDate);
                }
                return maxDate;
            }
        )};
*/

    $scope.makeTestsEditable = function()
    {
        $scope.editTests = true;
        //create backup of tasks
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
                if (id == $scope.tests[j].TaskTestID)
                {
                    found = true;
                }
            }
            //mark scores that should be deleted from the database
            if (!found)
            {
                var update = angular.copy($scope.testsBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }
        var maxDate = updates[0].EventDate;
        for(var i=0; i<updates.length;i++)
        {
            $scope.numSaved=0;
            var sendData= angular.copy(updates[i]);

            //sendData.MaxDate = maxDate;
            delete sendData.Task;
            delete sendData.TaskNumber;
            if(sendData.EventDate > maxDate) maxDate = sendData.EventDate;
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
        $scope.currTask.EventDate = maxDate;
        $scope.currTask.MaxDate = maxDate;
        for(var i=0;i<$scope.tasks.length;i++)
        {
            if($scope.tasks[i].TaskName == $scope.currTask)
            {
                $scope.tasks[i].EventDate = $scope.currTask.EventDate;
            }
        }
        //ALTER TABLE `tblCadetClassEvents` ADD `MaxDate` DATETIME NULL AFTER `EventDate`;
        //$scope.tasks[0].MaxDate = maxDate;
        $scope.saveTasksUpdate();
    };
 /*   $scope.saveTestsUpdate = function()
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
 */

//request data for jsView.html when it is opened



//request the data
    $scope.getTasks = function() {
        var myRequest= {cadetID: $scope.cadetID};
        $http({
            method: 'POST',
            url: "./php/life-skills_retrieveLifeSkillsTasks.php",
            data: Object.toparams(myRequest),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function (result) {
                $scope.tasks = result.data.taskTbl;
                $scope.allTasks = result.data.allTasks;
                $scope.testIDs = result.data.testIDs;


                for (let i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                        $scope.tasks[i].EventDate = convertToHtmlDate($scope.tasks[i].EventDate);
                        $scope.tasks[i].DidPass = '1';

                    } else {
                        $scope.tasks[i].EventDate = new Date("");
                        $scope.tasks[i].DidPass = '0';
                    }

                }

                for (let i = 0; i < $scope.allTasks.length; i++) {
                    if ($scope.allTasks[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                        $scope.allTasks[i].EventDate = convertToHtmlDate($scope.allTasks[i].EventDate);
                        $scope.allTasks[i].DidPass = '1';

                    } else {
                        $scope.allTasks[i].EventDate = new Date("");
                        $scope.allTasks[i].DidPass = '0';
                    }

                }

                let maxDate1 = $scope.allTasks[0].EventDate;
                for(let j = 1; j < 3; j++)
                {
                    if($scope.allTasks[j].EventDate > maxDate1)
                    {
                        maxDate1 = $scope.allTasks[j].EventDate;
                        $scope.tasks[0].EventDate = maxDate1;
                    }
                }

                let maxDate2 = $scope.allTasks[5].EventDate;
                for(let k = 6; k < 10; k++)
                {
                    if($scope.allTasks[k].EventDate > maxDate2)
                    {
                        maxDate2 = $scope.allTasks[k].EventDate;
                        $scope.tasks[3].EventDate = maxDate2;
                    }
                }

                let maxDate3 = $scope.allTasks[10].EventDate;
                for(let l = 11; l < 12; l++)
                {
                    if($scope.allTasks[l].EventDate > maxDate3)
                    {
                        maxDate3 = $scope.allTasks[l].EventDate;
                        $scope.tasks[4].EventDate = maxDate3;
                    }
                }

                for(let x = 0; x < 3; x++)
                {
                    if ($scope.allTasks[x].EventDate === "0000-00-00 00:00:00")
                    {
                        $scope.allTasks[x].DidPass = '0';
                    }
                }

                for(let y = 5; y < 10; y++)
                {
                    if ($scope.allTasks[y].EventDate === "0000-00-00 00:00:00")
                    {
                        $scope.allTasks[y].DidPass = '0';
                    }
                }

                for(let z = 10; z < 12; z++)
                {
                    if ($scope.allTasks[z].EventDate === "0000-00-00 00:00:00")
                    {
                        $scope.allTasks[z].DidPass = '0';
                    }
                }

                if($scope.allTasks[0].DidPass == 1 && $scope.allTasks[1].DidPass == 1 && $scope.allTasks[2].DidPass == 1)
                {
                    $scope.tasks[0].DidPass = '1';
                }
                else{
                    $scope.tasks[0].DidPass = '0';
                }

                if($scope.allTasks[5].DidPass == 1 && $scope.allTasks[6].DidPass == 1 && $scope.allTasks[7].DidPass == 1 && $scope.allTasks[8].DidPass == 1 && $scope.allTasks[9].DidPass == 1)
                {
                    $scope.tasks[3].DidPass = '1';
                }
                else{
                    $scope.tasks[3].DidPass = '0';
                }

                if($scope.allTasks[10].DidPass == 1 && $scope.allTasks[11].DidPass == 1)
                {
                    $scope.tasks[4].DidPass = '1';
                }
                else{
                    $scope.tasks[4].DidPass = '0';
                }


            }, function (result) {
                alert(result);
            });
    };
    $scope.getTasks();



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


    $scope.store = function(index)
    {
        $scope.curIndex = index;
    };

    $scope.current = function(index)
    {
        if (index === $scope.curIndex )
            return "alert-info";
        else
            return "";
    };

    $scope.storeTaskTest = function(index)
    {
        $scope.curTaskTestIndex = index;
    };

    $scope.currentTaskTest = function(index)
    {
        if (index === $scope.curTaskTestIndex )
            return "alert-info";
        else
            return "";
    };

});

