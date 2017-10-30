'use strict';

angular.module('appointmentsDetails', [])
	.component('appointmentsDetails',{
		templateUrl : '/app/appointment-main-module/appointment-details-module/appointment-details-module.html',
		bindings: {
	           id: '='
	       },
		controller : function($scope, $http) {
			//console.log(" Lista de citas del dia"+ $routeParams.date);
				//var id = $routeParams.date;
				//console.log("ruta: " + id);
				// SCOPE CON hora hora
				
				this.$onInit=()=>{
					var date = this.id;
					LoadAppointments(date);
					
				}
				
				
				function LoadAppointments(date){
					var currentday = moment(date, 'YYYYMMDD');
					var nextday = moment(currentday).add(1, 'day').format('YYYYMMDD');
							
					$scope.appointment = [];
					var hour;	
					$http.get('api/appointments/' + date + '/' + nextday).then(function(response) {
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
				
				$scope.AppointmentDetailes = function(id) {
					console.log(id);
					$scope.$emit('appointment', 
							{id:id})
				}

			}
		});
