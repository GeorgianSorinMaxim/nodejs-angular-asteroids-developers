angular.module('apiService', [])
	.factory('Data', ['$http', function($http) {
		return {
			getNews : function() {
				return $http.get('/api/newsList');
			},
			getPatients : function() {
				return $http.get('/api/patients');
			},
			getDevices : function() {
				return $http.get('/api/devices');
			},
			getUser : function() {
				return $http.get('/api/user');
			},
			createToks : function(newsData) {
				return $http.post('/api/news', newsData);
			},
			createPatient : function(patientData) {
				return $http.post('/api/patients', patientData);
			},
			sendMessage : function(message) {
				return $http.post('/api/send', message);
			},	
			registerUser : function(user) {
				return $http.post('/api/registerUser', user);
			},	
			updatePatient : function (user) {
				return $http.post('/api/updatePatient', user);
			},
			delete : function(id) {
				return $http.delete('/api/patients/' + id);
			},
			getUsers : function() {
				return $http.get('/api/users');
			},
			deleteUser : function(username) {
				return $http.delete('/api/user/' + username);
			},
			deleteNews : function(id) {
				return $http.delete('/api/news/' + id);
			}
		}
	}]);