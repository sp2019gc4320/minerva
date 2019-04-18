angular.module('admin.siteSetup').controller('newSiteController', function ($scope, $http, $window) {

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
});
