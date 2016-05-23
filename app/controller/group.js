var myApp = angular.module("myApp", ["apiService", "ngAlertify"]);

myApp.controller("groupController", function($scope, $rootScope, $location, $http, alertify, Data) {
    $scope.onlyLetters = /^[a-zA-Z ]{1,25}$/;

    $scope.register = function() {
        Data.createGroup($scope.input)       
        .success(function(data) {
           alertify
           .alert("Developer Group with the name " + $scope.input.name + " was registered!");
           $scope.input = null;
        }).error(function(err) {});
    }
});
