//cadet-helper.controller.js This is the file that will show Cadet's picture
'use strict';

angular.module('findApp').
    controller("showCadetViewController", function($scope, $http, $window){

    $scope.loadView = function() {
        $scope.fkCadetID = $window.localStorage.getItem("CadetID");
        $scope.myCadet = {fkCadetID: $scope.fkCadetID};
        $http({
            method: 'POST',
            url: '../../php/getCadetViewData.php',
            data: Object.toparams($scope.myCadet),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
                $scope.cadet = response.data.data[0];

                if($scope.fkCadetID=="1" || $scope.fkCadetID=='7' || $scope.fkCadetID=='5' || $scope.fkCadetID=='8')
                    $scope.cadet.Photo = "../../images/cadets/" + $scope.fkCadetID + ".jpg";

                else
                    $scope.cadet.Photo = "../../images/workInProgress.jpeg";

                var str="1010200"+$scope.fkCadetID;
                $scope.cadet.CadetID = str;

            }
        );
    };

    $scope.loadView();



});