'use strict';


angular.
    module("myApp").
    config(function ($routeProvider) {

        $routeProvider
            .when('/login', { template: '<login></login>'})
           // .when('/findCadet', {templateURL:'./utility/find-cadet/find-cadet.view.html'})
            .when('/adminSite', {template:'<site-setup></site-setup>'})


            .when('/homeOptions',   { templateUrl: './main/main.view.html'})
            .when('/adminModule',   { templateUrl: './admin/admin.view.html'})
           // .when('/adminDropDown', { template:'<site-dropdown></site-dropdown>'})
            .when('/adminDropDown', { template:'<site-lookups></site-lookups>'})


            .when('/websiteModule',   { templateUrl: './website/website.view.html'})
            .when('/websiteDropDown', { template: '<web-dropdown></web-dropdown>'})
            //.when('/websiteDropDown', { templateUrl: './websiteModule/views/findLookupView.html'})
            .when('/error', { templateUrl: './views/workInProgress.html'})

            .when('/caseModule',   { templateUrl: './homescreen/case-manager/case-manager.view.html'})
            .when('/prap',   { templateUrl: './notes/prap/prap.view.html'})
            .otherwise({redirectTo: '/login'})
    });



