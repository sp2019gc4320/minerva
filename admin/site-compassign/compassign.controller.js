'use strict';


angular.module('admin.compAssign').controller('companyAssignController',function($scope, $http, $window){
	

	/*
		refreshPage()
		simple method to refresh page.
		TODO - Implement in a way that refreshes the component only (Good Luck - Research $router Perhaps)
	 */

	$scope.refreshPage = function(){
		

		document.location.reload();
	}



	/*
		removeUser()
		takes in a user and it's assigned company from a delete button on the view and removes the user from that company
	 */
	
	$scope.removeUser = function(user,company)
	{
		var params = {"user" : user, "company" : company};

		$http({
			method: 'POST',
			url: './php/admin_removeUser.php',
			data: Object.toparams(params),
			headers:{'Content-Type':'application/x-www-form-urlencoded'}
		}).then(
			function(response)
			{
				alert(response.data);
				$scope.refreshPage();
				
			},function(result)
			{
				alert(result);
			}
		);
	}

	/*
		addUser() is called by functions addCadre and addMgr which format the 
		company, user, and privilege inputs for a user to be added to a company.

		this function then sends the parameters to admin_assignUser to be added to the database
		and lets the user know once that is complete
	 */


	function addUser(company, user, privilege)
	{
		var params = {"user" : user, "company" : company, "privilege" : privilege};
		$http({
			method: 'POST',
			url: './php/admin_assignUser.php',
			data: Object.toparams(params),
			headers:{'Content-Type':'application/x-www-form-urlencoded'}

		}).then(
			function(response)
			{
				alert(response.data);
				$scope.refreshPage();

			},function(result)
			{
				alert(result);
			}

		)
	}

	/*
		addCadre() and addMgr() both do the same thing by taking input company name and the selectionID ('user'SelID)
		and ensuring that no faulty input is provided before sending the value chosen on view and submitted with
		the addUser button to the function addUser()
	 */


	$scope.addCadre = function(company,cadreSelID)
	{
		var cadre = (document).getElementById(cadreSelID+"cadre").value;
		if (cadre == "no available cadre")
		{
			alert("there are no cadre left to assign to "+company);
		}
		else if( cadre == "Choose...")
		{
			alert("please select an available cadre");
		}
		else
		{
			addUser(company, cadre, "Cadre");
		}
	}
	
	$scope.addMgr = function(company,mgrSelID)
	{
		var mgr = (document).getElementById(mgrSelID+"mgrs").value;
		if (mgr == "no available caseMgrs")
		{
			alert("there are no case managers left to assign to "+company);
		}
		else if( mgr == "Choose...")
		{
			alert("please select an available case manager");
		}
		else
		{
			addUser(company, mgr, "Case Mgr");
		}
	}

	/*
		linkMgrs() and linkCadre()

		these functions format data from the companyStaff table and assign them to the values from the list of companies
		that the view will sort their assignment by. This is to ensure that the staff are not assigned in the wrong location.
		This also updates the view and user know when there are no assigned staff of a given type over a company
	 */

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
	/*
		linkPotMgrs()
		takes in case managers linked to company assignment and a list of all existing case managers 
		returns arrays of case managers users not currently assigned to a company for each existing company.
	 */

	function linkPotMgrs(caseMgrs,allCaseMgrs)
	{
		var users = [];

		users = allCaseMgrs;
		var res = [];
		for(var i = 0; i < caseMgrs.length; i++)
		{
			res[i] = users.slice(0);
		}
		for(var i = 0; i< caseMgrs.length; i++)
		{
			for(var j = 0; j < caseMgrs[i].length; j++)
			{
				for(var l = 0; l < res[i].length; l++)
				{
					if (res[i][l] == caseMgrs[i][j])
						res[i].splice(l,1);
				}
			}
			if(res[i].length == 0)
			{
				res[i][0] = "no available caseMgrs";
			}
		}
		console.log(res);
		return res;
		

	} 
	/*
		linkPotCadre()
		takes in cadre linked to company assignment and a list of all existing cadre 
		returns arrays of cadre users not currently assigned to a company for each existing company.
	 */
	function linkPotCadre(cadre, allCadre)
	{
		var users = [];

		users = allCadre;
		var res = [];
		for(var i = 0; i < cadre.length; i++)
		{
			res[i] = users.slice(0);
		}
		for(var i = 0; i< cadre.length; i++)
		{
			for(var j = 0; j < cadre[i].length; j++)
			{
				for(var l = 0; l < res[i].length; l++)
				{
					if (res[i][l] == cadre[i][j])
						res[i].splice(l,1);
				}
			}
			if(res[i].length == 0)
			{
				res[i][0] = "no available cadre";
			}
		}
		console.log(res);
		return res;
	
	}

	$http ({
		method: 'GET',
		url: './php/admin_retrieveCompany.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).then(
		function(result)
		{
			var companies = result.data.company_list[0];
			$scope.staff = result.data.companyStaffTbl;
			var allCaseMgrs = result.data.CaseMgrs;
			var allCadre = result.data.Cadre;

			

			
			//tokenizes the "companies" string to be used in the next function linking users to their company 
			var companyAry = [];
			for(var i = 0; i < companies.length; i++)
			{
				companyAry[i] = companies[i].split(" ")[1]+"|"+companies[i].split(" ")[3];
			}

			// these are to link existing users in a company to their place in the array
			var companies_caseMgrs = linkMgrs(companyAry);
			var companies_cadre = linkCadre(companyAry);

			// these are meant to link potential users unassigned to a company to the add dropdown boxes 
			var companies_potMgrs = linkPotMgrs( companies_caseMgrs,allCaseMgrs);
			var companies_potCadre = linkPotCadre( companies_cadre,allCadre); 
			

			// this is the outermost array called in ng-repeat
			$scope.companyDisplay = [];
			// this is the associative array assignemnt linking the data to the outer array.
			for(var i = 0; i < companies.length; i++)
			{
				$scope.companyDisplay[i] = {"companies": companies[i],"cID": companyAry[i],"caseMgrs":  companies_caseMgrs[i] , "potCaseMgrs": companies_potMgrs[i] ,"cadre": companies_cadre[i], "potCadre": companies_potCadre[i]};
			}

			
			


		}
	,function(error)
	{
		alert(error);
	});

});