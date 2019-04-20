'use strict';
angular.module('admin.compAssign').controller('companyAssignController',function($scope, $http, $window){
	

	$scope.addCaseManager = function(siteCompany)
	{
		var caseMgrs = siteCompany.caseMgrs;

		var site = siteCompany.companies.split(" ")[1];
		var company = siteCompany.companies.split(" ")[3];

		console.log(siteCompany);


		$http ({
		method: 'GET',
		url: './php/admin_retrieveCaseManager.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).then(
		function(result)
		{
			var users = result.data.CaseMgrs;
			for(var i = 0; i < users.length; i++)
			{
				for(var j = 0; j < caseMgrs.length; j++)
					//console.log(caseMgrs[j]==users[i]);
				if(caseMgrs[j]==users[i])
				{
					console.log("should bump "+caseMgrs[j]);
					users.splice(i,1);
					
				}
			}
					console.log(users);
		},
		function(error)
		{
			alert(error);
		});


		//pass on these elements
		//caseMgrs - current caseMgrs
		//users - potential caseMgrs
		//site - site location
		//company - company to be assigned

	}

	$scope.addCadre = function(siteCompany)
	{
		var cadre = siteCompany.cadre;

		var site = siteCompany.companies.split(" ")[1];
		var company = siteCompany.companies.split(" ")[3];

		console.log(siteCompany);

		$http ({
		method: 'GET',
		url: './php/admin_retrieveCadre.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).then(
		function(result)
		{
			var users = result.data.Cadre;
			for(var i = 0; i < users.length; i++)
			{
				for(var j = 0; j < cadre.length; j++)
				if(cadre[j]===users[i])
				{
					users.splice(i,1);
				}
			}
			console.log(users);

		},
		function(error)
		{
			alert(error);
		});



		//pass on these elements
		//cadre - current cadre
		//users - potential cadre
		//site - site location
		//company - company to be assigned

	}

	function linkMgrs(companyAry)
	{
		var res = [];
		for(var i = 0; i < companyAry.length; i++)
		{
			res[i] = [];
		}
		for(var i = 0; i < companyAry.length; i++)
		{
			var s = companyAry[i].split('|')[0];
			var c = companyAry[i].split('|')[1];
			var n = 0;

			for(var j = 0; j< $scope.staff.length; j++)
			{
				if ($scope.staff[j].site == s && $scope.staff[j].company == c && ($scope.staff[j].privilege).toUpperCase() === ("Case Mgr").toUpperCase() )
				{
					res[i][n] = String($scope.staff[j].user);
					n++;
				}

			}
			if (n==0)
			{
				res[i][0] = "No Managers Assigned";
			}

		}
		return res;
	} 

	function linkCadre(companyAry)
	{
		var res = [];
		for(var i = 0; i < companyAry.length; i++)
		{
			res[i] = [];
		}
		for(var i = 0; i < companyAry.length; i++)
		{
			var s = companyAry[i].split('|')[0];
			var c = companyAry[i].split('|')[1];
			var n = 0;

			for(var j = 0; j< $scope.staff.length; j++)
			{
				if ($scope.staff[j].site == s && $scope.staff[j].company == c && ($scope.staff[j].privilege).toUpperCase() === ("Cadre").toUpperCase() )
				{
					res[i][n] = String($scope.staff[j].user);
					n++;
				}

			}
			if (n==0)
			{
				res[i][0] = "No Cadre Assigned";
			}

		}
		return res;
	}

	$http ({
		method: 'GET',
		url: './php/admin_retrieveCompany.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).then(
		function(result)
		{
			$scope.companies = result.data.company_list[0];
			$scope.staff = result.data.companyStaffTbl;
			
			console.log($scope.staff[0].user);
			

			var companyAry = [];
			for(var i = 0; i < $scope.companies.length; i++)
			{
				companyAry[i] = $scope.companies[i].split(" ")[1]+"|"+$scope.companies[i].split(" ")[3];
			}
			$scope.companies_caseMgrs = linkMgrs(companyAry);
			console.log($scope.companies_caseMgrs);
			$scope.companies_cadre = linkCadre(companyAry);
			console.log($scope.companies_cadre);
			
			$scope.companyDisplay = [];
			for(var i = 0; i < $scope.companies.length; i++)
			{
				$scope.companyDisplay[i] = {"companies": $scope.companies[i], "caseMgrs":  $scope.companies_caseMgrs[i] , "cadre": $scope.companies_cadre[i]};
			}

			
			


		}
	,function(error)
	{
		alert(error);
	});

});