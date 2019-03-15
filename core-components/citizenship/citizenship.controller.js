/*
File: citizenship.controller.js
 Use: citizenship.view.html
 */

angular.module('core-components.citizenship').controller('citizenshipController', function($scope, $http, $window,) {


    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    $scope.cadetGender = $window.localStorage.getItem("CadetGender");
    $scope.cadetDOB = $window.localStorage.getItem("CadetDOB");

    

    alert("Test Citizenship with Cadet 361 - Jennifer Avila to see sample dates");
    $scope.edit = false;

    $scope.editSection = function() {
        $scope.edit = true;
        $scope.tasksBeforeEdit = angular.copy($scope.tasks);
        $scope.testsBeforeEdit = angular.copy($scope.tests);
    };

    $scope.cancelUpdate = function() {
        $scope.edit = false;
        $scope.tasks = angular.copy($scope.tasksBeforeEdit);
        $scope.tests = angular.copy($scope.testsBeforeEdit);
    


    };


    var cadetGender = $scope.cadetGender;
    var cadet = {CadetID: $scope.cadetID};
    var cadetDOB = $scope.cadetDOB;

    function calculateAge(cadetDOB)
    {
        var age = 0;
        if (cadetDOB != null && cadetDOB != '') {
            var dob = cadetDOB;
            var year = Number(dob.substr(0, 4));
            var month = Number(dob.substr(4, 2)) - 1;
            var day = Number(dob.substr(6, 2));
            var today = new Date();
            age = today.getFullYear() - year;
            if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
                age--;
            }
        }
        return age;
    }
    $scope.draftAndVoteStyle = function draftAndVoteStyle(cadetGender, taskNum, cadetDOB) {
        if (taskNum == 2) {
            if (cadetGender == 'F')
                return "alert-success";
            else if (cadetGender == 'M')
            {
                var maleAge = calculateAge(cadetDOB);
                //alert("Age: " + maleAge);
                if(maleAge == 0)
                    return "alert-warning";
                else if (maleAge < 18)
                    return "alert-success";
                else
                    return "alert-danger";
            }
        }
        else if (taskNum == 3){
            var age = calculateAge(cadetDOB);
            //alert("Age: "+ age);
            if(age == 0)
                return "alert-warning";
            else if(age >= 18)
                return "alert-danger";
            else
                return "alert-success";
        }
    };

    $scope.update = function()
    {
        //$scope.show = true;
        $scope.edit = !$scope.edit;
        //copy first row of table
        for (var j=0; j<$scope.tasks.length; j++)
        {
            var sendData=angular.copy($scope.tasks[j]);

            delete sendData.Task;
            delete sendData.TaskNumber;

            sendData.fkCadetID=angular.copy($scope.cadetID);

            if((sendData.EventDate === "0000-00-00" || null == sendData.EventDate || sendData.EventDate === $scope.tasksBeforeEdit[j].EventDate))
            {
                sendData.EventDate= angular.copy($scope.tasksBeforeEdit[j].EventDate);
                //alert(sendData.EventDate+" Did not change");// Great for DateTime Debugging
            }
            else
            {
                sendData.EventDate = convertToSqlDate(sendData.EventDate);

            }




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
                        alert("data updated");
                    //location.reload(true);
                },function(result){

                });
        }
        //second table
        for (var j=0; j<$scope.tests.length; j++)
        {
            var sendDataTwo=angular.copy($scope.tests[j]);

            delete sendDataTwo.TaskTest;
            sendDataTwo.fkCadetID=angular.copy($scope.cadetID);


            if((sendDataTwo.EventDate === "0000-00-00" || null == sendDataTwo.EventDate || sendDataTwo.EventDate === $scope.testsBeforeEdit[j].EventDate))
            {
                sendDataTwo.EventDate= angular.copy($scope.testsBeforeEdit[j].EventDate);
                //alert(sendDataTwo.EventDate+" Did not change");// Great for DateTime Debugging
            }
            else
            {
                sendDataTwo.EventDate = convertToSqlDate(sendDataTwo.EventDate);

            }

            $http ({
                method: 'POST',
                url: "./php/citizenship_updateCitizenship_2.php",
                data: Object.toparams(sendDataTwo),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {
                    if(response.data)
                    {
                       alert(response.data);
                    }

                   // location.reload(true);
                },function(result){

                });
        }

        alert("Update Complete");
    };


    // Block Commented code Deleted
    // TODO - Ask about what geting the cated gender was supposed to be used for since it was commented out

    var myRequest= {cadet: $scope.cadetID};

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

            //CAUTION - this block is HARDCODED specifically because task 5 is exclusively determined by comparing the elements
            //          from $scope.tests and has 2 separate entries in taskTbl. If other $scope.tasks are later determined by
            //          other factors and produce multiple entries, you will have to alter this code.

            if($scope.tasks[4].TaskNumber === $scope.tasks[5].TaskNumber ) // checks if task 5 has 2 entries in taskTbl
            {
                var retEventDate;
                if($scope.tasks[4].EventDate > $scope.tasks[5].EventDate)
                {
                    retEventDate = angular.copy($scope.tasks[4].EventDate);
                }
                else
                {
                    retEventDate = angular.copy($scope.tasks[5].EventDate);
                }

                $scope.tasks[4].EventDate = angular.copy(retEventDate); // chooses most recent date of the two tests

                if($scope.tasks[4].DidPass == 1 && $scope.tasks[5].DidPass==1) // sets the value to 1 if both tests have been passed
                {
                    $scope.tasks[4].DidPass=1;
                }
                else
                {
                    $scope.tasks[4].DidPass=0;
                }

                $scope.tasks[4].EventNote = $scope.tasks[4].EventNote + " " + $scope.tasks[5].EventNote; // combines both tests' notes
                $scope.tasks[5]=$scope.tasks[6];    // overwrites redundant extra 5th task
                $scope.tasks.pop(); // removes last element from task array, since it is now unnecessary
                }


            for(var i=0; i<$scope.tasks.length; i++)
            {
                $scope.tasks[i].EventDate= convertToHtmlDate($scope.tasks[i].EventDate);
            }
            for(var i=0; i<$scope.tests.length; i++)
            {
                $scope.tests[i].EventDate= convertToHtmlDate($scope.tests[i].EventDate);
            }
        },function(error){
            alert(error);
        });


});
