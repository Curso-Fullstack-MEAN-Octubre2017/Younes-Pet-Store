'use strict';
angular.module('appointmentMain', []);
angular.module('appointmentMain').
	component('appointmentMain', 
			{templateUrl:'/app/appointment-main-module/appointment-main-module.html',
        controller: function($scope, $http,$routeParams) {
        	console.log("estoy entrando");
        	$scope.$on("appointment",function(event,appointment){
	    		console.log(appointment);
	    		$scope.$broadcast("appointmentSend",appointment);
	    		
	    	})
	    	$scope.date=$routeParams.date
        	
        	
        }
    });