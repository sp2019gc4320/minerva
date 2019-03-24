//File: job-skills.controller.js
//This code is the controller for the job skills main view: job-skills.view.html
//This code uses job-skills.view.html, job-skills_retrieveJobSkills.php, job_skills_updatejobSkills.php, job-skills_updatejobSkills2.php job-skills_updatejobSkills3.php
//  job-skills_createdASVAB.php
//This will take the input of a cadetID via local storage
//This code will output post requests and put data into the scope
//This code takes jsons as input from retrieveJobSkills.php
//This code also has an update function that is invoked in jsView.html
//Programmer: Kevin Krider

angular.module('core-components.job-skills').controller('jobSkillsController', function($scope, $http, $window) {



//Hardcoded in for now. Once a cadetID is stored in localStorage, switch the two statments below.
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));

    alert("Testing  with Cadet 7 - William Bowles to see sample data");
    $scope.cadetID = "7"; //with data
    //alert("setting cadetID  for testing: " +$scope.cadetID);

$scope.asvab ={};


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
                var sendData = angular.copy($scope.tasks[j]);

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
                        if (numSaved === $scope.tasks.length)
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
        $scope.asvab.ASVABDate = new Date();
        $scope.asvab.ASVABTechScore = "";
        $scope.asvab.AFQTScore="";
        $scope.asvab.ASVABTestNotes="";
    };

$scope.createASVAB = function() 
    {
        var sendData=angular.copy($scope.asvabs);
        
        sendData.fkClassDetailID = $scope.asvabs[0].ClassDetailID;
        

        JSON.stringify(sendData);

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
                    $scope.asvabs.push(sendData);
                    //alert("data updated");
            },function(result){
                    
        });
    };


//function to be called when updating the tables in jsview.html
$scope.update = function() 
{
    //copy rows of table
    for (var j=0; j<$scope.tasks.length; j++)
    {
    var sendData=angular.copy($scope.tasks[j]);

    delete sendData.Task;
    delete sendData.TaskNumber;
    
    //turn data into a json array
    JSON.stringify(sendData);
//send the json array to the correct update*.php file
$http ({
            method: 'POST',
            url: "./php/job-skills_updatejobSkills.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
        function(response)
        {
            if(response.data)
            
        alert("data updated")
        
        },function(result){
            
        });
    }
	
	//second table
	 //copy rows of table2
    for (var j=0; j<$scope.tests.length; j++)
    {
    var sendData2=angular.copy($scope.tests[j]);


    JSON.stringify(sendData2);
//send the json array to the correct update*.php file

$http ({
            method: 'POST',
            url: "./php/job-skills_updatejobSkills2.php",
            data: Object.toparams(sendData2),
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
    
    
    //third table
	 //copying rows of table3
    for (var j=0; j<$scope.asvabs.length; j++)
    {
    var sendData3=angular.copy($scope.asvabs[j]);


    JSON.stringify(sendData3);
//send the json array to the correct update*.php file

$http ({
            method: 'POST',
            url: "./php/job-skills_updatejobSkills3.php",
            data: Object.toparams(sendData3),
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
};

//request data for jsView.html when it is opened
var myRequest= {cadet: $scope.cadetID};

//request the daata
        $http ({
            method: 'POST',
            url: "./php/job-skills_retrieveJobSkillsA.php",
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
            }
            for(let i=0; i<$scope.tests.length; i++) {
                if ($scope.tests[i].EventDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                    $scope.tests[i].EventDate = convertToHtmlDate($scope.tests[i].EventDate);

                }
            }
            for(let i=0; i<$scope.asvabs.length; i++) {
                if ($scope.asvabs[i].ASVABDate !== "0000-00-00 00:00:00") {//IF DATE IS NOT NULL

                    $scope.asvabs[i].ASVABDate = convertToHtmlDate($scope.asvabs[i].ASVABDate);

                }
            }
            /*
        //put data into a scope to be accessed elsewhere
        $scope.tasks=result.data.taskTbl;
        $scope.tests=result.data.testTbl;
        $scope.asvabs=result.data.asvabTbl;
        //parsing the dates to format correctly
        for(var i=0; i<$scope.tasks.length; i++)
        {
            $scope.tasks[i].EventDate=$scope.tasks[i].EventDate.split(" ")[0];
        }
        for(var i=0; i<$scope.tests.length; i++)
        {
            $scope.tests[i].EventDate=$scope.tests[i].EventDate.split(" ")[0];
        }
        for(var i=0; i<$scope.asvabs.length; i++)
        {
            $scope.asvabs[i].ASVABDate=$scope.asvabs[i].ASVABDate.split(" ")[0];
        }
        */
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