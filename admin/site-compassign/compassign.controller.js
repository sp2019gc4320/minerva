'use strict';
angular.module('admin.compAssign').controller('companyAssignController',function($scope, $http, $window){
	



	$http ({
		method: 'GET',
		url: './php/admin_retrieveCompany.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).then(
		function(result)
		{
			$scope.companies = result.data;
			
			$scope.companies = String($scope.companies).split(",");
			alert(($scope.companies));

		}
	,function(error)
	{
		alert(error);
	});

});