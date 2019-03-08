'use strict';
angular.module('admin.addClass').component('addClass',{
    //the url is relative to the index.html
    templateUrl:'admin/site-addclass/site-addclass.view.html',
    controller:
    ['$scope','$http',
        function SiteAddClassController ($scope,$http) {


            $scope.classNumber;
            $scope.classYear=2019;
            $scope.NGB;
            $scope.cycle;
            $scope.graduationDate=new Date();
            $scope.prCompletionDate=new Date();
            $scope.targetGraduates;
            $scope.challengeStartDate=new Date();
            $scope.classStartDate=new Date();
            $scope.meritBase;
            $scope.servAge;


            $scope.weeklyStart=new Date();
            $scope.weeklyEnd=new  Date();

            $scope.currentYear=new Date().getFullYear();



            $scope.createClass =function () {
                var startdate =getCorrectDate($scope.weeklyStart)//convert startWeek to correct string then assign weeks
                assignClassWeeks(startdate);
                var sendData=
                    {
                        classNumber:$scope.classNumber,
                        classYear:$scope.classYear,
                        NGB:$scope.NGB,
                        cycle:$scope.cycle,
                        challengeStartDate:getCorrectDate($scope.challengeStartDate),
                        graduationDate:getCorrectDate($scope.graduationDate),
                        prCompletionDate:getCorrectDate($scope.prCompletionDate),
                        targetGraduates:$scope.targetGraduates,
                        classStartDate:getCorrectDate($scope.classStartDate),
                        meritBase:$scope.meritBase,
                        servAge:$scope.servAge,

                        weeklyStart:getCorrectDate($scope.weeklyStart),
                        weeklyEnd:getCorrectDate($scope.weeklyEnd)
                    };

                $http ({
                    method: 'POST',
                    url: "./php/admin_addClass.php",
                    data: Object.toparams(sendData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function(response)
                    {
                        if(response.data) {
                            //$scope.msg="data updated";
                            alert("data updated");
                        }
                        //location.reload(true);
                    },function(result){
                        alert("Failed");
                    });
            };


            var getCorrectDate=function (date) {
                date += "";//make the whole thing a string

                var dateArray = date.split(" ");//split by space to get rid of time
                var month;
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
                else if (dateArray[1] === 'Dec')
                    month = "12";

                var dateString = dateArray[3] + '-' + month + '-' + dateArray[2];//off by one YMD

                return dateString;
            };

             var assignClassWeeks= function(dateStr){
                 //need to think of a way for leap years

                 var weeks=[];//make week array
                 var startinfo=dateStr.split("-");//get each piece of info stored as number
                 var year=(parseInt(startinfo[0]));
                 var month=(parseInt(startinfo[1]));
                 var day=(parseInt(startinfo[2]));
                 var daysPerMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

                 weeks.push(dateStr);//week 1(o index)

                 for(var i=0;i<21;i++)//week i to 22(21 index)
                 {
                     day+=7;
                     if(day<=daysPerMonth[month-1])//general case(-1 of indexing)
                        weeks.push(year+"-"+month+"-"+day);
                     else if(month==12&&day>31)//if the year is exceeded
                     {
                         day=day-daysPerMonth[0];
                         month=1;
                         year++;
                         weeks.push(year+"-"+month+"-"+day);
                     }
                     else{//day exceeds the date for that month
                         day=day-daysPerMonth[month-1];//Needs to be done for indexing (one off)
                         month++;
                         weeks.push(year+"-"+month+"-"+day);
                     }
                 }
             }


        }

    ]
    });