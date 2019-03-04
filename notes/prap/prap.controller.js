//File: prap.controller.js
// Used with: prap.view.html

angular.module('notes.prap').controller('prapController', function($scope, $http, $window){


    //$scope.cadetID = "12"; //with data
    //alert("setting cadetID to for testing " +$scope.cadetID);

    $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    alert("Test  with Cadet 12 -  Da'jour\tCalloway to see sample dates");


    var cadet = {CadetID: $scope.cadetID};



	//1. Get Cadet's PRAP Notes
	var taskGetPrapNotes = $http({
		method: 'POST',
		url: './php/prap_getPrapNotes.php',
		data: Object.toparams(cadet),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	});

    //2. Get Mentor Contacts
	var taskGetCadetMentorContacts = $http({
        method: 'POST',
        url: './php/prap_getCadetMentorContacts.php',
        data: Object.toparams(cadet),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

	//3 GEt Cadet Class Details
	var taskGetCadetClassDetails =$http({
        method: 'POST',
        url: './php/prap_getCadetClassDetails.php',
        data: Object.toparams(cadet),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });


	taskGetPrapNotes.then(
		//SUCCESS
		function(result) {
		    alert(JSON.stringify(result));
			$scope.prapNotes = result.data.data;

			//Add Created By Name to each Note
			for (var i=0; i< $scope.prapNotes.length; i++) {
				if($scope.prapNotes[i].NoteCreatorID.length > 0)
				{
				var index = i;
				var nameRequest = {PersonID: $scope.prapNotes[i].NoteCreatorID, index: index};
                //Get NoteCreatedByName
                $http({
                    method: 'POST',
                    url: './php/prap_getPersonName.php',
                    data: Object.toparams(nameRequest),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    //SUCCESS
                    function (result) {
                    	var obj =result.data.data[0];
                        var myIndex = result.data.index;

                    	if(obj)
                           $scope.prapNotes[myIndex].NoteCreatedByName = obj.PersonLN+", "+obj.PersonFN;
                    }
                )};

				//Add NoteEditedByName to each Note
                if($scope.prapNotes[i].NoteEditorID.length > 0)
                {
                    var index = i;
                    var nameRequest = {PersonID: $scope.prapNotes[i].NoteEditorID, index:index};
                    //Get NoteCreatedByName
                    $http({
                        method: 'POST',
                        url: './php/prap_getPersonName.php',
                        data: Object.toparams(nameRequest),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(
                        //SUCCESS
                        function (result) {
                            var obj =result.data.data[0];
                            var myIndex = result.data.index;

                            if(obj)
                                $scope.prapNotes[myIndex].NoteEditedByName = obj.PersonLN+", "+obj.PersonFN;
                        }
                    )}
            }
		},
		//ERROR
		function(result){
			alert("Error reading PRAP notes");
		}
	);

	taskGetCadetMentorContacts.then(
		//SUCCESS
		function(result){
			$scope.mentorContacts = result.data.data;

			//Fillin the MentorName
            for (var i=0; i< $scope.mentorContacts.length; i++) {
                if ($scope.mentorContacts[i].fkMentorID.length > 0) {
                    var index = i;
                    var nameRequest = {MentorID: $scope.mentorContacts[i].fkMentorID, index:index};
                    //Get NoteCreatedByName
                    $http({
                        method: 'POST',
                        url: './php/prap_getMentorName.php',
                        data: Object.toparams(nameRequest),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(
                        //SUCCESS
                        function (result) {
                            var obj = result.data.data[0];
                            var myIndex = result.data.index;

                            if (obj)
                                $scope.mentorContacts[myIndex].MentorName = obj.PersonLN + ", " + obj.PersonFN;
                        }
                    )
                }
            }
		},
		//ERROR
		function(result){
			alert("Error reading CadetMentorContacts");

		}
	);


	taskGetCadetClassDetails.then(
		//SUCESS
		function(result){
			$scope.cadetClass = result.data.data[0];
			//alert(JSON.stringify($scope.cadetClass));

		},
		//ERROR
		function(result){
			alert("Error reading Cadet Class Details." + JSON.stringify(result));
		}
	)



});
angular.module('notes.prap').filter('seedate', function($filter)
{
 return function(input)
 {
  if(input == null){ return ""; } 
    alert(input);
  var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
 
  return _date.toUpperCase();

 };
});