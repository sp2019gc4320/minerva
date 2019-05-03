'use strict';

angular.module('website.webDropdown').component('webDropdown', {
    //the url is relative to the index.html,
    templateUrl: 'website/web-dropdown/web-dropdown.view.html',
    controller:
        ['$scope', '$http', '$window',
            function WebDropdownController($scope, $http, $window) {
                var myRequest  = {op: "Get_All"};
                myRequest.TableName = "MyLookup";
                $http({
                    method: 'POST',
                    url: './php/website_dropdown_update.php',
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
                    $scope.updateDisplay = "./website/web-dropdown/web-dropdown-helper.view.html" + "?updated=" + Date.now();
                };
            }]
});