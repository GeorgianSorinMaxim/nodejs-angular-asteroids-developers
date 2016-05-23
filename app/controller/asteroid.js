var myApp = angular.module("myApp", ["apiService", "ngAlertify"]);

myApp.controller("asteroidController", function($scope, $rootScope, $location, $http, alertify, Data) {
    $scope.onlyLetters = /^[a-zA-Z ]{1,25}$/;

    $scope.register = function() {
        Data.createAsteroid($scope.input)       
        .success(function(data) {
           alertify
          .alert("Asteroid with the name " + $scope.input.name + " was registered!");
           $scope.input = null;
        }).error(function(err) {});
    }
});
