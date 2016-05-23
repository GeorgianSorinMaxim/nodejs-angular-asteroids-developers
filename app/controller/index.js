var myApp = angular.module("myApp", ["apiService", "ngAlertify"]);

myApp.controller("indexController", function($scope, $http, alertify, Data) {  
    $scope.onlyLetters = /^[a-zA-Z ]{1,25}$/;
    $scope.selectedList = '';

    Data.getAsteriods()
    .success(function(data) {
    	$scope.asteroidList = data;
    });

    Data.getGroups()
    .success(function(data) {
    	$scope.groupList = data;
    });

    $scope.check = function (asteroid, group) {
      if(asteroid.numberConversion % 45 === group.numberConversion % 45) {
          alertify
          .alert("The group of developers was taken in the asteroid!!",  function () { });
      } else {
          alertify
          .alert("Bad luck! Try again!",  function () { });
      }
    }

    $scope.deleteGroup = function (id) {
        Data.deleteGroup(id)
        .success(function(data) {
          alertify
          .alert("Group with the id: " + id + " was deleted!",  function () {
              window.location.reload();
          });
        }).error(function(err) {});
    }

    $scope.updateGroup = function (data) {
        if(data.newName === "") {
          alertify
          .alert("Empty name! Please entery a valid name!",  function () { });
        } else {
            Data.updateGroup(data)
            .success(function(data) {
              alertify
              .alert("Group with the id: " + data.name + " was updated!",  function () {
                  window.location.reload();
              });
            }).error(function(err) { console.log("error"); });
        }
    }

    $scope.deleteAsteroid = function (id) {
        Data.deleteAsteroid(id)
        .success(function(data) {
          alertify
          .alert("Asteroid with the id: " + id + " was deleted!",  function () {
              window.location.reload();
          });
        }).error(function(err) {});
    }

    $scope.updateAsteroid = function (data) {
        if(data.newName === "") {
          alertify
          .alert("Empty name! Please entery a valid name!",  function () {});
        } else {
            Data.updateAsteroid(data)
            .success(function(data) {
              alertify
              .alert("Asteroid with the id: " + data.name + " was updated!",  function () {
                  window.location.reload();
              });
            }).error(function(err) { console.log("error"); });
        }
    }
});