var myApp = angular.module("myApp", ['apiService']);

myApp.controller("newsController", function($scope, $http, Data) {
	$scope.sortType = 'score'; 
  	$scope.sortReverse = false;
  	$scope.score = '';  

    Data.getNews()
    .success(function(data) {
    	$scope.newsList = data;
    });
});