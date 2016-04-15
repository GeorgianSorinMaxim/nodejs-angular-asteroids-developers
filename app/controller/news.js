var myApp = angular.module("myApp", ["apiService", "ngAlertify"]);

myApp.controller("newsController", function($scope, $rootScope, $location, $http, alertify, Data) {

    $scope.register = function() {
        Data.createToks($scope.input)       
        .success(function(data) {
          $scope.input = null;
          $scope.patient = data;
          // alertify
          // .closeLogOnClick(true)
          // .success("NEWS with the score " +  $scope.patient.score + " registered by the patient " + $scope.patient.cpr + " - " + $scope.patient.firstname + " " + $scope.patient.lastname);
           alertify
          .alert("NEWS with the score " +  $scope.patient.score + " registered by the patient " + $scope.patient.cpr + " - " + $scope.patient.firstname + " " + $scope.patient.lastname);
        }).error(function(err) {});
    }

	// Respiration Rate
    $scope.respirationOptions = [
        { name: '≤9', value: '3' },
        { name: '9-11', value: '1' },
        { name: '12-20', value: '0' },
        { name: '21-24', value: '2' },
        { name: '≥25', value: '3' }
    ];

	// Oxygen Saturations
    $scope.oxySatOptions = [
        { name: '≤91', value: '3' },
        { name: '92-93', value: '2' },
        { name: '94-95', value: '1' },
        { name: '≥96', value: '0' }
    ];

	// Any Supplemental Oxygen
    $scope.oxyOptions = [
        { name: 'Yes', value: '2' },
        { name: 'No', value: '0' },
    ];

	// Temperature
    $scope.tempOptions = [
        { name: '≤35.0', value: '3' },
        { name: '35.1-36.0', value: '1' },
        { name: '36.1-38.0', value: '0' },
        { name: '38.1-39.0', value: '1' },
        { name: '≥39.1', value: '2' }
    ];

    // Systloc BP
    $scope.sysOptions = [
        { name: '≤90', value: '3' },
        { name: '91-100', value: '2' },
        { name: '101-110', value: '1' },
        { name: '111-219', value: '0' },
        { name: '≥220', value: '3' }
    ];

    // Systloc BP
    $scope.hrOptions = [
        { name: '≤40', value: '3' },
        { name: '41-50', value: '1' },
        { name: '51-90', value: '0' },
        { name: '91-110', value: '1' },
        { name: '111-130', value: '2' },
        { name: '≥131', value: '3' }
    ];

    // Level of Consciousness
    $scope.conscOptions = [
        { name: 'A', value: '0' },
        { name: 'V,P or U', value: '3' },
    ];
});
