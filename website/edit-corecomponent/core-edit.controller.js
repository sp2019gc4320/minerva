angular.module('website.edit-corecomponent').controller('coreTasksController', function($scope, $http, $window) {
	
	$scope.editable= false;



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