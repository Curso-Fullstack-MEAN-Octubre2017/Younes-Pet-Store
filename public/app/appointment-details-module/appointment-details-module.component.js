'use strict';

angular.module('appointmentsDetails', [])
	.component('appointmentsDetails',{
		templateUrl : '/app/appointment-details-module/appointment-details-module.html',
		controller : function($scope, $http, $routeParams) {
			console.log(" Lista de citas del dia"+ $routeParams.date);
				var id = $routeParams.date;
				console.log("ruta: " + id);
				// SCOPE CON hora hora
				var currentday = moment(id, 'YYYYMMDD');
				var nextday = moment(currentday).add(1, 'day').format('YYYYMMDD');
						
				$scope.appointment = [];
				var hour;	
				$http.get('api/appointments/' + id + '/' + nextday).then(function(response) {
					var res = response.data;
					console.log(res);
										
					var start = moment(currentday).set({hour:7})
					var final = moment(currentday).set({hour:23})
					//var hour = start.format("HH:mm");							
					while(start < final){
						
							$scope.appointment.push({
								hora : start.format('HH:mm'),
								datos: res[currentday.format('YYYY-MM-DD')][start.format('HH:mm')]
							})	
										
						start = moment(start).add(0.5,'hour');
					}
																					
				});

			}
		});
