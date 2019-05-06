/*
   File: lookups.js

 */
'use strict';

angular.module('site.lookups').component('siteLookups', {
    //the url is relative to the index.html,
    templateUrl: 'site/lookups/lookups.view.html',
    controller:
        ['$scope', '$http', '$window',
            function SiteLookupsController($scope, $http, $window) {
                var myRequest = {op: "Get_All"};
                myRequest.TableName = "tlkpSiteSpecific";

                $http({
                    method: 'POST',
                    url: "./php/admin_sitespecific_update.php",
                    data: Object.toparams(myRequest),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {
                    $scope.lookups = response.data.data;
                    $scope.rowSelected = -1;
                });

                $scope.pickLookup = function (lookup, index) {
                    //Storing  to be used by another view
                    $window.sessionStorage.setItem("SiteLookupTable", lookup.TableName);
                    $window.sessionStorage.setItem("SiteLookupTableDescription", lookup.Description);
                    $window.localStorage.setItem("SitelookupTable", lookup.TableName);
                    // $scope.lookupTable = lookup.TableName;

                    $scope.rowSelected = index;

                    //reloading table

                   // $scope.updateDisplay = "./admin/site-dropdown/dropdown-helper.view.html" + "?updated=" + Date.now();
                    $scope.updateDisplay = "./site/lookups/lookup-details.view.html" + "?updated=" + Date.now();
                };
            }
        ]
});