'use strict';
angular.module('admin.siteAddClass').component('addClass',{
    //the url is relative to the index.html
    templateUrl:'admin/site-addclass/site-addclass.view.html',
    controller:
    ['$scope','$http',
        function SiteAddClassController ($scope,$http) {

            $scope.classYear;
            $scope.challengeStartDate;
            $scope.classStartDate;
            $scope.graduationDate;
            $scope.prCompletionDate;
            $scope.targetGraduates;
            $scope.classWeek;
            $scope.weeklyStart;
            $scope.weeklyEnd;


            $scope.createClass =function () {
             //by this point, all the above variables are updated through 'ng-bind'
                var sendData=
                    {
                        classYear:$scope.classYear,
                        challengeStartDate:getCorrectDate($scope.challengeStartDate),
                        classStartDate:getCorrectDate($scope.classStartDate),
                        graduationDate:getCorrectDate($scope.graduationDate),
                        prCompletionDate:getCorrectDate($scope.prCompletionDate),
                        targetGraduates:$scope.targetGraduates,
                        classWeek:$scope.classWeek,
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


            var getCorrectDate=function (date)
            {
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
            }

        }
    ]
    });
