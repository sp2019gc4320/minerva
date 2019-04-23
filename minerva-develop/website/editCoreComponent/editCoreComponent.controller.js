angular.module('website.editCoreComponent').controller('editCoreComponentController', function($scope, $http, $window) {
	$scope.corecomponent;
	$scope.editable= false;
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
        $scope.taskBackup = angular.copy($scope.task);
    };

    $scope.cancelTasksUpdate = function () {
        $scope.editable = false;
        $scope.tasks = angular.copy($scope.taskBackup);
    };


	$scope.update= function(){

		for(var i=0; i<$scope.tasks.length;i++){

			$scope.numSaved=0;
			var sendData=angular.copy($scope.tasks[i]);
            sendData['CoreComponentID']=$scope.list;
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
		
    $scope.deleteTask= function(tasknumber){
        var sendData= angular.copy($scope.tasks[0]);
        sendData['CoreComponentID']=$scope.list;
        sendData['TaskNumber']=tasknumber;
        sendData['Task']="";
        sendData['IsActive']="1";
        $http({
            method: 'POST',
            url: "./php/website_deleteCoreTasks.php",
            data: Object.toparams(sendData),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        })

    }
    $scope.addNewTask= function($taskID){
        var sendData= angular.copy($scope.tasks[0]);

        sendData['CoreComponentID']=$scope.list;
        sendData['TaskNumber']=$taskID;
        sendData['Task']="";
        sendData['IsActive']="1";
        $http ({
            method: 'POST',
            url: "./php/website_createCoreTask.php",
            data: Object.toparams(sendData),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }
});