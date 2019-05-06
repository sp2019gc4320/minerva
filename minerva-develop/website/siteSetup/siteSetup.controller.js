'use strict';
angular.module('website.siteSetup').controller('siteController', function($scope, $http, $window) {

$scope.editable = false;
$scope.showEditButtons = false;
$scope.newSiteButtons = false;
$scope.newID;    
alert("Please select a siteID")
    $http({
        method: 'GET',
        url: './php/admin_getSiteID.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
        $scope.idOptions = response.data.data;

        var i = 0;
        var max = $scope.idOptions.length;
        $scope.newID = $scope.idOptions.length+1;
        while (i < max) {
            $scope.idOptions[i].id = i;
           // specify the defaulted siteID in the select element
            if ($scope.idOptions[i].value == $scope.idOptions[i].SiteID) {
                $scope.selectedID = $scope.idOptions[i];
            }
            i++;
        }
    });
    $scope.getSiteInfo= function() {
        $scope.siteID = $scope.selectedID;
        var promise = $http({
            method: 'POST',
            url: './php/getRecord.php',
            data: Object.toparams($scope.siteID),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        promise.then(
            //SUCCESS
            function (response) {
                $scope.site = response.data.data;
                $scope.siteBackUp = angular.copy($scope.site);


                //loads the image in the img element
                $scope.site.SiteLogoImage = "./images/logos/" + $scope.site.SiteLogo.value;
            }).then(function () {
            var promiseSchoolType = $http({
                method: 'GET',
                url: './php/schoolType_Lookup.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            promiseSchoolType.then(function (response) {
                $scope.schoolTypeOptions = response.data.data;

                var i = 0;
                var max = $scope.schoolTypeOptions.length;
                while (i < max) {
                    $scope.schoolTypeOptions[i].id = i;

                    //specify the defaulted schoolType in the select element
                    if ($scope.site.SchoolType.value == $scope.schoolTypeOptions[i].SchoolType) {
                        $scope.schoolTypeSelected = $scope.schoolTypeOptions[i];
                    }
                    i++;
                }
            });
        }).then(function () {
            var promiseLogos = $http({
                method: 'GET',
                url: './php/site_logoDirectory.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            promiseLogos.then(function (response) {

                $scope.logoOptions = [];

                var i = 0;
                var max = response.data.data.length;
                while (i < max) {
                    var option = new Object();
                    option.id = i + 1;
                    option.filename = response.data.data[i];
                    $scope.logoOptions.push(option);

                    //specify the defaulted logo image in the select element
                    if ($scope.site.SiteLogo.value == option.filename) {
                        $scope.logoSelected = $scope.logoOptions[i];
                    }
                    i++;
                }
            });
        }).then(function () {
            $http({
                method: 'GET',
                url: './php/tabeVersion_lookup.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                $scope.defaultTABEVersOptions = response.data.data;

                var i = 0;
                var max = $scope.defaultTABEVersOptions.length;
                while (i < max) {
                    $scope.defaultTABEVersOptions[i].id = i;

                    //specify the defaulted logo image in the select element
                    if ($scope.site.DefaultTABEVers.value == $scope.defaultTABEVersOptions[i].TABEVersion) {
                        $scope.defaultTABEVersSelected = $scope.defaultTABEVersOptions[i];
                    }
                    i++;
                }
            });
        });
        $scope.changeDefaultTABEVers = function (TABEVersion) {
            if (TABEVersion != null) {
                $scope.site.DefaultTABEVers.value = TABEVersion;

            }
        };
        $scope.changeLogo = function (logo) {
            if (logo != null) {
                $scope.site.SiteLogo.value = logo.filename;
                $scope.site.SiteLogoImage = "./images/logos/" + $scope.site.SiteLogo.value;
            }
        };
        $scope.changeSchoolType = function (schoolType) {
            if (schoolType != null) {
                $scope.site.SchoolType.value = schoolType;

            }
        };

        $scope.scroll = function (e) {
            var parentContainer = document.getElementById("zipLookup");
            if (e.which === 40) { // down arrow
                if ($scope.index < $scope.items.length - 1) {

                    var element = document.getElementById("tr-" + $scope.index);
                    if (isElementInViewport(parentContainer, element)) {
                        e.preventDefault();
                    }

                    $scope.index++;
                }
            } else if (e.which === 38) { // up arrow
                if ($scope.index > 0) {
                    var element = document.getElementById("tr-" + $scope.index);
                    if (!isElementInViewport(parentContainer, element)) {
                        e.preventDefault();
                    }
                    $scope.index--;
                }
            }
        };

        function isElementInViewport(parent, el) {
    if (parent == undefined || eDSl == undefined)
                return false;
            var elRect = el.getBoundingClientRect(),
                parRect = parent.getBoundingClientRect();
            //console.log(elRect)
            //console.log(parRect)
            var elementHeight = elRect.height;
            return (
                elRect.top >= parRect.top &&
                elRect.bottom <= parRect.bottom &&
                elRect.bottom + elementHeight <= parRect.bottom
            );
        }
    };

$scope.newSite = function () {
    $scope.siteID = $scope.site.length+1;
    $scope.editable = true;
    $scope.newSiteButtons = true;
    document.getElementById("siteForm").reset();
};
    $scope.cancelNewSite = function () {
        location.reload(true);
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
        alert("Canceling Update");
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
        var update = {};
        for (var propertyName in $scope.siteBackUp) {
            update[propertyName] = $scope.siteBackUp[propertyName].value;

                //look at checkboxes
                if(($scope.siteBackUp[propertyName].type == "TINYINT") && ($scope.siteBackUp[propertyName].length == 1))
                 {
                     if(update[propertyName]==true)
                         update[propertyName]=1;
                     else
                         update[propertyName]=0;

                }

        }
        //$scope.editable = false;
        update.UpdateTable = "tlkpSite";
        update.SearchField = "SiteID";
        update.SearchValue = update.SiteID;


         //alert(JSON.stringify(update));

        $http({
            method: 'POST',
            url: "./php/admin_site_update.php",
            data: Object.toparams(update),
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



    $scope.saveNewSite = function () {
        $scope.editable = false;
        $scope.newSiteButtons = false;
        $scope.siteID = $scope.newID;
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
            }


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

    $scope.cancelNewSite = function () {
        location.reload(true);
    }

    $scope.deleteSite = function () {
        $scope.siteID = $scope.selectedID;

        $http({
            method: 'POST',
            url: "./php/admin_deleteSite.php",
            data: Object.toparams($scope.siteID),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

        }).then(
            //SUCCESS
            function (result) {

                alert("site deleted");
                location.reload(true);
            },
            //ERROR
            function (result) {
                alert("error: " + result.data);
            });
    };

});
