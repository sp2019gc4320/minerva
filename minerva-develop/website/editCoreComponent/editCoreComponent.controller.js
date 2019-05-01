//Created By Graham Schunk
//This is the JavaScript for editing core component tasks as well as tests
//The functions are similar to both but their names and values are different.
//TODO potentially find a way to use one method instead of two.
angular.module('website.editCoreComponent').controller('editCoreComponentController', function($scope, $http, $window) {
	$scope.corecomponent;
	$scope.editable= false; // Tasks are editable
    $scope.editableTests=false; //Tests are editable
    $scope.editableTaskEvents=false;//TaskEvents Are Editable;
    $scope.currTask="";
    $scope.currTest="";
    $scope.taskBackup="";
    $scope.testsBackup="";
    $scope.taskEventsBackup="";
    $scope.showTasks= function(){
        $http({
        method: 'POST',
        url: './php/website_retriveCoreTasks.php',
        data: Object.toparams(corecomponent),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(
        //SUCCESS
        function (result){
            //   alert(JSON.stringify(result));
            $scope.tasks = result.data.taskTbl;
        }
    )};//Comments
    $scope.makeTasksEditable = function () {
        $scope.editable = true;
        //create backup of tasks
        $scope.taskBackup = angular.copy($scope.tasks);
    };

    $scope.cancelTasksUpdate = function () {
        $scope.editable = false;
        $scope.tasks = angular.copy($scope.taskBackup);
    };

    $scope.setCurrTask=function(TaskName){
        $scope.currTask=TaskName;
    }
    $scope.setCurrTest=function(TestName){
        $scope.currTest=TestName;
    }
	$scope.update= function(){

        var updates=angular.copy($scope.tasks);
        for (let i =0; i< $scope.taskBackup.length; i++) {
            let id = $scope.taskBackup[i].TaskID;

            let found = false;
            for(let j =0; j< $scope.tasks.length; j++) {
                if (id == $scope.tasks[j].TaskID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found){
                var update = angular.copy($scope.taskBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }
		for(var i=0; i<updates.length;i++){
			$scope.numSaved=0;
            var sendData= angular.copy(updates[i]);
			$http ({
                method: 'POST',
                url: "./php/website_updateCoreTasks.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {

                   if(response.data) {

                        //this only needs to be saved once all changes are saved.
                        $scope.numSaved++;
                         if($scope.numSaved == $scope.tasks.length)
                            alert("Changes Saved.");
                    }
                    //location.reload(true);
                },function(result){
                    alert("Failed");
                });
        }
        $scope.editable = false;
    };
		
    $scope.deleteTask= function(index){
        $scope.tasks.splice(index,1);
    }
    $scope.addNewTask= function($taskID){
        var sendData= {
            CoreComponentID:"",
            TaskNumber:"",
            Task:"",
            IsActive:"",
        };

        // Copies the first object and sets all atributes to null/default
        sendData['CoreComponentID']=$scope.list;
        sendData['TaskNumber']=$taskID;
        sendData['Task']="";
        sendData['IsActive']="1";
        $scope.tasks.push(sendData);
        $http ({
            method: 'POST',
            url: "./php/website_createCoreTask.php",
            data: Object.toparams(sendData),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        });

    }
    $scope.showTests=function($taskID){
        var sendData={
            TaskID:""
        };
        sendData['TaskID']=$taskID;
        $http({
            method: 'POST',
            url: './php/website_retriveCoreTaskTests.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
        //SUCCESS
        function (result){
            //   alert(JSON.stringify(result));
            $scope.tests = result.data.testTbl;
        }
    )};
    
    $scope.makeTestsEditable=function(){
        $scope.editableTests = true;
        //create backup of tasks
        $scope.testsBackup = angular.copy($scope.tests);
    };
    $scope.cancelTestsUpdate=function(){
        $scope.editableTests = false;
        $scope.tests = angular.copy($scope.testsBackup);
    };
    $scope.addNewTest=function($taskID){
        var sendData={
            TaskTest:"",
            IsActive:""
        };
        sendData['fkTaskID']=$taskID;
        $http({
            method: 'POST',
            url: './php/website_createCoreTaskTest.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result){
            alert("hello");})
    };
    $scope.store = function(index)
    {
        $scope.curIndex = index;
    };
    $scope.current = function(index)
    {
        if (index === $scope.curIndex )
            return "alert-info";
        else
            return "";
    };
    $scope.storeTaskTest = function(index)
    {
        $scope.curTaskTestIndex = index;
    };
    $scope.currentTaskTest = function(index)
    {
        if (index === $scope.curTaskTestIndex )
            return "alert-info";
        else
            return "";
    };    
    $scope.updateTests=function(){

        var updates=angular.copy($scope.tests);
        for (let i =0; i< $scope.testsBackup.length; i++) {
            let id = $scope.testsBackup[i].TaskTestID;

            let found = false;
            for(let j =0; j< $scope.tests.length; j++) {
                if (id == $scope.tests[j].TaskTestID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found){
                var update = angular.copy($scope.testsBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }
        for(var i=0; i<updates.length;i++){
            $scope.numSaved=0;
            var sendData= angular.copy(updates[i]);
            $http ({
                method: 'POST',
                url: "./php/website_updateCoreTaskTests.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {

                   if(response.data) {

                        //this only needs to be saved once all changes are saved.
                        $scope.numSaved++;
                         if($scope.numSaved == $scope.tests.length)
                            alert("Changes Saved.");
                    }
                    //location.reload(true);
                },function(result){
                    alert("Failed");
                });
        }
        $scope.editableTests = false;
    };
    $scope.deleteTest=function(index){
        $scope.tests.splice(index,1);
    };
    $scope.updateTaskEvents=function(){
        var updates=angular.copy($scope.taskevents);
        for (let i =0; i< $scope.taskEventsBackup.length; i++) {
            let id = $scope.taskEventsBackup[i].TaskTestEventID;

            let found = false;
            for(let j =0; j< $scope.taskevents.length; j++) {
                if (id == $scope.taskevents[j].TaskTestEventID)
                    found = true;
            }
            //mark scores that should be deleted from the database
            if (!found){
                var update = angular.copy($scope.taskEventsBackup[i]);
                update.op = "DELETE";
                updates.push(update);
            }
        }
        for(var i=0; i<updates.length;i++){
            $scope.numSaved=0;
            var sendData= angular.copy(updates[i]);
            $http ({
                method: 'POST',
                url: "./php/website_updateCoreTaskEvents.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(response)
                {

                   if(response.data) {

                        //this only needs to be saved once all changes are saved.
                        $scope.numSaved++;
                         if($scope.numSaved == $scope.taskevents.length)
                            alert("Changes Saved.");
                    }
                    //location.reload(true);
                },function(result){
                    alert("Failed");
                });
        }
        $scope.editableTaskEvents = false;
        
    };
    $scope.showTaskEvents=function(TaskTestID){
         var sendData={
            TaskTestID:""
         };
        sendData['TaskTestID']=TaskTestID;
        $http({
            method: 'POST',
            url: './php/website_retriveCoreTaskEvents.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
        //SUCCESS
        function (result){
            //   alert(JSON.stringify(result));
            $scope.taskevents = result.data.taskEventTbl;
        }
    )       
    };
    $scope.deleteTaskEvent=function(index){
        $scope.taskevents.splice(index,1);
    };
    $scope.addNewTaskEvent=function($taskID){
        var sendData={
            TaskTestEventID:"",
            TaskEvent:"",
            IsActive:"",
            TaskEventMeas:"",
            TaskEventFormat:"",
            fkTaskTestID:$taskID
        };

        $http({
            method: 'POST',
            url: './php/website_createCoreTaskEvent.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(result){})
    };
    $scope.makeTaskEventsEditable=function(){
        $scope.editableTaskEvents = true;
        //create backup of tasks
        $scope.taskEventsBackup = angular.copy($scope.taskevents);
    };
    $scope.cancelTaskEventsUpdate=function(){
        $scope.editableTaskEvents = false;
        $scope.taskevents = angular.copy($scope.taskEventsBackup);        
        
    };


});