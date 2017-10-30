'use strict';
angular.module('appointmentEdit', [])
	.component('appointmentEdit',{
		templateUrl : '/app/appointment-main-module/appointment-edit-module/appointment-edit-module.html',
		controller : function($scope, $http,appointmentsService) {
			var id;
			$scope.$on("appointmentSend",function(event,appointmentSend){
				 var id = appointmentSend.id;
				 console.log("inicializando appointment card: "+id)
					
					$scope.appointment = [];
					$http.get('api/appointment/'+ id).then(function(response) {
						$scope.appointment = response.data;
						console.log($scope.appointment);
																																			
					});
			})
			
			$scope.submit = function(id) {
        		
        		var isNew = !id;
        		if(isNew) {
        			
        		} else {
        			   			
        		}
    		}
        	
        	//funcion de borrar atraves del id 
        	$scope.remove = function(id) {
        		console.log("mi id" +id);
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