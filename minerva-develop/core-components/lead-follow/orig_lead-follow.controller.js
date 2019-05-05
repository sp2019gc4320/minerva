/*
File: lead-follow.controller.js
 Use: lead-follow.view.html
 */


angular.module('core-components.lead-follow').controller('leadFollowController', function($scope, $http, $window) {


    //pre-loaded cadetID
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));

    alert("Test Citizenship with Cadet 361 - Jennifer Avila to see sample dates");

   // $scope.cadetID = "361"; //with data
   // alert("setting cadetID  for testing: " +$scope.cadetID);
    
    //updates tblcadetClassEvents(task table)
    $scope.update = function() 
    {
        //loops for # rows in table
        for (var j=0; j<$scope.tasks.length; j++)
        {
            //copy current row
            var sendData=angular.copy($scope.tasks[j]);
            
            //delete not needed info
            delete sendData.Task;
            delete sendData.TaskNumber;

            //alert(JSON.stringify(sendData));

            //update using updateLeadFollow.php
            $http ({
                method: 'POST',
                url: "./php/lead-follow_updateLeadFollow.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {
                   alert("updated: [lead-follow_updateLeadFollow.php" + JSON.stringify(response));
                },function(result){
                    alert("Failed");
            });
        }
        alert("task updated");
    };
    
    //update duty entries
    $scope.updateDuty = function() 
    {
        //loops for # rows in table
        for (var j=0; j<$scope.duties.length; j++)
        {
            //copy current row
            var sendData=angular.copy($scope.duties[j]);

            //alert(JSON.stringify(sendData));

            //update using updateDuty.php
            $http ({
                method: 'POST',
                url: "./php/lead-follow_updateDuty.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {
                    alert("updated: [lead-follow_updateDuty.php" + JSON.stringify(response));
                        //alert("data updated");
                },function(result){
                    alert("Failed");
            });
        }
        alert("duty updated");
    };
    
    //update inspection entries
    $scope.updateInspect = function() 
    {
        //loops for # rows in table
        for (var j=0; j<$scope.inspections.length; j++)
        {
            //copy current row
            var sendData=angular.copy($scope.inspections[j]);

            //alert(JSON.stringify(sendData));

            //update using updateDuty.php
            $http ({
                method: 'POST',
                url: "./php/lead-follow_updateInspection.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {
                    alert("updated: [lead-follow_updateInspection.php" + JSON.stringify(response));
                },function(result){
                    alert("Failed");
            });
        }
        alert("inspection updated");
    };
    
    //update position entries
    $scope.updatePos = function() 
    {
        //loops for # rows in table
        for (var j=0; j<$scope.pos.length; j++)
        {
            //copy current row
            var sendData=angular.copy($scope.pos[j]);

            //alert(JSON.stringify(sendData));

            //update using updateDuty.php
            $http ({
                method: 'POST',
                url: "./php/lead-follow_updatePosition.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {
                    alert("updated: [lead-follow_updatePosition.php" + JSON.stringify(response));
                },function(result){
                    alert("Failed");
            });
        }
        alert("position updated");
    };
    
    //update rank entries
    $scope.updateRank = function() 
    {
        //loops for # rows in table
        for (var j=0; j<$scope.rank.length; j++)
        {
            //copy current row
            var sendData=angular.copy($scope.rank[j]);

            //alert(JSON.stringify(sendData));

            //update using updateRank.php
            $http ({
                method: 'POST',
                url: "./php/lead-follow_updateRank.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {
                    alert("updated: [lead-follow_updateRank.php" + JSON.stringify(response));
                },function(result){
                    alert("Failed");
            });
        }
        alert("rank updated");
    };

    //create Duty entry
    $scope.createDuty = function() 
    {
        var sendData=angular.copy($scope.duty);
        
        //pull ClassDetailID from tasks
        sendData.fkClassDetailID = $scope.tasks[0].ClassDetailID;
        //pull JobPosition from dropdown
        sendData.JobPosition=$scope.duty.JobPosition.DutyPosition;

        //alert(JSON.stringify(sendData));

        //create data entry using createDuty.php
        $http ({
            method: 'POST',
            url: "./php/lead-follow_createDuty.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(response)
            {
                if(response.data)
                    //give new entry unique id
                    sendData.DutyPositionID=response.data.id;
                    //display new entry
                    $scope.duties.push(sendData);
                    //alert("data updated");

                alert("updated: [lead-follow_createDuty.php" + JSON.stringify(response));
            },function(result){
                    alert("Failed");
        });
    };
    
    //create inspection entry
    $scope.CreateInspect = function() 
    {
        var sendData=angular.copy($scope.inspect);
        
        //pull ClassDetailID from tasks
        sendData.fkClassDetailID = $scope.tasks[0].ClassDetailID;
        //pull InspectionType from dropdown
        sendData.JBInspectionType=$scope.inspect.JBInspectionType.InspectionType;

        //alert(JSON.stringify(sendData));

        //create inspection entry using createInspections.php
        $http ({
            method: 'POST',
            url: "./php/lead-follow_createInspections.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(response)
            {
                if(response.data)
                    //create unique id for new entry
                    sendData.JBInspectionID=response.data.id;
                    //display new entry
                    $scope.inspections.push(sendData);
                    //alert("data updated")
                alert("updated: [lead-follow_createInspections.php" + JSON.stringify(response));
            },function(result){
                alert("Failed");
        });
    };
    
    //create position entry
    $scope.CreatePos = function() 
    {
        var sendData=angular.copy($scope.posit);
        
        //pull ClassDetailID from tasks
        sendData.fkClassDetailID = $scope.tasks[0].ClassDetailID;
        //pull JBPosition from dropdown
        sendData.JBPosition=$scope.posit.JBPosition.JBPosition;

        //alert(JSON.stringify(sendData));

        //create position entry with createPosition.php
        $http ({
            method: 'POST',
            url: "./php/lead-follow_createPosition.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(response)
            {
                if(response.data)
                    //create unique id for new entry
                    sendData.PositionID=response.data.id;
                    //display new entry
                    $scope.pos.push(sendData);
                    //alert("data updated")
                alert("updated: [lead-follow_createPositions.php" + JSON.stringify(response));
            },function(result){
                alert("Failed");
        });
    };
    
    //create rank entry
    $scope.CreateRank = function() 
    {
        var sendData=angular.copy($scope.rEvent);
        sendData.fkClassDetailID = $scope.tasks[0].ClassDetailID;
        sendData.JBRank=$scope.rEvent.JBRank.RankObtained;
    
        //alert(JSON.stringify(sendData));

        $http ({
            method: 'POST',
            url: "./php/lead-follow_createRanks.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(response)
            {
                if(response.data)
                    sendData.JBRankID=response.data.id;
                    $scope.rank.push(sendData);
                    //alert("data updated")
                alert("updated: [lead-follow_createRanks.php" + JSON.stringify(response));
            },function(result){
                alert("Failed");
        });
    };

    //example cadetID
    //var myRequest= {cadet: '361'};
    
    var myRequest= {cadet: $scope.cadetID};

    //autoretrieve and display all tables
    $http ({
        method: 'POST',
        url: "./php/lead-follow_retrieveLeadFollow.php",
        data: Object.toparams(myRequest),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(
        function(result)
        {
            alert("updated: [lead-follow_retrieveLeadFollow.php" + JSON.stringify(result));
            //split result into variables
            $scope.tasks=result.data.taskTbl;
            $scope.duties=result.data.dutiesTbl;
            $scope.inspections=result.data.inspectionsTbl;
            $scope.pos=result.data.positionTbl;
            $scope.rank=result.data.rankTbl;
            
            //format all dates
            for(var i=0; i<$scope.tasks.length; i++){
                $scope.tasks[i].EventDate=$scope.tasks[i].EventDate.split(" ")[0];
            }
            for(var j=0; j<$scope.duties.length; j++){
                $scope.duties[j].DutyStartDate=$scope.duties[j].DutyStartDate.split(" ")[0];
                $scope.duties[j].DutyEndDate=$scope.duties[j].DutyEndDate.split(" ")[0];
            }
            for(var k=0; k<$scope.inspections.length; k++){
                $scope.inspections[k].InspectionDate=$scope.inspections[k].InspectionDate.split(" ")[0];
            }
            for(var l=0; l<$scope.pos.length; l++){
                $scope.pos[l].PosStartDate=$scope.pos[l].PosStartDate.split(" ")[0];
                $scope.pos[l].PosEndDate=$scope.pos[l].PosEndDate.split(" ")[0];
            }
            for(var m=0; m<$scope.rank.length; m++){
                $scope.rank[m].RankObtainedDate=$scope.rank[m].RankObtainedDate.split(" ")[0];
            }
            
            //create DutyPosition dropdown
            $http.get("./php/lead-follow_getDutyLookup.php").then(function (response)
            {
                $scope.DutyPositionOptions = response.data.data;
    
                var i=0;
                var max = $scope.DutyPositionOptions.length;
                while (i < max)
                {
                    $scope.DutyPositionOptions[i].id= i;
                    i++;
                }
            })
            
            //create InspectionType dropdown
            $http.get("./php/lead-follow_getInspectionLookup.php").then(function (response)
            {
                $scope.InspectionTypeOptions = response.data.data;
    
                var i=0;
                var max = $scope.InspectionTypeOptions.length;
                while (i < max)
                {
                    $scope.InspectionTypeOptions[i].id= i;
                    i++;
                }
            })
            
            //create JBPosition dropdown
            $http.get("./php/lead-follow_getPositionLookup.php").then(function (response)
            {
                $scope.JBPositionOptions = response.data.data;
    
                var i=0;
                var max = $scope.JBPositionOptions.length;
                while (i < max)
                {
                    $scope.JBPositionOptions[i].id= i;
                    i++;
                }
            })
            
            //create RankObtained dropdown
            $http.get("./php/lead-follow_getRankLookup.php").then(function (response)
            {
                $scope.RankOptions = response.data.data;
    
                var i=0;
                var max = $scope.RankOptions.length;
                while (i < max)
                {
                    $scope.RankOptions[i].id= i;
                    i++;
                }
            })
        },function(result){
            alert(result);
    });


    //refresh page to clear input text feilds
    $scope.cancelUpdate = function() {
        location.reload(true);
    };
    
    //saves selection from DutyPosition dropdown
    $scope.changeJobPosition = function (JobPosition) {
        if (JobPosition != null) {
            $scope.duty.JobPosition.value = JobPosition;
        }
    };
    
    //saves selection from InspectionType dropdown
    $scope.changeInspectionType = function (InspectionType) {
        if (InspectionType != null) {
            $scope.inspect.JBInspectionType.value = InspectionType;
        }
    };
    
    //saves selection from JBPosition dropdown
    $scope.changeJBPosition = function (JBPosition) {
        if (JBPosition != null) {
            $scope.posit.JBPosition.value = JBPosition;
        }
    };
    
    //saves selection from RankObtained dropdown
    $scope.changeRank = function (RankObtained) {
        if (RankObtained != null) {
            $scope.rEvent.JBRank.value = RankObtained;
        }
    };
    
});


    
    
    
    
     