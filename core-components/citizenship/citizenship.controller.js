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
    };

    $scope.cancelSection = function() {
        $scope.edit = false;
    };

    $scope.cancelUpdate = function() {
        $scope.edit = false;
        $scope.tasks = angular.copy($scope.tasksBeforeEdit);


    };

    var cadetGender = $scope.cadetGender;
    var cadet = {CadetID: $scope.cadetID};
    var cadetDOB = $scope.cadetDOB;
    //alert("Gender: "+ cadetGender);
    //alert("DOB: " + cadetDOB);
    //alert("The date of birth is: " + cadetDOB);
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
        $scope.show = true;
        //copy first row of table
        for (var j=0; j<$scope.tasks.length; j++)
        {
            var sendData=angular.copy($scope.tasks[j]);

            delete sendData.Task;
            delete sendData.TaskNumber;

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
                        alert("data updated")
                    //location.reload(true);
                },function(result){

                });
        }
        //second table
        for (var j=0; j<$scope.tests.length; j++)
        {
            var sendDataTwo=angular.copy($scope.tests[j]);

            delete sendDataTwo.TaskTestID;
            delete sendDataTwo.TaskTest;

            $http ({
                method: 'POST',
                url: "./php/citizenship_updateCitizenship.php",
                data: Object.toparams(sendDataTwo),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {
                    if(response.data)
                    //$scope.msg="data updated";
                    {
                        alert("data updated")
                    }
                    //location.reload(true);
                },function(result){

                });
        }
    };
//EDIT to get gender from database

    /*
        var myOtherRequest = {cadetGender: '361'}
        $http ({
            method: 'POST',
            url:"./php/citizenship_retrieveGender.php",
            data: Object.toparams(myRequest),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(result)
            {
                $scope.gender=result.data.peopleTbl;
                for(var i=0; i<$scope.tasks.length; i++)
                {
                    $scope.cadetGender[i].Ineligible=$scope.cadetGender[i].Ineligible.split(" ")[0];
                }
            },function(error){
                alert(error);
            });
    */
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
            for(var i=0; i<$scope.tasks.length; i++)
            {
                $scope.tasks[i].EventDate=$scope.tasks[i].EventDate.split(" ")[0];
            }
            for(var i=0; i<$scope.tests.length; i++)
            {
                $scope.tests[i].EventDate=$scope.tests[i].EventDate.split(" ")[0];
            }
        },function(error){
            alert(error);
        });


});
