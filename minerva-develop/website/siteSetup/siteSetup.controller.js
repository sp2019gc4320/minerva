'use strict';
angular.module('website.siteSetup').controller('siteController', function($scope, $http, $window) {
$scope.editable = false;
$scope.showEditButtons = false;
$scope.newSiteButtons = false;

$scope.newSite = function () {
    $scope.editable = true;
    $scope.newSiteButtons = true;
    document.getElementById("siteForm").reset();
}
    $scope.cancelNewSite = function () {
        location.reload(true);
    }
    $scope.saveNewSite = function () {
        var sendData=
            {
                siteID:$scope.siteID,
                siteName:$scope.siteName,
                siteCode:$scope.siteCode,
                siteAddress:$scope.siteAddress,
                siteCity:$scope.siteCity,
                siteState:$scope.siteState,
                siteZip:$scope.siteZip,
                sitePhone:$scope.sitePhone,
                siteFax:$scope.siteFax,
                schoolType:$scope.schoolType,
                startingNGB:$scope.startingNGB,
                usdaSchoolLunch:$scope.usdaSchoolLunch,
                studentGovt:$scope.studentGovt,
                backgroundChkSrc:$scope.backgroundChkSrc,
                defaultTABEVers:$scope.defaultTABEVers,
                unionsCount:$scope.unionsCount,
                sec501c3AltFunding:$scope.sec501c3AltFunding,
                sec501c3Foundation:$scope.sec501c3Foundation,
                requireSSN:$scope.requireSSN,
                siteLogo:$scope.siteLogo,
                legislatorLink:$scope.legislatorLink
            };
        $http({
            method: 'POST',
            url: "./php/admin_addNewSite.php",
            data: Object.toparams(sendData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(

            function (result) {
                alert("site created")
            });
    };
    $scope.startEdit = function () {
        //$scope.editable = true;
        $scope.editable = true;
        $scope.showEditButtons = true;
    };

    $scope.cancelUpdate = function () {
        //$scope.editable = false;
        $scope.showEditButtons = false;
        $scope.editable = false;
        //alert("Canceling Update");
        //copy all of the fields from the original back to the editTbl
        $scope.site = angular.copy($scope.siteBackUp);

    };
    $scope.canEdit = function () {
        return !$scope.editable;
    };

    $scope.saveChanges = function () {
        //copy all of the fields in the testTable to the original table
        $scope.siteBackUp = angular.copy($scope.site);

        //disable all fields
        $scope.showEditButtons = false;
        $scope.editable = false;
        // alert("savingChanges:" + JSON.stringify($scope.siteBackUp));


        //saving changes
        var mySite =
            {
                SiteName: $scope.siteBackUp.SiteName.value,
                SiteCode: $scope.siteBackUp.SiteCode.value

            };

        //I had to do this because siteBackup contains recornds that have fieldsturcutre.
        //I only need the field names and values in the record -- no structure needed
        var test = {};
        for (var propertyName in $scope.siteBackUp) {
            test[propertyName] = $scope.siteBackUp[propertyName].value;

            /*    //look at checkboxes
                if(($scope.siteBackUp[propertyName].type == "TINYINT") && ($scope.siteBackUp[propertyName].length == 1))
                 {
                     if(test[propertyName]==true)
                         test[propertyName]=1;
                     else
                         test[propertyName]=0;

                }
                */
        }
        //$scope.editable = false;
        test.UpdateTable = "tlkpSite";
        test.SearchField = "SiteID";
        test.SearchValue = test.SiteID;


        // alert(JSON.stringify(test));

        $http({
            method: 'POST',
            url: "./php/admin_site_update.php",
            data: Object.toparams(test),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCCESS
            function (result) {

                alert("site information saved");
                //alert("site information saved" + JSON.stringify(result));
            },
            //ERROR
            function (result) {
                alert("error: " + result.data);
            }
        );
    };

        $scope.cancelNewSite = function () {
            location.reload(true);
        }

        $scope.deleteSite = function () {
            var sendData = angular.copy($scope.siteID);
            $http({
                method: 'POST',
                url: "./php/admin_deleteSite.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            }).then(
                //SUCCESS
                function (result) {

                    alert("site deleted");
                },
                //ERROR
                function (result) {
                    alert("error: " + result.data);
                });
        };

        $scope.saveNewSite = function () {
            var sendData =
                {
                    siteID: $scope.siteID,
                    siteName: $scope.siteName,
                    siteCode: $scope.siteCode,
                    siteAddress: $scope.siteAddress,
                    siteCity: $scope.siteCity,
                    siteState: $scope.siteState,
                    siteZip: $scope.siteZip,
                    sitePhone: $scope.sitePhone,
                    siteFax: $scope.siteFax,
                    schoolType: $scope.schoolType,
                    startingNGB: $scope.startingNGB,
                    usdaSchoolLunch: $scope.usdaSchoolLunch,
                    studentGovt: $scope.studentGovt,
                    backgroundChkSrc: $scope.backgroundChkSrc,
                    defaultTABEVers: $scope.defaultTABEVers,
                    unionsCount: $scope.unionsCount,
                    sec501c3AltFunding: $scope.sec501c3AltFunding,
                    sec501c3Foundation: $scope.sec501c3Foundation,
                    requireSSN: $scope.requireSSN,
                    siteLogo: $scope.siteLogo,
                    legislatorLink: $scope.legislatorLink
                };
            $http({
                method: 'POST',
                url: "./php/admin_addNewSite.php",
                data: Object.toparams(sendData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function (result) {
                    alert("site created")
                });
        };
});
