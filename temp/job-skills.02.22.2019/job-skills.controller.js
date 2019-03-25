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


//The following 2 variables contain the same data but are used interchangably throughout the document
//TODO - Find out what the difference between the two are if any/ consolidate the two variables
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"))
    $scope.fkClassDetailID = JSON.parse($window.localStorage.getItem("CadetID"))
//this is for the input field for a new entry
//new asvab = nasvab
    $scope.nasvab = {
        ASVABDate: '0000-00-00', //Date String
        ASVABTechScore: 0,      //Technical Score int
        AFQTScore: 0,           //AFQT score int
        ASVABTestNotes: '',     //notes
        fkClassDetailID: 0      //Foriegn Key
    }

    $scope.isUpdatingTasks = false;
    alert("Test  with Cadet 7 - William Bowles to see sample data");


//create new record for asvab
$scope.createASVAB = function() 
    {
        var sendData;// SQL results to be sent
        var date = $scope.nasvab.ASVABDate;
        //the following is modified from health controller.js
        if(date!==null) {//IF A DATE IS ENTERED 
                    date += "";//make the whole thing a string

                    var dateArray = date.split(" ");//split by space to get rid of time
                    var month;                      // integer to hold month value
                    if (dateArray[1] === 'Jan')
                        month = "01";
                    else if (dateArray[1] === 'Feb')
                        month = "02";
                    else if (dateArray[1] === 'Mar')
                        month = "03";
                    else if (dateArray[1] === 'Apr')
                        month = "04";
                    else if (dateArray[1] === 'May')
                        month = "05";
                    else if (dateArray[1] === 'Jun')
                        month = "06";
                    else if (dateArray[1] === 'Jul')
                        month = "07";
                    else if (dateArray[1] === 'Aug')
                        month = "08";
                    else if (dateArray[1] === 'Sep')
                        month = "09";
                    else if (dateArray[1] === 'Oct')
                        month = "10";
                    else if (dateArray[1] === 'Nov')
                        month = "11";
                    else if (dateArray[1] === 'Dec')
                        month = "12";

                    var dateString = dateArray[3] + '-' + month + '-' + dateArray[2];//will be used as Date Value 
        alert(dateString);
        sendData=angular.copy($scope.nasvab);
        sendData.ASVABDate = dateString;

        }
        else{
            sendData=angular.copy($scope.nasvab);
        sendData.ASVABDate = getCurrentDate(); //If input is empty will fetch today's date
        }

        sendData.fkClassDetailID = $scope.cadetID; // foreign key to cadet ID

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
                    $scope.asvabs.push(sendData); // sends data to createASVAB.php's sql
                    alert("data added");
            },function(result){


        });
    };


        //Presumably these change the edit view in job-skills.view.html
        $scope.startEdits = function() {
            $scope.isUpdatingTasks = true;
            $scope.tasksBeforeEdit = angular.copy($scope.tasks);
            $scope.testsBeforeEdit = angular.copy($scope.tests);
        };

        $scope.saveEdits = function() {
            $scope.update();
            $scope.isUpdatingTasks = false;
        };

        $scope.cancelEdits = function() {
            $scope.isUpdatingTasks = false;
            $scope.tasks = $scope.tasksBeforeEdit;
            $scope.tests = $scope.testsBeforeEdit;
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
                sendData.EventDate= JSON.stringify(sendData.EventDate);
                sendData.EventDate=sendData.EventDate.split("T")[0]; //splits date another way
                sendData.EventDate=sendData.EventDate.split("\"")[1];
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
                // Remove extra bits to send back to database in correct format.
                sendData2.EventDate= JSON.stringify(sendData2.EventDate);
                sendData2.EventDate=sendData2.EventDate.split("T")[0];
                sendData2.EventDate=sendData2.EventDate.split("\"")[1];
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

                sendData3.ASVABDate= JSON.stringify(sendData3.ASVABDate);
                sendData3.ASVABDate=sendData3.ASVABDate.split("T")[0];
                sendData3.ASVABDate=sendData3.ASVABDate.split("\"")[1];
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
            url: "./php/job-skills_retrieveJobSkills.php",
            data: Object.toparams(myRequest),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(result)
            {

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
                    $scope.asvabs[i].ASVABDate=$scope.asvabs[i].ASVABDate.slice(0,10);
                }
            },function(result){
                alert(result);
            });

        $scope.cancelUpdate = function() {
            location.reload(true);
        };


        /** used to get the date for new asvab results when no date is entered

        
         */
         var getCurrentDate=function () {
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth() + 1; //January is 0!
         var yyyy = today.getFullYear();

         if (dd < 10) {
             dd = '0' + dd;
         }

         if (mm < 10) {
             mm = '0' + mm;
         }

         today = yyyy + '-' + mm + '-' + dd;
         return today;
     }

    });