var myApp = angular.module("myApp", ["apiService", "ngAlertify"]);

myApp.controller("resultsController", function($scope, $http, alertify, Data) {

    Data.getPatients()
    .success(function(data) {
        $scope.patients = data;
    });

    $scope.triageOptions = [
        { name: 'Blue', value: '0' },
        { name: 'Red', value: '1' },
        { name: 'Green', value: '2' },
        { name: 'Orange', value: '3' },
        { name: 'Yellow', value: '4' }
    ];

    $scope.triage = $scope.triageOptions[0].value;

    $scope.register = function() {
        Data.createPatient($scope.input)       
        .success(function(data) {
          $scope.input = null;
          $scope.patient = data;
          alertify
          .alert("Patient " + $scope.patient.cpr + " - " + $scope.patient.firstname + " " + $scope.patient.lastname + " registered!",  function () {
              window.location.reload();
          });
        }).error(function(err) {});
    }

    $scope.deletePatient = function (cpr) {
        Data.delete(cpr)
        .success(function(data) {
          alertify
          .alert("The patient with the CPR: " + cpr + " deleted!",  function () {
              window.location.reload();
          });
        });
    }

    $scope.updatePatient = function (data) {
        Data.updatePatient(data)
        .success(function(data) {
          alertify
          .alert("The the data of the patient with the CPR: " + data.cpr + " updated!",  function () {
              window.location.reload();
          });
        })
    }
});