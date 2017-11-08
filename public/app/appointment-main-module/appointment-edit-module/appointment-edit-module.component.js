'use strict';
angular.module('appointmentEdit', [])
	.component('appointmentEdit',{
		templateUrl : '/app/appointment-main-module/appointment-edit-module/appointment-edit-module.html',
		controller : function($scope, $http,appointmentsService,$location) {
			var id;
			$scope.$on("appointmentSend",function(event,appointmentSend){
				 var id = appointmentSend.id;
				 console.log("inicializando appointment card: "+id)
				 	if(id){
						$scope.appointment = [];
						$http.get('api/appointment/'+ id).then(function(response) {
							$scope.appointment = response.data;
							console.log($scope.appointment);
																																				
						});
				 	}
			})
			
			$scope.submit = function(id) {
        		
        		var isNew = !id;
        		if(isNew) {
        			console.log("Save Appointment", $scope.appointment);
            		appointmentsService.saveAppointment($scope.appointment).then(
            				function(response) {
            					$scope.appointment = response;
            					var date = moment($scope.appointment.dateTimeStart).format("YYYYMMDD")
            					$scope.$emit("appointments:appointmentSaved", $scope.appointment)
            				}, function(response) {
            					console.log("Error", response);
            				});
        		} else {
        			/*
        			 
        			appointmentsService.updateAppointment({id: $scope.appointment._id}, $scope.appointment, function(appointments) {
        				$scope.$emit("message:success", {message: "Pet dado actualizado con exito"})
        				
        			})
        			*/
        			
            		$http.put("/api/appointments/" + $scope.appointment._id, $scope.appointment).then(
            				function(response){
        		    			$scope.appointment = response.data;
        		    			$scope.$emit("appointments:appSave",$scope.appointment);
        		    			$location.path("appointments");
            		});
        		}
    		}
        	
        	//funcion de borrar atraves del id 
        	$scope.remove = function(id) {
        		if(confirm("Esta seguro que desea borrar este registro")) {
        			appointmentsService.deleteAppointment(id).then(function (res) {
                        history.back();
                    }, function (err) {
                        
                    })
    			}
        	};
        	
        	$scope.cancel = function(id) {
        		history.back();
        	};  
			
			}
		});