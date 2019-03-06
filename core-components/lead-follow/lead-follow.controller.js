/*
File: lead-follow.controller.js
 Use: lead-follow.view.html
 */


angular.module('core-components.lead-follow').controller('leadFollowController', function($scope, $http, $window) {


    //Min function end

    //pre-loaded cadetID
    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    alert("Test Citizenship with Cadet 361 - Jennifer Avila to see sample dates");

    //disallow picking dates past today
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

    //automatically disable being able to add duty
    $scope.addDuty=true;
    $scope.addInspect=true;
    $scope.addPosit=true;
    $scope.addRank=true;

    //automatically hide the save/cancel buttons
    document.getElementById("dutySaveCancelButtons").style.display ="none";
    document.getElementById("taskSaveCancelButtons").style.display ="none";
    document.getElementById("inspectSaveCancelButtons").style.display ="none";
    document.getElementById("positionSaveCancelButtons").style.display ="none";
    document.getElementById("rankSaveCancelButtons").style.display ="none";

    //automatically hide the add info for duty
    document.getElementById("dutyAdd").style.display="none";
    document.getElementById("saveCancelAddDutyButtons").style.display = "none";
    document.getElementById("inspectAdd").style.display="none";
    document.getElementById("saveCancelAddInspectButtons").style.display = "none";
    document.getElementById("positAdd").style.display="none";
    document.getElementById("saveCancelAddPositButtons").style.display = "none";
    document.getElementById("rankAdd").style.display="none";
    document.getElementById("saveCancelAddRankButtons").style.display = "none";


    $scope.addElement = function (section){
        if(section=="duties"){
            $scope.addDuty = false;
            $scope.editDuty = true;

            document.getElementById("editButtonDuties").style.display = "none";
            document.getElementById("addDutyButton").style.display="none";
            document.getElementById("saveCancelAddDutyButtons").style.display = "block";
            var element1 = document.getElementById("dutyAdd");
            if (element1.style.display == 'none') {
                element1.style.display = 'block';
            }
            var element2 = document.getElementById("dutySaveCancelButtons");
            if(element2.style.display=='block'){
                element2.style.display='none';
            }
        }
        else if(section=="inspections"){
            $scope.addInspect = false;
            $scope.editInspect = true;

            document.getElementById("editButtonInspections").style.display = "none";
            document.getElementById("addInspectButton").style.display="none";
            document.getElementById("saveCancelAddInspectButtons").style.display = "block";
            var element1 = document.getElementById("inspectAdd");
            if (element1.style.display == 'none') {
                element1.style.display = 'block';
            }
            var element2 = document.getElementById("inspectSaveCancelButtons");
            if(element2.style.display=='block'){
                element2.style.display='none';
            }
        }
        else if(section=="positions"){
            $scope.addPosit = false;
            $scope.editPosit = true;

            document.getElementById("editButtonPositions").style.display = "none";
            document.getElementById("addPositButton").style.display="none";
            document.getElementById("saveCancelAddPositButtons").style.display = "block";
            var element1 = document.getElementById("positAdd");
            if (element1.style.display == 'none') {
                element1.style.display = 'block';
            }
            var element2 = document.getElementById("positionSaveCancelButtons");
            if(element2.style.display=='block'){
                element2.style.display='none';
            }
        }
        else if(section=="ranks"){
            $scope.addRank = false;
            $scope.editRank=true;

            document.getElementById("editButtonRanks").style.display = "none";
            document.getElementById("addRankButton").style.display="none";
            document.getElementById("saveCancelAddRankButtons").style.display = "block";
            var element1 = document.getElementById("rankAdd");
            if (element1.style.display == 'none') {
                element1.style.display = 'block';
            }
            var element2 = document.getElementById("rankSaveCancelButtons");
            if(element2.style.display=='block'){
                element2.style.display='none';
            }
        }
    };

    $scope.cancelAddElement = function (section){
        if(section=="duties"){
            $scope.addDuty = true;
            document.getElementById("editButtonDuties").style.display = "block";
            document.getElementById("addDutyButton").style.display="block";
            document.getElementById("saveCancelAddDutyButtons").style.display = "none";
            var element1 = document.getElementById("dutyAdd");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }
        }
        else if(section=="inspections"){
            $scope.addInspect = true;
            document.getElementById("editButtonInspections").style.display = "block";
            document.getElementById("addInspectButton").style.display="block";
            document.getElementById("saveCancelAddInspectButtons").style.display = "none";
            var element1 = document.getElementById("inspectAdd");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }
        }
        else if(section=="positions"){
            $scope.addPosit = true;
            document.getElementById("editButtonPositions").style.display = "block";
            document.getElementById("addPositButton").style.display="block";
            document.getElementById("saveCancelAddPositButtons").style.display = "none";
            var element1 = document.getElementById("positAdd");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }
        }
        else if(section=="ranks"){
            $scope.addRank = true;
            document.getElementById("editButtonRanks").style.display = "block";
            document.getElementById("addRankButton").style.display="block";
            document.getElementById("saveCancelAddRankButtons").style.display = "none";
            var element1 = document.getElementById("rankAdd");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }
        }
    }


    /*
    makes the section editable, displays the save/cancel buttons
    TODO: add other sections (inspections, tasks, ranks, positions)
     */
    $scope.editSection = function (section) {
        if(section == "duties") {
            $scope.editDuty = false;
            $scope.backup_duties = angular.copy($scope.duties);                        //added 2/26 - save backup before updates made

            document.getElementById("addDutyButton").style.display="none";
            document.getElementById("editButtonDuties").style.display = "none";
            var element1 = document.getElementById("dutySaveCancelButtons");
            if (element1.style.display == 'none') {
                element1.style.display = 'block';
            }
        }
        else if(section=="tasks"){
            $scope.editTasks = false;
            $scope.backup_tasks = angular.copy($scope.tasks);

            document.getElementById("editButtonTasks").style.display = "none";
            var element1 = document.getElementById("taskSaveCancelButtons");
            if (element1.style.display == 'none') {
                element1.style.display = 'block';
            }

        }
        else if(section=="inspections"){
            $scope.editInspect = false;
            $scope.backup_inspections = angular.copy($scope.inspections);

            document.getElementById("addInspectButton").style.display="none";
            document.getElementById("editButtonInspections").style.display = "none";
            var element1 = document.getElementById("inspectSaveCancelButtons");
            if (element1.style.display == 'none') {
                element1.style.display = 'block';
            }

        }
        else if(section=="positions"){
            $scope.editPosit = false;
            $scope.backup_positions = angular.copy($scope.pos);

            document.getElementById("addPositButton").style.display="none";
            document.getElementById("editButtonPositions").style.display = "none";
            var element1 = document.getElementById("positionSaveCancelButtons");
            if (element1.style.display == 'none') {
                element1.style.display = 'block';
            }
        }
        else if(section=="ranks"){
            $scope.editRank = false;
            $scope.backup_ranks = angular.copy($scope.rank);

            document.getElementById("addRankButton").style.display="none";
            document.getElementById("editButtonRanks").style.display = "none";
            var element1 = document.getElementById("rankSaveCancelButtons");
            if (element1.style.display == 'none') {
                element1.style.display = 'block';
            }

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

          //display edit button, hide save/cancel buttons
          document.getElementById("editButtonDuties").style.display = "block";
          var element1 = document.getElementById("dutySaveCancelButtons");
          if (element1.style.display == 'block') {
              element1.style.display = 'none';
          }

          //clears the values in the create duty line
          document.getElementById('1').value = '';
          document.getElementById('2').checked = false;
          document.getElementById('3').value = '';
          document.getElementById('4').value = '';
          document.getElementById('5').value = '';
          //show addRank button
          document.getElementById("addDutyButton").style.display="block";


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
              var dateArray=sendData.DutyStartDate.split(" ");//split by space to get rid of time
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
              var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD
              sendData.DutyStartDate=dateString;

              sendData.DutyEndDate+="";
              var dateArray=sendData.DutyEndDate.split(" ");//split by space to get rid of time
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


              var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD
              sendData.DutyEndDate=dateString;

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

          //display edit button, hide save/cancel buttons
          document.getElementById("editButtonTasks").style.display = "block";
          var element1 = document.getElementById("taskSaveCancelButtons");
          if (element1.style.display == 'block') {
              element1.style.display = 'none';
          }

          //loops for # rows in table
          for (var j=0; j<$scope.tasks.length; j++)
          {
              //copy current row
              var sendData=angular.copy($scope.tasks[j]);
              sendData.EventDate+="";//make the whole thing a string

              //Andrew dateArray added here
              var dateArray=sendData.EventDate.split(" ");//split by space to get rid of time
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


              var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD
              //Andrew dateArray change end

              sendData.EventDate=dateString;
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

            //display edit button, hide save/cancel buttons
            document.getElementById("editButtonInspections").style.display = "block";
            var element1 = document.getElementById("inspectSaveCancelButtons");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }

            //clears the values in the create inspection line
            document.getElementById('i1').value = '';
            document.getElementById('i2').value = '';
            document.getElementById('i3').checked = false;
            document.getElementById('i4').value = '';
            document.getElementById('i5').value = '';
            document.getElementById("addInspectButton").style.display="block";


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
                var dateArray=sendData.InspectionDate.split(" ");//split by space to get rid of time
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
                var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD

                sendData.InspectionDate=dateString;


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

          //display edit button, hide save/cancel buttons
          document.getElementById("editButtonPositions").style.display = "block";
          var element1 = document.getElementById("positionSaveCancelButtons");
          if (element1.style.display == 'block') {
              element1.style.display = 'none';
          }

          //clears the values in the create position line
          document.getElementById('p1').value = '';
          document.getElementById('p2').value = '';
          document.getElementById('p3').value = '';
          document.getElementById('p4').value = '';
          document.getElementById('p5').checked = false;
          document.getElementById("addPositButton").style.display="block";


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
              var dateArray=sendData.PosStartDate.split(" ");//split by space to get rid of time
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
              var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD
              sendData.PosStartDate=dateString;


              sendData.PosEndDate+="";
              var dateArray=sendData.PosEndDate.split(" ");//split by space to get rid of time
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


              var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD
              sendData.PosEndDate=dateString;


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

          //display edit button, hide save/cancel buttons
          document.getElementById("editButtonRanks").style.display = "block";
          var element1 = document.getElementById("rankSaveCancelButtons");
          if (element1.style.display == 'block') {
              element1.style.display = 'none';
          }

          //clears the values in the create rank line
          document.getElementById('r1').value = '';
          document.getElementById('r2').value = '';
          document.getElementById('r3').value = '';
          document.getElementById('r4').checked = false;
          document.getElementById("addRankButton").style.display="block";


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
              var dateArray=sendData.RankObtainedDate.split(" ");//split by space to get rid of time
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
              var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD
              sendData.RankObtainedDate=dateString;


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

        //pull ClassDetailID from tasks
        sendData.fkClassDetailID = $scope.tasks[0].ClassDetailID;
        //pull JobPosition from dropdown
        sendData.JobPosition=$scope.duty.JobPosition.DutyPosition;

        var ogDateStart = sendData.DutyStartDate;
        var ogDateEnd = sendData.DutyEndDate;

        sendData.DutyStartDate+="";
        var dateArray=sendData.DutyStartDate.split(" ");//split by space to get rid of time
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
        var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD
        var newDateStart = new Date(ogDateStart);
        sendData.DutyStartDate=dateString;

        sendData.DutyEndDate+="";
        var dateArray=sendData.DutyEndDate.split(" ");//split by space to get rid of time
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


        var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD
        var newDateEnd = new Date(ogDateEnd);
        sendData.DutyEndDate=dateString;

        //create data entry using createDuty.php
        $http(
            {
            method: 'POST',
            url: "./php/lead-follow_createDuty.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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

                // $scope.backup_duties = angular.copy($scope.duties);                        //added 2/26 - save backup before updates made


                //clears inputs in the create duty line
                document.getElementById('1').value = '';
                document.getElementById('2').checked = false;
                document.getElementById('3').value = '';
                document.getElementById('4').value = '';
                document.getElementById('5').value = '';
                document.getElementById("dutyAdd").style.display="none";
                document.getElementById("addDutyButton").style.display="block";
                document.getElementById("saveCancelAddDutyButtons").style.display ="none";
                document.getElementById("editButtonDuties").style.display = "block";



                alert("updated: [lead-follow_createDuty.php" + JSON.stringify(response));
                alert("duties array: " + JSON.stringify($scope.duties));
                alert("response id: " + JSON.stringify(response.data.id));
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


        //Date display changes
        sendData.InspectionDate+="";
        var ogDate = sendData.InspectionDate;
        var dateArray=sendData.InspectionDate.split(" ");//split by space to get rid of time
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
        var newDate = new Date(ogDate);
        sendData.InspectionDate=dateString;
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
                    sendData.InspectionDate= newDate;
                    $scope.inspections.push(sendData);
                    //$scope.backup_inspections = angular.copy($scope.inspections);                  //added 2/28 - save backup with new inspection


                document.getElementById('i1').value = '';
                document.getElementById('i2').value = '';
                document.getElementById('i3').checked = false;
                document.getElementById('i4').value = '';
                document.getElementById('i5').value = '';
                document.getElementById("inspectAdd").style.display="none";
                document.getElementById("addInspectButton").style.display="block";
                document.getElementById("saveCancelAddInspectButtons").style.display ="none";
                document.getElementById("editButtonInspections").style.display = "block";



                alert("updated: [lead-follow_createInspections.php" + JSON.stringify(response));
            },function(result){
                alert("Failed");
        });
    };
    
    //create position entry
    $scope.CreatePosit = function()
    {
        var sendData=angular.copy($scope.posit);
        
        //pull ClassDetailID from tasks
        sendData.fkClassDetailID = $scope.tasks[0].ClassDetailID;
        //pull JBPosition from dropdown
        sendData.JBPosition=$scope.posit.JBPosition.JBPosition;

        sendData.PosStartDate+="";
        var ogDateStart = sendData.PosStartDate;
        var ogDateEnd = sendData.PosEndDate;
        //Andrew Changes 2/21/19
        var dateArray=sendData.PosStartDate.split(" ");//split by space to get rid of time
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
        var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD
        var newDateStart = new Date(ogDateStart);
        sendData.PosStartDate=dateString;

        sendData.PosEndDate+="";
        var dateArray=sendData.PosEndDate.split(" ");//split by space to get rid of time
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


        var dateString=dateArray[3]+'-'+month+'-'+dateArray[2];//off by one YMD
        var newDateEnd = new Date(ogDateEnd);
        sendData.PosEndDate=dateString;

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

        sendData.RankObtainedDate+="";
        var ogDate = sendData.RankObtainedDate;
        var dateArray=sendData.RankObtainedDate.split(" ");//split by space to get rid of time
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
        var newDate = new Date(ogDate);
        sendData.RankObtainedDate=dateString;

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
                    //alert("data updated")
                   // $scope.backup_ranks = angular.copy($scope.rank);                        //added 2/28 - save backup with new rank


                document.getElementById('r1').value = '';
                document.getElementById('r2').value = '';
                document.getElementById('r3').value = '';
                document.getElementById('r4').checked = false;
                document.getElementById("rankAdd").style.display="none";
                document.getElementById("addRankButton").style.display="block";
                document.getElementById("saveCancelAddRankButtons").style.display ="none";
                document.getElementById("editButtonRanks").style.display = "block";


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
            $scope.editDuty = true;                                                     //non-editable = true
            document.getElementById("editButtonDuties").style.display = "block";
            document.getElementById("addDutyButton").style.display="block";
            var element1 = document.getElementById("dutySaveCancelButtons");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }
            document.getElementById('1').value = '';
            document.getElementById('2').checked = false;
            document.getElementById('3').value = '';
            document.getElementById('4').value = '';
            document.getElementById('5').value = '';
        }
        else if(section=="tasks"){
            $scope.tasks = angular.copy($scope.backup_tasks);
            $scope.editTasks = true;
            document.getElementById("editButtonTasks").style.display = "block";
            var element1 = document.getElementById("taskSaveCancelButtons");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }
        }
        else if(section=="inspections")
        {
            $scope.inspections = angular.copy($scope.backup_inspections);                 //RESET INSPECTIONS TO BACKUP
            $scope.editInspect = true;                                                     //non-editable = true
            document.getElementById("editButtonInspections").style.display = "block";
            document.getElementById("addInspectButton").style.display="block";

            var element1 = document.getElementById("inspectSaveCancelButtons");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }
            document.getElementById('1').value = '';
            document.getElementById('2').value = '';
            document.getElementById('3').checked = false;
            document.getElementById('4').value = '';
            document.getElementById('5').value = '';
        }
        else if(section=="positions"){
            $scope.pos = angular.copy($scope.backup_positions);                          //RESET POSITIONS TO BACKUP
            $scope.editPosit = true;                                                        //non-editable = true
            document.getElementById("editButtonPositions").style.display = "block";
            document.getElementById("addPositButton").style.display="block";
            var element1 = document.getElementById("positionSaveCancelButtons");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }
            document.getElementById('p1').value = '';
            document.getElementById('p2').value = '';
            document.getElementById('p3').value = '';
            document.getElementById('p4').value = '';
            document.getElementById('p5').checked = false;
        }
        else if(section=="ranks")
        {
            $scope.rank = angular.copy($scope.backup_ranks);                 //RESET RANKS TO BACKUP
            $scope.editRank = true;                                                     //non-editable = true
            document.getElementById("editButtonRanks").style.display = "block";
            document.getElementById("addRankButton").style.display="block";
            var element1 = document.getElementById("rankSaveCancelButtons");
            if (element1.style.display == 'block') {
                element1.style.display = 'none';
            }
            document.getElementById('1').value = '';
            document.getElementById('2').value = '';
            document.getElementById('3').value = '';
            document.getElementById('4').checked = false;
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
});


    
    
    
    
     