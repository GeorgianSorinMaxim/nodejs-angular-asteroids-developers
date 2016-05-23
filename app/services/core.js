angular.module('apiService', [])
	.factory('Data', ['$http', function($http) {
		return {
			getGroups : function() {
				return $http.get('/api/groups');
			},
			getGroup : function(id) {
				return $http.get('/api/group', id);
			},
			createGroup : function(data) {
				return $http.post('/api/group', data);
			},
			updateGroup : function (data) {
				return $http.post('/api/updateGroup/', data);
			},
			deleteGroup : function(id) {
				return $http.delete('/api/group/' + id);
			},
			getAsteriods : function() {
				return $http.get('/api/asteroids');
			},
			getAsteroid : function(id) {
				return $http.get('/api/asteroid', id);
			},
			createAsteroid : function(data) {
				return $http.post('/api/asteroid', data);
			},
			updateAsteroid : function (data) {
				return $http.post('/api/updateAsteroid/', data);
			},
			deleteAsteroid : function(id) {
				return $http.delete('/api/asteroid/' + id);
			}
		}
	}]);