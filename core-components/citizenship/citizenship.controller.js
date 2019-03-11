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

    $scope.formatDate = function(dateArray)
    {
        var month;
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
        var dateString=dateArray[3]+'-'+month+'-'+dateArray[2]+' 00:00:00';
        return dateString;
    }

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

            sendData.fkCadetID=angular.copy($scope.cadetID);

            if((sendData.EventDate === "0000-00-00" || null == sendData.EventDate || sendData.EventDate === $scope.tasksBeforeEdit[j].EventDate))
            {
                sendData.EventDate= angular.copy($scope.tasksBeforeEdit[j].EventDate);
                //alert(sendData.EventDate+" Did not change");// Great for DateTime Debugging
            }
            else
            {
                var DateArray = sendData.EventDate.toString().split(" ");
                var DateString = $scope.formatDate(DateArray);

                //alert(sendData.EventDate+" became "+DateString); // Great for DateTime Debugging
                sendData.EventDate = DateString;

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

             sendDataTwo.TaskTestID;
            delete sendDataTwo.TaskTest;
            sendDataTwo.fkCadetID=angular.copy($scope.cadetID);
            alert(sendDataTwo.fkCadetID);


            if((sendDataTwo.EventDate === "0000-00-00" || null == sendDataTwo.EventDate || sendDataTwo.EventDate === $scope.testsBeforeEdit[j].EventDate))
            {
                sendDataTwo.EventDate= angular.copy($scope.testsBeforeEdit[j].EventDate);
                //alert(sendDataTwo.EventDate+" Did not change");// Great for DateTime Debugging
            }
            else
            {
                var DateArrayTwo = sendDataTwo.EventDate.toString().split(" ");
                var DateStringTwo = $scope.formatDate(DateArrayTwo);

                alert(sendDataTwo.EventDate+" became "+DateStringTwo); // Great for DateTime Debugging
                sendDataTwo.EventDate = DateStringTwo;

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
                       alert(response.data); // for debug
                    }
                    //location.reload(true);
                },function(result){

                });
        }
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


            for(var i=0; i<$scope.tasks.length; i++)
            {
                $scope.tasks[i].EventDate=$scope.tasks[i].EventDate.split(" ")[0];
            }
            for(var i=0; i<$scope.tests.length; i++)
            {
                alert($scope.tests[i].EventDate.split(" ")[0]);
                $scope.tests[i].EventDate=$scope.tests[i].EventDate.split(" ")[0];
            }
        },function(error){
            alert(error);
        });


});
