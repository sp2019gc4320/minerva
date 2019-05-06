'use strict';


angular.
    module("myApp").
    config(function ($routeProvider) {

        $routeProvider
            .when('/login', { template: '<login></login>'})
           // .when('/findCadet', {templateURL:'./utility/find-cadet/find-cadet.view.html'})
          //  .when('/adminSite', {template:'<site-setup></site-setup>'})


            .when('/homeOptions',   { templateUrl: './main/main.view.html'})
            .when('/adminModule',   { templateUrl: './admin/admin.view.html'})
           // .when('/adminDropDown', { template:'<site-dropdown></site-dropdown>'})
            .when('/adminDropDown', { template:'<site-lookups></site-lookups>'})


            .when('/websiteModule',   { templateUrl: './website/website.view.html'})
            .when('/websiteDropDown', { template: '<web-dropdown></web-dropdown>'})
            .when('/websiteFileSubmission', { templateUrl: './website/fileSubmission/fileSubmission.view.html'})
            .when('/websiteCoreComponent', { templateUrl: '<./website/editCoreComponent/editCoreComponent.view.html>'})
            .when('/websiteSiteSetup', { templateUrl: '<./website/SiteSetup/SiteSetup.view.html>'})
            //.when('/websiteDropDown', { templateUrl: './websiteModule/views/findLookupView.html'})
            .when('/error', { templateUrl: './views/workInProgress.html'})

            .when('/caseModule',   { templateUrl: './homescreen/case-manager/case-manager.view.html'})
            .when('/prap',   { templateUrl: './notes/prap/prap.view.html'})

            .when('/cadreModule',   { templateUrl: './homescreen/cadre/cadre.view.html'})
            .when('/recruiterModule',   { templateUrl: './recruiter/recruiter.view.html'})

            .otherwise({redirectTo: '/login'})
    });


// Converts a htmlDate formated as "Tuesday Jan 15 2019"
// into an sqlDate  year-mm-dd
function convertToSqlDate(htmlDate) {

    if (htmlDate === null)
        return "0000-00-00";

    //Split htmldate
    let dateArray = htmlDate.toString().split(" ");

    let month;
    if (dateArray[1] === 'Jan')
        month = "01";
    else if (dateArray[1] === 'Feb')
        month = "02";
    else if (dateArray[1] === 'Mar')
        month = "03";
    else if (dateArray[1] === 'Apr')
        month = "04";
    else if (dateArray[1] === 'May')
        month = "05";
    else if (dateArray[1] === 'Jun')
        month = "06";
    else if (dateArray[1] === 'Jul')
        month = "07";
    else if (dateArray[1] === 'Aug')
        month = "08";
    else if (dateArray[1] === 'Sep')
        month = "09";
    else if (dateArray[1] === 'Oct')
        month = "10";
    else if (dateArray[1] === 'Nov')
        month = "11";
    else month = "12";

    let sqlDate = dateArray[3] + '-' + month + '-' + dateArray[2];
    return sqlDate;
}

// Converts a sqlDate formatted as "year-mm-dd 00:00"
// into an htmlDate formated as "Tuesday Jan 15 2019"
function convertToHtmlDate(sqlDate) {

    if(sqlDate ===null)
        return new Date("");

    let tempDate = sqlDate.split(" ")[0]; //year-mm-dd
    let htmlDate = new Date("");

    if (tempDate !== "0000-00-00")
        htmlDate = new Date(tempDate+"T00:00:00");
    return htmlDate;
}

function convertDatesInArrayToHtml( myArray)
{
    let index = 0;
    while (index < myArray.length) {
        convertDatesInObjectToHtml(myArray[index]);
        index++;
    }
}
function convertDatesInArrayToSql ( myArray)
{
    let index = 0;
    while (index < myArray.length) {
        convertDatesInObjectToSql(myArray[index]);
        index++;
    }
}
function convertDatesInObjectToSql( myObject)
{
    for (var fieldName in myObject) {
        //Check to see if property name contains Date
        if (fieldName.includes("Date")) {
            if (myObject[fieldName] !== null) {//IF DATE IS NOT NULL
                myObject[fieldName] = convertToSqlDate(myObject[fieldName]);
            }
            else {
                myObject[fieldName] = "";
            }
        }
    }
}
