'use strict';

angular.module('appointmentsDetails', [])
    .component('appointmentsDetails', {

        templateUrl: '/app/appointment-details-module/appointment-details-module.html',
        controller: function ($scope, $http, $routeParams) {


            console.log(" Lista de citas del dia"+$routeParams.date);
            
            var id = $routeParams.date;
            console.log("ruta: "+id);
            
           
            
        	
            $scope.appointment = {};
            
	            $http.get("/api/appointmentsof/" + $routeParams.date).then(function (response){
	            	$scope.appointment= response.data;
	                console.log("Appointments Details:", $scope.appointment);
	                
	            });
            
        }
    });