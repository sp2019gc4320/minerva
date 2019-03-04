angular.module("searchApp").controller('searchMentorViewCtrl', function($scope, $window, $http){


 $scope.addNewPerson = function()
 {
     //reloading table
     $scope.searchUpdateDisplay = "./addMentorView.html" + "?updated="+Date.now();
 };

 $scope.searchForMentors = new function() {
     //1. Get Mentor Information
     var taskGetPotentialMentors = $http({
         method: 'POST',
         url: '../../php/search_getPotentialMentors.php',
         data: Object.toparams($scope.search),
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).then(
         //SUCESS
         function(result){
             $scope.potentials = result.data.potentials;

             //change MTrainedDate to remove time
             for(var i=0; i< $scope.potentials.length; i++){
                $scope.potentials[i].LastTrainedDate = $scope.potentials[i].LastTrainedDate.split(" ")[0];
            }
         },
         //ERROR
         function(result){
             alert("Error reading potenial mentors." + JSON.stringify(result));
         }
     );

 };
 $scope.loadPotential =function(item){

     $window.localStorage.setItem("PersonID",item.PersonID);
     alert("in seachMentorViewCtrl, setting PersonID "+ item.PersonID);
     $scope.searchUpdateDisplay = "./addMentorView.html" + "?updated="+Date.now();
 };

 $scope.search={
     Name:"",
     SiteCode:"GA",
     IsPooled:"1",
     PGender:"B",
     Counties:""
 };

 $scope.potential={
     PersonFN: "first",
     PersonLN: "last",
     PersonGenQual: "Sr.",
     PGender:"M",
     LastTrainedDate:"1990-10-05",
     MentorID:"",
     PersonID:"",
     PCounty:"",
     IsPooled:""
     };
    $scope.personID = JSON.parse($window.sessionStorage.getItem("PersonID"));
    $scope.personID = JSON.parse($window.localStorage.getItem("PersonID"));
    $scope.personID="288"; //This is Mentor 83 - he has 2 cadets - Fletcher and Sewell
    $scope.personID="110"; //This is Mentor 1 - he is in the pool
    $scope.personID="208"; //This is Mentor 3 - he is in the pool
   // $scope.personID="848"; // THis is mentor 380 -- he ws terminated
   // $scope.personID="852"; // THis is mentor 394 -- he ws terminated
    $scope.personID="340"; //This is Mentor 305 - he is in the pool and has more than one cadet
    alert(" in serachMentorViewCtrl, The Person ID NOW set to 340 for testing, this is mentor 305");


    $scope.selectItems = function(item)
    {
        var select = false;
        var search = $scope.search;

        if ((item.IsPooled=="1" && search.IsPooled=="1" ) || search.IsPooled=="0")
            select = true;
        else
            select = false;

        if ((item.PersonLN.toLowerCase().indexOf(search.Name.toLowerCase()) != -1) ||
            (item.PersonFN.toLowerCase().indexOf(search.Name.toLowerCase())) != -1)
            select = select &&  true;
        else
            select = false;

        if(search.PGender=="B" || (search.PGender==item.PGender))
            select = select && true;
        else
            select = false;

        if (search.Counties.length>0) {
            var counties = [];
            counties = search.Counties.split(",");
            var found  = false;
            for (var i = 0 ; i < counties.length; i++) {
                if (item.PCounty.toLowerCase().toLowerCase().indexOf(counties[i].toLocaleLowerCase().trim()) != -1)
                    found = true;
            }
            select = select && found;
        }




        return  (select);
    }


});
