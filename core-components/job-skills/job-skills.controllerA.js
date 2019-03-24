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

    alert("Test  with Cadet 7 - William Bowles to see sample data");
    //$scope.cadetID = "7"; //with data
    //alert("setting cadetID  for testing: " +$scope.cadetID);



//create new record for asvab
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
                $scope.asvabs[i].ASVABDate=$scope.asvabs[i].ASVABDate.split(" ")[0];
            }
        },function(result){
            alert(result);
        });


      $scope.cancelUpdate = function() {
        location.reload(true);
      };
});