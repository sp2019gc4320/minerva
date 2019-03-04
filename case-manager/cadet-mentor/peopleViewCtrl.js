angular.module("searchApp").controller('peopleViewCtrl', function($scope, $http, $window){

    $scope.person = {
        PersonID: "218",
        PSalutation:"Ms.",
        PersonFN: "Test",
        PersonMN:"Mid",
        PersonLN:"Bond-Gentry",
        PersonGenQual: "Jr.",
    PersonAdded:"2017-04-27",
        PersonNotes:"note here",
    PAddress:"123 Main Street",
    PAddress2:"Apt 101A",
    PCity: "Milledgeville",
    PState: "GA",
    PZip: "31061",
    PMailAddress: "123 Mailing Address",
    PMailAddress2: "POBox 111",
    PMailCity: "Fort Valley",
    PMailState:"GA",
    PMailZip:"31031",
    PCounty:"Baldwin",
    PUrbanization:"City",
    PEmail:"email@gcsu.edu",
    PDOB:"1990-01-11",
    PDOD:"",
    PSSN:"123221234",
    PGender: "F",
    PEthnicityIsHispanic:"1",
    EXISTING_PersonID:""

    };

	$scope.calculate = {
        age:"99"
	};



	var address1={
	    AddressType:"Physical",
        AddressLine1:"Sample Address1",
        AddressLine2:"Sample Address2",
        City:"Gordon",
        State:"SC",
        Zip:"12345",
	};
    var address2={
        AddressType:"Mailing",
        AddressLine1:"Sample Mailing Address1",
        AddressLine2:"Sample Mailing Address2",
        City:"MailTown",
        State:"NV",
        Zip:"10110",
    };
	$scope.addresses = [];
	$scope.addresses[0] = address1;
	$scope.addresses[1] = address2;


	var raceOp1 = {
	    Race: "Black or African American",
        RaceID:"10"
    };
    var raceOp2 = {
        Race: "White",
        RaceID:"9"
    };
    var raceOp3 = {
        Race: "Asian",
        RaceID:"4"
    };
    var raceOp4 = {
        Race: "American Indian or Alaska Native",
        RaceID:"3"
    };
	$scope.raceOptions=[];
    $scope.raceOptions[0]=raceOp1;
    $scope.raceOptions[1]=raceOp2;
    $scope.raceOptions[2]=raceOp3;

	var contact1={
	    ContactType:"Phone-Work",
        Value:"1235551122",
        Ext:"12",
        Description:"Contact Number",
        IsPreferred:"1"
    };
    var contact2={
        ContactType:"Email-Work",
        Value:"test@gcsu.edu",
        Ext:"",
        Description:"Email Address",
        IsPreferred:"0"
    };
    var contact3={
        ContactType:"Social Media",
        Value:"testUser",
        Ext:"",
        Description:"Social Media Account",
        IsPreferred:"1"
    };

    var race1 ={
        fkPersonID:1, //black
        Race:"Black",
        RaceID:"1"};
    var race2 ={
        fkPersonID:1,  //asian
        Race:"Asian",
        RaceID:"3"};
    $scope.races = [];
    $scope.races[1]= race1;
   // $scope.races[1] = race1;

    $scope.myRace = angular.copy(race2);

    $scope.contacts =[];
    $scope.contacts[0] = contact1;
    $scope.contacts[1] = contact2;
    $scope.contacts[2] = contact3;


    $scope.editPerson= true;


    $scope.getContactType= function (contactType)
    {
        //check if substring has PHONE
        if (contactType.toUpperCase().includes("PHONE"))
        {
            return "PHONE";
        }
        else if (contactType.toUpperCase().includes("EMAIL"))
        {
            return "EMAIL";
        }
        return "OTHER";
    };


    //$scope.personID = JSON.parse($window.sessionStorage.getItem("PersonID"));
    $scope.personID = JSON.parse($window.localStorage.getItem("PersonID"));
    alert(" in personViewCtrl, PersonID is " + $scope.personID);

   /*
   $scope.personID = "223";


    $scope.personID="181"; // Baldwin County

    $scope.personID="1100"; //Urbanization - city

    $scope.personID = "693"; //Race - Black or African American

    $scope.personID = "1019"; //MultiRace - Black or African American and White
    $scope.personID="2118"; //George Williams has birthday -- used to test calculating age
   // $scope.personID="288"; //This is Mentor 83 - he has 2 cadets - Fletcher and Sewell

*/
   // $scope.personID = JSON.parse($window.localStorage.getItem("PersonID"));

   // $scope.personID="2118"; //George Williams has birthday -- used to test calculating age

    var person = {PersonID: $scope.personID};

    //1. Get Mentor Information
    var taskGetPersonInfo = $http({
        method: 'POST',
        url: '../../php/person_getPersonRecordsFromTable.php',
        data: Object.toparams(person),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

   getAge  = function (dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    taskGetPersonInfo.then(
        //SUCESS
        function(result){

            /*
            $scope.person = result.data.person[0];

            //remove the time from all date fields  "2018-01-02 00:00:00" will be 2018-01-02
            $scope.person.PDOB = $scope.person.PDOB.split(" ")[0];

            $scope.calculate.age = getAge($scope.person.PDOB);
            for (var propertyName in $scope.person) {
                //Check to see if property name contains Date
                if (propertyName.includes("Date")) {
                    //store 1st half of timedate stamp
                    $scope.person[propertyName] = $scope.person[propertyName].split(" ")[0];
                }
            };


            $scope.addresses = result.data.addresses;

            $scope.races = result.data.races;
            $scope.racesSelected = [];
            for(var i=0; i< $scope.races.length; i++)
            {
                $scope.racesSelected[i] =angular.copy($scope.races[i]);
            }


            $scope.contacts = result.data.contacts;

*/
        },
        //ERROR
        function(result){
            alert("Error reading PersonInfo." + JSON.stringify(result));
        }
    );

    $scope.addRace = function()
    {
        var nextIndex = $scope.races.length;

        if (nextIndex === $scope.raceOptions.length)
        {
            alert("Cannot add more racial groups");
        }
        else {

            alert("nextIndex: " + nextIndex + " races:" + JSON.stringify($scope.races) + "  racesSelected:" + JSON.stringify($scope.racesSelected));
            if ($scope.races[nextIndex - 1] != "-1") {
                $scope.races[nextIndex] = {RaceID: "-1", Race: ""};
                $scope.racesSelected[nextIndex] = {RaceID: "-1", Race: ""};
            }
            else
                alert("There is an empty selection.");


            alert("nextIndex: " + nextIndex + " races:" + JSON.stringify($scope.races) + "  racesSelected:" + JSON.stringify($scope.racesSelected));
        }
    };

    $scope.changeRace = function ( index) {
        alert(JSON.stringify($scope.racesSelected[index]) + "    index:" + index + "   races:"+JSON.stringify($scope.races));
        alert("options: " + JSON.stringify($scope.raceOptions) + "  raceSelected: " + JSON.stringify($scope.racesSelected) + "  races:"+JSON.stringify($scope.races));
            var i =0;
            var alreadySelected = false;
            while(i< $scope.races.length)
            {
                if($scope.races[i].RaceID == $scope.racesSelected[index].RaceID){
                    alreadySelected = true;
                }
                i++;
            }
            if (!alreadySelected) {
                $scope.races[index].Race = $scope.racesSelected[index].Race;
                $scope.races[index].RaceID = $scope.racesSelected[index].RaceID;
                //       $scope.races[index]= race;
            }
            else
            {   //restore to original value
                alert("This racial group has already been selected.");
                $scope.racesSelected[index] = angular.copy($scope.races[index]);
              //  $scope.racesSelected[index].Race = $scope.races[index].Race;
               // $scope.racesSelected[index].RaceID = $scope.races[index].RaceID;
            }

            alert("options: " + JSON.stringify($scope.raceOptions) + "  raceSelected: " + JSON.stringify($scope.racesSelected) + "  races:"+JSON.stringify($scope.races));

    };
    $scope.deleteRace = function(index)
    {
        //Remove the current element.
        $scope.races.splice(index,1);
        $scope.racesSelected.splice(index,1);
    };

    $scope.addContact = function()
    {
        var contact={
            ContactType:"",
            Value:"",
            Ext:"",
            Description:"",
            IsPreferred:""
        };
        var nextIndex = $scope.contacts.length;
        $scope.contacts[nextIndex] = contact;
    };
    $scope.deleteContact = function(index)
    {
        //Remove the current element.
        $scope.contacts.splice(index,1);

    };

    $scope.copyPhysicalAddress = function(copyIndex)
    {
        //find index of Physical address
        var index=0;
        var found = false;
        while(index< $scope.addresses.length)
        {
            if($scope.addresses[index].AddressType==='Physical')
            {
                found = true;

                break;
            }
            index++;
        }

        if (found)
        {
            var temp = angular.copy($scope.addresses[index]);
            $scope.addresses[copyIndex].AddressLine1 =temp.AddressLine1;
            $scope.addresses[copyIndex].AddressLine2 =temp.AddressLine2;
            $scope.addresses[copyIndex].City =temp.City;
            $scope.addresses[copyIndex].State =temp.State;
            $scope.addresses[copyIndex].Zip =temp.Zip;

        }

    };
    $scope.addAddress = function()
    {
        var address={
            AddressType:"",
            AddressLine1:"",
            AddressLine2:"",
            City:"",
            State:"",
            Zip:"",
        };
        var nextIndex = $scope.addresses.length;
        $scope.addresses[nextIndex] = address;

    };
    $scope.deleteAddress = function(index)
    {
        //Remove the current element.
        $scope.addresses.splice(index,1);

    };


    $scope.editName = true;
    $scope.editAddress= true;
    $scope.editContacts= true;
    $scope.editDemographics=true;

    $scope.isEdit = function(bool)
    {
       // alert("isEdit: " + bool  + "editName: " + $scope.editName);
        return bool;
    };

    $scope.isTelephone = function(contactType)
    {
      return contactType.toLowerCase().includes("phone") ;
    };

    //https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
    $scope.formatPhoneNumber = function(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        if(cleaned.length === 10) {
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3]
            }
        }
        else if (cleaned.length === 7) {
            var match = cleaned.match(/^(\d{3})(\d{4})$/);
            if (match) {
                return  match[1] + '-' + match[2];
            }
        }
        return null
    };
    /*
    $scope.selectMentor = function(index)
	{
		$scope.mentor = $scope.mentors[index];

		//Load Appointments
		var potential = { MentorPotentialID: $scope.mentor.MentorPotentialID};
		$scope.appts = null;

		var taskGetMentorAppts = $http({
            url: './php/mentor_getAppts.php',
            data: Object.toparams(potential),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
        	//SUCCESS
			function(result)
			{
				$scope.appts = result.data.data;
				for(var i=0; i< $scope.appts.length; i++) {
                    for (var propertyName in $scope.appts[i]) {
                        //Check to see if property name contains Date
                        if (propertyName.includes("Date")) {
                            //store 1st half of timedate stamp
                            $scope.appts[i][propertyName] = $scope.appts[i][propertyName].split(" ")[0];
                        }
                    }
                }
                alert(JSON.stringify($scope.appts));
			},
			//ERROF
			function (result) {
				alret("Error reading Mentor appts");

            }
		)
    };

	$scope.taskComplete = function(input){

		if(input==""  ||input=="0" )
		{
			return "alert-danger text-dark";
		}
		else
			return "inputBackgroundColor";
	};

    $scope.recruitTaskStatus = function()
    {

        var test = $scope.mentor;


        if (test.MAgreementDate != "" &&
		    test.IsLiabReleaseSigned == "1" &&
		    test.IsPosDescSigned == "1" &&
			test.HasDriversLic == "1" &&
		    test.HasAutoIns == "1"
		    )
        {
            return "alert-success text-dark";
        }
        else
            return "alert-danger text-dark";

    };
    $scope.screenTaskStatus = function()
    {
        var test = $scope.mentor;

        if (test.MInterviewDate != ""  &&
			test.MRefCheck1Date != "" &&
			test.MRefCheck2Date != "" &&
			test.MBackgroundCheckEndDate != "" &&
			test.MBackgroundCheckStartDate != "" &&
			test.HasPhysAbuseHistory != "1" &&
			test.IsLegallyDQd != "1")
        {
            return "alert-success text-dark";
        }
        else
            return "alert-danger text-dark";

    };
    $scope.trainTaskStatus = function()
    {
        var test = $scope.mentor;
        if(test.MTrainedDate1 != "")
        {
            return "alert-success text-dark";
        }
        else
            return "alert-danger text-dark";

    };
    $scope.matchTaskStatus = function()
    {
        console.log($scope.calculate.MatchWeek);
    	//-------------------------- COMPARE mentor info ---------ADD
        var test= $scope.mentor;
        if($scope.mentor.MenteeTrainingDate != "")
        {
            return "alert-success text-dark";
        }
        else
            return "alert-danger text-dark";
    };

*/

});