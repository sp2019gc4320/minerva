angular.module('website.edit-corecomponent').controller('coreTasksController', function($scope, $http, $window) {
	var corecomponent = 5;
	$scope.editable= false;
    var taskGetCoreTasks = $http({
        method: 'POST',
        url: './php/retriveCoreTasks.php',
        data: Object.toparams(corecomponent),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    taskGetCoreTasks.then(
        //SUCCESS
        function (result) {
            //   alert(JSON.stringify(result));
            $scope.task = result.data.data;
        }
    );
    $scope.makeTasksEditable = function () {
        $scope.editable = true;
        //create backup of tasks
        $scope.taskBackup = angular.copy($scope.task);
    };

    $scope.cancelTasksUpdate = function () {
        $scope.editable = false;
        $scope.task = angular.copy($scope.taskBackup);
    };


	$scope.update= function(){

		for(var i=0; i<$scope.tasks.length;i++){

			$scope.numSaved=0;
			var sendData=angular.copy($scope.tasks[j]);
			$http ({
                method: 'POST',
                url: "./php/updateCoreTasks.php",
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
		


	

}