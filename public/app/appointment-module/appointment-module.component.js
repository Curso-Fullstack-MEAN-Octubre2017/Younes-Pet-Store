'use strict';
angular.module('appointmentsList', []);
angular.module('appointmentsList').
	component('appointmentsList', 
			{templateUrl:'/app/appointment-module/appointment-module.html',
        controller: function($scope, $http) {
            console.log("Incializando appointments list");
            $scope.appointments = [];
            
            $http.get("/api/appointments").then(function (response){
                $scope.appointments = response.data;
                console.log($scope.appointments);
            });
            
       }
    });