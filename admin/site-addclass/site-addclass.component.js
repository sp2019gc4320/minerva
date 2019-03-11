'use strict';
angular.module('admin.addClass').component('addClass',{
    //the url is relative to the index.html
    templateUrl:'admin/site-addclass/site-addclass.view.html',
    controller:
    ['$scope','$http',
        function SiteAddClassController ($scope,$http) {


            $scope.classNumber;
            $scope.classYear;
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
            $scope.weeklyEnd;

            $scope.currentYear=new Date().getFullYear();



            $scope.createClass =function () {
                var startdate =getCorrectDate($scope.weeklyStart)//convert startWeek to correct string then assign weeks
                var weeks=assignClassWeeks(startdate);
                $scope.weeklyEnd=new Date(weeks[weeks.length-1]);

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
                        weeks:weeks,
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

            /**
             *Including the start date, the function returns 22 weeks. This accounts for monthly changes as well as the year being passed.
             * One thing that still needs to be implemented is putting leading zeroes, so that they are of the right format.
             * @param dateStr
             */
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
                            weeks.push(year + "-" + month + "-" + day);
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

                 //Format all the dates so that they are yyyy-mm-dd
                 for(var i=1;i<weeks.length;i++)//Don't worry about the 1st. It's automatically in correct format
                 {
                     var aWeek=weeks[i].split("-");//get each piece of info stored as number
                     var aYear=parseInt(aWeek[0]);
                     var aMonth=parseInt(aWeek[1]);
                     var aDay=parseInt(aWeek[2]);

                     if(aMonth<=9) {
                         aMonth = "0" + aMonth;
                         weeks[i]=aYear+"-"+aMonth+"-"+aDay;
                     }
                     if(aDay<=9) {
                         aDay = "0" + aDay;
                         weeks[i]=aYear+"-"+aMonth+"-"+aDay;
                     }
                 }
                 return weeks
            }

                 //Could have done this inside the for loop, but I feel that ut is simler to get dates then update them.







        }

    ]
    });