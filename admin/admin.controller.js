'use strict';

angular.module('admin').
controller('ctrl_homeOptions', function( $window) {

    //set it to null
    $window.localStorage.setItem("lookupTable",null);

});