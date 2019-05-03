'use strict';

angular.module('website.siteSetup').component('siteSetup', {
    //the url is relative to the index.html,
    templateUrl: 'website/siteSetup/siteSetup.view.html',
    controller:
        ['$scope', '$http',
            function SiteSetupController($scope, $http) {//read all site records from the server
                var promise = $http.get("./php/getRecord.php");

                //this is an example of a callback/promise - asynchronus activity
                promise.then(function (response) {
                    $scope.site = response.data.data;
                    $scope.siteBackUp = angular.copy($scope.site);

                    //loads the image in the img element
                    $scope.site.SiteLogoImage = "./images/logos/" + $scope.site.SiteLogo.value;

                }).then(function () {
                    var promiseSchoolType = $http.get("./php/schoolType_lookup.php");
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
                    //after loading image
                    var promiseLogos = $http.get("./php/site_logoDirectory.php");
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
                    $http.get("./php/tabeVersion_lookup.php").then(function (response) {

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

                /*
                    var promiseZip = $http.get("./php/zip_lookup.php");
                    promiseZip.then(function (response) {
                        $scope.zipcodes = response.data.data;
                    });

                */

                //   $scope.logoOptions =[{id:"one", name:"oneName"}, {id:"two", name:"twoName"},{id:"three", name:"threeName"}];

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
                    if (parent == undefined || el == undefined)
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
            }

                //-------------------------------------------------------

                $scope.initialize = function () {
                    // $scope.editTbl = JSON.parse(JSON.stringify($scope.testTbl));
                    $scope.editable = false; //make each field initially uneditable
                };



                /*----CALL FUNCTION TO INITIALIZE!- */
                $scope.initialize();


                $scope.isChecked = function (value) {
                    alert("in isChecked: " + value);
                    return ((value == 1) || (value == "true"));
                };


            }

        ]

});

