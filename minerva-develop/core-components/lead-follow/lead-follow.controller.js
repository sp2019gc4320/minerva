/*
File: lead-follow.controller.js
 Use: lead-follow.view.html
 */


angular.module('core-components.lead-follow').controller('leadFollowController', function($scope, $http, $window) {

    //pre-loaded cadetID
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    alert("Test Citizenship with Cadet 361 - Jennifer Avila to see sample dates");

    //disallow picking dates before today
    minDate();

    //array to hold backups of duties, inspections, positions, ranks, tasks
    $scope.backup_tasks = [];
    $scope.backup_duties = [];
    $scope.backup_inspections = [];
    $scope.backup_positions = [];
    $scope.backup_ranks = [];

    //automatically disable being able to edit each section (so set to true)
    $scope.editTasks = true;
    $scope.editDuty=true;
    $scope.editInspect=true;
    $scope.editPosit=true;
    $scope.editRank=true;

    //automatically enable the edit buttons
    $scope.editBtnDuty = true;
    $scope.editBtnInspect = true;
    $scope.editBtnPosit = true;
    $scope.editBtnRank = true;

    //automatically enable the add buttons
    $scope.addBtnDuty = true;
    $scope.addBtnInspect = true;
    $scope.addBtnPosit = true;
    $scope.addBtnRank = true;

    //automatically disable being able to add duty
    $scope.addDuty=true;
    $scope.addInspect=true;
    $scope.addPosit=true;
    $scope.addRank=true;



    $scope.addElement = function (section){
        if(section=="duties"){
            $scope.editDuty = true;
            $scope.editBtnDuty = false;
            $scope.addDuty = false;
            $scope.addBtnDuty = false;

        }
        else if(section=="inspections"){
            $scope.editInspect = true;
            $scope.editBtnInspect = false;
            $scope.addInspect = false;
            $scope.addBtnInspect = false;

        }
        else if(section=="positions"){
            $scope.addPosit = false;
            $scope.editPosit = true;
            $scope.editBtnPosit = false;
            $scope.addBtnPosit = false;

        }
        else if(section=="ranks"){
            $scope.addRank = false;
            $scope.editRank=true;
            $scope.editBtnRank = false;
            $scope.addBtnRank = false;

        }
    };

    $scope.cancelAddElement = function (section){
        if(section=="duties"){
            $scope.editDuty = true;
            $scope.editBtnDuty = true;
            $scope.addDuty = true;
            $scope.addBtnDuty = true;

        }
        else if(section=="inspections"){
            $scope.editInspect = true;
            $scope.editBtnInspect = true;
            $scope.addInspect = true;
            $scope.addBtnInspect = true;

        }
        else if(section=="positions"){
            $scope.addPosit = true;
            $scope.editPosit = true;
            $scope.editBtnPosit = true;
            $scope.addBtnPosit = true;

        }
        else if(section=="ranks"){
            $scope.addRank = true;
            $scope.editRank = true;
            $scope.editBtnRank = true;
            $scope.addBtnRank = true;

        }
    }


    /*
    makes the section editable, displays the save/cancel buttons
    TODO: add other sections (inspections, tasks, ranks, positions)
     */
    $scope.editSection = function (section) {
        if(section == "duties") {
            $scope.editDuty = false;
            $scope.editBtnDuty = false;
            $scope.addDuty = true;
            $scope.addBtnDuty = false;

            $scope.backup_duties = angular.copy($scope.duties);                        //added 2/26 - save backup before updates made

        }
        else if(section=="tasks"){
            $scope.editTasks = false;
            $scope.backup_tasks = angular.copy($scope.tasks);


        }
        else if(section=="inspections"){
            $scope.editInspect = false;
            $scope.editBtnInspect = false;
            $scope.addInspect = true;
            $scope.addBtnInspect = false;

            $scope.backup_inspections = angular.copy($scope.inspections);

        }
        else if(section=="positions"){
            $scope.editPosit = false;
            $scope.editBtnPosit = false;
            $scope.addPosit = true;
            $scope.addBtnPosit = false;

            $scope.backup_positions = angular.copy($scope.pos);

        }
        else if(section=="ranks"){
            $scope.editRank = false;
            $scope.editBtnRank = false;
            $scope.addRank = true;
            $scope.addBtnRank = false;

            $scope.backup_ranks = angular.copy($scope.rank);


        }

    };

    /*
        method name: saveSection
        @param: section

        purpose: saves and updates the changes to each section. sends the changes to the php file/DB.
                    a separate method saves the changes when new items are CREATED. this method focuses
                    on when an item is UPDATED or DELETED.

         TODO: get rid of update functions of all other sections & add them into this function!
     */
    $scope.saveSection = function(section)
    {
        //maybe put these outside of the method?
      var update = {};
      var updates = [];

      if(section=="duties")
      {
          //make uneditable
          $scope.editDuty = true;
          $scope.editBtnDuty = true;
          $scope.addDuty = true;
          $scope.addBtnDuty = true;


          //find updated duties
          for(let i=0; i< $scope.duties.length; i++) {
              update = angular.copy($scope.duties[i]);              //getting a duty to update all of the changes
              //let id = $scope.duties[i].DutyPositionID;
              update.op = "UPDATE";                                 //sets the var 'op' in php file to UPDATE so db is updated
              updates.push(update);                                 //how to connect updates to php file??? looks at updateMentorCtrl.js
          }
          //Find deleted duties
          for (let i =0; i< $scope.backup_duties.length; i++) {
              let id = $scope.backup_duties[i].DutyPositionID;

              let found = false;
              for(let j =0; j< $scope.duties.length; j++) {
                  if (id == $scope.duties[j].DutyPositionID)
                      found = true;
              }
              if (!found){
                  update = angular.copy($scope.backup_duties[i]);
                  update.op = "DELETE";                             //sets the var 'op' in php file to DELETE so duty is deleted
                  updates.push(update);
              }
          }

          //send updates/deletions to php file:
          for (var j=0; j<updates.length; j++)
          {
              //copy current row
              var sendData=angular.copy(updates[j]);            //instead of duties[j]?

              sendData.DutyStartDate+="";
              //Andrew Changes 2/21/19
                var dutyStartArray=sendData.DutyStartDate.split(" ");//split by space to get rid of time
                sendData.DutyStartDate=dateFormat(dutyStartArray);

                sendData.DutyEndDate+="";
                var dutyEndArray=sendData.DutyEndDate.split(" ");//split by space to get rid of time
                sendData.DutyEndDate=dateFormat(dutyEndArray);

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
                  },function(result){
                      alert("Failed");
                  });
          }
          alert("duty updated");

      }
      else if(section=="tasks"){

          //make uneditable
          $scope.editTasks = true;

          //loops for # rows in table
          for (var j=0; j<$scope.tasks.length; j++)
          {
              //copy current row
              var sendData=angular.copy($scope.tasks[j]);
              sendData.EventDate+="";//make the whole thing a string

              //Andrew dateArray added here
                var tasksDateArray=sendData.EventDate.split(" ");//split by space to get rid of time
                sendData.EventDate=dateFormat(tasksDateArray);
              //delete not needed info
              delete sendData.Task;
              delete sendData.TaskNumber;

              //update using updateLeadFollow.php
              $http ({
                  method: 'POST',
                  url: "./php/lead-follow_updateLeadFollow.php",
                  data: Object.toparams(sendData),
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
              }).then(
                  function(response)
                  {
                      if(response.data)
                      {

                      }
                      alert("updated: [lead-follow_updateLeadFollow.php" + JSON.stringify(response));
                  },function(result){
                      alert("Failed");
                  });
          }
          alert("task updated");
      }
        else if(section=="inspections")
        {
            //make uneditable
            $scope.editInspect = true;
            $scope.editBtnInspect = true;
            $scope.addInspect = true;
            $scope.addBtnInspect = true;


            //find updated inspections
            for(let i=0; i< $scope.inspections.length; i++) {
                update = angular.copy($scope.inspections[i]);              //getting an inspection to update all of the changes
                //let id = $scope.inspections[i].JBInspectionID;
                update.op = "UPDATE";                                 //sets the var 'op' in php file to UPDATE so db is updated
                updates.push(update);                                 //how to connect updates to php file??? looks at updateMentorCtrl.js
            }
            //Find deleted inspections
            for (let i =0; i< $scope.backup_inspections.length; i++) {
                let id = $scope.backup_inspections[i].JBInspectionID;

                let found = false;
                for(let j =0; j< $scope.inspections.length; j++) {
                    if (id == $scope.inspections[j].JBInspectionID)
                        found = true;
                }
                if (!found){
                    update = angular.copy($scope.backup_inspections[i]);
                    update.op = "DELETE";                             //sets the var 'op' in php file to DELETE so inspection is deleted
                    updates.push(update);
                }
            }

            //send updates/deletions to php file:
            for (var j=0; j<updates.length; j++)
            {
                //copy current row
                var sendData=angular.copy(updates[j]);            //instead of duties[j]?
                sendData.InspectionDate+="";
                var inspecDateArray=sendData.InspectionDate.split(" ");//split by space to get rid of time
                sendData.InspectionDate=dateFormat(inspecDateArray);

                //update using updateInspection.php
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

        }
        else if(section=="positions"){

          //make uneditable
          $scope.editPosit = true;
          $scope.editBtnPosit = true;
          $scope.addPosit = true;
          $scope.addBtnPosit = true;



          //find updated positions
          for(let i=0; i< $scope.pos.length; i++) {
              update = angular.copy($scope.pos[i]);              //getting a duty to update all of the changes
              //let id = $scope.duties[i].DutyPositionID;
              update.op = "UPDATE";                                 //sets the var 'op' in php file to UPDATE so db is updated
              updates.push(update);                                 //how to connect updates to php file??? looks at updateMentorCtrl.js
          }
          //Find deleted positions
          for (let i =0; i< $scope.backup_positions.length; i++) {
              let id = $scope.backup_positions[i].PositionID;

              let found = false;
              for(let j =0; j< $scope.pos.length; j++) {
                  if (id == $scope.pos[j].PositionID)
                      found = true;
              }
              if (!found){
                  update = angular.copy($scope.backup_positions[i]);
                  update.op = "DELETE";                             //sets the var 'op' in php file to DELETE so duty is deleted
                  updates.push(update);
              }
          }

          //loops for # rows in table
          //TODO: date not getting sent to DB correctly!
          for (var j=0; j<updates.length; j++)
          {
              //copy current row
              var sendData=angular.copy(updates[j]);
              sendData.PosStartDate+="";
              //Andrew Changes 2/21/19
                var posStartArray=sendData.PosStartDate.split(" ");//split by space to get rid of time
                sendData.PosStartDate=dateFormat(posStartArray);

                sendData.PosEndDate+="";
                var posEndArray=sendData.PosEndDate.split(" ");//split by space to get rid of time
                sendData.PosEndDate=dateFormat(posEndArray);

              //update using updatePosition.php
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
      }
      else if(section=="ranks")
      {
          //make uneditable
          $scope.editRank = true;
          $scope.editBtnRank = true;
          $scope.addRank = true;
          $scope.addBtnRank = true;


          //find updated ranks
          for(let i=0; i< $scope.rank.length; i++) {
              update = angular.copy($scope.rank[i]);              //getting a rank to update all of the changes
              //let id = $scope.rank[i].JBRankID;
              update.op = "UPDATE";                                 //sets the var 'op' in php file to UPDATE so db is updated
              updates.push(update);                                 //how to connect updates to php file??? looks at updateMentorCtrl.js
          }
          //Find deleted ranks
          for (let i =0; i< $scope.backup_ranks.length; i++) {
              let id = $scope.backup_ranks[i].JBRankID;

              let found = false;
              for(let j =0; j< $scope.rank.length; j++) {
                  if (id == $scope.rank[j].JBRankID)
                      found = true;
              }
              if (!found){
                  update = angular.copy($scope.backup_ranks[i]);
                  update.op = "DELETE";                             //sets the var 'op' in php file to DELETE so rank is deleted
                  updates.push(update);
              }
          }

          //send updates/deletions to php file:
          for (var j=0; j<updates.length; j++)
          {
              //copy current row
              var sendData=angular.copy(updates[j]);
              sendData.RankObtainedDate+="";
                var rankDateArray=sendData.RankObtainedDate.split(" ");//split by space to get rid of time
                sendData.RankObtainedDate=dateFormat(rankDateArray);

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

      }
    };

    /*
        method name: CreateDuty
        @param: n/a

        purpose: creates a new duty. updates the php file/DB.

     */
    $scope.CreateDuty = function()
    {
        var sendData=angular.copy($scope.duty);
        $scope.editDuty = true;
        $scope.editBtnDuty = true;
        $scope.addDuty = true;
        $scope.addBtnDuty = true;


        //pull ClassDetailID from tasks
        sendData.fkClassDetailID = $scope.tasks[0].ClassDetailID;
        //pull JobPosition from dropdown
        sendData.JobPosition=$scope.duty.JobPosition.DutyPosition;

        var ogDateStart = sendData.DutyStartDate;
        var ogDateEnd = sendData.DutyEndDate;

        sendData.DutyStartDate+="";
        var dutyStartArray=sendData.DutyStartDate.split(" ");//split by space to get rid of time
        var newDateStart = new Date(ogDateStart);
        sendData.DutyStartDate=dateFormat(dutyStartArray);

        sendData.DutyEndDate+="";
        var dutyEndArray=sendData.DutyEndDate.split(" ");//split by space to get rid of time
        var newDateEnd = new Date(ogDateEnd);
        sendData.DutyEndDate=dateFormat(dutyEndArray);

        if(sendData.DutyDidFail!="1")
        {
            sendData.DutyDidFail="0";
        }
        alert(JSON.stringify(sendData));
        //create data entry using createDuty.php
        $http(
            {
            method: 'POST',
            url: "./php/lead-follow_createDuty.php",
            data: Object.toparams(sendData),     //try this
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
            }
         ).then(
            function(response)
            {
                if(response.data)
                //give new entry unique id
                    sendData.DutyPositionID=response.data.id;       //this is undefined!!!!! TODO: fix this!!!!!
                    sendData.DutyStartDate= newDateStart;
                    sendData.DutyEndDate= newDateEnd;

                    //display new entry
                    $scope.duties.push(sendData);       //adding new duty to the end of the duties array


                //added to clear the values from scope after they have been sent to DB & received
                $scope.duty.DutyPositionID = "";
                $scope.duty.DutyStartDate = "";
                $scope.duty.DutyDidFail = "0";
                $scope.duty.DutyEndDate = "";
                $scope.duty.DutyNote = "";
                $scope.duty.JobPosition = "";

            },function(result){
                    alert("Failed");
        });
    };
    
    //create inspection entry
    $scope.CreateInspect = function() 
    {
        var sendData=angular.copy($scope.inspect);

        $scope.editInspect = true;
        $scope.editBtnInspect = true;
        $scope.addInspect = true;
        $scope.addBtnInspect = true;

        //pull ClassDetailID from tasks
        sendData.fkClassDetailID = $scope.tasks[0].ClassDetailID;
        //pull InspectionType from dropdown
        sendData.JBInspectionType=$scope.inspect.JBInspectionType.InspectionType;


        //Date display changes
        sendData.InspectionDate+="";
        var ogDate = sendData.InspectionDate;
        var inspectDateArray=sendData.InspectionDate.split(" ");//split by space to get rid of time

        var newDate = new Date(ogDate);
        sendData.InspectionDate=dateFormat(inspectDateArray);

        alert(JSON.stringify(sendData));
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
                    sendData.InspectionDate= newDate;
                    $scope.inspections.push(sendData);
                    //$scope.backup_inspections = angular.copy($scope.inspections);                  //added 2/28 - save backup with new inspection


                //added to clear the values from scope after they have been sent to DB & received
                $scope.inspect.InspectionDate = "";
                $scope.inspect.JBInspectionType = "";
                $scope.inspect.DidPassInspection = "0";
                $scope.inspect.InspectionNote = "";
                $scope.inspect.InspMeritAdj = "";


                alert("updated: [lead-follow_createInspections.php" + JSON.stringify(response));
            },function(result){
                alert("Failed");
        });
    };
    
    //create position entry
    $scope.CreatePosit = function()
    {
        var sendData=angular.copy($scope.posit);
        $scope.editPosit = true;
        $scope.editBtnPosit = true;
        $scope.addPosit = true;
        $scope.addBtnPosit = true;

        //pull ClassDetailID from tasks
        sendData.fkClassDetailID = $scope.tasks[0].ClassDetailID;
        //pull JBPosition from dropdown
        sendData.JBPosition=$scope.posit.JBPosition.JBPosition;

        sendData.PosStartDate+="";
        var ogDateStart = sendData.PosStartDate;
        var posStartArray=sendData.PosStartDate.split(" ");//split by space to get rid of time
        var newDateStart = new Date(ogDateStart);
        sendData.PosStartDate=dateFormat(posStartArray);

        sendData.PosEndDate+="";
        var ogDateEnd = sendData.PosEndDate;
        var posEndArray=sendData.PosEndDate.split(" ");//split by space to get rid of time
        var newDateEnd = new Date(ogDateEnd);
        sendData.PosEndDate=dateFormat(posEndArray);

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

                    sendData.PosStartDate= newDateStart;
                    sendData.PosEndDate= newDateEnd;
                    //display new entry
                    $scope.pos.push(sendData);

                    //$scope.backup_positions = angular.copy($scope.pos);                        //added 2/28 - save backup with new position


                document.getElementById('p1').value = '';
                document.getElementById('p2').value = '';
                document.getElementById('p3').value = '';
                document.getElementById('p4').value = '';
                document.getElementById('p5').checked = false;
                document.getElementById("positAdd").style.display="none";
                document.getElementById("addPositButton").style.display="block";
                document.getElementById("saveCancelAddPositButtons").style.display ="none";
                document.getElementById("editButtonPositions").style.display = "block";

                //added to clear the values from scope after they have been sent to DB & received
                $scope.posit.PosStartDate = "";
                $scope.posit.PosEndDate = "";
                $scope.posit.JBPosition = "";
                $scope.posit.PosDidFail = "0";
                $scope.posit.PosNote = "";

                alert("updated: [lead-follow_createPositions.php" + JSON.stringify(response));
            },function(result){
                alert("Failed");
        });
    };
    
    //create rank entry
    $scope.CreateRank = function() 
    {
        var sendData=angular.copy($scope.rEvent);
        $scope.editRank = true;
        $scope.editBtnRank = true;
        $scope.addRank = true;
        $scope.addBtnRank = true;

        sendData.fkClassDetailID = $scope.tasks[0].ClassDetailID;
        sendData.JBRank=$scope.rEvent.JBRank.RankObtained;

        sendData.RankObtainedDate+="";
        var ogDate = sendData.RankObtainedDate;
        var rankDateArray=sendData.RankObtainedDate.split(" ");//split by space to get rid of time

        var newDate = new Date(ogDate);
        sendData.RankObtainedDate=dateFormat(rankDateArray);

        alert(JSON.stringify(sendData));

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
                    sendData.RankObtainedDate= newDate;
                    $scope.rank.push(sendData);

                document.getElementById('r1').value = '';
                document.getElementById('r2').value = '';
                document.getElementById('r3').value = '';
                document.getElementById('r4').checked = false;
                document.getElementById("rankAdd").style.display="none";
                document.getElementById("addRankButton").style.display="block";
                document.getElementById("saveCancelAddRankButtons").style.display ="none";
                document.getElementById("editButtonRanks").style.display = "block";

                //added to clear the values from scope after they have been sent to DB & received
                $scope.rEvent.RankObtainedDate = "";
                $scope.rEvent.RankDidFail = "0";
                $scope.rEvent.RankPromotionNote = "";
                $scope.rEvent.JBRank = "";

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
            for(var i=0; i<$scope.tasks.length; i++)
            {
              //change made to format dates in tasks table
                $scope.tasks[i].EventDate=$scope.tasks[i].EventDate.split(" ")[0];
                $scope.tasks[i].EventDate+="T00:00:00";//added to fix the incorrect date that is returned from php
                $scope.tasks[i].EventDate=new Date($scope.tasks[i].EventDate);//need to be a date to display
            }
            //Changes 2/21/29
            for(var j=0; j<$scope.duties.length; j++)
            {
                $scope.duties[j].DutyStartDate=$scope.duties[j].DutyStartDate.split(" ")[0];
                $scope.duties[j].DutyStartDate+="T00:00:00";
                $scope.duties[j].DutyStartDate=new Date($scope.duties[j].DutyStartDate);

                $scope.duties[j].DutyEndDate=$scope.duties[j].DutyEndDate.split(" ")[0];
                $scope.duties[j].DutyEndDate+="T00:00:00";
                $scope.duties[j].DutyEndDate=new Date($scope.duties[j].DutyEndDate);
            }
            for(var k=0; k<$scope.inspections.length; k++)
            {
                $scope.inspections[k].InspectionDate=$scope.inspections[k].InspectionDate.split(" ")[0];
                $scope.inspections[k].InspectionDate+="T00:00:00";
                $scope.inspections[k].InspectionDate=new Date($scope.inspections[k].InspectionDate);
            }
            //Changes end 2/21/19
            for(var l=0; l<$scope.pos.length; l++)
            {
                $scope.pos[l].PosStartDate=$scope.pos[l].PosStartDate.split(" ")[0];
                $scope.pos[l].PosStartDate+="T00:00:00";
                $scope.pos[l].PosStartDate=new Date($scope.pos[l].PosStartDate);

                $scope.pos[l].PosEndDate=$scope.pos[l].PosEndDate.split(" ")[0];
                $scope.pos[l].PosEndDate+="T00:00:00";
                $scope.pos[l].PosEndDate=new Date($scope.pos[l].PosEndDate);
            }
            for(var m=0; m<$scope.rank.length; m++)
            {
                $scope.rank[m].RankObtainedDate=$scope.rank[m].RankObtainedDate.split(" ")[0];
                $scope.rank[m].RankObtainedDate+="T00:00:00";
                $scope.rank[m].RankObtainedDate=new Date($scope.rank[m].RankObtainedDate);
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


    //refresh page to clear input text fields
    /*
    2/25 - changed to be used with all sections
    Duties: reload from partial backup TODO: create partial backup
     */
    $scope.cancelUpdate = function(section) {
        if(section=="duties")
        {
            $scope.duties = angular.copy($scope.backup_duties);                         //RESET DUTIES TO BACKUP

            $scope.editDuty = true;
            $scope.editBtnDuty = true;
            $scope.addDuty = true;
            $scope.addBtnDuty = true;


        }
        else if(section=="tasks"){
            $scope.tasks = angular.copy($scope.backup_tasks);
            $scope.editTasks = true;

        }
        else if(section=="inspections")
        {
            $scope.inspections = angular.copy($scope.backup_inspections);                 //RESET INSPECTIONS TO BACKUP

            $scope.editInspect = true;
            $scope.editBtnInspect = true;
            $scope.addInspect = true;
            $scope.addBtnInspect = true;


        }
        else if(section=="positions"){
            $scope.pos = angular.copy($scope.backup_positions);                          //RESET POSITIONS TO BACKUP
            $scope.editPosit = true; //non-editable = true
            $scope.editBtnPosit = true;
            $scope.addPosit = true;
            $scope.addBtnPosit = true;

        }
        else if(section=="ranks")
        {
            $scope.rank = angular.copy($scope.backup_ranks);                 //RESET RANKS TO BACKUP
            $scope.editRank = true;                                                     //non-editable = true
            $scope.editBtnRank = true;
            $scope.addRank = true;
            $scope.addBtnRank = true;

        }

    };

    /*
    deletes a duty at a certain index
     */
    $scope.deleteDuty = function(index){
        $scope.duties.splice(index,1);                                  //delete the dutyfrom duties array
    };
    /*
  deletes inspection at specified index
*/
    $scope.deleteInspect = function(index){
        $scope.inspections.splice(index,1);
    };
    /*
      deletes rank at specified index
    */
    $scope.deleteRank = function(index){
        $scope.rank.splice(index,1);
    };
    /*
      deletes position at specified index
    */
    $scope.deletePosit = function(index){
        $scope.pos.splice(index,1);
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
    //Min function
    function minDate(){
        let min = new Date(),
            day = min.getDate(),
            month = min.getMonth() + 1, //January is 0
            year = min.getFullYear();
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        min = year + '-' + month + '-' + day;
        let today = min.toString();

        let list = document.getElementsByClassName("LF-Date");
        for (let i = 0; i < list.length; i++) {
            // list[i] is a node with the desired class name
            list[i].setAttribute("min",today);
        }
    }

    //Date format function
    function dateFormat(dateArray)
    {
        //Andrew Changes 2/21/19
        //split by space to get rid of time
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

    $scope.select = function(selected) {
        $scope.selected = selected
    }
});


    
    
    
    
     