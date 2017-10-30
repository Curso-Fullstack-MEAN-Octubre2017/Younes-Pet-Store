'use strict';
angular.module('appointmentEdit', [])
	.component('appointmentEdit',{
		templateUrl : '/app/appointment-edit-module/appointment-edit-module.html',
		controller : function($scope, $http, $routeParams) {
			var id =$routeParams.id;
			console.log("inicializando appointment card"+id)
			
			$scope.appointment = [];
			$http.get('api/appointment/'+ id).then(function(response) {
				$scope.appointment = response.data;
				console.log($scope.appointment);
																																	
			});

			}
		});