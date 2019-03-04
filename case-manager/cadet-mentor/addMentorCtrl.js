angular.module("searchApp").controller('addMentorCtrl', function($scope, $window, $http){

    $scope.mentor= {
        MentorID:"",
        IsPooled:"1",
        MIsPermTerminate:"1",
        MPermTerminateReason:"Reason Permanetly Terminated"
    };
    $scope.cadet = {
        PersonLN: "Last",
        PersonFN: "First",
        PersonGenQual:"Jr.",
        ClassYear:"1970",
        Cycle:"9",
        SiteCode:"GCW",
        SiteClassNumber:"2",
        MPStatus:"MATCHED"
        };


    $scope.personID = JSON.parse($window.sessionStorage.getItem("PersonID"));
    $scope.personID = JSON.parse($window.localStorage.getItem("PersonID"));
    $scope.personID="288"; //This is Mentor 83 - he has 2 cadets - Fletcher and Sewell
   // $scope.personID="110"; //This is Mentor 1 - he is in the pool
   // $scope.personID="208"; //This is Mentor 3 - he is in the pool
   // $scope.personID="848"; // THis is mentor 380 -- he ws terminated
   // $scope.personID="852"; // THis is mentor 394 -- he ws terminated
   //  $scope.personID="340"; //This is Mentor 305 - he is in the pool and has more than one cadet

   // $scope.personID = JSON.parse($window.localStorage.getItem("PersonID"));
    var person = {PersonID: $scope.personID};

    //1. Get Mentor Information
    var taskGetCadets = $http({
        method: 'POST',
        url: '../../php/mentor_getMentorHistory.php',
        data: Object.toparams(person),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });


    taskGetCadets.then(
        //SUCESS
        function(result){
            $scope.mentor = result.data.mentor[0];
            $scope.cadets = result.data.cadets;

        },
        //ERROR
        function(result){
            alert("Error reading Mentor/Cadet Info." + JSON.stringify(result));
        }
    );

    $scope.editMentorInfo=false;

});