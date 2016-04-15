var myApp = angular.module("myApp", ["apiService", "ngAlertify"]);

myApp.controller("userController", function($scope, $http, alertify, Data) {
	$scope.register = function() {
      Data.registerUser($scope.input)       
      .success(function(data) {
        $scope.input = null;
        $scope.data = data;
        alertify
        .alert("User " + data.firstname + " " + data.lastname + " registered!",  function () {
            window.location.reload();
        });
      }).error(function(err) {});
  }
});