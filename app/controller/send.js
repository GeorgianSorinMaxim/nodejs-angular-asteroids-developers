var myApp = angular.module("myApp", ["apiService", "ngAlertify"]);

myApp.controller("registerController", function($scope, $http,  alertify, Data) {
    $scope.typeOptions = [
        { name: 'All', value: '0' },
        { name: 'Motorola One X - Don', value: '1' },
        { name: 'iPhone 5s - John', value: '2' }
    ];

    $scope.receiver = $scope.typeOptions[0].value;

    $scope.register = function() {
        Data.sendMessage($scope.input)       
        .success(function(data) {
          $scope.input = null;
          $scope.data = data;
          alertify
          .alert("Message " + $scope.data.title + " - " + $scope.data.body + " sent to the registered devices.",  function () {
              window.location.reload();
          });
        }).error(function(err) {});
    }
});
