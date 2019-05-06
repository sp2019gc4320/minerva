'use strict';

angular.
module('utility.login').
component('login', {
    //the url is relative to the index.html
    // templateUrl: 'login/login.view.html',
    templateUrl: 'utility/login/login.view.html',
    controller:
        ['$scope','$http', '$location', '$window',
            function LoginController ($scope, $http, $location, $window)
            {
                $scope.authenticate = function authenticate(user, pass) {
                    var myInfo = {username: user, password: pass};
                    $http({
                        method: 'POST',
                        url: "./php/login.php",
                        data: Object.toparams(myInfo),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(
                        //SUCCESS
                        function (result) {

                            $window.sessionStorage.setItem('minerva_user', myInfo.username);

                            var data = result.data;
                            //alert("storing user info:" + JSON.stringify(data));
                            $window.sessionStorage.setItem('SiteID', data.fkSiteID);

                            //get settings for user
                            var userInfo = {SiteID: data.fkSiteID};
                            $http({
                                method: 'POST',
                                url: "./php/minerva_getSiteSettings.php",
                                data: Object.toparams(userInfo),
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }).then(
                                //SUCCESS
                                function (result) {
                                    var colorScheme = result.data.data[0];
                                    alert(JSON.stringify(colorScheme));

                                    $window.sessionStorage.setItem('minerva_PrimaryColor', colorScheme.PrimaryColor);
                                    $window.sessionStorage.setItem('minerva_SecondaryColor', colorScheme.SecondaryColor);
                                    $window.sessionStorage.setItem('minerva_TertiaryColor', colorScheme.TertiaryColor);
                                    $window.sessionStorage.setItem('minerva_InputTextColor', colorScheme.InputTextColor);
                                    $window.sessionStorage.setItem('minerva_LabelTextColor', colorScheme.LabelTextColor);
                                    $window.sessionStorage.setItem('minerva_InputBackgroundColor', colorScheme.InputBackgroundColor);
                                    $window.sessionStorage.setItem('minerva_SiteLogo', colorScheme.SiteLogo);

                                    // loadSettings();

                                    //Routes in Angular 1.6 need to add ! when redirecting to state.
                                    $window.location = '#!/homeOptions';
                                },

                                //ERROR
                                function (result) {
                                    alert("user site information  was not found");
                                    $window.location = '#!/homeOptions';
                                });
                        },
                        //ERROR
                        function (error) {
                            //   alert("error logging in ");
                            $scope.authenticationError = error;
                        }
                    );
                };
            }
        ]
});
