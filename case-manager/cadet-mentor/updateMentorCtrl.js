/* dialog resource: https://material.angularjs.org/latest/demo/dialog

 */

'use strict';

angular.module('caseManager.cadetMentor').
    controller('updateMentorCtrl', function($scope, $http, $window){

	$scope.mentor= {
		MentorPotentialID: "7",
        MPHierarchy: "Primary",
        MPProximity: "11",
        MPRelationship: "Uncle",
        MPStatus: "LEAD",
        MPStatusNote: "Status Note",
        MMaritalStatus: "Divorced",
        MEmployer: "Georgia College",
        MOccupation: "Therapist",
        MWorkStatus: "Volunteer",
        MOrganization: "USG",
		InPool: "1",

		MAgreementDate:"2018-01-02",// January 11 2018  -yyyy-mm-dd  used dashes!
		IsLiabReleaseSigned:"0",
		IsPosDescSigned:"0",
		HasAutoIns:"1",
		HasDriversLic:"1",
		MPRecruitedDate:"2018-07-03",

		MInterviewDate:"",
		MRefCheck1Date:"2018-01-04",
		MRefCheck2Date:"2018-01-05",
		MBackgroundCheckStartDate:"",
        MBackgroundCheckEndDate:"2018-01-08",
		IsLegallyDQd:"1",
        HasPhysAbuseHistory:"0",
		MScreenedDate:"",

		MTrainedDate1:"2018-01-09",
		MTrainedDate:"2018-01-10",

		MMatchNote:"Hello World!",
		MMatchDate:"2018-01-11",

		MPTermDate:"2018-01-11",
		MPTermNote:"This is the termination note",

		FailedDate:"2018-02-11",
        FailedReason:"This is the failed note",

		MExitMeetingDate:"2018-03-13",

		//These fields are from ClassDetails
		EnrollmentZip: "31061",
        MenteeTrainingDate:"2018-04-05",  //april 5 2018


		//These field are from People
		PZip: "31087",
        PersonLN: "Jack",
        PersonFN: "Frost"


    };
	$scope.calculate = {
        MatchWeek:"99"
	};


	/*
	$scope.classDetails={
		MenteeTrainingDate:"2018-04-05",  //april 5 2018

		//Other Sample data from Cadet 406 - Elibert
        ClassDetailID: "405",
		fkClassID: "2",
		fkCadetID: "406",
		MentorMatchDate: "",
		TerminationDate:"2017-11-28",
		TerminationReason:"Left at Parents Request",
		TerminationNote:""

    };
*/

	$scope.appt={
	    AppointmentID:"4",
		fkMentorPotentialID:"7",
		ApptType:"OFF-SITE",
		ApptDate:"2018-01-11",
		ApptNote: "Appointment Note"
	};

    $scope.searchByZip = "distance between " + $scope.mentor.EnrollmentZip + " and " + $scope.mentor.PZip;



    $scope.editMentorInfo= false;
    $scope.editPersonal = false;
    $scope.editDates = false;
    $scope.editAppts = false;
    $scope.editEndInfo = false;

    $scope.initialization = function()
    {
        $scope.editMentorInfo= false;
        $scope.editPersonal = false;
        $scope.editDates = false;
        $scope.editAppts = false;
        $scope.edtiEndInfo = false;
    };

    $scope.editSection = function (section)
    {
        if(section =="info")
            $scope.editMentorInfo = true;
        else if (section == "personal")
            $scope.editPersonal = true;
        else if (section == "dates")
            $scope.editDates = true;
        else if (section == "appts")
            $scope.editAppts = true;
        else if (section =="endInfo")
            $scope.editEndInfo = true;
    };

    $scope.infoFields = ["MPHierarchy","MPProximity","MPRelationship","MPStatusNote"];
    $scope.personalFields = ["MMaritalStatus","MEmployer","MOccupation","MWorkStatus","MOrganization"];
    $scope.datesFields=["MAgreementDate","IsLiabReleaseSigned","IsPosDescSigned","HasAutoIns","HasDriversLic",
        "MPRecruitedDate","MInterviewDate","MRefCheck1Date","MRefCheck2Date","MBackgroundCheckStartDate",
        "MBackgroundCheckEndDate","IsLegallyDQd","HasPhysAbuseHistory","MScreenedDate","MTrainedDate1",
        "MTrainedDate","MMatchNote","MMatchDate","fkClassDetailID","MenteeTrainingDate"];
    $scope.endInfoFields= ["MPTermDate", "MPTermNote", "FailedDate", "FailedReason", "MExitMeetingDate"];



    $scope.deleteAppt = function(index){
        $scope.appts.splice(index,1);
    };

    $scope.addAppt = function()
    {
        var appt={
            AppointmentID:"",
            fkMentorPotentialID: $scope.mentors[$scope.mentorIndex].MentorPotentialID,
            ApptType:"",
            ApptDate:"",
            ApptNote:"",
            op:"ADD"
        };

        $http({
            method: 'POST',
            url: './php/mentor_updateAppts.php',
            data: Object.toparams(appt),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCESS
            function (result) {

                appt.AppointmentID = result.data.id;
                var nextIndex = $scope.appts.length;
                delete  appt.op;

                $scope.appts[nextIndex] = angular.copy(appt);
                $scope.backup_appts.push( angular.copy(appt));
            },

            //ERROR
            function (result) {
                alert("Error updating record" + JSON.stringify(result));
            });

    };

    $scope.getPartialBackup = function(fields, mentor) {
        var tempCopy ={};
        for (var i=0; i<fields.length; i++)  {
            tempCopy[fields[i]] = mentor[fields[i]];
        }
        return tempCopy;
    };

    $scope.resetFromPartialBackup = function(partial , index)
    {
        for(var propertyName in partial) {

            ($scope.mentors[index])[propertyName] = partial[propertyName];
        }
    };
    $scope.mentorIndex = 0;


    $scope.saveSection = function (section) {
        var update = {};
        var updates = [];


        //UPDATE appts
        if (section == "appts") {
            $scope.editAppts = false;

            //Find new and updated appts
            for(let i=0; i< $scope.appts.length; i++) {
                update = angular.copy($scope.appts[i]);
                let id = $scope.appts[i].AppointmentID;

                if (id=="") {
                    update.op = "ADD";
                }
                else {
                    update.op = "UPDATE";
                }
                updates.push(update);
            }
            //Find deleted appts
            for (let i =0; i< $scope.backup_appts.length; i++) {
                let id = $scope.backup_appts[i].AppointmentID;

                let found = false;
                for(let j =0; j< $scope.appts.length; j++) {
                    if (id == $scope.appts[j].AppointmentID)
                        found = true;
                }
                if (!found){
                    update = angular.copy($scope.backup_appts[i]);
                    update.op = "DELETE";
                    updates.push(update);
                }
            }

            //send updates to php file:
            for (let index = 0; index < updates.length; index++) {
                var taskSaveAppts = $http({
                    method: 'POST',
                    url: './php/mentor_updateAppts.php',
                    data: Object.toparams(updates[index]),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });

                taskSaveAppts.then(
                    //SUCESS
                    function (result) {
                        //appts updated!
                    },
                    //ERROR
                    function (result) {
                        alert("Error updating record" + JSON.stringify(result));
                    });
            };

        }

        //all other updates besides appts
        else {

            if (section == "info") {
                $scope.editMentorInfo = false;
                //there may be more than one mentor:
                $scope.backup_info = [];
                for (let i = 0; i < $scope.mentors.length; i++) {
                    $scope.backup_info[i] = $scope.getPartialBackup($scope.infoFields, $scope.mentors[i]);
                    update = angular.copy($scope.backup_info[i]);
                    updates.push(update);
                }
            }
            else if (section == "personal") {
                $scope.editPersonal = false;
                $scope.backup_personal = $scope.getPartialBackup($scope.personalFields, $scope.mentors[$scope.mentorIndex]);
                update = angular.copy($scope.backup_personal);
                updates.push(update);
            }
            else if (section == "dates") {
                $scope.calculateMatchDate();
                $scope.editDates = false;
                $scope.backup_dates = $scope.getPartialBackup($scope.datesFields, $scope.mentors[$scope.mentorIndex]);
                update = angular.copy($scope.backup_dates);
                updates.push(update);
            }
            else if (section == "endInfo"){
                $scope.editEndInfo = false;
                $scope.backup_endInfo = $scope.getPartialBackup($scope.endInfoFields, $scope.mentors[$scope.mentorIndex]);
                update = angular.copy($scope.backup_endInfo);
                updates.push(update);
            }

            //send  tblMentorPotenial updates to php file:
            for (let index = 0; index < updates.length; index++) {
                updates[index].MentorPotentialID = $scope.mentors[index].MentorPotentialID;

                var taskSaveUpdates = $http({
                        method: 'POST',
                        url: './php/mentorStatus_update.php',
                        data: Object.toparams(updates[index]),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });

                taskSaveUpdates.then(
                    //SUCESS
                    function (result) {
                        //alert("records updated");
                        },
                        //ERROR
                    function (result) {
                            alert("Error updating record" + JSON.stringify(result));
                    });
            }
        }//else
    };

    $scope.cancelSection = function(section)
    {
        if(section =="info") {
            $scope.editMentorInfo = false;

            for(let i=0; i< $scope.backup_info.length; i++) {
                $scope.resetFromPartialBackup($scope.backup_info[i], i);
            }
        }
        else if (section == "personal"){
            $scope.editPersonal = false;
            $scope.resetFromPartialBackup($scope.backup_personal, $scope.mentorIndex);
        }
        else if (section == "dates"){
            $scope.editDates = false;
            $scope.resetFromPartialBackup($scope.backup_dates, $scope.mentorIndex);
        }
        else if (section == "endInfo"){
            $scope.editEndInfo = false;
            $scope.resetFromPartialBackup($scope.backup_endInfo, $scope.mentorIndex);
        }
        else if (section == "appts"){
            $scope.appts = angular.copy($scope.backup_appts);
            $scope.editAppts = false;

        }
    };
    $scope.openMentorView = function(index)
    {

        $window.localStorage.setItem("PersonID", $scope.mentors[$scope.mentorIndex].PersonID);
        $window.sessionStorage.setItem("PersonID", $scope.mentors[$scope.mentorIndex].PersonID);
        //$window.location = '#/addMentor';
        $scope.caseUpdateDisplay = './case-manager/cadet-mentor/updateMentor.view.html'+ "?updated=" + Date.now();


    };
    $scope.openSearchMentorView = function()
    {

        $window.open('./case-manager/cadet-mentor/searchMentorViewIndex.html', "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,height=400");

    };






    $scope.loadMentors = function() {

        $scope.cadetID = JSON.parse($window.sessionStorage.getItem("CadetID"));
        $scope.cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
        // alert($scope.cadetID);

        alert("Use CadetID 406 - Joshua Elbert to see multiple mentors");

        //testing multiple mentors - ClassDetailID = 405 is for Catde 406
       // $scope.cadetID = "406"; //Cadet with 2 Mentors - 419, 531
        //addded cadet 406  with a mentor 1 who is disassociated status  - changed mentorpotentialID

        var cadet = {CadetID: $scope.cadetID};

        //1. Get Mentor Information
        var taskGetMentorInfo = $http({
            method: 'POST',
            url: './php/mentor_getRecordsFromTable.php',
            data: Object.toparams(cadet),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        taskGetMentorInfo.then(
            //SUCESS
            function (result) {
                alert("mentorInfo" + JSON.stringify(result));
                $scope.mentors = result.data.data;

                //set everything to null
                $scope.backup_info = [];
                $scope.backup_personal = {};
                $scope.backup_dates = {};
                $scope.backup_appts = [];
                $scope.backup_endInfo = {};

                $scope.mentor = null;
                for (let i = 0; i < $scope.mentors.length; i++) {
                    $scope.mentor = $scope.mentors[i];

                    //*remove the time from all date fields  "2018-01-02 00:00:00" will be 2018-01-02*/
                    for (var propertyName in $scope.mentor) {
                        //Check to see if property name contains Date
                        if (propertyName.includes("Date")) {
                            //store 1st half of timedate stamp
                            if($scope.mentor[propertyName])
                               $scope.mentor[propertyName] =  $scope.mentor[propertyName].split(" ")[0];

                            if ($scope.mentor[propertyName] == "0000-00-00")
                                $scope.mentor[propertyName] =  "";

                            /* else
                             $scope.mentor[propertyName] =  new Date( $scope.mentor[propertyName]);
                             */
                        }
                    }
                    $scope.searchByZip = "distance between " + $scope.mentor.EnrollmentZip + " and " + $scope.mentor.PZip;
                    //Store search criteria for each mentor
                    $scope.mentor.searchByZip = "distance between " + $scope.mentor.EnrollmentZip + " and " + $scope.mentor.PZip;
                    if ($scope.mentor.MMatchDate != "") {
                        $scope.loadMatchWeek($scope.mentor.fkClassID, $scope.mentor.MMatchDate, i);
                    }
                }

                //Maintain separate list of disassociated mentors
                $scope.disassociatedMentors = [];
                for (let i = 0; i < $scope.mentors.length; i++) {
                    $scope.mentor = $scope.mentors[i];
                    if ($scope.mentor.MPStatus.includes("Disassociate")) {
                        $scope.disassociatedMentors.push($scope.mentor);
                        $scope.mentors.splice(i, 1);
                        i--;
                    }
                }
                if ($scope.mentors.length > 0) {
                    $scope.selectMentor(0);


                    $scope.backup_mentor = angular.copy($scope.mentor);

                    //backup info for both people
                    $scope.backup_info = [];
                    for (let j = 0; j < $scope.mentors.length; j++) {
                        $scope.backup_info[j] = $scope.getPartialBackup($scope.infoFields, $scope.mentors[j]);
                    }
                }
                else {
                    $scope.mentor = null;
                }
            },
            //ERROR
            function (result) {
                alert("Error reading MentorPotential." + JSON.stringify(result));
            }
        );

    };

    $scope.setZipSearch = function(index){
        $scope.searchByZip = $scope.mentors[index].searchByZip;
    };

    $scope.loadMentors();

    $scope.disassociate = function(index)
    {
        //update potential mentor status --- Get this value from table  lookukp table
        var sendData = {MentorPotentialID: $scope.mentors[index].MentorPotentialID, MPStatus:"Disassociate From Cadet"};
        $http({
            method: 'POST',
            url: './php/mentorStatus_update.php',
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCCESS
            function(result){
                //reload mentors - this will impact mentors displayed
                $scope.loadMentors();

                //any changes that have not been saved will be cancelled.
                //code will return to edit mode.
            },
            //ERROR
            function(result){
                alert("unable to disassociate mentor");
            }
        )
    };

    $scope.loadMatchWeek = function (fkClassID, MMatchDate, mentorIndex)
    {
          var matchInfo = { fkClassID: fkClassID, MMatchDate: MMatchDate};
          var taskGetMatchWeek = $http({
            method: 'POST',
            url: './php/mentor_getMatchWeek.php',
            data: Object.toparams(matchInfo),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

          taskGetMatchWeek.then(
              //SUCCESS
              function(result){
                  $scope.calculate.MatchWeek = result.data.data[0].ClassWeek;
                  $scope.mentors[mentorIndex].MatchWeek = result.data.data[0].ClassWeek;

              },
              //ERROR
              function(result){
                  $scope.calculate.MatchWeek = "";
                  alert("error calculating match week");
              }
          )



    };


    $scope.selectMentor = function(index)
	{
        $scope.mentorIndex = index;
		$scope.mentor = $scope.mentors[index];
        $scope.backup_personal = $scope.getPartialBackup($scope.personalFields, $scope.mentors[$scope.mentorIndex]);
        $scope.backup_dates = $scope.getPartialBackup($scope.datesFields, $scope.mentors[$scope.mentorIndex]);
        $scope.backup_endInfo = $scope.getPartialBackup($scope.endInfoFields, $scope.mentors[$scope.mentorIndex]);

        // Get Search Criteria for this mentor
        $scope.searchByZip = $scope.mentor.searchByZip;
		//Load Appointments
		var potential = { MentorPotentialID: $scope.mentor.MentorPotentialID};
		$scope.appts = null;

		var taskGetMentorAppts = $http({
            method: 'POST',
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
                $scope.backup_appts = angular.copy($scope.appts);
			},
			//ERROF
			function (result) {
				alert("Error reading Mentor appts");
            }
		)
    };

	$scope.taskComplete = function(input){

		if(input==""  ||input=="0" )
		{
			return "alert-danger text-dark";
		}
		else
            return "";//return "inputBackgroundColor";
	};

    $scope.recruitTaskStatus = function() {

        var test = $scope.mentor;
        $scope.passRecruit = false;

        if (test.MAgreementDate != "" &&
            test.IsLiabReleaseSigned == "1" &&
            test.IsPosDescSigned == "1" &&
            test.HasDriversLic == "1" &&
            test.HasAutoIns == "1"
        ) {
            $scope.passRecruit = true;
            return "alert-success text-dark";
        }
        else {

         return "alert-danger text-dark";
        }

    };
    $scope.screenTaskStatus = function()
    {
        var test = $scope.mentor;
        $scope.passScreen = false;

        if (test.MInterviewDate != ""  &&
			test.MRefCheck1Date != "" &&
			test.MRefCheck2Date != "" &&
			test.MBackgroundCheckEndDate != "" &&
			test.MBackgroundCheckStartDate != "" &&
			test.HasPhysAbuseHistory != "1" &&
			test.IsLegallyDQd != "1")
        {
            $scope.passScreen = true;
            return "alert-success text-dark";
        }
        else
            return "alert-danger text-dark";

    };
    $scope.trainTaskStatus = function()
    {
        var test = $scope.mentor;
        $scope.passTrain = false;
        if(test.MTrainedDate1 != "")
        {
            $scope.passTrain = true;
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

        if($scope.mentor.MMatchDate != "")
        {
            return "alert-success text-dark";
        }
        else
            return "alert-danger text-dark";
    };

    $scope.isSelected = function(index){
        if($scope.mentorIndex == index)
        {
            return "alert-success";
        }
    else
        return "";
    };
    $scope.calculateMatchDate = function()
    {
        //if something changed, see if the dates need to be set
        //recrutitng
        let mentorIndex = $scope.mentorIndex;

        if (($scope.passRecruit) && ($scope.mentors[mentorIndex].MPRecruitedDate==""))
        {
            if (
                ($scope.mentors[mentorIndex].IsLiabReleaseSigned != $scope.backup_dates.IsLiabReleaseSigned) ||
                ($scope.mentors[mentorIndex].IsPosDescSigned != $scope.backup_dates.IsPosDescSigned) ||
                ($scope.mentors[mentorIndex].HasDriversLic != $scope.backup_dates.HasDriversLic) ||
                ($scope.mentors[mentorIndex].HasAutoIns != $scope.backup_dates.HasAutoIns)) {
                //change date to todays date
                $scope.mentors[mentorIndex].MPRecruitedDate = new Date().toISOString().split('T')[0];
            }
            else {
                    //change date to MAgreementDate
                $scope.mentors[mentorIndex].MPRecruitedDate=$scope.mentors[mentorIndex].MAgreementDate;

            }
        };
        if ($scope.passScreen && ($scope.mentors[mentorIndex].MScreenedDate==""))
        {
            if (
                ($scope.mentors[mentorIndex].HasPhysAbuseHistory != $scope.backup_dates.HasPhysAbuseHistory) ||
                ($scope.mentors[mentorIndex].IsLegallyDQd != $scope.backup_dates.IsLegallyDQd)) {

                //change date to todays date
                $scope.mentors[mentorIndex].MScreenedDate= new Date().toISOString().split('T')[0];
            }

            else {

                var array = [$scope.mentors[mentorIndex].MRefCheck1Date, $scope.mentors[mentorIndex].MRefCheck2Date,
                    $scope.mentors[mentorIndex].MBackgroundCheckEndDate, $scope.mentors[mentorIndex].MBackgroundCheckStartDate];

                array.sort( function(a,b){
                    a = new Date(a);
                    b= new Date(b);
                    return (a>b) ? -1: (a<b) ? 1: 0;
                });

                //change date to most recent date
                $scope.mentors[mentorIndex].MScreenedDate = array[0];
            }
        };
        if (($scope.passTrain) && $scope.mentors[mentorIndex].MTrainedDate ==""){
            //chnage date to the trianing date
            $scope.mentors[mentorIndex].MTrainedDate = $scope.mentors[mentorIndex].MTrainedDate1;

        };
        if (($scope.passRecruit && $scope.passScreen && $scope.passTrain ) && ($scope.mentors[mentorIndex].MMatchDate=="")){
           if ($scope.mentors[mentorIndex].MenteeTrainingDate !="" )
           {
               var array = [$scope.mentors[mentorIndex].MRefCheck1Date, $scope.mentors[mentorIndex].MRefCheck2Date,
                   $scope.mentors[mentorIndex].MBackgroundCheckEndDate, $scope.mentors[mentorIndex].MBackgroundCheckStartDate,
                   $scope.mentors[mentorIndex].MenteeTrainingDate];

               array.sort( function(a, b){
                   a = new Date(a);
                   b = new Date(b);
                   return (a>b )? -1: (a<b )? 1: 0;
               });

               //change date to the most recent date.
               $scope.mentors[mentorIndex].MMatchDate =  array[0];


               //calculate match week.
               $scope.loadMatchWeek($scope.mentors[mentorIndex].fkClassID, $scope.mentors[mentorIndex].MMatchDate, mentorIndex);
           }
        };
    };


    $scope.modalShown = false;
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };
});
angular.module('caseManager.cadetMentor').directive('modalDialog', function() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function() {
                scope.show = false;
            };
        },
        templateUrl: "./utility/attachments/attachments.view.html"
        //templateUrl: "./case-manager/cadet-mentor/attachmentUploadView.html"
       // template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'>" + "</div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
    };
});