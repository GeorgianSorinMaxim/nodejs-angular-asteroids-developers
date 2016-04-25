var myApp = angular.module("myApp", ["apiService", "ngAlertify"]);

myApp.controller("usersController", function($scope, $http, alertify, Data) {
	$scope.sortType = 'score'; 
  	$scope.sortReverse = false;
  	$scope.score = '';  

    Data.getUsers()
    .success(function(data) {
    	$scope.users = data;
    });

    $scope.deleteUser = function (username) {
        console.log(username);
        Data.deleteUser(username)
        .success(function(data) {
          alertify
          .alert("Patienten med username: " + username + " blev slettet!",  function () {
              window.location.reload();
          });
        });
    }
});