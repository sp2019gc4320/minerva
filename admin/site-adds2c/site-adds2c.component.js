'use strict';
angular.module('admin.addS2C').component('addS2C',{
    //the url is relative to the index.html
    templateUrl:'admin/site-adds2c/site-adds2c.view.html',
    controller:
    ['$scope','$http',
        function SiteAddS2CController ($scope,$http) {


            $scope.serviceSite;
            $scope.siteDescript;
            $scope.reportCode;
            $scope.siteStatus;

            $scope.createS2C =function () {
                var sendData=
                    {
                        serviceSite:$scope.serviceSite,
                        siteDescript:$scope.siteDescript,
                        reportCode:$scope.reportCode,
                        siteStatus:$scope.siteStatus,
                    };

                $http ({
                    method: 'POST',
                    url: "./php/admin_addS2C.php",
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
    ]
    });