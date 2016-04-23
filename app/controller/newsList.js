var myApp = angular.module("myApp", ["apiService", "ngAlertify"]);

myApp.controller("newsController", function($scope, $http, alertify, Data) {
	$scope.sortType = 'score'; 
  	$scope.sortReverse = false;
  	$scope.score = '';  

    Data.getNews()
    .success(function(data) {
    	$scope.newsList = data;
    });


    $scope.deleteNews = function (id) {
        Data.deleteNews(id)
        .success(function(data) {
          alertify
          .alert("NEWS with the id: " + id + " was deleted!",  function () {
              window.location.reload();
          });
        });
    }
});