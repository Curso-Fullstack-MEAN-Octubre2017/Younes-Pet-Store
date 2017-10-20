'use strict';
angular.module('appointmentsList', []);
angular.module('appointmentsList').
	component('appointmentsList', 
			{templateUrl:'/app/appointment-module/appointment-module.html',
        controller: function($scope, $http, $routeParams) {
            console.log("Incializando appointments list", $routeParams);
            var monthParam = $routeParams.month;
            console.log("monthParam", monthParam);
            
            $scope.currentMonth = moment().startOf('M').format("YYYYMMDD");
            if(monthParam) {
            	$scope.currentMonth = monthParam;
            }
            console.log("currentMonth", $scope.currentMonth);
            
            $scope.url = "/api/appointments/"+$scope.currentMonth+"/"+$scope.currentMonth;
            
            $scope.appointments = [];
            
            $http.get("/api/appointments").then(function (response){
                $scope.appointments = response.data;
                console.log($scope.appointments);
            });
            
       }
    });