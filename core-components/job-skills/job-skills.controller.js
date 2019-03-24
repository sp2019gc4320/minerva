//File: job-skills.controller.js
//This code is the controller for the job skills main view: job-skills.view.html
//This code uses job-skills.view.html, job-skills_retrieveJobSkills.php,
// job_skills_updateTasks.php, job-skills_updatejobTests.php job-skills_updateAsvab.php
//  job-skills_createdASVAB.php
//This will take the input of a cadetID via local storage
//This code will output post requests and put data into the scope
//This code takes jsons as input from retrieveJobSkills.php
//This code also has an update function that is invoked in jsView.html

angular.module('core-components.job-skills').controller('jobSkillsController', function($scope, $http, $window) {



//Hardcoded in for now. Once a cadetID is stored in localStorage, switch the two statments below.
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));

    alert("Testing  with Cadet 7 - William Bowles to see sample data");
    //$scope.cadetID = "7"; //with data
    //alert("setting cadetID  for testing: " +$scope.cadetID);

    $scope.tempAsvab ={};
    $scope.editTasks = false;
    $scope.editTests = false;
    $scope.editAsbav = false;


    $scope.makeAsvabEditable = function()
    {
        $scope.editAsvab = true;
        //create backup of tasks
        $scope.asvabBackup = angular.copy($scope.asvabs);

    };

    $scope.deleteAsvab = function (index)
    {
        $scope.asvabs.splice(index,1);
    };



        $scope.saveAsvabUpdate = function()
    {
        var numSaved = 0;
        //
        $scope.editAsvab = false;

        var updates = angular.copy($scope.asvabs);

        //Find deleted asvab scores
        for (let i =0; i< $scope.asvabBackup.length; i++) {
            let id = $scope.asvabBackup[i].ASVABID;

            let found = false;
            for(let j =0; j< $scope.asvabs.length; j++) {
                if (id == $scope.asvabs[j].ASVABID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found){
                var update = angular.copy($scope.asvabBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        };

        //Send update requests to the server
        for (var j=0; j<updates.length; j++)
        {
                var sendData = angular.copy(updates[j]);
                delete sendData.Task;
                delete sendData.TaskNumber;
                sendData.ASVABDate = convertToSqlDate(sendData.ASVABDate);

                //send the json object to the correct update*.php file
                $http({
                    method: 'POST',
                    url: "./php/job-skills_updateAsvab.php",
                    data: Object.toparams(sendData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function (response) {
                        //only show saved message after last task saved.
                        numSaved++;
                        if (numSaved === $scope.asvabs.length)
                            alert("Asvabs Update");
                    }, function (result) {
                        alert("Error saving asvabs");
                    });
            }


    };
    $scope.cancelAsvabUpdate = function()
    {
        $scope.editAsvab = false;
        $scope.asvabs = angular.copy($scope.asvabBackup);
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
                    url: "./php/job-skills_updateTasks.php",
                    data: Object.toparams(sendData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function (response) {
                        //only show saved message after last task saved.
                        numSaved++;
                        if (numSaved === $scope.tasks.length)
                            alert("Tasks Update");
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
                    url: "./php/job-skills_updateTests.php",
                    data: Object.toparams(sendData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function (response) {
                        //only show saved message after last task saved.
                        numSaved++;
                        if (numSaved === $scope.tests.length)
                            alert("Job Skill Tests Updated");
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




//create new record for asvab
    $scope.addASVAB = function()
    {
        //set flag to show new record
        $scope.showNewAsvab = true;

        //Clear text
        $scope.tempAsvab.ASVABDate = new Date();
        $scope.tempAsvab.ASVABTechScore = "";
        $scope.tempAsvab.AFQTScore="";
        $scope.tempAsvab.ASVABTestNotes="";
    };


    $scope.cancelAsvabCreate = function()
    {
        $scope.showNewAsvab = false;

    };

    $scope.saveAsvabCreate = function()
    {
        $scope.showNewAsvab = false;

        var sendData=angular.copy($scope.tempAsvab);
        
        sendData.fkClassDetailID = $scope.tasks[0].fkClassDetailID;
        sendData.ASVABDate = convertToSqlDate(sendData.ASVABDate);

        //create data entry using createDuty.php
        $http ({
            method: 'POST',
            url: "./php/job-skills_createASVAB.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(response)
            {
                if(response.data)
                    //give new entry unique id
                    sendData.ASVABID=response.data.id;
                    //display new entry

                sendData.ASVABDate = convertToHtmlDate(sendData.ASVABDate);
                    $scope.asvabs.push(sendData);
                    //alert("data updated");
            },function(result)
            {
        });
    };



//request data for jsView.html when it is opened
var myRequest= {cadetID: $scope.cadetID};

//request the daata
        $http ({
            method: 'POST',
            url: "./php/job-skills_retrieveJobSkills.php",
            data: Object.toparams(myRequest),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
        function(result)
        {
            $scope.tasks = result.data.taskTbl;
            $scope.tests = result.data.testTbl;
            $scope.testIDs= result.data.testIDs;
            $scope.asvabs = result.data.asvabTbl;


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
            for(let i=0; i<$scope.asvabs.length; i++) {
                if ($scope.asvabs[i].ASVABDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                    $scope.asvabs[i].ASVABDate = convertToHtmlDate($scope.asvabs[i].ASVABDate);

                }
                else
                    $scope.asvabs[i].ASVABDate = new Date("");
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