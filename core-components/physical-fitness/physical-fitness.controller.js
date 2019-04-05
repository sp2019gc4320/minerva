// physical-fitness.controller.js
// 
// 


angular.module('core-components.physical-fitness').controller('physicalFitnessController', function($scope, $http, $window) {

    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    alert("Test Citizenship with Cadet 361 - Jennifer Avila to see sample dates");

    $scope.tasks=[];
    $scope.tests=[];
    $scope.showTest = false;
    $scope.flags=[0,0,0];


    $scope.showTable = function(index)
    {
        return $scope.flags[index] == '1';
    }


  //  minDate();

   $scope.showTest = function(index)
    {
        if($scope.flags[index] == 0)
        {
          $scope.flags[index] = 1;
        }
        else
        {
            $scope.flags[index] = 0;
        }
    };


    $scope.getIndex = function()
    {

    }



 /*   $scope.backup_tasks = [];
    $scope.backup_tests = [];

    $scope.editTasks = true;
    $scope.editTests=true;

    //document.getElementById("taskSaveCancelButtons").style.display ="none";
    //document.getElementById("testSaveCancelButtons").style.display ="none";

    $scope.editSection = function(section){
        if(section == "tasks")
        {
            $scope.editTasks = false;
            $scope.backup_tasks = angular.copy($scope.tasks);


            document.getElementById("editButtonTasks").style.display = "none";
            var element1 = document.getElementById("taskSaveCancelButtons");

            if(element1.style.display == 'none')
            {
                element1.style.display = 'block';
            }

        }

        else if(section == "tests")
        {
            $scope.editTests = false;
            $scope.backup_tests = angular.copy($scope.tests);

            document.getElementById("editButtonTests").style.display = "none";
            var element1 = document.getElementById("testSaveCancelButtons");

            if(element1.style.display == 'none')
            {
                element1.style.display = 'block';
            }

        }

    };

    $scope.saveSection = function(section){
        if(section == "tasks")
        {
            $scope.editTasks = true;


            document.getElementById("editButtonTasks").style.display = "block";
            var element1 = document.getElementById("taskSaveCancelButtons");
            if (element1.style.display == 'block')
            {
                element1.style.display = 'none';
            }


            for (var j=0; j<$scope.tasks.length; j++)
            {

                var sendData=angular.copy($scope.tasks[j]);
                sendData.EventDate+="";


                var tasksDateArray=sendData.EventDate.split(" ");
                sendData.EventDate=dateFormat(tasksDateArray);


                delete sendData.Task;
                delete sendData.TaskNumber;


                $http ({
                    method: 'POST',
                    url: "./php/updatePhysFit.php",
                    data: Object.toparams(sendData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function(response)
                    {
                        if(response.data)
                        {

                        }
                        alert("updated: [updatePhysFit.php" + JSON.stringify(response));
                    },function(result){
                        alert("Failed");
                    });
            }
            alert("task updated");
        }

        else if(section=="tests")
        {


            $scope.editTests = true;

            document.getElementById("editButtonTests").style.display = "block";
            var element1 = document.getElementById("testSaveCancelButtons");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }


            for (var j=0; j<$scope.tests.length; j++)
            {

                var sendData=angular.copy($scope.tests[j]);
                sendData.EventDate+="";


                var testsDateArray=sendData.EventDate.split(" ");
                sendData.EventDate=dateFormat(testsDateArray);

                delete sendData.TaskNumber;
                delete sendData.TaskTest;


                $http ({
                    method: 'POST',
                    url: "./php/updatePhysFit.php",
                    data: Object.toparams(sendData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function(response)
                    {
                        if(response.data)
                        {

                        }
                        alert("updated: [updatePhysFit.php" + JSON.stringify(response));
                    },function(result){
                        alert("Failed");
                    });
            }
            alert("test updated");

        }
    };
*/
    var myRequest= {cadet: $scope.cadetID};


    $http ({
        method: 'POST',
        url: "./php/physical-fitness_retrievePhysFit2.php",
        data: Object.toparams(myRequest),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(
        function(result)
        {
            alert("updated: [physical-fitness_retrievePhysFit2.php" + JSON.stringify(result));

            //split result into variables
            $scope.tasks=result.data.taskTbl;
            $scope.tests=result.data.data;



            for(var i=0; i<$scope.tasks.length; i++)
            {
                $scope.tasks[i].date=convertToHtmlDate($scope.tasks[i].date);
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
            if (fieldName.includes("Date")) {
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
            if (fieldName.includes("Date")) {
                if (myObject[fieldName] !== null) {//IF DATE IS NOT NULL
                    myObject[fieldName] = convertToSqlDate(myObject[fieldName]);
                }
                else {
                    myObject[fieldName] = "";
                }
            }
        }
    };

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
