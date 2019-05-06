'use strict';

angular.module('recruiter.applicantDocs').controller('applicantDocsController', function($scope, $http, $window) 
{
    $http.get("./php/getAppsWithDocs.php").then(function (response) {$scope.names = response.data.records;});
});