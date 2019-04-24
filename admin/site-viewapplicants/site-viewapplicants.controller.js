'use strict';
angular.module('admin.siteViewApplicants', ['angularUtils.directives.dirPagination']).controller('viewApplicants', function($scope, $http, $window) {
    $http({
        method: 'POST',
        url: './php/admin_getApplicantList.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
        console.log(response.data);
        $scope.applicants = response.data.applicantTable;
    });

    //give the "print current roster" button functionality
    $scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWindow.document.open();
        popupWindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWindow.document.close();
    }

    $scope.addSelCadets = function()
    {
        
        var toCad = [];
        var n=0;
        for(var i = 0; i<$scope.applicants.length; i++)
        { 
            if((document).getElementById($scope.applicants[i].applicantID).checked)
            {
                toCad[n] = {"fname": $scope.applicants[i].fname , "lname" : $scope.applicants[i].lname, "applicantID": $scope.applicants[i].applicantID };
                n = n+1;
            }
        }
        if (n<1)
            alert("no applicants selected"); // respond to no applicants selected
        else
        {
            console.log(toCad);
            addToCadets(toCad); // pass to main add function
        }


    }

    $scope.addSingleCadet = function(applicantID)
    {   
        var i = 0;
        var toCad = [];

        while(i<$scope.applicants.length)
        {
            if($scope.applicants[i].applicantID == applicantID)
            {
                var toCad[0] = {"fname": $scope.applicants[i].fname , "lname" : $scope.applicants[i].lname, "applicantID": $scope.applicants[i].applicantID };
                alert($scope.applicants[i].fname+$scope.applicants[i].lname+$scope.applicants[i].applicantID);
            }
            i = i+1;
        }

        if(!(null==toCad))
        {
            console.log(toCad);
            addToCadets(toCad);
        }
        else
            alert("Controller Error!");
    }


    function addToCadets(toCadAry)
    {
        //note: toCadAry is an array of associative arrays {{"fname","lname","applicantID"}}
        alert(toCadAry);
        // TODO - PHP to add applicants to Cadet
    }



    $scope.editable = false;
    $scope.cancelUpdate = function() {
        $scope.editable = false;
        $scope.cadets = angular.copy($scope.cadetsBackup);
    };
    $scope.edit = function() {
        $scope.editable = true;
        $scope.show=false;

        //backup data
        $scope.cadetsBackup = angular.copy($scope.cadets);
    };
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});
